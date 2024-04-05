[Demo](#/influence-demo) <====

I was pretty intrigued by this paper from Anthropic: [Studying Large Language Model Generalization with Influence Functions](https://arxiv.org/pdf/2308.03296.pdf). The authors aim to provide insights into the workings of large language models (LLMs) using influence functions. They address the question of which training examples most contribute to a model's behavior. I wanted to implement influence functions as in the Anthropic paper, but with a much smaller model. Specifically, I wanted to reproduce the tokenwise influence attribution figures (see [this](https://www.anthropic.com/index/influence-functions#:~:text=humanlike%20AIs,-.)) as a form of self-study.

I started with TinyStories 1M, a small-scale language model that has been trained to generate short, coherent English text. This was mostly due to resource and time constraints, but the underlying implementation can be applied to any size model given enough compute. Additionally, despite their limited parameter count, these models have demonstrated an ability to generate coherent English text, so in my mind they are a minimal candidate for an investigation into model generalization and interpretability.

 ## Technical Overview

I will attempt to explain my main takeaways from the paper, starting with influence functions. Influence functions are the conceptual workhorse of the methods outlined in the paper. They essentially quantify the impact of each training sample on a model’s predictions, thereby assisting in the interpretation of neural networks and potentially improving trust and alignment. However, their usage has been limited due to high computational demands. The authors leverage an optimization trick known as EK-FAC to significantly lower the cost of acquiring dependable influence scores.

The key idea behind influence functions is to upweight the loss of a training instance by an infinitesimally small step, which results in new model parameters. The influence function of the parameters, i.e., the influence of upweighting training instance z on the parameters, can be calculated as follows:

 $$ I_{up,params}(z) = \frac{d\theta^{\epsilon,z}}{d\epsilon} |_{\epsilon=0} = -H^{-1}_{\theta} \nabla_{\theta} \mathcal{L} (z, \theta) $$

The Hessian matrix is the rate of change of the gradient, or expressed as loss, it is the rate of change of the rate of change of the loss. It can be estimated using:

 $$ H_{\theta} = \frac{1}{n} \sum_{i=1}^{n} \nabla^2_{\theta} \mathcal{L}(z_i, \theta) $$

The influence function can be used as a measure of the influence of z on the parameters. The influence of instance z on the predictions can be calculated directly, since we can calculate the influence by using the chain rule:

 $$ I_{up,loss}(z, z_{test}) = \frac{dL(z_{test}, \theta^{\epsilon,z})}{d\epsilon} |_{\epsilon=0} = -\nabla_{\theta} \mathcal{L}(z_{test}, \theta)^T H^{-1}_{\theta} \nabla_{\theta} \mathcal{L}(z, \theta) $$

The influence is proportional to how large the gradients for the training and test loss are. The higher the gradient of the training loss, the higher its influence on the parameters and the higher the influence on the test prediction. The higher the gradient of the test prediction, the more influenceable the test instance.

The scale on the order of billions of parameters and trillions of training tokens complicates the application of this method further (hence my choice in model). Specifically, the influence formula involves calculating the Hessian of the cost function, $ \boldsymbol{H} = \nabla^2_{\boldsymbol{\theta}} \mathcal{J}(\boldsymbol{\theta^*}, \mathcal{D}) $ for a training dataset $ \mathcal{D} = \{z_i\}^N_{i=1} $ and where the model parameters $ \boldsymbol{\theta} \in R^D $ are fit using empirical risk minimization of a loss function. For the language models the authors are dealing with, calculating $ \boldsymbol{H} $ exactly would produce a matrix with the dimensions equal to the number of parameters in the model. They get around this by approximating $ \boldsymbol{H} $ using Eigenvalue-corrected Kronecker-Factored Approximate Curvature (EK-FAC).

In their experiments, EK-FAC achieves similar accuracy to traditional influence function estimators, but with significantly faster IHVP computation. They also explore algorithmic techniques to reduce the cost of computing gradients of candidate training sequences, such as TF-IDF filtering and query batching.

The influence of a data point can be cleanly attributed to specific layers from the following, where $ \boldsymbol{q} = -\nabla_\theta f(\theta^s) $ and $ \boldsymbol{r} = \nabla_\theta \mathcal{L}(z_m, \theta^s) $ are the query and training gradients:

 $$ \mathcal{I}(z) \approx \sum_{\ell=1}^L \sum_{t=1}^T \boldsymbol{q}_\ell^\top (\hat{\boldsymbol{G}}_\ell + \lambda \boldsymbol{I})^{-1} \boldsymbol{r}_{\ell,t} $$

The training gradient decomposes as a sum of terms. Each term corresponding to a token in in the training sequence, $ \boldsymbol{r} = \sum_t \boldsymbol{r}_t $. This gives us the influence value per token:

 $$ \mathcal{I}(z) \approx \sum_{\ell=1}^L \boldsymbol{q}_\ell^\top (\hat{\boldsymbol{G}}_\ell + \lambda \boldsymbol{I})^{-1} \boldsymbol{r}_{\ell} $$

## Methods

For this project, I started with an implementation of influence functions available at [this GitHub repository](https://github.com/nrimsky/InfluenceFunctions). I modified the implementation (see [my repo](https://github.com/jedell/influence-functions/tree/main)) to use forward and backward hooks to access gradient information in the MLP layers of the TinyStories language models. Additionally, I added functionality to calculate the tokenwise influence values for the training gradients based on the equation above.


The key ingredients for implementing influence functions in PyTorch are the gradient of the property of interest, the inverse damped Gauss-Newton Hessian, and the gradient of the loss on the training data points. These can be obtained by performing a backward pass of the loss on some input, target pair, and using forward and backward hooks to save the input to a layer during the forward pass and the gradient with respect to the linear layer's output. This was a pretty key insight for me and I got pretty comfortable with working with pytorch modules in this way.

```python
# 1. get a_l-1, use forward hook to save input to a layer l during the forward pass
layer_inputs = {}

def get_a_l_minus_1(name):

    def forward_hook_fn(module, input, output):
        layer_inputs[name] = torch.cat([
                input[0],
                torch.ones((input[0].shape[0], input[0].shape[1], 1)).to(input[0].device),
        ], dim=-1).clone().detach()
    return forward_hook_fn

# 2. get grad_loss, gradients of loss wrt output of linear transformation W_l a_l-1
#    using a backward hook on the linear layer that saves the gradient wrt the linear layer's output

layer_grads = {}
layer_grad_inputs = {}

def get_grad_loss(name):
    def back_hook_fn(module, grad_input, grad_output):
        print(grad_input[0].shape)
        layer_grads[name] = grad_output[0].clone().detach()
        # layer_grad_inputs[name] = grad_input[0].clone().detach()
        layer_grad_inputs[name] = torch.cat([
                    grad_input[0],
                    torch.ones((grad_input[0].shape[0], grad_input[0].shape[1], 1)).to(grad_input[0].device),
            ], dim=-1).clone().detach()
    return back_hook_fn
```

For the scope of this project, I employed the TinyStories language models and dataset. These models, as detailed in the paper [TinyStories: A Large-Scale Dataset and Models for Generating Short Stories](https://arxiv.org/pdf/2305.07759.pdf), are small-scale language models that have been trained to generate short, coherent English text. Despite their limited parameter count, these models have demonstrated a capability to generate coherent English text. This makes them a minimal candidate for this investigation into model interpretability, especially given my access to compute and free time.

## Discussion and TODOs

There is a glaring bug somewhere in the implementation of the tokenwise attribution of influence. The influence values appear to be relatively flat past a certain number of tokens in the training sequences which calls into question the usefulness of my results. This could be due to several reasons. For instance, it might be a result of a mistake in the implementation of EK-FAC and calculating the IHVP, or it could be an issue with the way I accumulate query and training gradients for each token.

The use of small models like TinyStories 1M was a practical choice for this project, given the computational demands of influence functions. However, this choice might limit the usefulness of the results for interpreting model generalization. Small models have fewer parameters and thus less capacity to capture complex patterns in the data. The interpretation of this project's influence values does not correspond with the results in the paper since the internal understanding/representation of language in TinyStories is far less complex.

As with any complex project, there is a risk of making mistakes or misunderstandings in the implementation. For me it's all about the process of learning! I plan to continue to improve this project over time and as my schedule allows, so any feedback is more than welcome!!

## Sources

- [Studying Large Language Model Generalization with Influence Functions](https://arxiv.org/pdf/2308.03296.pdf)
- [Understanding Black-box Predictions via Influence Functions](https://arxiv.org/pdf/1703.04730.pdf)
- [TinyStories: A Large-Scale Dataset and Models for Generating Short Stories](https://arxiv.org/pdf/2305.07759.pdf)
- [nrimsky/InfluenceFunctions](https://github.com/nrimsky/InfluenceFunctions)
- [Interpretable Machine Learning, Christoph Molnar](https://christophm.github.io/interpretable-ml-book/influential.html#influence-functions)
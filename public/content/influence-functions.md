## Exploring Influence Functions in Large Language Models

[Explore the Influence Functions Demo](#/influence-demo)

Influence functions are a powerful tool for understanding the impact of individual training examples on the predictions of a trained model. They were first introduced in the Anthropic paper [Influence Functions for Machine Learning: Nonparametric Estimators for Entropies, Divergences and Mutual Informations](https://arxiv.org/pdf/2308.03296.pdf). 

The basic idea behind influence functions is to approximate the change in the model's output when a single training example is perturbed. Mathematically, the influence function for a training example (x, y) is defined as:

IF(x, y) = - H^-1 ∇_θ L(f_θ(x), y)

where H is the Hessian matrix of the loss function L with respect to the model parameters θ, and f_θ(x) is the model's prediction for the input x. 

In this research, I have been exploring the applications of influence functions using a small model, with the objective of comprehending how individual training examples impact the predictions of a trained model.

## Methods

For this research, I utilized an implementation of influence functions available at [this GitHub repository](https://github.com/nrimsky/InfluenceFunctions). I modified the implementation to use forward and backward hooks to access gradient information in the MLP layers of the TinyStories language models. 

For the scope of this project, I employed the TinyStories language models and dataset. These models, as detailed in the paper [TinyStories: A Large-Scale Dataset and Models for Generating Short Stories](https://arxiv.org/pdf/2305.07759.pdf), are small-scale language models that have been trained to generate short, coherent English text. Despite their limited parameter count, these models have demonstrated an capability to generate coherent English text. This makes them an minimal candidate for this investigation into model interpretability, especially given my access to compute and free time.

In addition to the implementation of influence functions, I also employed Runpod in two significant ways. Firstly, I used Runpod to calculate the Inverse Hessian-Vector Product (IHVP), a crucial component in the computation of influence functions. Secondly, I utilized Runpod to serve the demo of this research on my website. The selection of Runpod was based on its efficient and effective capabilities in both computation and serving of machine learning models.
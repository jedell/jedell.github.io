## Introduction

In 2022, Li et al [[1]](https://arxiv.org/abs/2210.15097) proposed a training-free text generation method, Contrastive Decoding, that uses two language models at different scales. This method has shown to outperform other decoding algorithms on certain benchmarks and to produce more coherent long-form text than nucleus sampling and outperform greedy search [[2]](https://arxiv.org/abs/2309.09117) for reasoning tasks. I will be evaluating my implementation of this algorithm on a number of tasks presented in the referenced literature.

## Algorithm

This method utilizes two language models of different scales and aims to optimize a contrastive objective while adhering to a plausibility constraint.

The contrastive objective is defined as the difference in log probabilities of a continuation given a prefix, between an expert (larger) language model and an amateur (smaller) language model. This objective rewards text patterns favored by the larger language models and penalizes patterns favored by the smaller ones. We can define this objective $\mathcal{L}_{CD}$ as follows, where $p_{EXP}$ and $p_{AMA}$ are the expert and amateur language models respectively and $x_{cont}$ and $x_{pre}$ represent the continuation and input prefix.

$$\mathcal{L}_{CD}(x_{cont}, x_{pre}) = \log p_{EXP}(x_{cont} | x_{pre}) − \log p_{AMA}(x_{cont} | x_{pre})$$

The method is based on the observation that smaller language models tend to produce more undesirable patterns (like repetition, topic drift, and self-contradiction) than larger ones. The goal of Contrastive Decoding is to eliminate these undesired behaviors highlighted by the smaller models, and generate text that reflects the more desirable behaviors of the larger models.

However, the authors also acknowledge that smaller language models are not always incorrect and can often capture simple aspects of English grammar and common sense. Therefore, to avoid penalizing these correct behaviors (false negatives) and rewarding implausible tokens (false positives), a plausibility constraint is introduced. This constraint complements the contrastive objective and helps avoid these potential failure modes by restricting the search space to tokens with sufficiently high probability under the expert LM. The following is the definition present in the original propsal.

$$\mathcal{V}(x_{<i}) = {x_i \in \mathcal{V} :  p_{EXP}(x_i | x_{<i}) \geq \alpha \max\limits_{w \in \mathcal{V}} p_{EXP}(w | x_{<i})} $$

Following [[2]](https://arxiv.org/abs/2309.09117), the authors make a few changes to the original formulation. To calculate the logits for token $i$ using contrastive decoding, $s^{(i)}_{CD}$, the expert logits are masked subject to a plausibiilty constraint that mirrors the original, and the amatuer logits are subtracted away. The hyperparameter $\alpha$ functions as before, masking out lower probability tokens, but include $\beta$ to control the strength of the contrastive penalty between the expert and amateur logits. As $\beta \rightarrow 0$, the strength of the amateur logits shrinks away, and as $\beta \rightarrow \inf$, the formulation approaches the one presented in the original work. Thus, we arrive at the following:

$$ V_{valid} = \{j \in V, s_e^{(j)} \geq \log \alpha + \max_{k \in V} s_e^{(k)} \} $$

$$ s_{CD}^{(i)} = \begin{cases} (1 + \beta)s_e^{(i)} - \beta s_a^{(i)} & i \in V_{valid} \\ -\infty & i \not\in V_{valid} \end{cases} $$

The authors of [[2]](https://arxiv.org/abs/2309.09117) provide a refernece pytorch implementation, which I will using to perform the evaluations.

```python 
# ⍺ mask
cutoff = log(alpha) + exp_logits.max(dim=-1, keepdim=True).values
# contrastive penalty
diffs = (1 + beta)*exp_logits - beta*ama_logits
# apply ⍺ mask to penalized logits
cd_logits = diffs.masked fill(exp_logits < cutoff, -float(’inf’))
```

See [this forked repository](https://github.com/jedell/transformers/blob/10c57f601571d739d3359b4779fc46365c17bb5b/src/transformers/generation/utils.py#L2324C5-L2324C5) for my implentation of contrastive greedy decoding in the Hugging Face Transformers library. Any feedback is greatly appreciated!

## Evaluation

The following evaluations were performed with two GPT-2 models: large and small for the expert and amateur respectively.

### **Qualitative Evaluation**



```json
Prompt: "My name is"

Expert:  "My name is John, and I'm a writer. I'm a writer who writes about the world. I'm a writer who writes about the world in a way that's not just about the world, but about the world in a way that's"

Amateur:  "My name is John. I'm a man of God. I'm a man of God. I'm a man of God. I'm a man of God. I'm a man of God. I'm a man of God. I'm a"

Contrastive:  "My name is Michael, I'm a software engineer from London. I'm currently working on a project called 'The World's First Blockchain-based Social Network. I'm a big fan of blockchain technology and I'm looking forward to using it"
```
```json
Prompt: "According to all known laws of aviation,"

Expert:  "According to all known laws of aviation, the aircraft must be able to fly at a speed of at least Mach 1.5. The aircraft must be able to fly at a speed of at least Mach 1.5. The aircraft must be"

Amateur:  "According to all known laws of aviation, the aircraft must be operated in a safe and controlled manner. The aircraft must be operated in a manner that is safe and controlled. The aircraft must be operated in a manner that is safe and"

Contrastive:  "According to all known laws of aviation, the aircraft would have been destroyed in the atmosphere. The plane was flying at an altitude of about 2,000 feet when it crashed, according to the NTSB. The plane was flying from"
```
```json
Prompt: "Yesterday,"

Expert:  "Yesterday, the U.S. Supreme Court ruled that the government can't force people to buy health insurance or pay a penalty for not having it. The ruling, which was handed down by the court's conservative majority, is a victory for"

Amateur:  "Yesterday, the U.S. Supreme Court ruled that the government can't force a person to pay for a drug that's not legal. The ruling, which was announced by the U.S. Court of Appeals for the D.C"

Contrastive:  "Yesterday, the U.S. Supreme Court declined to hear a challenge to Arizona's law, which requires doctors to inform pregnant women of the risks of abortion before performing the procedure. The court's decision means that women in Arizona will continue to"
```
```json
Prompt: "Once upon a time in a far-away, magical land,"

Expert:  "Once upon a time in a far-away, magical land, a young girl named Alice was born. She was a princess of the land, and she was destined to become the next queen of the land. But when she was born, she was not"

Amateur:  "Once upon a time in a far-away, magical land, the world was a place of great beauty and great danger. The world was a place of great danger, and the world was a place of great danger. The world was a place of great"

Contrastive:  "Once upon a time in a far-away, magical land, a young girl named Alice was born with magical powers. She was given the name Alice because she was born with the ability to see the future. She was also given the name Alice because she"
```
### **Quantitative Evalution**

⚠️ Under Construction ⚠️

#### GSM8K
- Using [GPT2 finetuned on GSM8k](https://huggingface.co/fiveflow/gpt2-large-gsm8k) 

#### HellaSwag
- 

### **Further Experiments**

- Evalute differnent model architectures and sizes including Llama 2 models.
- Controlling amateur model via context to impact what behaviors are penalized. (i.e. prompt the amateur model to be toxic, to use repetative words, to avoid a certain tone, etc.).




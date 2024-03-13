# Logistic & Softmax
Given $\mathcal{Y} = {0,1}$, the value of $\mathbf{w}$ such that $P_{Logistic}(y|\textbf{x}) = P_{Softmax}(y|\textbf{x}) \hspace{0.5em} \forall \hspace{0.5em} y \in \mathcal{Y}$ can be derived as follows:

Expanding the summation term in the Softmax function, we have:

$P_{Softmax}(y=1|\mathbf{x}) = \frac{e^{\mathbf{w}_1^T\mathbf{x}}}{e^{\mathbf{w}_0^T\mathbf{x}} + e^{\mathbf{w}_1^T\mathbf{x}}}$

Comparing this to the Logistic function, we can see that the denominator in the Softmax function is equivalent to $1 + e^{\mathbf{w}^T\mathbf{x}}$ in the Logistic function.

Therefore, to make the two functions equal, we need $\mathbf{w}_1^T\mathbf{x} = \mathbf{w}^T\mathbf{x}$ and $\mathbf{w}_0^T\mathbf{x} = 0$.

This implies that $\mathbf{w} = \mathbf{w}_1$ and $\mathbf{w}_0 = \mathbf{0}$.

So, the value of $\mathbf{w}$ such that $P_{Logistic}(y|\textbf{x}) = P_{Softmax}(y|\textbf{x}) \hspace{0.5em} \forall \hspace{0.5em} y \in \mathcal{Y}$ is $\mathbf{w} = \mathbf{w}_1$.

---
The decision rule for the Softmax function in the binary case is to choose the class with the highest probability:

$$\hat{y} = \text{argmax}_{k \in {0,1}}, z_k$$

The decision rule for the logistic function is to choose the positive class if the output is greater than 0.5, and the negative class otherwise:

```
1 : if z > 0.5
0 : otherwise
```

The two rules are similar in that they both produce a binary classification. However, they are different in that the Softmax function produces a probability distribution over all classes, while the logistic function produces a single scalar value representing the probability of the positive class. The Softmax function is therefore more flexible and can be used for multi-class classification, while the logistic function is limited to binary classification.

# Dead Neurons
For a given instance, the gradient of the loss with respect to $b_i$ can be calculated as follows:

$\frac{\partial l}{\partial b_i} = \frac{\partial l}{\partial y} \cdot \frac{\partial y}{\partial z_i} \cdot \frac{\partial z_i}{\partial b_i}$

Where $\frac{\partial y}{\partial z_i}$ is equal to $\mathbf{\theta}^{(z \rightarrow y)}_i$, and $\frac{\partial z_i}{\partial b_i}$ is equal to 1 if $z_i > 0$ and 0 otherwise. Since $z_i = \text{ReLU}(\mathbf{\theta}_i^{(x \rightarrow z)} \cdot \mathbf{x} + b_i)$, $\frac{\partial z_i}{\partial b_i} = 1$ if $z_i > 0$ and 0 otherwise.

Therefore, $\frac{\partial l}{\partial b_i} = \frac{\partial l}{\partial y} \cdot \mathbf{\theta}^{(z \rightarrow y)}_i \cdot \mathbb{1}[z_i > 0]$, where $\mathbb{1}[\cdot]$ is the indicator function.

The gradient of the loss with respect to $\mathbf{\theta}_{j,i}^{(x \rightarrow z)}$ can be calculated as follows:

$\frac{\partial l}{\partial \mathbf{\theta}_{j,i}^{(x \rightarrow z)}} = \frac{\partial l}{\partial y} \cdot \frac{\partial y}{\partial z_i} \cdot \frac{\partial z_i}{\partial \mathbf{\theta}_{j,i}^{(x \rightarrow z)}}$

Where $\frac{\partial y}{\partial z_i}$ is equal to $\mathbf{\theta}^{(z \rightarrow y)}_i$, and $\frac{\partial z_i}{\partial \mathbf{\theta}_{j,i}^{(x \rightarrow z)}}$ is equal to $x_j$ if $z_i > 0$ and 0 otherwise.

Therefore, 
$\frac{\partial l}{\partial \mathbf{\theta}_{j,i}^{(x \rightarrow z)}} = \frac{\partial l}{\partial y} \cdot \mathbf{\theta}^{(z \rightarrow y)}_i \cdot x_j \cdot \mathbb{1}[z_i > 0]$

---
**3. Using your answers to the previous two parts, explain why a "dead" neuron can never be brought back to life during gradient-based learning.**

A "dead" neuron can never be brought back to life during gradient-based learning because its output is always 0, and thus, its gradient with respect to the loss function is always 0. This means that the gradient-based learning algorithm will not update the parameters $\mathbf{\theta}_i^{(x \rightarrow z)}$ and $b_i$ of the dead neuron, and it will remain dead. This is because the gradient of the loss with respect to $b_i$ and $\mathbf{\theta}_{j,i}^{(x \rightarrow z)}$ is proportional to the value of $z_i$, which is always 0 for a dead neuron, and thus, the gradient will always be 0.
Tags: #CS-4650📖🤖
Date Created: Tuesday Jan 10th, 2023
Time Created: 14:09

---
# Resources
- [Conditional Probability](http://www.stat.yale.edu/Courses/1997-98/101/condprob.htm)
- [l-norms](https://machinelearningmastery.com/vector-norms-machine-learning/#:~:text=The%20L1%20norm%20is%20calculated,origin%20of%20the%20vector%20space.)

## Other Notes
- [[PSet 0 Final Checks]]

---
# 1. Linear Algebra
## Computing norms: $l_1, l_2, l_\infty$
### $l_1$ norm
Sum of absolute values in vector. "Manhattan Distance"
$$
l_1 = \sum_{n=0}^{|x|}|x_n|
$$

### $l_2$ norm
Euclidian distance/norm. Similar to Pythagorean theorem.
$$
l_2 = \sqrt{\sum_{n=0}^{|x|}{x_n}^2}
$$

### $l_\infty$ norm
Max norm. Used for regularization. Simply the max value in a vector.
$$
l_\infty = max(x_{0..n})
$$

# 2. Geometry
## B. Show that $w$ is ortho
**ChatGPT Breakdown:**
This question is asking to show that a vector $\mathbf{w}$ is orthogonal (i.e., perpendicular) to a line represented by the equation $\mathbf{w}^\top\mathbf{x} + b = 0$. Orthogonality is a geometric property that can be defined in terms of the dot product of two vectors, if the dot product of two vectors is zero, then the vectors are orthogonal.

In this question, $\mathbf{w}$ is a vector and $\mathbf{x}$ is a variable vector that lies on the line represented by the equation $\mathbf{w}^\top\mathbf{x} + b = 0$. The symbol $^\top$ is used to denote the transpose of a matrix. The transpose of a vector can be thought of as a column vector, as it is a matrix with a single column, and the transpose of a column vector is a row vector.

The scalar variable b is a constant value, which makes the equation $\mathbf{w}^\top\mathbf{x} + b = 0$ valid for any x that lies on the line.

The task is to find two points $\mathbf{x}_1$ and $\mathbf{x}_2$ that lie on the line, then use these two points to show that the dot product of $\mathbf{w}$ and any vector $\mathbf{x}$ on the line is zero, meaning that $\mathbf{w}$ is orthogonal to the line.

For example, let's say that $\mathbf{w} = [2, -1, 3]^T$ (in the form of column vector) and b = 5.

Let's say $\mathbf{x}_1$ = [3, 2, 4]^T and $\mathbf{x}_2$ = [1, -1, 2]^T are points on the line, and they are plugged in the equation, they lie on the line as the equation is satisfied for each of them.

It means $\mathbf{w}^\top\mathbf{x}_1 + b = 0$ and $\mathbf{w}^\top\mathbf{x}_2 + b = 0$, showing that these points are on the line.

The task is to use these two points and the equation to prove the orthogonality property of w.

**ChatGPT Response:**
A vector $\mathbf{w}$ is orthogonal to a line represented by the equation $\mathbf{w}^\top\mathbf{x} + b = 0$ if the dot product of $\mathbf{w}$ and any vector $\mathbf{x}$ on the line is zero. To see this, we can consider two points $\mathbf{x}_1$ and $\mathbf{x}_2$ that lie on the line.

For any $\mathbf{x}_1$ and $\mathbf{x}_2$ on the line, we have:

$\mathbf{w}^\top\mathbf{x}_1 + b = 0$

$\mathbf{w}^\top\mathbf{x}_2 + b = 0$

The dot product of $\mathbf{w}$ and any vector $\mathbf{x}$ on the line is defined as $\mathbf{w}^\top \mathbf{x}$

So, if we take the dot product of $\mathbf{w}$ and $\mathbf{x}_1 - \mathbf{x}_2$, we have:

$\mathbf{w}^\top (\mathbf{x}_1 - \mathbf{x}_2) = \mathbf{w}^\top\mathbf{x}_1 - \mathbf{w}^\top\mathbf{x}_2$

Since $\mathbf{x}_1$ and $\mathbf{x}_2$ lie on the same line and $\mathbf{w}^\top\mathbf{x}_1 + b = 0$ and $\mathbf{w}^\top\mathbf{x}_2 + b = 0$, we can say:

$\mathbf{w}^\top (\mathbf{x}_1 - \mathbf{x}_2) = (\mathbf{w}^\top\mathbf{x}_1 + b) - (\mathbf{w}^\top\mathbf{x}_2 + b) = 0-0 = 0$

So the dot product of $\mathbf{w}$ and any vector $\mathbf{x}$ on the line is zero. And since $\mathbf{x}_1$ and $\mathbf{x}_2$ were arbitrary points on the line, this means that $\mathbf{w}$ is orthogonal to the line defined by the equation $\mathbf{w}^\top\mathbf{x} + b = 0$

# 3. Multivariate Calculus
## A. Gym Memberships
[Desmos graph](https://www.desmos.com/calculator/sxpzaux8ux)
[How to determine min/max/saddle](https://ocw.mit.edu/ans7870/18/18.013a/textbook/HTML/chapter11/section02.html)
[Matrix calculus calculator (REALLY GOOD)](https://www.matrixcalculus.org/)

To find the gradient at $t=0$ should be $f'(0)$. Which is:
$$
f'(0) = \frac{1000}{3(60+5(0))^{\frac{1}{3}}}
$$
$$
= \frac{1000}{3(60)^{\frac{1}{3}}}
$$
$$
= \frac{1000}{3(3.9148)}
$$
$$
= 85.14549
$$

**ChatGPT Response:**
The question is asking for the rate of change of the membership at $t=0$, which is the gradient of the function $f(t)$ when $t=0$.

The gradient of a function at a point is equal to the derivative of the function at that point. To find the derivative of a function, we can use the power rule and chain rule of calculus, which state that:

-   The derivative of $x^n$ is $nx^{n-1}$
-   The derivative of $g(u)^{n}$ is $n g(u)^{n-1}g'(u)$

Therefore, to find the derivative of $f(t) = 100 (60 + 5t)^{2/3}$, we can apply chain rule as follows:

$f(t) = 100 (60 + 5t)^{2/3}$ let $g(u) = (60 + 5t)$ and $n=\frac{2}{3}$

so $$f'(t) = 100 * n * (60 + 5t)^{n-1} * (5)$$
$$= 100 * 2/3 * (60 + 5t)^{-1/3} * 5$$
$$
= \frac{1000}{3} \cdot \frac{1}{(60+5t)^{\frac{1}{3}}}
$$
$$
f'(t) = \frac{1000}{3(60+5t)^{\frac{1}{3}}}
$$

## B. Multi-var Gradients
Consider the equations $L = (1 - z)^2$, $z = w_2y + b$, and $y = w_1x$.\\Compute the gradients $\frac{\partial L}{\partial w_1}$, $\frac{\partial L}{\partial w_2}$, and $\frac{\partial L}{\partial b}$.

Expand $L$ to full values:
$L = (1 - w_2y+b)^2$
$L = (1-w_2w_1x + b)^2$

**ChatGPT Response:**
The gradients $\frac{\partial L}{\partial w_1}$, $\frac{\partial L}{\partial w_2}$, and $\frac{\partial L}{\partial b}$ represent the rate of change of the loss function L with respect to the weights and bias. To compute these gradients, we can use the chain rule of calculus which states that the derivative of a composite function is the product of the derivatives of the individual functions.

We can first use the given equations to express L in terms of x, y, w1, w2 and b.

$L = (1 - (w_2y + b))^2 = (1 - (w_2(w_1x) + b))^2$

Now we can compute the gradients by taking the derivative of L with respect to each variable.

$\frac{\partial L}{\partial w_1} = 2(1 - (w_2(w_1x) + b))(-w_2w_1x)$
$= -2(1 - (w_2(w_1x) + b))w_2w_1x$

$\frac{\partial L}{\partial w_2} = 2(1 - (w_2(w_1x) + b))(-w_1x)$
$= -2(1 - (w_2(w_1x) + b))w_1x$

$\frac{\partial L}{\partial b} = 2(1 - (w_2(w_1x) + b))(-1)$
$= -2(1 - (w_2(w_1x) + b))$

So, these are the gradient for the Loss function L with respect to w1, w2 and b respectively

### Checking that ChatGPT can do partial derivatives:
$$
f(x, y) = 7x^2 - x^3y^4 + 5x^4y^3
$$
$\frac{\partial f}{\partial x}$

To find the derivative of $f(x,y)$ with respect to $x$, we use the rule of partial derivatives. The partial derivative of $f(x,y)$ with respect to $x$ is defined as the derivative of $f(x,y)$ with respect to $x$, while treating $y$ as a constant.
so,  $\frac{\partial f}{\partial x} = \frac{\partial}{\partial x}(7x^2 - x^3y^4 + 5x^4y^3)$

Using the power rule of derivatives,

$\frac{\partial f}{\partial x} = 14x -3x^2y^4 + 20x^3y^3$

So, the derivative of $f(x,y)$ with respect to $x$ is $14x -3x^2y^4 + 20x^3y^3$

## C. Column Vectors
### i.
$f(\mathbf{x})=\mathbf{c}^\top\mathbf{x}$, where $\mathbf{c}$ is a column vector and $\mathbf{x}$ is another column vector of the same dimension.

The gradient of this function with respect to $\mathbf{x}$ is the transpose of $\mathbf{c}$, which is $\frac{\partial f}{\partial \mathbf{x}} = \mathbf{c}^T$.

### ii.
$g(\mathbf{x})=\frac{1}{2}\mathbf{x}^\top\mathbf{H}\mathbf{x}$ where $\mathbf{H}$ is a square matrix of dimensions compatible with $\mathbf{x}$.

To compute the gradient of g(x) with respect to x, we can use the rule of chain derivatives.

$\frac{\partial}{\partial\mathbf{x}}g(\mathbf{x})= \frac{\partial}{\partial\mathbf{x}}(\frac{1}{2}\mathbf{x}^\top\mathbf{H}\mathbf{x}) = \frac{\partial}{\partial\mathbf{x}}\frac{1}{2}\mathbf{x}^\top\mathbf{H}\mathbf{x} = (\frac{\partial}{\partial\mathbf{x}}\frac{1}{2})\mathbf{x}^\top\mathbf{H}\mathbf{x} + \frac{1}{2}\mathbf{x}^\top(\frac{\partial}{\partial\mathbf{x}}\mathbf{H}\mathbf{x})$

The first part of this result is zero, since the scalar value 1/2 doesn't depend on x.

So, $\frac{\partial}{\partial\mathbf{x}}g(\mathbf{x}) = \frac{1}{2} \mathbf{x}^T \mathbf{H}$

### iii.
$h(\mathbf{x})=\frac{1}{2}\mathbf{x}^T\mathbf{H}\mathbf{x}+\mathbf{c}^T\mathbf{x}$, where $\mathbf{H} = \begin{bmatrix} 2 & 0\\ 0 & 4\\ \end{bmatrix}$ and $\mathbf{c} = \begin{bmatrix} 1 \ 4\end{bmatrix}$.

The gradient of h(x) with respect to x is computed by adding the gradient of g(x) with respect to x, computed above and the gradient of f(x) with respect to x computed above.

So, $\frac{\partial}{\partial\mathbf{x}}h(\mathbf{x}) = \frac{\partial}{\partial\mathbf{x}}g(\mathbf{x}) + \frac{\partial}{\partial\mathbf{x}}f(\mathbf{x}) = \frac{1}{2} \mathbf{x}^T \mathbf{H} + \mathbf{c}^T$

Setting this gradient to zero, we get $\frac{1}{2} \mathbf{x}^T \mathbf{H}$

To find the value of x when the gradient of h(x) is zero, we can set the equation $\frac{1}{2} \mathbf{x}^T \mathbf{H} + \mathbf{c}^T = \mathbf{0}$ and solve for x.

$\frac{1}{2} \mathbf{x}^T \mathbf{H} + \mathbf{c}^T = \mathbf{0}$

$\frac{1}{2} \mathbf{x}^T \begin{bmatrix} 2 & 0\\ 0 & 4\ \end{bmatrix} + \begin{bmatrix} 1 \ 4\end{bmatrix}^T\mathbf{x} = \mathbf{0}$

$\frac{1}{2} \begin{bmatrix} x_1 & x_2 \end{bmatrix} \begin{bmatrix} 2 & 0\\ 0 & 4\ \end{bmatrix} + \begin{bmatrix} x_1 & x_2 \end{bmatrix}\begin{bmatrix} 1 \ 4\end{bmatrix} = \mathbf{0}$

$\frac{1}{2} \begin{bmatrix} 2x_1 & 4x_2 \end{bmatrix} + \begin{bmatrix} x_1+4x_2\end{bmatrix} = \mathbf{0}$

$\begin{bmatrix} x_1+4x_2 & 2x \end{bmatrix}$

---
The gradient of $h(\mathbf{x})$ with respect to $\mathbf{x}$ is:

$\frac{\partial}{\partial\mathbf{x}}h(\mathbf{x}) = \frac{\partial}{\partial\mathbf{x}}\left(\frac{1}{2}\mathbf{x}^T\mathbf{H}\mathbf{x}+\mathbf{c}^T\mathbf{x}\right) = \frac{1}{2}\left(\mathbf{H}^T+\mathbf{H}\right)\mathbf{x}+\mathbf{c}$

So, $\frac{\partial}{\partial\mathbf{x}}h(\mathbf{x}) = 0$ when $\frac{1}{2}\left(\mathbf{H}^T+\mathbf{H}\right)\mathbf{x}=-\mathbf{c}$, $\left(\mathbf{H}+\mathbf{H}^T\right)\mathbf{x}=-2\mathbf{c}$

Given $\mathbf{H} = \begin{bmatrix} 2 & 0\\0 & 4 \end{bmatrix}$, $\mathbf{c} = \begin{bmatrix} 1 \ 4\end{bmatrix}$ so, $\left(\mathbf{H}+\mathbf{H}^T\right)\mathbf{x}=\begin{bmatrix} 2 & 0\\0 & 4 \end{bmatrix}\begin{bmatrix} x_1 \\x_2\end{bmatrix}=\begin{bmatrix} 2x_1 \\4x_2\end{bmatrix}$, and $-2\mathbf{c}=\begin{bmatrix} -2 \ -8\end{bmatrix}$, so we have the equation $\begin{bmatrix} 2x_1 \\4x_2\end{bmatrix}=\begin{bmatrix} -2 \\ -8\end{bmatrix}$ This gives the solution $\mathbf{x} =\begin{bmatrix} x_1 \\x_2\end{bmatrix}= \begin{bmatrix} -1 \\ -2\end{bmatrix}$.

To determine whether the point $\mathbf{x} = \begin{bmatrix} -1 \ -2 \end{bmatrix}$ is a local minimum, maximum, or saddle point of the function $h(\mathbf{x})$, we need to examine the Hessian matrix of $h(\mathbf{x})$, which is the matrix of second partial derivatives. The Hessian matrix for $h(\mathbf{x})$ is

$H = \frac{\partial^2}{\partial\mathbf{x}\partial\mathbf{x}^T}h(\mathbf{x})=\frac{\partial}{\partial\mathbf{x}}\left(\frac{1}{2}\left(\mathbf{H}^T+\mathbf{H}\right)\mathbf{x}+\mathbf{c}\right)=\frac{1}{2}\left(\mathbf{H}^T+\mathbf{H}\right) = \frac{1}{2}\begin{bmatrix} 2 & 0\\0 & 4 \end{bmatrix}$

which is the given $\mathbf{H}$. Since it's a symmetric matrix, we can see that it has eigenvalues 2,4. As these eigenvalues are both positive, the point $\mathbf{x} = \begin{bmatrix} -1 \ -2 \end{bmatrix}$ is a local minimum of the function $h(x)$.

# 4. Probability
## A. Robot Movement Probability
Use the [binomial distribution PMF](https://en.wikipedia.org/wiki/Binomial_distribution).

**Correct Response**:
$P(k) = {n \choose k} (p^k) (1 - p)^{(n-k)}$

Need to take $5$ steps forward and $3$ steps back to result in a net move of $2$ units. So prob of $5$ forward is $P(5)$.

$P(5) = {8 \choose 5} (0.3 ^ 5) (1 - 0.3)^{(8-5)}$
$P(5) = {8 \choose 5} (0.3 ^ 5) (0.7)^{3}$
$P(5) = 28 (0.09) (0.11764)$
$\textbf{P(5) = 0.29647}$


**ChatGPT Response:**
We can solve this problem by using the binomial probability mass function. The binomial probability mass function gives the probability of getting k successes out of n trials in a binomial experiment, where each trial has a probability p of success.

In this case, a "success" is a forward step, and a "failure" is a backward step. The probability of success is $p = 0.3$, the number of trials (steps) is $n = 8$, and we want to find the probability of $k = 2$ steps away from starting point.

The formula for the binomial probability mass function is: $P(k) = {n \choose k} (p^k) (1 - p)^{(n-k)}$

Where ${n \choose k} = \frac{n!}{k! (n-k)!}$

So the probability of taking 2 forward steps and 6 backward steps is: $P(2) = {8 \choose 2} (0.3^2) (0.7^6)$

where choose is the binomial co-efficient and n! means n factorial. Plugging in the numbers and solving we get:
$P(2) = 28(0.09)(0.0282475248) = 0.0773$

So the probability of the robot is $2$ steps away from the starting point at the end of $8$ steps is $0.0773$.

## B. Flu Probability
The ChatGPT response looks correct.

**ChatGPT Response:**
We can use Bayes' theorem to solve this problem. Bayes' theorem states that:
$$
P(B|A) = \frac{P(A|B)P(B)}{P(A)}
$$

We are given that $P(A) = 0.3$, $P(B) = 0.1$, and $P(A|B) = 0.9$, so we can substitute these values into the formula to get:
$$P(B|A) = \frac{0.9 * 0.1}{0.3}$$

And probability of the patient has the flu given they have a fever is $P(B|A)$
$$P(B|A) = \frac{0.9 * 0.1}{0.3} = 0.3$$

So, the probability that the new patient has the flu, given that they have a fever is 0.3.

## C. PDF for given

**ChatGPT Response:**
1.  In order for a function to be a valid probability density function, it must integrate to 1 over the entire sample space. So, we need to find the value of C that makes the following integral equal to 1: $$1 =\int_{-\infty}^{\infty}f(x)dx = \int_{0}^{\infty} Ce^{-x} dx$$
Solving this integral, we get: $$\int_{0}^{\infty} Ce^{-x} dx = C\left[-e^{-x}\right]_0^{\infty} = C\left(-e^{-\infty} + e^0\right) = -C + C = 0$$
**NOTE: This is not totally correct. Should result in $C(0+1)$**

So the integral of f(x) is not equal to one, therefore the function is not a valid probability density function.

2.  To find the expected value of x, we need to calculate the following integral: $$E(x) = \int_{-\infty}^{\infty}xf(x)dx = \int_{0}^{\infty} xCe^{-x} dx$$
Solving this integral, we get: $$\int_{0}^{\infty} xCe^{-x} dx = C\left[-xe^{-x}\right]_0^{\infty} = C\left(-\infty + 0\right) = 0$$
So, the expected value of x is 0.

However as mentioned before, it is not a valid probability density function. Therefore these values are not possible.

**Followup question:**
*What value of C would make the function a valid probability density function?*

For a function to be a valid probability density function, it must integrate to 1 over the entire sample space. In this case, the sample space is the positive real numbers, i.e., (0, $\infty$). So we need to find the value of C that makes the following integral equal to 1:
$$\int_{0}^{\infty} Ce^{-x} dx = C\left[-e^{-x}\right]_0^{\infty} = C\left(-e^{-\infty} + e^0\right) = C $$

And, therefore the integral is equal to $C$ , To make this integral equal to $1$ we need $C=1$

So the value of C that makes the function a valid probability density function is 1.

So the function can be written as $f(x) = e^{-x}$ for $x>0$ and 0 otherwise.
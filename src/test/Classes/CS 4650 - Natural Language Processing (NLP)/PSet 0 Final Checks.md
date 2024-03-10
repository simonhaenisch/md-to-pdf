Tags: #CS-4650📖🤖
Date Created: Friday Jan 13th, 2023
Time Created: 10:10

---
# Multivar Calc
Let $h(\mathbf{x})=\frac{1}{2}\mathbf{x}^T\mathbf{H}\mathbf{x}+\mathbf{c}^T\mathbf{x}$ , where  $\mathbf{x}$ is a vector, $\mathbf{H} = \begin{bmatrix}  2 & 0\\ 0 & 4\\ \end{bmatrix}$  and  $\mathbf{c} = \begin{bmatrix} 1 \\ 4\end{bmatrix}$.  When the gradient $\frac{\partial}{\partial\mathbf{x}}h(\mathbf{x}) = 0$, what is $\mathbf{x} =$? Is it a local minimum, maximum or saddle point? 

The gradient of $h(\mathbf{x})$ with respect to $\mathbf{x}$ is given by $\frac{\partial}{\partial\mathbf{x}}h(\mathbf{x}) = \mathbf{H}\mathbf{x}+\mathbf{c}$. Setting this equal to 0 gives $\mathbf{H}\mathbf{x}+\mathbf{c} = \mathbf{0}$. Solving for $\mathbf{x}$ gives $\mathbf{x} = -\mathbf{H}^{-1}\mathbf{c}$.

To determine whether $(-\mathbf{H}^{-1}\mathbf{c})$ is a local minimum, maximum, or saddle point, we need to evaluate the eigenvalues of the matrix $\mathbf{H}$. Since $\mathbf{H} = \begin{bmatrix} 2 & 0\\ 0 & 4\ \end{bmatrix}$, it is a diagonal matrix, and all its eigenvalues are on the diagonal. The eigenvalues are 2 and 4, both are positive, so $(-\mathbf{H}^{-1}\mathbf{c})$ is a local minimum.

# Geometry
True or False (if false, explain why)? $||\alpha\mathbf{u} + \mathbf{v}||^2 = \alpha^2||\mathbf{u}||^2 + ||\mathbf{v}||^2$, where $||\cdot||$ denotes Euclidean norm, $\alpha$ is a scalar, $\mathbf{u}$ and $\mathbf{v}$ are vectors.

**Response**
False.

$||\alpha\mathbf{u} + \mathbf{v}||^2 = (\alpha\mathbf{u} + \mathbf{v}) \cdot (\alpha\mathbf{u} + \mathbf{v})$

= $\alpha^2\mathbf{u}\cdot\mathbf{u} + 2\alpha\mathbf{u}\cdot\mathbf{v} + \mathbf{v}\cdot\mathbf{v}$

= $\alpha^2||\mathbf{u}||^2 + 2\alpha\mathbf{u}\cdot\mathbf{v} + ||\mathbf{v}||^2$.


The term $2\alpha\mathbf{u}\cdot\mathbf{v}$ is not equal to zero in general, so the equation is not true.

---
Show that the vector $\mathbf{w}$ is orthogonal to the line $\mathbf{w}^\top\mathbf{x} + b = 0$. (Hint: consider two points $\mathbf{x}_1$ and $\mathbf{x}_2$ that lie on the line.)

**Response**
If $\mathbf{x}_1$ and $\mathbf{x}_2$ are two points that lie on the line $\mathbf{w}^\top\mathbf{x} + b = 0$, then they must satisfy the equation: $\mathbf{w}^\top\mathbf{x}_1 + b = 0$ and $\mathbf{w}^\top\mathbf{x}_2 + b = 0$.

Then the dot product of $\mathbf{w}$ with the vector $\mathbf{x}_1 - \mathbf{x}_2$ that connects the two points is: $\mathbf{w}^\top(\mathbf{x}_1 - \mathbf{x}_2) = \mathbf{w}^\top\mathbf{x}_1 - \mathbf{w}^\top\mathbf{x}_2 = -b - (-b) = 0$

This means that $\mathbf{w}$ is orthogonal to any vector that lies in the line $\mathbf{w}^\top\mathbf{x} + b = 0$ . Hence, the vector $\mathbf{w}$ is orthogonal to the line $\mathbf{w}^\top\mathbf{x} + b = 0$.
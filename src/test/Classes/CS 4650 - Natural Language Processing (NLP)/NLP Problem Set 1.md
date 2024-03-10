If $\mathcal{Y} = {0,1}$, then $P_{Softmax}(y|\mathbf{x}) = \frac{e^{\mathbf{w}_y^T\mathbf{x}}}{e^{\mathbf{w}_0^T\mathbf{x}} + e^{\mathbf{w}_1^T\mathbf{x}}}$. To have $P_{Logistic}(y|\textbf{x}) = P_{Softmax}(y|\textbf{x}) \hspace{0.5em} \forall \hspace{0.5em} y \in \mathcal{Y}$, we need to have $\mathbf{w}_0^T\mathbf{x} = -\mathbf{w}_1^T\mathbf{x}$. This means $\mathbf{w} = \mathbf{w}_1 - \mathbf{w}_0$.

$\mathbf{w}_0^T\mathbf{x} + \mathbf{w}_1^T\mathbf{x}$

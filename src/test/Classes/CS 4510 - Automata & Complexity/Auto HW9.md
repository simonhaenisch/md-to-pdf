Tags: #CS-4510🧮
Date Created: Tuesday Apr 18th, 2023
Time Created: 14:52

---
# Resources
- ChatGPT Responses
	- [Polynomial Decidability](https://chat.openai.com/c/d14286ce-9e29-49bb-89e8-e6f62248fc7d)
	- [NP and HALF](https://chat.openai.com/c/9cb0c3f4-af86-4e31-8132-c8e69a113c34)
	- [NP-Complete Reduction](https://chat.openai.com/c/cfbdbe3f-3203-4ef9-93a9-7fb36d89a9d5)

---
# 1
To prove that the language $L$ is in the class P, we will give a polynomial time algorithm for checking membership in $L$. The algorithm is as follows:

1.  Sort the set of integers $S$ in non-descending order: $S_{sorted} = {x_1', x_2', ..., x_N'}$.
2.  For each $1 \leq n \leq N$, compute the partial sum $P_n = \sum_{i = 1}^n x_i'$.
3.  For each $1 \leq n \leq N$, check if $P_n \geq \frac{n(n - 1)}{2}$. If this condition holds for all $n$, then the set $S$ is in the language $L$; otherwise, it is not.

Now let's analyze the time complexity of the algorithm:

1.  Sorting the set of integers $S$ takes $O(N \log N)$ time using a comparison-based sorting algorithm like merge sort or quick sort.
2.  Computing the partial sums takes $O(N)$ time since we need to iterate through the sorted set once.
3.  Checking the condition for each $n$ also takes $O(N)$ time since we need to iterate through the sorted set once.

Overall, the time complexity of the algorithm is $O(N \log N) + O(N) + O(N) = O(N \log N)$, which is a polynomial time complexity. Therefore, the language $L$ is in the class P.

The algorithm works because when the set of integers is sorted in non-descending order, any permutation of the set will have a sum at least as large as the sorted version. Therefore, if the sorted version of the set satisfies the given condition, all permutations of the set will also satisfy the condition.

---
# 2
To show that $NP$ is closed under the $HALF()$ operation, we need to show that for any language $L \in NP$, $HALF(L) \in NP$ as well.

Let $L \in NP$. This means that there exists a polynomial-time deterministic Turing machine $V(x,y)$, called a verifier, such that $x \in L$ if and only if there exists a certificate (or witness) $y$ with $|y| \leq |x|^k$ for some constant $k$, where $V(x,y) = 1$.

Now, let's construct a new verifier $V'(x',y')$ for the language $HALF(L)$ as follows:

1.  Given input $(x',y')$, concatenate the two strings: $z = x'y'$.
2.  Run the verifier $V(z,w)$ for each possible witness $w$ with length $|w| \leq |z|^k$.
3.  If $V(z,w) = 1$ for some witness $w$, then accept $(x',y')$, i.e., output 1; otherwise, reject $(x',y')$, i.e., output 0.

Now, we claim that $x' \in HALF(L)$ if and only if there exists a certificate $y'$ such that $V'(x',y') = 1$.

Proof:

(=>) Suppose $x' \in HALF(L)$. By definition, there exists a string $y$ such that $xy \in L$ and $|x'|=|y|$. Let $y'$ be this string $y$. Now, $z = x'y' = xy$, so $z \in L$. Since $L \in NP$, there exists a witness $w$ with $|w| \leq |z|^k$ such that $V(z,w) = 1$. Hence, when we run $V'(x',y')$, it will find this witness $w$ and output 1.

(<=) Suppose there exists a certificate $y'$ such that $V'(x',y') = 1$. This means that there is a witness $w$ with $|w| \leq |z|^k$ such that $V(z,w) = 1$, where $z = x'y'$. Since $V(z,w) = 1$, we know that $z \in L$. Since $|x'| = |y'|$, we have $x' = x$ and $y' = y$, and thus $x' \in HALF(L)$.

So we have shown that for any $x' \in HALF(L)$, there exists a certificate $y'$ with length $|y'| \leq |x'|^k$ such that $V'(x',y') = 1$, and if $x' \notin HALF(L)$, there is no such certificate. Thus, the verifier $V'$ works in polynomial time and $HALF(L) \in NP$. Since $L$ was an arbitrary language in $NP$, we have shown that $NP$ is closed under $HALF()$.

## Chegg Response
To show that NP is closed under HALF, we need to show that there exists a non-deterministic polynomial time Turing machine that decides HALF(L) for any language L in NP.

Let L be a language in NP. By definition, there exists a non-deterministic polynomial time Turing machine M and a polynomial p such that for any string x in L, there exists a certificate y of length p(|x|) such that M(x, y) accepts.

We can construct a non-deterministic polynomial time Turing machine M' that decides HALF(L) as follows: Non-deterministically guess a certificate y of length p(|x|) for some input x. Compute the first half of y, denoted by x'. Simulate M on input x' and certificate y. If M accepts, accept; otherwise, reject. Note that M' correctly decides HALF(L) since if x is in HALF(L), then there exists a y such that xy is in L. Therefore, if we guess y and compute the first half of y, we obtain x, and then simulate M on x and y to determine if xy is in L. Since M runs in polynomial time, the overall runtime of M' is also polynomial. Therefore, we have shown that NP is closed under HALF.

Explanation:

The problem statement asks us to show that the set of strings which are the first half of some string in a language L, denoted by HALF(L), is in the complexity class NP. To do this, we need to show that there exists a polynomial-time non-deterministic Turing machine (NTM) that can decide whether a given string is in HALF(L) for any language L in NP. To prove this, we first need to understand what it means for a language to be in NP. A language is said to be in NP if there exists a polynomial-time non-deterministic Turing machine that can verify whether a given string is in the language. This means that we don't need to find a solution for the problem (which may be computationally expensive), but rather only need to verify whether a given solution is correct or not. So, to show that HALF(L) is in NP, we need to construct an NTM that can verify whether a given string x is in HALF(L) in polynomial time. We can do this by non-deterministically guessing a string y that is a suffix of x and checking if xy is in L using an NTM that decides L in polynomial time. The construction of the NTM involves two steps: guessing a string y and checking if xy is in L. The length of the guessed string y is at most polynomial in the length of x, which means that the time complexity of the NTM is polynomial in the length of x. If the NTM accepts x, then we can say that x is in HALF(L), and if it rejects x, then x is not in HALF(L). To prove the correctness of the NTM, we need to show that it accepts x if and only if x is in HALF(L). Suppose x is in HALF(L), then there exists a string y such that xy is in L. In this case, the NTM will accept x because it will be able to guess the correct y and verify that xy is in L using an NTM that decides L in polynomial time. On the other hand, if the NTM accepts x, then there must exist a string y such that xy is in L, and therefore, x is in HALF(L).

---
# 3
To prove that ALMOST-SAT is NP-complete, we need to show two things:

1.  ALMOST-SAT is in NP
2.  ALMOST-SAT is NP-hard
3.  Membership in NP:

An algorithm can guess a variable assignment and then check if it satisfies exactly m-1 clauses. This can be done in polynomial time with respect to the size of the input (i.e., the number of variables and clauses). Thus, ALMOST-SAT is in NP.

2.  NP-hardness:

To show that ALMOST-SAT is NP-hard, we need to find a known NP-complete problem and reduce it to ALMOST-SAT in polynomial time. We will use the SAT problem for this purpose. Given an instance of SAT with n variables and m clauses, we can create an instance of ALMOST-SAT as follows:

Let's construct a new CNF formula, with the same variables and clauses as the original SAT problem, and add an additional clause and an additional variable. The new clause will contain the new variable and its negation:

Original SAT formula: F New variable: x_{n+1} New clause: (x_{n+1} ∨ ¬x_{n+1}) New ALMOST-SAT formula: F' = F ∧ (x_{n+1} ∨ ¬x_{n+1})

Now, we show that F is satisfiable if and only if F' has an assignment that satisfies exactly m clauses:

(=>) If F is satisfiable, there is an assignment that satisfies all its clauses. We can extend this assignment to F' by setting the new variable x_{n+1} to either true or false. In either case, the new clause (x_{n+1} ∨ ¬x_{n+1}) is satisfied, so there is an assignment that satisfies exactly m clauses in F'.

(<=) If there is an assignment that satisfies exactly m clauses in F', then at least m clauses from the original F are satisfied. Since the new clause (x_{n+1} ∨ ¬x_{n+1}) is always satisfied, it must be the case that all m clauses from F are satisfied. Thus, F is satisfiable.

This reduction can be performed in polynomial time with respect to the size of the input, as it only requires adding one variable and one clause.

Since we have shown that ALMOST-SAT is in NP and that it is NP-hard, we can conclude that ALMOST-SAT is NP-complete.

## Chegg Response

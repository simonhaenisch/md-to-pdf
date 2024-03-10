Tags: #CS-4400💽ℹ
Date Created: Monday Feb 6th, 2023
Time Created: 14:03

---
# Resources

---
# Cardinality
Possible cardinality ratios for binary relationship types are:
- $1:1$
- $1:N$
- $N:1$
- $M:N$

**Example:**
If employee works on project is a $M:N$ relationship ($M$ employees, $N$ projects, many-to-many relationships), then the max possible size is all $M$ employees work on all $N$ projects.
For 20 employees and 10 projects, then result size can at most be $20 \times 10 = 200$ relationships.

# Minimum Sizes
If relationships are not required on either side, then the minimum result size will always be zero.

Min/max values change between many-to-one vs many-to-many types of relationships.
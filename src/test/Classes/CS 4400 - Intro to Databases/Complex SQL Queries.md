Tags: #CS-4400💽ℹ
Date Created: Tuesday Jan 24th, 2023
Time Created: 01:52

---
# Resources

---
# Aggregation Queries
## Pattern matching with LIKE
The `WHERE` clause can use `LIKE` instead of `=` and then use `%` to indicate 0+ missing characters. `_` can be used to match exactly one missing characters (add more for more characters).

Example:
```
# all employee last names that contain an e as the 2nd letter.
SELECT * FROM company.employee WHERE fname LIKE "_e%";
```

## Comparison with NULLs
Can use the `IS` or `IS NOT` clause for filtering NULL values, instead of `=`.

## DISTINCT and IN set
Can get only the distinct values from a column like so:
```
SELECT DISTINCT Essn FROM WORKS_ON WHERE Pno IN (1, 2, 3);
```

## Renaming with AS
Can rename/alias the results of query with `AS`.
Example:
```
SELECT CONCAT(lname, ', ', fname) AS full_name FROM EMPLOYEE;
```
would create a new value that can be referenced `full_name` without it existing as a column.

## Aggregate Functions
Several built-in aggregation functions: `COUNT`, `SUM`, `MAX`, `MIN`, and `AVG`.
Example:
```
SELECT AVG(salary) FROM Employee WHERE fname like "j%";
```

# Complex Queries
## Aggregate Functions


## Grouping
If `NULL` values exist in the grouping attribute, then a separate group is created for all rows with a `NULL` value for the attribute.

## Having
Retrieve values for groups that satisfy certain conditions.

`HAVING` is used in conjunction with `GROUP BY`.

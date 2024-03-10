Tags: #CS-4400💽ℹ
Date Created: Monday Mar 6th, 2023
Time Created: 14:07

---
# Steps
1. Mapping of Strong Entity Types  - 1 option
2. Mapping of Weak Entity Types - 1 option
3. Mapping of Class/Subclass
4. Mapping of Binary 1:1 Relationship Types - 3 options
5. Mapping of Binary 1:N Relationship Types - 2 options
6. Mapping of Binary M:N Relationship Types - 1 option (cross-reference option)
7. Mapping of Multi-value Attributes - 1 option
8. Mapping of Multivalued Attributes - 1 option
9. Mapping of N-ary Relationship Types - 1 option
10. 8a and 8b multiple tables, 8c and 8d single table

---
# Example
## Entities
**User (strong)**
*LoginID*, SSN, Email, First, Last, Title

**Department (strong)**
*DeptID*, Name

**Building (strong)**
*BuildingID*, Motto, Advisor \[FK5\]
FK5: Advisor $\rightarrow$ Instructor (LoginID)

**Course (weak)**
*Number*, *DeptID \[FK1\]*, Director \[FK6\]
FK1: DeptID $\rightarrow$ Department (DeptID)
FK6: Director $\rightarrow$ Instructor (LoginID)

**Student (subclass)**
*LoginID \[FK2\]*, GradYear, Mentor \[FK7\], Major \[FK8\], Housing \[FK9\]
FK2: LoginID $\rightarrow$ User (LoginID)
FK7: Mentor $\rightarrow$ Instructor (LoginID)
FK8: Major $\rightarrow$ Department (DeptID)
FK9: Housing $\rightarrow$ Building (BuildingID)

**Instructor (subclass)**
*LoginID \[FK3\]*, Field
FK3: LoginID $\rightarrow$ User (LoginID)


## Tables
**Take:**
Student_ID \[FK10\], (Course_num, Course_department) \[FK11\]
FK10: Student_ID $\rightarrow$ Student (UserID)
FK11: (Course_num, Course_department) $\rightarrow$ (Course (Number), Course (DeptID))

**Teach:**


**Prereq:**
(Course_before_num, Course_before_department)\[FK12\], (Course_after_num, Course_after_department)\[FK13\]
FK12: (Course_before_num, Course_before_department) $\rightarrow$ (Course (Number), Course (DeptID))
FK12: (Course_after_num, Course_after_department) $\rightarrow$ (Course (Number), Course (DeptID))

---
# Quiz for Lecture 21
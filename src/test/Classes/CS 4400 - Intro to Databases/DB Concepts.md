Tags: #CS-4400💽ℹ
Date Created: Tuesday Jan 24th, 2023
Time Created: 01:53

---
# Resources

---

# Database
A collection of related data.

- Represents a mini-world (one aspect of the real world)
- Logically coherent (not random)
- Built and designed for a specific purpose and specific group of users

# Database Management System (DBMS)
A software system that allows for defining, constructing, manipulating, and sharing of databases.

"Architecture" software.

# Database System
The DBMS and the database combined.
"Interface" software.

# Mini-worlds
Components of mini-worlds should have relationships. Relationships are expressed by an Entity Relationship Model (ER Diagram).

**Example:** A database for a UNIVERSITY environment would have:
- STUDENTs
- COURSEs
- SECTIONs (of COURSEs)
- (academic) DEPARTMENTs
- INSTRUCTORs

With relationships:
- SECTIONs are of specific COURSEs
- STUDENTs take SECTIONs
- COURSEs have prerequisite COURSEs

# Schema
The description of the datatypes
- Datatypes
- Constraints (required/optional, pairings, etc.)

The catalog contains a lot of information about the schema.

Schema *rarely* changes, but it *can*.

## Constructs 
Schemas are made up of constructs, which are components or objects within the schema (STUDENT, COURSE, etc.)

# Schema Levels
## Internal Schema
sdf

## Conceptual Schema
sdf

## External Schemas

# Instances
The data at a specific time.
An *instance* of STUDENT would look like
```
NAME: Ethan Bolton
GTID: 9033...
MAJOR: CS
```

# States
DB state changes *often* (any new entry), the schema changes *rarely*.

## Database State
The content of a db at a moment in time.

## Initial DB State
The db state when it is initially loaded into the system.

## Valid State
A state that satisfies the structure and constraints (the schema) of the db.


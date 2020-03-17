INSERT INTO department (name)
values ("IT"), ("Management"), ("Accounting"), ("HR"), ("Business Consultants");

INSERT INTO role (title, salary, department_id)
values ("Manager", 100000, 2), ("HR", 80000, 4), ("Accounting", 80000, 3), ("IT", 150000, 1), ("Business Consultants", 200000, 5);

INSERT INTO EMPLOYEES (first_name, last_name, role_id, manager_id)
values ("Bill", "Lumbergh", 1, null), ("Bob", "Slydell", 5, null), ("Bob", "Porter", 5, null), ("Milton", "Waddams", 3, 1),("Peter", "Gibbons", 4, 1), ("Michael", "Bolton", 4, 1),
("Samir", "Nagheenanajar", 4, 1);


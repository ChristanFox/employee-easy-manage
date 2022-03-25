USE company_db


INSERT INTO departments (name)
VALUES 
    ('Sales'),
    ('Engineering'),
    ('Legal'), 
    ('Finance');


INSERT INTO roles (title, salary, department_id)
VALUES 
    ('Salesperson', 80000, 1),
    ('Customer Service Rep', 72000, 1)
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Lawyer', 190000, 3),
    ('Paralegel', 78000, 3),
    ('Account Manager', 160000, 4),
    ('Accountant', 125000, 4);
    
INSERT INTO employees (firstname, lastname, role_id, manager_id)
VALUES 
    ('Eddy', 'Gordo', 1, 1),
    ('Christie', 'Monteiro', 2, 1),
    ('Nina', 'Williams' 3, 2),
    ('Steve', 'Fox', 4, 2),
    ('Marshall', 'Law', 5, 3),
    ('Forest', 'Law', 6, 3),
    ('Julia', 'Chang', 7, 4),
    ('Miharu', 'Hirano', 8, 4);
    



USE company_db


INSERT INTO department (name)
VALUES 
    ('Sales'),
    ('Engineering'),
    ('Legal'), 
    ('Finance');


INSERT INTO role (title, salary, department_id)
VALUES 
    ('Salesperson', 80000, 1),
    ('Customer Service Rep', 72000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Lawyer', 190000, 3),
    ('Paralegal', 78000, 3),
    ('Account Manager', 160000, 4),
    ('Accountant', 125000, 4);
    
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('Eddy', 'Gordo', 1, NULL),
    ('Christie', 'Monteiro', 2, NULL),
    ('Nina', 'Williams', 3, NULL),
    ('Steve', 'Fox', 4, 3),
    ('Marshall', 'Law', 5, NULL),
    ('Forest', 'Law', 6, 5),
    ('Julia', 'Chang', 7, NULL),
    ('Miharu', 'Hirano', 8, 7);
    



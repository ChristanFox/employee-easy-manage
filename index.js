const inquirer = require('inquirer');
const { type } = require('os');
const db = require('./db');
require('console.table');

// run with npm start
function init() {
    mainPrompt();
}

function mainPrompt() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'routes',
            message: 'What would you like to do?',
            choices: ['View', 'Create', 'Edit', 'Remove', 'Quit']
        }
    ]).then(answers => {
        switch(answers.routes) {
            case 'View':
                return viewPrompt();
            case "Create":
                return createPrompt(false);
            case "Edit":
                return editPrompt(false);
            case "Remove":
                return removePrompt(false);
            case "Quit":
                return quitApp();
        }
    });
}

function viewPrompt() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'view_table',
            message: 'View',
            choices: [
                {
                    name: 'View Departments',
                    value: 'department'
                },
                {
                    name: 'View Roles', 
                    value: 'role'
                },
                {
                    name: 'View Employees', 
                    value: 'employee'
                },
                {
                    name: 'View Employees by Manager', 
                    value: 'employee_manager'
                },
                {
                    name: 'View Employees by Department', 
                    value: 'employee_department'
                },
                {
                    name: 'View Departments total budget', 
                    value: 'department_budget'
                }
                ]
        }
    ]).then(res => {
        let view_table = res.view_table;
        switch (view_table) {
            case 'department':
                viewDepartments();
                break;
            case 'role':
                viewRoles();
                break;
            case 'employee':
                viewEmployees();
                break;
            case 'employee_manager':
                viewByManager();
                break;
            case 'employee_department':
                viewByDepartment();
                break;
            case 'department_budget':
                viewDepartmentBudget();
                break;
        }
    })
}

function createPrompt() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'create_table',
            message: 'create',
            choices: [
                {
                    name: 'Create Department',
                    value: 'department'
                },
                {
                    name: 'Create Role', 
                    value: 'role'
                },
                {
                    name: 'Create Employee', 
                    value: 'employee'
                }
                ]
        }
    ]).then(res => {
        let create_table = res.create_table;
        switch (create_table) {
            case 'department':
                createDepartment();
                break;
            case 'role':
                createRole();
                break;
            case 'employee':
                addEmployee();
                break;
        }
    })
}

function editPrompt() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'edit_table',
            message: 'Edit',
            choices: [
                {
                    name: 'Edit Employee Role', 
                    value: 'edit_role'
                },
                {
                    name: 'Edit Employee Manager', 
                    value: 'edit_manager'
                }
                ]
        }
    ]).then(res => {
        let edit_table = res.edit_table;
        switch (edit_table) {
            case 'edit_role':
                editRole();
                break;
            case 'edit_manager':
                editManager();
                break;
        }
    })
}

function viewDepartments() {
    db.allDepartments()
        .then(([rows]) => {
            let departments = rows;
            console.table(departments);
        })
        .then(() => mainPrompt());
}

function viewRoles() {
    db.allRoles()
        .then(([rows]) => {
            let departments = rows;
            console.table(departments);
        })
        .then(() => mainPrompt());
}

function viewEmployees() {
    db.currentEmployees()
        .then(([rows]) => {
            let departments = rows;
            console.table(departments);
        })
        .then(() => mainPrompt());
}

function viewByManager() {
    db.viewByManager()
        .then(([rows]) => {
            let departments = rows;
            console.table(departments);
        })
        .then(() => mainPrompt());
}

function viewByDepartment() {
    db.currentEmployees()
        .then(([rows]) => {
            let departments = rows;
            console.table(departments);
        })
        .then(() => mainPrompt());
}

function viewDepartmentBudget() {
    db.viewDepartmentBudget()
        .then(([rows]) => {
            let departments = rows;
            console.table(departments);
        })
        .then(() => mainPrompt());
}

function createDepartment() {
    inquirer.prompt([
        {
            name: 'name',
            message: 'What is the name of the department you are creating?'
        }
    ]).then(res => {
        let name = res;
        db.createDepartment(name)
            .then(() => console.log(`Added ${name.name} to the database`))
            .then(() => mainPrompt())
    })
}
function createRole() {
    db.allDepartments()
        .then(([rows]) => {
            let departments = rows;
            const departmentChoices = departments.map(({id, name}) => ({
                name: name,
                value: id
            }));
            inquirer.prompt([
                {
                    name: 'title',
                    message: 'What is the name of the role you are creating?'
                },
                {
                    name: 'salary',
                    message: 'What is the starting salary for this role?'
                },
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'What department does this role fall under?',
                    choices: departmentChoices
                }
            ]).then(role => {
                db.createRole(role)
                    .then(() => console.log(`Added ${role.title} to the database`))
                    .then(() => mainPrompt());
            })
        })
}
function addEmployee() {
    inquirer.prompt([
        {
            name: 'first_name',
            message: 'What is their first name?'
        },
        {
            name: 'last_name',
            message: 'What is their last name?'
        }
    ]).then(res => {
        let firstName = res.first_name;
        let lastName = res.last_name;

        db.allRoles()
            .then(([rows]) => {
                let roles = rows;
                const roleChoices = roles.map(({ id, title}) => ({
                    name: title,
                    value: id
                }));

                inquirer.prompt({
                    type: 'list',
                    name: 'roleId',
                    message: 'What is their role?',
                    choices: roleChoices
                })
                .then(res => {
                    let roleId = res.roleId;

                    db.currentEmployees()
                        .then(([rows]) => {
                            let employees = rows;
                            const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                                name: `${first_name} ${last_name}`,
                                value: id
                            }));

                            managerChoices.unshift({ name: "None", value: null });

                            inquirer.prompt({
                                type: "list",
                                name: "managerId",
                                message: "Who's the employee's manager?",
                                choices: managerChoices
                            })
                                .then(res => {
                                    let employee = {
                                        manager_id: res.managerId,
                                        role_id: roleId,
                                        first_name: firstName,
                                        last_name: lastName
                                    }

                                    db.addEmployee(employee);
                                })
                                .then(() => console.log(
                                    `Added ${firstName} ${lastName} to the database`
                                )).then(() => mainPrompt())
                        })        
                })
            })
    })   
}

function editRole() {
    db.currentEmployees()
        .then(([rows]) => {
            let employees = rows;
            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

            inquirer.prompt([
                {
                    type: "list",
                    name: "employeeId",
                    message: "Which employee's role do you want to update?",
                    choices: employeeChoices
                }
            ])
                .then(res => {
                    let employeeId = res.employeeId;
                    db.allRoles()
                        .then(([rows]) => {
                            let roles = rows;
                            const roleChoices = roles.map(({ id, title }) => ({
                                name: title,
                                value: id
                            }));

                            inquirer.prompt([
                                {
                                    type: "list",
                                    name: "roleId",
                                    message: "What's the new role of this employee?",
                                    choices: roleChoices
                                }
                            ])
                                .then(res => db.editRole(employeeId, res.roleId))
                                .then(() => console.log("Employee's role is updated"))
                                .then(() => mainPrompt())
                        });
                });
        })
}

function editManager() {
    db.currentEmployees()
        .then(([rows]) => {
            let employees = rows;
            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeId',
                    message: 'Who need their manager updated?',
                    choices: employeeChoices
                }
            ])
                .then(res => {
                    let managerId = res.employeeId;
                    db.currentEmployees()
                        .then(([rows]) => {
                            let employees = rows;
                            const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                                name: `${first_name} ${last_name}`,
                                value: id
                            }));

                            inquirer.prompt([
                                {
                                    type: 'list',
                                    name: 'managerId',
                                    message: 'Who is this employees new manager?',
                                    choices: managerChoices
                                }
                            ])
                                .then(res => db.editManager(managerId, res.managerId))
                                .then(() => console.log('Employee Manager is updated'))
                                .then(() => mainPrompt())
                        });
                });
        })
}

init();

module.exports.init = init;
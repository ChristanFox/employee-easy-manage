const inquirer = require('inquirer');
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
            choices: ['View', 'Add', 'Edit', 'Remove', 'Quit']
        }
    ]).then(answers => {
        switch(answers.routes) {
            case 'View':
                return viewPrompt();
            case "Add":
                return createPrompt(false);
            case "Edit":
                return updatePrompt(false);
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
                    name: 'All Departments',
                    value: 'department'
                },
                {
                    name: 'All Roles', 
                    value: 'role'
                },
                {
                    name: 'All Employees', 
                    value: 'employee'
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
        }
    })
}

// View all departments
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
init();

module.exports.init = init;
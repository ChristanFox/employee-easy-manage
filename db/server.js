const connection = require('.\config\connection.js');

class company_db {
    constructor(connection) {
        this.connection = connection;
    }

    // Lists all current employees
    allEmployees() {
        return this.connection.promise().query(
            'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.firstname, "", manager.lastname) AS manager FROM employee LEFT JOIN role on employee.role_id = department.id LEFT JOIN employee manager on manager.id = employee.manager.id;'
        );
    }

    // Add a new employee
    addEmployee(employee) {
        return this.connection.promise().query('INSERT INTO employee SET ?', employee);
    } 

    // Remove an employee from the list
    deleteEmployee(employeeId) {
        return this.connection.promise().query(
            'DELETE FROM employee WHERE id = ?',
            employeeId
        );
    }

    // List all the managers
    allManagers(employeeId) {
        return this .connection.promise().query(
            'SELECT id, first_name FROM employee Where id != ?',
            employeeId
        );
    }

    // List all roles
    allRoles() {
        return this.connection.promise().query(
            'SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;'
        );
    }

    // Create new roles
    createRole(role) {
        return this.connection.promise().query(
            'INSERT INTO role SET ?', 
            role
        );
    }

    // List all departments
    allDepartments() {
        return this.connection.promise().query(
            'SELECT department.id, department.name FROM department;'
        );
    }

    // Create new department
    createDepartment(department) {
        return this.connection.promise().query(
            'INSERT INTO department SET ?',
            department
        );
    }
}

module.exports = new company_db(connection);
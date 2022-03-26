const connection = require('./connection.js');

class companyDB {
    constructor(connection) {
        this.connection = connection;
    }

    // Lists all current employees
    currentEmployees() {
        return this.connection.promise().query(
            'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, "", manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;'
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

module.exports = new companyDB(connection);
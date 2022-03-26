const connection = require('./config/connection');

class employee_db {
    constructor(connection) {
        this.connection = connection;
    }

    // Lists all current employees
    allEmployees() {
        return this.connection.promise().query(
            'SELECT employee.id, employee.firstname, employee.lastname, role.title, department.name AS department, role.salary, CONCAT(manager.firstname, "", manager.lastname) AS manager FROM employee LEFT JOIN role on employee.role_id = department.id LEFT JOIN employee manager on manager.id = employee.manager.id;'
        );
    }

    // Add a new employee
    addEmployee(employee) {
        return this.connection.promise().query('INSERT INTO employee SET ?', employee);
    } 

    // Remove an employee from the list
    deleteEmployee(employeeId) {
        return this.connection.promise().query(
            'DELETE FFROM employee WHERE id = ?',
            employeeId
        );
    }
}
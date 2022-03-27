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

    // Lists all current employees by department
    viewByManager() {
        return this.connection.promise().query(
            'SELECT employee.id, employee.first_name, employee.last_name, CONCAT(manager.first_name, "", manager.last_name) AS manager FROM employee LEFT JOIN employee manager on manager.id = employee.manager_id;'
        );
    }

    // Lists all current employees by department
    viewByDepartment() {
        return this.connection.promise().query(
            'SELECT employee.id, employee.first_name, employee.last_name, department.name AS department FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id;'
        );
    }

    // Lists total budget by department
    viewDepartmentBudget() {
        return this.connection.promise().query(
            'SELECT department.id AS id, department.name AS department, SUM(salary) AS budget FROM  role INNER JOIN department ON role.department_id = department.id GROUP BY  role.department_id;'
        );
    }

    // Add a new employee
    addEmployee(employee) {
        return this.connection.promise().query(
            'INSERT INTO employee SET ?',
             employee
        );
    } 

    // Remove an employee from the list
    deleteEmployee(employeeId) {
        return this.connection.promise().query(
            'DELETE FROM employee WHERE id = ?',
            employeeId
        );
    }

    // Remove a department from the list
    deleteRole(roleId) {
        return this.connection.promise().query(
            'DELETE FROM role WHERE id = ?',
            roleId
        );
    }

    // Remove a department from the list
    deleteDepartment(departmentId) {
        return this.connection.promise().query(
            'DELETE FROM department WHERE id = ?',
            departmentId
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

    // Update employee role
    editRole(employeeId, roleId) {
        return this.connection.promise().query(
            'UPDATE employee SET role_id = ? WHERE id = ?',
            [roleId, employeeId]
        );
    }

    // Update employee manager
    editManager(employeeId, managerId) {
    return this.connection.promise().query(
        'UPDATE employee SET manager_id = ? WHERE id = ?',
        [managerId, employeeId]
        );
    }
}

module.exports = new companyDB(connection);
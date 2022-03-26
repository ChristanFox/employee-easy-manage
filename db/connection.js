const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
        database: 'company_db',
        host: "localhost",
        user: "root",
        password: "Disc0infern0"
});
      
      module.exports = connection;
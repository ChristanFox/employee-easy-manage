const { prompt } = require('inquirer');
const db = require('./db');
const Font = require('ascii-art-font');

require('console.table');

// run "npm start" to begin
var init = () => {
    font.create('Employee','Doom',(err, result) => {
        if (err) throw err;
        console.log(result);
        font.create('Tracker','Doom',(err, result) => {
            if (err) throw err;
            console.log(result);
        });
    });
}

module.exports.init = init;
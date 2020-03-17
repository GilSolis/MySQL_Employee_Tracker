let mysql = require("mysql");
let inquirer = require("inquirer");

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password1",
  database: "initech"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

function start() {
  console.log("inside the start()");
  inquirer.prompt([
    {
      name: "action",
      type: "list",
      message: "what would you like to do?",
      choices: ["Add", "View", "Update", "Delete"]
    },
    {
      name: "option",
      type: "list",
      message: "Select from these options?",
      choices: ["Employee", "Role", "Department"]
    }
  ]);
}

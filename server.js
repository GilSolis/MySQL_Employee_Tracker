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
  inquirer
    .prompt([
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
    ])
    .then(function(res) {
      console.log(`You have chosen to ${res.action} ${res.option}`);

      switch (res.action) {
        case "Add":
          createData(res.option);
          break;
        case "View":
          readData(res.option);
          break;
        case "Update":
          updateData(res.option);
          break;
        case "Delete":
          deleteData(res.option);
          break;
      }
    })
    .catch(function(err) {
      console.log(err);
    });
}
//**********data function*************
function createData(option) {
    switch(option){
        case "Employee":
            connection.query("Select * from roles", function (err, res){
                if (err) throw err;
                const roles = res.map(object => {
                    return {
                        name: object.title,
                        value: object.id
                    }
                });
                roles.push("None")

                connection.query("select * from employee", function (err, res){
                    if (err) throw err;
                    const employees = res.map(object => {
                        return{
                            name:`${object.first_name} ${object.last_name}`,
                            value: object.id
                        }
                    })
                    employees.unshift({
                        name: 'No manager',
                        value: null
                    })

                    inquirer.prompt([{
                        name: "first_name",
                        type:"input",
                        message: "What is the employee's first name?"
                    },
                    {
                    name: "last_name",
                    type: "input",
                    message: "What is the employees last name?"
                      },
                      {
                    name: "role",
                    type: "list",
                    message: "What is the employees role?",
                    choices: roles
                      },
                      {
                          name: "manager",
                          type: "list",
                          message: "Who is the employee's manager?",
                          choices: employees
                      },
                    ]).then(function (res){
                        if(res.role === "N/A"){
                            genRolePrompt();
                        }else{
                            console.log(`Inserting ${res.first_name} ${res.last_name} as a new employee`);
                            connection.query(
                                "Insert INTO employee SET ?", {
                                    first_name: res.first_name,
                                    last_name: res.last_name,
                                    role_id: res.role,
                                    manager_id: res.manager,
                                },
                                function (err, res){
                                    if (err) throw err;
                                    console.log("Employee Added");
                                    continuePrompt();
                                }
                            );
                        }
                    }).catch(function (err) {
                        console.log(err);
                    })
                });
            });
            break;

            case 'Role':
                connection.query("Select * FROM department", function (err, res){
                    if (err) throw err;
                    const departments = res.map(object => {
                        return{
                            name: object.name,
                            value: object.id
                        }
                    });
                    departments.push("N/A")

                    inquirer.prompt([{
                        name:"title",
                        type:"input",
                        message: "What is the title of the role?"
                    },
                    {
                        name: "salary",
                        type: "number",
                        message: "What is the salary of the new role?"
                    },
                    {
                        name: "department",
                        type: "list",
                        message: "What is the employee's department?",
                        choices: departments
                    }
                    ]).then(function (res){
                        if (res.department === "N/A"){
                            genDepartmentPrompt();
                        } else {
                            console.log("New role created");
                            connection.query(
                                "INSERT INTO role SET ?", {
                                    title: res.title,
                                    salary: res.salary,
                                    department_id: res.department
                                }, function (err, res){
                                    if (err) throw err;
                                    console.log("Role Inserted");
                                    continuePrompt()
                                }                             
                            )
                        }
                    }).catch(function(err){
                        console.log(err)
                    })
                });
                break;

                case "Department":
                    inquirer.prompt([{
                        name: "departmentname",
                        type: "input",
                        message:"New department name?"
                    }]).then(function (res){
                        console.log("New Department incoming.....")
                        connection.query("INSERT INTO department SET ?", {
                            departmentName: res.departmentname
                        } function (err, res){
                            if (err) throw err;
                            console.log("Department inserted")
                            continuePrompt()
                        
                        })
                    }).catch(function (err)
                    {
                        console.log(err);
                    })
                    break;
                }};
//*******read data********

function readData(res){
    switch(res){
        case "Employee":
        console.log("Selecting all Employees");
        connection.query("Select * FROM employee", function(err, res){
            if(err) throw err;
            console.table(res)
            continuePrompt()
        });
        break;
        case "Role":
            console.log("Selecting all roles");
            connection.query("Select * from roles", function(err, res){
                if (err) throw err;
                console.table(res);
                continuePrompt()
            });
        break;            
    }
}



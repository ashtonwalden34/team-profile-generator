const inquirer = require("inquirer");
const htmlRender = require("./Develop/lib/htmlRenderer.js");
const Intern = require('./Develop/lib/Intern.js');
const Manager = require('./Develop/lib/Manager.js');
const Engineer = require('./Develop/lib/Engineer.js');
const fs = require("fs");

// variable to store team members
var team = [];
//var idNum = team.length;

// Function asks base questions for all employees
function employeeQs() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "role",
                message: "Please enter role",
                choices: [
                    "Manager",
                    "Intern",
                    "Engineer"
                ]
            },
            {
                type: "input",
                name: "name",
                message: "Enter your name"
            },
            {
                type: "input",
                name: "email",
                message: "Enter your email"
            },
            {
                type: "input",
                name: "id",
                message: "Enter your id number"
            }
            // Funciton asks specific question based on role of employee
        ]).then(function (answers) {
            if (answers.role == "Intern") {
                askInternQs(answers);
            }else if (answers.role == "Manager"){
                askManagerQs(answers);
            }else if (answers.role == "Engineer"){
                askEngineerQs(answers);
            }else
                return "Please enter a valid postion."
            })
            //.then(function (answers) {
                //addTeamQs(answers);
            //});
};
// Runs function for base employee questions
employeeQs();

// Function for intern specific questions
function askInternQs(baseAnswer) {
    inquirer
        .prompt({
            type: "input",
            name: "school",
            message: "Enter your school."
        }).then(function(internQ){
            // make new class
            var newIntern = new Intern(baseAnswer.name, baseAnswer.id, baseAnswer.email, internQ.school)
            team.push(newIntern)
            //idNum();
            addTeamQs();
            //idNum = team.length;
        })
};

// Function for Manager specific questions
function askManagerQs(baseAnswer) {
    inquirer
        .prompt({
            type: "input",
            name: "officeNumber",
            message: "Enter your office number."
        }).then(function(ManagerQ){
            // make new class
            //console.log(baseAnswer);
            //console.log(ManagerQ.officeNumber);
            var newManager = new Manager(baseAnswer.name, baseAnswer.id, baseAnswer.email, ManagerQ.officeNumber)
            team.push(newManager)
            //idNum();
            addTeamQs();
            //idNum = team.length;
        })
};

// Function for Engineer specific questions
function askEngineerQs(baseAnswer) {
    inquirer
        .prompt({
            type: "input",
            name: "GitHubUser",
            message: "Enter your GitHub username."
        }).then(function(EngineerQ){
            // make new class
            var newEngineer = new Engineer(baseAnswer.name, baseAnswer.id, baseAnswer.email, EngineerQ.GitHubUser)
            team.push(newEngineer)
            //idNum();                         
            addTeamQs();
            //var idNum = team.length;
        })
};

// Function to ask the user if they would like to add another team member
function addTeamQs() {
    inquirer
        .prompt({
            type: "confirm",
            name: "addTeam",
            message: "Would you like to add another team member?",
            choices: [
                "yes",
                "no"
            ]
        }).then(function(answers){
            //console.log(answers.addTeam);
            if (answers.addTeam == true) {
                employeeQs();
            }else if (answers.addTeam == false) {
                //console.log(team);
                htmlRender(team);
                fs.writeFile("team.html",htmlRender(team), (err) => {
                    if (err) throw err;
                    //console.log('The file has been saved!');
                  });
            }
        })
    };
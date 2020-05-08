const inquirer = require("inquirer");
const htmlRender = require("./Develop/lib/htmlRenderer.js");
const Intern = require('./Develop/lib/Intern.js');
const Manager = require('./Develop/lib/Manager.js');
const Engineer = require('./Develop/lib/Engineer.js');

var team = [];

function employeeQs() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "roleQuestion",
                message: "Please enter role",
                choices: [
                    "Manager",
                    "Intern",
                    "Engineer"
                ]
            },
            {
                type: "input",
                name: "nameQuestion",
                message: "Enter your name"
            },
            {
                type: "input",
                name: "email",
                message: "Enter your email"
            }
        ]).then(function (answers) {
            if (answers.roleQuestion == "Intern") {
                askInternQs(answers);
            }else if (answers.roleQuestion == "Manager"){
                askManagerQs(answers);
            }else if (answers.roleQuestion == "Engineer"){
                askEngineerQs(answers);
            }else
                return "Please enter a valid postion."
            }).then(function (answers) {
                addTeamQs(answers);
            });
};

employeeQs();

function askInternQs(baseAnswer) {
    inquirer
        .prompt({
            type: "input",
            name: "school",
            message: "Enter your school."
        }).then(function(internQ){
            // make new class
            var newIntern = new Intern(baseAnswer.name)
            team.push(newIntern)
        })
};

function askManagerQs(baseAnswer) {
    inquirer
        .prompt({
            type: "input",
            name: "officeNumber",
            message: "Enter your office number."
        }).then(function(ManagerQ){
            // make new class
            var newManager = new Manager(baseAnswer.name)
            team.push(newManager)
        })
};

function askEngineerQs(baseAnswer) {
    inquirer
        .prompt({
            type: "input",
            name: "GitHubUser",
            message: "Enter your GitHub username."
        }).then(function(EngineerQ){
            // make new class
            var newEngineer = new Engineer(baseAnswer.name)
            team.push(newEngineer)
        })
};

function addTeamQs(){
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
            if (answers.addTeam == "yes") {
                employeeQs();
            }else if (answers.addTeam == "no") {
                htmlRender();
            }
        })
    };
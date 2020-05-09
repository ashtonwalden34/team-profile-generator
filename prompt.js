const inquirer = require("inquirer");
const htmlRender = require("./Develop/lib/htmlRenderer.js");
const Intern = require('./Develop/lib/Intern.js');
const Manager = require('./Develop/lib/Manager.js');
const Engineer = require('./Develop/lib/Engineer.js');
const fs = require("fs");

var team = [];

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
            }
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

employeeQs();

function askInternQs(baseAnswer) {
    inquirer
        .prompt({
            type: "input",
            name: "school",
            message: "Enter your school."
        }).then(function(internQ){
            // make new class
            var newIntern = new Intern(baseAnswer.name, 1, baseAnswer.email, internQ.school)
            team.push(newIntern)
            addTeamQs();
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
            console.log(baseAnswer);
            console.log(ManagerQ.officeNumber);
            var newManager = new Manager(baseAnswer.name, 1, baseAnswer.email, ManagerQ.officeNumber)
            team.push(newManager)
            addTeamQs();
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
            var newEngineer = new Engineer(baseAnswer.name, 1, baseAnswer.email, EngineerQ.GitHubUser)
            team.push(newEngineer)
            addTeamQs();
        })
};

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
            console.log(answers.addTeam);
            if (answers.addTeam == true) {
                employeeQs();
            }else if (answers.addTeam == false) {
                console.log(team);
                htmlRender(team);
                fs.writeFile("team.html",htmlRender(team), (err) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                  });
            }
        })
    };


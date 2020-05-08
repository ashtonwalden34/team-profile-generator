var inquirer = require("inquirer");
//const render = require("./lib/htmlRenderer");
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
            console.log(answers);
            if (roleQuestion = "Intern") {
                askInternQs(answers);
            }else if (roleQuestion = "Manager"){
                askManagerQs(answers);
            }else if (roleQuestion = "Engineer"){
                askEngineerQs(answers);
            }else
                return "Please enter a valid postion."
            })
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
            type: "list",
            name: "addTeam",
            message: "Would you like to add another team member?",
            choices: [
                "yes",
                "no"
            ]

        })
};








// one more question that says do u want to add another ??

// if they do not want ot add another then run htmlRenderer
var inquirer = require('inquirer');
var shell = require('shelljs/global');

var questions = [

  // name
  // email
  // aliases
    // checkboxes, default all checked
    // defaults:
      // co "checkout"
      // ci "commit"
      // st "status"
      // br "branch"
      // mr "merge"
      // hist "log --pretty=format: '%C(yellow)%h%Creset %Cgreen%ad%Creset | %s%C(magenta)%d%Creset [%Cblue%an%Creset]' --graph --date=short --decorate"
      // type "cat-file -t"
      // dump "cat-file -p"
    // additional custom aliases?

  {
    name: 'confirm',
    message: 'Are  you ready to configure git?',
    default: 'y',
    validate: function(value) {
      var pass = value === 'y' || value === 'n';
      if (pass) {
        return true;
      } else {
        return 'Please enter y or n';
      }
    },
  },
  {
    name: 'name',
    message: 'What is your full name?',
    validate: function(value) {
      var pass = value.match(/^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/);
      if (pass) {
        return true;
      } else {
        return 'Please enter your *full* name';
      }
    },
  },
  {
    name: 'email',
    message: 'What is your email address?',
    validate: function(value) {
      var pass = value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      if (pass) {
        return true;
      } else {
        return 'Please enter a valid email';
      }
    },
  },

  // more questions...
];

inquirer.prompt(questions, function(answers) {
  console.log(answers);

  // perform shell operations with the answers to set up git configs
});


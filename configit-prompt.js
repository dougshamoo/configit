#! /usr/bin/env node

var inquirer = require('inquirer');
var shell = require('shelljs');
var validator = require('validator');

// Define question objects for inquirer prompt
var questions = [
  {
    name: 'name',
    message: 'What is your full name?',
  },
  {
    name: 'email',
    message: 'What is your email address?',
    validate: function(value) {
      return validator.isEmail(value) || 'Please enter a valid email';
    },
  },
  {
    type: 'checkbox',
    message: 'Select git aliases',
    name: 'aliases',
    choices: [
      new inquirer.Separator('The basics:'),
      {
        name:'co: checkout',
        checked: true,
      },
      {
        name:'ci: commit',
        checked: true,
      },
      {
        name:'st: status',
        checked: true,
      },
      {
        name:'br: branch',
        checked: true,
      },
      {
        name:'mr: merge',
        checked: true,
      },
      new inquirer.Separator('The extras:'),
      {
        name: 'hist: print nicely formatted commit log',
      },
      {
        name: 'type: type file',
      },
      {
        name: 'dump: dump file',
      },
    ],
  },

  // TODO: Add custom aliases?
];

inquirer.prompt(questions, function(answers) {
  console.log(answers);

  // set name and email in gitconfig
  setGitInfo('name', answers.name);
  setGitInfo('email', answers.email);

  // set preset git aliases in gitconfig
  setGitAliases(answers.aliases);

  // TODO: Set custom aliases to gitconfig
});

function setGitInfo(key, info) {
  // prefix for setting gitconfig user data
  var USER_CONFIG = 'git config --global user.';

  // execute shell command to add or change user info
  shell.exec(USER_CONFIG + key + ' "' + info + '"');
}

function setGitAliases(aliasStrings) {
  // prefix for setting gitconfig alias
  ALIAS_CONFIG = 'git config --global alias.';
  PRESET_ALIASES = {
    co: 'checkout',
    ci: 'commit',
    st: 'status',
    br: 'branch',
    mr: 'merge',
    hist: "log --pretty=format:'%h %ad | %s%d [%an]' --graph --date=short",
    type: 'cat-file -t',
    dump: 'cat-file -p',
  };

  aliasStrings.forEach(function(string) {
    // get alias
    var alias = string.split(':')[0];

    // execute shell command to add or change alias
    shell.exec(ALIAS_CONFIG + alias + ' "' + PRESET_ALIASES[alias] + '"');
  });
}


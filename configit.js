var inquirer = require('inquirer');
var shell = require('shelljs');
var validator = require('validator');


var questions = [

  // name
  // email
  // aliases
  //   checkboxes, default all checked
  //   defaults:
  //   additional custom aliases?

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

  // TODO: Set selected aliases to gitconfig
});

function setGitInfo(key, info) {
  // prefix for convenience
  var USER_CONFIG = 'git config --global user.';

  // execute shell command to add or change user info
  shell.exec(USER_CONFIG + key + ' "' + info + '"');
}

function setGitAlias(aliasStrings) {
  PRESET_ALIASES = {
    co: 'checkout',
    ci: 'commit',
    st: 'status',
    br: 'branch',
    mr: 'merge',
    hist: 'log --pretty=format:"%h %ad | %s%d [%an]" --graph --date=short',
    type: 'cat-file -t',
    dump: 'cat-file -p',
  };

  //TODO: execute shell commands to set git aliases
  // for each element in aliasStrings
    // get alias, everything before the ':'
    // get git command from PRESET_ALIASES
    // run shell command to add them to gitconfig
}


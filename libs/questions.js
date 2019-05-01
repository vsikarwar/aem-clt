const inquirer = require('inquirer');

const q = {
  'host' : [{
    name: 'host',
    type: 'input',
    message: 'AEM instance Host Name:',
    validate: (value) => {
      if(value.length){
        return true;
      }else{
        return 'Please enter AEM instance hostname.';
      }
    }
  }],
  'user' : {
    name: 'user',
    type: 'input',
    message: 'Enter AEM instance username:',
    validate: (value) => {
      if(value.length){
        return true;
      }else{
        return 'Please enter AEM instance username.';
      }
    }
  },
  'pass' : {
    name: 'pass',
    type: 'password',
    message: 'Enter AEM instance password',
    validate: (value) => {
      if(value.length){
        return true;
      }else{
        return 'Please enter AEM instance password.';
      }
    }
  },
  'newUserId' : {
    name: 'newUserId',
    type: 'input',
    message: 'Enter User ID you want to create:',
    validate: (value) => {
      if(value.length){
        return true;
      }else{
        return 'Enter User ID you want to create:';
      }
    }
  },
  'firstName' : {
    name: 'firstName',
    type: 'input',
    message: 'Enter first Name:'
  },
  'lastName' : {
    name: 'lastName',
    type: 'input',
    message: 'Enter Last Name:',
    validate: (value) => {
      if(value.length){
        return true;
      }else{
        return 'Enter Last Name:';
      }
    }
  },
  'email' : {
    name: 'email',
    type: 'input',
    message: 'Enter Email:'
  },
  'newUserPass' : {
    name: 'newUserPass',
    type: 'password',
    message: 'Enter Password:',
    validate: (value) => {
      if(value.length){
        return true;
      }else{
        return 'Enter Password:';
      }
    }
  },
  'userPath' : {
    name: 'userPath',
    type: 'input',
    message: 'Enter path where you want user to exist:'
  },
  'category' : [{
    name: 'category',
    type: 'list',
    message: 'Select the Category',
    choices: ['Replication Action', 'Pages', 'Replication Agent', 'Bundles', 'Packages', 'User Admin', 'Exit'],
    validate: (value) => {
      if(value.length){
        return true;
      }else{
        return 'Please select valid category';
      }
    }
  }],
  'user-admin-action' : {
    name: 'action',
    type: 'list',
    message: 'Select the Action',
    choices: ['Create a User','Add User to a group', 'Remove user from a group', 'Back', 'Exit'],
    validate: (value) => {
      if(value.length){
        return true;
      }else{
        return 'Please select valid Action';
      }
    }
  },
  'package-action' : {
    name: 'action',
    type: 'list',
    message: 'Select the Action',
    choices: ['Upload a Package', 'Install a Package', 'Upload and Install a Package', 'Rebuild an existing package', 'Download package', 
              'Force Upload without install', 'Back', 'Exit'],
    validate: (value) => {
      if(value.length){
        return true;
      }else{
        return 'Please select valid action';
      }
    }
  },
  'bundles-action' : {
    name: 'action',
    type: 'list',
    message: 'Select the Action',
    choices: ['Uninstall a Bundle', 'Install a Bundle', 'Build a Bundle', 'Stop a Bundle', 'Start a Bundle', 'Back', 'Exit'],
    validate: (value) => {
      if(value.length){
        return true;
      }else{
        return 'Please select valid action';
      }
    }
  },
  'pages-action' : {
    name: 'action',
    type: 'list',
    message: 'Select the Action',
    choices: ['Lock Page', 'Unlock Page', 'Copy Page', 'Back', 'Exit'],
    validate: (value) => {
      if(value.length){
        return true;
      }else{
        return 'Please select valid action';
      }
    }
  },
  'replication-agent-action' : {
    name: 'action',
    type: 'list',
    message: 'Select the Action',
    choices: ['Create Replication Agent', 'Back', 'Exit'],
    validate: (value) => {
      if(value.length){
        return true;
      }else{
        return 'Please select valid action';
      }
    }
  },
  'replication-action' : {
    name: 'action',
    type: 'list',
    message: 'Select the Action',
    choices: ['Activate', 'Deactivate', 'Tree Activation', 'Back', 'Exit'],
    validate: (value) => {
      if(value.length){
        return true;
      }else{
        return 'Please select valid action';
      }
    }
  },
  'path' : {
    name: 'path',
    type: 'input',
    message: 'Path',
    validate: (value) => {
      if(value.length){
        return true;
      }else{
        return 'Enter Path';
      }
    }
  }
}

const categories = {
  'Replication Action' : q['replication-action'],
  'Pages' : q['pages-action'],
  'Replication Agent' : q['replication-agent-action'],
  'Bundles' : q['bundles-action'],
  'Packages' : q['package-action'],
  'User Admin' : q['user-admin-action']
}

const prompt = async (question) => {
  return await inquirer.prompt(question);
}

module.exports = {
  q,
  prompt,
  categories,
}

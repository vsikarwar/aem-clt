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
  'movePath' : {
    name: 'movePath',
    type: 'input',
    message: 'Enter Path of asset or Page you want to move',
    validate: (value) => {
      if(value.length){
        return true;
      }else{
        return 'Please enter Path of asset or Page you want to move.';
      }
    }
  },
  'desPath' : {
    name: 'desPath',
    type: 'input',
    message: 'Enter destination you want to move',
    validate: (value) => {
      if(value.length){
        return true;
      }else{
        return 'Please Enter destination you want to move.';
      }
    }
  },
  'desName' : {
    name: 'desName',
    type: 'input',
    message: 'Enter if you want to rename'
  },
  'adjustRef' : {
    name: 'adjustRef',
    type: 'input',
    message: 'Enter if you want to adjust reference(true or false)',
    validate: (value) => {
      if(value == 'false' || value =='true'){
        return true;
      } else{
        return 'Enter if you want to adjust reference(true or false)';
      }
    }
  },
  'publishRef' : {
    name: 'publishRef',
    type: 'input',
    message: 'Enter if you want to publish references(true or false)',
    validate: (value) => {
      if(value == 'false' || value =='true'){
        return true;
      } else{
        return 'Enter if you want to publish references(true or false)';
      }
    }
  },
  'category' : [{
    name: 'category',
    type: 'list',
    message: 'Select the Category',
    choices: ['Replication Action', 'Pages', 'Replication Agent', 'Bundles', 'Packages', 'User Admin','Move', 'Exit'],
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
    choices: ['Add User to a group', 'Remove user from a group', 'Back', 'Exit'],
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
    choices: ['Lock Page', 'Unlock Page', 'Copy Page','Move' ,'Back', 'Exit'],
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

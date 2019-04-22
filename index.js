#!/usr/bin/env node

const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const ask = require('./libs/questions.js')
const argv = require('minimist')(process.argv.slice(2));
const actions = require('./libs/actions.js');

clear();

console.log(
  chalk.blue(
    figlet.textSync('AEM-CLT', {horizontalLayout: 'full'})
  )
);

const run = async () => {
  if(argv['i'] || argv['interactive']){
    await interactive(argv);
  }else if(argv['help']){
    showHelp();
  }else{
    await nonInteractive(argv);
  }
}

const showError = (msg) => {
  console.log(
    chalk.bold.red(msg + '\n'),
    chalk.blue('For help use -h or --help.')
  );
}

const showHelp = (callback) => {
  help = {
    'user:pass' : ['-u', '--user'],
    'host:port' : ['-h', '--host'],
    'content path' : ['-p', '--path'],
    'file path' : ['-f', '--file'],
    'action' : ['-a [actions] activate | deactivate | tree-activate']
  };
  console.log(
    '-u | --user\tuser:pass',
    '\n-h | --host\thost:port',
    '\n-p | --path\tcontent path',
    '\n-f | --file\tfile path',
    '\n-a | --action\t actions'
  );
  if(callback){
    callback();
  }
}

const nonInteractive = async (args) => {
  const option = getOption(args);
  console.log('option:', option);
  processAction(option);
}

const interactive = async (args) => {
  const option = getOption(args);
  
  if(!option['action']){
    const action = await askAction();
    if(!action || action == 'Exit'){
      return;
    }

    cmd = actions['iactions'][action];
    option['action'] = [cmd];
  }

  for(const action of option['action']){
    if(action in actions['asks']){
      for(const q of actions['asks'][action]){
        if(!option[q]){
          ans = await ask.prompt(ask['q'][q]);
          option[q] = ans[q];
        }
      }
    }
  }

  console.log(option);
  processAction(option);
}

const processAction = async (option) => {
  for(const action of option['action']){
    if(action in actions['cmds']){
      await actions['cmds'][action](option);
    }else{
      showError('Invalid Action')
    }
  }
}


const getOption = (args) => {

  const option = {};
  option['host'] = args['h'] || args['host'];
  option['user'] = args['u'] || args['user'];
  option['path'] = args['p'] || args['path'];
  option['file'] = args['f'] || args['file'];

  const user = args['u'] || args['user'] || args['username'];
  if(user){
    const user_pass = user.split(':');
    option['user'] = user_pass[0];
    option['pass'] = user_pass[1];
  }
  

  const action = args['a'] || args['action'];
  if(action){
    if(action.indexOf(',') > -1){
      option['action'] = action.split(',');
    }else{
      option['action'] = [action];
    }
  }
  return option;
}

const askAction = async () => {
  categories = ask['categories'];
  ans = await ask.prompt(ask['q']['category']);
  category = ans['category']
  if(category == 'Exit'){
    return;
  }
  ans = await ask.prompt(categories[category]);
  action = ans['action']
  if(action == 'Back'){
    return await askAction();
  }
  return action;
}

run();

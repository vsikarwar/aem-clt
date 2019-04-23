#!/usr/bin/env node

const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const ask = require('./libs/questions.js')
const actions = require('./libs/actions.js');
const program = require('commander');

clear();

console.log(
  chalk.blue(
    figlet.textSync('AEM-CLT', {horizontalLayout: 'full'})
  )
);

const run = async () => {

  program
  .version('1.2.0')
  .option('-H, --host <host>', 'Hostname [host:port]')
  .option('-u, --user <user>', 'Username : password [user:pass]')
  .option('-e, --execute <action>', 'Actions [activate, ]')
  .option('-p, --path <path>', 'Content path')
  .option('-f, --file', 'File path')
  .option('-i, --interactive', 'Interactive mode')
  .parse(process.argv);
  
  const option = getOption();

  if(program.interactive){
    interactive(option);
  } else{
    nonInteractive(option);
  }
}

const showError = (msg, showHelp=true) => {
  console.log(
    chalk.bold.red(msg + '\n'),
  );
  if(showHelp){
    program.help();
  }
  
}

const nonInteractive = async (option) => {
  const action = option['action']
  if(!action){
    showError('No Action Defined')
    return;
  }

  if(!(action in actions['actions'])){
    showError('Invalid Action', false); 
    console.log(chalk.blue.bold( Object.keys(actions['actions']) ));
    return;
  }

  for(const q of actions['actions'][action]['ask']){
    if(!option[q]){
      showError('Missing Param(s) : ' + q);
      return;
    }
  }
  processAction(option);
}

const interactive = async (option) => {  
  if(!option['action']){
    const action = await askAction();
    if(!action || action == 'Exit'){
      return;
    }

    cmd = actions['iactions'][action];
    option['action'] = [cmd];
  }

  for(const action of option['action']){
    for(const q of actions['actions'][action]['ask']){
      if(!option[q]){
        ans = await ask.prompt(ask['q'][q]);
        option[q] = ans[q];
      }
    }
  }

  processAction(option);
}

const processAction = async (option) => {
  for(const action of option['action']){
    await actions['actions'][action]['action'](option);
  }
}


const getOption = () => {
  const option = {}
  if(program.user){
    const user_pass = program.user.split(':');
    option['user'] = user_pass[0];
    option['pass'] = user_pass[1];
  }

  if(program.execute){
    const action = program.execute
    if(action.indexOf(',') > -1){
      option['action'] = action.split(',');
    }else{
      option['action'] = [action];
    }
  }

  if(program.host){
    option['host'] = program.host
  }

  if(program.path){
    option['path'] = program.path
  }

  return option

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

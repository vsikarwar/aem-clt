const request = require('request');
const cheerio = require('cheerio');
const chalk = require('chalk');


const log = console.log;

// List package content
// curl -u admin:admin -X POST http://localhost:4502/crx/packmgr/service/console.html/etc/packages/my_packages/mycontent.zip?cmd=contents
const list_pkg_content = (opt, data) => {

    //const hostname = opt['Host'];
    //const user = opt['Username'];
    //const pass = opt['Password'];

    const hostname = 'localhost:4502';
    const user = 'admin';
    const pass = 'admin';


    const path = 'my_packages/mycontent.zip';

    const auth = {
        'user': user,
        'pass': pass,
        'sendImmediately': false
    };

    const url = `http://${hostname}/crx/packmgr/service/console.html/etc/packages/${path}?cmd=contents`;

    request({url:url, method:'POST', auth:auth}, (err, res, body) =>{
        if (err) {
            return console.error('upload failed:', err);
          }
          const $ = cheerio.load(body);
          const arr = $('span').text().split(/-\s/);
          
          log('Package : ',
              chalk.red(path)
          );

          for (let key in arr) {
              if(key == 0){
                  continue;
              }
              let value =  arr[key];
            log("%o. %o", parseInt(key), value);
          }
    });
}


//Replication Action => Activate
const activate = (option) => {
    const auth = {
        'user': option['user'],
        'pass': option['pass'],
        'sendImmediately': false
    };

    const hostname = option['host'];

    const url = `http://${hostname}/bin/replicate.json`;

    const form = {
        path: option['path'],
        cmd: 'activate'
    };

    request({url:url, method:'POST', auth:auth, form: form}, (err, res, body) =>{
        if (err) {
            return console.error('upload failed:', err);
          }
        const $ = cheerio.load(body);
        log(
            chalk.blue(' [Activate] ' + $('#Message').text()),
            chalk.blue('Replicated successfully ' + $('#Status').text()),
        );
    });
}


//Replication Action => Deactivate
const deactivate = (option) => {
    const auth = {
        'user': option['user'],
        'pass': option['pass'],
        'sendImmediately': false
    };

    const hostname = option['host'];

    const url = `http://${hostname}/bin/replicate.json`;

    const form = {
        path: option['path'],
        cmd: 'deactivate'
    };

    request({url:url, method:'POST', auth:auth, form: form}, (err, res, body) =>{
        if (err) {
            return console.error('upload failed:', err);
          }
        //console.log(body);
        const $ = cheerio.load(body);
        log(
            chalk.blue(' [Deactivate] ' + $('#Message').text()),
            chalk.blue('Replicated successfully ' + $('#Status').text()),
        );
    });
}


//Replication Action => Deactivate
const treeActivate = (option) => {
    const auth = {
        'user': option['user'],
        'pass': option['pass'],
        'sendImmediately': false
    };

    const hostname = option['host'];

    const url = `http://${hostname}/etc/replication/treeactivation.html`;

    const form = {
        path: option['path'],
        cmd: 'activate',
        ignoredeactivated: true,
        onlymodified: true
    };

    request({url:url, method:'POST', auth:auth, form: form}, (err, res, body) =>{
        if (err) {
            return console.error('upload failed:', err);
          }
        console.log(body);
        const $ = cheerio.load(body);
        log(
            chalk.blue(' [Tree Activate] ' + $('#Message').text()),
            chalk.blue('Replicated successfully ' + $('#Status').text()),
        );
    });
}

//Pages => lock page
const lockPage = (option) => {
    const auth = {
        'user': option['user'],
        'pass': option['pass'],
        'sendImmediately': false
    };

    const hostname = option['host'];

    const url = `http://${hostname}/bin/wcmcommand`;

    const form = {
        path: option['path'],
        cmd: 'lockPage',
        _charset_: 'utf-8'
    };

    request({url:url, method:'POST', auth:auth, form: form}, (err, res, body) =>{
        if (err) {
            return console.error('upload failed:', err);
          }
        console.log(body);
        const $ = cheerio.load(body);
        log(
            chalk.blue(' [Lock page] ' + $('#Message').text()),
            chalk.blue('Lock page ' + $('#Status').text()),
        );
    });
}


module.exports = {
    list_pkg_content,
    activate,
    deactivate,
    treeActivate,
    lockPage,
}
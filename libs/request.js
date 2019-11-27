const request = require('request');
const cheerio = require('cheerio');
const chalk = require('chalk');
var FormData = require('form-data');


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
          
          console.log('Package : ',
              chalk.red(path)
          );

          for (let key in arr) {
              if(key == 0){
                  continue;
              }
              let value =  arr[key];
              console.log("%o. %o", parseInt(key), value);
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
        console.log(
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
        console.log(
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
        const $ = cheerio.load(body);
        console.log(
            chalk.blue(' [Tree Activate] ' + $('#Message').text()),
            chalk.blue('Replicated successfully ' + $('#Status').text()),
        );
    });
}

//Pages => lock page
const page = (option, form) => {
    const auth = {
        'user': option['user'],
        'pass': option['pass'],
        'sendImmediately': false
    };

    const hostname = option['host'];

    const url = `http://${hostname}/bin/wcmcommand`;

    request({url:url, method:'POST', auth:auth, form: form}, (err, res, body) =>{
        if (err) {
            return console.error('upload failed:', err);
          }
        const $ = cheerio.load(body);
        console.log(
            chalk.blue(' [Lock page] ' + $('#Message').text()),
            chalk.blue('Lock page ' + $('#Status').text()),
        );
    });
}

const movePageorAsset = (option) => {
    const auth = {
        'user': option['user'],
        'pass': option['pass'],
        'sendImmediately': false
    };
    const movePath= option['movePath'];
    let port="";
    if(option['port'] == ""){
        port = 80;        
    }else{
        port = option['port'];
    }
    const hostname = option['host'] +":"+ port;
    const url = `http://${hostname}/bin/wcm/heavymove?path=${movePath}&_charset_=utf-8`;
    request({url:url, method:'GET', auth:auth}, (err, res, body) =>{
        if (err) {
            return console.error('upload failed:', err);
          }  
        move(option,res.body,auth,option['host'],port);
    });
}

const move = (option,json,auth,host,port)=>{
    const adjustRef = option['adjustRef'];
    const publishRef = option['publishRef'];
    //const form;
    var jsonRes= JSON.parse(json);
    const totalPages= jsonRes['totalPages'];
    const pagesArr=jsonRes['pages'];
    //console.log(json);
    //console.log(totalPages);
    //console.log(pagesArr);
    var form = new FormData();
    
        form.append('destParentPath', option['desPath']);
        form.append('0_destName' , option['desName']);
        form.append('srcPath' , option['movePath']);
        form.append('cmd', 'movePage');
        form.append('_charset_', 'utf-8');
        form.append('intergrity','true');
         
    for(var i=0 ; i < totalPages -1 ; i++){
        if(pagesArr[i]['adjustable'] == true){
           form.append('0_adjust',pagesArr[i]['path']);
        } 
    }
    //const url = `http://${hostname}/bin/wcmcommand`;
    form.submit({
        method: 'post',  
        host: host,
        port: port,
        path: '/bin/wcmcommand',
        auth: 'admin:admin'
        }, function(err, res,body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        if(res.statusCode=='200'){
            console.log("Asset is been moved");
        }else{
            console.log(res.statusMessage);
            console.log(res.statusCode);
        }
        });   
}


const lockPage = (option) => {
    const form = {
        path: option['path'],
        cmd: 'lockPage',
        _charset_: 'utf-8'
    };
    page(option, form);
}

const unlockPage = (option) => {
    const form = {
        path: option['path'],
        cmd: 'unlockPage',
        _charset_: 'utf-8'
    };
    page(option, form);
}

const copyPage = (option) => {
    const form = {
        destParentPath: option['dest-path'],
        srcPath: option['path'],
        cmd: 'copyPage'
    };
    page(option, form)
}

const bundles = (option, form, url) => {
    const auth = {
        'user': option['user'],
        'pass': option['pass'],
        'sendImmediately': false
    };

    request({url:url, method:'POST', auth:auth, form: form}, (err, res, body) =>{
        if (err) {
            return console.error('upload failed:', err);
          }
        const $ = cheerio.load(body);
        console.log(body);
        console.log(
            chalk.blue(' [Lock page] ' + $('#Message').text()),
            chalk.blue('Lock page ' + $('#Status').text()),
        );
    });
}

const uninstallBundle = (option) => {
    const form = {
        action: 'uninstall'
    };
    const hostname = option['host'];
    const bundle = option['bundle'];

    const url = `http://${hostname}/system/console/bundles/${bundle}`;
    bundles(option, form, url);
}

const installBundle = (option) => {
    const form = {
        action: 'install',
        bundlestartlevel: 20,
        bundlefile: `@'${option['bundle']}'`
    };

    const hostname = option['host'];
    //const bundle = option['bundle'];

    const url = `http://${hostname}/system/console/bundles`;
    bundles(option, form, url);
}

const buildBundle = (option) => {
    console.log('Implementation not found!!!');
}

const startBundle = (option) => {
    const form = {
        action: 'start',
    };

    const hostname = option['host'];
    const bundle = option['bundle'];

    const url = `http://${hostname}/system/console/bundles/${bundle}`;
    bundles(option, form, url);
}

const stopBundle = (option) => {
    const form = {
        action: 'stop',
    };

    const hostname = option['host'];
    const bundle = option['bundle'];

    const url = `http://${hostname}/system/console/bundles/${bundle}`;
    bundles(option, form, url);
}

const createRepAgent = (option) => {
    console.log('Implementation not found!!!');
}

const uploadPkg = (option) => {
    console.log('Implementation not found!!!');
}

const installPkg = (option) => {
    console.log('Implementation not found!!!');
}

const uploadInstallPkg = (option) => {
    console.log('Implementation not found!!!');
}

const rebuildPkg = (option) => {
    console.log('Implementation not found!!!');
}

const downloadPkg = (option) => {
    console.log('Implementation not found!!!');
}

const uploadNoInstallPkg = (option) => {
    console.log('Implementation not found!!!');
}

const addUser = (option) => {
    console.log('Implementation not found!!!');
}

const removeUser = (option) => {
    console.log('Implementation not found!!!');
}

module.exports = {
    list_pkg_content,
    activate,
    deactivate,
    treeActivate,
    lockPage,
    unlockPage,
    copyPage,
    uninstallBundle,
    installBundle,
    createRepAgent,
    buildBundle,
    startBundle,
    stopBundle,
    uploadPkg,
    installPkg,
    uploadInstallPkg,
    rebuildPkg,
    downloadPkg,
    uploadNoInstallPkg,
    addUser,
    removeUser,
    movePageorAsset
}
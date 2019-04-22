const request = require('./request.js');

const cmds = {
    'activate' : request.activate,
    'deactivate' : request.deactivate,
    'tree-activate' : request.treeActivate,
    'lock-page' : request.lockPage,
    'unlock-page' : '',
    'copy-page' : '',
    'create-rep-agent' : '',
    'uninstall-bundle' : '',
    'install-bundle' : '',
    'build-bundle' : '',
    'stop-bundle' : '',
    'start-bundle' : '',
    'upload-pkg' : '',
    'install-pkg' : '',
    'upload-install-pkg' : '',
    'rebuild-existing-pkg' : '',
    'download-pkg' : '',
    'upload-no-install' : '',
    'add-user': '',
    'remove-user': ''
}

const asks = {
    'activate' : ['user', 'pass', 'host', 'path'],
    'deactivate' : ['user', 'pass', 'host', 'path'],
    'tree-activate' : ['user', 'pass', 'host', 'path'],
    'lock-page' : ['user', 'pass', 'host', 'path']
}

const iactions = {
    'Activate' : 'activate',
    'Deactivate' : 'deactivate',
    'Tree Activation' : 'tree-activate',
    'Lock Page' : 'lock-page',
    'Unlock Page' : 'unlock-page',
    'Copy Page' : 'copy-page',
    'Create Replication Agent' : 'create-rep-agent',
    'Uninstall a Bundle' : 'uninstall-bundle',
    'Install a Bundle' : 'install-bundle',
    'Build a Bundle' : 'build-bundle',
    'Stop a Bundle' : 'stop-bundle',
    'Start a Bundle' : 'start-bundle',
    'Upload a Package' : 'upload-pkg',
    'Install a Package' : 'install-pkg',
    'Upload and Install a Package' : 'upload-install-pkg',
    'Rebuild an existing package' : 'rebuild-existing-pkg',
    'Download package' : 'download-pkg',
    'Force Upload without install' : 'upload-no-install',
    'Add User to a group' : 'add-user',
    'Remove user from a group' : 'remove-user'
}



module.exports = {
     cmds,
     iactions,
     asks,
 }
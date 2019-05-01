const request = require('./request.js');

const actions = {
    'activate' : {'action' : request.activate, 
                  'ask' : ['user', 'pass', 'host', 'path']},
    'deactivate' : {'action' : request.deactivate,
                    'ask' : ['user', 'pass', 'host', 'path']},
    'tree-activate' : {'action' : request.treeActivate,
                        'ask' : ['user', 'pass', 'host', 'path']},
    'lock-page' : {'action' : request.lockPage,
                    'ask' : ['user', 'pass', 'host', 'path']},
    'unlock-page' : {'action': request.unlockPage,
                    'ask' : ['user', 'pass', 'host', 'path']},
    'copy-page' : {'action': request.copyPage,
                    'ask' : ['user', 'pass', 'host', 'path']},
    'create-rep-agent' : {'action': request.createRepAgent,
                    'ask' : ['user', 'pass', 'host', 'path']},
    'uninstall-bundle' : {'action': request.uninstallBundle,
                            'ask' : ['user', 'pass', 'host', 'bundle']},
    'install-bundle' : {'action': request.installBundle,
                        'ask' : ['user', 'pass', 'host', 'bundle']},
    'build-bundle' : {'action': request.buildBundle,
                        'ask' : ['user', 'pass', 'host', 'path']},
    'stop-bundle' : {'action': request.stopBundle,
                    'ask' : ['user', 'pass', 'host', 'bundle']},
    'start-bundle' : {'action': request.startBundle,
                        'ask' : ['user', 'pass', 'host', 'bundle']},
    'upload-pkg' : {'action': request.uploadPkg,
                    'ask' : ['user', 'pass', 'host', 'path']},
    'install-pkg' : {'action': request.installPkg,
                    'ask' : ['user', 'pass', 'host', 'path']},
    'upload-install-pkg' : {'action': request.uploadInstallPkg,
                            'ask' : ['user', 'pass', 'host', 'path']},
    'rebuild-existing-pkg' : {'action': request.rebuildPkg,
                                'ask' : ['user', 'pass', 'host', 'path']},
    'download-pkg' : {'action': request.downloadPkg,
                        'ask' : ['user', 'pass', 'host', 'path']},
    'upload-no-install' : {'action': request.uploadNoInstallPkg,
                            'ask' : ['user', 'pass', 'host', 'path']},
    'add-user': {'action': request.addUser,
                'ask' : ['user', 'pass', 'host', 'path']},
    'remove-user': {'action': request.removeUser,
                    'ask' : ['user', 'pass', 'host', 'path']}
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
     actions,
     iactions,
 }
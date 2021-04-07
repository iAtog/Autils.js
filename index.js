const Timeout = require('./utilities/Timeout');
const fs = require('fs');

function getTimeoutCache() {
    return require('./timeout.json');
}
/**
 * 
 * @param {Number} time The time of the timeout
 * @param {function} callback The function
 * @param {Object[]} args the args
 */
function set(time, callback, args) {
    return new Timeout(time, callback, args);
}

let template = {
    name: String,
    value: Object
}
module.exports = {
    setTimeout: set,
    timeout: {
        manage: Timeout.manage
    },
    getTimeoutCache,
    restartCache: function () {
        recreate();
    },
    version: require('./package.json').version,
    HWID: require('./utilities/HWID.js'),
    SetupGuildDatabase: require('./utilities/SetupGuildDatabase')
}

function recreate() {
    fs.writeFile(__dirname+'/timeout.json', "[]", 'utf-8');
}
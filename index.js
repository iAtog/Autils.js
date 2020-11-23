const Timeout = require('./utilities/Timeout');
const fs = require('fs');

function getCache() {
    return require('./cache/timeout.json');
}

function set(time = 1, callback = function () {}) {
    return new Timeout(time, callback);
}
module.exports = {
    setTimeout: set,
    timeout: {
        manage: Timeout.manage
    },
    getCache,
    restartCache: function () {
        p();
    },
    version: require('./package.json').version,
    HWID: require('./utilities/HWID.js'),
    SetupGuildDatabase: require('./utilities/SetupGuildDatabase')
}

function p() {
    fs.writeFile('./cache/timeout.json', JSON.stringify({}), 'utf-8');
}
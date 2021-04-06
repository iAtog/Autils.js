const Timeout = require('./utilities/Timeout');
const fs = require('fs');

function getCache() {
    return require('./cache/timeout.json');
}

function set(time = 1, callback = function () {}) {
    return new Timeout(time, callback);
}

let template = {
    name: String,
    value: Object
}
module.exports = {
    setTimeout: set,
    timeout: {
        manage: Timeout.manage,
        /**
         * @param  {template} args 
         */
        loadArgs: (...args) => {
            args.forEach(arg => {
                if(typeof arg !== 'object')throw new Error("Your arg type is not an object");
                if(!arg.name || !arg.value)throw new Error("Your arg data is invalid");
                let {name, value} = arg;
                if(global[name])throw new Error("Your arg is already defined. Sorry.");
                global[name] = value;
            })
        }
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
    fs.writeFile('./cache/timeout.json', "[]", 'utf-8');
}
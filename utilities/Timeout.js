const fs = require('fs');
const file = __dirname + '/../timeout.json';
const index = require('../index');

module.exports = class Timeout {
    /**
     * 
     * @param {Number} time 
     * @param {Function} callback 
     * @param {Object[]} args
     */
    constructor(time, callback, args) {
        if (isNaN(time) || !(callback instanceof Function)) throw new Error("Constructor is not valid");
        this.callback = callback;
        this.time = time;
        this.args = args;
        functions.add(this.time, this.callback.toString(), args);
    }


}

module.exports.manage = function () {
    if (!fs.existsSync(file)) fs.writeFileSync(file, '[]', 'utf-8');
    setInterval(functions.check, 2000);
}

let functions = {
    /**
     * Cancel timeout
     * @param {String} key 
     */
    end: function (key) {
        endC(key)
    },
    /**
     * Check all timeouts
     */
    check: function () {
        let data = require(file);
        if (!data) {
            data = [];
            save(data);
        }
        data.filter(x => x != null).forEach(time => {
            if (time == null) return;
            if (time.ended) return;
            let remaining = time.endAt - Date.now();
            if (remaining < 0) {
                let variableTemplate = (variable, value) => `let ${variable} = ${value};`;
                let variables = require('../Cache').variables;
                let parsedVars = "";
                variables.forEach(obj => {
                    parsedVars += variableTemplate(obj.name, obj.value);
                })
                eval(`${time.args}
                      let atog = ${time.callback}; atog();`);
                endC(time.key);
            };
        });
    },
    /**
     * Get a timeout
     * @param {String} what 
     */
    get: function (what) {
        return functions.fetch().filter(x => x != null && x.key == what);
    },
    /**
     * Fetch file
     */
    fetch: function () {
        return require(file).filter(x => x !== null);
    },
    /**
     * Add a new timeout
     * @param {Number} time 
     * @param {Function} callback 
     */
    add: function (time, callback, args) {
        let data = require(file);
        return new Promise(async (s, r) => {
            let variableTemplate = (variable, value) => `let ${variable} = ${value};`;
            let parsedVars = "";
            if(typeof args !== 'undefined') {
                args.forEach(arg => {
                    let parsed = parseVariable(arg.name, arg.value);
                    parsedVars += variableTemplate(parsed.name, parsed.value);
                });
            }
            let x = {
                key: generate(8),
                createdAt: Date.now(),
                time,
                ended: false,
                endAt: (Date.now() + time),
                args: parsedVars,
                callback
            }
            data.push(x);
            try {
                fs.writeFileSync(file, JSON.stringify(data), "utf-8");
            } catch (e) {
                r(e);
            }
            s(x)
        });
    }
}

function generate(length = 8) {
    let x = '';
    let f = 'aBcDeFgHiJkMnOpQrStUvWxYzAbCdEfGhIjKmNoPqRsTuVwXyZ0123456789';
    for (let i = 0; i < length; i++) {
        x += f.charAt(Math.floor(Math.random() * f.length));
    }
    return x;
}

function endC(key = "") {
    let data = require(file);
    let time = data.find((x) => x != null && x.key == key);
    time.ended = true;
    time.callback = generate(28);
    fs.writeFileSync(file, JSON.stringify(data), 'utf-8');
}

function save(data) {
    fs.writeFileSync(file, JSON.stringify(data), 'utf-8');
}
module.exports.functions = functions;
function parseVariable(name, value) {
    if(typeof value === 'object') {
        return {name, value:JSON.stringify(value)};
    }else if(typeof value === 'string') {
        return {name, value:'"'+value+'"'};
    }else if(typeof value === 'undefined') {
        return {name, value:'"undefined"'}
    }
    else{
        return {name, value:value.toString()};
    }
}
const Timeout = require('./utilities/Timeout');
const fs = require('fs');
const cacheLocale = __dirname+"/localVariables.json";

function getTimeoutCache() {
    return require('./timeout.json');
}
/**
 * 
 * @param {Number} time The time of the timeout
 * @param {function} callback The function
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
        manage: Timeout.manage,
        /**
         * @param {template} args 
         * @deprecated
         */
        loadArgs: (...args) => {
            args.forEach(arg => {
                if(typeof arg !== 'object')throw new Error("Your arg type is not an object");
                if(!arg.name || !arg.value)throw new Error("Your arg data is invalid");
                let {name, value} = arg;
                if(global[name])throw new Error("Your arg is already defined. Sorry.");
                //global[name] = value;
                require('./Cache').push(name, value);
            });
        },
        /**
         * Remove a variable saved in the cache
         * @param {String} argName The name of the variable
         * @deprecated
         */
        removeArg: (argName) => {
            let firstArray = require('./Cache').variables;
            let finalArray = removeByAttr(firstArray, "name", argName);
            fs.writeFileSync(localStorage, finalArray, 'utf-8');
        }
    },
    getTimeoutCache,
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

var removeByAttr = function(arr, attr, value){
    var i = arr.length;
    while(i--){
       if( arr[i] 
           && arr[i].hasOwnProperty(attr) 
           && (arguments.length > 2 && arr[i][attr] === value ) ){ 

           arr.splice(i,1);

       }
    }
    return arr;
}
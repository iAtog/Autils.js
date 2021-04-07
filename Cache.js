let fs = require('fs');
let locale = __dirname + "/localVariables.json";
let variables = require(locale);
module.exports.variables = variables;
/**
 * 
 * @param {String} name 
 * @param {any} value 
 */
module.exports.push = (name, value) => {
    if(typeof value === 'object') {
        variables.push({name, value:JSON.stringify(value)});
    }else if(typeof value === 'string') {
        variables.push({name, value:'"'+value+'"'});
    }else{
        variables.push({name, value:value.toString()});
    }
    fs.writeFileSync(locale, JSON.stringify(variables), 'utf-8');
};
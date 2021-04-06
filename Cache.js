let variables = [];
module.exports.variables = variables;
/**
 * 
 * @param {String} name 
 * @param {any} value 
 */
module.exports.push = (name, value) => {
    if(typeof value === 'object') {
        variables.push({name, value:JSON.stringify(value)});
    }else{
        variables.push({name, value:value.toString()});
    }
};
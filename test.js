const index = require('./index.js');

/* Manage all timeouts */
index.manage();

/* 
 * Start a timeout function with time and callback
 * 1 minute for wait :)
 */
index.setTimeout(3000, function() {
    console.log("Miamor");
});
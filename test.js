const index = require('./index.js');

/* Manage all timeouts */
//index.timeout.manage();

/* 
 * Start a timeout function with time and callback
 * 3 seconds for wait :)
 

index.setTimeout(3000, function() {
    console.log("Atog");
});
*/
// JSON
/*
let JSON = index.JSONManager;
let Manager = new JSON({
    name: "test",
    type: "{}",
    path: __dirname + "/"
});
Manager.createFileIfNotExists();
Manager.set('npmjs.autils', "iatog");
if(Manager.has('npmjs.autils'))console.log(Manager.get('npmjs.autils'));*/

index.HWID().then(o => console.log(o));
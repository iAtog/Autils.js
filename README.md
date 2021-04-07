# AUTILS.JS
Autils.js is a library that tries to make your code easier to use.

## Changelog
Some uses have been changed:
· More order in the cache file, you will have to restart the cache in order to make it work properly. `require('autils.js').restartCache();`
· The use of `<Package>.manage();` for Timeout has been changed to `<Package>.timeout.manage();`.
· A new function has been added: "JSONManager", this function serves to make the handling of JSON files easier.
## Timeout
It is a timeout that is saved, that is, if you end the app when you start it again it will continue until the estimated time in which it will end.

```
const index = require('autils.js');

/* Manage all timeouts */
index.timeout.manage();

/* 
 * Start a timeout function with time and callback
 * 3 seconds for wait :)
 */
index.setTimeout(3000, function() {
    console.log("Atog");
});
```
Do you have failures with non-existent variables when executing the timeout? <br>
Don't worry, I've already patched that problem! Now you must specify the local arguments to be used in the function. <br>
> Example:
```
// * You use the "manage" function *

let hi = "hello world";

index.setTimeout(5000, function() {
    console.log(hi);
}, [
    {
        name: "hi",
        value: hi
    }
]);
```
**IMPORTANT**: The value in "name" must be the same as the variable name, or it will not work.
## HWID
You get the identification of the hardware, this only gets the id where the program NodeJS runs.
```
const index = require('autils.js');


index.HWID()
    .then(x => console.log(x))
    .catch(x => console.error(x));
```
## Discord Guild MongoDB Database
It's an addon for your discord bot, the code uses structures so you can just invoke the guild to get the methods that are new.

Here is an example of how to use it:
```
const index = require('autils.js);
const {Client} = require('discord.js');
const client = new Client();

client.on("ready", () => {
    index.SetupGuildDatabase('https://mymongodbatlasurl.com', require('./myOwnSchema' /*Optional*/));
});
```
Methods:
```
client.on("message", async(m) => {
    if(m.guild.database) {
        /*Set*/
        m.guild.database.set('myKey', 'myValue' /*Object, Array or String*/);

        // Has
        if(!(await m.guild.database.has('myKey')))return "No founded";

        // Get
        console.log(m.guild.database.get('myKey'))

        // Delete
        m.guild.database.delete('myKey');
    }
});
```


I added more things but they are unstable and not finished jijiji
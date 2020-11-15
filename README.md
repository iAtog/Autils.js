# AUTILSJS
Autils.js is a library that tries to make your code easier to use.

### Timeout
It is a timeout that is saved, that is, if you end the app when you start it again it will continue until the estimated time in which it will end.
```
const index = require('autilsjs');

/* Manage all timeouts */
index.manage();

/* 
 * Start a timeout function with time and callback
 * 1 minute for wait :)
 */
index.setTimeout(3000, function() {
    console.log("Atog");
});
```

I will be adding more things as time goes by.
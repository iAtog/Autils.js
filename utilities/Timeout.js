const fs = require('fs');
const file = __dirname+'/../cache/timeout.json';

module.exports = class Timeout {
    constructor(time=1, callback = Function) {
        if(isNaN(time) || !(callback instanceof Function)) throw new Error("Constructor is not valid");
        this.callback = callback;
        this.time = time;
        
        functions.add(this.time, this.callback.toString());
    }
    
}

module.exports.manage = function() {
    if(!fs.existsSync(file))fs.writeFileSync(file, "{timeout: []}", 'utf-8');
    setInterval(functions.check, 2000);
}

let functions = {
    end: function(key="") {
        endC(key)
    },
    check: function() {
        let data = require(file);
		if(!data.timeout) {
		    data.timeout = [];
			save(data);
		}
        data.filter(x => x != null).forEach(time => {
            if(time == null)return;
            if(time.ended)return;
            let remaining = time.endAt - Date.now();
            if(remaining < 0) {
                eval("let atog = "+time.callback+"; atog();");
                endC(time.key);
            };
        });
    },
    get: function(what="") {
        return functions.fetch().filter(x => x != null && x.key == what);
    },
    fetch: function() {
        return require(file).timeout.filter(x => x !== null);
    },
    add: function(time=1, callback) {
        let data = require(file);
        return new Promise(async(s,r) => {
            let x = {
                key: generate(8),
                createdAt: Date.now(),
                time,
                ended: false,
                endAt: (Date.now()+time),
                callback
            }
            data.timeout.push(x);
            try {fs.writeFileSync(file, JSON.stringify(data), "utf-8");
            }catch(e) {r(e);}
            s(x)
        });
    }
}

function generate(length=8) {
    let x = '';
    let f = 'aBcDeFgHiJkMnOpQrStUvWxYzAbCdEfGhIjKmNoPqRsTuVwXyZ0123456789';
    for(let i=0;i<length;i++) {
        x += f.charAt(Math.floor(Math.random() * f.length));
    }
    return x;
}

function endC(key="") {
    let data = require(file);
    let time = data.timeout.find((x) => x != null && x.key == key);
    time.ended = true;
    time.callback = generate(28);
    fs.writeFileSync(file, JSON.stringify(data), 'utf-8');
}
function save(data) {
	fs.writeFileSync(file, JSON.stringify(data), 'utf-8');
}
module.exports.functions = functions;
const fs = require('fs');
const { makeObjectStringPath, errors, json } = require('../misc/utils');

const cache = new Object();

module.exports = class JSONManager {
    constructor(options) {
        let {name, path} = options;
        if(name.endsWith('.json'))this.name = name.split('.')[name.split('.').length];
        this.name = name;
        this.path = path;
        this.file = path.endsWith('/') ? path+file : path+"/"+name;
        this.File = require(file);
        if(fs.existsSync(this.file))return;
        fs.writeFileSync(this.file+".json", "{}", 'utf8')
    }
    /**
     * Get any of the default config
     * @param {string} query Example: `my.config.path`
     */
    get(query) {
        return makeObjectStringPath(this.file, query);
    }
    /**
     * 
     * @param {string} query Path
     * @param {string} value String to set in the json path 
     */
    set(query, value) {
        let [...points] = query.split('.');
        for(let point of points) {
            if(point === points[points.length-1]) {
                data[point] = value;
                break;
            }
            if(!this.File.hasOwnProperty(point))data[point] = value;
            else data = !json.is(data[point]) ? data[point] = {} : data[point];
        }
        
        json.save(this.file, this.File[data]);
    }
    has(query="") {
        let [...points] = query.split('.');

        for(let point of points) {
            if(!object_data.hasOwnProperty(point)) return false
			if(point == args[args.length-1]) return true
			else object_data = object_data[point]
        }
    }

}
let fs = require('fs');

const errors = {
    JSONElementNotFound: require('../errors/JSONElementNotFound'),
    LibraryUnknowError: require('../errors/LibraryUnknowError'),
    UnknowPathError: require('../errors/UnknowPathError'),
    InvalidJSONPath: require('../errors/InvalidJSONPath')
}

function makeObjectStringPath(path = "", what = "") {
    if (!fs.existsSync(path)) return;
    let readed = fs.readFileSync(path);
    let [...points] = what.split(".");
    for (let point of points) {
        if (!readed.hasOwnProperty(point)) return Promise.resolve(null);
        if (point == points[points.length - 1]) return Promise.resolve(readed[point]);
    }
}

function readFile(path) {
    if (!fs.existsSync(path)) throw new errors.UnknowPathError('No se ha encontrado el archivo especificado.');
    var data;
    try {
        let data = fs.readFileSync(path, 'utf-8')
        data = JSON.parse(data)
    } catch (error) {
        throw new errors.InvalidJSONPath('El archivo que se estuvo por leer fue rechazado por alguna falla en su sintaxis.')
    }
    return data;
}

function writeF(path, object) {
    if (!fs.existsSync(path)) throw new errors.UnknowPathError('No se ha encontrado el archivo especificado.');
    try {
        fs.writeFileSync(path, JSON.stringify(object, null, 2), 'utf-8');
    } catch (e) {
        throw new errors.LibraryUnknowError('Algo ha fallado...');
    }
}

function saveF(path, object) {
    writeF(path, object)
}

function isObject(type_var) {
    if(typeof type_var == "object" && !(type_var instanceof Array)) return true
    return false
  }

module.exports = {
    makeObjectStringPath,
    errors,
    json: {
        read: readFile,
        write: writeF,
        save: saveF,
        is: isObject
    }
}
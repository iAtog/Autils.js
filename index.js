const Timeout = require('./lib/Timeout');
function getCache() {
    return require('./lib/cache.json');
}
function set(time=1, callback) {
    return new Timeout(time, callback);
}
module.exports = { setTimeout: set,manage: Timeout.manage, getCache, version: require('./package.json').version}
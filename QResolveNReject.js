var Q = require('q');

var resolve = false;

/**
 * Lets check here for Q resolve and reject sceanrios without defer
 */
var res = resolve ? Q.resolve({a:'A'}) : Q.reject({err:'ERR'})
res
 .then(function resolveProceed(res) {console.log(res) })
 .catch(function rejectError(err) {console.log(err) })

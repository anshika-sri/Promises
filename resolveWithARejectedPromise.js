var Q = require('Q');

function f1() {
  var def = Q.defer();
  def.resolve(f2());
  return def.promise;
}

function f2() {
  var def = Q.defer();
  def.reject('Callee is resolved Promise. But I am once here rejected. So finally rejected!!');
  return def.promise;
}

f1()
.then(function(res) { console.log('*SUCCESS*', res) })
.catch(function(err) { console.log('*ERROR*', err) })

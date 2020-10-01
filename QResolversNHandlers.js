var Q = require('Q');

function d() {
  var d1 = Q.defer();
  var bWork = false;
  Q.resolve()
  .then(function() {
    if(bWork) { return; }
    else{ bWork = true; console.log('I am work done!!!!'); return; }
  })
  .then(function() {
    console.log('Check I am here. Work done by me: ' + bWork);
    d1.resolve();
  }).done();
  return d1.promise;
}
d().then().catch();

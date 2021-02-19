var Q = require('Q');

function outer() {
    one()
    .then(function() {
        console.log('called at last');
    })
    .catch(function(err){
        console.log(err);
    });
}

outer();

function one() {

    var def = Q.defer();

    setTimeout(function() {
        console.log('I am set timeout one');
        def.resolve();
    }, 3000);

    return def.promise;
}

***OUTPUT***
I am set timeout one
called at last

var Q = require('Q');

function outer() {
    one()
    .then(function() {
        return two()
        .then(function() {
            console.log('called at second last');
        })
        .catch(function(err) {
            console.log(err);
        });
    })
    .then(function() {
        console.log('called at last');
    })
    .catch(function(err) {
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

function two() {

    var def = Q.defer();

    setTimeout(function() {
        console.log('I am set timeout two');
    }, 3000);

    def.resolve();

    return def.promise;
}

****OUTPUT****
I am set timeout one
called at second last
called at last
I am set timeout two
 
 

var Q = require('Q');

asy()
    .then(function (res) {
        console.log(res);
        Q.reject('1->1')
            .then(function (res) {
                console.log(res);
                Q.resolve('1->1->1')
                    .then(function (res) {
                        console.log(res);
                    }).catch(function (err) {
                        console.log(err);
                    })
            })
            .catch(function (err) {
                console.log('here', err);
            })
    })
    .catch(function (err) {
        console.log(err);
    })

function asy() {
    var def = Q.defer();
    setTimeout(() => {
        return def.resolve('wait1');
    }, 2000) //2sec

    def.resolve('1');

    return def.promise;

    // return Q.resolve('1', setTimeout(() => {
    //         console.log('delay tn')
    //     }, 1000));
}

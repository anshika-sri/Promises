var Q = require('q');

/**
 * all promises Logic stats for the defering promise Map,
 * where is boolean value present, means promise is resolve/rejected
 */
var allLogic = {
  def1: {
    res: true
  },
  def2: {
    //res is not present/false, means def2 will be rejected
  }
};

/** this function may res/rej
 *  and this function contributes in overall promise if rej/res
 */ 
function def1() {
  var def = Q.defer();
  setTimeout(function iResolvedAfterTimeout() {
    console.log('Entering for def1', Date.now());
    allLogic.def1.res ? def.resolve('def1 resolved!!!') :
                         def.reject('def1 rejected!!!');
  }, 3000 );
  return def.promise;
}

/** this function may res/rej
 *  and this function contributes in overall promise if rej/res
 */ 
function def2() {
  var def = Q.defer();
  setTimeout(function iRejectedAfterTimeout() {
    console.log('Entering for def2', Date.now());
    allLogic.def2.res ? def.resolve('def2 resolved!!!') :
                         def.reject('def2 rejected!!!');
  }, 2000 );
  return def.promise;
}

var iniTime = Date.now();


/**
 * Returns a promise that is fulfilled with an array of promise state snapshots,
 * but only after all the original promises
 * have settled, i.e. become either fulfilled or rejected.
 */
var res =  Q.allSettled([def1(), def2()]);
res
 .then(function resolveProceed(resObj) {
  console.log('Race winner resolve!!!!', resObj);
  console.log( '$promise.allSettled$, total time is: ', Date.now() - iniTime + ' ms')
 })
 .catch(function rejectError(err) {
   console.log('Race winner reject!!!!', err);
});

/**
 * Sample Output:
 *
 *Entering for def2 1600121436026
  Entering for def1 1600121437043
  Race winner resolve!!!! [
    { state: 'fulfilled', value: 'def1 resolved!!!' },
    { state: 'rejected', reason: 'def2 rejected!!!' }
  ]
  $promise.allSettled$, total time is:  3025 ms
 *
 */

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
    console.log('Entering for def1');
    allLogic.def1.res ? def.resolve('def1 resolved!!!') :
                         def.reject('def1 rejected!!!')
  }, 2000 );
  return def.promise;
}

/** this function may res/rej
 *  and this function contributes in overall promise if rej/res
 */ 
function def2() {
  var def = Q.defer();
  setTimeout(function iRejectedAfterTimeout() {
    console.log('Entering for def2');
    allLogic.def2.res ? def.resolve('def2 resolved!!!') :
                         def.reject('def2 rejected!!!')
  }, 3000 );
  return def.promise;
}

var iniTime = Date.now();

/**
 * Lets check here for promise all, 
 * here overall promise is res if all the promisees are resolved
 * Or, is rej if any one of the promise is rejected.
 */
var res =  Q.all([def1(), def2()]);
res
 .then(function resolveProceed(res) {
  console.log('Race winner resolve!!!!', res);
 })
 .catch(function rejectError(err) {
   console.log('Race winner reject!!!!', err);
   console.log( '$promise.all$, total time is: ', Date.now() - iniTime + ' ms')
})

/**
 * Sample Output:
 * 
 *Entering for def1
  Entering for def2
  Race winner reject!!!! def2 rejected!!!
  $promise.all$, total time is:  3018 ms
 * 
 */

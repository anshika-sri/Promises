var Q = require('q');

/**
 * race Logic stats for the defering promise Map,
 * where is boolean value present, means promise is resolve/rejected
 */
var raceLogic = {
  def1: {
    //res is not present/false, means def will be rejected
  },
  def2: {
    res: true
  }
};

/** this function may res/rej
 *  and this function wins
 */ 
function def1() {
  var def = Q.defer();
  setTimeout(function iResolvedAfterTimeout() {
    raceLogic.def1.res ? def.resolve('def1 resolved!!!') :
                         def.reject('def1 rejected!!!')
  }, 2000 );
  return def.promise;
}

/** this function may res/rej
 *  and this function loses
 */ 
function def2() {
  var def = Q.defer();
  setTimeout(function iRejectedAfterTimeout() {
    raceLogic.def2.res ? def.resolve('def2 resolved!!!') :
                         def.reject('def2 rejected!!!')
  }, 3000 );
  return def.promise;
}

/**
 * Lets check here for promise race, 
 * here race is res/rej as per the winner promise.
 */
var res =  Q.race([def1(), def2()]);
res
 .then(function resolveProceed(res) {
  console.log('Race winner resolve!!!!', res);
 })
 .catch(function rejectError(err) {
   console.log('Race winner reject!!!!', err);
})

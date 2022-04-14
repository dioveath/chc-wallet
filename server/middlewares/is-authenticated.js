const passport = require('passport');

module.exports = function isAuthenticated (){
  console.log('checking authentication');
  return passport.authenticate('jwt', { session: false});
};

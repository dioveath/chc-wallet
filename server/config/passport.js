const jwtStrategy = require('./jwt-strategy');

module.export = (passport) => {

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(jwtStrategy);

};

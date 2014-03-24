var passport    = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user[0].id);
});

passport.deserializeUser(function(id, done) {
  //User.findById(id, function (err, user) {
  //  done(err, user);
  //});
});

// Use the FacebookStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Facebook
//   profile), and invoke a callback with a user object.
passport.use(new FacebookStrategy({
    clientID: '258394057673691',
    clientSecret: '68705b87e81dc09abaf8abf17836dc38',
    callbackURL: "horarios-tren-data.nodejitsu.com/auth/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // To keep the example simple, the user's Facebook profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Facebook account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

module.exports = {
  express: {
    customMiddleware: function(app){
      console.log('express midleware for passport');
      app.use(passport.initialize());
      app.use(passport.session());
    }
  }
};

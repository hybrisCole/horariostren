var passport    = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function (user, done) {
  done(null, user.uid);
});

passport.deserializeUser(function (uid, done) {
  User.findOne({uid: uid}).done(function (err, user) {
    done(err, user)
  });
});


var verifyHandler = function (token, tokenSecret, profile, done) {
  process.nextTick(function () {

    User.findOne({
        or: [
          {uid: parseInt(profile.id)},
          {uid: profile.id}
        ]
      }
    ).done(function (err, user) {
        if (user) {
          return done(null, user);
        } else {

          var data = {
            provider: profile.provider,
            uid: profile.id,
            name: profile.displayName
          };

          if(profile.emails && profile.emails[0] && profile.emails[0].value) {
            data.email = profile.emails[0].value;
          }
          if(profile.name && profile.name.givenName) {
            data.fistname = profile.name.givenName;
          }
          if(profile.name && profile.name.familyName) {
            data.lastname = profile.name.familyName;
          }

          User.create(data).done(function (err, user) {
            return done(err, user);
          });
        }
      });
  });
};


// Use the FacebookStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Facebook
//   profile), and invoke a callback with a user object.
passport.use(new FacebookStrategy({
    clientID: '258394057673691',
    clientSecret: '68705b87e81dc09abaf8abf17836dc38',
    callbackURL: "/auth/facebook/callback"
  },
  verifyHandler
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

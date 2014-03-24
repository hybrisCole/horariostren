/**
 * AuthController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var passport = require("passport");
module.exports = {

  facebook:function(req,res){
    passport.authenticate('facebook', { failureRedirect: '/login', scope: ['email'] },
      function (err, user) {
        req.logIn(user, function (err) {
          if (err) {
            console.log(err);
            res.view('500');
            return;
          }

          res.redirect('/');
          return;
        });
      })(req, res);
  },
  callback:function(req,res){
    passport.authenticate('facebook', { failureRedirect: '/login' });
    console.log('callback');
  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to AuthController)
   */
  _config: {}

  
};

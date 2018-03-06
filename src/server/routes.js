const passport = require ('passport');
const listenerUser = require ('./listenerUser');
const listenerApp = require ('./listenerApp');

// Initialize routes.
function init (app) {
  listenerUser.init ();
  listenerApp.init ();

  app.post ('/api/login', listenerUser.login);

  app.get ('/api/login/twitter', passport.authenticate ('twitter'));
  app.get ('/api/login/twittercb',
    passport.authenticate ('twitter', { failureRedirect: '/login' }),
    (req, res) => {
      console.log ('tauth', req.user);
      res.redirect ('/verifyLogin');
    });

  app.post ('/api/logout', listenerUser.logout);
  app.get ('/api/verifylogin', listenerUser.verifyLogin);
  app.post ('/api/register', listenerUser.register);

  app.get ('/api/pinned', isAuthenticated, listenerApp.getPinned);
  app.get ('/api/pins/:_id', listenerApp.getPin);
  app.get ('/api/pins', listenerApp.getPins);
  app.post ('/api/pins', isAuthenticated, listenerApp.createPin);
  app.post ('/api/pins/:_id', isAuthenticated, listenerApp.updatePin);
  app.post ('/api/pins/:_id/pin/:value', isAuthenticated, listenerApp.setPinned);
  app.delete ('/api/pins/:_id', isAuthenticated, listenerApp.deletePin);
}

// authenticate, if passing continue, otherwise return 401 (auth failed)
function isAuthenticated (req, res, next) {
  if (req.isAuthenticated ()) {
    return next ();
  } else {
    return res.status (401).json ({});
  }
}

exports.init = init;

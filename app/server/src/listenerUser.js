const passport = require ('passport');
const db = require ('./db');

// Initialize listeners (currently empty)
function init () {
  // empty
}

// Login, authenticating user and creating a session
function login (req, res, next) {
  console.log ('login');
  passport.authenticate ('local', (err, user) => {
    if (err) {
      return next (err);
    }
    // if not a valid user, return 401 auth error
    if (!user) {
      console.log ('  login', 'unauthenticated');
      return res.status (401).json ({});
    }
    return req.login (user, (err1) => {
      if (err1) {
        return next (err);
      }
      console.log ('  login', user.username);
      const result = { id: user.id, username: user.username };
      return res.status (200).json (result);
    });
  }) (req, res, next);
}

// logout, closing session
function logout (req, res) {
  if (req.user) {
    console.log ('logout', req.user.username);
  }
  req.logout ();
  res.status (200).json ({});
}

// if already logged in, return user information
// allows continuation of session
function verifyLogin (req, res) {
  console.log ('verifyLogin');
  let message = { authenticated: false, user: null };
  if (req.isAuthenticated ()) {
    message = {
      authenticated: true,
      user: {
        id: req.user.id,
        username: req.user.username,
      },
    };
    console.log ('  verified', req.user.username);
  } else {
    console.log ('  not verified (no username)');
  }
  res.status (200).json (message);
}

// register new user. If already existing user, return 403 (Forbidden)
async function register (req, res) {
  console.log ('register');
  if (!(req.body && req.body.username && req.body.password)) {
    res.status (400).json ({});
  } else {
    try {
      await db.insertLocalUser (req.body.username, req.body.password);
      console.log ('  registered', req.body.username);
      res.status (200).json ({});
    } catch (err) {
      console.log ('  error', err);
      res.status (403).json ({});
    }
  }
}

exports.init = init;
exports.login = login;
exports.logout = logout;
exports.verifyLogin = verifyLogin;
exports.register = register;

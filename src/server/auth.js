const passport = require ('passport');
const LocalStrategy = require ('passport-local').Strategy;
const TwitterStrategy = require ('passport-twitter').Strategy;
const db = require ('./db');
const hash = require ('./hash');

// Initialize authentication module, with serializer and desericalizer
function init () {
  // local authentication using database for user registry
  passport.use (new LocalStrategy (async (username, password, callback) => {
    try {
      const user = await db.findUser (`l-${username}`);
      if (! user) {
        return callback (null, false);
      }
      const passwordMatch = hash.compare (password, user.hash, user.salt);
      return callback (null, (passwordMatch) ? user : false);
    } catch (err) {
      return callback (err);
    }
  }));

  // twitter authentication
  const twitter = {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: '/api/login/twittercb',
  };
  if (twitter.consumerKey && twitter.consumerSecret) {
    passport.use (new TwitterStrategy (twitter, async (token, tokenSecret, profile, callback) => {
      try {
        const existing = await db.findUser (`t-${profile.id}`);
        let user = existing;
        if (! existing) {
          user = {
            id: `t-${profile.id}`,
            username: profile.username,
            name: profile.displayName,
          };
          await db.insertSocialUser (user);
          return callback (null, user);
        }
        return callback (null, user);
      } catch (err) {
        return callback (err);
      }
    }));
  }

  // set function to set username as key for serialization
  passport.serializeUser ((user, callback) => {
    callback (null, user.id);
  });

  // set function to get user from username
  passport.deserializeUser (async (id, callback) => {
    try {
      const user = await db.findUser (id);
      return callback (null, user);
    } catch (err) {
      return callback (err);
    }
  });
}

exports.init = init;

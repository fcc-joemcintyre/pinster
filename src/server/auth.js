'use strict';
const passport = require ('passport');
const LocalStrategy = require ('passport-local').Strategy;
const TwitterStrategy = require ('passport-twitter').Strategy;
const db = require ('./db');
const hash = require ('./hash');

// Initialize authentication module, with serializer and desericalizer
function init () {
  // local authentication using database for user registry
  passport.use (new LocalStrategy ((username, password, callback) => {
    db.findUser ('l-' + username)
    .then (user => {
      if (! user) {
        return callback (null, false);
      }
      let passwordMatch = hash.compare (password, user.hash, user.salt);
      return callback (null, (passwordMatch) ? user : false);
    })
    .catch (err => {
      return callback (err);
    });
  }));

  // twitter authentication
  let twitter = {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: '/api/login/twittercb'
  };
  passport.use (new TwitterStrategy (twitter, (token, tokenSecret, profile, callback) => {
    db.findUser ('t-' + profile.id)
    .then (result => {
      let user = result;
      if (! result) {
        user = {
          id: 't-' + profile.id,
          username: profile.username,
          name: profile.displayName
        };
        db.insertSocialUser (user).then (() => {
          return callback (null, user);
        });
      }
      return callback (null, user);
    })
    .catch (err => {
      return callback (err);
    });
  }));

  // set function to set username as key for serialization
  passport.serializeUser ((user, callback) => {
    callback (null, user.id);
  });

  // set function to get user from username
  passport.deserializeUser ((id, callback) => {
    db.findUser (id)
    .then (user => {
      return callback (null, user);
    })
    .catch (err => {
      return callback (err);
    });
  });
}

exports.init = init;

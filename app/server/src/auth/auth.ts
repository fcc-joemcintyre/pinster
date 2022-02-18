import passport from 'passport';
import passportLocal from 'passport-local';
import { getUserByEmail, User } from '../db/users.js';
import { compareHash } from './hash.js';

const LocalStrategy = passportLocal.Strategy;

/**
 * Initialize authentication module, with serializer and desericalizer
 */
export function initAuth () {
  // local authentication using database for user registry
  const options = { usernameField: 'email', passwordField: 'password' };
  passport.use (new LocalStrategy (options, async (email, password, callback) => {
    try {
      const r = await getUserByEmail (email);
      if (r.status !== 200 || r.user === undefined) {
        return callback (null, false);
      }
      const passwordMatch = compareHash (password, r.user.hash, r.user.salt);
      return callback (null, (passwordMatch) ? r.user : false);
    } catch (err) {
      return callback (err);
    }
  }));

  // set function to set username as key for serialization
  passport.serializeUser ((user, callback) => {
    callback (null, user);
  });

  // deserialize user
  passport.deserializeUser ((user: User | false | undefined | null, callback) => (
    callback (null, user)
  ));
}

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
      const user = await getUserByEmail (email);
      if (!user) {
        return callback (null, false);
      }
      const passwordMatch = compareHash (password, user.hash, user.salt);
      return callback (null, (passwordMatch) ? user : false);
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

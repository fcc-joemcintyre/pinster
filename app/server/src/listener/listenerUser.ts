import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { registerUser, User } from '../db/users.js';
import { validateLogin, validateRegister } from './validators.js';

/**
 * Login, authenticating user and creating a session
 * @param req Request
 * @param res Response
 * @param next Next function
 */
export function login (req: Request, res: Response, next: NextFunction) {
  console.log ('login');
  if (!validateLogin (req.body)) {
    console.log ('ERROR login (400) invalid body', validateLogin.errors);
    res.status (400).json ({});
  } else {
    passport.authenticate ('local', (err: unknown, user: User) => {
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
        console.log ('  login', user.email);
        const result = { key: user.key };
        return res.status (200).json (result);
      });
    }) (req, res, next);
  }
}

/**
 * Logout, closing session
 * @param req Request
 * @param res Response
 */
export function logout (req: Request, res: Response) {
  const user = req.user as User;
  if (req.user) {
    console.log ('logout', user.key);
  }
  req.logout (() => {
    res.status (200).json ({});
  });
}

/**
 * If already logged in, return user information, allows
 * continuation of session
 * @param req Request
 * @param res Response
 */
export function verifyLogin (req: Request, res: Response) {
  console.log ('verifyLogin');
  let message: {
    authenticated: boolean,
    key: number,
  } = { authenticated: false, key: 0 };
  if (req.isAuthenticated ()) {
    const user = req.user as User;
    message = {
      authenticated: true,
      key: user.key,
    };
    console.log ('  verified', user.email);
  } else {
    console.log ('  not verified (no email)');
  }
  res.status (200).json (message);
}

/**
 * Register new user. If already existing user, return 403 (Forbidden)
 * @param req Request
 * @param res Response
 */
export async function register (req: Request, res: Response) {
  console.log ('register');
  if (!validateRegister (req.body)) {
    console.log ('ERROR register (400) invalid body', validateRegister.errors);
    res.status (400).json ({});
  } else {
    const { email, name, password } = req.body as { email: string, name: string, password: string };
    const t = await registerUser (email, name, password);
    console.log (t.status === 200 ? 'registered' : 'error', email);
    res.status (t.status).json ({});
  }
}

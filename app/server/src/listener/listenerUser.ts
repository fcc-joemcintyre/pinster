import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { registerUser, User } from '../db/users.js';

/**
 * Login, authenticating user and creating a session
 * @param req Request
 * @param res Response
 * @param next Next function
 */
export function login (req: Request, res: Response, next: NextFunction) {
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
      console.log ('  login', user.email);
      const result = { key: user.key };
      return res.status (200).json (result);
    });
  }) (req, res, next);
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
  req.logout ();
  res.status (200).json ({});
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
  if (!(req.body && req.body.email && req.body.name && req.body.password)) {
    console.log ('register invalid body', req.body);
    res.status (400).json ({});
  } else {
    const t = await registerUser (req.body.email, req.body.name, req.body.password);
    if (t === undefined) {
      res.status (500).json ({});
    } else if (t === null) {
      res.status (400).json ({});
    } else if (t === 409) {
      res.status (409).json ({});
    } else {
      console.log ('  registered', req.body.email);
      res.status (200).json ({});
    }
  }
}

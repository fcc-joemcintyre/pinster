import { Application, NextFunction, Request, Response } from 'express';
import { login, logout, register, verifyLogin } from './listener/listenerUser.js';
import { createPin, deletePin, getPin, getPinned, getPins, setPinned, updatePin } from './listener/listenerApp.js';

/**
 * Initialize routes.
 * @param app Express app object
 */
export function initRoutes (app: Application): void {
  app.post ('/api/login', login);
  app.post ('/api/logout', logout);
  app.get ('/api/verifylogin', verifyLogin);
  app.post ('/api/register', register);

  app.get ('/api/pinned', isAuthenticated, getPinned);
  app.get ('/api/pins/:key', getPin);
  app.get ('/api/pins', getPins);
  app.post ('/api/pins', isAuthenticated, createPin);
  app.post ('/api/pins/:key', isAuthenticated, updatePin);
  app.post ('/api/pins/:key/pin/:value', isAuthenticated, setPinned);
  app.delete ('/api/pins/:key', isAuthenticated, deletePin);
}

/**
 * Authenticate, if passing continue, otherwise return 401 (auth failure)
 * @param req Request
 * @param res Response
 * @param next Next middleware
 */
function isAuthenticated (req: Request, res: Response, next: NextFunction): void {
  if (req.isAuthenticated ()) {
    next ();
  } else {
    res.status (401).json ({});
  }
}

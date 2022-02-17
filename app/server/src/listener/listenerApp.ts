import { Request, Response } from 'express';
import { User } from '../db/users.js';
import * as db from '../db/pins.js';

/**
 * Create new pin
 * @param req Request
 * @param res Response
 */
export async function createPin (req: Request, res: Response) {
  console.log ('createPin');
  const user = req.user as User;
  const { category, title, text, url } = req.body;
  const t = await db.createPin (user.key, category, title, text, url);
  res.status (t?.acknowledged ? 200 : 400).json ({});
}

/**
 * Update a pin
 * @param req Request
 * @param res Response
 */
export async function updatePin (req: Request, res: Response) {
  console.log ('updatePin');
  const key = Number (req.params.key);
  if (Number.isNaN (key)) {
    res.status (400).json ({});
    return;
  }
  const t = await db.updatePin (key, req.body.category, req.body.title, req.body.text, req.body.url);
  res.status (t.acknowledged ? 200 : 400).json ({});
}

/**
 * Delete a pin
 * @param req Request
 * @param res Response
 */
export async function deletePin (req: Request, res: Response) {
  console.log ('deletePin');
  const key = Number (req.params.key);
  if (Number.isNaN (key)) {
    res.status (400).json ({});
    return;
  }
  const t = await db.removePin (key);
  res.status (t.acknowledged ? 200 : 400).json ({});
}

/**
 * Get a pin
 * @param req Request
 * @param res Response
 */
export async function getPin (req: Request, res: Response) {
  console.log ('getPin');
  const key = Number (req.params.key);
  if (Number.isNaN (key)) {
    res.status (400).json ({});
    return;
  }
  const user = req.user as User;
  const pin = await db.getPin (key);
  if (pin === null) {
    res.status (404).json ({});
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { pinners, ...rest } = pin;
    const t = {
      ...rest,
      count: pin.pinners.length,
      pinned: pin.pinners.indexOf (user.key) !== -1,
    };
    res.status (200).json (t);
  }
}

/**
 * Get set of pins (all or all by a creator)
 * @param req Request
 * @param res Response
 */
export async function getPins (req: Request, res: Response) {
  console.log ('getPins');
  let pins;
  if ((req.query) && (req.query.creator)) {
    const creator = Number (req.query.creator);
    if (Number.isNaN (creator)) {
      res.status (404).json ({});
      return;
    }
    pins = await db.getPinsByCreator (creator);
  } else {
    pins = await db.getPins ();
  }

  const user = req.user as User;
  const t = pins.map ((pin) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { pinners, ...rest } = pin;
    return ({
      ...rest,
      count: pin.pinners.length,
      pinned: pin.pinners.indexOf (user?.key || 0) !== -1,
    });
  });
  res.status (200).json (t);
}

/**
 * Get list of pins that the authenticated user has pinned
 * @param req Request
 * @param res Response
 */
export async function getPinned (req: Request, res: Response) {
  console.log ('getPinned', req.params);
  const user = req.user as User;
  const pins = await db.getPins ();
  const list = pins.filter ((pin) => pin.pinners.includes (user.key));
  res.status (200).json (list);
}

/**
 * Add or remove the authenticated user from list of pinned users
 * for a pin
 * @param req Request
 * @param res Response
 */
export async function setPinned (req: Request, res: Response) {
  console.log ('setPinned');
  const user = req.user as User;
  const key = Number (req.params.key);
  const pinned = req.params.value;
  if (Number.isNaN (key) || (pinned !== 'true' && pinned !== 'false')) {
    res.status (400).json ({});
  }

  const t = await db.setPinner (key, user.key, pinned === 'true');
  res.status (t.acknowledged ? 200 : 400).json ();
}

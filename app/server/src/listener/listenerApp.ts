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
  if (t.status !== 200 || t.pin === undefined) {
    res.status (t.status).json ({});
  } else {
    const t1 = transformPin (t.pin, user?.key);
    res.status (200).json (t1);
  }
}

/**
 * Update a pin
 * @param req Request
 * @param res Response
 */
export async function updatePin (req: Request, res: Response) {
  console.log ('updatePin');
  const user = req.user as User;
  const key = Number (req.params.key);
  if (Number.isNaN (key)) {
    res.status (400).json ({});
    return;
  }
  const t = await db.updatePin (key, req.body.category, req.body.title, req.body.text, req.body.url);
  if (t.status !== 200 || t.pin === undefined) {
    res.status (t.status).json ({});
  } else {
    const t1 = transformPin (t.pin, user?.key);
    res.status (200).json (t1);
  }
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
  res.status (t.status).json ({});
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
  const t = await db.getPin (key);
  if (t.status !== 200 || t.pin === undefined) {
    res.status (404).json ({});
  } else {
    const t1 = transformPin (t.pin, user?.key);
    res.status (200).json (t1);
  }
}

/**
 * Get set of pins (all or all by a creator)
 * @param req Request
 * @param res Response
 */
export async function getPins (req: Request, res: Response) {
  console.log ('getPins');
  let t;
  if ((req.query) && (req.query.creator)) {
    const creator = Number (req.query.creator);
    if (Number.isNaN (creator)) {
      res.status (400).json ({});
      return;
    }
    t = await db.getPinsByCreator (creator);
  } else if ((req.query) && (req.query.pinner)) {
    const pinner = Number (req.query.pinner);
    if (Number.isNaN (pinner)) {
      res.status (400).json ({});
      return;
    }
    t = await db.getPinsByPinner (pinner);
  } else {
    t = await db.getPins ();
  }

  const user = req.user as User;
  if (t.status === 200 && t.pins !== undefined) {
    const t1 = t.pins.map ((pin) => transformPin (pin, user?.key));
    res.status (200).json (t1);
  } else {
    res.status (400).json ({});
  }
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
  if (t.status !== 200 || t.pin === undefined) {
    res.status (t.status).json ({});
  } else {
    const t1 = transformPin (t.pin, user?.key);
    res.status (200).json (t1);
  }
}

/**
 * Transform pin to replace list of pinners with count, pinned indicator
 * @param pin Pins to transform
 * @param user Key of user to determine pinned indicator
 * @returns Transformed array of pins
 */
function transformPin (pin: db.Pin, user = 0) {
  const { pinners, ...rest } = pin;
  return ({
    ...rest,
    count: pinners.length,
    pinned: pinners.indexOf (user) !== -1,
  });
}

import { Collection, Db } from 'mongodb';
import { getNextSequence } from './counters.js';

export type Pin = {
  key: number,
  creator: number,
  category: string,
  title: string,
  text: string,
  url: string,
  pinners: number[],
};

export type PinResult = {
  status: number,
  pin?: Pin,
};

export type PinArrayResult = {
  status: number,
  pins?: Pin[],
};

export type PinnerArrayResult = {
  status: number,
  pinners?: number[],
};

let c: Collection<Pin>;

/**
 * Initialize collection
 * @param db MongoDB db instance object
 */
export function initPins (db: Db) {
  c = db.collection ('pins');
}

/**
 * Get all pins
 * @returns Pin array result
 */
export async function getPins (): Promise<PinArrayResult> {
  const t = await c.find ().toArray ();
  return ({ status: 200, pins: t });
}

/**
 * Get pins by creator
 * @param creator Creator email
 * @returns Pin array result
 */
export async function getPinsByCreator (creator: number): Promise<PinArrayResult> {
  const t = await c.find ({ creator }).toArray ();
  return ({ status: 200, pins: t });
}

/**
 * Get a single pin
 * @param key Key
 * @returns Pin result
 */
export async function getPin (key: number): Promise<PinResult> {
  const t = await c.findOne ({ key });
  return ({ status: t ? 200 : 404, pin: t || undefined });
}

/**
 * Create a new pin
 * @param creator Creator user key
 * @param category Category
 * @param title Title
 * @param text Text
 * @param url URL
 * @returns Pin result
 */
export async function createPin (
  creator: number, category: string, title: string, text: string, url: string
): Promise<PinResult> {
  const key = await getNextSequence ('pins');
  if (key) {
    const t = await c.insertOne ({ key, creator, category, title, text, url, pinners: [] });
    if (t.acknowledged) {
      const t1 = await c.findOne ({ _id: t.insertedId });
      return ({ status: t1 ? 200 : 404, pin: t1 || undefined });
    }
  }
  return { status: 500 };
}

/**
 * Update a pin
 * @param key Key
 * @param category Category
 * @param title Title
 * @param text Text
 * @param url URL
 * @returns Pin result
 */
export async function updatePin (
  key: number, category: string, title: string, text: string, url: string
): Promise<PinResult> {
  const t = await c.findOneAndUpdate (
    { key },
    { $set: { category, title, text, url } },
    { returnDocument: 'after' },
  );
  if (t.ok) {
    return ({ status: 200, pin: t.value || undefined });
  } else {
    return ({ status: 500 });
  }
}

/**
 * Remove a pin
 * @param key Key
 * @returns Pin result
 */
export async function removePin (key: number): Promise<PinResult> {
  const t = await c.deleteOne ({ key });
  return ({ status: t.acknowledged ? 200 : 404 });
}

/**
 * Update list of pinners on a pin
 * @param key Key
 * @param pinner Key of pinner
 * @param action true to add, false to remove
 * @returns Pin result
 */
export async function setPinner (
  key: number, pinner: number, action: boolean
): Promise<PinResult> {
  let t;
  if (action) {
    t = await c.findOneAndUpdate (
      { key },
      { $addToSet: { pinners: pinner } },
      { returnDocument: 'after' },
    );
  } else {
    t = await c.findOneAndUpdate (
      { key },
      { $pull: { pinners: pinner } },
      { returnDocument: 'after' },
    );
  }
  return ({ status: t.ok ? 200 : 404, pin: t.value || undefined });
}

/**
 * Get list of pinners for a pin
 * @param key Key
 * @returns Pinner array result
 */
export async function getPinners (key: number): Promise<PinnerArrayResult> {
  const t = await c.findOne ({ key });
  return ({ status: t ? 200 : 404, pinners: t?.pinners || undefined });
}

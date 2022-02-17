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
 * @returns Pins array
 */
export function getPins () {
  return c.find ().toArray ();
}

/**
 * Get pins by creator
 * @param creator Creator email
 * @returns Pins array
 */
export function getPinsByCreator (creator: number) {
  return c.find ({ creator }).toArray ();
}

/**
 * Get a single pin
 * @param key Key
 * @returns Pin, or null if not found
 */
export function getPin (key: number) {
  return c.findOne ({ key });
}

/**
 * Create a new pin
 * @param creator Creator user key
 * @param category Category
 * @param title Title
 * @param text Text
 * @param url URL
 * @returns Insert result, or undefined if not created
 */
export async function createPin (creator: number, category: string, title: string, text: string, url: string) {
  const key = await getNextSequence ('pins');
  if (key) {
    return c.insertOne ({ key, creator, category, title, text, url, pinners: [] });
  }
  return undefined;
}

/**
 * Update a pin
 * @param key Key
 * @param category Category
 * @param title Title
 * @param text Text
 * @param url URL
 * @returns Update result
 */
export function updatePin (key: number, category: string, title: string, text: string, url: string) {
  return c.updateOne (
    { key },
    { $set: { category, title, text, url } }
  );
}

/**
 * Remove a pin
 * @param key Key
 * @returns Delete result
 */
export function removePin (key: number) {
  return c.deleteOne ({ key });
}

/**
 * Update list of pinners on a pin
 * @param key Key
 * @param pinner Key of pinner
 * @param action true to add, false to remove
 * @returns Update result
 */
export function setPinner (key: number, pinner: number, action: boolean) {
  if (action) {
    return c.updateOne (
      { key },
      { $addToSet: { pinners: pinner } }
    );
  } else {
    return c.updateOne (
      { key },
      { $pull: { pinners: pinner } }
    );
  }
}

/**
 * Get list of pinners for a pin
 * @param key Key
 * @returns Array of user keys that have pinned this pin
 */
export async function getPinners (key: number) {
  const data = await c.findOne ({ key });
  return data?.pinners || [];
}

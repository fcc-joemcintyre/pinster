import { Collection, Db, MongoServerError } from 'mongodb';
import { createHash } from '../auth/hash.js';
import { getNextSequence } from './counters.js';

export type User = {
  key: number,
  email: string,
  name: string,
  hash: string,
  salt: string,
};

let c: Collection<User>;

/**
 * Initialize collection
 * @param db MongoDB db instance object
 */
export function initUsers (db: Db) {
  c = db.collection ('users');
}

/**
 * Find single user by email
 * @param email User email
 * @returns User result
 */
export function getUserByEmail (email: string) {
  return c.findOne ({ email });
}

/**
 * Register user, creating skeleton user document
 * @param email Email
 * @param name Name
 * @param password Password
 * @returns Result for new user
 */
export async function registerUser (
  email: string,
  name: string,
  password: string
) {
  const key = await getNextSequence ('users');
  if (!key) {
    return undefined;
  }

  try {
    const hash = createHash (password);
    const t = await c.insertOne (
      { key, email, name, hash: hash.hash, salt: hash.salt },
    );
    if (t.acknowledged) {
      return c.findOne (t.insertedId);
    } else {
      return undefined;
    }
  } catch (err) {
    if (err instanceof MongoServerError) {
      if (err.code === 11000) {
        return 409;
      }
    }
    return undefined;
  }
}

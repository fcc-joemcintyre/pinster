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

export type UserResult = {
  status: number,
  user?: User,
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
export async function getUserByEmail (email: string): Promise<UserResult> {
  const t = await c.findOne ({ email });
  return ({ status: t ? 200 : 404, user: t as User });
}

/**
 * Register user, creating skeleton user document
 * @param email Email
 * @param name Name
 * @param password Password
 * @returns User result
 */
export async function registerUser (
  email: string,
  name: string,
  password: string
): Promise<UserResult> {
  const key = await getNextSequence ('users');
  if (!key) {
    return { status: 500 };
  }

  try {
    const hash = createHash (password);
    const t = await c.insertOne (
      { key, email, name, hash: hash.hash, salt: hash.salt },
    );
    if (t.acknowledged) {
      const t1 = await c.findOne (t.insertedId);
      return ({ status: t1 ? 200 : 404, user: t1 as User });
    } else {
      return ({ status: 400 });
    }
  } catch (err) {
    if (err instanceof MongoServerError) {
      if (err.code === 11000) {
        return ({ status: 409 });
      }
    }
    return ({ status: 500 });
  }
}

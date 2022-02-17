import { expect } from 'earljs';
import { Db } from 'mongodb';
import { initDatabase, closeDatabase } from '../src/db/db.js';
import { initCounters, getNextSequence } from '../src/db/counters.js';
import { getUserByEmail, initUsers, registerUser, User } from '../src/db/users.js';

let db: Db | null;

describe ('db / counters', function () {
  before (async () => {
    db = await initDatabase ('mongodb://localhost:27018/pollster');
    if (db) {
      const c = db.collection ('counters');
      await c.deleteMany ({});
      initCounters (db);
    }
  });

  after (() => {
    closeDatabase ();
  });

  describe ('initial counter', function () {
    it ('should create new counter with value 1', async function () {
      const key = await getNextSequence ('test');
      expect (key).toEqual (1);
    });
  });

  describe ('increment counter', function () {
    it ('counter value should be 2', async function () {
      const key = await getNextSequence ('test');
      expect (key).toEqual (2);
    });
  });
});

describe ('db / users', function () {
  before (async () => {
    db = await initDatabase ('mongodb://localhost:27018/pollster');
    if (db) {
      const c1 = db.collection ('counters');
      await c1.deleteMany ({});
      const c2 = db.collection ('users');
      await c2.deleteMany ({});
      await c2.createIndex ({ email: 1 }, { unique: true, name: 'email' });
      initCounters (db);
      initUsers (db);
    }
  });

  after (() => {
    closeDatabase ();
  });

  describe ('register user', function () {
    it ('should create new user', async function () {
      const r = await registerUser ('amy@example.com', 'Amy Smith', 'test');
      expect (r).toBeDefined ();
      expect (r).not.toEqual (409);
      const t = r as User;
      expect (t.email).toEqual ('amy@example.com');
      expect (t.name).toEqual ('Amy Smith');
    });

    it ('duplicate should error', async function () {
      const r = await registerUser ('amy@example.com', 'Amy Smith', 'test');
      expect (r).toEqual (409);
    });
  });

  describe ('get user', function () {
    it ('find amy@example.com should find user', async function () {
      const r = await getUserByEmail ('amy@example.com');
      expect (r).toBeAnObjectWith ({ key: 1, email: 'amy@example.com' });
    });

    it ('find bob@example.com should not find user', async function () {
      const r = await getUserByEmail ('bob@example.com');
      expect (r).toEqual (null);
    });
  });
});

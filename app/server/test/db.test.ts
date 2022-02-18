import { expect } from 'earljs';
import { Db } from 'mongodb';
import { initDatabase, closeDatabase } from '../src/db/db.js';
import { initCounters, getNextSequence } from '../src/db/counters.js';
import { getUserByEmail, initUsers, registerUser, User } from '../src/db/users.js';
import { createPin, getPin, getPinners, getPins, getPinsByCreator, initPins, removePin, setPinner, updatePin }
  from '../src/db/pins.js';

let db: Db | null;

describe ('db / counters', function () {
  before (async () => {
    db = await initDatabase ('mongodb://localhost:27018/pollster');
    if (db) {
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
      expect (r.status).toEqual (200);
      const t = r.user as User;
      expect (t.email).toEqual ('amy@example.com');
      expect (t.name).toEqual ('Amy Smith');
    });

    it ('duplicate should error', async function () {
      const r = await registerUser ('amy@example.com', 'Amy Smith', 'test');
      expect (r.status).toEqual (409);
    });
  });

  describe ('get user', function () {
    it ('find amy@example.com should find user', async function () {
      const r = await getUserByEmail ('amy@example.com');
      expect (r.status).toEqual (200);
      expect (r.user).toBeAnObjectWith ({ name: 'Amy Smith' });
    });

    it ('find bob@example.com should not find user', async function () {
      const r = await getUserByEmail ('bob@example.com');
      expect (r.status).toEqual (404);
      expect (r.user).toBeNullish ();
    });
  });
});

describe ('db / apps', function () {
  before (async () => {
    db = await initDatabase ('mongodb://localhost:27018/pollster');
    if (db) {
      initCounters (db);
      initUsers (db);
      initPins (db);
    }
  });

  after (() => {
    closeDatabase ();
  });

  describe ('get pins', function () {
    it ('get all initial pins', async function () {
      const r = await getPins ();
      expect (r.status).toEqual (200);
      expect (r.pins).toBeAnArrayOfLength (3);
    });

    it ('get pins by creator with 2 pins', async function () {
      const r = await getPinsByCreator (1);
      expect (r.status).toEqual (200);
      expect (r.pins).toBeAnArrayOfLength (2);
    });

    it ('get pins by creator with 1 pin', async function () {
      const r = await getPinsByCreator (2);
      expect (r.status).toEqual (200);
      expect (r.pins).toBeAnArrayOfLength (1);
    });

    it ('get pins by creator with 0 pins', async function () {
      const r = await getPinsByCreator (3);
      expect (r.status).toEqual (200);
      expect (r.pins).toBeAnArrayOfLength (0);
    });

    it ('get pins for non-existent creator', async function () {
      const r = await getPinsByCreator (0);
      expect (r.status).toEqual (200);
      expect (r.pins).toBeAnArrayOfLength (0);
    });

    it ('get single pin', async function () {
      const r = await getPin (2);
      expect (r.status).toEqual (200);
      expect (r.pin).toBeAnObjectWith ({ title: 'T2' });
    });

    it ('get non-existent pin', async function () {
      const r = await getPin (0);
      expect (r.status).toEqual (404);
    });
  });

  describe ('manage pins', function () {
    it ('create a new pin', async function () {
      const r = await createPin (1, 'C1', 'T4', 'Text 4', 'https://www.example/com/4');
      expect (r.status).toEqual (200);
      expect (r.pin).toBeAnObjectWith ({ title: 'T4' });
    });

    it ('update pin', async function () {
      const r = await updatePin (4, 'C1', 'T4A', 'Text 4A', 'https://www.example/com/4');
      expect (r.status).toEqual (200);
      expect (r.pin).toBeAnObjectWith ({ title: 'T4A' });
    });

    it ('remove pin', async function () {
      const r = await removePin (4);
      expect (r.status).toEqual (200);
      const r2 = await getPins ();
      expect (r2.pins).toBeDefined ();
      if (r2.pins) {
        expect (r2.pins).toBeAnArrayOfLength (3);
        const initialValue: number[] = [];
        const keys = r2.pins.reduce ((acc, a) => [...acc, a.key], initialValue);
        expect (keys.includes (4)).toBeFalsy ();
      }
    });
  });

  describe ('manage pinners', function () {
    it ('create a new pin', async function () {
      const r = await createPin (1, 'C1', 'T5', 'Text 5', 'https://www.example/com/5');
      expect (r.status).toEqual (200);
      expect (r.pin).toBeAnObjectWith ({ title: 'T5' });
    });

    it ('set pinners', async function () {
      const r1 = await setPinner (5, 1, true);
      expect (r1.status).toEqual (200);
      const r2 = await setPinner (5, 3, true);
      expect (r2.status).toEqual (200);
      const r3 = await getPinners (5);
      expect (r3.status).toEqual (200);
      expect (r3.pinners).toBeAnArrayOfLength (2);
      expect (r3.pinners).toBeAnArrayWith (1);
      expect (r3.pinners).toBeAnArrayWith (3);
    });

    it ('manage pinners', async function () {
      const r1 = await setPinner (5, 1, false);
      expect (r1.status).toEqual (200);
      const r2 = await setPinner (5, 2, true);
      expect (r2.status).toEqual (200);
      const r3 = await getPinners (5);
      expect (r3.status).toEqual (200);
      expect (r3.pinners).toBeAnArrayOfLength (2);
      expect (r3.pinners).toBeAnArrayWith (2);
      expect (r3.pinners).toBeAnArrayWith (3);
    });

    it ('verify duplicate pinners not duplicated in array', async function () {
      const r1 = await setPinner (5, 2, true);
      expect (r1.status).toEqual (200);
      const r2 = await setPinner (5, 2, true);
      expect (r2.status).toEqual (200);
      const r3 = await getPinners (5);
      expect (r3.status).toEqual (200);
      expect (r3.pinners).toBeAnArrayOfLength (2);
      expect (r3.pinners).toBeAnArrayWith (2);
      expect (r3.pinners).toBeAnArrayWith (3);
    });
  });
});

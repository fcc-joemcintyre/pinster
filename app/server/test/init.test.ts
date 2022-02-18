/*
  Initial database setup for tests. These are all static content, and
  not to be modified by any tests.
*/
import { MongoClient } from 'mongodb';
import { User } from '../src/db/users.js';
import { Pin } from '../src/db/pins.js';

const initialCounters = [
  { _id: 'users', sequence: 3 },
  { _id: 'pins', sequence: 3 },
];

const initialUsers: User[] = [
  { key: 1, email: 'a@example.com', name: 'A A', hash: '', salt: '' },
  { key: 2, email: 'b@example.com', name: 'B B', hash: '', salt: '' },
  { key: 3, email: 'c@example.com', name: 'C C', hash: '', salt: '' },
];

const initialPins: Pin[] = [
  { key: 1, creator: 1, category: 'C1', title: 'T1', text: 'Text 1', url: '', pinners: [] },
  { key: 2, creator: 1, category: 'C1', title: 'T2', text: 'Text 2', url: '', pinners: [] },
  { key: 3, creator: 2, category: 'C1', title: 'T3', text: 'Text 3', url: '', pinners: [] },
];

let client: MongoClient;

before (async () => {
  client = await MongoClient.connect ('mongodb://localhost:27018/pollster');
  const db = client.db ();
  const c1 = db.collection ('counters');
  await c1.deleteMany ({});
  await c1.insertMany (initialCounters as any); // eslint-disable-line

  const c2 = db.collection ('users');
  await c2.deleteMany ({});
  await c2.createIndex ({ email: 1 }, { unique: true, name: 'email' });
  await c2.insertMany (initialUsers);

  const c3 = db.collection ('pins');
  await c3.deleteMany ({});
  await c3.insertMany (initialPins);
});

after (() => {
  if (client) {
    client.close ();
  }
});

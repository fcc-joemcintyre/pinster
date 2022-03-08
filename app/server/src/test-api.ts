import express from 'express';
import http from 'http';
import { MongoClient } from 'mongodb';
import newman from 'newman'; // eslint-disable-line
import { Pin } from './db/pins.js';
import { User } from './db/users.js';
import { startServer, stopServer } from './server.js';

const port = 3000;
const uri = 'mongodb://localhost:27018/pinsterPostman';

// hash and salt for password test
const hash = '0811ec26719dd7633f3f91276fb47220a0bd82f1eff243abf09a4257987a4a0c8ec1c332d95cc281e2fec388092888b9d231b78da57f46a0df4a75842eea60ff';
const salt = '2ddbd3923c0ff0dc86215cf8cc277f1a';

main ();

/**
 * Initialize test server instance
 * if --server arg provided, start server for interactive use
 * if no arg provided, run postman tests and exit
 */
async function main (): Promise<void> {
  const args = process.argv.slice (2);
  const server = args.reduce ((acc: boolean, a) => (
    acc || a.toLowerCase () === '--server'
  ), false);

  // reset database and start application server
  await resetDatabase ();
  await startServer (port, uri);

  // start management server to support test specific APIs
  const app = express ();
  app.post ('/api/test/reset', async (req, res) => {
    console.log ('reset test environment');
    await resetDatabase ();
    res.status (200).json ({});
  });
  const t = http.createServer (app);
  await listenAsync (t, 3001);

  // if running tests, start test runner
  if (!server) {
    newman.run ({
      collection: '../app/server/postman/pinster.postman_collection.json',
      environment: '../app/server/postman/local.postman_environment.json',
      reporters: 'cli',
    }, async () => {
      await stopServer ();
      process.exit (0);
    });
  }
}

/**
 * Initialize database
 */
async function resetDatabase () {
  // initialize database
  const initialCounters = [
    { _id: 'users', sequence: 3 },
    { _id: 'pins', sequence: 3 },
  ];

  const initialUsers: User[] = [
    { key: 1, email: 'a@example.com', name: 'A A', hash, salt },
    { key: 2, email: 'b@example.com', name: 'B B', hash, salt },
    { key: 3, email: 'c@example.com', name: 'C C', hash, salt },
  ];

  const initialPins: Pin[] = [
    { key: 1, creator: 1, category: 'C1', title: 'T1', text: 'Text 1', url: 'https://www.example.com/1.jpg', pinners: [2] },
    { key: 2, creator: 1, category: 'C1', title: 'T2', text: 'Text 2', url: 'https://www.example.com/2.jpg', pinners: [2, 3] },
    { key: 3, creator: 2, category: 'C1', title: 'T3', text: 'Text 3', url: 'https://www.example.com/3.jpg', pinners: [] },
  ];

  const client = await MongoClient.connect (uri);
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
  client.close ();
}

/**
 * Async / await support for http.Server.listen
 * @param s http.Server instance
 * @param p port number
 * @returns Promise to await server.listen on
 */
function listenAsync (s: http.Server, p: number) {
  return new Promise ((resolve) => {
    s.listen (p, () => { resolve (true); });
  });
}

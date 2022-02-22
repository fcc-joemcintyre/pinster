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
 * Initialize and start test server instance
 */
async function main (): Promise<void> {
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
    { key: 1, creator: 1, category: 'C1', title: 'T1', text: 'Text 1', url: 'https://www.example.com/1.jpg', pinners: [] },
    { key: 2, creator: 1, category: 'C1', title: 'T2', text: 'Text 2', url: 'https://www.example.com/2.jpg', pinners: [] },
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

  await startServer (port, uri);

  newman.run ({
    collection: 'app/server/postman/pinster.postman_collection.json',
    environment: 'app/server/postman/local.postman_environment.json',
    reporters: 'cli',
  }, async () => {
    await stopServer ();
    process.exit (0);
  });
}

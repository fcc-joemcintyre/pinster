/* eslint global-require: off */
const MongoClient = require ('mongodb').MongoClient;
const server = require ('../../dist/server');
const db = require ('../../dist/db');

// set up browser variables and fetch implementation
const port = 3999;
global.window = {
  location: {
    origin: `http://localhost:${port}`,
  },
};
global.fetch = require ('fetch-cookie') (require ('node-fetch'));

const dbURI = 'mongodb://localhost:27017/pinsterTest';

before (async function () {
  await resetDatabase ();
  await db.init (dbURI);
  await db.insertLocalUser ('amy', 'test');
  const data = [
    { creator: 'l-amy', username: 'amy', category: 'Aa', title: 'Aaa', url: 'http://example.com/image1.png', text: '1', pinners: ['l-amy'] },
    { creator: 'l-amy', username: 'amy', category: 'Bb', title: 'Bbb', url: 'http://example.com/image2.png', text: '2', pinners: ['l-amy'] },
    { creator: 'l-amy', username: 'amy', category: 'Cc', title: 'Ccc', url: 'http://example.com/image3.png', text: '3', pinners: ['l-amy'] },
    { creator: 'l-amy', username: 'amy', category: 'Dd', title: 'Ddd', url: 'http://example.com/image4.png', text: '4', pinners: ['l-amy'] },
    { creator: 'l-bob', username: 'amy', category: 'Ee', title: 'Eee', url: 'http://example.com/image5.png', text: '5', pinners: ['l-bob'] },
    { creator: 'l-bob', username: 'amy', category: 'Ff', title: 'Fff', url: 'http://example.com/image6.png', text: '6', pinners: ['l-bob'] },
  ];
  await db.insertPin (data);
  await db.close ();
  await server.start (port, dbURI);
});

after (async function () {
  await server.stop ();
});

async function resetDatabase () {
  const instance = await MongoClient.connect (dbURI);
  const users = instance.collection ('users');
  await users.ensureIndex ({ id: 1 }, { unique: true });
  await users.remove ({});
  const pins = instance.collection ('pins');
  await pins.ensureIndex ({ creator: 1 }, { unique: false });
  await pins.remove ({});
  await instance.close ();
}

describe ('server', function () {
  describe ('test-cmd', function () {
    require ('./test-cmd');
  });
  describe ('test-page', function () {
    require ('./test-page');
  });
  describe ('test-user', function () {
    require ('./test-user');
  });
  describe ('test-app', function () {
    require ('./test-app');
  });
});

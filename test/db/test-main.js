/* eslint global-require: off */
const MongoClient = require ('mongodb').MongoClient;
const db = require ('../../dist/db');

const uri = 'mongodb://localhost:27017/pinsterTest';

// test db calls with no database connection for error paths
describe ('test no connection', function () {
  require ('./test-nodb');
});

// test init and close functions
describe ('test init/close', function () {
  require ('./test-general');
});

// test application functions
describe ('test-main', function () {
  before (async function () {
    const instance = await MongoClient.connect (uri);
    const users = instance.collection ('users');
    await users.ensureIndex ({ id: 1 }, { unique: true });
    await users.remove ({});
    const pins = instance.collection ('pins');
    await pins.ensureIndex ({ creator: 1 }, { unique: false });
    await pins.remove ({});
    const data = [
      { creator: 'l-amy', username: 'amy', category: 'C1', title: 'T1', text: 'Text1', url: 'http://example.com/image1.png', pinners: [] },
      { creator: 'l-amy', username: 'amy', category: 'C1', title: 'T2', text: 'Text2', url: 'http://example.com/image2.png', pinners: [] },
      { creator: 'l-amy', username: 'amy', category: 'C2', title: 'T3', text: 'Text3', url: 'http://example.com/image3.png', pinners: [] },
      { creator: 'l-amy', username: 'amy', category: 'C2', title: 'T4', text: 'Text4', url: 'http://example.com/image4.png', pinners: [] },
      { creator: 'l-bob', username: 'bob', category: 'C3', title: 'T5', text: 'Text5', url: 'http://example.com/image5.png', pinners: [] },
      { creator: 'l-bob', username: 'bob', category: 'C3', title: 'T6', text: 'Text6', url: 'http://example.com/image6.png', pinners: [] },
    ];
    await pins.insert (data, { w: 1 });
    await instance.close ();
    await db.init (uri);
  });

  after (async function () {
    await db.close ();
  });

  describe ('test-user', function () {
    require ('./test-user');
  });
  describe ('test-app', function () {
    require ('./test-app');
  });
});

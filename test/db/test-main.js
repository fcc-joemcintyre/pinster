'use strict';
const mongoClient = require ('mongodb').MongoClient;
const db = require ('../../dist/db');

const uri = 'mongodb://localhost:27017/pinsterTest';
let testdb = {
  db: null,
  users: null,
  pins: null,
  pinIds: []
};
exports.testdb = testdb;

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
  before (function (done) {
    Promise.resolve ().then (() => {
      return mongoClient.connect (uri);
    }).then (dbInstance => {
      testdb.db = dbInstance;
      testdb.users = testdb.db.collection ('users');
      return testdb.users.ensureIndex ({id: 1}, {unique: true});
    }).then (() => {
      return testdb.users.remove ({});
    }).then (() => {
      testdb.pins = testdb.db.collection ('pins');
      return testdb.pins.ensureIndex ({creator: 1}, {unique: false});
    }).then (() => {
      return testdb.pins.remove ({});
    }).then (() => {
      let data = [
        { creator: 'l-amy', username: 'amy', category: 'C1', title: 'T1', text: 'Text1', url: 'http://example.com/image1.png', pinners: [] },
        { creator: 'l-amy', username: 'amy', category: 'C1', title: 'T2', text: 'Text2', url: 'http://example.com/image2.png', pinners: [] },
        { creator: 'l-amy', username: 'amy', category: 'C2', title: 'T3', text: 'Text3', url: 'http://example.com/image3.png', pinners: [] },
        { creator: 'l-amy', username: 'amy', category: 'C2', title: 'T4', text: 'Text4', url: 'http://example.com/image4.png', pinners: [] },
        { creator: 'l-bob', username: 'bob', category: 'C3', title: 'T5', text: 'Text5', url: 'http://example.com/image5.png', pinners: [] },
        { creator: 'l-bob', username: 'bob', category: 'C3', title: 'T6', text: 'Text6', url: 'http://example.com/image6.png', pinners: [] }
      ];
      return testdb.pins.insert (data, {w:1});
    }).then (result => {
      testdb.pinIds = result.insertedIds;
      return db.init (uri);
    }).then (() => {
      done ();
    }).catch (err => {
      done (err);
    });
  });

  after (function (done) {
    Promise.resolve ().then (() => {
      return db.close ();
    }).then (() => {
      return testdb.db.close ();
    }).then (() => {
      done ();
    }).catch (err => {
      done (err);
    });
  });

  describe ('test-user', function () {
    require ('./test-user');
  });
  describe ('test-app', function () {
    require ('./test-app');
  });
});

'use strict';
const mongoClient = require ('mongodb').MongoClient;
const server = require ('../../dist/server');
const db = require ('../../dist/db');

const port = 3999;
const url = `http://localhost:${port}/`;
exports.url = url;

const dbURI = 'mongodb://localhost:27017/pinsterTest';

before (function (done) {
  Promise.resolve ().then (() => {
    return resetDatabase ();
  }).then (() => {
    return db.init (dbURI);
  }).then (() => {
    return db.insertLocalUser ('amy', 'test');
  }).then (() => {
    let data = [
      { creator: 'l-amy', username: 'amy', category: 'Aa', title: 'Aaa', url: 'http://example.com/image1.png', text: '1', pinners: ['l-amy'] },
      { creator: 'l-amy', username: 'amy', category: 'Bb', title: 'Bbb', url: 'http://example.com/image2.png', text: '2', pinners: ['l-amy'] },
      { creator: 'l-amy', username: 'amy', category: 'Cc', title: 'Ccc', url: 'http://example.com/image3.png', text: '3', pinners: ['l-amy'] },
      { creator: 'l-amy', username: 'amy', category: 'Dd', title: 'Ddd', url: 'http://example.com/image4.png', text: '4', pinners: ['l-amy'] },
      { creator: 'l-bob', username: 'amy', category: 'Ee', title: 'Eee', url: 'http://example.com/image5.png', text: '5', pinners: ['l-bob'] },
      { creator: 'l-bob', username: 'amy', category: 'Ff', title: 'Fff', url: 'http://example.com/image6.png', text: '6', pinners: ['l-bob'] },
    ];
    return db.insertPin (data);
  }).then (() => {
    return db.close ();
  }).then (() => {
    return server.start (port, dbURI);
  }).then (() => {
    done ();
  }).catch (err => {
    done (err);
  });
});

function resetDatabase () {
  return new Promise ((resolve, reject) => {
    Promise.resolve ().then (() => {
      return mongoClient.connect (dbURI);
    }).then (instance => {
      let db = instance;
      let users = db.collection ('users');
      users.ensureIndex ({id: 1}, {unique: true})
      .then (() => {
        return users.remove ({});
      }).then (() => {
        let pins = db.collection ('pins');
        pins.ensureIndex ({creator: 1}, {unique: false})
        .then (() => {
          return pins.remove ({});
        }).then (() => {
          resolve ();
        });
      });
    }).catch (err => {
      reject (err);
    });
  });
}

describe ('test-main', function () {
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

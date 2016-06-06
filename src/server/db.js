'use strict';
const mongoClient = require ('mongodb').MongoClient;
const ObjectId = require ('mongodb').ObjectId;
const hash = require ('./hash');

let db = null;
let users = null;
let pins = null;

// connect to database and set up collections
function init (uri) {
  console.log ('db.init');
  return new Promise ((resolve, reject) => {
    if (db === null) {
      mongoClient.connect (uri, (err, instance) => {
        if (err) {
          console.log ('init err:', err);
          return reject (err);
        }
        db = instance;
        Promise.resolve ().then (() => {
          users = db.collection ('users');
          return users.ensureIndex ({id: 1}, {unique: true});
        }).then (() => {
          pins = db.collection ('pins');
          return pins.ensureIndex ({creator: 1}, {unique: false});
        }).then (() => {
          resolve ();
        }).catch (err => {
          reject (err);
        });
      });
    } else {
      resolve ();
    }
  });
}

// Close database and null out references
function close () {
  return new Promise ((resolve, reject) => {
    if (db) {
      users = null;
      pins = null;
      Promise.resolve ().then (() => {
        return db.close ();
      }).then (() => {
        db = null;
        resolve ();
      }).catch (() => {
        db = null;
        resolve ();
      });
    } else {
      resolve ();
    }
  });
}

// Find single user by id
function findUser (id) {
  return users.findOne ({id: id});
}

// Insert single user with base data. Additional information through profile.
function insertLocalUser (username, password) {
  return new Promise ((resolve, reject) => {
    Promise.resolve ().then (() => {
      return findUser ('l-' + username);
    }).then (result => {
      if (result !== null) {
        return reject (new Error ('User already exists'));
      }
      let userHash = hash.create (password);
      let user = {
        id: 'l-' + username,
        username: username,
        hash: userHash.hash,
        salt: userHash.salt
      };
      return users.insert (user, {w:1});
    }).then (result => {
      resolve (result);
    }).catch (err => {
      reject (err);
    });
  });
}

function insertSocialUser (user) {
  return users.insert (user, {w:1});
}


// remove user
function removeUser (id) {
  return users.remove ({ id: id });
}

// get all pins
function getPins () {
  return pins.find ().toArray ();
}

// get pins by creator
function getPinsByCreator (creator) {
  return pins.find ({creator: creator}).toArray ();
}

// get a single pin
function getPin (_id) {
  return pins.findOne ({ _id: new ObjectId (_id) });
}

// insert a pin
function insertPin (newPin) {
  return pins.insert (newPin, {w:1});
}

// update a pin
function updatePin (_id, category, title, text, url) {
  return pins.update (
    { _id: new ObjectId (_id) },
    { $set: {
      category: category,
      title: title,
      text: text,
      url: url
    }}
  );
}

// remove a pin
function removePin (_id) {
  return pins.remove ({ _id: new ObjectId (_id) });
}

// add user to list of pinners
function setPinner (_id, id, value) {
  if (value) {
    return pins.update (
      { _id: new ObjectId (_id) },
      { $addToSet: { pinners: id } }
    );
  } else {
    return pins.update (
      { _id: new ObjectId (_id) },
      { $pull: { pinners: id } }
    );
  }
}

// get list of pinners
function getPinners (_id) {
  return new Promise ((resolve, reject) => {
    Promise.resolve ().then (() => {
      return pins.findOne ({_id: new ObjectId (_id) });
    }).then (result => {
      resolve ((result) ? result.pinners : []);
    }).catch (err => {
      reject (err);
    });
  });
}

exports.init = init;
exports.close = close;
exports.findUser = findUser;
exports.insertLocalUser = insertLocalUser;
exports.insertSocialUser = insertSocialUser;
exports.removeUser = removeUser;
exports.getPins = getPins;
exports.getPin = getPin;
exports.getPinsByCreator = getPinsByCreator;
exports.insertPin = insertPin;
exports.updatePin = updatePin;
exports.removePin = removePin;
exports.setPinner = setPinner;
exports.getPinners = getPinners;

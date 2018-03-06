const MongoClient = require ('mongodb').MongoClient;
const ObjectId = require ('mongodb').ObjectId;
const hash = require ('./hash');

let db = null;
let users = null;
let pins = null;

// connect to database and set up collections
async function init (uri) {
  console.log ('INFO db.init');
  if (db) { return; }

  try {
    db = await MongoClient.connect (uri);
    users = db.collection ('users');
    pins = db.collection ('pins');
    await users.ensureIndex ({ id: 1 }, { unique: true });
    await pins.ensureIndex ({ creator: 1 }, { unique: false });
  } catch (err) {
    console.log ('ERROR db.init', err);
    throw err;
  }
}

// Close database and null out references
async function close () {
  if (db) {
    try {
      users = null;
      pins = null;
      await db.close ();
      db = null;
    } catch (err) {
      db = null;
    }
  }
}

function getCollection (name) {
  const collections = { users, pins };
  return collections[name];
}

// Find single user by id
function findUser (id) {
  return users.findOne ({ id });
}

// Insert single user with base data. Additional information through profile.
async function insertLocalUser (username, password) {
  const existing = await findUser (`l-${username}`);
  if (existing) {
    throw new Error ('User already exists');
  }
  const userHash = hash.create (password);
  const user = {
    id: `l-${username}`,
    username,
    hash: userHash.hash,
    salt: userHash.salt,
  };
  return users.insert (user, { w: 1 });
}

function insertSocialUser (user) {
  return users.insert (user, { w: 1 });
}


// remove user
function removeUser (id) {
  return users.remove ({ id });
}

// get all pins
function getPins () {
  return pins.find ().toArray ();
}

// get pins by creator
function getPinsByCreator (creator) {
  return pins.find ({ creator }).toArray ();
}

// get a single pin
function getPin (_id) {
  return pins.findOne ({ _id: new ObjectId (_id) });
}

// insert a pin
function insertPin (newPin) {
  return pins.insert (newPin, { w: 1 });
}

// update a pin
function updatePin (_id, category, title, text, url) {
  return pins.update (
    { _id: new ObjectId (_id) },
    { $set: { category, title, text, url } }
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
async function getPinners (_id) {
  const data = await pins.findOne ({ _id: new ObjectId (_id) });
  return data ? data.pinners : [];
}

exports.init = init;
exports.close = close;
exports.getCollection = getCollection;
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

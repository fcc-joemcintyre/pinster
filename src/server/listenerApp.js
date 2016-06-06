'use strict';
const db = require ('./db');

// Initialize listeners (currently empty)
function init () {
}

function createPin (req, res) {
  console.log ('createPin', req.body.category, req.body.title, req.body.text, req.body.url);
  let pin = {
    creator: req.user.id,
    username: req.user.username,
    category: req.body.category,
    title: req.body.title,
    text: req.body.text,
    url: req.body.url,
    pinners: [req.user.id]
  };
  Promise.resolve ().then (() => {
    return db.insertPin (pin);
  }).then (() => {
    pin.count = 1;
    pin.pinned = true;
    delete pin.pinners;
    res.status (200).json (pin);
  }).catch (err => {
    console.log ('  error', err);
    res.status (500).json ({});
  });
}

function updatePin (req, res) {
  console.log ('updatePin', req.params._id, req.body.category, req.body.title, req.body.text, req.body.url);
  Promise.resolve ().then (() => {
    return db.updatePin (req.params._id, req.body.category, req.body.title, req.body.text, req.body.url);
  }).then (() => {
    return db.getPin (req.params._id);
  }).then (pin => {
    pin.count = pin.pinners.length;
    pin.pinned = true;
    delete pin.pinners;
    res.status (200).json (pin);
  }).catch (err => {
    console.log ('  error', err);
    res.status (500).json ({});
  });
}

function deletePin (req, res) {
  console.log ('deletePin', req.params._id);
  Promise.resolve ().then (() => {
    return db.removePin (req.params._id);
  }).then (() => {
    res.status (200).json ({});
  }).catch (err => {
    console.log ('  error', err);
    res.status (500).json ({});
  });
}

function getPin (req, res) {
  console.log ('getPin');
  Promise.resolve ().then (() => {
    return db.getPin (req.params._id);
  }).then (pin => {
    if (pin === null) {
      res.status (404).json ({});
    } else {
      pin.count = pin.pinners.length;
      pin.pinned = false;
      if (req.user && req.user.id) {
        if (pin.pinners.indexOf (req.user.id) !== -1) {
          pin.pinned = true;
        }
      }
      delete pin.pinners;
      res.status (200).json (pin);
    }
  }).catch (err => {
    console.log (err);
    res.status (500).json ({});
  });
}

function getPins (req, res) {
  console.log ('getPins', req.query.id);
  Promise.resolve ().then (() => {
    if ((req.query) && (req.query.id)) {
      return db.getPinsByCreator (req.query.id);
    } else {
      return db.getPins ();
    }
  }).then (pins => {
    for (let pin of pins) {
      pin.count = pin.pinners.length;
      pin.pinned = false;
      if (req.user && req.user.id) {
        if (pin.pinners.indexOf (req.user.id) !== -1) {
          pin.pinned = true;
        }
      }
      delete pin.pinners;
    }
    res.status (200).json (pins);
  }).catch (err => {
    console.log ('  err', err);
    res.status (500).json ({});
  });
}

// get list of pins that the authenticated user has pinned
function getPinned (req, res) {
  console.log ('getPinned', req.params);
  Promise.resolve ().then (() => {
    return db.getPins ();
  }).then (pins => {
    let list = [];
    for (let pin of pins) {
      if (pin.pinners.indexOf (req.user.id) !== -1) {
        list.push (pin._id);
      }
    }
    res.status (200).json (list);
  }).catch (err => {
    console.log ('  err', err);
    res.status (500).json ({});
  });
}

// add or remove the authenticated user from list of pinned users for a pin
function setPinned (req, res) {
  console.log ('setPinned', req.params, req.user.id);
  let _id = req.params._id;
  let pinned = req.params.value === 'true';

  Promise.resolve ().then (() => {
    return db.getPin (_id);
  }).then (pin => {
    if (pin === null) {
      res.status (404).json ({});
    } else {
      // if creator, pinned value is always true
      if (pin.creator === req.user.id) {
        pinned = true;
      }
      Promise.resolve ().then (() => {
        return db.setPinner (_id, req.user.id, pinned);
      }).then (() => {
        return db.getPinners (_id);
      }).then ((list) => {
        console.log (list);
        res.status (200).json ({ _id: _id, count: list.length, pinned: pinned });
      });
    }
  }).catch ((err) => {
    console.log ('  err', err);
    res.status (500).json ({});
  });
}

exports.init = init;
exports.createPin = createPin;
exports.updatePin = updatePin;
exports.deletePin = deletePin;
exports.getPin = getPin;
exports.getPins = getPins;
exports.getPinned = getPinned;
exports.setPinned = setPinned;

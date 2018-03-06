const db = require ('./db');

// Initialize listeners (currently empty)
function init () {
  // empty
}

async function createPin (req, res) {
  console.log ('createPin', req.body.category, req.body.title, req.body.text, req.body.url);
  const pin = {
    creator: req.user.id,
    username: req.user.username,
    category: req.body.category,
    title: req.body.title,
    text: req.body.text,
    url: req.body.url,
    pinners: [req.user.id],
  };
  try {
    await db.insertPin (pin);
    pin.count = 1;
    pin.pinned = true;
    delete pin.pinners;
    res.status (200).json (pin);
  } catch (err) {
    console.log ('  error', err);
    res.status (500).json ({});
  }
}

async function updatePin (req, res) {
  console.log ('updatePin', req.params._id, req.body.category, req.body.title, req.body.text, req.body.url);
  try {
    await db.updatePin (req.params._id, req.body.category, req.body.title, req.body.text, req.body.url);
    const pin = await db.getPin (req.params._id);
    pin.count = pin.pinners.length;
    pin.pinned = true;
    delete pin.pinners;
    res.status (200).json (pin);
  } catch (err) {
    console.log ('  error', err);
    res.status (500).json ({});
  }
}

async function deletePin (req, res) {
  console.log ('deletePin', req.params._id);
  try {
    await db.removePin (req.params._id);
    res.status (200).json ({});
  } catch (err) {
    console.log ('  error', err);
    res.status (500).json ({});
  }
}

async function getPin (req, res) {
  console.log ('getPin');
  try {
    const pin = await db.getPin (req.params._id);
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
  } catch (err) {
    console.log (err);
    res.status (500).json ({});
  }
}

async function getPins (req, res) {
  console.log ('getPins', req.query.id);
  try {
    let pins;
    if ((req.query) && (req.query.id)) {
      pins = await db.getPinsByCreator (req.query.id);
    } else {
      pins = await db.getPins ();
    }
    for (const pin of pins) {
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
  } catch (err) {
    console.log ('  err', err);
    res.status (500).json ({});
  }
}

// get list of pins that the authenticated user has pinned
async function getPinned (req, res) {
  console.log ('getPinned', req.params);
  try {
    const pins = await db.getPins ();
    const list = [];
    for (const pin of pins) {
      if (pin.pinners.indexOf (req.user.id) !== -1) {
        list.push (pin._id);
      }
    }
    res.status (200).json (list);
  } catch (err) {
    console.log ('  err', err);
    res.status (500).json ({});
  }
}

// add or remove the authenticated user from list of pinned users for a pin
async function setPinned (req, res) {
  console.log ('setPinned', req.params, req.user.id);
  const _id = req.params._id;
  let pinned = req.params.value === 'true';

  try {
    const pin = await db.getPin (_id);
    if (pin === null) {
      res.status (404).json ({});
    } else {
      // if creator, pinned value is always true
      if (pin.creator === req.user.id) {
        pinned = true;
      }
      await db.setPinner (_id, req.user.id, pinned);
      const list = await db.getPinners (_id);
      res.status (200).json ({ _id, count: list.length, pinned });
    }
  } catch (err) {
    console.log ('  err', err);
    res.status (500).json ({});
  }
}

exports.init = init;
exports.createPin = createPin;
exports.updatePin = updatePin;
exports.deletePin = deletePin;
exports.getPin = getPin;
exports.getPins = getPins;
exports.getPinned = getPinned;
exports.setPinned = setPinned;

const { ObjectId } = require ('mongodb');
const db = require ('../../src/db');

describe ('pins', function () {
  describe ('query existing pins', function () {
    it ('all should be found', async function () {
      const result = await db.getPins ();
      if (result.length !== 6) {
        throw new Error ('wrong number found', result.length);
      }
    });
  });

  describe ('query existing pins of a user', function () {
    it ('4 should be found', async function () {
      const result = await db.getPinsByCreator ('l-amy');
      if (result.length !== 4) {
        throw new Error (`wrong number found ${result.length}`);
      }
    });
  });

  describe ('query pins of non-existing id', function () {
    it ('should not be found', async function () {
      const result = await db.getPinsByCreator ('not-a-valid-id');
      if (result.length > 0) {
        throw new Error ('pins with invalid id found');
      }
    });
  });

  describe ('add new pin', function () {
    it ('should have inserted count 1', async function () {
      const result = await db.insertPin (
        { creator: 'l-newuser', username: 'newuser', category: '', title: '', text: '', url: '', pinners: [] }
      );
      if (result.acknowledged !== true) {
        throw new Error (`insert failed: ${JSON.stringify (result)}`);
      }
    });
  });
});

describe ('pins', function () {
  let testPinId;
  before (async function () {
    const pins = await db.getCollection ('pins').find ().toArray ();
    if (pins.length === 0) {
      throw new Error ('Pins not initialized');
    }
    testPinId = pins[0]._id.toString ();
  });

  beforeEach (async function () {
    await db.getCollection ('pins').update (
      { _id: new ObjectId (testPinId) },
      { $set: { pinners: [] } }
    );
  });

  describe ('add 1 pinner', function () {
    it ('should show id added to pinners', async function () {
      await db.setPinner (testPinId, 'l-amy', true);
      const pinners = await db.getPinners (testPinId);
      if (pinners.length !== 1) {
        throw new Error (`Wrong number of pinners: ${pinners.length}`);
      }
    });
  });

  describe ('add 2 pinners', function () {
    it ('should show 2 pinners', async function () {
      await db.setPinner (testPinId, 'l-amy', true);
      await db.setPinner (testPinId, 'l-bob', true);
      const pinners = await db.getPinners (testPinId);
      if (pinners.length !== 2) {
        throw new Error (`Wrong number of pinners: ${pinners.length}`);
      }
    });
  });

  describe ('add duplicate pinner', function () {
    it ('should show 1 pinner', async function () {
      await db.setPinner (testPinId, 'l-amy', true);
      await db.setPinner (testPinId, 'l-amy', true);
      const pinners = await db.getPinners (testPinId);
      if (pinners.length !== 1) {
        throw new Error (`Wrong number of pinners: ${pinners.length}`);
      }
    });
  });

  describe ('add and remove pinner', function () {
    it ('should show 0 pinners', async function () {
      await db.setPinner (testPinId, 'l-amy', true);
      await db.setPinner (testPinId, 'l-amy', false);
      const pinners = await db.getPinners (testPinId);
      if (pinners.length !== 0) {
        throw new Error (`Wrong number of pinners: ${[pinners].length}`);
      }
    });
  });

  describe ('try to get pinners for invalid _id', function () {
    it ('should return 0 pinners', async function () {
      const pinners = await db.getPinners ('000000000000000000000000');
      if (pinners.length !== 0) {
        throw new Error (`Wrong number of pinners: ${pinners.length}`);
      }
    });
  });
});

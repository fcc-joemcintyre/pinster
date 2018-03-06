const db = require ('../../dist/db');

// mongo URI with port number not an active MongoDB instance
const mongoUri = 'mongodb://localhost:27017/pinsterTest';

describe ('init/close', function () {
  describe ('call init twice', function () {
    it ('should succeed both times', async function () {
      await db.init (mongoUri);
      await db.init (mongoUri);
    });
  });

  describe ('call close twice', function () {
    it ('should succeed both times', async function () {
      await db.close ();
      await db.close ();
    });
  });
});

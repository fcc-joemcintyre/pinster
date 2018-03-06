const db = require ('../../dist/db');

// mongo URI with port number not an active MongoDB instance
const badMongoUri = 'mongodb://localhost:22222/pinsterTest';

describe ('init/close', function () {
  describe ('init', function () {
    it ('should generate an error', async function () {
      try {
        await db.init (badMongoUri);
        throw new Error ('init did not fail with bad URI');
      } catch (err) {
        // test passed
      }
    });
  });

  describe ('close', function () {
    it ('should fail silently', async function () {
      try {
        await db.close ();
      } catch (err) {
        throw new Error ('close should fail silently');
      }
    });
  });
});

describe ('users', function () {
  describe ('findUserByUsername', function () {
    it ('should generate an error', async function () {
      try {
        await db.findUserByUsername ('amy');
        throw new Error ('did not fail with no database connection');
      } catch (err) {
        // test passed
      }
    });
  });

  describe ('insertUser', function () {
    it ('should generate an error', async function () {
      try {
        await db.insertUser ('newuser', 'password');
        throw new Error ('did not fail with no database connection');
      } catch (err) {
        // test passed;
      }
    });
  });

  describe ('removeUser', function () {
    it ('should generate an error', async function () {
      try {
        await db.removeUser ('amy');
        throw new Error ('did not fail with no database connection');
      } catch (err) {
        // test passed;
      }
    });
  });

  describe ('getPins', function () {
    it ('should generate an error', async function () {
      try {
        await db.getPins ();
        throw new Error ('did not fail with no database connection');
      } catch (err) {
        // test passed;
      }
    });
  });

  describe ('getPinsByUsername', function () {
    it ('should generate an error', async function () {
      try {
        await db.getPinsByUsername ('amy');
        throw new Error ('did not fail with no database connection');
      } catch (err) {
        // test passed;
      }
    });
  });

  describe ('getPin', function () {
    it ('should generate an error', async function () {
      try {
        await db.getPin ('1');
        throw new Error ('did not fail with no database connection');
      } catch (err) {
        // test passed;
      }
    });
  });

  describe ('insertPin', function () {
    it ('should generate an error', async function () {
      try {
        await db.insertPin ({ creator: 'amy' });
        throw new Error ('did not fail with no database connection');
      } catch (err) {
        // test passed;
      }
    });
  });

  describe ('setPinner', function () {
    it ('should generate an error', async function () {
      try {
        await db.setPinner ('1', 'amy', true);
        throw new Error ('did not fail with no database connection');
      } catch (err) {
        // test passed;
      }
    });
  });

  describe ('getPinners', function () {
    it ('should generate an error', async function () {
      try {
        await db.getPinners ('1');
        throw new Error ('did not fail with no database connection');
      } catch (err) {
        // test passed;
      }
    });
  });
});

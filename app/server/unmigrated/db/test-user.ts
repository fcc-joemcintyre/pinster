const db = require ('../../src/db');

describe ('users', function () {
  beforeEach (async function () {
    await db.insertLocalUser ('amy', 'test');
  });

  afterEach (async function () {
    await db.removeUser ('l-amy');
  });

  describe ('find amy', function () {
    it ('should be found', async function () {
      const result = await db.findUser ('l-amy');
      if (!result) {
        throw new Error ('not found');
      }
    });
  });

  describe ('find amyy', function () {
    it ('should not be found', async function () {
      const result = await db.findUser ('l-amyy');
      if (result) {
        throw new Error ('should not be found');
      }
    });
  });
});

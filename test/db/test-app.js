'use strict';
const ObjectId = require ('mongodb').ObjectId;
const testdb = require ('./test-main').testdb;
const db = require ('../../dist/db');


describe ('pins', function () {
  describe ('query existing pins', function () {
    it ('all should be found', function (done) {
      Promise.resolve ().then (() => {
        return db.getPins ();
      }).then (result => {
        if (result.length === 6) {
          done ();
        } else {
          done (new Error ('wrong number found', result.length));
        }
      }).catch (err => {
        done (err);
      });
    });
  });

  describe ('query existing pins of a user', function () {
    it ('4 should be found', function (done) {
      Promise.resolve ().then (() => {
        return db.getPinsByCreator ('l-amy');
      }).then (result => {
        if (result.length === 4) {
          done ();
        } else {
          done (new Error (`wrong number found ${result.length}`));
        }
      }).catch (err => {
        done (err);
      });
    });
  });

  describe ('query pins of non-existing id', function () {
    it ('should not be found', function (done) {
      Promise.resolve ().then (() => {
        return db.getPinsByCreator ('not-a-valid-id');
      }).then (result => {
        if (result.length > 0) {
          done (new Error ('pins with invalid id found'));
        } else {
          done ();
        }
      }).catch (err => {
        done (err);
      });
    });
  });

  describe ('add new pin', function () {
    it ('should have inserted count 1', function (done) {
      Promise.resolve ().then (() => {
        return db.insertPin ({ creator: 'l-newuser', username: 'newuser', category: '', title:'', text: '', url: '', pinners: [] });
      }).then (result => {
        if (result.insertedCount === 1) {
          done ();
        } else {
          done (new Error (`insert failed: ${JSON.stringify (result)}`));
        }
      }).catch (err => {
        done (err);
      });
    });
  });
});

describe ('pins', function () {
  beforeEach (function (done) {
    Promise.resolve ().then (() => {
      return testdb.pins.update (
        { _id: new ObjectId (testdb.pinIds[0]) },
        { $set: { pinners: [] } }
      );
    }).then (() => {
      done ();
    }).catch (err => {
      done (err);
    });
  });

  describe ('add 1 pinner', function () {
    it ('should show id added to pinners', function (done) {
      Promise.resolve ().then (() => {
        return db.setPinner (testdb.pinIds[0], 'l-amy', true);
      }).then (() => {
        return db.getPinners (testdb.pinIds[0]);
      }).then (pinners => {
        if (pinners.length !== 1) {
          return done (new Error (`Wrong number of pinners: ${pinners.length}`));
        }
        done ();
      }).catch (err => {
        done (err);
      });
    });
  });

  describe ('add 2 pinners', function () {
    it ('should show 2 pinners', function (done) {
      Promise.resolve ().then (() => {
        return db.setPinner (testdb.pinIds[0], 'l-amy', true);
      }).then (() => {
        return db.setPinner (testdb.pinIds[0], 'l-bob', true);
      }).then (() => {
        return db.getPinners (testdb.pinIds[0]);
      }).then (pinners => {
        if (pinners.length !== 2) {
          return done (new Error (`Wrong number of pinners: ${pinners.length}`));
        }
        done ();
      }).catch (err => {
        done (err);
      });
    });
  });

  describe ('add duplicate pinner', function () {
    it ('should show 1 pinner', function (done) {
      Promise.resolve ().then (() => {
        return db.setPinner (testdb.pinIds[0], 'l-amy', true);
      }).then (() => {
        return db.setPinner (testdb.pinIds[0], 'l-amy', true);
      }).then (() => {
        return db.getPinners (testdb.pinIds[0]);
      }).then (pinners => {
        if (pinners.length !== 1) {
          return done (new Error (`Wrong number of pinners: ${pinners.length}`));
        }
        done ();
      }).catch (err => {
        done (err);
      });
    });
  });

  describe ('add and remove pinner', function () {
    it ('should show 0 pinners', function (done) {
      Promise.resolve ().then (() => {
        return db.setPinner (testdb.pinIds[0], 'l-amy', true);
      }).then (() => {
        return db.setPinner (testdb.pinIds[0], 'l-amy', false);
      }).then (() => {
        return db.getPinners (testdb.pinIds[0]);
      }).then (pinners => {
        if (pinners.length !== 0) {
          return done (new Error (`Wrong number of pinners: ${[pinners].length}`));
        }
        done ();
      }).catch (err => {
        done (err);
      });
    });
  });

  describe ('try to get pinners for invalid _id', function () {
    it ('should return 0 pinners', function (done) {
      Promise.resolve ().then (() => {
        return db.getPinners ('000000000000000000000000');
      }).then (pinners => {
        if (pinners.length !== 0) {
          return done (new Error (`Wrong number of pinners: ${pinners.length}`));
        }
        done ();
      }).catch (err => {
        done (err);
      });
    });
  });
});

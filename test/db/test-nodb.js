'use strict';
const db = require ('../../dist/db');

// mongo URI with port number not an active MongoDB instance
let badMongoUri = 'mongodb://localhost:22222/pinsterTest';

describe ('init/close', function () {
  describe ('init', function () {
    it ('should generate an error', function (done) {
      Promise.resolve ().then (() => {
        return db.init (badMongoUri);
      }).then (() => {
        done (new Error ('init did not fail with bad URI'));
      }).catch (() => {
        done ();
      });
    });
  });

  describe ('close', function () {
    it ('should fail silently', function (done) {
      Promise.resolve ().then (() => {
        return db.close ();
      }).then (() => {
        done ();
      }).catch (() => {
        done (new Error ('close should fail silently'));
      });
    });
  });
});

describe ('users', function () {
  describe ('findUserByUsername', function () {
    it ('should generate an error', function (done) {
      Promise.resolve ().then (() => {
        return db.findUserByUsername ('amy');
      }).then (() => {
        done (new Error ('did not fail with no database connection'));
      }).catch (() => {
        done ();
      });
    });
  });

  describe ('insertUser', function () {
    it ('should generate an error', function (done) {
      Promise.resolve ().then (() => {
        return db.insertUser ('newuser', 'password');
      }).then (() => {
        done (new Error ('did not fail with no database connection'));
      }).catch (() => {
        done ();
      });
    });
  });

  describe ('removeUser', function () {
    it ('should generate an error', function (done) {
      Promise.resolve ().then (() => {
        return db.removeUser ('amy');
      }).then (() => {
        done (new Error ('did not fail with no database connection'));
      }).catch (() => {
        done ();
      });
    });
  });

  describe ('getPins', function () {
    it ('should generate an error', function (done) {
      Promise.resolve ().then (() => {
        return db.getPins ();
      }).then (() => {
        done (new Error ('did not fail with no database connection'));
      }).catch (() => {
        done ();
      });
    });
  });

  describe ('getPinsByUsername', function () {
    it ('should generate an error', function (done) {
      Promise.resolve ().then (() => {
        return db.getPinsByUsername ('amy');
      }).then (() => {
        done (new Error ('did not fail with no database connection'));
      }).catch (() => {
        done ();
      });
    });
  });

  describe ('getPin', function () {
    it ('should generate an error', function (done) {
      Promise.resolve ().then (() => {
        return db.getPin ('1');
      }).then (() => {
        done (new Error ('did not fail with no database connection'));
      }).catch (() => {
        done ();
      });
    });
  });

  describe ('insertPin', function () {
    it ('should generate an error', function (done) {
      Promise.resolve ().then (() => {
        return db.insertPin ({creator: 'amy'});
      }).then (() => {
        done (new Error ('did not fail with no database connection'));
      }).catch (() => {
        done ();
      });
    });
  });

  describe ('setPinner', function () {
    it ('should generate an error', function (done) {
      Promise.resolve ().then (() => {
        return db.setPinner ('1', 'amy', true);
      }).then (() => {
        done (new Error ('did not fail with no database connection'));
      }).catch (() => {
        done ();
      });
    });
  });

  describe ('getPinners', function () {
    it ('should generate an error', function (done) {
      Promise.resolve ().then (() => {
        return db.getPinners ('1');
      }).then (() => {
        done (new Error ('did not fail with no database connection'));
      }).catch (() => {
        done ();
      });
    });
  });
});

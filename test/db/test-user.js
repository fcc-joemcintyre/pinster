'use strict';
const db = require ('../../dist/db');

describe ('users', function () {
  beforeEach (function (done) {
    Promise.resolve ().then (() => {
      return db.insertLocalUser ('amy', 'test');
    }).then (() => { done ();
    }).catch (err => { done (err); });
  });

  afterEach (function (done) {
    Promise.resolve ().then (() => {
      return db.removeUser ('l-amy');
    }).then (() => { done ();
    }).catch (err => { done (err); });
  });

  describe ('find amy', function () {
    it ('should be found', function (done) {
      Promise.resolve ().then (() => {
        return db.findUser ('l-amy');
      }).then (result => {
        if (result) {
          done ();
        } else {
          done (new Error ('not found'));
        }
      }).catch (err => { done (err); });
    });
  });

  describe ('find amyy', function () {
    it ('should not be found', function (done) {
      Promise.resolve ().then (() => {
        return db.findUser ('l-amyy');
      }).then (result => {
        if (result) {
          done (new Error ('should not be found'));
        } else {
          done ();
        }
      }).catch (err => { done (err); });
    });
  });
});

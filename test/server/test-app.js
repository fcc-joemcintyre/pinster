'use strict';
const request = require ('request');
const baseUrl = require ('./test-main').url;

let amyPinId, bobPinId;
before (function (done) {
  request.get (`${baseUrl}api/pins`, (err, res, body) => {
    if (err) { return done (err); }
    let pins = JSON.parse (body);
    for (let pin of pins) {
      if (pin.creator === 'l-amy') {
        amyPinId = pin._id;
      } else {
        bobPinId = pin._id;
      }
    }
    done ();
  });
});

describe ('unauthenticated', function () {
  describe ('valid search all request', function () {
    it ('should return list', function (done) {
      let url = `${baseUrl}api/pins`;
      request.get ({url: url}, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          let pins = JSON.parse (body);
          if (pins.length === 6) {
            if (pins[3].pinners) {
              return done (new Error (`pinners not removed from pin ${JSON.stringify (pins[3])}`));
            }
            if ((pins[3].pinned === undefined) || (pins[3].count === undefined)) {
              return done (new Error (`missing derived fields in pin ${JSON.stringify (pins[3])}`));
            }
            return done ();
          } else {
            return done (new Error (`wrong number of pins: ${pins.length}`));
          }
        }
        return done (new Error (`Invalid status code ${res.statusCode}`));
      });
    });
  });

  describe ('valid search request (specific user)', function () {
    it ('should return list', function (done) {
      let url = `${baseUrl}api/pins?id=l-amy`;
      request.get ({url: url}, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          let pins = JSON.parse (body);
          if (pins.length === 4) {
            if (pins[3].pinners) {
              return done (new Error (`pinners not removed from pin ${JSON.stringify (pins[3])}`));
            }
            if ((pins[3].pinned === undefined) || (pins[3].count === undefined)) {
              return done (new Error (`missing derived fields in pin ${JSON.stringify (pins[3])}`));
            }
            return done ();
          } else {
            return done (new Error ('wrong number of pins: ', pins.length));
          }
        }
        return done (new Error (`Invalid status code ${res.statusCode}`));
      });
    });
  });

  describe ('valid search request (specific pin)', function () {
    it ('should return list', function (done) {
      let url = `${baseUrl}api/pins/${amyPinId}`;
      request.get ({url: url}, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
        let pin = JSON.parse (body);
          if (pin.pinners) {
            return done (new Error (`pinners not removed from pin ${JSON.stringify (pin)}`));
          }
          if ((pin.pinned === undefined) || (pin.count === undefined)) {
            return done (new Error (`missing derived fields in pin ${JSON.stringify (pin)}`));
          }
          return done ();
        }
        return done (new Error (`Invalid status code ${res.statusCode}`));
      });
    });
  });

  describe ('invalid search request (specific pin)', function () {
    it ('should return list', function (done) {
      let url = `${baseUrl}api/pins/000000000000000000000000`;
      request.get ({url: url}, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 404) {
          return done ();
        } else {
          return done (new Error (`Invalid status code ${res.statusCode}`));
        }
      });
    });
  });

  describe ('add pin', function () {
    it ('should fail (unauthenticated)', function (done) {
      let url = `${baseUrl}api/pins`;
      let data = { category: 'Gg', title: 'Ggg', url: 'http://example.com/image10.png', text: '10' };
      request.post ({url: url, json: data}, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 401) {
          return done ();
        } else {
          return done (new Error (`Invalid status code ${res.statusCode}`));
        }
      });
    });
  });
});

describe ('authenticated', function () {
  let cookie;
  before (function (done) {
    let form = { form: {username:'amy', password:'test'}};
    request.post (`${baseUrl}api/login`, form, (err, res, body) => {
      if (err) { return done (err); }
      if (res.statusCode === 200) {
        cookie = res.headers['set-cookie'][0];
        return done ();
      }
      return done (new Error (`Invalid status code ${res.statusCode}`));
    });
  });

  after (function (done) {
    request.post (`${baseUrl}api/logout`, (err, res, body) => {
      done ();
    });
  });

  describe ('valid search all request', function () {
    it ('should return list', function (done) {
      let jar = request.jar ();
      jar.setCookie (cookie, 'http://localhost:3000');
      let url = `${baseUrl}api/pins`;
      request.get ({url: url, jar: jar}, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          let pins = JSON.parse (body);
          if (pins.length === 6) {
            if (pins[3].pinners) {
              return done (new Error (`pinners not removed from pin ${JSON.stringify (pins[3])}`));
            }
            if ((pins[3].pinned === undefined) || (pins[3].count === undefined)) {
              return done (new Error (`missing derived fields in pin ${JSON.stringify (pins[3])}`));
            }
            return done ();
          } else {
            return done (new Error ('wrong number of pins: ', pins.length));
          }
        }
        return done (new Error (`Invalid status code ${res.statusCode}`));
      });
    });
  });

  describe ('valid search request (specific user)', function () {
    it ('should return list', function (done) {
      let jar = request.jar ();
      jar.setCookie (cookie, 'http://localhost:3000');
      let url = `${baseUrl}api/pins?id=l-amy`;
      request.get ({url: url, jar: jar}, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          let pins = JSON.parse (body);
          if (pins.length === 4) {
            if (pins[3].pinners) {
              return done (new Error (`pinners not removed from pin ${JSON.stringify (pins[3])}`));
            }
            if ((pins[3].pinned === undefined) || (pins[3].count === undefined)) {
              return done (new Error (`missing derived fields in pin ${JSON.stringify (pins[3])}`));
            }
            return done ();
          } else {
            return done (new Error ('wrong number of pins: ', pins.length));
          }
        }
        return done (new Error (`Invalid status code ${res.statusCode}`));
      });
    });
  });

  describe ('valid search request (specific pin)', function () {
    it ('should return list', function (done) {
      let jar = request.jar ();
      jar.setCookie (cookie, 'http://localhost:3000');
      let url = `${baseUrl}api/pins/${amyPinId}`;
      request.get ({url: url, jar:jar}, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
        let pin = JSON.parse (body);
          if (pin.pinners) {
            return done (new Error (`pinners not removed from pin ${JSON.stringify (pin)}`));
          }
          if ((pin.pinned === undefined) || (pin.count === undefined)) {
            return done (new Error (`missing derived fields in pin ${JSON.stringify (pin)}`));
          }
          return done ();
        }
        return done (new Error (`Invalid status code ${res.statusCode}`));
      });
    });
  });

  describe ('invalid search request (specific pin)', function () {
    it ('should return list', function (done) {
      let jar = request.jar ();
      jar.setCookie (cookie, 'http://localhost:3000');
      let url = `${baseUrl}api/pins/000000000000000000000000`;
      request.get ({url: url, jar:jar}, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 404) {
          return done ();
        } else {
          return done (new Error (`Invalid status code ${res.statusCode}`));
        }
      });
    });
  });

  describe ('add pin', function () {
    it ('should succeed', function (done) {
      let jar = request.jar ();
      jar.setCookie (cookie, 'http://localhost:3000');
      let url = `${baseUrl}api/pins`;
      let data = { category: 'Gg', title: 'Ggg', url: 'http://example.com/image10.png', text: '10' };
      request.post ({url: url, jar:jar, json: data}, (err, res, pin) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          if (pin && (pin.count === 1)) {
            return done ();
          } else {
            return done (new Error (`Invalid response content ${JSON.stringify (pin)}`));
          }
        } else {
          return done (new Error (`Invalid status code ${res.statusCode}`));
        }
      });
    });
  });

  // pin by amy for pin created by bob to check increment
  // and calling a second time leaves count at 2
  describe ('pin', function () {
    it ('should increment pins count (to 2)', function (done) {
      let jar = request.jar ();
      jar.setCookie (cookie, 'http://localhost:3000');
      let url = `${baseUrl}api/pins/${bobPinId}/pin/true`;
      request.post ({url: url, jar: jar}, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          let result = JSON.parse (body);
          if (result.count === 2) {
            request.post ({url: url, jar: jar}, (err, res, body) => {
              if (err) { return done (err); }
              if (res.statusCode === 200) {
                let result = JSON.parse (body);
                if (result.count === 2) {
                  return done ();
                } else {
                  return done (new Error (`(Second) Invalid pin count ${result.count}`));
                }
              }
              return done (new Error (`(Second) Invalid status code ${res.statusCode}`));
            });
          } else {
            return done (new Error (`(First) Invalid pin count ${result.count}`));
          }
        } else {
          return done (new Error (`(First) Invalid status code ${res.statusCode}`));
        }
      });
    });
  });

  // pin by amy for pin created by amy to verify not duplicating pin
  describe ('pin (already pinned)', function () {
    it ('should not increase pin count (1)', function (done) {
      let jar = request.jar ();
      jar.setCookie (cookie, 'http://localhost:3000');
      let url = `${baseUrl}api/pins/${amyPinId}/pin/true`;
      request.post ({url: url, jar: jar}, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          let result = JSON.parse (body);
          if (result.count === 1) {
            return done ();
          } else {
            return done (new Error (`Invalid pin count ${result.count}`));
          }
        }
        return done (new Error (`Invalid status code ${res.statusCode}`));
      });
    });
  });

  // unpinning bob's pin should result in count of 1 (just bob)
  describe ('unpin', function () {
    it ('should decrement pin count (to 1)', function (done) {
      let jar = request.jar ();
      jar.setCookie (cookie, 'http://localhost:3000');
      let url = `${baseUrl}api/pins/${bobPinId}/pin/false`;
      request.post ({url: url, jar: jar}, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          let result = JSON.parse (body);
          if (result.count === 1) {
            return done ();
          } else {
            return done (new Error (`Invalid pin count ${result.count}`));
          }
        }
        return done (new Error (`Invalid status code ${res.statusCode}`));
      });
    });
  });

  // unpinning own pin should not reduce pin count
  describe ('unpin (not pinned)', function () {
    it ('should not decrease pin count (1)', function (done) {
      let jar = request.jar ();
      jar.setCookie (cookie, 'http://localhost:3000');
      let url = `${baseUrl}api/pins/${amyPinId}/pin/false`;
      request.post ({url: url, jar: jar}, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          let result = JSON.parse (body);
          if (result.count === 1) {
            return done ();
          } else {
            return done (new Error (`Invalid pin count ${result.count}`));
          }
        }
        return done (new Error (`Invalid status code ${res.statusCode}`));
      });
    });
  });

  describe ('pin (_id does not exist)', function () {
    it ('should receive 404 response', function (done) {
      let jar = request.jar ();
      jar.setCookie (cookie, 'http://localhost:3000');
      let url = `${baseUrl}api/pins/000000000000000000000000/pin/false`;
      request.post ({url: url, jar: jar}, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 404) {
          return done ();
        }
        return done (new Error (`Invalid status code ${res.statusCode}`));
      });
    });
  });

  describe ('get list of pins user has pinned', function () {
    it ('should receive array of pins (5)', function (done) {
      let jar = request.jar ();
      jar.setCookie (cookie, 'http://localhost:3000');
      let url = `${baseUrl}api/pinned`;
      request.get ({url: url, jar: jar}, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          body = JSON.parse (body);
          if (body.length === 5) {
            return done ();
          } else {
            return done (new Error (`Invalid number of pinned ${body.length}`));
          }
        }
        return done (new Error (`Invalid status code ${res.statusCode}`));
      });
    });
  });

  describe ('update pin', function () {
    it ('should contain updated data', function (done) {
      let jar = request.jar ();
      jar.setCookie (cookie, 'http://localhost:3000');
      let url = `${baseUrl}api/pins/${amyPinId}`;
      let data = {
        category: 'UCategory',
        title: 'UTitle',
        text: 'UText',
        url: 'http://u.u/u.png'
      };
      request.post ({url: url, jar: jar, json: data}, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          request.get (`${baseUrl}api/pins/${amyPinId}`, (err, res, body) => {
            if (err) { return done (err); }
            if (res.statusCode === 200) {
              body = JSON.parse (body);
              if ((body.category === 'UCategory') && (body.title === 'UTitle') &&
                  (body.text === 'UText') && (body.url === 'http://u.u/u.png')) {
                return done ();
              } else {
                return done (new Error (`Invalid update ${JSON.stringify (body)}`));
              }
            } else {
              return done (new Error (`(Second) Invalid status code ${res.statusCode}`));
            }
          });
        } else {
          return done (new Error (`(First) Invalid status code ${res.statusCode}`));
        }
      });
    });
  });

  describe ('delete pin', function () {
    it ('should remove pin from database', function (done) {
      let jar = request.jar ();
      jar.setCookie (cookie, 'http://localhost:3000');
      let url = `${baseUrl}api/pins/${amyPinId}`;
      request.del ({url: url, jar: jar}, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          request.get (`${baseUrl}api/pins/${amyPinId}`, (err, res, body) => {
            if (err) { return done (err); }
            if (res.statusCode === 404) {
              return done ();
            } else {
              return done (new Error (`(Second) Invalid status code ${res.statusCode}`));
            }
          });
        } else {
          return done (new Error (`(First) Invalid status code ${res.statusCode}`));
        }
      });
    });
  });
});

describe ('REST call validation', function () {
  describe ('invalid REST URL', function () {
    it ('should fail with 404', function (done) {
      request.get (`${baseUrl}api/invalid`, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 404) {
          return done ();
        }
        return done (new Error (`Invalid statusCode ${res.statusCode}`));
      });
    });
  });
});

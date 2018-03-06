const db = require ('../../dist/db');
const jsonFetch = require ('../util/jsonFetch');

let amyPinId;
let bobPinId;
before (async function () {
  const pins = await db.getCollection ('pins').find ().toArray ();
  for (const pin of pins) {
    if (pin.creator === 'l-amy') {
      amyPinId = pin._id.toString ();
    } else {
      bobPinId = pin._id.toString ();
    }
  }
  if (! amyPinId) {
    throw new Error ('No pin for l-amy');
  }
  if (! bobPinId) {
    throw new Error ('No pin for l-bob');
  }
});

describe ('unauthenticated', function () {
  describe ('valid search all request', function () {
    it ('should return list', async function () {
      const pins = await jsonFetch.get ('/api/pins');
      if (pins.length !== 6) {
        throw new Error (`wrong number of pins: ${pins.length}`);
      }
    });
  });

  describe ('valid search request (specific user)', function () {
    it ('should return list', async function () {
      const pins = await jsonFetch.get ('/api/pins?id=l-amy');
      if (pins.length !== 4) {
        throw new Error ('wrong number of pins: ', pins.length);
      }
    });
  });

  describe ('valid search request (specific pin)', function () {
    it ('should return list', async function () {
      const pin = await jsonFetch.get (`/api/pins/${amyPinId}`);
      if (! pin) {
        throw new Error ('pin not found:', amyPinId);
      }
    });
  });

  describe ('invalid search request (specific pin)', function () {
    it ('should return 404', async function () {
      try {
        await jsonFetch.get ('/api/pins/000000000000000000000000');
        throw new Error ('error not returned');
      } catch (err) {
        if (err.status !== 404) {
          throw new Error (`Invalid status code ${err.status}`);
        }
      }
    });
  });

  describe ('add pin', function () {
    it ('should fail (unauthenticated)', async function () {
      try {
        const data = { category: 'Gg', title: 'Ggg', url: 'http://example.com/image10.png', text: '10' };
        await jsonFetch.post ('/api/pins', data);
        throw new Error ('error not returned');
      } catch (err) {
        if (err.status !== 401) {
          throw new Error (`Invalid status code ${err.status}`);
        }
      }
    });
  });
});

describe ('authenticated', function () {
  before (async function () {
    const data = { username: 'amy', password: 'test' };
    try {
      await jsonFetch.post ('/api/login', data);
    } catch (err) {
      throw new Error ('login error');
    }
  });

  after (async function () {
    await jsonFetch.post ('/api/logout');
  });

  describe ('valid search all request', function () {
    it ('should return list', async function () {
      const pins = await jsonFetch.get ('/api/pins');
      if (pins.length !== 6) {
        throw new Error ('wrong number of pins: ', pins.length);
      }
    });
  });

  describe ('valid search request (specific user)', function () {
    it ('should return list', async function () {
      const pins = await jsonFetch.get ('/api/pins?id=l-amy');
      if (pins.length !== 4) {
        throw new Error ('wrong number of pins: ', pins.length);
      }
    });
  });

  describe ('valid search request (specific pin)', function () {
    it ('should return list', async function () {
      const pin = await jsonFetch.get (`/api/pins/${amyPinId}`);
      if (! pin) {
        throw new Error ('pin not found:', amyPinId);
      }
    });
  });

  describe ('invalid search request (specific pin)', function () {
    it ('should return list', async function () {
      try {
        await jsonFetch.get ('/api/pins/000000000000000000000000');
        throw new Error ('error not returned');
      } catch (err) {
        if (err.status !== 404) {
          throw new Error (`Invalid status code ${err.status}`);
        }
      }
    });
  });

  describe ('add pin', function () {
    it ('should succeed', async function () {
      try {
        const data = { category: 'Gg', title: 'Ggg', url: 'http://example.com/image10.png', text: '10' };
        const pin = await jsonFetch.post ('/api/pins', data);
        if ((! pin) || (pin.count !== 1)) {
          throw new Error (`Invalid response content ${JSON.stringify (pin)}`);
        }
      } catch (err) {
        throw new Error (`Invalid status code ${err.status}`);
      }
    });
  });

  // pin by amy for pin created by bob to check increment
  // and calling a second time leaves count at 2
  describe ('pin', function () {
    it ('should increment pins count (to 2)', async function () {
      const result1 = await jsonFetch.post (`/api/pins/${bobPinId}/pin/true`);
      if (result1.count === 2) {
        const result2 = await jsonFetch.post (`/api/pins/${bobPinId}/pin/true`);
        if (result2.count !== 2) {
          throw new Error (`(Second) Invalid pin count ${result2.count}`);
        }
      } else {
        throw new Error (`(First) Invalid pin count ${result1.count}`);
      }
    });
  });

  // pin by amy for pin created by amy to verify not duplicating pin
  describe ('pin (already pinned)', function () {
    it ('should not increase pin count (1)', async function () {
      const result = await jsonFetch.post (`/api/pins/${amyPinId}/pin/true`);
      if (result.count !== 1) {
        throw new Error (`Invalid pin count ${result.count}`);
      }
    });
  });

  // unpinning bob's pin should result in count of 1 (just bob)
  describe ('unpin', function () {
    it ('should decrement pin count (to 1)', async function () {
      const result = await jsonFetch.post (`/api/pins/${bobPinId}/pin/false`);
      if (result.count !== 1) {
        throw new Error (`Invalid pin count ${result.count}`);
      }
    });
  });

  // unpinning own pin should not reduce pin count
  describe ('unpin (not pinned)', function () {
    it ('should not decrease pin count (1)', async function () {
      const result = await jsonFetch.post (`/api/pins/${amyPinId}/pin/false`);
      if (result.count !== 1) {
        throw new Error (`Invalid pin count ${result.count}`);
      }
    });
  });

  describe ('pin (_id does not exist)', function () {
    it ('should receive 404 response', async function () {
      try {
        await jsonFetch.post ('/api/pins/000000000000000000000000/pin/false');
        throw new Error ('No error thrown');
      } catch (err) {
        if (err.status !== 404) {
          throw new Error (`Invalid statusCode ${err.status}`);
        }
      }
    });
  });

  describe ('get list of pins user has pinned', function () {
    it ('should receive array of pins (5)', async function () {
      const result = await jsonFetch.get ('/api/pinned');
      if (result.length !== 5) {
        throw new Error (`Invalid number of pinned ${result.length}`);
      }
    });
  });

  describe ('update pin', function () {
    it ('should contain updated data', async function () {
      const data = {
        category: 'UCategory',
        title: 'UTitle',
        text: 'UText',
        url: 'http://u.u/u.png',
      };
      await jsonFetch.post (`/api/pins/${amyPinId}`, data);
      const result = await jsonFetch.get (`/api/pins/${amyPinId}`);
      if ((result.category !== 'UCategory') || (result.title !== 'UTitle') ||
          (result.text !== 'UText') || (result.url !== 'http://u.u/u.png')) {
        throw new Error (`Invalid update ${JSON.stringify (result)}`);
      }
    });
  });

  describe ('delete pin', function () {
    it ('should remove pin from database', async function () {
      await jsonFetch.remove (`/api/pins/${amyPinId}`);
      try {
        await jsonFetch.get (`/api/pins/${amyPinId}`);
        throw new Error ('Error, document should have been deleted');
      } catch (err) {
        if (err.status !== 404) {
          throw new Error (`Invalid statusCode ${err.status}`);
        }
      }
    });
  });
});

describe ('REST call validation', function () {
  describe ('invalid REST URL', function () {
    it ('should fail with 404', async function () {
      try {
        await jsonFetch.get ('/api/invalid');
        throw new Error ('No error thrown');
      } catch (err) {
        if (err.status !== 404) {
          throw new Error (`Invalid statusCode ${err.status}`);
        }
      }
    });
  });
});

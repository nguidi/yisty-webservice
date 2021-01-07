const assert = require('assert');
const app = require('../../src/app');

describe('\'profiles\' service', () => {
  it('registered the service', () => {
    const service = app.service('profiles');

    assert.ok(service, 'Registered the service');
  });
});

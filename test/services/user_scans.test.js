const assert = require('assert');
const app = require('../../src/app');

describe('\'user_scans\' service', () => {
  it('registered the service', () => {
    const service = app.service('user_scans');

    assert.ok(service, 'Registered the service');
  });
});

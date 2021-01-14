const assert = require('assert');
const app = require('../../src/app');

describe('\'affiliate_shops\' service', () => {
  it('registered the service', () => {
    const service = app.service('affiliate_shops');

    assert.ok(service, 'Registered the service');
  });
});

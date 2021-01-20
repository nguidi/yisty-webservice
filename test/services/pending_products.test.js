const assert = require('assert');
const app = require('../../src/app');

describe('\'pending_products\' service', () => {
  it('registered the service', () => {
    const service = app.service('pending_products');

    assert.ok(service, 'Registered the service');
  });
});

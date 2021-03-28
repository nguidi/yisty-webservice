const assert = require('assert');
const app = require('../../src/app');

describe('\'affiliate_shops_products\' service', () => {
  it('registered the service', () => {
    const service = app.service('affiliate_shops_products');

    assert.ok(service, 'Registered the service');
  });
});

const assert = require('assert');
const app = require('../../src/app');

describe('\'pending_ingredients\' service', () => {
  it('registered the service', () => {
    const service = app.service('pending_ingredients');

    assert.ok(service, 'Registered the service');
  });
});

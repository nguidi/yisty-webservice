const assert = require('assert');
const app = require('../../src/app');

describe('\'manufacturers\' service', () => {
  it('registered the service', () => {
    const service = app.service('manufacturers');

    assert.ok(service, 'Registered the service');
  });
});

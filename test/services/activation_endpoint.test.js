const assert = require('assert');
const app = require('../../src/app');

describe('\'activation_endpoint\' service', () => {
  it('registered the service', () => {
    const service = app.service('activation_endpoint');

    assert.ok(service, 'Registered the service');
  });
});

const assert = require('assert');
const app = require('../../src/app');

describe('\'ingredients\' service', () => {
  it('registered the service', () => {
    const service = app.service('ingredients');

    assert.ok(service, 'Registered the service');
  });
});

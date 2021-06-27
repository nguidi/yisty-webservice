const assert = require('assert');
const app = require('../../src/app');

describe('\'password_recovery\' service', () => {
  it('registered the service', () => {
    const service = app.service('password_recovery');

    assert.ok(service, 'Registered the service');
  });
});

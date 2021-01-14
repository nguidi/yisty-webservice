const assert = require('assert');
const app = require('../../src/app');

describe('\'user_complaints\' service', () => {
  it('registered the service', () => {
    const service = app.service('user_complaints');

    assert.ok(service, 'Registered the service');
  });
});

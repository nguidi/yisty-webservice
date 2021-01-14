const assert = require('assert');
const app = require('../../src/app');

describe('\'food_preferences\' service', () => {
  it('registered the service', () => {
    const service = app.service('food_preferences');

    assert.ok(service, 'Registered the service');
  });
});

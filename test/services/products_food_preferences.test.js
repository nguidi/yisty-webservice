const assert = require('assert');
const app = require('../../src/app');

describe('\'products_food_preferences\' service', () => {
  it('registered the service', () => {
    const service = app.service('products-food-preferences');

    assert.ok(service, 'Registered the service');
  });
});

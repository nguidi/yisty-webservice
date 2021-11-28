const assert = require('assert');
const app = require('../src/app');

describe('Login (Autentificación)', () => {
  it('Registrado el servicio de autentificación', () => {
    assert.ok(app.service('authentication'));
  });
  
  describe('Autentificación/Tokenización (JWT)', () => {
    const userInfo = {
      email: 'someone@example.com',
      password: 'supersecret',
      full_name: 'someone'
    };

    before(async () => {
      try {
        await app.service('users').create(userInfo);
      } catch (error) {
        // Si llegue aca es porque el usuario ya existe, no debo hacer nada.
      }
    });

    it('Autentifico el usuario, creo el token de acceso', async () => {
      const { user, accessToken } = await app.service('authentication').create({
        strategy: 'local',
        ...userInfo
      });
      
      assert.ok(accessToken, 'Token JWT creado correctamente');
      assert.ok(user, 'Usuario autentificado correctamente');
    });
  });
});

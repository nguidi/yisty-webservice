const uniqid = require('uniqid');

async function asyncSendEmail(Mailer, mailOptions) {
  return new Promise( (resolve, reject) => {
    
    Mailer.sendMail(mailOptions, function(error, info){
      if (error) {
        resolve(false);
      } else {
        console.log('Email sent: ' + info.response);
        resolve(true)
      }
    }); 
  })
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      async function(hook) {

        hook.data.key = uniqid();

        return hook;
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      async function(hook) {
        let Mailer = hook.app.get('Mailer');

        var mailOptions = {
            to:  hook.result.email,
            from: 'yistyapp@gmail.com', // Use the email address or domain you verified above
            subject: 'Recupera tu cuenta de Yisty',
            html: `Se creo una solicitud de recuperación de cuenta en la aplicación <b>Yisty</b>. Haz click <a href="${hook.app.get('recover_password_url')+'#'+hook.result.key}">aqui</a> para recuperar tu cuenta. Si no solicitaste recuperar tu cuenta en <b>Yisty</b> ignora este email.`,
        };
          
        if (!asyncSendEmail(Mailer, mailOptions)) {
          throw new Error('Ocurrio un error al enviar el email');
        }

        return hook;
      } 
    ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

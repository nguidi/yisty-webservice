var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(
    smtpTransport(
        {
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: process.env.MAILER_USER,
                pass: process.env.MAILER_PASSWORD
            }
        }
    )
);

module.exports = transporter;
  

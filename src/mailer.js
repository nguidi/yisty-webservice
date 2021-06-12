var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(
    smtpTransport(
        {
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: 'yistyapp@gmail.com',
                pass: ''
            }
        }
    )
);

module.exports = transporter;
  

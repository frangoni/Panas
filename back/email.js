const nodemailer = require('nodemailer');
const { EMAIL, PASS } = process.env;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `${EMAIL}`,
    pass: `${PASS}`,
  },
});

const sendEmail = (toWhom, whom) => {
  const mail = {
    from: EMAIL,
    to: toWhom,
    subject: `Hola ${whom}! Tu auto ya está listo para retirar.`,
    html: `<img src="cid:${EMAIL}"/>`,
    attachments: [
      {
        filename: 'panas.png',
        path: './public/mail.jpg',
        cid: EMAIL,
      },
    ],
  };
  transporter.sendMail(mail, (err, info) => {
    err ? console.log('ERROR AL ENVIAR MAIL', err) : console.log('EMAIL ENVIADO!', info);
  });
};

module.exports = sendEmail;

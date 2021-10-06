require('dotenv').config();
const { EMAIL, PASS } = process.env;
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `${EMAIL}`,
    pass: `${PASS}`,
  },
});

const backUpmail = to => {
  return {
    from: EMAIL,
    to: EMAIL,
    subject: `Mail rechazado`,
    text: `Reboto mail al cliente con correo ${to}`,
  };
};

const sendEmail = (toWhom, whom) => {
  const mail = {
    from: EMAIL,
    to: toWhom,
    subject: `Hola ${whom}! Tu auto ya está listo para retirar 🚗.`,
    html: { path: './email/index.html' },
    attachments: [
      {
        filename: 'panas.png',
        path: './email/images/panas.png',
        cid: 'panas',
      },
    ],
  };
  transporter.sendMail(mail, (err, info) => {
    err
      ? (transporter.sendMail(backUpmail(toWhom)), console.log('ERROR AL ENVIAR MAIL', err))
      : console.log('EMAIL ENVIADO!', info);
  });
};

const sendEstimatedTime = (toWhom, whom, minutes) => {
  const mail = {
    from: EMAIL,
    to: toWhom,
    subject: `Lavadero Los Panas`,
    text: `Hola ${whom}! Gracias por dejar tu auto 🚗.\nEl tiempo estimado de entrega es de: ${minutes} minutos ⏱.\nVa a recibir un email cuando esté listo para retirar 🚩.\nSaludos!`,
  };
  transporter.sendMail(mail, (err, info) => {
    err ? console.log('ERROR AL ENVIAR MAIL', err) : console.log('EMAIL ENVIADO!', info);
  });
};

module.exports = { sendEmail, sendEstimatedTime };

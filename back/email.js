require('dotenv').config();
const { EMAIL, PASS, ACCOUNTSID, AUTHTOKEN } = process.env;
const nodemailer = require('nodemailer');
const client = require('twilio')(ACCOUNTSID, AUTHTOKEN);

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
    subject: `Hola ${whom}! Tu auto ya está listo para retirar 🚗.`,
    html: `<img src="cid:${EMAIL}"/>`,
    attachments: [
      {
        filename: 'panas.png',
        path: './assets/mail.jpg',
        cid: EMAIL,
      },
    ],
  };
  transporter.sendMail(mail, (err, info) => {
    err ? console.log('ERROR AL ENVIAR MAIL', err) : console.log('EMAIL ENVIADO!', info);
  });
};

const sendWhatsapp = (nombre, telefono) => {
  return client.messages
    .create({
      body: `Hola ${nombre}! Tu auto está listo y limpio para ser retirado 🚗. Muchas gracias por confiar 😍`,
      from: 'whatsapp:+14155238886',
      to: `whatsapp:+${telefono}`,
    })
    .then(message => console.log(message))
    .catch(err => console.log(err))
    .done();
};

module.exports = { sendEmail, sendWhatsapp };

const nodemailer = require("nodemailer");
const nodemailMailgum = require('nodemailer-mailgun-transport')

const mailgun = require("mailgun-js");
const DOMAIN = 'sandbox4d40ae1021bf4e17a4d8ea84495f380b.mailgun.org';
const mg = mailgun({ apiKey: "2c990609c66e16d4dc4bfa4c191d2d3b-fa6e84b7-9981dc59", domain: DOMAIN });

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mauricebagalwa009@gmail.com",
    pass: "remaurice1kin",
  },
});
// send mail with defined transport object
module.exports = {
  sendEmail: async (body, next) => {
    const { to, subject, text, html } = body
    let mailOptions = await transporter.sendMail({

      from: "mauricebagalwa009@gmail.com", // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        next(err);
      } else {
        res.send({
          status: 200,
          result,
        });
      }
    });

  },
  nextMail: async (req, res, next) => {
    const { to, subject, text, html } = req
    let mailOptions = await transporter.sendMail({

      from: "mauricebagalwa009@gmail.com", // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    // 
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        next(err);
      } else {
        // res.send({
        //   status: 200,
        //   result,
        // });
        next()
        // console.log(info)
      }
    });

  },
  mailgum: async (req, res, next) => {

    // const data = {
    //   from: 'Excited User <me@samples.mailgun.org>',
    //   to: 'mbagalwa003@gmail.com',
    //   subject: 'Hello',
    //   text: 'Testing some Mailgun awesomness!'
    // };
    // mg.messages().send(data, function (error, body) {
    //   if (error)
    //     next(error)
    //   else
    //     res.send({
    //       body
    //     })
    // });

    const auth = {
      auth: {
        api_key: '2c990609c66e16d4dc4bfa4c191d2d3b-fa6e84b7-9981dc59',
        // domain: 'sandbox4d40ae1021bf4e17a4d8ea84495f380b.mailgun.org'
        domain: 'https://api.mailgun.net/v3/sandbox4d40ae1021bf4e17a4d8ea84495f380b.mailgun.org'
      }
    };

    let transporter = nodemailer.createTransport(nodemailMailgum(auth));

    const mailOptions = {
      from: 'Excited User <me@samples.mailgun.org>',
      to: 'mbagalwa003@gmail.com',
      subject: 'Test send',
      text: 'Testing some Mailgun awesomness!'
    }

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log('Error:', err);
      } else {
        console.log('Message sent!!!');
      }
    })

  }
}


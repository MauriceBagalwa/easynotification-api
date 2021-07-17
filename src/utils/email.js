const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mauricebagalwa009@gmail.com",
    pass: "remaurice1kin",
  },
});
// send mail with defined transport object
module.exports = {
  sendEmail: async (req, res, next) => {
    const { to, subject, text, html } = req
    let mailOptions = await transporter.sendMail({

      from: "mauricebagalwa009@gmail.com", // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    transporter.sendMail(mailOptions, function (err, info) {
      console.log('#2')
      if (err) next(err);
      else
        res.status(200).json(body.result);
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
    transporter.sendMail(mailOptions, async function (err, info) {
      if (err) {
        console.log(err)
        next(err);
      } else {
        next()
      }
    });

  },
  RechargeCountEmail: async function (req, res, next) {

    const body = {
      to: req.body.email,
      subject: "Confirme count",
      html: `<div style="width: 100%; height: auto; box-sizing: border-box; padding: 40px 20px; background-color: #fafafa;">
      <img style="width: 180px; margin-left: auto; margin-right: auto; margin-bottom: 30px; display: block;"
      src="https://uptodatedevelopers.com/storage/settings/October2020/LXl8Daw9BfwdjEquV8pS.png"
      alt="Uptodate Developers" />
      <div
          style="width: 60%; height: auto; padding: 8%; margin: auto; box-sizing: border-box; background-color: #ffffff; border-radius: 4px; border: 2px solid rgba(0,0,0,0.1);">
         
          <div>
              <h1 style="text-align: center;"> votre code de recharge ${req.body.code}</h1>
          </div>
          <p style="text-align: justify; line-height: 1.6;">Your message {{variable}}<br /><br /></p>
          <blockquote>
              <p style="text-align: justify; line-height: 1.6;">Your footer</p>
          </blockquote>
      </div>
  </div>`
    }

    const { to, subject, html } = body
    let mailOptions = await transporter.sendMail({

      from: "mauricebagalwa009@gmail.com", // sender address
      to, // list of receivers
      subject, // Subject line
      html, // html body
    });

    //   // 
    transporter.sendMail(mailOptions, async function (err, info) {
      if (err) {
        console.log(err)
        next(err);
      } else {
        res.status(200).json({ result: 'mail send succeful.' })
      }
    });
  }
}


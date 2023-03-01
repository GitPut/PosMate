// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
//when this cloud function is already deployed, change the origin to 'https://your-deployed-app-url
const cors = require("cors")({ origin: true });
// const { SMTPClient } = require("emailjs");
admin.initializeApp();

// const client = new SMTPClient({
//   user: "support@divinepos.com",
//   password: "20Peter12",
//   host: "smtp.office365.com",
//   ssl: true,
// });

//create and config transporter
let transporter = nodemailer.createTransport({
  // name: "outlook.office365.com",
  host: "smtp.office365.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  requireTLS: true,
  auth: {
    user: "support@divinepos.com",
    pass: "20Peter12",
  },
  tls: {
    ciphers: "SSLv3",
  },
});

//export the cloud function called `sendEmail`
exports.sendEmail = functions.https.onRequest((req, res) => {
  //for testing purposes
  console.log(
    "from sendEmail function. The request object is:",
    JSON.stringify(req.body)
  );

  //enable CORS using the `cors` express middleware.
  cors(req, res, () => {
    //get contact form data from the req and then assigned it to variables
    const email = req.body.email;
    const name = req.body.name;
    const message = req.body.message;

    //config the email message
    const mailOptions = {
      from: email,
      to: `support@divinepos.com`,
      subject: "Divine Pos Message",
      text: message,
    };

    //call the built in `sendMail` function and return different responses upon success and failure
    return transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send({
          data: {
            status: 500,
            message: error.toString(),
          },
        });
      }

      return res.status(200).send({
        data: {
          status: 200,
          message: "sent",
        },
      });
    });
  });
});

//export the cloud function called `sendEmail`
exports.sendPasswordResetEmail = functions.https.onRequest((req, res) => {
  //enable CORS using the `cors` express middleware.
  cors(req, res, () => {
    //get contact form data from the req and then assigned it to variables
    const email = req.body.email;

    admin
      .auth()
      .generatePasswordResetLink(email)
      .then(async (link) => {
        const updatedLink = link.replace(
          "posmate-5fc0a.firebaseapp",
          "divinepos"
        );

        const mailOptions = {
          from: "support@divinepos.com",
          to: email,
          subject: "Divine Pos Password Reset",
          html: `<h1>Divine Pos Password Reset</h1>
                        <p>
                           <b>Hello! Here is your password reset link: </b>${updatedLink}<br>
                        </p>`,
        };
        return transporter.sendMail(mailOptions, (error, data) => {
          if (error) {
            return res.send(error.toString());
          }
          var data = JSON.stringify(data);
          return res.send(`Sent! ${data}`);
        });
        // const mailOptions = {
        //   from: "support@divinepos.com",
        //   to: email,
        //   subject: "Divine Pos Password Reset",
        //   text: `Hello! Here is your password reset link: ${updatedLink}`,
        // };
        // await new Promise((resolve, reject) => {
        //   transporter.sendMail(mailOptions, (error, info) => {
        //     if (error) {
        //       res.status(500).send({
        //         data: {
        //           status: 500,
        //           message: error.toString(),
        //         },
        //       });
        //     } else {
        //       res.status(200).send({
        //         data: {
        //           status: 200,
        //           message: "sent",
        //         },
        //       });
        //     }
        //   });
        // });
      })
      .catch((error) => {
        res.status(500).send({
          data: {
            status: 500,
            message: error.toString(),
          },
        });
      });
  });
});

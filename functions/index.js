const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
//when this cloud function is already deployed, change the origin to 'https://your-deployed-app-url
const cors = require("cors")({ origin: true });
admin.initializeApp();

//create and config transporter
let transporter = nodemailer.createTransport({
  host: "mail.mictonwebdesign.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "contact@mictonwebdesign.com",
    pass: "20Peter12",
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
      to: `contact@mictonwebdesign.com`,
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

    return admin
      .auth()
      .generatePasswordResetLink(email)
      .then((link) => {
        //config the email message
        const updatedLink = link.replace(
          "posmate-5fc0a.firebaseapp",
          "divinepos"
        );
        const mailOptions = {
          from: "contact@mictonwebdesign.com",
          to: email,
          subject: "Divine Pos Password Reset",
          text: `Hello! Here is your password reset link: ${updatedLink}`,
        };

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
      })
      .catch((error) => {
        return res.status(500).send({
          data: {
            status: 500,
            message: error.toString(),
          },
        });
      });
  });
});

// //export the cloud function called `sendEmail`
// exports.signUpMembership = functions.https.onRequest((req, res) => {
//   //enable CORS using the `cors` express middleware.
//   cors(req, res, () => {
//     //get contact form data from the req and then assigned it to variables
//     const email = req.body.email;


//   });
// });

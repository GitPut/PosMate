// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const stripe = require("stripe");
const cors = require("cors")({ origin: true });
const GOOGLE_API_KEY = "AIzaSyDjx4LBIEDNRYKEt-0_TJ6jUcst4a2YON4";
const axios = require("axios");

admin.initializeApp();

const db = admin.firestore();

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

exports.sendCustomEmail = functions.https.onRequest((req, res) => {
  //for testing purposes
  console.log(
    "from sendEmail function. The request object is:",
    JSON.stringify(req.body)
  );

  //enable CORS using the `cors` express middleware.
  cors(req, res, () => {
    //get contact form data from the req and then assigned it to variables
    const fromEmail = req.body.fromEmail;
    const toEmail = req.body.toEmail;
    const name = req.body.name;
    const subject = req.body.subject;
    const message = req.body.message;

    //config the email message
    const mailOptions = {
      from: fromEmail,
      to: toEmail,
      subject: subject,
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

//export the cloud function called `sendEmail`
exports.sendSettingsPass = functions.https.onRequest((req, res) => {
  //enable CORS using the `cors` express middleware.
  cors(req, res, () => {
    //get contact form data from the req and then assigned it to variables
    const email = req.body.email;
    const password = req.body.password;

    const mailOptions = {
      from: "support@divinepos.com",
      to: email,
      subject: "Divine Pos Settings Password",
      html: `<h1>Divine Pos Settings Password</h1>
                        <p>
                           <b>Hello! Here is your password for your settings page: </b>${password}<br>
                        </p>`,
    };
    return transporter.sendMail(mailOptions, (error, data) => {
      if (error) {
        return res.send(error.toString());
      }
      var data = JSON.stringify(data);
      return res.send(`Sent! ${data}`);
    });
  });
});

exports.sendCustomEmail = functions.https.onRequest((req, res) => {
  //enable CORS using the `cors` express middleware.
  cors(req, res, () => {
    //get contact form data from the req and then assigned it to variables
    const email = req.body.email;
    const subject = req.body.subject;
    const html = req.body.html;

    const mailOptions = {
      from: "support@divinepos.com",
      to: email,
      subject: subject,
      html: html,
    };
    return transporter.sendMail(mailOptions, (error, data) => {
      if (error) {
        return res.send(error.toString());
      }
      var data = JSON.stringify(data);
      return res.send(`Sent! ${data}`);
    });
  });
});

exports.processPayment = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const { token, amount, currency, storeUID, orderDetails } = req.body;

      // Fetch the secret key from Firestore or Realtime Database
      const configSnapshot = await db.collection("users").doc(storeUID).get();
      const secretKey = configSnapshot.data().stripeSecretKey;

      const charge = await stripe(secretKey).charges.create({
        amount: amount * 100,
        currency: currency || "cad",
        source: token,
      });

      console.log("Payment succeeded:", charge);

      await db
        .collection("users")
        .doc(storeUID)
        .collection("pendingOrders")
        .add(orderDetails);

      const mailOptions = {
        from: "support@divinepos.com",
        to: orderDetails.customer.email,
        subject: "Order Confirmation",
        html: `<h1>Order Confirmation</h1>
        <p>
           <b>Hello! Your order has been confirmed.<br>
        </p>`,
      };
      return transporter.sendMail(mailOptions, (error, data) => {
        if (error) {
          return res.send(error.toString());
        }
        res.status(200).json({ success: true, message: "Payment succeeded" });
      });
    } catch (error) {
      console.error("Error during payment:", error);
      res
        .status(500)
        .json({ success: false, message: `Payment failed: ${error.message}` });
    }
  });
});

exports.getLatLng = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const { placeId } = req.body;

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry&key=${GOOGLE_API_KEY}`
      );

      const data = response.data;

      if (
        data.status === "OK" &&
        data.result.geometry &&
        data.result.geometry.location
      ) {
        const { lat, lng } = data.result.geometry.location;
        res
          .status(200)
          .json({ success: true, message: "Success", data: { lat, lng } });
      } else {
        res.status(500).json({
          success: false,
          message: `Error: No results found for the place ID`,
        });
      }
    } catch (error) {
      console.error("Error during request:", error);
      res
        .status(500)
        .json({ success: false, message: `Error: ${error.message}` });
    }
  });
});

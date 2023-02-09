const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

// Your email server configuration
const transporter = nodemailer.createTransport({
  host: "mail.mictonwebdesign.com",
  port: 465,
  secure: true,
  auth: {
    user: "contact@mictonwebdesign.com",
    pass: "20Peter12",
  },
});

exports.sendEmailTo = functions.https.onCall((data, context) => {
  // The email data, including recipient, subject, and message
  const mailOptions = {
    from: data.from,
    to: "contact@mictonwebdesign.com",
    subject: data.subject,
    text: data.message,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error);
    }
    return res.send({ messageId: info.messageId });
  });
});

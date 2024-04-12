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
          "auth.divinepos"
        );

        const mailOptions = {
          from: "support@divinepos.com",
          to: email,
          subject: "Divine Pos Password Reset",
          html: `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" style="line-height: inherit;">
  <head style="line-height: inherit;">
    <!--[if gte mso 9]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG />
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" style="line-height: inherit;">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" style="line-height: inherit;">
    <meta name="x-apple-disable-message-reformatting" style="line-height: inherit;">
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" style="line-height: inherit;">
    <!--<![endif]-->
    <title style="line-height: inherit;"></title>


    <!--[if !mso]><!-->
    <!--<![endif]-->
  </head>

  <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000;line-height: inherit;">
    <!--[if IE]><div class="ie-container"><![endif]-->
    <!--[if mso]><div class="mso-container"><![endif]-->
    <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;margin: 0 auto;background-color: #f9f9f9;width: 100%;line-height: inherit;color: #000000;" cellpadding="0" cellspacing="0">
      <tbody style="line-height: inherit;">
        <tr style="vertical-align: top;line-height: inherit;border-collapse: collapse;">
          <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;line-height: inherit;color: #000000;">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->

            <div class="u-row-container" style="padding: 0px;background-color: #f9f9f9;line-height: inherit;">
              <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #f9f9f9;line-height: inherit;width: 100% !important;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;line-height: inherit;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #f9f9f9;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #f9f9f9;"><![endif]-->

                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;line-height: inherit;width: 600px !important;">
                    <div style="height: 100%;width: 100% !important;line-height: inherit;margin: 0 auto;">
                      <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box;height: 100%;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;line-height: inherit;"><!--<![endif]-->
                        <table style="font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody style="line-height: inherit;">
                            <tr style="line-height: inherit;vertical-align: top;border-collapse: collapse;">
                              <td style="overflow-wrap: break-word;word-break: break-word;padding: 15px;font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" align="left">
                                <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #f9f9f9;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;line-height: inherit;color: #000000;">
                                  <tbody style="line-height: inherit;">
                                    <tr style="vertical-align: top;line-height: inherit;border-collapse: collapse;">
                                      <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #000000;">
                                        <span style="line-height: inherit;">&#160;</span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>

            <div class="u-row-container" style="padding: 0px;background-color: transparent;line-height: inherit;">
              <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;line-height: inherit;width: 100% !important;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;line-height: inherit;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;line-height: inherit;width: 600px !important;">
                    <div style="height: 100%;width: 100% !important;line-height: inherit;margin: 0 auto;">
                      <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box;height: 100%;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;line-height: inherit;"><!--<![endif]-->
                        <table style="font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody style="line-height: inherit;">
                            <tr style="line-height: inherit;vertical-align: top;border-collapse: collapse;">
                              <td style="overflow-wrap: break-word;word-break: break-word;padding: 25px 10px;font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" align="left">
                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;">
                                  <tr style="line-height: inherit;vertical-align: top;border-collapse: collapse;">
                                    <td style="padding-right: 0px;padding-left: 0px;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" align="center">
                                      <img src="data:image/png;base64,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" alt="DPOS Logo" title="DPOS Logo" style="outline: none;text-decoration: none;display: inline-block;height: auto;width: 168px;/* fixed width for consistency */
    max-width: 100%;/* ensures responsiveness */: ;line-height: inherit;" width="168">
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>

            <div class="u-row-container" style="padding: 0px;background-color: transparent;line-height: inherit;">
              <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #161a39;line-height: inherit;width: 100% !important;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;line-height: inherit;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #161a39;"><![endif]-->

                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;line-height: inherit;width: 600px !important;">
                    <div style="height: 100%;width: 100% !important;line-height: inherit;margin: 0 auto;">
                      <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box;height: 100%;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;line-height: inherit;"><!--<![endif]-->
                        <table style="font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody style="line-height: inherit;">
                            <tr style="line-height: inherit;vertical-align: top;border-collapse: collapse;">
                              <td style="overflow-wrap: break-word;word-break: break-word;padding: 35px 10px 10px;font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" align="left">
                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;">
                                  <tr style="line-height: inherit;vertical-align: top;border-collapse: collapse;">
                                    <td style="padding-right: 0px;padding-left: 0px;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" align="center">
                                      <img align="center" border="0" src="data:image/png;base64,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" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 10%;max-width: 58px;line-height: inherit;" width="58">
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table style="font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody style="line-height: inherit;">
                            <tr style="line-height: inherit;vertical-align: top;border-collapse: collapse;">
                              <td style="overflow-wrap: break-word;word-break: break-word;padding: 0px 10px 30px;font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" align="left">
                                <div style="
                                    font-size: 14px;
                                    line-height: 140%;
                                    text-align: left;
                                    word-wrap: break-word;
                                  ">
                                  <p style="font-size: 14px;line-height: 140%;text-align: center;margin: 0;">
                                    <span style="
                                        font-size: 28px;
                                        line-height: 39.2px;
                                        color: #ffffff;
                                        font-family: Lato, sans-serif;
                                      ">Please reset your password
                                    </span>
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>

            <div class="u-row-container" style="padding: 0px;background-color: transparent;line-height: inherit;">
              <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;line-height: inherit;width: 100% !important;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;line-height: inherit;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;line-height: inherit;width: 600px !important;">
                    <div style="height: 100%;width: 100% !important;line-height: inherit;margin: 0 auto;">
                      <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box;height: 100%;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;line-height: inherit;"><!--<![endif]-->
                        <table style="font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody style="line-height: inherit;">
                            <tr style="line-height: inherit;vertical-align: top;border-collapse: collapse;">
                              <td style="overflow-wrap: break-word;word-break: break-word;padding: 40px 40px 30px;font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" align="left">
                                <div style="
                                    font-size: 14px;
                                    line-height: 140%;
                                    text-align: left;
                                    word-wrap: break-word;
                                  ">
                                  <p style="font-size: 14px;line-height: 140%;margin: 0;">
                                    <span style="
                                        font-size: 18px;
                                        line-height: 25.2px;
                                        color: #666666;
                                      ">Hello,
                                  </span></p>
                                  <p style="font-size: 14px;line-height: 140%;margin: 0;">
                                  </p>
                                  <p style="font-size: 14px;line-height: 140%;margin: 0;">
                                    <span style="
                                        font-size: 18px;
                                        line-height: 25.2px;
                                        color: #666666;
                                      ">We have sent you this email in response
                                      to your request to reset your password to
                                      Divine POS.
                                  </span></p>
                                  <p style="font-size: 14px;line-height: 140%;margin: 0;">
                                  </p>
                                  <p style="font-size: 14px;line-height: 140%;margin: 0;">
                                    <span style="
                                        font-size: 18px;
                                        line-height: 25.2px;
                                        color: #666666;
                                      ">To reset your password, please follow the
                                      link below:
                                    </span>
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table style="font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody style="line-height: inherit;">
                            <tr style="line-height: inherit;vertical-align: top;border-collapse: collapse;">
                              <td style="overflow-wrap: break-word;word-break: break-word;padding: 0px 40px;font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" align="left">
                                <!--[if mso
                                  ]><style>
                                    .v-button {
                                      background: transparent !important;
                                    }
                                  </style><!
                                [endif]-->
                                <div align="left" style="line-height: inherit;">
                                  <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:51px; v-text-anchor:middle; width:205px;" arcsize="2%"  stroke="f" fillcolor="#18163a"><w:anchorlock/><center style="color:#FFFFFF;"><![endif]-->
                                  <a href="${updatedLink}" target="_blank" class="v-button" style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #ffffff;background-color: #18163a;border-radius: 1px;-webkit-border-radius: 1px;-moz-border-radius: 1px;width: auto;max-width: 100%;overflow-wrap: break-word;word-break: break-word;word-wrap: break-word;mso-border-alt: none;font-size: 14px;line-height: inherit;">
                                    <span style="
                                        display: block;
                                        padding: 15px 40px;
                                        line-height: 120%;
                                      "><span style="
                                          font-size: 18px;
                                          line-height: 21.6px;
                                        ">Reset Password
                                  </span></span></a>
                                  <!--[if mso]></center></v:roundrect><![endif]-->
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table style="font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody style="line-height: inherit;">
                            <tr style="line-height: inherit;vertical-align: top;border-collapse: collapse;">
                              <td style="overflow-wrap: break-word;word-break: break-word;padding: 40px 40px 30px;font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" align="left">
                                <div style="
                                    font-size: 14px;
                                    line-height: 140%;
                                    text-align: left;
                                    word-wrap: break-word;
                                  ">
                                  <p style="font-size: 14px;line-height: 140%;margin: 0;">
                                    <span style="
                                        color: #888888;
                                        font-size: 14px;
                                        line-height: 19.6px;
                                      "><em style="line-height: inherit;"><span style="
                                            font-size: 16px;
                                            line-height: 22.4px;
                                          ">Please ignore this email if you did
                                          not request a password change.<br style="line-height: inherit;"><span style="
                                        color: #888888;
                                        font-size: 14px;
                                        line-height: 19.6px;
                                      "></span></span></em><em style="line-height: inherit;"><span style="
                                            font-size: 16px;
                                            line-height: 22.4px;
                                          ">&nbsp;
                                  </span></em></span></p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>

            <div class="u-row-container" style="padding: 0px;background-color: transparent;line-height: inherit;">
              <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #18163a;line-height: inherit;width: 100% !important;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;line-height: inherit;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #18163a;"><![endif]-->

                  <!--[if (mso)|(IE)]><td align="center" width="300" style="width: 300px;padding: 20px 20px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;line-height: inherit;width: 300px !important;">
                    <div style="height: 100%;width: 100% !important;line-height: inherit;margin: 0 auto;">
                      <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box;height: 100%;padding: 20px 20px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;line-height: inherit;"><!--<![endif]-->
                        <table style="font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody style="line-height: inherit;">
                            <tr style="line-height: inherit;vertical-align: top;border-collapse: collapse;">
                              <td style="overflow-wrap: break-word;word-break: break-word;padding: 10px;font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" align="left">
                                <div style="
                                    font-size: 14px;
                                    line-height: 140%;
                                    text-align: left;
                                    word-wrap: break-word;
                                  ">
                                  <p style="font-size: 14px;line-height: 140%;margin: 0;">
                                    <span style="
                                        font-size: 16px;
                                        line-height: 22.4px;
                                        color: #ecf0f1;
                                      ">Contact
                                  </span></p>
                                  <p style="font-size: 14px;line-height: 140%;margin: 0;">
                                    <span style="
                                        font-size: 14px;
                                        line-height: 19.6px;
                                        color: #ecf0f1;
                                      ">1 (833) 348-7671
                                  </span></p>
                                  <p style="font-size: 14px;line-height: 140%;margin: 0;">
                                    <span style="font-size: 14px; line-height: 19.6px; color: #ecf0f1;">
  <a href="mailto:support@divinepos.com" style="color: #ecf0f1;text-decoration: none;line-height: inherit;">support@divinepos.com</a>
</span>
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]><td align="center" width="300" style="width: 300px;padding: 0px 0px 0px 20px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;line-height: inherit;width: 300px !important;">
                    <div style="height: 100%;width: 100% !important;line-height: inherit;margin: 0 auto;">
                      <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box;height: 100%;padding: 0px 0px 0px 20px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;line-height: inherit;"><!--<![endif]-->
                        <table style="font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody style="line-height: inherit;">
                            <tr style="line-height: inherit;vertical-align: top;border-collapse: collapse;">
                              <td style="overflow-wrap: break-word;word-break: break-word;padding: 25px 10px 10px;font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" align="left">
                                <div align="left" style="line-height: inherit;">
                                  <div style="display: table;max-width: 140px;line-height: inherit;">
                                    <!--[if (mso)|(IE)]><table width="140" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="left"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:140px;"><tr><![endif]-->

                                    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 15px;" valign="top"><![endif]-->
                                    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px;line-height: inherit;color: #000000;">
                                      <tbody style="line-height: inherit;">
                                        <tr style="vertical-align: top;line-height: inherit;border-collapse: collapse;">
                                          <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;line-height: inherit;color: #000000;">
                                            <a href=" https://www.facebook.com/divinepos" title="Facebook" target="_blank" style="line-height: inherit;color: #161a39;text-decoration: underline;">
                                              <img src="data:image/png;base64,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" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important;line-height: inherit;">
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!--[if (mso)|(IE)]></td><![endif]-->

                                    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 15px;" valign="top"><![endif]-->
                                    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px;line-height: inherit;color: #000000;">
                                      <tbody style="line-height: inherit;">
                                        <tr style="vertical-align: top;line-height: inherit;border-collapse: collapse;">
                                          <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;line-height: inherit;color: #000000;">
                                            <a href=" https://twitter.com/divine_pos" title="Twitter" target="_blank" style="line-height: inherit;color: #161a39;text-decoration: underline;">
                                              <img src="data:image/png;base64,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" alt="Twitter" title="Twitter" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important;line-height: inherit;">
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!--[if (mso)|(IE)]></td><![endif]-->

                                    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
                                    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px;line-height: inherit;color: #000000;">
                                      <tbody style="line-height: inherit;">
                                        <tr style="vertical-align: top;line-height: inherit;border-collapse: collapse;">
                                          <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;line-height: inherit;color: #000000;">
                                            <a href=" https://www.linkedin.com/company/divinepos" title="LinkedIn" target="_blank" style="line-height: inherit;color: #161a39;text-decoration: underline;">
                                              <img src="data:image/png;base64,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" alt="LinkedIn" title="LinkedIn" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important;line-height: inherit;">
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!--[if (mso)|(IE)]></td><![endif]-->

                                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table style="font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody style="line-height: inherit;">
                            <tr style="line-height: inherit;vertical-align: top;border-collapse: collapse;">
                              <td style="overflow-wrap: break-word;word-break: break-word;padding: 5px 10px 10px;font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" align="left">
                                <div style="
                                    font-size: 14px;
                                    line-height: 140%;
                                    text-align: left;
                                    word-wrap: break-word;
                                  ">
                                  <p style="line-height: 140%;font-size: 14px;margin: 0;">
                                    <span style="
                                        font-size: 14px;
                                        line-height: 19.6px;
                                      "><span style="
                                          color: #ecf0f1;
                                          font-size: 14px;
                                          line-height: 19.6px;
                                        "><span style="
                                            line-height: 19.6px;
                                            font-size: 14px;
                                          ">Divine POS © All Rights
                                          Reserved
                                  </span></span></span></p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>

            <div class="u-row-container" style="padding: 0px;background-color: #f9f9f9;line-height: inherit;">
              <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #1c103b;line-height: inherit;width: 100% !important;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;line-height: inherit;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #f9f9f9;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #1c103b;"><![endif]-->

                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;line-height: inherit;width: 600px !important;">
                    <div style="height: 100%;width: 100% !important;line-height: inherit;margin: 0 auto;">
                      <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box;height: 100%;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;line-height: inherit;"><!--<![endif]-->
                        <table style="font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody style="line-height: inherit;">
                            <tr style="line-height: inherit;vertical-align: top;border-collapse: collapse;">
                              <td style="overflow-wrap: break-word;word-break: break-word;padding: 15px;font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" align="left">
                                <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #1c103b;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;line-height: inherit;color: #000000;">
                                  <tbody style="line-height: inherit;">
                                    <tr style="vertical-align: top;line-height: inherit;border-collapse: collapse;">
                                      <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #000000;">
                                        <span style="line-height: inherit;">&#160;</span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>

            <div class="u-row-container" style="padding: 0px;background-color: transparent;line-height: inherit;">
              <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #f9f9f9;line-height: inherit;width: 100% !important;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;line-height: inherit;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #f9f9f9;"><![endif]-->

                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;line-height: inherit;width: 600px !important;">
                    <div style="height: 100%;width: 100% !important;line-height: inherit;margin: 0 auto;">
                      <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box;height: 100%;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;line-height: inherit;"><!--<![endif]-->
                        <table style="font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody style="line-height: inherit;">
                            <tr style="line-height: inherit;vertical-align: top;border-collapse: collapse;">
                              <td style="overflow-wrap: break-word;word-break: break-word;padding: 0px 40px 30px 20px;font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" align="left">
                                <div style="
                                    font-size: 14px;
                                    line-height: 140%;
                                    text-align: left;
                                    word-wrap: break-word;
                                  "></div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>

            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
          </td>
        </tr>
      </tbody>
    </table>
    <!--[if mso]></div><![endif]-->
    <!--[if IE]></div><![endif]-->
  </body>
</html>
                        `,
        };
        return transporter.sendMail(mailOptions, (error, data) => {
          if (error) {
            return res.send(error.toString());
          }
          var returnData = JSON.stringify(data);
          return res.send(`Sent! ${returnData}`);
        });
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
      html: `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" style="line-height: inherit;">
  <head style="line-height: inherit;">
    <!--[if gte mso 9]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG />
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" style="line-height: inherit;">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" style="line-height: inherit;">
    <meta name="x-apple-disable-message-reformatting" style="line-height: inherit;">
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" style="line-height: inherit;">
    <!--<![endif]-->
    <title style="line-height: inherit;"></title>


    <!--[if !mso]><!-->
    <!--<![endif]-->
  </head>

  <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000;line-height: inherit;">
    <!--[if IE]><div class="ie-container"><![endif]-->
    <!--[if mso]><div class="mso-container"><![endif]-->
    <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;margin: 0 auto;background-color: #f9f9f9;width: 100%;line-height: inherit;color: #000000;" cellpadding="0" cellspacing="0">
      <tbody style="line-height: inherit;">
        <tr style="vertical-align: top;line-height: inherit;border-collapse: collapse;">
          <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;line-height: inherit;color: #000000;">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->

            <div class="u-row-container" style="padding: 0px;background-color: #f9f9f9;line-height: inherit;">
              <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #f9f9f9;line-height: inherit;width: 100% !important;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;line-height: inherit;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #f9f9f9;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #f9f9f9;"><![endif]-->

                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;line-height: inherit;width: 600px !important;">
                    <div style="height: 100%;width: 100% !important;line-height: inherit;margin: 0 auto;">
                      <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box;height: 100%;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;line-height: inherit;"><!--<![endif]-->
                        <table style="font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody style="line-height: inherit;">
                            <tr style="line-height: inherit;vertical-align: top;border-collapse: collapse;">
                              <td style="overflow-wrap: break-word;word-break: break-word;padding: 15px;font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" align="left">
                                <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #f9f9f9;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;line-height: inherit;color: #000000;">
                                  <tbody style="line-height: inherit;">
                                    <tr style="vertical-align: top;line-height: inherit;border-collapse: collapse;">
                                      <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #000000;">
                                        <span style="line-height: inherit;">&#160;</span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>

            <div class="u-row-container" style="padding: 0px;background-color: transparent;line-height: inherit;">
              <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;line-height: inherit;width: 100% !important;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;line-height: inherit;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;line-height: inherit;width: 600px !important;">
                    <div style="height: 100%;width: 100% !important;line-height: inherit;margin: 0 auto;">
                      <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box;height: 100%;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;line-height: inherit;"><!--<![endif]-->
                        <table style="font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody style="line-height: inherit;">
                            <tr style="line-height: inherit;vertical-align: top;border-collapse: collapse;">
                              <td style="overflow-wrap: break-word;word-break: break-word;padding: 25px 10px;font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" align="left">
                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;">
                                  <tr style="line-height: inherit;vertical-align: top;border-collapse: collapse;">
                                    <td style="padding-right: 0px;padding-left: 0px;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" align="center">
                                      <img src="data:image/png;base64,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" alt="DPOS Logo" title="DPOS Logo" style="outline: none;text-decoration: none;display: inline-block;height: auto;width: 168px;/* fixed width for consistency */
    max-width: 100%;/* ensures responsiveness */: ;line-height: inherit;" width="168">
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>

            <div class="u-row-container" style="padding: 0px;background-color: transparent;line-height: inherit;">
              <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #161a39;line-height: inherit;width: 100% !important;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;line-height: inherit;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #161a39;"><![endif]-->

                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;line-height: inherit;width: 600px !important;">
                    <div style="height: 100%;width: 100% !important;line-height: inherit;margin: 0 auto;">
                      <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box;height: 100%;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;line-height: inherit;"><!--<![endif]-->
                        <table style="font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody style="line-height: inherit;">
                            <tr style="line-height: inherit;vertical-align: top;border-collapse: collapse;">
                              <td style="overflow-wrap: break-word;word-break: break-word;padding: 35px 10px 10px;font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" align="left">
                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;">
                                  <tr style="line-height: inherit;vertical-align: top;border-collapse: collapse;">
                                    <td style="padding-right: 0px;padding-left: 0px;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" align="center">
                                      <img align="center" border="0" src="data:image/png;base64,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" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 10%;max-width: 58px;line-height: inherit;" width="58">
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table style="font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody style="line-height: inherit;">
                            <tr style="line-height: inherit;vertical-align: top;border-collapse: collapse;">
                              <td style="overflow-wrap: break-word;word-break: break-word;padding: 0px 10px 30px;font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" align="left">
                                <div style="
                                    font-size: 14px;
                                    line-height: 140%;
                                    text-align: left;
                                    word-wrap: break-word;
                                  ">
                                  <p style="font-size: 14px;line-height: 140%;text-align: center;margin: 0;">
                                    <span style="
                                        font-size: 28px;
                                        line-height: 39.2px;
                                        color: #ffffff;
                                        font-family: Lato, sans-serif;
                                      ">Divine POS System Backend Password
                                    </span>
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>

            <div class="u-row-container" style="padding: 0px;background-color: transparent;line-height: inherit;">
              <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;line-height: inherit;width: 100% !important;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;line-height: inherit;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;line-height: inherit;width: 600px !important;">
                    <div style="height: 100%;width: 100% !important;line-height: inherit;margin: 0 auto;">
                      <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box;height: 100%;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;line-height: inherit;"><!--<![endif]-->
                        <table style="font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody style="line-height: inherit;">
                            <tr style="line-height: inherit;vertical-align: top;border-collapse: collapse;">
                              <td style="overflow-wrap: break-word;word-break: break-word;padding: 40px 40px 30px;font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" align="left">
                                <div style="
                                    font-size: 14px;
                                    line-height: 140%;
                                    text-align: left;
                                    word-wrap: break-word;
                                  ">
                                  <p style="font-size: 14px;line-height: 140%;margin: 0;">
                                    <span style="
                                        font-size: 18px;
                                        line-height: 25.2px;
                                        color: #666666;
                                      ">Hello,
                                  </span></p>
                                  <p style="font-size: 14px;line-height: 140%;margin: 0;">
                                  </p>
                                  <p style="font-size: 14px;line-height: 140%;margin: 0;">
                                    <span style="
                                        font-size: 18px;
                                        line-height: 25.2px;
                                        color: #666666;
                                      ">We have sent you this email in response
                                      to your request for your Divine POS System Backend password.
                                  </span></p>
                                  <p style="font-size: 14px;line-height: 140%;margin: 0;">
                                  </p>
                                  <p style="font-size: 14px;line-height: 140%;margin: 0;">
                                    <span style="
                                        font-size: 18px;
                                        line-height: 25.2px;
                                        color: #666666;
                                      ">Settings Password: ${password}
                                    </span>
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table style="font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody style="line-height: inherit;">
                            <tr style="line-height: inherit;vertical-align: top;border-collapse: collapse;">
                              <td style="overflow-wrap: break-word;word-break: break-word;padding: 0px 40px;font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" align="left">
                                <!--[if mso
                                  ]><style>
                                    .v-button {
                                      background: transparent !important;
                                    }
                                  </style><!
                                [endif]-->
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table style="font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody style="line-height: inherit;">
                            <tr style="line-height: inherit;vertical-align: top;border-collapse: collapse;">
                              <td style="overflow-wrap: break-word;word-break: break-word;padding: 40px 40px 30px;font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" align="left">
                                <div style="
                                    font-size: 14px;
                                    line-height: 140%;
                                    text-align: left;
                                    word-wrap: break-word;
                                  ">
                                  <p style="font-size: 14px;line-height: 140%;margin: 0;">
                                    <span style="
                                        color: #888888;
                                        font-size: 14px;
                                        line-height: 19.6px;
                                      "><em style="line-height: inherit;"><span style="
                                            font-size: 16px;
                                            line-height: 22.4px;
                                          ">Please ignore this email if you did
                                          not request your password.<br style="line-height: inherit;"><span style="
                                        color: #888888;
                                        font-size: 14px;
                                        line-height: 19.6px;
                                      "></span></span></em><em style="line-height: inherit;"><span style="
                                            font-size: 16px;
                                            line-height: 22.4px;
                                          ">&nbsp;
                                  </span></em></span></p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>

            <div class="u-row-container" style="padding: 0px;background-color: transparent;line-height: inherit;">
              <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #18163a;line-height: inherit;width: 100% !important;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;line-height: inherit;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #18163a;"><![endif]-->

                  <!--[if (mso)|(IE)]><td align="center" width="300" style="width: 300px;padding: 20px 20px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;line-height: inherit;width: 300px !important;">
                    <div style="height: 100%;width: 100% !important;line-height: inherit;margin: 0 auto;">
                      <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box;height: 100%;padding: 20px 20px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;line-height: inherit;"><!--<![endif]-->
                        <table style="font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody style="line-height: inherit;">
                            <tr style="line-height: inherit;vertical-align: top;border-collapse: collapse;">
                              <td style="overflow-wrap: break-word;word-break: break-word;padding: 10px;font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" align="left">
                                <div style="
                                    font-size: 14px;
                                    line-height: 140%;
                                    text-align: left;
                                    word-wrap: break-word;
                                  ">
                                  <p style="font-size: 14px;line-height: 140%;margin: 0;">
                                    <span style="
                                        font-size: 16px;
                                        line-height: 22.4px;
                                        color: #ecf0f1;
                                      ">Contact
                                  </span></p>
                                  <p style="font-size: 14px;line-height: 140%;margin: 0;">
                                    <span style="
                                        font-size: 14px;
                                        line-height: 19.6px;
                                        color: #ecf0f1;
                                      ">1 (833) 348-7671
                                  </span></p>
                                  <p style="font-size: 14px;line-height: 140%;margin: 0;">
                                    <span style="font-size: 14px; line-height: 19.6px; color: #ecf0f1;">
  <a href="mailto:support@divinepos.com" style="color: #ecf0f1;text-decoration: none;line-height: inherit;">support@divinepos.com</a>
</span>
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]><td align="center" width="300" style="width: 300px;padding: 0px 0px 0px 20px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;line-height: inherit;width: 300px !important;">
                    <div style="height: 100%;width: 100% !important;line-height: inherit;margin: 0 auto;">
                      <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box;height: 100%;padding: 0px 0px 0px 20px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;line-height: inherit;"><!--<![endif]-->
                        <table style="font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody style="line-height: inherit;">
                            <tr style="line-height: inherit;vertical-align: top;border-collapse: collapse;">
                              <td style="overflow-wrap: break-word;word-break: break-word;padding: 25px 10px 10px;font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" align="left">
                                <div align="left" style="line-height: inherit;">
                                  <div style="display: table;max-width: 140px;line-height: inherit;">
                                    <!--[if (mso)|(IE)]><table width="140" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="left"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:140px;"><tr><![endif]-->

                                    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 15px;" valign="top"><![endif]-->
                                    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px;line-height: inherit;color: #000000;">
                                      <tbody style="line-height: inherit;">
                                        <tr style="vertical-align: top;line-height: inherit;border-collapse: collapse;">
                                          <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;line-height: inherit;color: #000000;">
                                            <a href=" https://www.facebook.com/divinepos" title="Facebook" target="_blank" style="line-height: inherit;color: #161a39;text-decoration: underline;">
                                              <img src="data:image/png;base64,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" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important;line-height: inherit;">
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!--[if (mso)|(IE)]></td><![endif]-->

                                    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 15px;" valign="top"><![endif]-->
                                    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px;line-height: inherit;color: #000000;">
                                      <tbody style="line-height: inherit;">
                                        <tr style="vertical-align: top;line-height: inherit;border-collapse: collapse;">
                                          <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;line-height: inherit;color: #000000;">
                                            <a href=" https://twitter.com/divine_pos" title="Twitter" target="_blank" style="line-height: inherit;color: #161a39;text-decoration: underline;">
                                              <img src="data:image/png;base64,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" alt="Twitter" title="Twitter" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important;line-height: inherit;">
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!--[if (mso)|(IE)]></td><![endif]-->

                                    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
                                    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px;line-height: inherit;color: #000000;">
                                      <tbody style="line-height: inherit;">
                                        <tr style="vertical-align: top;line-height: inherit;border-collapse: collapse;">
                                          <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;line-height: inherit;color: #000000;">
                                            <a href=" https://www.linkedin.com/company/divinepos" title="LinkedIn" target="_blank" style="line-height: inherit;color: #161a39;text-decoration: underline;">
                                              <img src="data:image/png;base64,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" alt="LinkedIn" title="LinkedIn" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important;line-height: inherit;">
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!--[if (mso)|(IE)]></td><![endif]-->

                                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table style="font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody style="line-height: inherit;">
                            <tr style="line-height: inherit;vertical-align: top;border-collapse: collapse;">
                              <td style="overflow-wrap: break-word;word-break: break-word;padding: 5px 10px 10px;font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" align="left">
                                <div style="
                                    font-size: 14px;
                                    line-height: 140%;
                                    text-align: left;
                                    word-wrap: break-word;
                                  ">
                                  <p style="line-height: 140%;font-size: 14px;margin: 0;">
                                    <span style="
                                        font-size: 14px;
                                        line-height: 19.6px;
                                      "><span style="
                                          color: #ecf0f1;
                                          font-size: 14px;
                                          line-height: 19.6px;
                                        "><span style="
                                            line-height: 19.6px;
                                            font-size: 14px;
                                          ">Divine POS © All Rights
                                          Reserved
                                  </span></span></span></p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>

            <div class="u-row-container" style="padding: 0px;background-color: #f9f9f9;line-height: inherit;">
              <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #1c103b;line-height: inherit;width: 100% !important;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;line-height: inherit;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #f9f9f9;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #1c103b;"><![endif]-->

                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;line-height: inherit;width: 600px !important;">
                    <div style="height: 100%;width: 100% !important;line-height: inherit;margin: 0 auto;">
                      <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box;height: 100%;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;line-height: inherit;"><!--<![endif]-->
                        <table style="font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody style="line-height: inherit;">
                            <tr style="line-height: inherit;vertical-align: top;border-collapse: collapse;">
                              <td style="overflow-wrap: break-word;word-break: break-word;padding: 15px;font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" align="left">
                                <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #1c103b;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;line-height: inherit;color: #000000;">
                                  <tbody style="line-height: inherit;">
                                    <tr style="vertical-align: top;line-height: inherit;border-collapse: collapse;">
                                      <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #000000;">
                                        <span style="line-height: inherit;">&#160;</span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>

            <div class="u-row-container" style="padding: 0px;background-color: transparent;line-height: inherit;">
              <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #f9f9f9;line-height: inherit;width: 100% !important;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;line-height: inherit;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #f9f9f9;"><![endif]-->

                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;line-height: inherit;width: 600px !important;">
                    <div style="height: 100%;width: 100% !important;line-height: inherit;margin: 0 auto;">
                      <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box;height: 100%;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;line-height: inherit;"><!--<![endif]-->
                        <table style="font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody style="line-height: inherit;">
                            <tr style="line-height: inherit;vertical-align: top;border-collapse: collapse;">
                              <td style="overflow-wrap: break-word;word-break: break-word;padding: 0px 40px 30px 20px;font-family: 'Lato', sans-serif;line-height: inherit;vertical-align: top;border-collapse: collapse;color: #000000;" align="left">
                                <div style="
                                    font-size: 14px;
                                    line-height: 140%;
                                    text-align: left;
                                    word-wrap: break-word;
                                  "></div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>

            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
          </td>
        </tr>
      </tbody>
    </table>
    <!--[if mso]></div><![endif]-->
    <!--[if IE]></div><![endif]-->
  </body>
</html>
                        `,
    };
    return transporter.sendMail(mailOptions, (error, data) => {
      if (error) {
        return res.send(error.toString());
      }
      var returnData = JSON.stringify(data);
      return res.send(`Sent! ${returnData}`);
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
      var returnData = JSON.stringify(data);
      return res.send(`Sent! ${returnData}`);
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

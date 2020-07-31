export default async (req, res) => {
  const AWS = require("aws-sdk");
  AWS.config.update({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: "us-east-1",
  });
  const ses = new AWS.SES();
  const EMAIL = process.env.email;
  const UTF8CHARSET = "UTF-8";

  const emailParams = {
    Destination: { ToAddresses: [EMAIL] },
    Message: {
      Body: {
        Text: {
          Charset: UTF8CHARSET,
          Data: req.body.message,
        },
      },
      Subject: {
        Charset: UTF8CHARSET,
        Data: `Email from ${req.body.name}, contact email:${req.body.email}`,
      },
    },
    Source: EMAIL,
  };

  try {
    await ses.sendEmail(emailParams).promise();
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ message: 'Email sent' }))
    res.send()
  } catch (err) {
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ Error: err }))
    res.send()

  }
};

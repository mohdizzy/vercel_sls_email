AWS = require('aws-sdk')
SES = new AWS.SES

AWS.config.update({
    accessKeyId:process.env.accessKeyId,
    secretAccessKey:process.env.secretAccessKey,
    region:"us-east-1"
  });
EMAIL = 'mohammed@serverlessguru.com',
UTF8CHARSET = 'UTF-8';

module.exports = async (req,res) => {

    const emailData = JSON.parse(req);
    console.log(req);

    if (!emailData.name || !emailData.message || !emailData.email) {
        res.status(400).send("Please fill all inputs");
    }

 
    const body = emailData.message;

    const emailParams = {
        Destination: EMAIL,
        Message: {
            Body: body,
            Subject: {
                Charset: UTF8CHARSET,
                Data: `Email from ${emailData.name}`
            }
        },
        Source: EMAIL
    };


    try {
        await SES.sendEmail(emailParams).promise();
        res.status(200);
        res.send("Thank you providing your details");
    } catch (err) {
        console.error(err, err.stack);
        res.status(400).send(err);
    }
};


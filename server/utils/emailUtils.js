const nodemailer = require('nodemailer');
const { emailCreds } = require('../config/index')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailCreds.EMAIL,
      pass: emailCreds.PASSWORD
    }
  });

exports.sendCourseRegistrationMail = async (data) => {
    const { user } = data;
    console.log("User Data is", user);
    let linkDocuments = `<a>No Documents Available</a>`
    if(user.documents && user.documents[0]) {
      const documents = user.documents[0].cloudStorage;
      linkDocuments = documents.map(document => `<li><a href="${document.imageUrl}">${document.originalName}</a></li>`).join('');
    }
    const subject = "New Registration For Course";
    const courseMailOptions = {
        from: emailCreds.EMAIL,
        to: emailCreds.TO_EMAIL,
        subject: subject,
        html:  `<html lang="en">
    
        <head>
            <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link href="https://fonts.googleapis.com/css?family=Quicksand:400,600&display=swap" rel="stylesheet">
            <title>Foreign Master</title>
        </head>
        
        <body style="font-family: 'Quicksand';font-weight:400;margin:0 auto !important; padding:0 !important; -webkit-text-size-adjust:none; -ms-text-size-adjust:none;width: 100%;max-width: 600px;">
            <center>
                <table cellpadding="0" cellspacing="0" border="0" style="height:auto !important; margin:0; padding: 30px 10px; width:100% !important; background: black; border: 1px solid #ececec;">
                    <tr>
                        <td>
                            <img src='https://fastly.picsum.photos/id/566/200/300.jpg?blur=2&hmac=ltlLizieMYwxLYGe32KMTIp5280ZDtXRZZPbGvnRcyk' style="width:250px;margin: 0 auto; padding: 15px 0px 25px 0; border: none; display: block;" border="0" alt="" />
                        </td>
                    </tr>
                    <tr>
                    </tr>
                    <!-- Content -->
                    <tr>
                        <td style="background: #fff; padding: 15px 25px; border: 1px solid #D1D3D3;text-align: center;">
                            <p align="center" style="color: #001F31; font-size: 14px; line-height: 24px;padding-bottom: 25px;"> Link to Supporting Documents</p>
                            <ul>
                                ${linkDocuments}
                            </ul>
                            <p align="center" style=" color: #001F31; font-size: 14px; padding-top: 30px;"> Thank you</p>
                            <p align="center" style=" color: #001F31; font-size: 14px;"> Foreignmaster Team</p>
        
                        </td>
                    </tr>
                </table>
            </center>
        </body>
        
        </html>`,
    };

    try {
      const email = await transporter.sendMail(courseMailOptions)
      console.log("Email is", email);
      return true;
    } catch(err) {
      console.log("Email Error is", err);
      return false;
    }
}
import { NextResponse } from "next/server";
const nodemailer=require("nodemailer");

export async function POST(req){
    const {name,email,subject,message,honey}=await req.json();
    if(!honey){
        if(name && email && subject && message){
            const transporter = nodemailer.createTransport({
                service: "Gmail",
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: "uietpu092@gmail.com",
                    pass: "kqfnznxjosmfvyva", 
                },
            });
            const info1 = await transporter.sendMail({
                from: "uietpu092@gmail.com",
                to: email,
                subject: "Thank you for reaching out to us!",
                html: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
                <head>
                <!--[if gte mso 9]>
                <xml>
                  <o:OfficeDocumentSettings>
                    <o:AllowPNG/>
                    <o:PixelsPerInch>96</o:PixelsPerInch>
                  </o:OfficeDocumentSettings>
                </xml>
                <![endif]-->
                  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <meta name="x-apple-disable-message-reformatting">
                  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
                  <title></title>
                  
                    <style type="text/css">
                      @media only screen and (min-width: 520px) {
                  .u-row {
                    width: 500px !important;
                  }
                  .u-row .u-col {
                    vertical-align: top;
                  }
                
                  .u-row .u-col-100 {
                    width: 500px !important;
                  }
                
                }
                
                @media (max-width: 520px) {
                  .u-row-container {
                    max-width: 100% !important;
                    padding-left: 0px !important;
                    padding-right: 0px !important;
                  }
                  .u-row .u-col {
                    min-width: 320px !important;
                    max-width: 100% !important;
                    display: block !important;
                  }
                  .u-row {
                    width: 100% !important;
                  }
                  .u-col {
                    width: 100% !important;
                  }
                  .u-col > div {
                    margin: 0 auto;
                  }
                }
                body {
                  margin: 0;
                  padding: 0;
                }
                
                table,
                tr,
                td {
                  vertical-align: top;
                  border-collapse: collapse;
                }
                
                p {
                  margin: 0;
                }
                
                .ie-container table,
                .mso-container table {
                  table-layout: fixed;
                }
                
                * {
                  line-height: inherit;
                }
                
                a[x-apple-data-detectors='true'] {
                  color: inherit !important;
                  text-decoration: none !important;
                }
                
                @media (min-width: 0px) {
                  .hide-default__display-table {
                    display: table !important;
                    mso-hide: unset !important;
                  }
                }
                
                @media (max-width: 480px) {
                  .hide-mobile {
                    max-height: 0px;
                    overflow: hidden;
                    display: none !important;
                  }
                }
                
                @media (min-width: 481px) {
                  .hide-desktop {
                    max-height: 0px;
                    overflow: hidden;
                    display: none !important;
                  }
                }
                table, td { color: #000000; } </style>
                  
                  
                
                </head>
                
                <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: transparent;color: #000000">
                  <!--[if IE]><div class="ie-container"><![endif]-->
                  <!--[if mso]><div class="mso-container"><![endif]-->
                  <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: transparent;width:100%" cellpadding="0" cellspacing="0">
                  <tbody>
                  <tr style="vertical-align: top">
                    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: transparent;"><![endif]-->
                    
                  
                  
                <div class="u-row-container" style="padding: 0px;background-color: transparent">
                  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
                      
                <!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
                  <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                  <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
                  
                <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                  <tbody>
                    <tr>
                      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                        
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="padding-right: 0px;padding-left: 0px;" align="center">
                      
                      <img align="center" border="0" src="https://github.com/silly-panda69/PU_LOGO/blob/main/output-onlinepngtools%20(1).png?raw=true" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 239px;" width="239"/>
                      
                    </td>
                  </tr>
                </table>
                
                      </td>
                    </tr>
                  </tbody>
                </table>
                
                <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                  <tbody>
                    <tr>
                      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px;font-family:arial,helvetica,sans-serif;" align="left">
                        
                  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                    <tbody>
                      <tr style="vertical-align: top">
                        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                          <span>&#160;</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                
                      </td>
                    </tr>
                  </tbody>
                </table>
                
                <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                  <tbody>
                    <tr>
                      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                        
                  <div style="font-size: 14px; font-weight: 700; line-height: 140%; text-align: left; word-wrap: break-word;">
                    <p style="line-height: 140%;"> </p>
                <p style="line-height: 140%;">Dear ${name},</p>
                  </div>
                
                      </td>
                    </tr>
                  </tbody>
                </table>
                
                <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                  <tbody>
                    <tr>
                      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                        
                  <div style="font-size: 14px; font-weight: 400; line-height: 140%; text-align: left; word-wrap: break-word;">
                    <p style="line-height: 140%;">Thank you for getting in touch with us.</p>
                <p style="line-height: 140%;"> </p>
                <p style="line-height: 140%;">Your message has been received, and we are currently reviewing the details. Please be assured that we are actively addressing your concerns and are committed to providing the information or support you require.</p>
                <p style="line-height: 140%;"> </p>
                <p style="line-height: 140%;">We appreciate your patience as we work through this process. If you have any additional questions or concerns, please feel free to reach out to us.</p>
                <p style="line-height: 140%;"> </p>
                <p style="line-height: 140%;">We will be in touch with you shortly with a comprehensive response. If you have any urgent matters in the meantime, please don't hesitate to contact us directly.</p>
                  </div>
                
                      </td>
                    </tr>
                  </tbody>
                </table>
                
                <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                  <tbody>
                    <tr>
                      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                        
                  <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
                    <p style="line-height: 140%;"> </p>
                <p style="line-height: 140%;">Thank you,</p>
                <p style="line-height: 140%;">PU RIMS</p>
                  </div>
                
                      </td>
                    </tr>
                  </tbody>
                </table>
                
                <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                  <tbody>
                    <tr>
                      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                        
                  <div style="font-size: 11px; line-height: 140%; text-align: center; word-wrap: break-word;">
                    <p style="line-height: 140%;"> </p>
                <p style="line-height: 140%;"> </p>
                <p style="line-height: 140%;"> </p>
                <p style="line-height: 140%;"> </p>
                <p style="line-height: 140%;">PU RIMS, UIET, Panjab University, Chandigarh</p>
                  </div>
                
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!--[if !mso]><!-->
                <table class="hide-default__display-table hide-desktop hide-mobile" style="display: none;mso-hide: all;font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                  <tbody>
                    <tr>
                      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                        
                  <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
                    <p style="line-height: 140%;">${name}</p>
                  </div>
                
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!--<![endif]-->
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
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
                `
            });
            const info2 = await transporter.sendMail({
                from: "uietpu092@gmail.com",
                to: "uietpu092@gmail.com",
                subject: "PU RIMS contact form submission received!",
                html: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
                <head>
                <!--[if gte mso 9]>
                <xml>
                  <o:OfficeDocumentSettings>
                    <o:AllowPNG/>
                    <o:PixelsPerInch>96</o:PixelsPerInch>
                  </o:OfficeDocumentSettings>
                </xml>
                <![endif]-->
                  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <meta name="x-apple-disable-message-reformatting">
                  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
                  <title></title>
                  
                    <style type="text/css">
                      @media only screen and (min-width: 520px) {
                  .u-row {
                    width: 500px !important;
                  }
                  .u-row .u-col {
                    vertical-align: top;
                  }
                
                  .u-row .u-col-100 {
                    width: 500px !important;
                  }
                
                }
                
                @media (max-width: 520px) {
                  .u-row-container {
                    max-width: 100% !important;
                    padding-left: 0px !important;
                    padding-right: 0px !important;
                  }
                  .u-row .u-col {
                    min-width: 320px !important;
                    max-width: 100% !important;
                    display: block !important;
                  }
                  .u-row {
                    width: 100% !important;
                  }
                  .u-col {
                    width: 100% !important;
                  }
                  .u-col > div {
                    margin: 0 auto;
                  }
                }
                body {
                  margin: 0;
                  padding: 0;
                }
                
                table,
                tr,
                td {
                  vertical-align: top;
                  border-collapse: collapse;
                }
                
                p {
                  margin: 0;
                }
                
                .ie-container table,
                .mso-container table {
                  table-layout: fixed;
                }
                
                * {
                  line-height: inherit;
                }
                
                a[x-apple-data-detectors='true'] {
                  color: inherit !important;
                  text-decoration: none !important;
                }
                
                @media (min-width: 0px) {
                  .hide-default__display-table {
                    display: table !important;
                    mso-hide: unset !important;
                  }
                }
                
                @media (max-width: 480px) {
                  .hide-mobile {
                    max-height: 0px;
                    overflow: hidden;
                    display: none !important;
                  }
                }
                
                @media (min-width: 481px) {
                  .hide-desktop {
                    max-height: 0px;
                    overflow: hidden;
                    display: none !important;
                  }
                }
                table, td { color: #000000; } </style>
                  
                  
                
                </head>
                
                <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: transparent;color: #000000">
                  <!--[if IE]><div class="ie-container"><![endif]-->
                  <!--[if mso]><div class="mso-container"><![endif]-->
                  <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: transparent;width:100%" cellpadding="0" cellspacing="0">
                  <tbody>
                  <tr style="vertical-align: top">
                    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: transparent;"><![endif]-->
                    
                  
                  
                <div class="u-row-container" style="padding: 0px;background-color: transparent">
                  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
                      
                <!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
                  <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                  <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
                  
                <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                  <tbody>
                    <tr>
                      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                        
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="padding-right: 0px;padding-left: 0px;" align="center">
                      
                      <img align="center" border="0" src="https://github.com/silly-panda69/PU_LOGO/blob/main/output-onlinepngtools%20(1).png?raw=true" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 239px;" width="239"/>
                      
                    </td>
                  </tr>
                </table>
                
                      </td>
                    </tr>
                  </tbody>
                </table>
                
                <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                  <tbody>
                    <tr>
                      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px;font-family:arial,helvetica,sans-serif;" align="left">
                        
                  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                    <tbody>
                      <tr style="vertical-align: top">
                        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                          <span>&#160;</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                
                      </td>
                    </tr>
                  </tbody>
                </table>
                
                <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                  <tbody>
                    <tr>
                      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                        
                  <div style="font-size: 14px; font-weight: 700; line-height: 140%; text-align: left; word-wrap: break-word;">
                    <p style="line-height: 140%;"> </p>
                <p style="line-height: 140%;">Dear Admin,</p>
                  </div>
                
                      </td>
                    </tr>
                  </tbody>
                </table>
                
                <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                  <tbody>
                    <tr>
                      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                        
                  <div style="font-size: 14px; font-weight: 400; line-height: 140%; text-align: left; word-wrap: break-word;">
                    <p style="line-height: 140%;">We have received a message through our "Contact Us" page. It appears that someone is seeking to get in touch with you directly.</p>
                <p style="line-height: 140%;"> </p>
                <p style="line-height: 140%;">Could you please take a moment to review the message below and respond accordingly?</p>
                  </div>
                
                      </td>
                    </tr>
                  </tbody>
                </table>
                
                <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                  <tbody>
                    <tr>
                      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                        
                  <div style="font-size: 14px; font-weight: 700; line-height: 180%; text-align: left; word-wrap: break-word;">
                    <p style="line-height: 180%;">Message contents:</p>
                  </div>
                
                      </td>
                    </tr>
                  </tbody>
                </table>
                
                <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                  <tbody>
                    <tr>
                      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px;font-family:arial,helvetica,sans-serif;" align="left">
                        
                  <div style="font-size: 14px; font-weight: 400; line-height: 160%; text-align: left; word-wrap: break-word;">
                    <p style="line-height: 160%;">Name: ${name}</p>
                <p style="line-height: 160%;">Email: ${email}</p>
                <p style="line-height: 160%;">Subject: ${subject}</p>
                <p style="line-height: 160%;">Message: ${message}</p>
                <p style="line-height: 160%;"> </p>
                <p style="line-height: 160%;">Thank you for your swift action on this matter.</p>
                  </div>
                
                      </td>
                    </tr>
                  </tbody>
                </table>
                
                <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                  <tbody>
                    <tr>
                      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                        
                  <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
                    <p style="line-height: 140%;"> </p>
                <p style="line-height: 140%;">Best regards,</p>
                <p style="line-height: 140%;">PU RIMS</p>
                  </div>
                
                      </td>
                    </tr>
                  </tbody>
                </table>
                
                <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                  <tbody>
                    <tr>
                      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                        
                  <div style="font-size: 11px; line-height: 140%; text-align: center; word-wrap: break-word;">
                    <p style="line-height: 140%;"> </p>
                <p style="line-height: 140%;"> </p>
                <p style="line-height: 140%;"> </p>
                <p style="line-height: 140%;"> </p>
                <p style="line-height: 140%;">PU RIMS, UIET, Panjab University, Chandigarh</p>
                  </div>
                
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!--[if !mso]><!-->
                <table class="hide-default__display-table hide-desktop hide-mobile" style="display: none;mso-hide: all;font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                  <tbody>
                    <tr>
                      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                        
                  <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
                    <p style="line-height: 140%;">${name}</p>
                  </div>
                
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!--<![endif]-->
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
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
            })
            return NextResponse.json({result: true});
        }else{
            return NextResponse.json({result: false});
        }
    }
}
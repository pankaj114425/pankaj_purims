import { askToken, checkUser} from "@/utils/mongo";
const bcrypt=require("bcryptjs");
import { NextResponse } from "next/server";
import {authenticator, hotp } from "otplib";
const nodemailer=require('nodemailer');

//resend otp
export async function POST(req){
    const {email}=await req.json();
    if(email){
        //check if the user exists
        const user=await checkUser(email);
        if(user===false){
          const secret=process.env.HASH_SECRET;
            authenticator.options={digits: 4};
            hotp.options={digits: 4};
            const otp=hotp.generate(secret,10);
            const salt=await bcrypt.genSaltSync(10);
            const token=await bcrypt.hashSync(otp,salt);
            const result=await askToken(email,token);
            if(result){
                  const transporter = nodemailer.createTransport({
                    service: "Gmail",
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true,
                    auth: {
                      user: process.env.MAIL_URL,
                      pass: process.env.MAIL_SECRET,
                    },
                  });
                  const info = transporter.sendMail({
                    from: process.env.MAIL_URL,
                    to: email,
                    subject: "Confirm your email address",
                    text: "Please verify your email address by entering the follwing verification code!",
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
                          @media only screen and (min-width: 510px) {
                      .u-row {
                        width: 490px !important;
                      }
                      .u-row .u-col {
                        vertical-align: top;
                      }
                    
                      .u-row .u-col-100 {
                        width: 490px !important;
                      }
                    
                    }
                    
                    @media (max-width: 510px) {
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
                    
                    table, td { color: #000000; } @media (max-width: 480px) { #u_content_divider_1 .v-container-padding-padding { padding: 0px 10px 10px !important; } #u_content_heading_1 .v-font-size { font-size: 27px !important; } #u_content_text_5 .v-font-size { font-size: 10px !important; } }
                        </style>
                      
                      
                    
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
                      <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 490px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:490px;"><tr style="background-color: transparent;"><![endif]-->
                          
                    <!--[if (mso)|(IE)]><td align="center" width="490" style="width: 490px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 490px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                      <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
                      
                    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                      <tbody>
                        <tr>
                          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                            
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
                    
                    <table id="u_content_divider_1" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                      <tbody>
                        <tr>
                          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                            
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
                    
                    <table id="u_content_heading_1" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                      <tbody>
                        <tr>
                          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:25px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
                            
                      <!--[if mso]><table width="100%"><tr><td><![endif]-->
                        <h1 class="v-font-size" style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-size: 31px; font-weight: 700;"><span><span><span><span><span>You are almost there!</span></span></span></span></span></h1>
                      <!--[if mso]></td></tr></table><![endif]-->
                    
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    
                    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                      <tbody>
                        <tr>
                          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                            
                      <div class="v-font-size" style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
                        <p style="line-height: 140%;">Greetings,</p>
                    <p style="line-height: 140%;"> </p>
                    <p style="line-height: 140%;">Thank you for signing up. Please confirm your email address to begin your journey with PU RIMS. To verify your email, just input the code provided in the designated field during account creation.</p>
                      </div>
                    
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    
                    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                      <tbody>
                        <tr>
                          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 0px;font-family:arial,helvetica,sans-serif;" align="left">
                            
                      <div class="v-font-size" style="font-size: 17px; font-weight: 700; line-height: 150%; text-align: center; word-wrap: break-word;">
                        <p style="line-height: 150%;letter-spacing: 3px">${otp}</p>
                      </div>
                    
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    
                    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                      <tbody>
                        <tr>
                          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                            
                      <div class="v-font-size" style="font-size: 12px; font-weight: 700; line-height: 140%; text-align: center; word-wrap: break-word;">
                        <p style="line-height: 140%;">This code is valid for the next 15 minutes</p>
                      </div>
                    
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    
                    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                      <tbody>
                        <tr>
                          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                            
                      <div class="v-font-size" style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
                        <p style="line-height: 140%;">If the verification code doesn't work, please request a new verification code.</p>
                    <p style="line-height: 140%;"> </p>
                    <p style="line-height: 140%;"> </p>
                    <p style="line-height: 140%;">Thanks,</p>
                    <p style="line-height: 140%;">PU RIMS</p>
                      </div>
                    
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    
                    <table id="u_content_text_5" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                      <tbody>
                        <tr>
                          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:70px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
                            
                      <div class="v-font-size" style="font-size: 12px; line-height: 120%; text-align: center; word-wrap: break-word;">
                        <p style="line-height: 120%;">PU RIMS, MAIVRIK Lab, UIET, Panjab University , Chandigarh</p>
                      </div>
                    
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    
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
                    
                    </html>`, 
                  });
                return NextResponse.json({msg: "OTP send successfully!"})
            }else{
                return NextResponse.json({msg: "Error sending OTP!"})
            }
        }else{
            return NextResponse.json({msg: "You are not registered!"})
        }
    }else{
        return NextResponse.json({msg: "Error..."})
    }
}

import {Injectable} from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import * as dayjs from "dayjs";

@Injectable()
export class EmailService {
    constructor() {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
    }


    async sendReservationConfirmationEmail(to: string, subject: string, text: string) {
        const fromEmail = process.env.SENDGRID_FROM_EMAIL;
        const itemsSelected = [
            {
                name: "light1",
                img: "https://studio.visualminds.al/lights/5.jpeg",
                quantity: 1,
                prize: 5,
                description: "Lorem ipsum dolor sit amet, tetur adipiscing sed."
            },
            {
                name: "light2",
                img: "https://studio.visualminds.al/lights/5.jpeg",
                quantity: 1,
                prize: 5,
                description: "Lorem ipsum dolor sit amet, tetur adipiscing sed."
            },

        ]

        const itemsToShow = () => {
            return itemsSelected.map(item => `
        <div style="max-width: 500px; margin: 0 auto; background-color: transparent;">
            <table style="width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;">
                <tr>
                    <!-- Image Column -->
                    <td style="width: 23%; text-align: center; padding: 10px;">
                        <img src=${item.img} alt=${item.name} title=${item.name} style="width: 85%; max-width: 98px; border: none;">
                    </td>

                    <!-- Description Column -->
                    <td style="width: 54%; background-color: #ffffff; padding: 20px; text-align: left;">
                        <p style="margin: 0; font-size: 14px;">
                            <strong>${item.name}</strong> <span style="color: #666;">x${item.quantity}</span>
                        </p>
                        <p style="margin: 0; font-size: 14px; color: #666;">${item.description}</p>
                    </td>

                    <!-- Price Column -->
                    <td style="width: 23%; background-color: #ffffff; padding: 20px; text-align: left;">
                        <p style="margin: 0; font-size: 14px;"><strong>${item.prize}</strong></p>
                    </td>
                </tr>

                <!-- Divider -->
                <tr>
                    <td colspan="3" style="padding: 10px;">
                        <hr style="border: 1px solid #e7e7e7; margin: 0;">
                    </td>
                </tr>
            </table>
        </div>
            `).join(''); // Join all HTML strings together to add them directly in the other part of our html
        };

        // For each item the user has selected we are passing this html to be rendered as a row in the email
        const emailHtml = `
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
            <head>
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta name="x-apple-disable-message-reformatting">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <title></title>
              
                <style type="text/css">
                  
                  @media only screen and (min-width: 520px) {
                    .u-row {
                      width: 500px !important;
                    }
            
                    .u-row .u-col {
                      vertical-align: top;
                    }
            
                    
                        .u-row .u-col-22p53 {
                          width: 112.65px !important;
                        }
                      
            
                        .u-row .u-col-22p74 {
                          width: 113.7px !important;
                        }
                      
            
                        .u-row .u-col-23p13 {
                          width: 115.65px !important;
                        }
                      
            
                        .u-row .u-col-23p14 {
                          width: 115.7px !important;
                        }
                      
            
                        .u-row .u-col-50 {
                          width: 250px !important;
                        }
                      
            
                        .u-row .u-col-54p13 {
                          width: 270.65px !important;
                        }
                      
            
                        .u-row .u-col-54p33 {
                          width: 271.65px !important;
                        }
                      
            
                        .u-row .u-col-100 {
                          width: 500px !important;
                        }
                      
                  }
            
                  @media only screen and (max-width: 520px) {
                    .u-row-container {
                      max-width: 100% !important;
                      padding-left: 0px !important;
                      padding-right: 0px !important;
                    }
            
                    .u-row {
                      width: 100% !important;
                    }
            
                    .u-row .u-col {
                      display: block !important;
                      width: 100% !important;
                      min-width: 320px !important;
                      max-width: 100% !important;
                    }
            
                    .u-row .u-col > div {
                      margin: 0 auto;
                    }
            
            
                    .u-row .u-col img {
                      max-width: 100% !important;
                    }
            
            }
                
            body{margin:0;padding:0}table,td,tr{border-collapse:collapse;vertical-align:top}.ie-container table,.mso-container table{table-layout:fixed}*{line-height:inherit}a[x-apple-data-detectors=true]{color:inherit!important;text-decoration:none!important}
            
            
            table, td { color: #000000; } </style>
              
            </head>
        
            <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
          <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%" cellpadding="0" cellspacing="0">
          <tbody>
                <tr style="vertical-align: top">
                    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
              
                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
            <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
              <div style="background-color: #f7fbfc;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
            <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
              
            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
                    
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding-right: 0px;padding-left: 0px;" align="center">
                  
                  <img align="center" border="0" src="images/image-1.png" alt="Cart Icon" title="Cart Icon" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 15%;max-width: 72px;" width="72"/>
                  
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
                  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                    
              <div style="font-size: 14px; line-height: 140%; text-align: center; word-wrap: break-word;">
                <p style="font-size: 14px; line-height: 140%; margin: 0px;"><span style="font-size: 18px; line-height: 25.2px; font-family: Montserrat, sans-serif;"><strong><span style="line-height: 25.2px; font-size: 18px;">Thank you for your reservation!</span></strong></span></p>
              </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-famil:arial,helvetica,sans-serif;" align="left">
              <div style="font-size: 14px; line-height: 140%; text-align: center; word-wrap: break-word;">
                <p style="font-size: 14px; line-height: 140%; margin: 0px;">Hi John, your reservation is confimed.</span></p>
              </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">   
              <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 2px solid #e7e7e7;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
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
            
            </div>
            </div>
            </div>
                </div>
              </div>
              </div>
            ${itemsToShow()}
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
            <div class="u-col u-col-54p13" style="max-width: 320px;min-width: 270.65px;display: table-cell;vertical-align: top;">
              <div style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
            <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
              
            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 11px;font-family:arial,helvetica,sans-serif;" align="left">
                    
              <div style="font-size: 14px; color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word;">
                <p style="font-size: 14px; line-height: 140%; margin: 0px;">.</p>
              </div>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
            </div>
                  </div>
            </div>
            <div class="u-col u-col-23p13" style="max-width: 320px;min-width: 115.65px;display: table-cell;vertical-align: top;">
              <div style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
            <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
              
            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 11px;font-family:arial,helvetica,sans-serif;" align="left">
                    
              <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
                <p style="font-size: 14px; line-height: 140%; margin: 0px;"><strong><span style="font-family: Montserrat, sans-serif; font-size: 14px; line-height: 19.6px;">Total</span></strong></p>
              </div>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
            </div>
                  </div>
            </div>
            <div class="u-col u-col-22p74" style="max-width: 320px;min-width: 113.7px;display: table-cell;vertical-align: top;">
              <div style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
            <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
              
            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 11px;font-family:arial,helvetica,sans-serif;" align="left">
                    
              <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
                <p style="font-size: 14px; line-height: 140%; margin: 0px;"><span style="font-size: 16px; line-height: 22.4px;"><strong><span style="font-family: Montserrat, sans-serif; line-height: 22.4px; font-size: 16px;">$175.9</span></strong></span></p>
              </div>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
            </div>
            </div>
            </div>
                </div>
              </div>
              </div>
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
            <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
              <div style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
            <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
              
            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td style="overflow-wrap:break-word;word-break:break-word;padding:20px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
                    
              <div style="font-size: 14px; line-height: 140%; text-align: center; word-wrap: break-word;">
                <p style="font-size: 14px; line-height: 140%; margin: 0px;"><span style="font-family: Montserrat, sans-serif; font-size: 14px; line-height: 19.6px;">If you have any questions, reply to this</span></p>
            <p style="font-size: 14px; line-height: 140%; margin: 0px;"><span style="font-family: Montserrat, sans-serif; font-size: 14px; line-height: 19.6px;">email or <strong>contact us at </strong>visualminds.1992@gmail.com</span></p>
            <p style="font-size: 14px; line-height: 140%; margin: 0px;"><span style="font-family: Montserrat, sans-serif; font-size: 14px; line-height: 19.6px;">Rr.Kosovareve, Tirana, Albania</span></p>
              </div>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
            </div>
            </div>
            </div>
                </div>
              </div>
              </div>
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
            <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
              <div style="background-color: #f7fbfc;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
            <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
              
            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 40px;font-family:arial,helvetica,sans-serif;" align="left">
                    
            <div align="center" style="direction: ltr;">
              <div style="display: table; max-width:147px;">
                <table border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 5px">
                  <tbody><tr style="vertical-align: top"><td valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                    <a href="https://facebook.com/" title="Facebook" target="_blank" style="color: rgb(0, 0, 238); text-decoration: underline; line-height: inherit;"><img src="https://e7.pngegg.com/pngimages/194/58/png-clipart-computer-icons-css-sprites-facebook-page-company-logo.png" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                    </a>
                  </td></tr>
                </tbody></table>
                <table border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 5px">
                  <tbody>
                </tbody></table> <table border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 5px">
                  <tbody><tr style="vertical-align: top"><td valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                    <a href="https://linkedin.com/" title="LinkedIn" target="_blank" style="color: rgb(0, 0, 238); text-decoration: underline; line-height: inherit;"><img src="images/image-6.png" alt="LinkedIn" title="LinkedIn" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                    </a>
                  </td></tr>
                </tbody></table>
             <table border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
                  <tbody><tr style="vertical-align: top"><td valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                    <a href="https://instagram.com/" title="Instagram" target="_blank" style="color: rgb(0, 0, 238); text-decoration: underline; line-height: inherit;"><img src="images/image-7.png" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                    </a>
                  </td></tr>
                </tbody></table>
              </div>
            </div>
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
              </div>
            </div>
                </div>
              </div>
              </div>
                </td>
              </tr>
              </tbody>
          </table>
            </body>
        </html>`

        if (!fromEmail) {
            throw new Error('Missing SENDGRID_FROM_EMAIL in environment variables');
        }

        const msg = {
            to,
            from: {
                name: "Nardi",
                email: fromEmail // Must be a verified sender in SendGrid
            },
            subject,
            text,
            html: emailHtml
        };

        try {
            await sgMail.send(msg);
            console.log(`Email sent to ${to}`);
        } catch (error) {
            console.error('Error sending email:', error);
            if (error.response) {
                console.error('SendGrid Error Response:', error.response.body);
            }
        }
    }

    async sendReservationReceivedEmail(reservation) {
        const {name, email, date, startingHour, endingHour, number} = reservation;

        const dateFormatted = dayjs(date).format("DD/MM/YYYY");

        const emailHtml = `
            <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <title>Booking Confirmation</title>
                </head>
                <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; color: #fff;">
                    <div style="max-width: 600px; margin: 20px auto; background-color: #000; color: #fff; padding: 20px; text-align: center; border-radius: 5px;">
                        <div style="margin-bottom: 10px;">
                            <img src="http://localhost:3001/public/images/visualminds-logo-black-bg.png" alt="Logo" style="max-width: 100px;">
                        </div>
                        <h3 style="color: #4CAF50; font-weight: bold;">Visual Minds Studio</h3>
                        <p style="color: #fff !important">We have received your booking. Please await our confirmation.<br>Thank you.</p>
                    
                        <div style="background-color: #222; padding: 15px; border-radius: 5px; margin-top: 15px; text-align: left;">
                            <h4>Booking details</h4>
                            <div style="width: 10px;"></div>
                            <p style="margin: 5px 0;color: #fff"><strong>Day:</strong> ${dateFormatted}</p>
                            <p style="margin: 5px 0;color: #fff"><strong>Start:</strong> ${startingHour}</p>
                            <p style="margin: 5px 0;color: #fff"><strong>End:</strong> ${endingHour}</p>
                        </div>
                    
                        <div style="background-color: #222; padding: 15px; border-radius: 5px; margin-top: 15px; text-align: left;">
                            <h4 style="color: #fff">Personal Details Provided</h4>
                            <p style="margin: 5px 0;"><strong style="color: #fff">Name:</strong> <span style="color: #fff"> ${name}</span></p>
                            <p style="margin: 5px 0;"><strong style="color: #fff">Email:</strong> <a style="color:#FFFFFF;"> ${email}</a></p>
                            <p style="margin: 5px 0;"><strong style="color: #fff">Phone:</strong> <span style="color: #fff"> ${number}</span></p>
                        </div>
                    
                        <p style="margin: 10px 10px 0 0;color: #fff !important;">For any issues, feel free to contact us:</p>
                    
                        <div style="background-color: #f8d7a7; color: #000; padding: 15px; margin-top: 20px; border-radius: 5px; display: flex;">
                            <img src="http://localhost:3001/public/images/phone-call-icon.png" alt="" style="width: 50px; height: 50px; margin: 10px 20px 10px 0px">
                            <div>
                                <div style="display: flex;">
                                    <strong>Phone</strong>
                                </div>
                                <p style="margin: 5px 0;">+355 67 208 2008</p>
                                <p style="margin: 5px 0;">+355 67 493 2566</p>  
                            </div>
                        </div>
                    </div>
                </body>
            </html>
        `

        const msg = {
            to: email, // Send to user
            from: {
                name: "Visual Minds Studio",
                email: process.env.SENDGRID_FROM_EMAIL as string // Must be a verified sender in SendGrid
            },
            subject: 'Booking Request Received',
            html: emailHtml,
        };

        try {
            await sgMail.send(msg);
            console.log('Email sent to:', email);
        } catch (error) {
            console.error('❌ Failed to send email:', error);

            if (error.response) {
                console.error('🔍 SendGrid Response:', error.response.body); // Log detailed error
            }        }
    }

    async sendReservationArrivedAdminEmail(reservation) {
        const {name,email, date, startingHour, endingHour, number, totalPrice, idPhoto} = reservation;
        const dateFormatted = dayjs(date).format("DD/MM/YYYY");

        const emailHtml = `
            <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <title>Booking Confirmation</title>
                </head>
                <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; color: #fff;">
                    <div style="max-width: 600px; margin: 20px auto; background-color: #000; color: #fff; padding: 20px; text-align: center; border-radius: 5px;">
                        <div style="margin-bottom: 10px;">
                            <img src="http://localhost:3001/public/images/visualminds-logo-black-bg.png" alt="Logo" style="max-width: 100px;">
                        </div>
                        <h3 style="color: #4CAF50; font-weight: bold;">Vini</h3>
                        <p>Ka ardhur nje rezervim i ri per studion:</p>
                    
                        <div style="background-color: #222; padding: 15px; border-radius: 5px; margin-top: 15px; text-align: left;">
                            <h4>Detajet e rezervimit</h4>
                            <div style="width: 10px;"></div>
                            <p style="margin: 5px 0;"><strong>Dita:</strong> ${dateFormatted}</p>
                            <p style="margin: 5px 0;"><strong>Ora e fillimit:</strong> ${startingHour}</p>
                            <p style="margin: 5px 0;"><strong>Ora e mbarimit:</strong> ${endingHour}</p>
                        </div>
                    
                        <div style="background-color: #222; padding: 15px; border-radius: 5px; margin-top: 15px; text-align: left;">
                            <h4>Rezervuesi</h4>
                            <p style="margin: 5px 0;"><strong>Emri:</strong> ${name}</p>
                            <p style="margin: 5px 0;"><strong>Email:</strong> <a style="color:#FFFFFF;"> ${email}</a></p>
                            <p style="margin: 5px 0;"><strong>Nr. Telefoni:</strong> ${number}</p>
                        </div>
                    
                        <div style="background-color: #f8d7a7; color: #000; padding: 15px; margin-top: 20px; border-radius: 5px; display: flex; justify-content: end;">
                          
                              <div style="margin: 5px 0; font-size: 20px"> 
                                <strong>Total:</strong>
                                <span style="margin-left:10px">${totalPrice}.00 &#8364;</span>
                              </div>
                        </div>
                        <div style="background-color: #f4c177; color: #000; padding: 15px; margin-top: 20px; border-radius: 5px; display: flex; justify-content: center;">
                          
                            <div>
                                <div style="display: flex; justify-content: center; font-size: 20px">
                                    <a href="http://localhost:5173/admin/orders" style="color: #000">Shiko me shume</strong>
                                </div>
                            </div>
                          
                        </div>
                    </div>
                </body>
            </html>

        `
        const fs = require('fs');
        const path = require('path'); // Add this to manage paths more easily

        const msg = {
            to: "ralfmeca@hotmail.com", // Send to admin
            from: {
                name: "Visual Minds Studio",
                email: process.env.SENDGRID_FROM_EMAIL as string // todo Before changing rembember it Must be a verified sender in SendGrid
            },
            subject: 'Booking Request Received',
            html: emailHtml,
            attachments: [
                {
                    filename: `${name}-ID.png`, // The name of the file as it will appear in the email
                    content: fs.readFileSync(path.resolve(idPhoto)).toString('base64'),
                    type: 'image/png',
                    disposition: 'attachment',
                },
            ],
        };

        try {
            await sgMail.send(msg);
            console.log('Email sent to:', "ralfmeca@hotmail.com");
        } catch (error) {
            console.error('❌ Failed to send email:', error);

            if (error.response) {
                console.error('🔍 SendGrid Response:', error.response.body); // Log detailed error
            }
        }
    }
}

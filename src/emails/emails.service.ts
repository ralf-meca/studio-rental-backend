import {Injectable} from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import * as dayjs from "dayjs";

@Injectable()
export class EmailService {
    constructor() {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
    }

    async sendReservationReceivedEmail(reservation) {
        const {name, email, date, startingHour, endingHour, number} = reservation;

        const dateFormatted = dayjs(date).format("DD/MM/YYYY");

        const emailHtml = `
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <title>Booking Confirmation</title>
                </head>
                <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; color: #fff;">
                    <div style="max-width: 600px; margin: 20px auto; background-color: #000; color: #fff; padding: 20px; text-align: center; border-radius: 5px;">
                        <div style="margin-bottom: 10px;">
                            <img src="https://ralfmeca.art/public/images/visualminds-logo-black-bg.png" alt="Logo" style="max-width: 100px;">
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
                            <img src="https://ralfmeca.art/public/images/phone-call-icon.png" alt="" style="width: 50px; height: 50px; margin: 10px 20px 10px 0">
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
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <title>Booking Confirmation</title>
                </head>
                <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; color: #fff;">
                    <div style="max-width: 600px; margin: 20px auto; background-color: #000; color: #fff; padding: 20px; text-align: center; border-radius: 5px;">
                        <div style="margin-bottom: 10px;">
                            <img src="https://ralfmeca.art/public/images/visualminds-logo-black-bg.png" alt="Logo" style="max-width: 100px;">
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
            to: "meca.ralf@gmail.com", // Send to admin
            from: {
                name: "Visual Minds Studio",
                email: process.env.SENDGRID_FROM_EMAIL as string // todo Before changing remember it Must be a verified sender in SendGrid
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
            console.log('Email sent to:', "meca.ralf@gmail.com");
        } catch (error) {
            console.error('❌ Failed to send email:', error);

            if (error.response) {
                console.error('🔍 SendGrid Response:', error.response.body); // Log detailed error
            }
        }
    }

    async sendReservationAcceptedEmail(reservation) {

        const dateFormatted = dayjs(reservation?.date).format("DD/MM/YYYY");

        const rentalsToShow = () => {
            return reservation.selectedLights?.map(rental => {
                const imgSrc = `ralfmeca.art${rental.image.replace(/ /g, '%20')}`

                return ` <div style="margin: 0 auto;">
                    <table style="width: 100%; font-family: Arial, sans-serif; border-collapse: collapse;">
                        <tr>
                            <td style="width: 23%; text-align: center; padding: 10px;">
                                <img 
                                src="${imgSrc}"
                                alt="${rental.name}" title="${rental.name}" style="width: 50px; max-width: 90px;">
                            </td>
                            <td style="width: 54%; padding: 15px; background: #fff;">
                                <strong>${rental.name}</strong> <span style="color: #666;">x${rental.quantity}</span>
                            </td>
                            <td style="width: 23%; padding: 15px; background: #fff; text-align: left;">
                                <strong>${rental.price * rental.quantity * reservation?.blockedHours?.length}.00 &#8364;</strong>
                            </td>
                        </tr>
                        <!--  Divider -->
                        <tr>
                            <td colspan="3"><hr style="border: 1px solid #e7e7e7; margin: 0;"></td>
                        </tr>
                    </table>
                </div>
            `
            }).join(''); // Join all HTML strings together to add them directly in the other part of our html
        };

        // For each item the user has selected we are passing this html to be rendered as a row in the email
        const emailHtml = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Email Template</title>
  </head>
  <body style="margin:0; padding:0;">
    <!-- Outer table with light gray background -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f2f2f2; width:100%; padding:20px 0;">
      <tr>
        <td align="center">
          <!-- Centered container table -->
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color:#fff; padding:20px; border-radius:10px; border:1px solid #e0e0e0;">
            <!-- Logo -->
            <tr>
              <td align="center" style="padding-bottom:20px;">
                <img src="https://i.postimg.cc/VLRBRVDX/visual-minds-logo-black.png" alt="Visual Minds Icon" width="72" style="display:block; max-width:100%; height:auto;" />
              </td>
            </tr>
            <!-- Thank You Heading -->
            <tr>
              <td align="center">
                <h2 style="margin:0;">Thank you for your reservation!</h2>
              </td>
            </tr>
            <!-- Confirmation Message -->
            <tr>
              <td align="center" style="padding-top:10px;">
                <p style="margin:0;">Hi ${reservation?.name}, your reservation is confirmed.</p>
              </td>
            </tr>
            <!-- Reservation Details and Reserved To (side by side) -->
            <tr>
              <td style="padding-top:20px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <!-- Reservation Details -->
                    <td style="width:50%; padding-right:10px; vertical-align:top;">
                      <div style="padding:15px;">
                        <h4 style="margin-top:0;">Reservation Details</h4>
                        <p style="margin:5px 0;"><strong>Day:</strong> ${dateFormatted}</p>
                        <p style="margin:5px 0;"><strong>Start:</strong> ${reservation?.startingHour}</p>
                        <p style="margin:5px 0;"><strong>End:</strong> ${reservation?.endingHour}</p>
                        <p style="margin:5px 0;"><strong>Door Code:</strong> ${reservation?.doorCode}</p>
                      </div>
                    </td>
                    <!-- Reserved To -->
                    <td style="width:50%; padding-left:10px; vertical-align:top;">
                      <div style="padding:15px;">
                        <h4 style="margin-top:0;">Reserved to</h4>
                        <p style="margin:5px 0;"><strong>Emri:</strong> ${reservation?.name}</p>
                        <p style="margin:5px 0;">
                          <strong>Email:</strong>
                          <a href="mailto:${reservation?.email}" style="color:#000;">${reservation?.email}</a>
                        </p>
                        <p style="margin:5px 0;"><strong>Nr. Telefoni:</strong> ${reservation?.number}</p>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Divider -->
            <tr>
              <td style="padding-top:20px;">
                <hr style="border:1px solid #e7e7e7; margin:0;" />
              </td>
            </tr>
            <!-- Rentals (if any) -->
            <tr>
              <td style="padding-top:20px;">
                ${rentalsToShow()}
              </td>
            </tr>
            <!-- Pricing for Blocked Hours -->
            <tr>
              <td style="padding-top:20px;">
                <table style="width:100%; font-family:Arial, sans-serif; border-collapse:collapse;" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="width:23%; text-align:center; padding:10px;">
                      ${reservation?.blockedHours?.length} Hours x 10 &#8364;
                    </td>
                    <td style="width:54%; padding:15px; background:#fff;"></td>
                    <td style="width:23%; padding:15px; background:#fff; text-align:left;">
                      ${reservation?.blockedHours?.length * 10}.00 &#8364;
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Divider -->
            <tr>
              <td style="padding-top:20px;">
                <hr style="border:1px solid #e7e7e7; margin:0;" />
              </td>
            </tr>
            <!-- Pricing for Total -->
            <tr>
              <td style="padding-top:20px;">
                <table style="width:100%; font-family:Arial, sans-serif; border-collapse:collapse;" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="width:23%; text-align:center; padding:10px;">
                      <p style="margin:0;"><strong>Total</strong></p>
                    </td>
                    <td style="width:54%; padding:15px; background:#fff;"></td>
                    <td style="width:23%; padding:15px; background:#fff; text-align:left;">
                      <p style="margin:0;"><strong>${reservation?.totalPrice}.00 &#8364;</strong></p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td align="center" style="padding-top:20px; font-size:14px; line-height:140%;">
                <p style="margin:5px 0;">If you have any questions, reply to this email or <strong>contact us at</strong></p>
                <p>
                  <a href="mailto:visualminds.1992@gmail.com" style="color:#000;">visualminds.1992@gmail.com</a>
                  | +355 67 208 2008 | +355 67 493 2566
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`

        const msg = {
            to: reservation?.email, // Send to user
            from: {
                name: "Visual Minds Studio",
                email: process.env.SENDGRID_FROM_EMAIL as string // Must be a verified sender in SendGrid
            },
            subject: 'Booking Request Accepted',
            html: emailHtml,
        };

        try {
            await sgMail.send(msg);
            console.log('Email sent to:', reservation?.email);
        } catch (error) {
            console.error('❌ Failed to send email:', error);

            if (error.response) {
                console.error('🔍 SendGrid Response:', error.response.body); // Log detailed error
            }        }
    }
    async sendReservationRejectedEmail(reservation) {
        const {name, email, date, startingHour, endingHour} = reservation;

        const dateFormatted = dayjs(date).format("DD/MM/YYYY");

        const emailHtml = `
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <title>Booking Rejected	</title>
                </head>
                <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; color: #fff;">
                    <div style="max-width: 600px; margin: 20px auto; background-color: #000; color: #fff; padding: 20px; text-align: center; border-radius: 5px;">
                        <div style="margin-bottom: 10px;">
                            <img src="https://ralfmeca.art/public/images/visualminds-logo-black-bg.png" alt="Logo" style="max-width: 100px;">
                        </div>
                        <h3 style="color: #4CAF50; font-weight: bold;">Visual Minds Studio</h3>
                        <p style="color: #fff !important">Hi ${name}  Unfortunately We cannot accept your reservation in these hours.</p>
						<p>						Feel free to request other hours for our studio.<br>Thank you.</p>
                    
                        <div style="background-color: #222; padding: 15px; border-radius: 5px; margin-top: 15px; text-align: left;">
                            <h4>Booking details</h4>
                            <div style="width: 10px;"></div>
                            <p style="margin: 5px 0;color: #fff"><strong>Day:</strong> ${dateFormatted}</p>
                            <p style="margin: 5px 0;color: #fff"><strong>Start:</strong> ${startingHour}</p>
                            <p style="margin: 5px 0;color: #fff"><strong>End:</strong> ${endingHour}</p>
                        </div>
						
                        <p style="margin: 10px 10px 0 0;color: #fff !important;">For any issues, feel free to contact us:</p>
                    
                        <div style="background-color: #f8d7a7; color: #000; padding: 15px; margin-top: 20px; border-radius: 5px; display: flex;">
                            <img src="https://ralfmeca.art/public/images/phone-call-icon.png" alt="" style="width: 50px; height: 50px; margin: 10px 20px 10px 0">
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
            subject: 'Booking Request Rejected',
            html: emailHtml,
        };

        try {
            await sgMail.send(msg);
            console.log('Email sent to:', email);
        } catch (error) {
            console.error('❌ Failed to send email:', error);

            if (error.response) {
                console.error('🔍 SendGrid Response:', error.response.body); // Log detailed error
            }
        }
    }

}

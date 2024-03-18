import { Schema, model } from "mongoose";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  parant: {
    type: String,
  },
  kidsname: {
    type: String,
  },
  kidsage: {
    type: String,
  },
  country: {
    type: String,
  },
  experiance: {
    type: Object,
  },
  description: String,
});

const sendMail = async (title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: "googlifaqt@gmail.com",
      to: "googlifaqt@gmail.com",
      subject: title,
      html: body,
    };

    transporter.sendMail(mailOptions, (err, next) => {
      if (err) {
        console.log("EE", err);
      } else {
        next();
      }
    });
  } catch (err) {
    console.log(
      "Somthing went wrong in sendMail and this is try and catch error"
    );
    console.log("Erorroro : ", err);
    // throw new Error(err);
  }
};

async function sendVerificationEmail(email,name,phone,kidsname,kidsage,parent,country,experiance) {
  try {
    return await sendMail("New User Registered", `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>User Booked a Demo Class</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    
        <table style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <tr>
                <td>
                    <img src="https://frolicking-mermaid-1851d6.netlify.app/assets/champaran-chess-academy-removebg-preview.png " alt="Company Logo" style="display: block; margin: 0 auto; max-width: 200px; border-radius:999rem;">
                </td>
            </tr>
            <tr>
                <td style="padding-top: 20px;">
                    <h2 style="text-align: center; color: #333;">New Demo Class Booking Request Here call or email for further details</h2>
                </td>
            </tr>
            <tr>
                <td style="padding: 20px;">
                    <p style="font-size: 16px; line-height: 1.6;">Dear ${name},</p>
                
                    <p style="font-size: 16px; line-height: 1.6;">Your Details:</p>
                    <ul style="font-size: 16px; line-height: 1.6;">
                        <li><strong>Email:</strong> ${email}</li>
                        <li><strong>Phone:</strong> ${phone}</li>
                        <li><strong>Kids Name:</strong>${kidsname}</li>
                        <li><strong>Kids Age:</strong> ${kidsage}</li>
                        <li><strong>Country:</strong> ${country}</li>
                        <li><strong>Experience:</strong> ${experiance.id}</li>
                    </ul>
                 
                    <p style="font-size: 16px; line-height: 1.6;">Best Regards,<br>Champaran Chess Academy</p>
                </td>
            </tr>
        </table>
    
        <!-- Admin Information -->
        <table style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px;">
            <tr>
                <td>
                    <h2 style="text-align: center; color: #333;">Admin Information</h2>
                </td>
            </tr>
            <tr>
                <td style="padding: 20px;">
                    <p style="font-size: 16px; line-height: 1.6;"><strong>Name: ${name}</strong> [Admin Name]</p>
                    <p style="font-size: 16px; line-height: 1.6;"><strong>Email: ${email}</strong> [Admin Email]</p>
                    <p style="font-size: 16px; line-height: 1.6;"><strong>Phone: ${phone}</strong> [Admin Phone]</p>
                </td>
            </tr>
        </table>
    
    </body>
    </html>
    `);
  } catch (err) {
    console.log("Error occoured while sending mails : ", err);
    throw err;
  }
}

userSchema.pre("save", async function (next) {
  sendVerificationEmail(this.email,this.name,this.phone,this.kidsname,this.kidsage , this.parant, this.country , this.experiance);
  next();
});
const User = new model("User", userSchema);
export default User;

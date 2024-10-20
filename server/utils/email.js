import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config();
const transporter = nodemailer.createTransport({
  // Configure your email service here
  // service: 'gmail',
  // host: "smtp.gmail.com",
   host: 'smtp.gmail.com',
  port: 5000,
  secure: false,
  service: 'gmail',

  auth: {
    // type: "OAUTH2",
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
console.log("Email user",process.env.EMAIL_USER);
      console.log("Email user",process.env.EMAIL_PASS);
export const sendVerificationEmail = (to, token) => {
  console.log("useremail:",to);
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Verify Your Email',
    // html: `<p>Please click <a href="${process.env.FRONTEND_URL}/verify/${token}">here</a> to verify your email.</p>`
    // html: `<p>Please click <a href="http://localhost:5000/verify/${token}">here</a> to verify your email.</p>`
    html: `<p>Please click <a href="${process.env.BACKEND_URL}/verify/${token}">here</a> to verify your email.</p>`


  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("1",process.env.EMAIL_USER);
      console.log("1",process.env.EMAIL_PASS);
      console.log("Error in sendMail: ",error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

export const sendJobAlertEmail = (to, job) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'New Job Opportunity',
    html: `
      <h1>New Job Opportunity</h1>
      <h2>${job.jobTitle}</h2>
      <p><strong>Description:</strong> ${job.jobDescription}</p>
      <p><strong>Experience Level:</strong> ${job.experienceLevel}</p>
      <p><strong>End Date:</strong> ${job.endDate}</p>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("2",process.env.EMAIL_USER);
      console.log(process.env.EMAIL_PASS);
      console.log("Eroor sending mail: ",error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
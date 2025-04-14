const nodemailer = require('nodemailer');

exports.sendBookingConfirmation = async (userEmail, details) => {
  // Use a real email service like Gmail SMTP or SendGrid
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_ID,
    to: userEmail,
    subject: 'Booking Confirmation - StayEase',
    text: `Thanks for booking! Details: ${JSON.stringify(details)}`
  };

  await transporter.sendMail(mailOptions);
};

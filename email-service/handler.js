const nodemailer = require('nodemailer');

module.exports.sendEmail = async (event) => {
  const { receiver_email, subject, body_text } = JSON.parse(event.body);

  if (!receiver_email || !subject || !body_text) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing required fields' }),
    };
  }

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Replace with your SMTP server
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'workem1462003@gmail.com', // Replace with your email
      pass: 'jtrx zvcf jlxm abda',    // Replace with your email password
    },
  });

  let mailOptions = {
    from: '"Work" workem1462003@gmail.com',
    to: receiver_email,
    subject: subject,
    text: body_text,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send email', error: error.message }),
    };
  }
};


require('dotenv').config;

const authorEmail = process.env.EMAIL;
const authorTxt = process.env.APP_PASSWORD;
const SMTP_URL = process.env.SMTP_URL;

const sendEmail = async (recivers, message) => {
    const response = await fetch(SMTP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({authorEmail, authorTxt, recivers, message}),
    });
    return response;
}

module.exports = sendEmail;

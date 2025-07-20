import express, { Application, Request, Response } from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app: Application = express();
const port = 3012;

app.use(cors());
app.use(express.json());

interface EmailRequest {
    authorEmail: string;
    authorTxt: string;
    recivers: string[];
    message: string;
}

const sendEmail = async (
    senderEmail: string,
    senderPassword: string,
    recivers: string[],
    message: string
): Promise<void> => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: senderEmail,
            pass: senderPassword,
        },
    });

    const mailOptions = {
        from: senderEmail,
        to: recivers.join(','),
        subject: 'Elective Notification',
        text: `${message}\n\nWebsite : https://elective.vercel.app`,
    };

    const emailResponse = await transporter.sendMail(mailOptions);
    console.log('Email sent:', emailResponse);
};

app.post('/send-email', async (req: any, res: any) => {
    const { authorEmail, authorTxt, recivers, message }: EmailRequest = req.body;

    if (!authorEmail || !authorTxt || !recivers || !message) {
        return res.status(400).json({ msg: 'Missing required fields' });
    }

    try {
        await sendEmail(authorEmail, authorTxt, recivers, message);
        res.status(200).json({ msg: 'Email sent successfully' });
    } catch (error: any) {
        console.error('Error sending email:', error);
        res.status(500).json({ msg: 'Failed to send email', error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Email server running at http://localhost:${port}`);
});

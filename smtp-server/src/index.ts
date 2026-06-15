import express, { Application, Request, Response } from 'express';
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

const sendEmail = async (authorEmail: string, authorTxt: string, recivers: string[], message: string): Promise<void> => {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
            'api-key': authorTxt,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            sender: { email: authorEmail, name: 'Code Alpha' },
            to: recivers.map((email: string) => ({ email })),
            subject: 'Your OTP Code',
            textContent: message,
        }),
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(err);
    }
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

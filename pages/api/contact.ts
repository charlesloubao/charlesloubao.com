import {NextApiHandler} from "next";
import mailgun from 'mailgun-js'
import Mailgun from "mailgun-js";
import SendData = Mailgun.messages.SendData;

type ContactFormData = {
    name: string,
    email: string,
    subject: string,
    content: string
}
const handler: NextApiHandler = async (req, res) => {
    if (req.method !== "POST") {
        res.status(405).send("What are you doing?")
        return
    }

    const formData = req.body as ContactFormData

    const mg = mailgun({
        apiKey: process.env.MAILGUN_API_KEY!,
        domain: process.env.MAILGUN_DOMAIN!
    });

    const data: SendData = {
        from: `${formData.name} <inquiry@charlesloubao.com>`,
        to: process.env.EMAIL_RECIPIENT!,
        "h:Reply-To": `${formData.name} <${formData.email}>`,
        subject: formData.subject,
        text: formData.content
    };

    try {
        await mg.messages().send(data)
        res.status(200).json({success: true})
    } catch (e) {
        console.error(e)
        res.status(500).json({success: false})
    }
}

export default handler
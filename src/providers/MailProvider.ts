import {IMailProvider} from "./IMailProvider";
import nodemailer, {Transporter} from "nodemailer";

export class MailProvider implements IMailProvider{
    private client: Transporter;
    constructor() {
        nodemailer.createTestAccount()
            .then((account) => {
                this.client = nodemailer.createTransport({
                    host: account.smtp.host,
                    port: account.smtp.port,
                    secure: account.smtp.secure,
                    auth: {
                        user: account.user,
                        pass: account.pass
                    }
                })

            }).catch((error) => {
                console.log(error)
        })
    }
    async sendMail(to: string, subject: string,  body: string): Promise<void> {
        const message = await this.client.sendMail({
            to,
            subject,
            text: body,
            html: body
        })

        console.log('Message sent: %s', message.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }

}
import {IMailProvider} from "./IMailProvider";
import nodemailer, {Transporter} from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";


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
    async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString("utf-8");
        const templateParse = handlebars.compile(templateFileContent);
        const templateHTML = templateParse(variables);

        const message = await this.client.sendMail({
            to,
            from: "API Authentication <noreplay@apiauthentication.com.br>",
            subject,
            html: templateHTML
        })


        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }

}
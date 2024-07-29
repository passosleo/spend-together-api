import fs from 'fs';
import path from 'path';
import nodemailer, { Transporter } from 'nodemailer';
import { config } from '../../../config/app.config';
import { IMailService, MailTemplate, SendMailData } from '../../../application/services/mail/mail-service.types';
import { Logger } from '../../utils/logger';

export class MailService implements IMailService {
  private readonly transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.mail.host,
      port: Number(config.mail.port),
      auth: {
        user: config.mail.user,
        pass: config.mail.password,
      },
      from: config.mail.user,
    });
  }

  public async sendMail({ to, subject, body }: SendMailData): Promise<void> {
    try {
      await this.transporter.sendMail({
        to,
        subject: subject,
        html: body,
      });
    } catch (error) {
      Logger.error('Error while sending email', JSON.stringify(error, null, 2));
    }
  }

  public renderTemplate(template: MailTemplate, data: { [key: string]: string }): string {
    const content = fs.readFileSync(path.join(__dirname, `../../views/templates/${template}.html`), 'utf8');

    return content.replace(/{{([^{}]*)}}/g, (_, key) => {
      return data[key];
    });
  }
}

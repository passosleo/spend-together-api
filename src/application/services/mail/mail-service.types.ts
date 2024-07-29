export enum MailTemplate {
  RECOVER_PASSWORD = 'recover-password',
  VERIFY_EMAIL = 'verify-email',
}

export interface SendMailData {
  to: string;
  subject: string;
  body: string;
}

export interface IMailService {
  sendMail(data: SendMailData): Promise<void>;
  renderTemplate(template: MailTemplate, data: { [key: string]: string }): string;
}

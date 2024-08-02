import { IMailService, MailTemplate, SendMailData } from '../../application/services/mail/mail-service.types';

export const MailServiceMock: jest.Mocked<IMailService> = {
  sendMail: jest.fn<Promise<void>, [SendMailData]>(),
  renderTemplate: jest.fn<string, [MailTemplate, { [key: string]: string }]>(),
};

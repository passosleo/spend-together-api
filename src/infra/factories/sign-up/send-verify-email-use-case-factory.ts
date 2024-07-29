import { SendVerifyEmailUseCase } from '../../../application/use-cases/sign-up/send-verify-email-use-case';
import { UserRepositoryPrisma } from '../../data/repositories/user-repository-prisma';
import { Helpers } from '../../helpers';
import { MailService } from '../../services/mail/mail-service';

export class SendVerifyEmailUseCaseFactory {
  public static create(): SendVerifyEmailUseCase {
    const userRepository = new UserRepositoryPrisma();
    const mailService = new MailService();
    const helpers = new Helpers();
    return new SendVerifyEmailUseCase(userRepository, mailService, helpers);
  }
}

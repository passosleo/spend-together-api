import { SendRecoverPasswordUseCase } from '../../../application/use-cases/sign-in/send-recover-password-use-case';
import { UserRepositoryPrisma } from '../../data/repositories/user-repository-prisma';
import { Helpers } from '../../helpers';
import { MailService } from '../../services/mail/mail-service';

export class SendRecoverPasswordUseCaseFactory {
  public static create(): SendRecoverPasswordUseCase {
    const userRepository = new UserRepositoryPrisma();
    const mailService = new MailService();
    const helpers = new Helpers();
    return new SendRecoverPasswordUseCase(userRepository, mailService, helpers);
  }
}

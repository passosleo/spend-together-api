import { SignUpUseCase } from '../../../application/use-cases/sign-up/sign-up-use-case';
import { UserRepositoryPrisma } from '../../data/repositories/user-repository-prisma';
import { Helpers } from '../../helpers';
import { JWTService } from '../../services/auth/jwt-service';
import { MailServiceNodemailer } from '../../services/mail/mail-service-nodemailer';

export class SignUpUseCaseFactory {
  public static create(): SignUpUseCase {
    const userRepository = new UserRepositoryPrisma();
    const mailService = new MailServiceNodemailer();
    const tokenService = new JWTService();
    const helpers = new Helpers();
    return new SignUpUseCase(userRepository, mailService, tokenService, helpers);
  }
}

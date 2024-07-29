import { config } from '../../../config/app.config';
import { User } from '../../../domain/entities/user';
import { IUserRepository } from '../../../domain/repositories/user/user-repository';
import { UserMapper } from '../../../infra/data/mappers/user-mapper';
import { Exception } from '../../../infra/exception';
import { SignInResponseDTO } from '../../../infra/http/dtos/sign-in/sign-in-response-dto';
import { SignUpRequestDTO } from '../../../infra/http/dtos/sign-up/sign-up-request-dto';
import { SignUpResponseDTO } from '../../../infra/http/dtos/sign-up/sign-up-response-dto';
import { IHelpers } from '../../helpers/helpers.types';
import { ITokenService } from '../../services/auth/token-service.types';
import { IMailService, MailTemplate } from '../../services/mail/mail-service.types';

export class SignUpUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly mailService: IMailService,
    private readonly tokenService: ITokenService,
    private readonly helpers: IHelpers,
  ) {}

  public async execute(data: SignUpRequestDTO): Promise<SignUpResponseDTO> {
    const [emailExists, usernameExists] = await Promise.all([
      this.userRepository.findByUniqueKey({ email: data.email }),
      this.userRepository.findByUniqueKey({ username: data.username }),
    ]);

    if (emailExists) {
      throw new Exception('CONFLICT', 'Email already exists');
    }

    if (usernameExists) {
      throw new Exception('FORBIDDEN', 'Username already exists');
    }

    const hashedPassword = await this.helpers.password.hashPassword(data.password);
    const newUser = await this.userRepository.create(User.create({ ...data, password: hashedPassword }));

    const verifyEmailToken = this.helpers.encryption.encrypt<{
      userId: string;
      expiresAt: Date;
    }>({
      userId: newUser.userId,
      expiresAt: this.helpers.date.calculateExpiration({ minutes: 10 }),
    });

    const link = `${config.app.baseUrl}${config.redirects.verifyEmail}?token=${encodeURIComponent(verifyEmailToken)}`;

    const mailTemplate = this.mailService.renderTemplate(MailTemplate.VERIFY_EMAIL, {
      username: newUser.username,
      link,
    });

    const userAccount = UserMapper.toAccount(newUser);

    const accessToken = this.tokenService.createToken(userAccount);

    await this.mailService.sendMail({
      to: newUser.email,
      subject: 'Spend Together - Verification',
      body: mailTemplate,
    });

    return SignUpResponseDTO.create({
      user: userAccount,
      session: SignInResponseDTO.create({ type: 'Bearer', token: accessToken }),
    });
  }
}

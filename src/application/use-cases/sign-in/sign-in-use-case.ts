import { SignInRequestDTO } from '../../../infra/http/dtos/sign-in/sign-in-request-dto';
import { SignInResponseDTO } from '../../../infra/http/dtos/sign-in/sign-in-response-dto';
import { IAuthService } from '../../services/auth/auth-service.types';
import { ITokenService } from '../../services/auth/token-service.types';

export class SignInUseCase {
  constructor(
    private readonly authService: IAuthService,
    private readonly tokenService: ITokenService,
  ) {}

  public async execute(data: SignInRequestDTO): Promise<SignInResponseDTO> {
    const userAccount = await this.authService.authenticate(data.email, data.password);
    const accessToken = this.tokenService.createToken(userAccount);
    return SignInResponseDTO.create({ type: 'Bearer', token: accessToken });
  }
}

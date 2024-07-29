import { UserAccountDTO } from '../../../../domain/dtos/user/user-account-dto';
import { SignInResponseDTO } from '../sign-in/sign-in-response-dto';

/**
 * @openapi
 * components:
 *   schemas:
 *     SignUpResponseDTO:
 *       type: object
 *       properties:
 *         user:
 *           $ref: '#/components/schemas/UserAccountDTO'
 *         session:
 *           $ref: '#/components/schemas/SignInResponseDTO'
 */
export class SignUpResponseDTO {
  user: UserAccountDTO;
  session: SignInResponseDTO;

  constructor(data: SignUpResponseDTO) {
    this.user = data.user;
    this.session = data.session;
  }

  public static create(data: SignUpResponseDTO): SignUpResponseDTO {
    return new SignUpResponseDTO(data);
  }
}

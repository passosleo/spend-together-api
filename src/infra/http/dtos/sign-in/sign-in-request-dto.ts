/**
 * @openapi
 * components:
 *   schemas:
 *     SignInRequestDTO:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 */
export class SignInRequestDTO {
  email: string;
  password: string;

  constructor(data: SignInRequestDTO) {
    this.email = data.email;
    this.password = data.password;
  }

  public static create(data: SignInRequestDTO): SignInRequestDTO {
    return new SignInRequestDTO(data);
  }
}

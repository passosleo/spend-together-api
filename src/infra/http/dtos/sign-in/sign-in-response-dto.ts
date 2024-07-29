/**
 * @openapi
 * components:
 *   schemas:
 *     SignInResponseDTO:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *         token:
 *           type: string
 */
export class SignInResponseDTO {
  type: 'Bearer';
  token: string;

  constructor(data: SignInResponseDTO) {
    this.type = data.type;
    this.token = data.token;
  }

  public static create(data: SignInResponseDTO): SignInResponseDTO {
    return new SignInResponseDTO(data);
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *    RecoverPasswordRequestDTO:
 *      type: object
 *      properties:
 *        newPassword:
 *          type: string
 *          minLength: 8
 *          required: false
 */
export class RecoverPasswordRequestDTO {
  newPassword?: string;
  token: string;

  constructor(data: RecoverPasswordRequestDTO) {
    this.newPassword = data.newPassword;
    this.token = data.token;
  }

  public static create(data: RecoverPasswordRequestDTO): RecoverPasswordRequestDTO {
    return new RecoverPasswordRequestDTO(data);
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *    SendRecoverPasswordRequestDTO:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          format: email
 */
export class SendRecoverPasswordRequestDTO {
  email: string;

  constructor(data: SendRecoverPasswordRequestDTO) {
    this.email = data.email;
  }

  public static create(data: SendRecoverPasswordRequestDTO): SendRecoverPasswordRequestDTO {
    return new SendRecoverPasswordRequestDTO(data);
  }
}

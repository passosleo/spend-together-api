/**
 * @openapi
 * components:
 *   schemas:
 *    SendVerifyEmailRequestDTO:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          format: email
 *          required: true
 */
export class SendVerifyEmailRequestDTO {
  email: string;

  constructor(data: SendVerifyEmailRequestDTO) {
    this.email = data.email;
  }

  public static create(data: SendVerifyEmailRequestDTO): SendVerifyEmailRequestDTO {
    return new SendVerifyEmailRequestDTO(data);
  }
}

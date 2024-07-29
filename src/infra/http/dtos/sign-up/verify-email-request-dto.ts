/**
 * @openapi
 * components:
 *   schemas:
 *    VerifyEmailRequestDTO:
 *      type: object
 *      properties:
 *        token:
 *          type: string
 *          required: true
 */
export class VerifyEmailRequestDTO {
  token: string;

  constructor(data: VerifyEmailRequestDTO) {
    this.token = data.token;
  }

  public static create(data: VerifyEmailRequestDTO): VerifyEmailRequestDTO {
    return new VerifyEmailRequestDTO(data);
  }
}

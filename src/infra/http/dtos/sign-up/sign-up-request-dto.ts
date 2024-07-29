/**
 * @openapi
 * components:
 *   schemas:
 *    SignUpRequestDTO:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *          minLength: 3
 *          maxLength: 50
 *          required: true
 *        name:
 *          type: string
 *          minLength: 3
 *          maxLength: 50
 *          required: false
 *        email:
 *          type: string
 *          format: email
 *          maxLength: 255
 *          required: true
 *        password:
 *          type: string
 *          minLength: 8
 *          required: true
 *        avatar:
 *          type: string
 *          format: uri
 *          required: false
 */
export class SignUpRequestDTO {
  email: string;
  name?: string;
  username: string;
  password: string;
  avatar?: string | null;

  constructor(data: SignUpRequestDTO) {
    this.email = data.email;
    this.name = data.name;
    this.username = data.username;
    this.password = data.password;
    this.avatar = data.avatar;
  }

  public static create(data: SignUpRequestDTO): SignUpRequestDTO {
    return new SignUpRequestDTO(data);
  }
}

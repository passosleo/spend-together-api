/**
 * @openapi
 * components:
 *   schemas:
 *     UserAccountDTO:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           format: uuid
 *         username:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         emailVerified:
 *           type: boolean
 *         avatar:
 *           type: string
 *         isEnabled:
 *           type: boolean
 *         isPublic:
 *           type: boolean
 *         receiveEmails:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
export class UserAccountDTO {
  userId: string;
  email: string;
  emailVerified: boolean;
  name: string | null;
  username: string;
  avatar: string | null;
  receiveEmails: boolean;
  isPublic: boolean;
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: UserAccountDTO) {
    this.userId = data.userId;
    this.email = data.email;
    this.emailVerified = data.emailVerified;
    this.name = data.name;
    this.username = data.username;
    this.avatar = data.avatar;
    this.isEnabled = data.isEnabled;
    this.isPublic = data.isPublic;
    this.receiveEmails = data.receiveEmails;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  public static create(data: UserAccountDTO) {
    return new UserAccountDTO(data);
  }
}

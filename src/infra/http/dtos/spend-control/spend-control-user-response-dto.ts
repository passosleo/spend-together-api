/**
 * @openapi
 * components:
 *   schemas:
 *     SpendControlUserResponseDTO:
 *       type: object
 *       properties:
 *         user:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             name:
 *               type: string
 *               nullable: true
 *             avatar:
 *               type: string
 *               nullable: true
 *         isOwner:
 *           type: boolean
 *         invitedAt:
 *           type: string
 *           format: date-time
 *         joinedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 */
export class SpendControlUserResponseDTO {
  user: {
    username: string;
    name: string | null;
    avatar: string | null;
  };
  isOwner: boolean;
  invitedAt: Date;
  joinedAt: Date | null;

  constructor(data: SpendControlUserResponseDTO) {
    this.user = {
      username: data.user.username,
      name: data.user.name,
      avatar: data.user.avatar,
    };
    this.isOwner = data.isOwner;
    this.invitedAt = data.invitedAt;
    this.joinedAt = data.joinedAt;
  }

  public static create(data: SpendControlUserResponseDTO): SpendControlUserResponseDTO {
    return new SpendControlUserResponseDTO(data);
  }
}

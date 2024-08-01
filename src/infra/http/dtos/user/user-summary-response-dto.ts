/**
 * @openapi
 * components:
 *   schemas:
 *     UserSummaryResponseDTO:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         name:
 *           type: string
 *           nullable: true
 *         avatar:
 *           type: string
 *           nullable: true
 */
export class UserSummaryResponseDTO {
  username: string;
  name: string | null;
  avatar: string | null;

  constructor(data: UserSummaryResponseDTO) {
    this.username = data.username;
    this.name = data.name;
    this.avatar = data.avatar;
  }

  public static create(data: UserSummaryResponseDTO): UserSummaryResponseDTO {
    return new UserSummaryResponseDTO(data);
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     SpendUserResponseDTO:
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
export class SpendUserResponseDTO {
  username: string;
  name: string | null;
  avatar: string | null;

  constructor(data: SpendUserResponseDTO) {
    this.username = data.username;
    this.name = data.name;
    this.avatar = data.avatar;
  }

  public static create(data: SpendUserResponseDTO): SpendUserResponseDTO {
    return new SpendUserResponseDTO(data);
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     SearchUserResponseDTO:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         name:
 *           type: string
 *         avatar:
 *           type: string
 */
export class SearchUserResponseDTO {
  username: string;
  name: string | null;
  avatar: string | null;

  constructor(data: SearchUserResponseDTO) {
    this.name = data.name;
    this.username = data.username;
    this.avatar = data.avatar;
  }

  public static create(data: SearchUserResponseDTO) {
    return new SearchUserResponseDTO(data);
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     SearchUserRequestDTO:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 */
export class SearchUserRequestDTO {
  username: string;

  constructor(data: SearchUserRequestDTO) {
    this.username = data.username;
  }

  public static create(data: SearchUserRequestDTO) {
    return new SearchUserRequestDTO(data);
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateUserRequestDTO:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           required: false
 *         isPublic:
 *           type: boolean
 *           required: false
 *         receiveEmails:
 *           type: boolean
 *           required: false
 */
export class UpdateUserRequestDTO {
  name?: string;
  isPublic?: boolean;
  receiveEmails?: boolean;

  constructor(data: UpdateUserRequestDTO) {
    this.name = data.name;
    this.isPublic = data.isPublic;
    this.receiveEmails = data.receiveEmails;
  }

  public static create(data: UpdateUserRequestDTO) {
    return new UpdateUserRequestDTO(data);
  }
}

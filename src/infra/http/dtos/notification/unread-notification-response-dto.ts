/**
 * @openapi
 * components:
 *   schemas:
 *    UnreadNotificationResponseDTO:
 *      type: object
 *      properties:
 *        hasUnread:
 *          type: boolean
 *        total:
 *          type: number
 */
export class UnreadNotificationResponseDTO {
  hasUnread: boolean;
  total: number;

  constructor(data: UnreadNotificationResponseDTO) {
    this.hasUnread = data.hasUnread;
    this.total = data.total;
  }

  public static create(data: UnreadNotificationResponseDTO): UnreadNotificationResponseDTO {
    return new UnreadNotificationResponseDTO(data);
  }
}

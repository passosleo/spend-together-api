/**
 * @openapi
 * components:
 *   schemas:
 *    NotificationResponseDTO:
 *      type: object
 *      properties:
 *        notificationId:
 *          type: string
 *          format: uuid
 *        userId:
 *          type: string
 *          format: uuid
 *        title:
 *          type: string
 *        content:
 *          type: string
 *        link:
 *          type: string
 *          nullable: true
 *        isRead:
 *          type: boolean
 *        isEnabled:
 *          type: boolean
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
 */
export class NotificationResponseDTO {
  notificationId: string;
  userId: string;
  title: string;
  content: string;
  link: string | null;
  isRead: boolean;
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: NotificationResponseDTO) {
    this.notificationId = data.notificationId;
    this.userId = data.userId;
    this.title = data.title;
    this.content = data.content;
    this.link = data.link;
    this.isRead = data.isRead;
    this.isEnabled = data.isEnabled;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  public static create(data: NotificationResponseDTO): NotificationResponseDTO {
    return new NotificationResponseDTO(data);
  }
}

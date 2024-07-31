export interface CreateNotificationData {
  notificationId?: string;
  userId: string;
  title: string;
  content: string;
  link?: string | null;
  isRead?: boolean;
  isEnabled?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Notification {
  notificationId: string;
  userId: string;
  title: string;
  content: string;
  link: string | null;
  isRead: boolean;
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: CreateNotificationData) {
    this.notificationId = data.notificationId as string;
    this.userId = data.userId;
    this.title = data.title;
    this.content = data.content;
    this.link = data.link ?? null;
    this.isRead = data.isRead ?? false;
    this.isEnabled = data.isEnabled ?? true;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
  }

  public static create(data: Notification): Notification {
    return new Notification(data);
  }
}

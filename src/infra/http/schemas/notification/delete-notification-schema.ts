import { z } from 'zod';
import { RequestSchema } from '../../../types/generic';

export const DeleteNotificationSchema: RequestSchema<{ notificationId: string }> = {
  params: {
    notificationId: z.string().uuid(),
  },
};

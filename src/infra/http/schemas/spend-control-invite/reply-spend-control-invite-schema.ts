import { z } from 'zod';
import { RequestSchema } from '../../../types/generic';

export const ReplySpendControlInviteSchema: RequestSchema<{ spendControlInviteId: string; isAccepted: boolean }> = {
  params: {
    spendControlInviteId: z.string().uuid(),
  },
  body: {
    isAccepted: z.boolean(),
  },
};

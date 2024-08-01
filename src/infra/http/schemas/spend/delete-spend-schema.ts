import { z } from 'zod';
import { RequestSchema } from '../../../types/generic';

export const DeleteSpendSchema: RequestSchema<{ spendId: string }> = {
  params: {
    spendId: z.string().uuid(),
  },
};

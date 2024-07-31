import { z } from 'zod';
import { RequestSchema } from '../../../types/generic';

export const DeleteSpendControlSchema: RequestSchema<{ spendControlId: string }> = {
  params: {
    spendControlId: z.string().uuid(),
  },
};

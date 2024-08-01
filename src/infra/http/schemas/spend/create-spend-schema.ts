import { z } from 'zod';
import { RequestSchema } from '../../../types/generic';
import { CreateSpendRequestDTO } from '../../dtos/spend/create-spend-request-dto';

export const CreateSpendSchema: RequestSchema<CreateSpendRequestDTO> = {
  body: {
    spendControlId: z.string().uuid(),
    spendCategoryId: z.string().uuid(),
    description: z.string().max(50).trim().optional(),
    amount: z.number().positive(),
  },
};

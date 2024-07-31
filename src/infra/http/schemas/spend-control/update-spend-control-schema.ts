import { z } from 'zod';
import { RequestSchema } from '../../../types/generic';
import { UpdateSpendControlRequestDTO } from '../../dtos/spend-control/update-spend-control-request-dto';

export const UpdateSpendControlSchema: RequestSchema<UpdateSpendControlRequestDTO> = {
  params: {
    spendControlId: z.string().uuid(),
  },
  body: {
    name: z.string().min(3).max(255).optional(),
    description: z.string().min(3).max(255).optional(),
    color: z
      .string()
      .min(7)
      .max(7)
      .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
      .trim()
      .toLowerCase()
      .optional(),
  },
};

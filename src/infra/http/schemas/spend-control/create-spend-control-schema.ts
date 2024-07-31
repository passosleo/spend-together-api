import { z } from 'zod';
import { RequestSchema } from '../../../types/generic';
import { CreateSpendControlRequestDTO } from '../../dtos/spend-control/create-spend-control-request-dto';

export const CreateSpendControlSchema: RequestSchema<CreateSpendControlRequestDTO> = {
  body: {
    name: z.string().min(3).max(255),
    description: z.string().min(3).max(255).optional(),
    invitedUsernames: z.array(z.string()),
    color: z
      .string()
      .min(7)
      .max(7)
      .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
      .trim()
      .toLowerCase(),
  },
};

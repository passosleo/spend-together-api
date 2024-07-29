import { z } from 'zod';
import { RequestSchema } from '../../../types/generic';
import { UpdateUserRequestDTO } from '../../dtos/user/update-user-request-dto';

export const UpdateUserSchema: RequestSchema<UpdateUserRequestDTO> = {
  body: {
    name: z.string().min(3).max(255).toUpperCase().optional(),
    isPublic: z.boolean().optional(),
    receiveEmails: z.boolean().optional(),
  },
};

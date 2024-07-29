import { z } from 'zod';
import { RequestSchema } from '../../../types/generic';
import { SearchUserRequestDTO } from '../../dtos/user/search-user-request-dto';

export const SearchUserSchema: RequestSchema<SearchUserRequestDTO> = {
  query: {
    username: z.string().min(3).max(255),
  },
};

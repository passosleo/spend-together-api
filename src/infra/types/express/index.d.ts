import { UserAccountDTO } from '../../../domain/dtos/user/user-account-dto';
import { HttpStatusCode } from '../../exception';

declare global {
  namespace Express {
    interface Request {
      account: UserAccountDTO;
    }

    interface Response {
      sendResponse<T>(status: HttpStatusCode, data?: T): void;
    }
  }
}

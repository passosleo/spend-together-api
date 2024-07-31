import { Response, NextFunction, Request } from 'express';
import { HttpStatusCode, ResponseMessages } from '../../exception';

export async function responseMiddleware(req: Request, res: Response, next: NextFunction) {
  res.sendResponse = <T>(status: HttpStatusCode, data?: T) => {
    res.status(status).json({
      status,
      message: ResponseMessages[status],
      data,
    });
  };

  next();
}

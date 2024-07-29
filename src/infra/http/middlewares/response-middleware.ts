import { Response, NextFunction, Request } from 'express';
import { HttpStatusCode, ResponseMessages } from '../../exception';

export async function responseMiddleware(req: Request, res: Response, next: NextFunction) {
  function formatHttpStatusMessage(input: string) {
    return input
      .toLowerCase()
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  res.sendResponse = <T>(status: HttpStatusCode, data?: T) => {
    res.status(status).json({
      status,
      message: formatHttpStatusMessage(ResponseMessages[status]),
      data,
    });
  };

  next();
}

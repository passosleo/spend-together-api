import { Request, Response, NextFunction } from 'express';
import { Exception, HttpStatusCode, ResponseMessages } from '../../exception';
import { DefaultError } from '../../types/generic';
import { Logger } from '../../utils/logger';

export async function errorMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
  const { method, path, params, query, body } = req;

  const ctx = {
    method,
    path,
    params,
    query,
    body,
    error: JSON.stringify(error.stack, null, 2),
  };

  if (error instanceof Exception) {
    if (error.statusCode === HttpStatusCode.INTERNAL_SERVER_ERROR) {
      Logger.error(ctx);
    }

    return res.sendResponse(error.statusCode, {
      errors: [
        {
          message: error.message,
        },
      ],
    });
  } else {
    Logger.error(ctx);
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      message: ResponseMessages[HttpStatusCode.INTERNAL_SERVER_ERROR],
      errors: [
        {
          message: 'Something went wrong',
        },
        {
          message: 'An unexpected error occurred. Please try again later.',
        },
      ] as DefaultError[],
    });
  }
}

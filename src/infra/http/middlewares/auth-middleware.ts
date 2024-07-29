import { Request, Response, NextFunction } from 'express';
import { Exception, HttpStatusCode } from '../../exception';
import { UserAccountDTO } from '../../../domain/dtos/user/user-account-dto';
import { ITokenService } from '../../../application/services/auth/token-service.types';
import { JWTService } from '../../services/auth/jwt-service';

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     JWTAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
export async function authenticationMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.sendResponse(HttpStatusCode.UNAUTHORIZED, {
        success: false,
        errors: [
          {
            message: 'Authorization header not found',
          },
          {
            message: 'Token not found',
          },
        ],
      });
    }

    const accessToken = authorization.split(' ')[1];

    const tokenService: ITokenService = new JWTService();
    const account = tokenService.verifyToken<UserAccountDTO>(accessToken);

    if (!account || !account.userId) throw new Exception('UNAUTHORIZED', 'Invalid token');

    req.account = UserAccountDTO.create(account);

    next();
  } catch {
    return res.sendResponse(HttpStatusCode.UNAUTHORIZED, {
      success: false,
      errors: [
        {
          message: 'Invalid token',
        },
        {
          message: 'You are not authorized to access this resource',
        },
      ],
    });
  }
}

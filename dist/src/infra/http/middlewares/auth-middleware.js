"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationMiddleware = void 0;
const exception_1 = require("../../exception");
const user_account_dto_1 = require("../../../domain/dtos/user/user-account-dto");
const jwt_service_1 = require("../../services/auth/jwt-service");
/**
 * @openapi
 * components:
 *   securitySchemes:
 *     JWTAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
async function authenticationMiddleware(req, res, next) {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.sendResponse(exception_1.HttpStatusCode.UNAUTHORIZED, {
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
        const tokenService = new jwt_service_1.JWTService();
        const accessToken = authorization.split(' ')[1];
        const account = tokenService.verifyToken(accessToken);
        if (!account)
            throw new exception_1.Exception('UNAUTHORIZED', 'Invalid token');
        req.account = user_account_dto_1.UserAccountDTO.create(account);
        next();
    }
    catch {
        return res.sendResponse(exception_1.HttpStatusCode.UNAUTHORIZED, {
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
exports.authenticationMiddleware = authenticationMiddleware;

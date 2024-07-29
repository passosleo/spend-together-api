"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const exception_1 = require("../../exception");
const logger_1 = require("../../utils/logger");
async function errorMiddleware(error, req, res, next) {
    const { method, path, params, query, body } = req;
    const ctx = {
        method,
        path,
        params,
        query,
        body,
        error: JSON.stringify(error.stack, null, 2),
    };
    if (error instanceof exception_1.Exception) {
        if (error.statusCode === exception_1.HttpStatusCode.INTERNAL_SERVER_ERROR) {
            logger_1.Logger.error(ctx);
        }
        return res.sendResponse(error.statusCode, {
            success: false,
            errors: [
                {
                    message: error.message,
                },
            ],
        });
    }
    else {
        logger_1.Logger.error(ctx);
        return res.status(exception_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: exception_1.HttpStatusCode.INTERNAL_SERVER_ERROR,
            message: exception_1.ResponseMessages[exception_1.HttpStatusCode.INTERNAL_SERVER_ERROR],
            errors: [
                {
                    message: 'Something went wrong',
                },
                {
                    message: 'An unexpected error occurred. Please try again later.',
                },
            ],
        });
    }
}
exports.errorMiddleware = errorMiddleware;

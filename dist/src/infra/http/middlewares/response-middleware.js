"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseMiddleware = void 0;
const exception_1 = require("../../exception");
async function responseMiddleware(req, res, next) {
    function formatHttpStatusMessage(input) {
        return input
            .toLowerCase()
            .split('_')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    res.sendResponse = (status, data) => {
        res.status(status).json({
            status,
            message: formatHttpStatusMessage(exception_1.ResponseMessages[status]),
            data,
        });
    };
    next();
}
exports.responseMiddleware = responseMiddleware;

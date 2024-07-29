"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = require("../infra/http/middlewares/auth-middleware");
const swagger_config_1 = require("../config/swagger.config");
const app_1 = require("../infra/app");
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("../infra/http/routes");
const validate_middleware_1 = require("../infra/http/middlewares/validate-middleware");
const response_middleware_1 = require("../infra/http/middlewares/response-middleware");
const error_middleware_1 = require("../infra/http/middlewares/error-middleware");
const server = new app_1.Application({
    routes: routes_1.routes,
    swagger: {
        enabled: true,
        path: '/api/v1/docs',
        config: swagger_config_1.swaggerSpec,
    },
    middlewares: {
        global: [(0, cors_1.default)(), (0, morgan_1.default)('dev')],
        authentication: auth_middleware_1.authenticationMiddleware,
        validation: validate_middleware_1.validationMiddleware,
        response: response_middleware_1.responseMiddleware,
        error: error_middleware_1.errorMiddleware,
    },
});
server.start();

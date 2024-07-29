"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const express_1 = __importDefault(require("express"));
const app_config_1 = require("../config/app.config");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const logger_1 = require("./utils/logger");
const path_1 = __importDefault(require("path"));
class Application {
    app;
    config;
    routes;
    middlewares;
    constructor({ name = app_config_1.config.app.name, host = app_config_1.config.app.host, port = app_config_1.config.app.port, baseUrl = app_config_1.config.app.baseUrl, swagger, routes = [], middlewares = {}, }) {
        this.app = (0, express_1.default)();
        this.config = {
            name,
            host,
            port,
            baseUrl,
            swagger,
        };
        this.routes = routes;
        this.middlewares = middlewares;
        this.initialize();
    }
    initialize() {
        this.app.use(express_1.default.json({ limit: '50mb' }));
        this.app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
        this.app.set('views', path_1.default.join(__dirname, 'views'));
        this.app.set('view engine', 'ejs');
        this.app.use('/public', express_1.default.static('public'));
        if (this.config.swagger?.enabled) {
            this.app.use(this.config.swagger.path, swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(this.config.swagger.config));
        }
        if (this.middlewares.global) {
            this.app.use(this.middlewares.global);
        }
        if (this.middlewares.response) {
            this.app.use(this.middlewares.response);
        }
        this.setupRoutes();
        if (this.middlewares.error) {
            this.app.use(this.middlewares.error);
        }
    }
    setupRoutes() {
        this.routes.forEach((route) => {
            const routeMiddlewaresList = new Array();
            if (route.auth) {
                if (this.middlewares.authentication) {
                    routeMiddlewaresList.push(this.middlewares.authentication);
                }
                else {
                    logger_1.Logger.warn(`Route "${route.path}" requires authentication but no auth middleware is provided`);
                }
            }
            if (route.schema) {
                if (this.middlewares.validation) {
                    routeMiddlewaresList.push(this.middlewares.validation(route.schema));
                }
                else {
                    logger_1.Logger.warn(`Route "${route.path}" requires validation but no validation middleware is provided`);
                }
            }
            if (route.middlewares) {
                routeMiddlewaresList.push(...route.middlewares);
            }
            this.app[route.method.toLowerCase()](route.path, routeMiddlewaresList, route.controller);
            logger_1.Logger.info(`Route ${route.method} ${route.path} successfully registered`);
        });
    }
    checkDatabaseConnection() {
        // Check database connection
        // If connection failed, throw an error
        // If connection is successful, log a message
    }
    start({ port = this.config.port } = {}) {
        logger_1.Logger.info('Application is ready to start');
        this.app.listen(port, () => {
            logger_1.Logger.info(`Application ${this.config.name ?? ''} successfully started on ${this.config.baseUrl}`);
            if (this.config.swagger?.enabled) {
                logger_1.Logger.info(`Swagger is available under ${this.config.baseUrl}${this.config.swagger.path}`);
            }
        });
    }
    stop() {
        logger_1.Logger.info('Shutting down application...');
        process.exit(0);
    }
}
exports.Application = Application;

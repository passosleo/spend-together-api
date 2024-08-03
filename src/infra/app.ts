import express, { Express, RequestHandler } from 'express';
import { config } from '../config/app.config';
import swaggerUi from 'swagger-ui-express';
import { ApplicationConfig, ApplicationMiddlewares, ApplicationOptions, Route } from './types/generic';
import { Logger } from './utils/logger';
import path from 'path';

export class Application {
  private readonly app: Express;
  private readonly config: ApplicationConfig;
  private readonly routes: Route[];
  private readonly middlewares: ApplicationMiddlewares;

  constructor({
    name = config.app.name,
    host = config.app.host,
    port = config.app.port,
    baseUrl = config.app.baseUrl,
    swagger,
    routes = [],
    middlewares = {},
  }: ApplicationOptions) {
    this.app = express();
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

  private initialize() {
    this.app.use(express.json({ limit: '50mb' }));
    this.app.use(express.urlencoded({ limit: '50mb', extended: true }));
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', 'ejs');
    this.app.use('/public', express.static('public'));

    if (this.config.swagger?.enabled) {
      this.app.use(
        this.config.swagger.path,
        swaggerUi.serve,
        swaggerUi.setup(this.config.swagger.config, {
          customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css',
          customCss:
            '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
        }),
      );
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

  private setupRoutes() {
    this.routes.forEach((route) => {
      const routeMiddlewaresList = new Array<RequestHandler>();

      if (route.auth) {
        if (this.middlewares.authentication) {
          routeMiddlewaresList.push(this.middlewares.authentication);
        } else {
          Logger.warn(`Route "${route.path}" requires authentication but no auth middleware is provided`);
        }
      }

      if (route.schema) {
        if (this.middlewares.validation) {
          routeMiddlewaresList.push(this.middlewares.validation(route.schema));
        } else {
          Logger.warn(`Route "${route.path}" requires validation but no validation middleware is provided`);
        }
      }

      if (route.middlewares) {
        routeMiddlewaresList.push(...route.middlewares);
      }

      this.app[route.method.toLowerCase() as keyof Express](route.path, routeMiddlewaresList, route.controller);

      Logger.info(`Route ${route.method} ${route.path} successfully registered`);
    });
  }

  private checkDatabaseConnection() {
    // Check database connection
    // If connection failed, throw an error
    // If connection is successful, log a message
  }

  start({ port = this.config.port } = {}) {
    Logger.info('Application is ready to start');

    this.app.listen(port, () => {
      Logger.info(`Application ${this.config.name ?? ''} successfully started on ${this.config.baseUrl}`);

      if (this.config.swagger?.enabled) {
        Logger.info(`Swagger is available under ${this.config.baseUrl}${this.config.swagger.path}`);
      }
    });
  }

  stop() {
    Logger.info('Shutting down application...');
    process.exit(0);
  }
}

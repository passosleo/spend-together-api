import { authenticationMiddleware } from '../infra/http/middlewares/auth-middleware';
import { swaggerOptions, swaggerSpec } from '../config/swagger.config';
import { Application } from '../infra/app';
import morgan from 'morgan';
import cors from 'cors';
import { routes } from '../infra/http/routes';
import { validationMiddleware } from '../infra/http/middlewares/validate-middleware';
import { responseMiddleware } from '../infra/http/middlewares/response-middleware';
import { errorMiddleware } from '../infra/http/middlewares/error-middleware';

const server = new Application({
  routes,
  swagger: {
    enabled: true,
    path: '/api/v1/docs',
    config: swaggerSpec,
    options: swaggerOptions,
  },
  middlewares: {
    global: [cors(), morgan('dev')],
    authentication: authenticationMiddleware,
    validation: validationMiddleware,
    response: responseMiddleware,
    error: errorMiddleware,
  },
});

server.start();

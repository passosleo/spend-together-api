import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { config } from './app.config';
import { version, description } from '../../package.json';

const spec: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: config.app.name,
      version,
      description,
    },
    servers: [
      {
        url: config.app.baseUrl,
      },
    ],
    consumes: ['application/json'],
    produces: ['application/json'],
    schemes: ['http'],
  },
  apis: ['src/**/*.{ts,js}'],
};

export const swaggerOptions: swaggerUi.SwaggerUiOptions = {
  customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css',
  customCss:
    '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
};

export const swaggerSpec = swaggerJsdoc(spec);

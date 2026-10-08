import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title:       'CareerForge AI — API',
      version:     '1.0.0',
      description: 'REST API for the CareerForge AI placement preparation platform.',
      contact: { name: 'CareerForge Team' },
    },
    servers: [
      { url: 'http://localhost:5000', description: 'Local development' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type:         'http',
          scheme:       'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [
    './src/models/*.js',
    './src/modules/**/*.routes.js',
    './src/modules/**/*.js',
  ],
};

export const swaggerSpec = swaggerJsdoc(options);

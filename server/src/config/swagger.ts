import { Express } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movies MERN API",
      version: "1.0.0",
      description: "API documentation for the Movies MERN application",
    },
    servers: [
      {
        url: "http://localhost:5000/api/v1",
      },
    ],
  },
  apis: [
    "./src/controllers/auth/*.ts",
    "./src/controllers/users/*.ts",
    "./src/routes/auth/*.ts",
    "./src/routes/users/*.ts",
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

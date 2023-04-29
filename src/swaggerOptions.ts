import {envVars} from "./constants"

export const swaggerOptions = {
    swaggerDefinition: {
      openapi: "3.0.3",
      info: {
        title: "API Documentation",
        version: "1.0.0",
        description: "API documentation of Housing Backend",
        contact: {
          name: "gGh00sTt",
        },
        servers: [{url:`http://localhost:${envVars.PORT}`}],
      },
    },
    apis: [`${__dirname}/routes/*.js`],
  };
  

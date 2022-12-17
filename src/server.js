const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const routes = require("./modules/routes");
const KEYS = require("./common/config/keys");
const createError = require("./common/helpers/createError");
const { RESPONSE } = require("./common/constants/response");
const { HTTP } = require("./common/constants/http");
// const swaggerUi = require('swagger-ui-express')
// const swaggerDoc = require('../swagger.json');

const models = require("./db/models")
const { Op, QueryTypes } = require("sequelize");
const app = express();

app.disable("x-powered-by");

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(morgan("dev"));

//swagger documentation
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))


app.use(function (_err, _req, _res, _) {
  if (_err instanceof SyntaxError) {
    return _res.status(HTTP.BAD_REQUEST).json({
      code: HTTP.UNPROCESSABLE_ENTITY,
      status: RESPONSE.ERROR,
      message: "Invalid JSON payload passed.",
      data: null,
    });
  }
});

const apiRouter = express.Router();
apiRouter.use(routes());

// handler for route-not-found
apiRouter.use((_req, _res, next) => {
  next(
    createError(HTTP.NOT_FOUND, [
      {
        code: HTTP.NOT_FOUND,
        status: RESPONSE.ERROR,
        message: "Route not found.",
        data: null,
      },
    ])
  );
});

// error handler for api router
apiRouter.use((error, _req, res, _next) => {
  console.log(error);
  const initialError = error;
  if (!error.statusCode) {
    error = createError(HTTP.SERVER_ERROR, [
      {
        code: HTTP.SERVER_ERROR,
        status: RESPONSE.ERROR,
        message: initialError.message || "Internal Server Error.",
        data: error.data,
        stack: error.stack,
      },
    ]);
  }

  return res.status(error.statusCode).json({
    code: error.statusCode,
    status: error.status,
    message: error.message,
    data: error.data || null,
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
});

const apiURL = `/afro-market/${KEYS.appVersion}`;

app.use(apiURL, apiRouter);

module.exports = app;

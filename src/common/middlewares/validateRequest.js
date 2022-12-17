const { HTTP } = require("../constants/http");
const { RESPONSE } = require("../constants/response");
const createError = require("../helpers/createError");

/**
 * Creates a middleware to validate request payloads with Joi schemas
 */
module.exports = function validateRequest(schema, field = "body") {
  return function (req, _res, next) {
    const result = schema.validate(req[field], {
      abortEarly: false,
      stripUnknown: true,
      errors: {
        wrap: {
          label: null,
        },
      },
    });

    if (result.error) {
      const parsedResult = Array.isArray(result.error.details)
        ? result.error.details.map((error) => ({
            [String(error.path[0])]: error.message,
          }))
        : [
            {
              [String(result.error.message.split(" ")[0])]:
                result.error.message,
            },
          ];

      if (req.files && req.files.length) {
        const files = req.files.map((item) => {
          return {
            Key: item.key,
          };
        });
        deleteFile(process.env.S3_ID, process.env.S3_SECRET, files);
      }

      return next(
        createError(HTTP.UNPROCESSABLE_ENTITY, [
          {
            status: RESPONSE.ERROR,
            statusCode: HTTP.UNPROCESSABLE_ENTITY,
            message: "validation failed",
            data: parsedResult,
          },
        ])
      );
    }

    req[field] = result.value;
    return next();
  };
};

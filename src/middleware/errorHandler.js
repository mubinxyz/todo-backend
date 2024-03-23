const { constants } = require("../../constants");

const errorHandler = (err, req, res, next) => {
  // if (err.name === "CastError") {
  //   // Treat CastError as a 404 error
  //   return res.status(404).json({
  //     title: "Not Found",
  //     message: `Resource not found: ${err.message}`,
  //     stackTrace: err.stack,
  //   });
  // }

  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      res.json({
        title: `Unknown erro: ${err.name}`,
        message: err.message,
        stackTrace: err.stack,
      });
      console.log(err);
      break;
  }
};

module.exports = errorHandler;

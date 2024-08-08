const httpStatus = require("http-status");

const errorHandler = (err, req, res, next) => {
  console.error(err); // Log the error for debugging

  if (err.name === "ValidationError") {
    // Mongoose validation error
    console.log(err.errors);
    return res.status(httpStatus.BAD_REQUEST).send({
      message: "Validation error",
      errors: err.errors,
    });
  }

  if (err.name === "CastError") {
    // Mongoose cast error
    return res.status(httpStatus.BAD_REQUEST).send({
      message: "Invalid ID format",
    });
  }

  // Handle other errors
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    message: "An unexpected error occurred",
    error: err.message,
  });
};

module.exports = errorHandler;

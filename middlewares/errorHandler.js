const { HTTP_SERVER_ERROR, HTTP_BAD_REQUEST } = require('../errors/statusErrors');
const messages = require('../errors/constantsMessages');

const errorHandler = (err, req, res, next) => {
  const { statusCode = HTTP_SERVER_ERROR, message } = err;
  if (message === 'Validation failed') {
    res
      .status(HTTP_BAD_REQUEST)
      .send({ message: messages.messageInvalidData });
  } else {
    res
      .status(statusCode)
      .send({
        message: statusCode === HTTP_SERVER_ERROR
          ? messages.messageServerError
          : message,
      });
  }
  next();
};

module.exports = errorHandler;

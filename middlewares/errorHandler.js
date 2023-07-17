const { HTTP_SERVER_ERROR, HTTP_BAD_REQUEST } = require('../errors/statusErrors');

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (message === 'Validation failed') {
    res
      .status(HTTP_BAD_REQUEST)
      .send({ message: 'Переданы некорректные данные' });
  } else {
    res
      .status(statusCode)
      .send({
        message: statusCode === HTTP_SERVER_ERROR
          ? 'На сервере произошла ошибка'
          : message,
      });
  }
  next();
};

module.exports = errorHandler;

const { HTTP_BAD_REQUEST } = require('./statusErrors');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_BAD_REQUEST;
  }
}

module.exports = BadRequestError;

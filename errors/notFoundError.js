const { HTTP_NOT_FOUND } = require('./statusErrors');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_NOT_FOUND;
  }
}

module.exports = NotFoundError;

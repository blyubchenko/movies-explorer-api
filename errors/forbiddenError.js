const { HTTP_FORBIDDEN } = require('./statusErrors');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_FORBIDDEN;
  }
}

module.exports = ForbiddenError;

const { HTTP_UNAUTHORIZED } = require('./statusErrors');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;

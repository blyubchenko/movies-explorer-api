const { HTTP_CONFLICT } = require('./statusErrors');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_CONFLICT;
  }
}

module.exports = ConflictError;

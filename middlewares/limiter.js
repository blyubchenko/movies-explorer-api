const rateLimit = require('express-rate-limit');
const ManyRequestError = require('../errors/manyRequest');
const messages = require('../errors/constantsMessages');

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  handler: () => {
    throw new ManyRequestError(messages.messageRateLimitExceeded);
  },
});

module.exports = limiter;

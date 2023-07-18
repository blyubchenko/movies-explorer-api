const rateLimit = require('express-rate-limit');
const ManyRequestError = require('../errors/manyRequest');

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  handler: () => {
    throw new ManyRequestError('Превышен лимит запросов. Попробуйте позже.');
  },
});

module.exports = limiter;

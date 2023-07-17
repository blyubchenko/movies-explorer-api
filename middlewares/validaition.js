const { celebrate, Joi } = require('celebrate');

const regUrlLink = /^(https?:\/\/)(www\.)?([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]){1,}\.([a-zA-Z0-9]){1,}(\/([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]){1,})?/;

const postMoviesValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().regex(regUrlLink).required(),
    trailerLink: Joi.string().regex(regUrlLink).required(),
    thumbnail: Joi.string().regex(regUrlLink).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const patchUsersValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const deleteMoviesValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

const signupValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  postMoviesValidation,
  patchUsersValidation,
  deleteMoviesValidation,
  signupValidation,
  signinValidation,
};

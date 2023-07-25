const mongoose = require('mongoose');
const Movie = require('../models/movie');
const { HTTP_CREATED, HTTP_OK } = require('../errors/statusErrors');
const BadRequestError = require('../errors/badRequest');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');
const messages = require('../errors/constantsMessages');

const getMovies = (req, res, next) => {
  const ownerId = req.user._id;
  Movie.find({ owner: ownerId })
    .populate('owner')
    .then((movies) => {
      if (!movies || movies.length === 0) {
        throw new NotFoundError(messages.messageNoSavedMovies);
      }
      res.status(HTTP_OK).send(movies);
    })
    .catch(next);
};

const postMovies = (req, res, next) => {
  Movie.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((movie) => res.status(HTTP_CREATED).send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(messages.messageInvalidData));
      } else {
        next(err);
      }
    });
};

const deleteMovies = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(messages.messageMovieNotFound);
      }
      if (JSON.stringify(movie.owner) !== JSON.stringify(req.user._id)) {
        throw new ForbiddenError(messages.messageCannotDeleteOthersMovie);
      }
      return movie.deleteOne();
    })
    .then(() => res.status(HTTP_OK).send({ message: messages.messageMovieDeleted }))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError(messages.messageInvalidData));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  postMovies,
  deleteMovies,
};

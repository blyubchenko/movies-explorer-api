const mongoose = require('mongoose');
const Movie = require('../models/movie');
const { HTTP_CREATED, HTTP_OK } = require('../errors/statusErrors');
const BadRequestError = require('../errors/badRequest');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');

const getMovies = (req, res, next) => {
  Movie.find()
    .populate('owner')
    .then((movies) => {
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
        next(new BadRequestError('Переданы некорректные данные при публикации фильма'));
      } else {
        next(err);
      }
    });
};

const deleteMovies = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с указанным _id не найден');
      }
      if (JSON.stringify(movie.owner) !== JSON.stringify(req.user._id)) {
        throw new ForbiddenError('Нельзя удалять чужие фильмы');
      }
      return movie.deleteOne();
    })
    .then(() => res.status(HTTP_OK).send({ message: 'Фильм удален' }))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Переданы некорректные данные для удаления фильма'));
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

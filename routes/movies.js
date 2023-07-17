const router = require('express').Router();
const { getMovies, postMovies, deleteMovies } = require('../controllers/movies');
const { postMoviesValidation, deleteMoviesValidation } = require('../middlewares/validaition');

router.get('', getMovies);
router.post('', postMoviesValidation, postMovies);
router.delete('/:movieId', deleteMoviesValidation, deleteMovies);

module.exports = router;

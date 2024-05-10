const router = require('express').Router();
const {auth} = require('../middlewares/auth');

// EndPoint : /api/auth
router.use('/auth', require('./auth'));

// EndPoint : /api/documents
router.use('/documents', require('./documents'));

//Check for authentication
router.use(auth);
// EndPoint : /api/users
router.use('/users', require('./user'));
// EndPoint : /api/recipe_books
router.use('/recipe_books', require('./recipe_book'));
// EndPoint : /api/recipes
// router.use('/recipes', require('./recipe'));


module.exports = router;
const router = require('express').Router();
const recipeBookCtrl = require('../controllers/recipe_book');
const {isLogin} = require('../middlewares/auth');
const { authorize } = require('../middlewares/authorize');
const RecipeBook = require('../models/RecipeBook');

router.use(isLogin)

router.route('/')
.get(recipeBookCtrl.list)
.post(recipeBookCtrl.create);

router.route('/:id')
.get(recipeBookCtrl.read)
.put( authorize(RecipeBook), recipeBookCtrl.update)
.patch(recipeBookCtrl.update)
.delete(recipeBookCtrl.delete);

module.exports = router;
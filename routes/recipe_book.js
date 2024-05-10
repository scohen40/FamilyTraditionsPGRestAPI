const router = require('express').Router();
const recipeBookCtrl = require('../controllers/recipe_book');
const {isLogin} = require('../middlewares/auth');
router.use(isLogin)

router.route('/')
.get(recipeBookCtrl.list)
.post(recipeBookCtrl.create);

router.route('/:id')
.get(recipeBookCtrl.read)
.put(recipeBookCtrl.update)
.patch(recipeBookCtrl.update)
.delete(recipeBookCtrl.delete);

module.exports = router;
const router = require('express').Router();
const recipeCtrl = require('../controllers/recipe');
const {isLogin} = require('../middlewares/auth');

router.use(isLogin)

router.route('/')
.get(recipeCtrl.list)
.post(recipeCtrl.create);

router.route('/:id')
.get(recipeCtrl.read)
.put(recipeCtrl.update)
.patch(recipeCtrl.update)
.delete(recipeCtrl.delete);

module.exports = router;
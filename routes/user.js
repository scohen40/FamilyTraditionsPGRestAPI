const router = require('express').Router();
const userCntrl = require('../controllers/user');


router.route('/')
.get(userCntrl.list)
.post(userCntrl.create);

router.route('/:id')
.get(userCntrl.read)
.put(userCntrl.update)
.patch(userCntrl.update)
.delete(userCntrl.delete);

module.exports = router;
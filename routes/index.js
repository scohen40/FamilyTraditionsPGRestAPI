const router = require('express').Router();


// EndPoint : /api/users
router.use('/users', require('./user'));

// EndPoint : /api/auth
// router.use('/users', require('./auth'));

module.exports = router;
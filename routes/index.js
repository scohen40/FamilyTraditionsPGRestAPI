const router = require('express').Router();


// EndPoint : /api/users
router.use('/users', require('./user'));
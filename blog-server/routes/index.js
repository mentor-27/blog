const { Router } = require('express');

const router = Router({ mergeParams: true });

router.use('/', require('./auth'));
router.use('/posts', require('./post'));
router.use('/users', require('./user'));

module.exports = router;

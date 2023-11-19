const router = require('express').Router()
router.use('/auth', require('./auth'));
router.use('/tokens', require('./token'));
router.use('/users', require('./user'));
router.use('/categories', require('./category'))
router.use('/brands', require('./brand'));
router.use('/firms', require('./firms'));
router.use('/products', require('./product'));
router.use('/sales', require('./sale'));
router.use('/purchases', require('./purchase'))
router.use('/documents', require('./document'))

module.exports = router;
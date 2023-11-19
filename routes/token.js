const router = require('express').Router()

const tokenCtrl = require('../controllers/token')

router.route('/')
.get(tokenCtrl.list)
.post(tokenCtrl.create)

router.route('/:id')
.get(tokenCtrl.read)
.put(tokenCtrl.update)
.patch(tokenCtrl.update)
.delete(tokenCtrl.delete)

module.exports = router;
const router = require('express').Router()

const ctrl = require('../controllers/user')

router.route('/')
.get(ctrl.list)
.post(ctrl.create)

router.route('/:id')
.get(ctrl.read)
.put(ctrl.update)
.patch(ctrl.update)
.delete(ctrl.delete)

module.exports = router;
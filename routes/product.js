const router = require('express').Router()
const ctrl = require('../controllers/product');

const { isAdmin, isStaff, isLogin} = require('../middlewares/permissions')
router.route('/')
.get(isLogin,  ctrl.list)
.post(isStaff, ctrl.create)

router.route('/:id')
.get(isLogin, ctrl.read)
.put(isStaff, ctrl.update)
.patch(isStaff, ctrl.update)
.delete(isAdmin, ctrl.delete)

module.exports = router;
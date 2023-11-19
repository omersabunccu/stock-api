const router = require('express').Router()
const catCtrl = require('../controllers/category')

const { isAdmin, isStaff} = require('../middlewares/permissions')
router.route('/')
.get(isStaff,  catCtrl.list)
.post(isAdmin, catCtrl.create)

router.route('/:id')
.get(isStaff, catCtrl.read)
.put(isAdmin, catCtrl.update)
.patch(isAdmin, catCtrl.update)
.delete(isAdmin, catCtrl.delete)

module.exports = router;
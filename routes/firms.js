const router = require('express').Router()
const firmCtrl = require('../controllers/firms');
const upload = require('../middlewares/upload')

const { isAdmin, isStaff} = require('../middlewares/permissions')
router.route('/')
.get(isStaff,  firmCtrl.list)
.post(isStaff, upload.single("image"), firmCtrl.create)

router.route('/:id')
.get(isStaff, firmCtrl.read)
.put(isStaff, upload.single("image"),firmCtrl.update)
.patch(isStaff,upload.single("image"), firmCtrl.update)
.delete(isAdmin, firmCtrl.delete)

module.exports = router;
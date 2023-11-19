const router = require('express').Router()
const brandCtrl = require('../controllers/brand');
const upload = require('../middlewares/upload')

const { isAdmin, isStaff} = require('../middlewares/permissions')
router.route('/')
.get(isStaff,  brandCtrl.list)
.post(isStaff, upload.single("image"), brandCtrl.create)

router.route('/:id')
.get(isStaff, brandCtrl.read)
.put(isAdmin, upload.single("image"),brandCtrl.update)
.patch(isAdmin,upload.single("image"), brandCtrl.update)
.delete(isAdmin, brandCtrl.delete)

module.exports = router;
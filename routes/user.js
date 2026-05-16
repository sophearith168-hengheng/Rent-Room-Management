const express = require('express')
const router = express.Router()
const user = require('../controller/user')

router.get('/', user.getUser)
router.get('/:id', user.getUserByID)
router.post('/', user.createTenantByAdmin)
router.put('/:id', user.updateuser)
router.delete('/:id', user.deleteuser)

module.exports = router;
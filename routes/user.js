const express = require('express')
const router = express.Router()
const user = require("../controller/user")

router.get('/user',user.getUser)
router.post('/createuser',user.createTenantByAdmin)


module.exports = router;
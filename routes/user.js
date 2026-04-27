const express = require('express')
const router = express.Router()
const user = require("../controller/user")
const middleware = require('../middlewares/auth')

router.get('/user',user.getUser)
router.get('/user/{id}',user.g)
router.post('/createuser',user.createTenantByAdmin)




module.exports = router;
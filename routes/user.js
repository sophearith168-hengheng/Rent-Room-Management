const express = require('express')
const router = express.Router()
const user = require("../controller/user")
const middleware = require('../middlewares/auth')

router.get('/user',user.getUser)
router.get('/user/{id}',user.getUserByID)
router.post('/createuser',user.createTenantByAdmin)
router.put('/update/{id}',user.updateuser)
router.delete('/delete/{id}',user.deleteuser)

module.exports = router;
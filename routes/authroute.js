const express = require('express')
const router = express.Router()
const user = require("../controller/user")
const { isLogin } = require('../middlewares/auth');

router.post('/',user.login)



module.exports = router;
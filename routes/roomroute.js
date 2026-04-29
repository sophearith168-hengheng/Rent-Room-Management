const express = require('express')
const router = express.Router()
const room = require("../controller/roomController")

router.get('/',room.getRoom)

module.exports = router;
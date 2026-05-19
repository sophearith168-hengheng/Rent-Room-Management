const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const tenant = require("../controller/tenantController");

router.get("/", tenant.getTenant);

router.get("/:id", tenant.getTenantByID);

router.post("/", upload.single("id_card"), tenant.createTenant);

router.put("/:id", upload.single("id_card"), tenant.updateTenant);

router.delete("/:id", tenant.deleteTenant);

module.exports = router;
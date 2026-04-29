const express = require("express");
const router = express.Router();
const tenant = require("../controller/tenantController");

router.get("/", tenant.getTenant);

router.get("/:id", tenant.getTenantByID);

router.post("/", tenant.createTenant);

router.put("/:id", tenant.updateTenant);

router.delete("/:id", tenant.deleteTenant);

module.exports = router;
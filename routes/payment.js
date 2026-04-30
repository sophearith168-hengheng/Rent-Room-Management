const express = require("express");
const router = express.Router();

const payment = require("../controller/paymentController");

router.get("/", payment.getPayments);
router.get("/:id", payment.getPaymentByID);

router.post("/", payment.createPayment);


router.put("/:id", payment.updatePayment);


router.delete("/:id", payment.deletePayment);

module.exports = router;
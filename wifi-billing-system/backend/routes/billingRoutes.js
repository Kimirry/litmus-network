const express = require('express');
const router = express.Router();
const billingController = require('../controllers/billingController');

// Route to create a payment
router.post('/payments', billingController.createPayment);

// Route to get payments by voucher code
router.get('/payments/:voucher_code', billingController.getPaymentsByVoucher);

module.exports = router;

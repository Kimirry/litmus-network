const db = require('../db');  // adjust path as needed

// Create a new payment
exports.createPayment = async (req, res) => {
  const { voucher_code, amount, method, phone, device_mac } = req.body;

  if (!voucher_code || !amount || !method) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Insert payment record
    const [result] = await db.execute(
      `INSERT INTO payments (voucher_code, amount, method, phone, device_mac) 
       VALUES (?, ?, ?, ?, ?)`,
      [voucher_code, amount, method, phone || null, device_mac || null]
    );

    // Optionally: Activate voucher if needed here by updating vouchers table
    // e.g.,
    // await db.execute('UPDATE vouchers SET activated_at = NOW() WHERE code = ?', [voucher_code]);

    res.status(201).json({ message: 'Payment recorded', paymentId: result.insertId });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all payments for a voucher
exports.getPaymentsByVoucher = async (req, res) => {
  const { voucher_code } = req.params;

  try {
    const [payments] = await db.execute(
      'SELECT * FROM payments WHERE voucher_code = ? ORDER BY payment_date DESC',
      [voucher_code]
    );

    res.json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


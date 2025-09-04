const db = require('../config/db'); // or wherever your db.js is

const authMiddleware = async (req, res, next) => {
  const { phone, device_mac } = req.body;

  if (!phone && !device_mac) {
    return res.status(400).json({ error: 'Phone number or device MAC address is required' });
  }

  try {
    // Look for a voucher based on phone or MAC from recent payments (example logic)
    const [rows] = await db.execute(
      `SELECT * FROM payments WHERE phone = ? OR device_mac = ? ORDER BY payment_date DESC LIMIT 1`,
      [phone || '', device_mac || '']
    );

    if (rows.length === 0) {
      return res.status(403).json({ error: 'Device not authorized or no payment found' });
    }

    // Attach user/device info to request
    req.user = {
      phone: phone || null,
      device_mac: device_mac || null,
      payment: rows[0],
    };

    next(); // Pass to controller
  } catch (err) {
    console.error('Auth error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = authMiddleware;

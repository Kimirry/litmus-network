const pool = require('../db');  // if controllers is inside a folder, use ../db

//services controller
const { sessionService, mikrotikService } = require('../services');

// 🔐 Auto-authentication using M-Pesa phone and optional device MAC
exports.deviceLogin = async (req, res) => {
  const { phone, device_mac } = req.body;

  if (!phone) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  try {
    // 1. Get latest payment for the phone number with a linked voucher
    const [payments] = await db.execute(`
      SELECT p.voucher_code, p.payment_date, v.is_active, v.activated_at, v.expires_at, 
             pk.name AS package_name, pk.duration_value, pk.duration_unit, pk.price
      FROM payments p
      JOIN vouchers v ON p.voucher_code = v.code
      JOIN packages pk ON v.package_id = pk.id
      WHERE p.phone = ?
        AND p.voucher_code IS NOT NULL
      ORDER BY p.payment_date DESC
      LIMIT 1
    `, [phone]);

    const payment = payments[0];
    if (!payment) {
      return res.status(404).json({ error: 'No valid voucher found for this phone number' });
    }

    // 2. (Optional) Match device MAC
    if (device_mac) {
      const [sessions] = await db.execute(
        `SELECT * FROM sessions WHERE voucher_code = ? AND device_mac = ?`,
        [payment.voucher_code, device_mac]
      );

      // If no session yet, allow first device to register
      if (sessions.length === 0) {
        await db.execute(
          `INSERT INTO sessions (voucher_code, device_mac, ip_address) VALUES (?, ?, ?)`,
          [payment.voucher_code, device_mac, req.ip]
        );
      } else if (sessions[0].device_mac !== device_mac) {
        return res.status(403).json({ error: 'Voucher already expired '});
      }
    }

    // 3. Check if voucher is still valid
    const now = new Date();
    const expiresAt = new Date(payment.expires_at);

    if (!payment.is_active) {
      return res.status(403).json({ error: 'Voucher is inactive' });
    }

    if (payment.expires_at && now > expiresAt) {
      return res.status(403).json({ error: 'Voucher has expired' });
    }

    // 4. Return success
    return res.status(200).json({
      message: 'Authenticated',
      voucher_code: payment.voucher_code,
      package: {
        name: payment.package_name,
        price: payment.price,
        duration: `${payment.duration_value} ${payment.duration_unit}`
      },
      activated_at: payment.activated_at,
      expires_at: payment.expires_at
    });

  } catch (error) {
    console.error('Device login error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// controllers/authController.js - services authentication
const userService = require('../services/userService');

exports.verifyUser = async (req, res) => {
  const { phone, mac } = req.body;

  try {
    const user = await userService.findUserByPhoneAndMac(phone, mac);

    if (!user) {
      return res.status(401).json({ message: 'Invalid phone or MAC' });
    }

    res.status(200).json({ message: 'You are logged in', user });  
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// controllers/authController.js

const { sessionService, mikrotikService } = require('../services');

// Then write your controller functions
exports.loginUser = async (req, res) => {
  const { phone, mac } = req.body;

  try {
    // 1. Verify user (you might get from DB or token)
    const user = await userService.findUserByPhoneAndMac(phone, mac);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // 2. Start session
    await sessionService.startSession({ userId: user.id, mac });

    // 3. Grant access in Mikrotik
    await mikrotikService.addUserToHotspot({
      username: phone,
      password: mac,
      profile: '1HourPlan', // or whatever you're using
    });

    return res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};


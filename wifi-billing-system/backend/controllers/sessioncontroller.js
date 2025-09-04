// controllers/sessionController.js
const db = require('../config/db');

// Create (start) a session
exports.createSession = async (req, res) => {
  const { voucher_code, ip_address, device_mac } = req.body;

  if (!voucher_code || !device_mac) {
    return res.status(400).json({ error: 'Voucher code and device MAC are required' });
  }

  try {
    const [result] = await db.execute(
      `INSERT INTO sessions (voucher_code, ip_address, device_mac) VALUES (?, ?, ?)`,
      [voucher_code, ip_address || null, device_mac]
    );

    res.status(201).json({
      message: 'Session started',
      session_id: result.insertId,
    });
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// End a session
exports.endSession = async (req, res) => {
  const { session_id, data_used_mb } = req.body;

  if (!session_id) {
    return res.status(400).json({ error: 'Session ID is required' });
  }

  try {
    const [result] = await db.execute(
      `UPDATE sessions SET end_time = NOW(), data_used_mb = ? WHERE id = ?`,
      [data_used_mb || 0, session_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Session not found' });
    }

    res.status(200).json({ message: 'Session ended' });
  } catch (error) {
    console.error('Error ending session:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all sessions
exports.getAllSessions = async (req, res) => {
  try {
    const [rows] = await db.execute(`SELECT * FROM sessions ORDER BY start_time DESC`);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get sessions by voucher code
exports.getSessionsByVoucher = async (req, res) => {
  const { voucher_code } = req.params;

  try {
    const [rows] = await db.execute(
      `SELECT * FROM sessions WHERE voucher_code = ? ORDER BY start_time DESC`,
      [voucher_code]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

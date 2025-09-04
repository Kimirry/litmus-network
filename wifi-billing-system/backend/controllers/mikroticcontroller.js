// controllers/mikrotikController.js
const mikrotikService = require('../services/mikrotikService');

exports.addUser = async (req, res) => {
  const { mac, password, comment } = req.body;
  try {
    const result = await mikrotikService.addUser(mac, password, comment);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.kickUser = async (req, res) => {
  const { mac } = req.body;
  try {
    const result = await mikrotikService.kickUser(mac);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getActiveUsers = async (req, res) => {
  try {
    const result = await mikrotikService.getActiveUsers();
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

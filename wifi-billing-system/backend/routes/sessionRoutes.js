const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const authMiddleware = require('../middlewares/auth');

// Only authenticated devices (via phone or MAC) can start a session
router.post('/start', authMiddleware, sessionController.createSession);

router.post('/end', sessionController.endSession);
router.get('/', sessionController.getAllSessions);
router.get('/:voucher_code', sessionController.getSessionsByVoucher);

module.exports = router;

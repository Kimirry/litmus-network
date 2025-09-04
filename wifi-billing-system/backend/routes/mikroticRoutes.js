// routes/mikrotikRoutes.js
const express = require('express');
const router = express.Router();
const mikrotikController = require('../controllers/mikrotikController');

router.post('/add-user', mikrotikController.addUser);
router.post('/kick-user', mikrotikController.kickUser);
router.get('/active-users', mikrotikController.getActiveUsers);

module.exports = router;

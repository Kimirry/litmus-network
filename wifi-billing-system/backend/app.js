const express = require('express');
const app = express();

// Middleware
app.use(express.json());

const logger = require('./middlewares/logger');
app.use(logger); // Logging middleware (should be before routes)

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const billingRoutes = require('./routes/billingRoutes');
app.use('/api/billing', billingRoutes);

const sessionRoutes = require('./routes/sessionRoutes');
app.use('/api/sessions', sessionRoutes);

// Error handler (must come last)
const errorHandler = require('./middlewares/error');
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// app.js
const express = require('express');
const app = express();
require('dotenv').config();

// mikrotik logic
const mikrotikRoutes = require('./routes/mikrotikRoutes');

app.use(express.json());
app.use('/api/mikrotik', mikrotikRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

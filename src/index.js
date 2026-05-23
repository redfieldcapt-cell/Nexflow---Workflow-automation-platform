const express = require('express');
const { WorkflowEngine } = require('./engine');
const { loadConfig } = require('./config');
const logger = require('./logger');

const app = express();
const config = loadConfig();

app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', version: '0.1.0' });
});

// Workflow endpoints
app.use('/api/v1/workflows', require('./routes/workflows'));
app.use('/api/v1/executions', require('./routes/executions'));
app.use('/api/v1/integrations', require('./routes/integrations'));

// Error handler
app.use((err, req, res, next) => {
  logger.error('Request error:', err);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Nexflow server running on port ${PORT}`);
});

module.exports = app;

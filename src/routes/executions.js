const express = require('express');
const router = express.Router();

// List executions
router.get('/', async (req, res) => {
  // TODO: Fetch from database
  res.json({ executions: [] });
});

// Get execution
router.get('/:id', async (req, res) => {
  // TODO: Fetch from database
  res.json({ id: req.params.id });
});

// Get execution logs
router.get('/:id/logs', async (req, res) => {
  // TODO: Fetch logs
  res.json({ logs: [] });
});

// Cancel execution
router.post('/:id/cancel', async (req, res) => {
  // TODO: Cancel execution
  res.json({ status: 'cancelled' });
});

module.exports = router;

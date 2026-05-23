const express = require('express');
const router = express.Router();
const { WorkflowEngine } = require('../engine');

const engine = new WorkflowEngine();

// List workflows
router.get('/', async (req, res) => {
  // TODO: Fetch from database
  res.json({ workflows: [] });
});

// Get workflow
router.get('/:id', async (req, res) => {
  // TODO: Fetch from database
  res.json({ id: req.params.id });
});

// Create workflow
router.post('/', async (req, res) => {
  const workflow = req.body;
  // TODO: Save to database
  res.status(201).json({ id: 'wf_123', ...workflow });
});

// Trigger workflow
router.post('/:id/trigger', async (req, res) => {
  try {
    const workflow = { id: req.params.id, steps: [] }; // TODO: Load from DB
    const execution = await engine.execute(workflow, req.body);
    res.json(execution);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete workflow
router.delete('/:id', async (req, res) => {
  // TODO: Delete from database
  res.status(204).send();
});

module.exports = router;

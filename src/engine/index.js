const EventEmitter = require('events');
const { executeStep } = require('./executor');
const { validateWorkflow } = require('./validator');
const logger = require('../logger');

class WorkflowEngine extends EventEmitter {
  constructor(config = {}) {
    super();
    this.config = config;
    this.executions = new Map();
  }

  async execute(workflow, input = {}) {
    const executionId = this.generateExecutionId();
    
    try {
      // Validate workflow
      validateWorkflow(workflow);
      
      const execution = {
        id: executionId,
        workflow_id: workflow.id,
        status: 'running',
        started_at: new Date(),
        steps: [],
        context: { input }
      };
      
      this.executions.set(executionId, execution);
      this.emit('execution:started', execution);
      
      // Execute steps
      for (const step of workflow.steps) {
        const stepResult = await executeStep(step, execution.context);
        
        execution.steps.push({
          name: step.name,
          status: stepResult.success ? 'completed' : 'failed',
          output: stepResult.output,
          duration: stepResult.duration
        });
        
        if (!stepResult.success && !step.continue_on_error) {
          throw new Error(`Step ${step.name} failed: ${stepResult.error}`);
        }
        
        // Update context with step output
        execution.context.steps = execution.context.steps || {};
        execution.context.steps[step.name] = stepResult.output;
      }
      
      execution.status = 'completed';
      execution.completed_at = new Date();
      
      this.emit('execution:completed', execution);
      
      return execution;
      
    } catch (error) {
      logger.error(`Execution ${executionId} failed:`, error);
      
      const execution = this.executions.get(executionId);
      if (execution) {
        execution.status = 'failed';
        execution.error = error.message;
        execution.completed_at = new Date();
        this.emit('execution:failed', execution);
      }
      
      throw error;
    }
  }
  
  generateExecutionId() {
    return `exec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  
  getExecution(executionId) {
    return this.executions.get(executionId);
  }
}

module.exports = { WorkflowEngine };

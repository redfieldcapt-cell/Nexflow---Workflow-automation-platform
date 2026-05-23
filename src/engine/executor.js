const actions = require('../actions');
const logger = require('../logger');

async function executeStep(step, context) {
  const startTime = Date.now();
  
  try {
    logger.info(`Executing step: ${step.name}`);
    
    // Get action handler
    const actionHandler = actions[step.action];
    if (!actionHandler) {
      throw new Error(`Unknown action: ${step.action}`);
    }
    
    // Resolve parameters with context
    const params = resolveParams(step.params || {}, context);
    
    // Execute with timeout
    const timeout = step.timeout || 30000;
    const result = await executeWithTimeout(
      actionHandler(context, params),
      timeout
    );
    
    const duration = Date.now() - startTime;
    
    return {
      success: true,
      output: result,
      duration
    };
    
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error(`Step ${step.name} failed:`, error);
    
    return {
      success: false,
      error: error.message,
      duration
    };
  }
}

function resolveParams(params, context) {
  // Simple template resolution
  const resolved = {};
  
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === 'string' && value.includes('${{')) {
      resolved[key] = resolveTemplate(value, context);
    } else {
      resolved[key] = value;
    }
  }
  
  return resolved;
}

function resolveTemplate(template, context) {
  // Basic template resolution
  return template.replace(/\$\{\{\s*(.+?)\s*\}\}/g, (match, path) => {
    const value = getNestedValue(context, path.trim());
    return value !== undefined ? value : match;
  });
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

async function executeWithTimeout(promise, timeout) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Execution timeout')), timeout)
    )
  ]);
}

module.exports = { executeStep };

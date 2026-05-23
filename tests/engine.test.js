const { WorkflowEngine } = require('../src/engine');

describe('WorkflowEngine', () => {
  let engine;
  
  beforeEach(() => {
    engine = new WorkflowEngine();
  });
  
  test('should execute simple workflow', async () => {
    const workflow = {
      id: 'test-workflow',
      steps: [
        {
          name: 'log-message',
          action: 'log',
          params: {
            message: 'Hello World'
          }
        }
      ]
    };
    
    const execution = await engine.execute(workflow);
    
    expect(execution.status).toBe('completed');
    expect(execution.steps).toHaveLength(1);
    expect(execution.steps[0].status).toBe('completed');
  });
  
  test('should handle step failure', async () => {
    const workflow = {
      id: 'test-workflow',
      steps: [
        {
          name: 'failing-step',
          action: 'unknown-action'
        }
      ]
    };
    
    await expect(engine.execute(workflow)).rejects.toThrow();
  });
  
  test('should generate unique execution IDs', () => {
    const id1 = engine.generateExecutionId();
    const id2 = engine.generateExecutionId();
    
    expect(id1).not.toBe(id2);
    expect(id1).toMatch(/^exec_/);
  });
});

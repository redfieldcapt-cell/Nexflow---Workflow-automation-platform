# Testing Workflows

## Unit Testing

Test individual steps:

```javascript
// tests/steps/transform.test.js
const transform = require('../../actions/transform');

describe('Transform action', () => {
  it('should transform user data', async () => {
    const input = {
      first_name: 'John',
      last_name: 'Doe'
    };
    
    const result = await transform({}, { data: input });
    
    expect(result.full_name).toBe('John Doe');
  });
});
```

## Integration Testing

Test complete workflows:

```javascript
// tests/workflows/user-signup.test.js
const nexflow = require('nexflow-test');

describe('User signup workflow', () => {
  it('should process new user', async () => {
    const result = await nexflow.run('user-signup', {
      input: {
        email: 'test@example.com',
        name: 'Test User'
      },
      mock: {
        'email.send': { success: true },
        'postgres.insert': { id: 123 }
      }
    });
    
    expect(result.status).toBe('completed');
    expect(result.steps['send-welcome-email'].success).toBe(true);
  });
});
```

## Mocking Integrations

Mock external services:

```yaml
# test-config.yml
mocks:
  slack.send-message:
    success: true
    message_id: "mock_123"
  
  postgres.query:
    output:
      - id: 1
        name: "Test User"
```

Run with mocks:

```bash
nexflow test workflow.yml --config test-config.yml
```

## Test Coverage

Generate coverage reports:

```bash
nexflow test --coverage
```

Output:
```
Workflow: user-signup
  Steps covered: 8/10 (80%)
  Branches covered: 12/15 (80%)
  Error handlers tested: 2/3 (66%)
```

## Continuous Testing

Run tests in CI:

```yaml
# .github/workflows/test.yml
name: Test Workflows

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: nexflow test --all
```

## Best Practices

1. Test happy path and error cases
2. Mock external dependencies
3. Use realistic test data
4. Test edge cases and boundaries
5. Maintain test coverage above 80%
6. Run tests in CI/CD pipeline

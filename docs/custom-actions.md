# Custom Actions

## Creating Custom Actions

### JavaScript Actions

```javascript
// actions/my-action.js
module.exports = async (context, params) => {
  const { input } = params;
  
  // Your logic here
  const result = await processData(input);
  
  return {
    success: true,
    data: result
  };
};
```

### Python Actions

```python
# actions/my_action.py
async def execute(context, params):
    input_data = params['input']
    
    # Your logic here
    result = process_data(input_data)
    
    return {
        'success': True,
        'data': result
    }
```

## Action Configuration

```yaml
actions:
  - name: Process data
    type: custom
    script: ./actions/my-action.js
    params:
      input: ${{ steps.previous.output }}
    timeout: 30s
    retry: 3
```

## Built-in Helpers

```javascript
// HTTP requests
await context.http.get('https://api.example.com');

// Logging
context.log.info('Processing started');

// State management
await context.state.set('key', 'value');
const value = await context.state.get('key');

// Secrets
const apiKey = await context.secrets.get('API_KEY');
```

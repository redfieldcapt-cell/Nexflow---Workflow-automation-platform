# Workflow Syntax

## Basic Structure

```yaml
name: Workflow Name
description: What this workflow does

trigger:
  type: webhook | schedule | event | manual
  # trigger-specific config

steps:
  - name: Step name
    action: action-type
    # action-specific params

error_handling:
  - name: Error handler
    action: action-type
```

## Variables

### Event Data
```yaml
${{ event.body.field }}
${{ event.headers.authorization }}
```

### Step Output
```yaml
${{ steps.step-name.output }}
${{ steps.step-name.success }}
```

### Secrets
```yaml
${{ secrets.API_KEY }}
${{ secrets.DATABASE_URL }}
```

### State
```yaml
${{ state.counter }}
${{ state.last_run }}
```

### Functions
```yaml
${{ now() }}                    # Current timestamp
${{ uuid() }}                   # Generate UUID
${{ base64(string) }}           # Base64 encode
${{ json(object) }}             # JSON stringify
${{ env.NODE_ENV }}             # Environment variable
```

## Conditionals

```yaml
steps:
  - name: Conditional step
    action: log
    message: "Running in production"
    if: ${{ env.NODE_ENV == 'production' }}
```

## Loops

```yaml
steps:
  - name: Process items
    action: custom
    script: ./process.js
    for_each: ${{ event.body.items }}
    params:
      item: ${{ item }}
```

## Parallel Execution

```yaml
steps:
  - name: Parallel tasks
    parallel:
      - name: Task 1
        action: http.get
        url: https://api1.example.com
      
      - name: Task 2
        action: http.get
        url: https://api2.example.com
```

## Error Handling

```yaml
steps:
  - name: Risky operation
    action: http.post
    url: https://api.example.com
    retry:
      max_attempts: 3
      backoff: exponential
    on_error:
      - name: Log error
        action: log
        level: error
        message: ${{ error.message }}
```

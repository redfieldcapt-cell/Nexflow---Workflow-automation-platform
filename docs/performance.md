# Performance Optimization

## Workflow Design

### Parallel Execution

Run independent steps in parallel:

```yaml
steps:
  - name: Fetch data
    parallel:
      - name: Fetch users
        action: postgres.query
        query: SELECT * FROM users
      
      - name: Fetch orders
        action: postgres.query
        query: SELECT * FROM orders
```

### Caching

Cache expensive operations:

```yaml
steps:
  - name: Fetch data
    action: http.get
    url: https://api.example.com/data
    cache:
      key: api-data
      ttl: 3600  # 1 hour
```

### Batch Processing

Process items in batches:

```yaml
steps:
  - name: Process records
    action: custom
    script: ./process.js
    batch_size: 100
    params:
      records: ${{ steps.fetch.output }}
```

## Database Optimization

### Connection Pooling

Configure connection pools:

```yaml
connections:
  postgres:
    url: ${{ secrets.DATABASE_URL }}
    pool:
      min: 2
      max: 10
      idle_timeout: 30000
```

### Query Optimization

- Use indexes on filtered columns
- Limit result sets
- Use prepared statements
- Avoid N+1 queries

## Resource Limits

Set resource limits per workflow:

```yaml
workflow:
  resources:
    memory: 512MB
    timeout: 300s
    max_concurrent: 10
```

## Monitoring

Track performance metrics:

- Execution time per step
- Memory usage
- API call latency
- Database query time
- Queue depth

## Best Practices

1. **Minimize API calls** - Batch requests when possible
2. **Use webhooks** - Instead of polling
3. **Optimize queries** - Add indexes, limit results
4. **Cache aggressively** - For read-heavy operations
5. **Process async** - For long-running tasks
6. **Set timeouts** - Prevent hanging workflows
7. **Monitor metrics** - Track and optimize bottlenecks

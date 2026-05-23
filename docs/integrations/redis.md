# Redis Integration

Use Redis for caching and queues.

## Setup

```bash
nexflow config set redis-url "redis://localhost:6379"
```

## Actions

### Set Value

```yaml
steps:
  - name: Cache result
    action: redis.set
    connection: ${{ secrets.redis-url }}
    key: user:${{ event.user_id }}
    value: ${{ event.body }}
    ttl: 3600  # 1 hour
```

### Get Value

```yaml
steps:
  - name: Get cached data
    action: redis.get
    connection: ${{ secrets.redis-url }}
    key: user:${{ event.user_id }}
```

### Delete Key

```yaml
steps:
  - name: Invalidate cache
    action: redis.del
    connection: ${{ secrets.redis-url }}
    key: user:${{ event.user_id }}
```

### Increment Counter

```yaml
steps:
  - name: Track views
    action: redis.incr
    connection: ${{ secrets.redis-url }}
    key: page:views:${{ event.page_id }}
```

### Push to List

```yaml
steps:
  - name: Add to queue
    action: redis.lpush
    connection: ${{ secrets.redis-url }}
    key: jobs:pending
    value: ${{ event.job }}
```

### Pop from List

```yaml
steps:
  - name: Get next job
    action: redis.rpop
    connection: ${{ secrets.redis-url }}
    key: jobs:pending
```

### Publish Message

```yaml
steps:
  - name: Broadcast event
    action: redis.publish
    connection: ${{ secrets.redis-url }}
    channel: notifications
    message: ${{ event.body }}
```

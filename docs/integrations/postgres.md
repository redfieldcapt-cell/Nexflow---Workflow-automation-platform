# PostgreSQL Integration

Connect to PostgreSQL databases for data operations.

## Setup

Store connection string in secrets:

```bash
nexflow config set postgres-url "postgresql://user:pass@host:5432/db"
```

## Actions

### Query

Execute a SELECT query.

```yaml
steps:
  - name: Fetch users
    action: postgres.query
    connection: ${{ secrets.postgres-url }}
    query: |
      SELECT * FROM users 
      WHERE created_at > $1
      ORDER BY created_at DESC
      LIMIT 100
    params: [${{ state.last_sync }}]
```

### Insert

Insert a single record.

```yaml
steps:
  - name: Create user
    action: postgres.insert
    connection: ${{ secrets.postgres-url }}
    table: users
    data:
      email: ${{ event.body.email }}
      name: ${{ event.body.name }}
      created_at: ${{ now() }}
```

### Bulk Insert

Insert multiple records efficiently.

```yaml
steps:
  - name: Bulk import
    action: postgres.bulk-insert
    connection: ${{ secrets.postgres-url }}
    table: events
    data: ${{ steps.fetch-data.output }}
    batch_size: 1000
```

### Update

Update existing records.

```yaml
steps:
  - name: Update status
    action: postgres.update
    connection: ${{ secrets.postgres-url }}
    table: orders
    where: id = $1
    set:
      status: 'completed'
      updated_at: ${{ now() }}
    params: [${{ event.order_id }}]
```

### Upsert

Insert or update on conflict.

```yaml
steps:
  - name: Sync user
    action: postgres.upsert
    connection: ${{ secrets.postgres-url }}
    table: users
    data:
      id: ${{ event.user.id }}
      email: ${{ event.user.email }}
      updated_at: ${{ now() }}
    conflict_target: id
```

### Delete

Delete records.

```yaml
steps:
  - name: Cleanup old data
    action: postgres.delete
    connection: ${{ secrets.postgres-url }}
    table: logs
    where: created_at < $1
    params: [${{ now() - 30 days }}]
```

### Transaction

Execute multiple queries in a transaction.

```yaml
steps:
  - name: Transfer funds
    action: postgres.transaction
    connection: ${{ secrets.postgres-url }}
    queries:
      - query: UPDATE accounts SET balance = balance - $1 WHERE id = $2
        params: [100, "acc_123"]
      - query: UPDATE accounts SET balance = balance + $1 WHERE id = $2
        params: [100, "acc_456"]
      - query: INSERT INTO transactions (from_id, to_id, amount) VALUES ($1, $2, $3)
        params: ["acc_123", "acc_456", 100]
```

## Connection Pooling

Configure connection pool:

```yaml
connections:
  postgres:
    url: ${{ secrets.postgres-url }}
    pool:
      min: 2
      max: 10
      idle_timeout: 30000
      connection_timeout: 5000
```

## Examples

### Daily Report

```yaml
name: Daily User Report
trigger:
  type: schedule
  cron: "0 9 * * *"

steps:
  - name: Get new users
    action: postgres.query
    query: |
      SELECT COUNT(*) as count, DATE(created_at) as date
      FROM users
      WHERE created_at >= CURRENT_DATE - INTERVAL '1 day'
      GROUP BY DATE(created_at)
  
  - name: Send report
    action: email.send
    to: team@example.com
    subject: "Daily User Report"
    body: "New users: ${{ steps.get-new-users.output[0].count }}"
```

### Data Sync

```yaml
name: Sync to Data Warehouse
trigger:
  type: schedule
  cron: "*/15 * * * *"

steps:
  - name: Fetch changes
    action: postgres.query
    connection: ${{ secrets.source-db }}
    query: |
      SELECT * FROM orders
      WHERE updated_at > $1
    params: [${{ state.last_sync }}]
  
  - name: Load to warehouse
    action: postgres.bulk-insert
    connection: ${{ secrets.warehouse-db }}
    table: orders
    data: ${{ steps.fetch-changes.output }}
  
  - name: Update sync time
    action: state.set
    key: last_sync
    value: ${{ now() }}
```

## Best Practices

1. Use parameterized queries to prevent SQL injection
2. Configure connection pooling for performance
3. Use transactions for related operations
4. Add indexes on frequently queried columns
5. Limit result sets with LIMIT
6. Use bulk operations for large datasets

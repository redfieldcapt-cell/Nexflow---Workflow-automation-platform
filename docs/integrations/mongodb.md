# MongoDB Integration

Work with MongoDB databases.

## Setup

```bash
nexflow config set mongodb-url "mongodb://user:pass@host:27017/db"
```

## Actions

### Find Documents

```yaml
steps:
  - name: Find users
    action: mongodb.find
    connection: ${{ secrets.mongodb-url }}
    collection: users
    query:
      status: active
    limit: 100
```

### Insert Document

```yaml
steps:
  - name: Create user
    action: mongodb.insert
    connection: ${{ secrets.mongodb-url }}
    collection: users
    document:
      email: ${{ event.body.email }}
      name: ${{ event.body.name }}
      created_at: ${{ now() }}
```

### Update Document

```yaml
steps:
  - name: Update user
    action: mongodb.update
    connection: ${{ secrets.mongodb-url }}
    collection: users
    query:
      _id: ${{ event.user_id }}
    update:
      $set:
        last_login: ${{ now() }}
```

### Upsert Document

```yaml
steps:
  - name: Sync user
    action: mongodb.upsert
    connection: ${{ secrets.mongodb-url }}
    collection: users
    query:
      email: ${{ event.body.email }}
    document: ${{ event.body }}
```

### Delete Documents

```yaml
steps:
  - name: Cleanup old data
    action: mongodb.delete
    connection: ${{ secrets.mongodb-url }}
    collection: logs
    query:
      created_at:
        $lt: ${{ now() - 30 days }}
```

### Aggregate

```yaml
steps:
  - name: Get statistics
    action: mongodb.aggregate
    connection: ${{ secrets.mongodb-url }}
    collection: orders
    pipeline:
      - $match:
          status: completed
      - $group:
          _id: $date
          total: $sum: $amount
```

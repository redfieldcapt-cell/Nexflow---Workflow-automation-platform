# Airtable Integration

Work with Airtable bases and tables.

## Setup

```bash
nexflow config set airtable-api-key keyXXXXXXXXXXXXXX
```

## Actions

### List Records

```yaml
steps:
  - name: Get tasks
    action: airtable.list
    base: appXXXXXXXXXXXXXX
    table: Tasks
    filter: "{Status} = 'Todo'"
    sort:
      - field: Priority
        direction: desc
```

### Create Record

```yaml
steps:
  - name: Add task
    action: airtable.create
    base: appXXXXXXXXXXXXXX
    table: Tasks
    fields:
      Name: ${{ event.body.title }}
      Status: Todo
      Assignee: ${{ event.body.assignee }}
```

### Update Record

```yaml
steps:
  - name: Update task
    action: airtable.update
    base: appXXXXXXXXXXXXXX
    table: Tasks
    record_id: ${{ event.record_id }}
    fields:
      Status: Done
      Completed: ${{ now() }}
```

### Delete Record

```yaml
steps:
  - name: Delete task
    action: airtable.delete
    base: appXXXXXXXXXXXXXX
    table: Tasks
    record_id: ${{ event.record_id }}
```

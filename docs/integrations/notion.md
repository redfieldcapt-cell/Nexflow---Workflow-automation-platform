# Notion Integration

Integrate with Notion workspaces.

## Setup

1. Create integration at [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Share pages with integration
3. Store token

```bash
nexflow config set notion-token secret_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

## Actions

### Create Page

```yaml
steps:
  - name: Create note
    action: notion.create-page
    parent: ${{ secrets.notion-database-id }}
    properties:
      Name:
        title:
          - text:
              content: ${{ event.body.title }}
      Status:
        select:
          name: In Progress
```

### Update Page

```yaml
steps:
  - name: Update status
    action: notion.update-page
    page_id: ${{ event.page_id }}
    properties:
      Status:
        select:
          name: Done
```

### Query Database

```yaml
steps:
  - name: Get tasks
    action: notion.query-database
    database_id: ${{ secrets.notion-database-id }}
    filter:
      property: Status
      select:
        equals: Todo
```

### Append Block

```yaml
steps:
  - name: Add content
    action: notion.append-block
    block_id: ${{ event.page_id }}
    children:
      - paragraph:
          rich_text:
            - text:
                content: ${{ event.body.text }}
```

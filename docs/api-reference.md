# API Reference

## Authentication

All API requests require authentication:

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.nexflow.io/v1/workflows
```

## Endpoints

### List Workflows

```
GET /v1/workflows
```

Response:
```json
{
  "workflows": [
    {
      "id": "wf_123",
      "name": "My Workflow",
      "status": "active",
      "created_at": "2026-05-23T10:00:00Z"
    }
  ]
}
```

### Create Workflow

```
POST /v1/workflows
```

Request:
```json
{
  "name": "New Workflow",
  "definition": "...",
  "enabled": true
}
```

### Trigger Workflow

```
POST /v1/workflows/:id/trigger
```

Request:
```json
{
  "inputs": {
    "param1": "value1"
  }
}
```

### Get Execution

```
GET /v1/executions/:id
```

Response:
```json
{
  "id": "exec_456",
  "workflow_id": "wf_123",
  "status": "completed",
  "started_at": "2026-05-23T10:00:00Z",
  "completed_at": "2026-05-23T10:01:30Z",
  "steps": [...]
}
```

### List Executions

```
GET /v1/workflows/:id/executions
```

Query params:
- `status`: filter by status
- `limit`: max results (default 50)
- `offset`: pagination offset

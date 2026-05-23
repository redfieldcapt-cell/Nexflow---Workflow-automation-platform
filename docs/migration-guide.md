# Migration Guide

## From Zapier

### Triggers
Zapier triggers map to Nexflow triggers:

**Zapier:**
```
Trigger: New Email in Gmail
```

**Nexflow:**
```yaml
trigger:
  type: event
  source: gmail
  event: new_email
```

### Actions
Zapier actions map to Nexflow steps:

**Zapier:**
```
Action: Send Slack Message
```

**Nexflow:**
```yaml
steps:
  - name: Send message
    action: slack.send-message
    channel: "#general"
    message: "New email received"
```

### Multi-step Zaps
Convert to workflow steps:

**Zapier:**
```
1. Trigger: New Row in Google Sheets
2. Action: Create Trello Card
3. Action: Send Slack Message
```

**Nexflow:**
```yaml
name: Sheet to Trello
trigger:
  type: event
  source: google-sheets
  event: new_row

steps:
  - name: Create card
    action: trello.create-card
    board: ${{ secrets.TRELLO_BOARD }}
    title: ${{ event.data.title }}
  
  - name: Notify team
    action: slack.send-message
    channel: "#updates"
    message: "New card created"
```

## From n8n

### Workflows
n8n workflows translate directly to Nexflow:

**n8n:**
```json
{
  "nodes": [
    {
      "type": "n8n-nodes-base.webhook",
      "name": "Webhook"
    },
    {
      "type": "n8n-nodes-base.httpRequest",
      "name": "HTTP Request"
    }
  ]
}
```

**Nexflow:**
```yaml
name: Webhook to API
trigger:
  type: webhook
  path: /my-webhook

steps:
  - name: Call API
    action: http.post
    url: https://api.example.com
    body: ${{ event.body }}
```

### Expressions
n8n expressions use similar syntax:

**n8n:**
```
{{ $json.user.email }}
```

**Nexflow:**
```
${{ event.body.user.email }}
```

## From Airflow

### DAGs
Airflow DAGs map to Nexflow workflows:

**Airflow:**
```python
from airflow import DAG
from airflow.operators.python import PythonOperator

dag = DAG('my_dag', schedule_interval='@daily')

task1 = PythonOperator(
    task_id='extract',
    python_callable=extract_data,
    dag=dag
)

task2 = PythonOperator(
    task_id='transform',
    python_callable=transform_data,
    dag=dag
)

task1 >> task2
```

**Nexflow:**
```yaml
name: My Workflow
trigger:
  type: schedule
  cron: "0 0 * * *"

steps:
  - name: Extract
    action: custom
    script: ./extract.py
  
  - name: Transform
    action: custom
    script: ./transform.py
    params:
      data: ${{ steps.extract.output }}
```

### Task Dependencies
Use step ordering:

**Airflow:**
```python
task1 >> task2 >> task3
```

**Nexflow:**
```yaml
steps:
  - name: Task 1
  - name: Task 2
  - name: Task 3
```

## Migration Checklist

- [ ] Export existing workflows
- [ ] Map triggers to Nexflow format
- [ ] Convert actions to Nexflow steps
- [ ] Migrate secrets and credentials
- [ ] Test workflows in staging
- [ ] Update documentation
- [ ] Train team on new platform
- [ ] Deploy to production
- [ ] Monitor for issues
- [ ] Decommission old platform

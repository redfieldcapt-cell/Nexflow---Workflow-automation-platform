# Triggers

## Webhook Triggers

Start workflows via HTTP requests:

```yaml
trigger:
  type: webhook
  path: /my-webhook
  method: POST
  auth: api-key
```

## Schedule Triggers

Run workflows on a schedule:

```yaml
trigger:
  type: schedule
  cron: "0 9 * * *"  # Every day at 9 AM
```

## Event Triggers

React to external events:

```yaml
trigger:
  type: event
  source: github
  event: push
  filter:
    branch: main
```

## Manual Triggers

Start workflows manually:

```yaml
trigger:
  type: manual
  inputs:
    - name: environment
      type: select
      options: [dev, staging, prod]
```

## Chained Triggers

Start workflows from other workflows:

```yaml
trigger:
  type: workflow
  workflow: parent-workflow
  on: success
```

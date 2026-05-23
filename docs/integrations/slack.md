# Slack Integration

Connect Nexflow to Slack for notifications and bot interactions.

## Setup

1. Create a Slack app at [api.slack.com/apps](https://api.slack.com/apps)
2. Add bot token scopes: `chat:write`, `channels:read`
3. Install app to workspace
4. Copy bot token to Nexflow secrets

```bash
nexflow config set slack-token xoxb-your-token
```

## Actions

### Send Message

Send a message to a channel or user.

```yaml
steps:
  - name: Notify team
    action: slack.send-message
    channel: "#general"
    message: "Deployment completed successfully"
```

Parameters:
- `channel` (required): Channel name or user ID
- `message` (required): Message text
- `blocks`: Rich message blocks
- `thread_ts`: Reply to thread

### Upload File

Upload a file to Slack.

```yaml
steps:
  - name: Share report
    action: slack.upload-file
    channel: "#reports"
    file: ./report.pdf
    title: "Monthly Report"
```

### Create Channel

Create a new channel.

```yaml
steps:
  - name: Create project channel
    action: slack.create-channel
    name: "project-alpha"
    is_private: false
```

### Invite Users

Invite users to a channel.

```yaml
steps:
  - name: Add team members
    action: slack.invite-users
    channel: "#project-alpha"
    users: ["U123", "U456"]
```

## Triggers

### Slash Commands

Trigger workflows from Slack slash commands.

```yaml
trigger:
  type: event
  source: slack
  event: slash_command
  filter:
    command: /deploy

steps:
  - name: Deploy application
    action: custom
    script: ./deploy.sh
  
  - name: Respond
    action: slack.respond
    text: "Deployment started!"
```

### Message Events

React to messages in channels.

```yaml
trigger:
  type: event
  source: slack
  event: message
  filter:
    channel: "#support"

steps:
  - name: Auto-respond
    action: slack.send-message
    channel: ${{ event.channel }}
    thread_ts: ${{ event.ts }}
    message: "Thanks! We'll get back to you soon."
```

## Examples

### Daily Standup Reminder

```yaml
name: Standup Reminder
trigger:
  type: schedule
  cron: "0 9 * * 1-5"

steps:
  - name: Send reminder
    action: slack.send-message
    channel: "#engineering"
    message: "Good morning! Time for standup 👋"
```

### Build Notifications

```yaml
name: Build Status
trigger:
  type: event
  source: github
  event: workflow_run

steps:
  - name: Notify on failure
    action: slack.send-message
    if: ${{ event.workflow_run.conclusion == 'failure' }}
    channel: "#ci"
    message: |
      ❌ Build failed
      Workflow: ${{ event.workflow_run.name }}
      Branch: ${{ event.workflow_run.head_branch }}
```

## Best Practices

1. Use threads for related messages
2. Mention users with `<@USER_ID>`
3. Use blocks for rich formatting
4. Rate limit: 1 message per second
5. Store tokens in secrets

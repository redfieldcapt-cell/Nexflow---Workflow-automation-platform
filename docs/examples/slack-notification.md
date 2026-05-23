# Example: Slack Notification Workflow

Send Slack notifications when GitHub issues are created.

## Workflow Definition

```yaml
name: GitHub to Slack
description: Notify team when new issues are created

trigger:
  type: event
  source: github
  event: issues
  filter:
    action: opened

steps:
  - name: Format message
    action: transform
    template: |
      New issue created: {{ issue.title }}
      By: {{ issue.user.login }}
      URL: {{ issue.html_url }}

  - name: Send to Slack
    action: slack.send-message
    channel: "#engineering"
    message: ${{ steps.format-message.output }}
    
  - name: Log event
    action: log
    level: info
    message: "Notification sent for issue #{{ issue.number }}"
```

## Setup

1. Connect GitHub integration
2. Connect Slack integration
3. Deploy workflow
4. Test by creating an issue

## Customization

- Add filters for specific labels
- Include issue description
- Mention specific users
- Add reaction buttons

# Discord Integration

Send messages and manage Discord servers.

## Setup

1. Create bot at [discord.com/developers](https://discord.com/developers/applications)
2. Add bot to server
3. Store token

```bash
nexflow config set discord-token your_bot_token
```

## Actions

### Send Message

```yaml
steps:
  - name: Send notification
    action: discord.send-message
    channel_id: "123456789012345678"
    content: "Deployment completed successfully!"
```

### Send Embed

```yaml
steps:
  - name: Send rich message
    action: discord.send-embed
    channel_id: "123456789012345678"
    embed:
      title: "Build Status"
      description: "Build completed"
      color: 0x00ff00
      fields:
        - name: "Branch"
          value: ${{ event.branch }}
        - name: "Commit"
          value: ${{ event.commit }}
```

### Create Thread

```yaml
steps:
  - name: Create discussion
    action: discord.create-thread
    channel_id: "123456789012345678"
    name: "Bug Report: ${{ event.title }}"
    message: ${{ event.description }}
```

### Add Reaction

```yaml
steps:
  - name: React to message
    action: discord.add-reaction
    channel_id: "123456789012345678"
    message_id: "987654321098765432"
    emoji: "✅"
```

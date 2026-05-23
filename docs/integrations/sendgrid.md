# SendGrid Integration

Send transactional emails with SendGrid.

## Setup

```bash
nexflow config set sendgrid-api-key SG.your_api_key
```

## Actions

### Send Email

```yaml
steps:
  - name: Send welcome email
    action: sendgrid.send
    to: ${{ event.body.email }}
    from: hello@example.com
    subject: "Welcome to Nexflow!"
    html: "<h1>Welcome!</h1><p>Thanks for signing up.</p>"
```

### Send Template Email

```yaml
steps:
  - name: Send templated email
    action: sendgrid.send-template
    to: ${{ event.body.email }}
    from: hello@example.com
    template_id: d-1234567890
    dynamic_data:
      name: ${{ event.body.name }}
      activation_link: ${{ event.body.link }}
```

### Send Bulk Email

```yaml
steps:
  - name: Send newsletter
    action: sendgrid.send-bulk
    from: newsletter@example.com
    subject: "Monthly Update"
    html: ${{ steps.generate-content.output }}
    recipients: ${{ steps.get-subscribers.output }}
```

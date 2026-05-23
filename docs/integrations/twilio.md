# Twilio Integration

Send SMS and make voice calls with Twilio.

## Setup

```bash
nexflow config set twilio-account-sid ACxxxxx
nexflow config set twilio-auth-token your_token
nexflow config set twilio-phone-number +15551234567
```

## Actions

### Send SMS

```yaml
steps:
  - name: Send verification code
    action: twilio.send-sms
    to: ${{ event.body.phone }}
    from: ${{ secrets.twilio-phone-number }}
    body: "Your verification code is: ${{ steps.generate-code.output }}"
```

### Make Call

```yaml
steps:
  - name: Call customer
    action: twilio.make-call
    to: ${{ event.body.phone }}
    from: ${{ secrets.twilio-phone-number }}
    url: https://example.com/twiml/greeting
```

### Send WhatsApp Message

```yaml
steps:
  - name: Send WhatsApp
    action: twilio.send-whatsapp
    to: whatsapp:+15551234567
    from: whatsapp:${{ secrets.twilio-whatsapp-number }}
    body: "Your order has shipped!"
```

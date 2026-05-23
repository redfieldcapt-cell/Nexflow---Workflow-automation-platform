# Stripe Integration

Process payments and manage subscriptions with Stripe.

## Setup

1. Get API keys from [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Store in Nexflow secrets

```bash
nexflow config set stripe-secret-key sk_test_your_key
```

## Actions

### Create Customer

```yaml
steps:
  - name: Create Stripe customer
    action: stripe.create-customer
    email: ${{ event.body.email }}
    name: ${{ event.body.name }}
```

### Create Payment Intent

```yaml
steps:
  - name: Create payment
    action: stripe.create-payment-intent
    amount: 2000  # $20.00
    currency: usd
    customer: ${{ steps.create-customer.output.id }}
```

### Create Subscription

```yaml
steps:
  - name: Subscribe user
    action: stripe.create-subscription
    customer: ${{ event.customer_id }}
    price: price_1234567890
```

### Refund Payment

```yaml
steps:
  - name: Process refund
    action: stripe.create-refund
    payment_intent: ${{ event.payment_intent_id }}
    amount: 1000  # Partial refund
```

## Webhooks

Handle Stripe events:

```yaml
trigger:
  type: event
  source: stripe
  event: payment_intent.succeeded

steps:
  - name: Fulfill order
    action: custom
    script: ./fulfill-order.js
    params:
      payment: ${{ event.data.object }}
```

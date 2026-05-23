# Use Cases

## DevOps & CI/CD

### Automated Deployments
Trigger deployments when code is merged to main branch.

```yaml
name: Auto Deploy
trigger:
  type: event
  source: github
  event: push
  filter:
    branch: main

steps:
  - name: Run tests
    action: github.run-workflow
    workflow: test.yml
  
  - name: Build Docker image
    action: docker.build
    tag: ${{ event.after }}
  
  - name: Deploy to production
    action: kubernetes.apply
    manifest: ./k8s/production.yml
  
  - name: Notify team
    action: slack.send-message
    channel: "#deployments"
    message: "Deployed ${{ event.after }} to production"
```

### Infrastructure Monitoring
Monitor server health and alert on issues.

```yaml
name: Server Health Check
trigger:
  type: schedule
  cron: "*/5 * * * *"

steps:
  - name: Check servers
    action: http.get
    url: https://api.example.com/health
  
  - name: Alert if down
    action: pagerduty.create-incident
    if: ${{ steps.check-servers.output.status != 'ok' }}
    severity: high
    title: "Server health check failed"
```

## Data Engineering

### ETL Pipeline
Extract, transform, and load data daily.

```yaml
name: Daily ETL
trigger:
  type: schedule
  cron: "0 2 * * *"

steps:
  - name: Extract from API
    action: http.get
    url: https://api.example.com/data
  
  - name: Transform data
    action: custom
    script: ./transform.py
    params:
      data: ${{ steps.extract-from-api.output }}
  
  - name: Load to warehouse
    action: postgres.bulk-insert
    table: analytics.daily_data
    data: ${{ steps.transform-data.output }}
```

### Data Sync
Keep databases in sync across systems.

```yaml
name: Database Sync
trigger:
  type: schedule
  cron: "*/15 * * * *"

steps:
  - name: Fetch changes
    action: postgres.query
    query: |
      SELECT * FROM users 
      WHERE updated_at > ${{ state.last_sync }}
  
  - name: Sync to destination
    action: mongodb.upsert
    collection: users
    data: ${{ steps.fetch-changes.output }}
  
  - name: Update timestamp
    action: state.set
    key: last_sync
    value: ${{ now() }}
```

## Marketing Automation

### Lead Nurturing
Automatically follow up with new leads.

```yaml
name: Lead Follow-up
trigger:
  type: event
  source: webhook
  path: /new-lead

steps:
  - name: Add to CRM
    action: salesforce.create-lead
    data: ${{ event.body }}
  
  - name: Send welcome email
    action: email.send
    to: ${{ event.body.email }}
    template: welcome
  
  - name: Schedule follow-up
    action: calendar.create-event
    title: "Follow up with ${{ event.body.name }}"
    date: ${{ now() + 2 days }}
```

### Social Media Posting
Schedule and post content across platforms.

```yaml
name: Social Media Campaign
trigger:
  type: schedule
  cron: "0 9 * * *"

steps:
  - name: Get content
    action: airtable.get-records
    table: content_calendar
    filter: scheduled_for = today()
  
  - name: Post to Twitter
    action: twitter.post
    text: ${{ steps.get-content.output.text }}
  
  - name: Post to LinkedIn
    action: linkedin.post
    text: ${{ steps.get-content.output.text }}
```

## Customer Support

### Ticket Routing
Automatically route support tickets.

```yaml
name: Route Support Tickets
trigger:
  type: event
  source: zendesk
  event: ticket_created

steps:
  - name: Analyze ticket
    action: openai.analyze
    text: ${{ event.ticket.description }}
  
  - name: Assign to team
    action: zendesk.assign
    ticket_id: ${{ event.ticket.id }}
    team: ${{ steps.analyze-ticket.output.category }}
  
  - name: Set priority
    action: zendesk.update
    ticket_id: ${{ event.ticket.id }}
    priority: ${{ steps.analyze-ticket.output.urgency }}
```

### Customer Onboarding
Automate new customer onboarding.

```yaml
name: Customer Onboarding
trigger:
  type: event
  source: stripe
  event: customer.created

steps:
  - name: Create account
    action: postgres.insert
    table: customers
    data: ${{ event.customer }}
  
  - name: Send welcome email
    action: email.send
    to: ${{ event.customer.email }}
    template: onboarding
  
  - name: Schedule check-in
    action: calendar.create-event
    title: "Check in with ${{ event.customer.name }}"
    date: ${{ now() + 7 days }}
```

## E-commerce

### Order Processing
Automate order fulfillment.

```yaml
name: Process Order
trigger:
  type: event
  source: shopify
  event: order_created

steps:
  - name: Validate inventory
    action: postgres.query
    query: SELECT * FROM inventory WHERE sku = ${{ event.order.sku }}
  
  - name: Create shipment
    action: shipstation.create-shipment
    order: ${{ event.order }}
  
  - name: Send confirmation
    action: email.send
    to: ${{ event.order.customer.email }}
    template: order-confirmation
  
  - name: Update inventory
    action: postgres.update
    table: inventory
    where: sku = ${{ event.order.sku }}
    set: quantity = quantity - ${{ event.order.quantity }}
```

### Abandoned Cart Recovery
Re-engage customers who abandon carts.

```yaml
name: Abandoned Cart
trigger:
  type: event
  source: shopify
  event: cart_abandoned

steps:
  - name: Wait 1 hour
    action: delay
    duration: 1h
  
  - name: Send reminder email
    action: email.send
    to: ${{ event.cart.customer.email }}
    template: cart-reminder
    variables:
      cart_url: ${{ event.cart.url }}
  
  - name: Track conversion
    action: analytics.track
    event: cart_reminder_sent
```

## Finance

### Invoice Processing
Automate invoice generation and sending.

```yaml
name: Monthly Invoicing
trigger:
  type: schedule
  cron: "0 0 1 * *"

steps:
  - name: Get billable customers
    action: postgres.query
    query: SELECT * FROM customers WHERE billing_active = true
  
  - name: Generate invoices
    action: custom
    script: ./generate-invoices.js
    params:
      customers: ${{ steps.get-billable-customers.output }}
  
  - name: Send via Stripe
    action: stripe.create-invoice
    for_each: ${{ steps.generate-invoices.output }}
    customer: ${{ item.customer_id }}
    amount: ${{ item.amount }}
```

### Expense Approval
Route expenses for approval.

```yaml
name: Expense Approval
trigger:
  type: event
  source: webhook
  path: /expense-submitted

steps:
  - name: Check amount
    action: custom
    script: ./check-amount.js
  
  - name: Auto-approve small expenses
    action: postgres.update
    if: ${{ steps.check-amount.output.amount < 100 }}
    table: expenses
    set: status = 'approved'
  
  - name: Request manager approval
    action: slack.send-message
    if: ${{ steps.check-amount.output.amount >= 100 }}
    channel: "@manager"
    message: "Expense approval needed: ${{ event.body.description }}"
```

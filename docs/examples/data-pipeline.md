# Example: Data Pipeline Workflow

ETL pipeline that fetches data from API, transforms it, and stores in database.

## Workflow Definition

```yaml
name: Daily Data Pipeline
description: Fetch and process customer data

trigger:
  type: schedule
  cron: "0 2 * * *"  # 2 AM daily

steps:
  - name: Fetch data
    action: http.get
    url: https://api.example.com/customers
    headers:
      Authorization: Bearer ${{ secrets.API_TOKEN }}
    
  - name: Transform data
    action: custom
    script: ./scripts/transform.js
    params:
      data: ${{ steps.fetch-data.output }}
  
  - name: Validate
    action: custom
    script: ./scripts/validate.js
    params:
      data: ${{ steps.transform-data.output }}
    
  - name: Store in database
    action: postgres.insert
    connection: ${{ secrets.DB_CONNECTION }}
    table: customers
    data: ${{ steps.validate.output }}
    
  - name: Send summary
    action: email.send
    to: team@example.com
    subject: "Daily pipeline completed"
    body: "Processed {{ steps.validate.output.length }} records"

error_handling:
  - name: Alert on failure
    action: slack.send-message
    channel: "#alerts"
    message: "Pipeline failed: {{ error.message }}"
```

## Transform Script

```javascript
// scripts/transform.js
module.exports = async (context, params) => {
  const { data } = params;
  
  return data.map(customer => ({
    id: customer.id,
    name: customer.full_name,
    email: customer.email.toLowerCase(),
    created_at: new Date(customer.timestamp)
  }));
};
```

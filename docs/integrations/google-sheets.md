# Google Sheets Integration

Read and write Google Sheets data.

## Setup

1. Create service account in Google Cloud Console
2. Download JSON key file
3. Share sheet with service account email
4. Store credentials

```bash
nexflow config set google-credentials-json "$(cat credentials.json)"
```

## Actions

### Read Sheet

```yaml
steps:
  - name: Get data
    action: google-sheets.read
    spreadsheet_id: 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
    range: Sheet1!A1:D10
```

### Append Row

```yaml
steps:
  - name: Add row
    action: google-sheets.append
    spreadsheet_id: 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
    range: Sheet1!A:D
    values:
      - [${{ event.name }}, ${{ event.email }}, ${{ event.status }}, ${{ now() }}]
```

### Update Cell

```yaml
steps:
  - name: Update status
    action: google-sheets.update
    spreadsheet_id: 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
    range: Sheet1!C2
    values:
      - [Completed]
```

### Clear Range

```yaml
steps:
  - name: Clear data
    action: google-sheets.clear
    spreadsheet_id: 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
    range: Sheet1!A2:D100
```

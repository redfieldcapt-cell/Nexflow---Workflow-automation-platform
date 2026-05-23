# Security

## Authentication

### API Keys
- Generate API keys in dashboard
- Rotate keys regularly
- Use different keys per environment

### OAuth
- Support for OAuth 2.0
- Automatic token refresh
- Secure credential storage

## Secrets Management

Store sensitive data securely:

```yaml
steps:
  - name: Use secret
    action: http.post
    url: https://api.example.com
    headers:
      Authorization: Bearer ${{ secrets.API_TOKEN }}
```

Secrets are:
- Encrypted at rest (AES-256)
- Never logged or exposed
- Scoped per workspace

## Network Security

- TLS 1.3 for all connections
- IP allowlisting available
- VPC peering for enterprise

## Compliance

- SOC 2 Type II certified
- GDPR compliant
- HIPAA available for enterprise

## Best Practices

1. Use least privilege access
2. Enable audit logging
3. Review permissions regularly
4. Use webhook signatures
5. Implement rate limiting
6. Monitor for anomalies

## Reporting Vulnerabilities

Email security@nexflow.io with:
- Description of vulnerability
- Steps to reproduce
- Potential impact

We respond within 24 hours.

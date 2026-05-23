# Frequently Asked Questions

## General

### What is Nexflow?
Nexflow is a workflow automation platform that helps teams streamline their processes by connecting different tools and services.

### Is Nexflow open source?
Yes, Nexflow is released under the MIT license.

### What integrations are supported?
We support 100+ integrations including Slack, GitHub, PostgreSQL, Redis, and many more. See the [integrations documentation](./integrations.md) for the full list.

## Getting Started

### How do I install Nexflow?
```bash
npm install -g nexflow
```

### Can I self-host Nexflow?
Yes! We provide Docker images and Kubernetes configurations for self-hosting.

### What are the system requirements?
- Node.js 18 or higher
- PostgreSQL 14+
- Redis 6+
- 2GB RAM minimum

## Workflows

### How do I create a workflow?
You can create workflows using YAML files or through our API. See the [getting started guide](./getting-started.md).

### Can workflows call other workflows?
Yes, you can chain workflows using the `workflow` trigger type.

### What's the maximum execution time?
Default is 5 minutes, configurable up to 1 hour.

### Can I run workflows in parallel?
Yes, use the `parallel` step type to run multiple steps concurrently.

## Pricing

### Is there a free tier?
Yes, our free tier includes:
- 1,000 executions per month
- 10 workflows
- Community support

### What's included in paid plans?
- Unlimited executions
- Unlimited workflows
- Priority support
- SLA guarantees
- Advanced features

## Security

### How is my data secured?
- All data encrypted at rest (AES-256)
- TLS 1.3 for data in transit
- SOC 2 Type II certified
- Regular security audits

### Where is data stored?
Data is stored in your chosen region (US, EU, Asia).

### Can I use my own encryption keys?
Yes, enterprise plans support BYOK (Bring Your Own Key).

## Support

### How do I get help?
- Documentation: docs.nexflow.io
- Community forum: community.nexflow.io
- Email: support@nexflow.io
- Enterprise: enterprise@nexflow.io

### What's the SLA?
- Free tier: Best effort
- Pro: 99.9% uptime
- Enterprise: 99.99% uptime

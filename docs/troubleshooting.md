# Troubleshooting

## Common Issues

### Workflow Not Triggering

**Problem:** Webhook workflow doesn't start

**Solutions:**
1. Check webhook URL is correct
2. Verify authentication token
3. Check firewall rules
4. Review webhook logs

### Execution Timeout

**Problem:** Workflow times out

**Solutions:**
1. Increase timeout in workflow config
2. Optimize slow steps
3. Use async actions
4. Split into smaller workflows

### Integration Errors

**Problem:** Integration action fails

**Solutions:**
1. Verify credentials are valid
2. Check API rate limits
3. Review integration logs
4. Test connection manually

### Database Connection Issues

**Problem:** Cannot connect to database

**Solutions:**
1. Check connection string
2. Verify network access
3. Check database is running
4. Review connection pool settings

## Debug Mode

Enable debug logging:

```yaml
workflow:
  debug: true
  log_level: debug
```

## Logs

View execution logs:

```bash
nexflow logs exec_123
```

Stream live logs:

```bash
nexflow logs --follow
```

## Support

- Documentation: docs.nexflow.io
- Community: community.nexflow.io
- Email: support@nexflow.io
- Status: status.nexflow.io

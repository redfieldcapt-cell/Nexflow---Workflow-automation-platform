# CLI Reference

## Installation

```bash
npm install -g nexflow
```

## Commands

### nexflow init

Initialize a new project:

```bash
nexflow init my-project
cd my-project
```

Options:
- `--template <name>` - Use a template
- `--git` - Initialize git repository

### nexflow run

Run a workflow:

```bash
nexflow run workflow-name
```

Options:
- `--input <json>` - Pass input data
- `--env <file>` - Load environment variables
- `--watch` - Watch for changes and re-run

### nexflow deploy

Deploy workflows to cloud:

```bash
nexflow deploy
```

Options:
- `--env <environment>` - Target environment
- `--dry-run` - Preview changes

### nexflow logs

View execution logs:

```bash
nexflow logs <execution-id>
```

Options:
- `--follow` - Stream live logs
- `--tail <n>` - Show last n lines

### nexflow list

List workflows:

```bash
nexflow list
```

Options:
- `--status <status>` - Filter by status
- `--json` - Output as JSON

### nexflow validate

Validate workflow syntax:

```bash
nexflow validate workflow.yml
```

### nexflow test

Test workflows:

```bash
nexflow test workflow.yml
```

Options:
- `--mock` - Use mock integrations
- `--coverage` - Show coverage report

### nexflow config

Manage configuration:

```bash
nexflow config set api-key YOUR_KEY
nexflow config get api-key
nexflow config list
```

## Environment Variables

- `NEXFLOW_API_KEY` - API key for authentication
- `NEXFLOW_API_URL` - API endpoint (default: https://api.nexflow.io)
- `NEXFLOW_ENV` - Environment name

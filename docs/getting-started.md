# Getting Started with Nexflow

## Installation

```bash
npm install -g nexflow
```

## Create Your First Workflow

1. Initialize a new project:
```bash
nexflow init my-project
cd my-project
```

2. Create a workflow file `workflows/hello.yml`:
```yaml
name: Hello Workflow
trigger:
  type: webhook
  path: /hello

steps:
  - name: Log message
    action: log
    message: "Hello from Nexflow!"
```

3. Run the workflow:
```bash
nexflow run hello
```

## Next Steps

- Explore [integrations](./integrations.md)
- Learn about [triggers](./triggers.md)
- Build [custom actions](./custom-actions.md)

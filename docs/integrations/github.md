# GitHub Integration

Automate GitHub workflows with Nexflow.

## Setup

1. Create a GitHub personal access token
2. Add scopes: `repo`, `workflow`, `admin:org`
3. Store in Nexflow secrets

```bash
nexflow config set github-token ghp_your_token
```

## Actions

### Create Issue

Create a new issue.

```yaml
steps:
  - name: Create bug report
    action: github.create-issue
    repo: owner/repo
    title: "Bug: ${{ event.error }}"
    body: "Error details: ${{ event.stack }}"
    labels: ["bug", "automated"]
```

### Create Pull Request

Open a pull request.

```yaml
steps:
  - name: Create PR
    action: github.create-pr
    repo: owner/repo
    title: "Update dependencies"
    head: feature-branch
    base: main
    body: "Automated dependency updates"
```

### Add Comment

Comment on issues or PRs.

```yaml
steps:
  - name: Add comment
    action: github.add-comment
    repo: owner/repo
    issue_number: ${{ event.issue.number }}
    body: "Thanks for reporting! We're looking into it."
```

### Merge PR

Merge a pull request.

```yaml
steps:
  - name: Auto-merge
    action: github.merge-pr
    repo: owner/repo
    pr_number: ${{ event.pull_request.number }}
    merge_method: squash
```

### Create Release

Create a GitHub release.

```yaml
steps:
  - name: Create release
    action: github.create-release
    repo: owner/repo
    tag: v1.0.0
    name: "Version 1.0.0"
    body: "Release notes here"
```

## Triggers

### Push Events

Trigger on code pushes.

```yaml
trigger:
  type: event
  source: github
  event: push
  filter:
    branch: main

steps:
  - name: Run tests
    action: custom
    script: ./test.sh
```

### Pull Request Events

React to PR activity.

```yaml
trigger:
  type: event
  source: github
  event: pull_request
  filter:
    action: opened

steps:
  - name: Run linter
    action: custom
    script: ./lint.sh
  
  - name: Comment results
    action: github.add-comment
    repo: ${{ event.repository.full_name }}
    issue_number: ${{ event.pull_request.number }}
    body: "Linter results: ${{ steps.run-linter.output }}"
```

### Issue Events

Respond to issues.

```yaml
trigger:
  type: event
  source: github
  event: issues
  filter:
    action: opened
    label: bug

steps:
  - name: Assign to team
    action: github.assign-issue
    repo: ${{ event.repository.full_name }}
    issue_number: ${{ event.issue.number }}
    assignees: ["maintainer1", "maintainer2"]
```

## Examples

### Auto-label PRs

```yaml
name: Auto Label PRs
trigger:
  type: event
  source: github
  event: pull_request
  filter:
    action: opened

steps:
  - name: Analyze changes
    action: custom
    script: ./analyze-pr.js
  
  - name: Add labels
    action: github.add-labels
    repo: ${{ event.repository.full_name }}
    issue_number: ${{ event.pull_request.number }}
    labels: ${{ steps.analyze-changes.output.labels }}
```

### Stale Issue Cleanup

```yaml
name: Close Stale Issues
trigger:
  type: schedule
  cron: "0 0 * * *"

steps:
  - name: Find stale issues
    action: github.search-issues
    query: "is:open updated:<30d"
  
  - name: Comment and close
    action: github.add-comment
    for_each: ${{ steps.find-stale-issues.output }}
    repo: owner/repo
    issue_number: ${{ item.number }}
    body: "Closing due to inactivity"
  
  - name: Close issue
    action: github.close-issue
    for_each: ${{ steps.find-stale-issues.output }}
    repo: owner/repo
    issue_number: ${{ item.number }}
```

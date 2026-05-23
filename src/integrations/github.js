const { Octokit } = require('@octokit/rest');

class GitHubIntegration {
  constructor(token) {
    this.octokit = new Octokit({ auth: token });
  }

  async createIssue(owner, repo, title, body, options = {}) {
    const response = await this.octokit.issues.create({
      owner,
      repo,
      title,
      body,
      labels: options.labels || [],
      assignees: options.assignees || []
    });

    return response.data;
  }

  async createPullRequest(owner, repo, title, head, base, body) {
    const response = await this.octokit.pulls.create({
      owner,
      repo,
      title,
      head,
      base,
      body
    });

    return response.data;
  }

  async addComment(owner, repo, issueNumber, body) {
    const response = await this.octokit.issues.createComment({
      owner,
      repo,
      issue_number: issueNumber,
      body
    });

    return response.data;
  }

  async mergePullRequest(owner, repo, pullNumber, mergeMethod = 'merge') {
    const response = await this.octokit.pulls.merge({
      owner,
      repo,
      pull_number: pullNumber,
      merge_method: mergeMethod
    });

    return response.data;
  }

  async createRelease(owner, repo, tagName, name, body) {
    const response = await this.octokit.repos.createRelease({
      owner,
      repo,
      tag_name: tagName,
      name,
      body
    });

    return response.data;
  }

  async addLabels(owner, repo, issueNumber, labels) {
    const response = await this.octokit.issues.addLabels({
      owner,
      repo,
      issue_number: issueNumber,
      labels
    });

    return response.data;
  }

  async closeIssue(owner, repo, issueNumber) {
    const response = await this.octokit.issues.update({
      owner,
      repo,
      issue_number: issueNumber,
      state: 'closed'
    });

    return response.data;
  }

  async searchIssues(query) {
    const response = await this.octokit.search.issuesAndPullRequests({
      q: query
    });

    return response.data.items;
  }
}

module.exports = GitHubIntegration;

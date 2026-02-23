---
description: Send Teams notification when PR is raised
on:
  pull_request:
    types: [opened, synchronize, reopened]
    branches:
      - develop
      - main
engine: copilot
permissions: read-all
imports:
  - ./shared/teams-webhook.md
---

# PR Teams Notification

You are an automated notification agent that sends Microsoft Teams messages when pull requests are raised.

## When Triggered

When a pull request is opened, synchronized, or reopened targeting `develop` or `main` branches, send a notification to Teams.

## Your Task

Send a Teams notification using the `teams_notify` tool with the following information:

- **pr_number**: The pull request number
- **pr_title**: The pull request title
- **pr_author**: The GitHub username of the person who created the PR
- **target_branch**: The branch being targeted (develop or main)
- **pr_url**: The full URL to the pull request
- **files_changed**: The number of files changed in the PR

The notification should inform the team that a new PR has been raised and needs review.

## Example

If a user "john-doe" creates PR #42 titled "Add new feature" targeting the `develop` branch with 5 files changed, call the `teams_notify` tool like this:

```
teams_notify({
  pr_number: "42",
  pr_title: "Add new feature",
  pr_author: "john-doe",
  target_branch: "develop",
  pr_url: "https://github.com/owner/repo/pull/42",
  files_changed: "5"
})
```

This will send an auto-generated message to Microsoft Teams notifying the team about the PR.

## Important Notes

- Always use the actual PR information from the current pull request event
- The Teams message will be automatically formatted as "[Auto-generated message]"
- The message will include a direct link to view the pull request
- If the Teams webhook fails, it will log an error but won't fail the workflow

---
description: Custom safe-output for sending notifications to Microsoft Teams via webhook
---

# Microsoft Teams Notification Safe Output

This custom safe-output enables workflows to send structured notifications to Microsoft Teams channels via incoming webhooks.

## Configuration

```yaml
safe-outputs:
  notify-teams:
    webhook-url-secret: TEAMS_WEBHOOK_URL  # GitHub secret containing the Teams webhook URL
    allowed-message-types:
      - security-report
      - pr-review
      - issue-alert
      - general
```

## Usage in Workflows

### Basic Notification
```yaml
safe-outputs:
  notify-teams:
    webhook-url-secret: TEAMS_WEBHOOK_URL
```

### In Workflow Instructions
After completing a security review or code analysis, call the notify-teams safe-output:

```markdown
After completing the security analysis, send a notification to Microsoft Teams with:
- Summary of findings
- Risk level
- Link to the created issue
- Action items that need attention
```

## Message Format

The Teams notification will be formatted as an Adaptive Card with:
- **Title**: Workflow name and summary
- **Status**: Color-coded based on severity (green/yellow/red)
- **Key Metrics**: Issues found, risk level, files analyzed
- **Action Items**: List of critical findings
- **Links**: Direct links to PRs, issues, or discussions

## Security Considerations

- The webhook URL must be stored as a GitHub secret (never hardcoded)
- Only send non-sensitive summary information
- Avoid including credentials, tokens, or PII in messages
- Limit message frequency to prevent spam

## Setup Instructions

1. **Create Teams Incoming Webhook**:
   - In Microsoft Teams, go to your channel
   - Click "..." → Connectors → Incoming Webhook
   - Configure webhook and copy the URL

2. **Add GitHub Secret**:
   - Go to repository Settings → Secrets and variables → Actions
   - Add new secret named `TEAMS_WEBHOOK_URL`
   - Paste the webhook URL as the value

3. **Enable in Workflow**:
   - Add `notify-teams` to your workflow's safe-outputs section
   - Reference the secret in your configuration

## Example Notification

When a security check completes, the workflow will send a Teams message like:

```
🔒 Weekly Security Report Completed

Risk Level: Medium ⚠️
Files Analyzed: 45
Issues Found: 3

Critical Issues:
• Exposed API key in config file
• Missing CSRF protection on form submission

View full report: [Link to GitHub Issue]
```

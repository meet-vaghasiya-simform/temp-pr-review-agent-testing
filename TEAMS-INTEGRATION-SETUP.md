# Microsoft Teams Integration Setup Guide

## Overview

This guide will help you set up Microsoft Teams notifications for your GitHub Agentic Workflows, specifically for security reviews and PR code reviews.

## What You've Got

We've created the following components for you:

1. **PR Security Review with Teams** (`pr-security-review-with-teams.md`) - Analyzes PRs for security issues and sends Teams notifications
2. **Teams Notification Safe-Output** (`teams-notification.md`) - Documentation for the Teams integration
3. **Teams Notification Tool** (`teams-notification-tool.md`) - Tool definition for sending Teams messages
4. **Updated Weekly Security Check** - Already has network access configured for Teams webhooks

## Setup Steps

### Step 1: Create Microsoft Teams Incoming Webhook

1. **Open Microsoft Teams** and navigate to the channel where you want to receive notifications
2. Click the **three dots (...)** next to the channel name
3. Select **Connectors** or **Workflows** (depending on your Teams version)
4. Search for **Incoming Webhook**
5. Click **Add** or **Configure**
6. Give your webhook a name (e.g., "GitHub Security Reviews")
7. Optionally upload a custom image/icon
8. Click **Create**
9. **Copy the webhook URL** - you'll need this in the next step

**Important:** Keep this URL secure - anyone with it can post messages to your Teams channel!

### Step 2: Add GitHub Secret

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `TEAMS_WEBHOOK_URL`
5. Value: Paste the webhook URL you copied from Teams
6. Click **Add secret**

### Step 3: Update Workflows to Send Teams Notifications

You have two main workflows that can benefit from Teams notifications:

#### A. PR Security Review (New Workflow)

The file `pr-security-review-with-teams.md` is already configured and ready to use! It will:
- Analyze PRs for security vulnerabilities
- Add comments to PRs with findings
- Send detailed Teams notifications with:
  - PR number and title
  - Risk level
  - Number of issues found
  - List of critical issues needing attention
  - Direct links to the PR

To activate, compile the workflow:
```bash
gh aw compile .github/workflows/pr-security-review-with-teams.md
```

#### B. Weekly Security Check

Update your existing `weekly-security-check.md` by adding Teams notification instructions at the end:

Add this section before the final line of the workflow:

```markdown
## Microsoft Teams Notification

After creating the security report issue, send a notification to Microsoft Teams using the webhook stored in the `TEAMS_WEBHOOK_URL` secret.

### Sending the Teams Notification

Use the `web/fetch` tool to POST to the Teams webhook with this JSON payload:

```json
{
  "@type": "MessageCard",
  "@context": "http://schema.org/extensions",
  "themeColor": "[Use d33d3d for Critical, f4a300 for High/Medium, 28a745 for Low]",
  "summary": "Weekly Security Report Completed",
  "sections": [{
    "activityTitle": "🔒 Weekly Security Report - [Date]",
    "activitySubtitle": "Automated Security Analysis Results",
    "facts": [
      {
        "name": "Overall Risk Level:",
        "value": "[Low/Medium/High/Critical]"
      },
      {
        "name": "Files Analyzed:",
        "value": "[count]"
      },
      {
        "name": "Issues Found:",
        "value": "[total count]"
      },
      {
        "name": "Critical Findings:",
        "value": "[count]"
      }
    ],
    "text": "**Top Security Concerns:**\n1. [Most critical issue]\n2. [Second most critical issue]\n3. [Third most critical issue]"
  }],
  "potentialAction": [{
    "@type": "OpenUri",
    "name": "View Full Report",
    "targets": [{
      "os": "default",
      "uri": "[GitHub Issue URL]"
    }]
  }]
}
```

**Steps:**
1. After creating the GitHub issue successfully
2. Construct the JSON payload with actual values
3. Make POST request to `TEAMS_WEBHOOK_URL` secret
4. Set header `Content-Type: application/json`
5. If request fails, log error but continue workflow
```

### Step 4: Test the Integration

1. **Compile the workflows:**
   ```bash
   gh aw compile .github/workflows/pr-security-review-with-teams.md
   gh aw compile .github/workflows/weekly-security-check.md
   ```

2. **Test the PR Security Review:**
   - Create a test PR in your repository
   - The workflow should trigger automatically
   - Check your Teams channel for the notification

3. **Test the Weekly Security Check:**
   - Manually trigger the workflow: `gh aw run weekly-security-check`
   - Or wait for the weekly schedule
   - Check Teams for the notification

## Teams Message Format

### PR Security Review Notification

The PR security review sends an Adaptive Card with:
- **Title:** "🔒 Security Review Completed"
- **Color-coded status:** Green (low risk), Yellow (medium), Red (high/critical)
- **Key facts:**
  - PR number and title
  - Author
  - Risk level
  - Files reviewed count
  - Issues found breakdown
  - Target branch
- **Action buttons:**
  - "View Pull Request" - Direct link to PR
  - "View Security Report" - Link to PR comment

### Weekly Security Report Notification

The weekly check sends:
- **Title:** "🔒 Weekly Security Report - [Date]"
- **Status:** Overall risk level
- **Summary:** Top 3 security concerns
- **Metrics:** Files analyzed, total issues, breakdown by severity
- **Action button:** "View Full Report" - Link to GitHub issue

## Customization Options

### Change Notification Frequency

Edit the `on:` section in workflows:
```yaml
on:
  pull_request:
    types: [opened]  # Only on new PRs
    # OR
    types: [opened, synchronize]  # On new PRs and updates
```

### Filter by File Types

Add path filters to only review specific files:
```yaml
on:
  pull_request:
    paths:
      - "**/*.vue"
      - "**/*.ts"
      - "server/**"
      # Add or remove patterns as needed
```

### Customize Message Content

Edit the JSON structure in the workflow to:
- Change colors (themeColor values)
- Add/remove fact fields
- Modify the summary text
- Add more action buttons

### Add @mentions

To tag specific people in Teams:
- In your Teams webhook configuration, enable mentions
- Add mention strings to the JSON payload
- Teams will notify those users directly

## Security Best Practices

1. **Never commit the webhook URL** - Always use GitHub secrets
2. **Limit sensitive information** - Don't include actual secrets or code snippets in Teams messages  
3. **Use separate webhooks** - Consider different webhooks for different severity levels
4. **Monitor webhook usage** - Teams webhooks can be rate-limited
5. **Test in dev channel first** - Create a test channel to validate formatting

## Troubleshooting

### Teams Message Not Appearing

1. **Check workflow logs:**
   ```bash
   gh aw logs pr-security-review-with-teams
   ```

2. **Verify webhook URL:**
   - Test it manually with curl:
   ```bash
   curl -H "Content-Type: application/json" -d '{"text":"Test message"}' YOUR_WEBHOOK_URL
   ```

3. **Check network allowlist:**
   - Ensure `*.webhook.office.com` is in the workflow's network allowed list

### Invalid Webhook Error

- The webhook URL might be expired or revoked
- Recreate the webhook in Teams
- Update the GitHub secret with the new URL

### Message Formatting Issues

- Validate JSON syntax (use a JSON validator)
- Check for special characters that need escaping
- Review Microsoft Teams MessageCard schema documentation

## Advanced: Using MCP for Teams

For more sophisticated integrations, you could create a custom MCP server:

```yaml
mcp-servers:
  teams-notifier:
    url: "https://your-mcp-server.com/teams"
    headers:
      Authorization: "Bearer ${{ secrets.TEAMS_MCP_TOKEN }}"
    allowed: ["send_notification", "send_adaptive_card"]
```

This would allow more complex operations like:
- Creating polls in Teams
- Reading messages
- Managing channels
- Advanced card formatting

## Next Steps

1. ✅ Create Teams webhook
2. ✅ Add GitHub secret
3. ✅ Compile workflows
4. ✅ Test with a sample PR
5. 📝 Customize message formatting to your team's preferences
6. 📝 Set up additional webhooks for different notification types
7. 📝 Consider creating separate channels for different severity levels

## Example Workflow Execution Flow

```
PR Created → Workflow Triggered
     ↓
Security Analysis Runs
     ↓
Issues Found & Categorized
     ↓
PR Comment Added
     ↓
Labels Applied
     ↓
Critical Issue? → Create GitHub Issue
     ↓
Teams Notification Sent
     ↓
Team Members Notified in Teams
     ↓
Click "View PR" in Teams
     ↓
Review & Address Issues
```

## Support and Resources

- [GitHub Agentic Workflows Documentation](https://github.github.com/gh-aw/)
- [Microsoft Teams Incoming Webhooks](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook)
- [MessageCard Playground](https://messagecardplayground.azurewebsites.net/) - Test your card formats
- [Adaptive Cards Documentation](https://adaptivecards.io/)

---

**Need help?** Check the workflow logs with `gh aw logs <workflow-name>` or review the GitHub Actions runs in your repository's Actions tab.

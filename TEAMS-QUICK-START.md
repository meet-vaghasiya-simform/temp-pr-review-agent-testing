# Quick Reference: Teams Integration

## TL;DR Setup

1. **Create Teams Webhook**
   - Teams Channel → ⋯ → Connectors → Incoming Webhook
   - Copy webhook URL

2. **Add GitHub Secret**
   - Repo Settings → Secrets → Actions → New secret
   - Name: `TEAMS_WEBHOOK_URL`
   - Value: [paste webhook URL]

3. **Compile Workflows**
   ```bash
   gh aw compile .github/workflows/pr-security-review-with-teams.md
   ```

4. **Test**
   - Create a PR → Check Teams channel

## Files Created

| File | Purpose |
|------|---------|
| `pr-security-review-with-teams.md` | Main workflow for PR security reviews with Teams notifications |
| `shared/safe-outputs/teams-notification.md` | Documentation for Teams safe-output |
| `shared/tools/teams-notification-tool.md` | Tool definition for Teams integration |
| `shared/examples/teams-notification-examples.md` | Example payloads and scenarios |
| `TEAMS-INTEGRATION-SETUP.md` | Complete setup guide |

## Workflow Triggers

### PR Security Review
```yaml
on:
  pull_request:
    types: [opened, synchronize, reopened]
```
**Triggers:** Every time a PR is created or updated

### Weekly Security Check
```yaml
on:
  schedule: weekly
  workflow_dispatch:
```
**Triggers:** Weekly automatic scan, or manual trigger

## Teams Notification Flow

```
Security Check Complete
    ↓
Construct JSON payload
    ↓
POST to webhook URL (from secret)
    ↓
Teams channel receives message
    ↓
Team clicks "View PR" button
    ↓
Reviews and addresses issues
```

## Color Codes

| Severity | Color | Hex |
|----------|-------|-----|
| Critical/High | 🔴 Red | `d33d3d` |
| Medium | 🟡 Yellow | `f4a300` |
| Low/Success | 🟢 Green | `28a745` |
| Info | 🔵 Blue | `0078d4` |

## What Gets Sent to Teams

### PR Security Review
- PR number and title
- Author name
- Risk level (color-coded)
- Files reviewed count
- Issues breakdown (Critical/High/Medium)
- Top 3-5 critical issues
- Direct links to PR and report

### Weekly Security Report
- Scan date
- Overall risk level
- Total files analyzed
- Total issues found
- Top 3 security concerns
- Link to detailed GitHub issue

## Network Requirements

Workflow must include:
```yaml
network:
  allowed:
    - defaults
    - "*.webhook.office.com"
```

## Required Secret

```yaml
Name: TEAMS_WEBHOOK_URL
Value: https://outlook.office.com/webhook/xxxxx...
```

## Testing Webhook

```bash
# Bash/curl
curl -H "Content-Type: application/json" \
  -d '{"text":"Test from GitHub!"}' \
  YOUR_WEBHOOK_URL

# PowerShell
Invoke-RestMethod -Uri "YOUR_WEBHOOK_URL" `
  -Method Post `
  -Body '{"text":"Test from GitHub!"}' `
  -ContentType "application/json"
```

## Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| No Teams message | Check webhook URL in GitHub secrets |
| Message formatting broken | Validate JSON syntax |
| Workflow fails | Check network allowlist includes `*.webhook.office.com` |
| Wrong channel | Recreate webhook in correct Teams channel |
| 400 error | Review JSON payload format (must be valid MessageCard) |

## Next Steps

1. ✅ Set up webhook and secret (5 minutes)
2. ✅ Compile and test PR review workflow (2 minutes)
3. 📝 Customize message formatting (optional)
4. 📝 Add more workflows with Teams notifications
5. 📝 Set up different webhooks for different severity levels

## Agent Capabilities

The AI agent will automatically:
- ✅ Analyze code for security issues
- ✅ Categorize findings by severity
- ✅ Add PR comments with detailed reports
- ✅ Apply appropriate labels
- ✅ Create GitHub issues for critical findings
- ✅ Construct Teams notification payload
- ✅ Send notification to Teams webhook
- ✅ Include actionable items and direct links

## Important Best Practices

- ✅ Store webhook URL as secret (never hardcode)
- ✅ Use separate webhooks for prod/dev if needed
- ✅ Test in a dev Teams channel first
- ✅ Limit what data is sent to Teams (no secrets/PII)
- ✅ Make notifications actionable with direct links
- ⚠️ Monitor webhook rate limits (4 req/sec)

## Example Teams Message Preview

```
🔒 Security Review Completed

PR #42: Add user authentication feature
👤 Author: john.doe
📊 Risk Level: 🔴 Critical
📁 Files Reviewed: 8
🔍 Issues Found: 6 (Critical: 2, High: 1, Medium: 3)
🎯 Target Branch: develop

⚠️ Action Required:

Critical Issues:
• Exposed API key in config/api.ts (line 15)
• SQL injection vulnerability in server/api/users.ts (line 42)

High Priority:
• Missing CSRF protection on login form

[View Pull Request] [View Security Report]
```

## Support

- 📖 Full Guide: `TEAMS-INTEGRATION-SETUP.md`
- 📝 Examples: `.github/workflows/shared/examples/teams-notification-examples.md`
- 🔧 Workflow: `.github/workflows/pr-security-review-with-teams.md`
- 📚 GitHub Agentic Workflows Docs: https://github.github.com/gh-aw/

---

**Ready to start?** Go to [TEAMS-INTEGRATION-SETUP.md](../TEAMS-INTEGRATION-SETUP.md) for detailed instructions!

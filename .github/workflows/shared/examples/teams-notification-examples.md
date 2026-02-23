# Teams Notification Examples

This document provides concrete examples of how the agent will send Teams notifications.

## Example 1: PR Security Review Notification

### Scenario
A developer creates a PR that has:
- 2 critical security issues
- 1 high-priority issue
- 3 medium-priority issues

### Workflow Agent Instructions
After the security review is complete, the agent will:

1. **Construct the payload:**

```javascript
{
  "@type": "MessageCard",
  "@context": "http://schema.org/extensions",
  "themeColor": "d33d3d",  // Red for critical issues
  "summary": "Security Review Completed for PR #42",
  "sections": [{
    "activityTitle": "🔒 Security Review Completed",
    "activitySubtitle": "PR #42: Add user authentication feature",
    "activityImage": "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    "facts": [
      {
        "name": "Pull Request:",
        "value": "#42 - Add user authentication feature"
      },
      {
        "name": "Author:",
        "value": "john.doe"
      },
      {
        "name": "Risk Level:",
        "value": "🔴 Critical"
      },
      {
        "name": "Files Reviewed:",
        "value": "8"
      },
      {
        "name": "Issues Found:",
        "value": "6 (Critical: 2, High: 1, Medium: 3)"
      },
      {
        "name": "Target Branch:",
        "value": "develop"
      }
    ],
    "markdown": true,
    "text": "**⚠️ Action Required:**\n\n**Critical Issues:**\n• Exposed API key in config/api.ts (line 15)\n• SQL injection vulnerability in server/api/users.ts (line 42)\n\n**High Priority:**\n• Missing CSRF protection on login form\n\nPlease review and address these issues before merging."
  }],
  "potentialAction": [
    {
      "@type": "OpenUri",
      "name": "View Pull Request",
      "targets": [{
        "os": "default",
        "uri": "https://github.com/your-org/your-repo/pull/42"
      }]
    },
    {
      "@type": "OpenUri",
      "name": "View Security Report",
      "targets": [{
        "os": "default",
        "uri": "https://github.com/your-org/your-repo/pull/42#issuecomment-123456"
      }]
    }
  ]
}
```

2. **Send via web/fetch tool:**

The agent will use the `web/fetch` tool (available in workflows) to make this HTTP POST request:

**Pseudo-implementation:**
```
POST https://outlook.office.com/webhook/YOUR-WEBHOOK-ID
Content-Type: application/json

[JSON payload above]
```

## Example 2: Weekly Security Report Notification (No Critical Issues)

### Scenario
Weekly scan finds:
- 0 critical issues
- 0 high-priority issues  
- 5 medium-priority items
- Overall risk: Low

### Teams Notification Payload

```json
{
  "@type": "MessageCard",
  "@context": "http://schema.org/extensions",
  "themeColor": "28a745",
  "summary": "Weekly Security Report Completed",
  "sections": [{
    "activityTitle": "🔒 Weekly Security Report - February 23, 2026",
    "activitySubtitle": "Automated Security Analysis Results",
    "activityImage": "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    "facts": [
      {
        "name": "Overall Risk Level:",
        "value": "🟢 Low"
      },
      {
        "name": "Files Analyzed:",
        "value": "145"
      },
      {
        "name": "Issues Found:",
        "value": "5"
      },
      {
        "name": "Critical Findings:",
        "value": "0"
      },
      {
        "name": "High Priority:",
        "value": "0"
      },
      {
        "name": "Medium Priority:",
        "value": "5"
      }
    ],
    "markdown": true,
    "text": "**Summary:**\n\nGreat news! No critical or high-priority security issues found this week.\n\n**Medium Priority Items to Address:**\n1. Update lodash dependency to v4.17.21\n2. Add CSP headers to production build\n3. Remove unused npm packages\n4. Enable strict TypeScript mode\n5. Add input validation to contact form\n\nℹ️ Review the full report for details and recommendations."
  }],
  "potentialAction": [
    {
      "@type": "OpenUri",
      "name": "View Full Report",
      "targets": [{
        "os": "default",
        "uri": "https://github.com/your-org/your-repo/issues/789"
      }]
    },
    {
      "@type": "OpenUri",
      "name": "View Repository",
      "targets": [{
        "os": "default",
        "uri": "https://github.com/your-org/your-repo"
      }]
    }
  ]
}
```

## Example 3: High Severity Weekly Report

### Scenario
Weekly scan finds critical vulnerabilities

### Teams Notification Payload

```json
{
  "@type": "MessageCard",
  "@context": "http://schema.org/extensions",
  "themeColor": "d33d3d",
  "summary": "🚨 Critical Security Issues Found",
  "sections": [{
    "activityTitle": "🚨 Weekly Security Report - CRITICAL",
    "activitySubtitle": "Immediate Action Required",
    "activityImage": "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    "facts": [
      {
        "name": "Overall Risk Level:",
        "value": "🔴 CRITICAL"
      },
      {
        "name": "Files Analyzed:",
        "value": "145"
      },
      {
        "name": "Issues Found:",
        "value": "12"
      },
      {
        "name": "Critical Findings:",
        "value": "3"
      },
      {
        "name": "High Priority:",
        "value": "4"
      },
      {
        "name": "Medium Priority:",
        "value": "5"
      }
    ],
    "markdown": true,
    "text": "**⚠️ IMMEDIATE ACTION REQUIRED! ⚠️**\n\n**Critical Security Vulnerabilities:**\n1. 🚨 Hardcoded database password in server/config/db.ts\n2. 🚨 Exposed API keys in .env file committed to git\n3. 🚨 SQL injection vulnerability in user query endpoint\n\n**High Priority Issues:**\n• Missing authentication on admin routes\n• Weak password hashing algorithm (MD5)\n• CORS configured to allow all origins\n• Missing rate limiting on API endpoints\n\n**This requires immediate security team review!**"
  }],
  "potentialAction": [
    {
      "@type": "OpenUri",
      "name": "🔴 View Critical Report",
      "targets": [{
        "os": "default",
        "uri": "https://github.com/your-org/your-repo/issues/790"
      }]
    },
    {
      "@type": "OpenUri",
      "name": "Security Guidelines",
      "targets": [{
        "os": "default",
        "uri": "https://github.com/your-org/your-repo/blob/main/.github/agents/security-reviewer.agent.md"
      }]
    }
  ]
}
```

## How the Agent Accesses the Webhook URL

The agent has access to GitHub secrets through environment variables. In the workflow, access it like:

```
The webhook URL is available in the secret: TEAMS_WEBHOOK_URL
```

The agent will construct an HTTP POST request using the `web/fetch` tool that's available in workflows with `network:` access enabled.

## Color Coding Reference

Use these hex color codes for `themeColor`:

| Risk Level | Color | Hex Code | Usage |
|------------|-------|----------|-------|
| Low | Green | `28a745` | No critical/high issues |
| Medium | Yellow/Orange | `f4a300` | High-priority items present |
| High | Red | `d33d3d` | Critical issues found |
| Info | Blue | `0078d4` | General notifications |

## Testing Your Notification

You can test the Teams webhook directly using curl:

```bash
curl -H "Content-Type: application/json" \
  -d '{
    "@type": "MessageCard",
    "@context": "http://schema.org/extensions",
    "themeColor": "0078d4",
    "summary": "Test Notification",
    "sections": [{
      "activityTitle": "Test from GitHub Agentic Workflow",
      "text": "If you see this, your webhook is working!"
    }]
  }' \
  YOUR_TEAMS_WEBHOOK_URL
```

Or use PowerShell on Windows:

```powershell
$body = @{
    "@type" = "MessageCard"
    "@context" = "http://schema.org/extensions"
    "themeColor" = "0078d4"
    "summary" = "Test Notification"
    "sections" = @(
        @{
            "activityTitle" = "Test from GitHub Agentic Workflow"
            "text" = "If you see this, your webhook is working!"
        }
    )
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "YOUR_TEAMS_WEBHOOK_URL" -Method Post -Body $body -ContentType "application/json"
```

## Agent Implementation Notes

When the agent executes the workflow, it will:

1. **Complete all security analysis** first
2. **Create PR comments/issues** as needed
3. **Collect all relevant data** (issue counts, file counts, etc.)
4. **Determine severity** based on findings
5. **Choose appropriate theme color**
6. **Construct JSON payload** with actual values
7. **Make HTTP POST request** to Teams webhook
8. **Handle response** (log success or error)
9. **Continue workflow** even if Teams notification fails (non-blocking)

The agent uses natural language processing to understand these instructions and will execute them autonomously when the workflow is triggered.

## MessageCard vs Adaptive Card

Currently using **MessageCard** format (Legacy connectors):
- ✅ Simple to implement
- ✅ Works with Incoming Webhooks
- ✅ Good for basic notifications
- ⚠️ Being deprecated in favor of Adaptive Cards

For future-proofing, consider migrating to **Adaptive Cards**:
- Uses Office 365 Connectors workflow
- More interactive elements
- Better mobile support
- Modern Teams platform

## Additional Resources

- [MessageCard Reference](https://docs.microsoft.com/en-us/outlook/actionable-messages/message-card-reference)
- [MessageCard Playground](https://messagecardplayground.azurewebsites.net/) - Test your cards
- [Adaptive Cards Designer](https://adaptivecards.io/designer/) - For future migration
- [Teams Webhook Limits](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/connectors-using#rate-limiting-for-connectors) - 4 requests per second per webhook

---

These examples show exactly what the Teams channel will receive when the workflows run. The agent handles all the complexity of constructing these payloads based on its analysis!

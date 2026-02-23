---
description: Reusable Teams message templates for common notification types
---

# Teams Message Templates

This file defines reusable templates and examples for messages sent to Microsoft Teams via the `teams-notify` safe-output. Workflows and agents should set `message_type` and provide template fields (e.g., `plain_summary`, `critical_comments`) so the webhook runner can format the message consistently.

## Supported message_type values

- `pr_review` — Pull request review notification (default)
- `security` — Security scan / report notification
- `daily_status` — Daily status summary for teams

## Template examples

### pr_review
- Title: Pull Request Raised
- Color: `0078d4` (blue)
- Sections:
  - PR details (author, number, title, target branch)
  - Plain-language summary (`plain_summary`)
  - Critical comments (`critical_comments`)
  - Files changed
  - Action: View Pull Request

### security
- Title: Security Report
- Color: `d33d3d` (red)
- Sections:
  - Summary of findings (`plain_summary`)
  - Risk level and key metrics
  - Critical issues list (`critical_comments`)
  - Action: View Issue / Report

### daily_status
- Title: Daily Status Update
- Color: `28a745` (green)
- Sections:
  - Short summary (`plain_summary`)
  - Key highlights or blockers (`critical_comments` for urgent items)
  - Action: View Dashboard or Runbook

## Guidelines

- Store the Teams webhook URL in the `TEAMS_WEBHOOK_URL` secret.
- Keep `plain_summary` short (2-3 sentences) and non-sensitive.
- If there are no critical findings, set `critical_comments` to: `No critical issues found.`

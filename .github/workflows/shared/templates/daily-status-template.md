---
description: Teams template for daily status update notifications
---

# Daily Status Template

This import defines the `daily_status` message template and usage guidance.

teams_template:
  message_type: daily_status
  themeColor: '28a745'
  activityTitle: 'Daily Status Update'
  summary: 'Daily Status'
  sections:
    - name: summary
      fields: [plain_summary]
    - name: highlights
      fields: [critical_comments]

usage:
  - workflow: daily-status.md
    set: message_type: daily_status
    provide: [plain_summary, critical_comments]

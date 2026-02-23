---
description: Teams template for security report notifications
---

# Security Template

This import defines the `security` message template and usage guidance.

teams_template:
  message_type: security
  themeColor: 'd33d3d'
  activityTitle: 'Security Report'
  summary: 'Security Scan Results'
  sections:
    - name: summary
      fields: [plain_summary]
    - name: metrics
      fields: [risk_level, files_analyzed, issues_found]
    - name: critical_issues
      fields: [critical_comments]

usage:
  - workflow: pr-security-review-with-teams.md
    set: message_type: security
    provide: [plain_summary, critical_comments, risk_level, issues_found]

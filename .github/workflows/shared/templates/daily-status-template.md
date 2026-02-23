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
    - name: overview
      fields: [plain_summary, total_prs]
    - name: prs_by_author
      # `prs_by_author` should be pre-formatted Markdown grouping PRs by author.
      # Example:
      # **alice** (2 PRs)
      # - [#123] Fix login — brief one-line summary
      #   - Files: src/auth.js, tests/auth.test.js
      # - [#124] Add logout — brief one-line summary
      # **bob** (1 PR)
      # - [#125] Upgrade deps — brief one-line summary
      fields: [prs_by_author]

usage:
  - workflow: daily-status.md
    set: message_type: daily_status
    provide: [plain_summary, total_prs, prs_by_author]

notes:
  - `total_prs`: total number of PRs raised today (string or number)
  - `prs_by_author`: Markdown-formatted grouped list of PRs by username. Each author group should include a one-line bullet per PR and optional sub-bullets with details (files changed, labels, short notes).
  - Keep `prs_by_author` concise — use 1-2 bullets per PR and 1-2 sub-items for details.

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
      # `prs_by_author` must be pre-formatted Markdown grouping PRs by author.
      # REQUIRED structure (group by username, then PRs with bullets and details):
      # **username** (N PRs)
      # - [#123](https://github.com/owner/repo/pull/123) Short one-line PR title
      #   - Changes:
      #     - Modified: src/auth.js
      #     - Added: tests/auth.test.js
      #     - Notes: Fixed input validation causing 500 error
      # - [#124](https://github.com/owner/repo/pull/124) Another PR title
      #   - Changes:
      #     - Modified: src/logout.js
      #     - Notes: Adds logout endpoint and docs
      # **otheruser** (1 PR)
      # - [#125](https://github.com/owner/repo/pull/125) Upgrade deps
      #   - Changes:
      #     - Modified: package.json, package-lock.json
      #      - Notes: Bumped lodash to address CVE-XXXX
      fields: [prs_by_author]

usage:
  - workflow: daily-status.md
    set: message_type: daily_status
    provide: [plain_summary, total_prs, prs_by_author]

notes:
  - `total_prs`: total number of PRs raised today (string or number)
  - `prs_by_author`: Markdown-formatted grouped list of PRs by username. Follow the REQUIRED structure above: group by `**username**`, then list PRs as bullets with an indented `Changes:` sub-list. Each PR entry should include:
    - a clickable PR link and short title on the first line,
    - an indented `Changes:` list with up to 3 short bullets: files modified/added/removed and a one-line note.
  - Keep `prs_by_author` concise — aim for 1–3 PRs per author in the body and 1–3 change bullets per PR. Excess detail can be moved into the PR description or a linked issue.

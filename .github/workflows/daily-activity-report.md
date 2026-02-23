---
description: |
  This workflow creates daily repository activity reports. It analyzes recent
  repository activity including issues, pull requests, commits, discussions,
  and releases to generate comprehensive daily reports delivered as GitHub issues.

on:
  schedule: daily
  workflow_dispatch:

permissions:
  contents: read
  issues: read
  pull-requests: read

network: defaults

tools:
  github:
    lockdown: false

imports:
  - ./shared/teams-webhook.md
  - ./shared/templates/daily-status-template.md

engine: copilot
---

# Daily Repository Activity Report

Create a comprehensive daily activity report for the repository as a GitHub issue.

## What to Include

Analyze and report on the following repository activity from the last 24 hours:

### 1. Issues Activity
- New issues opened
- Issues closed or resolved
- Issues updated with significant activity
- Key discussions and community engagement

### 2. Pull Requests Activity
- New pull requests opened
- Pull requests merged
- Pull requests closed without merging
- PRs with significant review activity
- Notable code changes

### 3. Commits and Code Changes
- Number of commits
- Key contributors
- Significant code changes or refactoring
- New files added or removed

### 4. Releases and Tags
- New releases published
- New tags created
- Version updates

### 5. Discussions and Community
- New discussions started
- Active discussion threads
- Community highlights

### 6. Project Insights
- Progress towards goals or milestones
- Trends in activity (increasing/decreasing)
- Areas needing attention
- Actionable recommendations for maintainers

## Report Format

Create a well-structured GitHub issue with the following format:

### Title
`[daily-report] Repository Activity for [Date]`

### Content Structure

```markdown
# 📊 Daily Repository Activity Report - [Date]

## 🎯 Summary

[Brief 2-3 sentence overview of the day's activity]

## 📈 Activity Metrics

- **Issues**: X opened, Y closed, Z active
- **Pull Requests**: X opened, Y merged, Z closed
- **Commits**: X total commits by Y contributors
- **Discussions**: X new, Y active threads

## 🔥 Highlights

[3-5 key highlights from today's activity - use emojis sparingly]

## 📝 Issues

[Details about notable issues - opened, closed, or updated]

## 🔀 Pull Requests

[Details about notable PRs - opened, merged, or reviewed]

## 💻 Code Changes

[Summary of significant commits and code changes]

## 🚀 Releases & Milestones

[Any releases, tags, or milestone progress]

## 💬 Community Activity

[Discussions, community engagement, new contributors]

## 🎯 Recommendations

[Actionable insights and recommendations for maintainers]

## 📅 Next Steps

[Suggested focus areas or action items for tomorrow]
```

## Style Guidelines

- **Be informative and concise**: Focus on meaningful activity, not noise
- **Use emojis moderately**: Add visual interest without overwhelming
- **Be data-driven**: Include actual numbers and metrics
- **Highlight what matters**: Focus on notable items, not every minor update
- **Be actionable**: Provide insights that help maintainers prioritize
- **Adjust length**: Scale the report based on actual activity (short day = short report)
- **Stay positive**: Maintain an encouraging and helpful tone

## Process

1. **Gather Data**
   - Use GitHub tools to fetch issues from the last 24 hours
   - Fetch pull requests from the last 24 hours
   - Get recent commits using list_commits
   - Check for new releases and tags
   - Review discussions if the repository has them enabled

2. **Analyze Activity**
   - Identify the most significant events
   - Calculate key metrics
   - Spot trends or patterns
   - Determine what needs attention

3. **Generate Insights**
   - Provide meaningful analysis beyond raw data
   - Identify blockers or areas needing help
   - Recognize community contributions
   - Suggest priorities

4. **Send Daily Report to Teams**
  - Format the report following the structure above
  - Send the report to Microsoft Teams using the `teams-notify` safe-output and the `daily_status` template
  - Required fields to include in the payload (recommended):
    - `message_type`: `daily_status`
    - `plain_summary`: 2-3 sentence summary of the day's activity
    - `total_prs`: total number of PRs raised today (number or string)
    - `prs_by_author`: Markdown-formatted grouped list of PRs by username (see example below)
    - `critical_comments`: short list of urgent highlights or blockers (or `No critical issues found.`)
    - `details`: optional structured object with metrics (issues, prs, commits, etc.)
  - Example agent output item (the agent should emit an item of type `teams_notify`):

```json
{
  "type": "teams_notify",
  "message_type": "daily_status",
  "plain_summary": "Moderate activity: 5 PRs opened, 2 merged. One PR needs urgent review.",
  "total_prs": 5,
  "prs_by_author": "**alice** (2 PRs)\n- [#423] Fix login validation — prevents 500 on empty input\n  - Files: src/auth.js, tests/auth.test.js\n- [#424] Add logout endpoint — short description\n**bob** (1 PR)\n- [#425] Upgrade deps — bump lodash and axios\n**carol** (2 PRs)\n- [#426] Improve caching — reduces DB load\n- [#427] Update docs — API examples",
  "critical_comments": "- PR #426: Potential performance regression in cache layer\n- PR #423: Failing unit tests on CI",
  "details": { "issues_opened": 1, "prs_opened": 5, "prs_merged": 2, "commits": 12 }
}
```

  - The imported `daily_status` template will format the Teams card and post to the configured channel. Ensure the agent populates `prs_by_author` as concise Markdown (1-2 bullets per PR plus optional 1-2 detail sub-bullets) so messages remain readable.

## Special Cases

- **Low Activity Days**: If there's minimal activity, create a brief report acknowledging the quiet day
- **High Activity Days**: For very active days, prioritize the most impactful items
- **No Activity**: Still create a report noting the repository is quiet
- **Errors**: If you can't fetch certain data, note it in the report and provide available information

## Technical Notes

- Use `search_issues` and `search_pull_requests` with date filters for last 24 hours
- Use `list_commits` with appropriate date parameters
- Calculate dates using appropriate bash commands (the agent has access to standard date utilities)
- Handle pagination for repositories with high activity
- The safe-outputs configuration will automatically add labels and title prefix

Good luck! Your daily reports help maintainers stay on top of repository activity! 🌟

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

safe-outputs:
  create-issue:
    title-prefix: "[daily-report] "
    labels: [report, daily-activity]

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

4. **Create the Issue**
   - Format the report following the structure above
   - Use the safe-outputs create-issue tool
   - Ensure the title includes the current date
   - Add appropriate labels (already configured)

## Special Cases

- **Low Activity Days**: If there's minimal activity, create a brief report acknowledging the quiet day
- **High Activity Days**: For very active days, prioritize the most impactful items
- **No Activity**: Still create a report noting the repository is quiet
- **Errors**: If you can't fetch certain data, note it in the report and provide available information

## Technical Notes

- Use `search_issues` and `search_pull_requests` with date filters for last 24 hours
- Use `list_commits` with appropriate date parameters
- Calculate yesterday's date: `date -u -d "1 day ago" +%Y-%m-%d`
- Today's date for the report: `date -u +%Y-%m-%d`
- Handle pagination for repositories with high activity
- The safe-outputs configuration will automatically add labels and title prefix

Good luck! Your daily reports help maintainers stay on top of repository activity! 🌟

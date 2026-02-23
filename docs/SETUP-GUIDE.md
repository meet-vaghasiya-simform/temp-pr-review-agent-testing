````markdown
# PR Reviewer Setup Guide

This repository includes **AI-powered automation systems** that enhance development workflow:

1. **Custom Copilot Agent** - Manual code reviews in VS Code/GitHub.com
2. **Automated PR Review Workflow** - Automatic reviews on push/PR events
3. **Daily Repo Status** - Daily activity reports and insights
4. **Daily Activity Report** - Comprehensive daily activity summaries with metrics
5. **Daily Documentation Updater** - Automatic documentation maintenance

---

## 📋 Table of Contents

- [System 1: Custom Copilot Agent (Manual Reviews)](#system-1-custom-copilot-agent-manual-reviews)
- [System 2: Agentic Workflow (Automatic Reviews)](#system-2-agentic-workflow-automatic-reviews)
- [System 3: Daily Repo Status](#system-3-daily-repo-status)
- [System 4: Daily Activity Report](#system-4-daily-activity-report)
- [System 5: Daily Documentation Updater](#system-5-daily-documentation-updater)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Comparison](#comparison)
- [Troubleshooting](#troubleshooting)

---

## System 1: Custom Copilot Agent (Manual Reviews)

### What is it?

A specialized Copilot agent that you can invoke in Visual Studio Code or GitHub.com to perform comprehensive code reviews. It's expert in:
- Code quality and best practices
- Security vulnerability detection
- Performance analysis
- Nuxt.js/Vue.js specific patterns
- TypeScript, TailwindCSS, and web development

### File Location

```
.github/agents/pr-reviewer.agent.md
```

### How to Use

#### In Visual Studio Code:

1. **Install GitHub Copilot** (required)
   - Ensure you have GitHub Copilot Pro, Pro+, Business, or Enterprise subscription

2. **Open GitHub Copilot Chat**
   - Press `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Shift+I` (Mac)
   - Or click the Copilot icon in the Activity Bar

3. **Select the PR Reviewer Agent**
   - Click the agent dropdown at the bottom of the chat view
   - Select **"PR Reviewer"** from the list
   - If you don't see it, try:
     * Click "Configure Custom Agents..."
     * Refresh or reload VS Code
     * Ensure the `.github/agents/pr-reviewer.agent.md` file exists

4. **Request a Review**
   ```
   Examples:
   - "Review the changes in src/components/Header.vue"
   - "Analyze all my uncommitted changes"
   - "Review this pull request for security issues"
   - "Check the performance of my database queries"
   ```

#### On GitHub.com:

1. Navigate to https://github.com/copilot/agents
2. Select your repository from the dropdown
3. Select the **PR Reviewer** agent
4. Ask it to review specific files or PRs

### Benefits of Manual Reviews

- ✅ On-demand reviews when you need them
- ✅ Interactive conversations about code
- ✅ Detailed explanations and teaching moments
- ✅ Works with local uncommitted changes
- ✅ No GitHub Actions minutes consumed

---

## System 2: Agentic Workflow (Automatic Reviews)

### What is it?

An AI-powered GitHub Actions workflow that **automatically triggers** when code is pushed or a PR is created. It analyzes changes and posts review comments without any manual intervention.

### File Location

```
.github/workflows/code-review-agent.md (source - needs compilation)
.github/workflows/code-review-agent.lock.yml (compiled - auto-generated)
```

### Prerequisites

**IMPORTANT**: Before this workflow can run, you need to:

1. **Install GitHub CLI Extension for Agentic Workflows**
```bash
gh extension install github/gh-aw
```

2. **Verify Installation**
```bash
gh aw --version
```

3. **Have Repository Access**
 - GitHub Copilot subscription (Pro, Pro+, Business, or Enterprise)
 - Repository write access to commit the generated workflow file

### Setup Instructions

#### Step 1: Compile the Workflow

The markdown file needs to be compiled into a GitHub Actions workflow:

```bash
# Navigate to your repository
cd c:\Users\meet.vaghasiya\Desktop\projects\demo\PR-reviewer

# Compile the workflow
gh aw compile .github/workflows/code-review-agent.md

# This creates .github/workflows/code-review-agent.lock.yml
```

#### Step 2: Commit and Push

```bash
git add .github/workflows/code-review-agent.lock.yml
git commit -m "Add automated PR review workflow"
git push
```

#### Step 3: Verify Deployment

1. Go to your GitHub repository
2. Navigate to **Actions** tab
3. You should see "Code Review Agent - Automatic PR Analyzer" workflow
4. Make a test push or create a PR to trigger it

### How It Works

1. **Triggers automatically** when:
   - Code is pushed to `main`, `develop`, or `feature/**` branches
   - A pull request is opened, synchronized, or reopened

2. **Analyzes** all changed files for:
   - Security vulnerabilities
   - Performance issues
   - Code quality problems
   - Framework-specific best practices
   - Testing gaps

3. **Posts a review** with:
   - Categorized findings (Critical, Important, Nice-to-Have)
   - Specific file and line references
   - Code quality metrics
   - Recommended labels

4. **Takes actions**:
   - Adds relevant labels (`security`, `performance`, `needs-tests`, etc.)
   - Creates issues for critical security problems
   - Posts comments on PRs or commits

### Customization

Edit `.github/workflows/code-review-agent.md` to customize:

- **Triggers**: Change which branches or events trigger reviews
  ```yaml
  on:
    push:
      branches:
        - main
        - your-branch-pattern
  ```

- **Review Focus**: Modify the instructions to emphasize specific concerns
  - Add more security checks
  - Focus on specific file types
  - Adjust sensitivity levels

After editing, **recompile**:
```bash
gh aw compile .github/workflows/code-review-agent.md
git add .github/workflows/code-review-agent.lock.yml
git commit -m "Update review workflow"
git push
```

### Benefits of Automatic Reviews

- ✅ Immediate feedback on every push
- ✅ Catches issues before manual review
- ✅ Consistent review quality
- ✅ No human intervention needed
- ✅ Works 24/7

---

## System 3: Daily Repo Status

### What is it?

An automated workflow that runs daily to generate comprehensive repository activity reports. It creates GitHub issues with insights on recent PRs, issues, discussions, releases, and code changes.

### File Location

```
.github/workflows/daily-repo-status.md (source)
.github/workflows/daily-repo-status.lock.yml (compiled)
```

### What It Does

The Daily Repo Status workflow:
- **Gathers recent activity** from the last 24 hours including:
  - Merged and open pull requests
  - New and updated issues
  - Discussions and comments
  - Releases and tags
  - Significant code changes
- **Generates insights** on:
  - Team productivity trends
  - Community engagement highlights
  - Project progress toward goals
  - Actionable recommendations for maintainers
- **Creates a GitHub issue** with a daily status report
  - Tagged with `[repo-status]` prefix
  - Labeled with `report` and `daily-status`
  - Written in an upbeat, encouraging tone

### How to Use

This workflow is **already configured** and runs automatically! 

**Schedule**: Runs daily at a random time

**Trigger Manually**:
```bash
# Go to Actions tab → Daily Repo Status → Run workflow
```

Or via GitHub CLI:
```bash
gh workflow run "Daily Repo Status"
```

### Benefits

- ✅ Stay informed about repository activity
- ✅ Track progress and identify trends
- ✅ Get actionable recommendations for maintainers
- ✅ Improve team visibility and coordination
- ✅ No manual effort required

---

## System 4: Daily Activity Report

### What is it?

An automated workflow that generates comprehensive daily repository activity summaries as GitHub issues. It analyzes and tracks issues, pull requests, commits, releases, and community engagement from the last 24 hours.

### File Location

```
.github/workflows/daily-activity-report.md (source)
.github/workflows/daily-activity-report.lock.yml (compiled)
.github/workflows/agentics-maintenance.yml (auto-generated cleanup workflow)
```

### What It Does

The Daily Activity Report workflow:
- **Analyzes recent activity** from the last 24 hours:
  - Issues opened, closed, or updated
  - Pull requests opened, merged, or closed
  - Commit activity and significant code changes
  - Releases and version tags
  - Community discussions and engagement
- **Generates structured reports** with:
  - Activity metrics and statistics
  - Highlights and notable events
  - Trends and patterns
  - Actionable recommendations for maintainers
  - Categorized breakdowns by activity type
- **Creates GitHub issues** automatically:
  - Tagged with `[daily-report]` prefix
  - Labeled with `report` and `daily-activity`
  - Uses safe-outputs pattern for issue creation
  - Read-only permissions in main workflow, write isolated to safe_outputs job

### How to Use

This workflow is **already configured** and runs automatically!

**Schedule**: Runs daily with fuzzy scheduling (auto-scattered to 9:43 UTC to distribute load)

**Trigger Manually**:
```bash
# Go to Actions tab → Daily Activity Report → Run workflow
```

Or via GitHub CLI:
```bash
gh workflow run "Daily Activity Report"
```

### Key Features

- **Safe-outputs pattern**: Uses declarative issue creation instead of direct GitHub API access for better security
- **Fuzzy scheduling**: Uses `schedule: daily` rather than explicit cron to distribute load across GitHub infrastructure
- **Permission model**: Read-only in main workflow, write permission isolated to compiler-managed safe_outputs job
- **Auto-cleanup**: Maintenance workflow automatically generated for expired entities management

### Benefits

- ✅ Comprehensive daily activity tracking
- ✅ Structured metrics and insights
- ✅ Actionable recommendations for team
- ✅ Automated issue creation with proper labeling
- ✅ Secure permission model with isolated writes
- ✅ No manual intervention needed

---

## System 5: Daily Documentation Updater

### What is it?

An automated workflow that scans for merged pull requests and code changes from the last 24 hours, identifies documentation gaps, and creates pull requests with documentation updates.

### File Location

```
.github/workflows/daily-doc-updater.md (source)
.github/workflows/daily-doc-updater.lock.yml (compiled)
```

### What It Does

The Daily Documentation Updater workflow:
- **Scans recent changes** in the last 24 hours:
  - Merged pull requests
  - Significant commits
  - New features and API changes
- **Identifies documentation gaps**:
  - Features not yet documented
  - Modified APIs needing updates
  - Breaking changes requiring notices
- **Updates documentation automatically**:
  - Adds new sections for new features
  - Updates existing sections for modified features
  - Maintains consistency with existing documentation style
  - Includes code examples and links to related PRs
- **Creates a pull request** with the updates:
  - Tagged with `[docs]` prefix
  - Labeled with `documentation` and `automation`
  - Includes summary of changes and references to source PRs

### How to Use

This workflow is **already configured** and runs automatically!

**Schedule**: Runs daily at a random time

**Trigger Manually**:
```bash
# Go to Actions tab → Daily Documentation Updater → Run workflow
```

Or via GitHub CLI:
```bash
gh workflow run "Daily Documentation Updater"
```

### Benefits

- ✅ Keep documentation in sync with code changes
- ✅ Reduce manual documentation burden
- ✅ Ensure new features are documented promptly
- ✅ Maintain consistent documentation quality
- ✅ Free up developers to focus on coding

### Customization

Edit `.github/workflows/daily-doc-updater.md` to customize:
- Time period to scan (default: 24 hours)
- Documentation style and tone
````

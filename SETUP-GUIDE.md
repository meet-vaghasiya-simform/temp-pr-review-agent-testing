# Setup Guide - AI-Powered Tools

This repository includes **three AI-powered tools** using GitHub Copilot:

1. **Custom Copilot Agent** - Manual code reviews in VS Code/GitHub.com
2. **Daily Documentation Updater** - Automatically updates documentation based on code changes
3. **Daily Repo Status** - Creates daily status reports and insights

---

## 📋 Table of Contents

- [Tool 1: Custom Copilot Agent (Manual Reviews)](#tool-1-custom-copilot-agent-manual-reviews)
- [Tool 2: Daily Documentation Updater](#tool-2-daily-documentation-updater)
- [Tool 3: Daily Repo Status](#tool-3-daily-repo-status)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Comparison](#comparison)
- [Troubleshooting](#troubleshooting)

---

## Tool 1: Custom Copilot Agent (Manual Reviews)

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

## Tool 2: Daily Documentation Updater

### What is it?

An AI-powered GitHub Actions workflow that automatically scans merged pull requests from the last 24 hours, identifies new features or changes that need documentation, and creates pull requests to update the documentation files.

### File Location

```
.github/workflows/daily-doc-updater.md (source)
.github/workflows/daily-doc-updater.lock.yml (compiled - auto-generated)
```

### How it Works

The workflow runs daily (via cron schedule) and:
1. Scans for merged PRs and commits from the last 24 hours
2. Analyzes changes to identify new features, modifications, or removed functionality
3. Reviews existing documentation to identify gaps
4. Updates documentation files following the repository's style
5. Creates a pull request with the documentation improvements

### Prerequisites

**IMPORTANT**: Before this workflow can run, you need to:

1. **Install GitHub CLI Extension for Agentic Workflows**
   ```bash
   gh extension install github/gh-aw
   ```

2. **GitHub Copilot Subscription**
   - Required: GitHub Copilot Pro, Pro+, Business, or Enterprise
   - Repository write access to commit the generated workflow file

#### Step 1: Compile the Workflow

The markdown file needs to be compiled into a GitHub Actions workflow:

```bash
# Navigate to repository root
cd /path/to/your/repo

# Compile the workflow
gh aw compile .github/workflows/daily-doc-updater.md

# This creates .github/workflows/daily-doc-updater.lock.yml

# Commit and push
git add .github/workflows/daily-doc-updater.lock.yml
git commit -m "Add daily documentation updater workflow"
git push
```

#### Step 2: Verify the Workflow

1. Go to your repository on GitHub
2. Click on the "Actions" tab
3. You should see "Daily Documentation Updater" workflow
4. The workflow will run daily automatically, or you can trigger it manually using "workflow_dispatch"

### Benefits

- ✅ Keeps documentation automatically up-to-date
- ✅ Catches documentation gaps from recent changes
- ✅ Maintains consistent documentation style
- ✅ Creates reviewable PRs instead of direct commits
- ✅ Reduces manual documentation maintenance

### Customization

Edit `.github/workflows/daily-doc-updater.md` to customize:
- Schedule timing (currently runs daily)
- Documentation scanning behavior
- PR labels and title format
- The agent's instructions

After editing, recompile:
```bash
gh aw compile .github/workflows/daily-doc-updater.md
git add .github/workflows/daily-doc-updater.lock.yml
git commit -m "Update documentation updater workflow"
git push
```

---

## Tool 3: Daily Repo Status

### What is it?

An AI-powered GitHub Actions workflow that creates daily status reports as GitHub issues. It gathers recent repository activity and generates engaging reports with productivity insights, community highlights, and actionable recommendations.

### File Location

```
.github/workflows/daily-repo-status.md (source)
.github/workflows/daily-repo-status.lock.yml (compiled - auto-generated)
```

### How it Works

The workflow runs daily and:
1. Gathers recent activity (issues, PRs, discussions, releases, code changes)
2. Analyzes progress and identifies trends
3. Creates a GitHub issue with an upbeat status report
4. Provides actionable next steps for maintainers

### Prerequisites

Same as Daily Documentation Updater:
- GitHub CLI with `gh-aw` extension
- GitHub Copilot subscription

#### Setup Steps

```bash
# Compile the workflow
gh aw compile .github/workflows/daily-repo-status.md

# Commit and push
git add .github/workflows/daily-repo-status.lock.yml
git commit -m "Add daily repo status workflow"
git push
```

### Benefits

- ✅ Daily visibility into repository health
- ✅ Tracks trends and progress over time
- ✅ Provides actionable recommendations
- ✅ Encourages community engagement
- ✅ Helps maintainers stay organized

---

## Prerequisites

### Required for All Tools:

1. **GitHub Copilot Subscription**
   - GitHub Copilot Pro ($10/month)
   - GitHub Copilot Pro+ ($39/month)
   - GitHub Copilot Business (organization plan)
   - GitHub Copilot Enterprise (enterprise plan)
   
   [Sign up here](https://github.com/features/copilot/plans)

### Required for Custom Agent Only:

2. **Visual Studio Code** with GitHub Copilot extension

### Required for Agentic Workflows (Daily Doc Updater & Repo Status):

3. **GitHub CLI with Agentic Workflows Extension**
   ```bash
   # Install GitHub CLI if you don't have it
   # Windows: winget install GitHub.cli
   # Mac: brew install gh
   # Linux: See https://github.com/cli/cli#installation

   # Install the extension
   gh extension install github/gh-aw
   ```

---

## Quick Start

### To Use Custom Agent (Manual Reviews):

1. Open VS Code in this repository
2. Open Copilot Chat (`Ctrl+Shift+I`)
3. Select "PR Reviewer" agent
4. Ask: "Review my recent changes"

### To Deploy Agentic Workflows:

```bash
# 1. Install gh-aw extension
gh extension install github/gh-aw

# 2. Compile both workflows
gh aw compile .github/workflows/daily-doc-updater.md
gh aw compile .github/workflows/daily-repo-status.md

# 3. Commit and push
git add .github/workflows/*.lock.yml
git commit -m "Add agentic workflows"
git push

# 4. Workflows will run automatically on their schedules
# Or trigger manually from Actions tab on GitHub
```

---

## Comparison

| Feature | Custom Agent | Daily Doc Updater | Daily Repo Status |
|---------|-------------|-------------------|-------------------|
| **Trigger** | Manual (on-demand) | Daily (scheduled) | Daily (scheduled) |
| **Purpose** | Code review | Documentation updates | Repository insights |
| **Location** | VS Code / GitHub.com | GitHub Actions | GitHub Actions |
| **Output** | Chat conversation | Pull request | GitHub issue |
| **Cost** | No extra cost* | Uses Actions minutes | Uses Actions minutes |
| **Interactivity** | Full conversation | Automated | Automated |
| **Local Changes** | ✅ Can review uncommitted | ❌ Only committed changes | ❌ Only committed changes |
| **Learning** | ✅ Great for education | ✅ Keeps docs updated | ✅ Team visibility |
| **Setup Complexity** | Very easy | Moderate (needs compilation) | Moderate (needs compilation) |

*Requires Copilot subscription

### When to Use Each:

**Use Custom Agent when:**
- Working on complex features and need guidance
- Want to discuss design decisions
- Learning new patterns
- Reviewing uncommitted local changes
- Need interactive back-and-forth

**Use Daily Doc Updater when:**
- Documentation tends to fall behind code changes
- Want automated documentation maintenance
- Need consistent documentation style
- Have frequent feature releases

**Use Daily Repo Status when:**
- Managing an active repository
- Want daily visibility into progress
- Need actionable insights for maintainers
- Tracking community engagement

---

## Troubleshooting

### Custom Agent Issues

**Agent doesn't appear in VS Code:**
1. Ensure file exists: `.github/agents/pr-reviewer.agent.md`
2. Reload VS Code: `Ctrl+Shift+P` → "Reload Window"
3. Check Copilot subscription is active
4. Try "Configure Custom Agents..." → refresh list

**Agent gives generic responses:**
- Make sure you selected "PR Reviewer" from the dropdown
- Check the frontmatter in the `.agent.md` file is valid

### Agentic Workflow Issues

**Workflow doesn't appear in Actions tab:**
1. Verify you compiled the markdown file:
   ```bash
   gh aw compile .github/workflows/daily-doc-updater.md
   gh aw compile .github/workflows/daily-repo-status.md
   ```
2. Ensure `.lock.yml` files were created and committed
3. Check GitHub Actions is enabled for the repository
4. Verify you have GitHub Copilot subscription

**Workflow fails to run:**
1. Check workflow file syntax in `.lock.yml` files
2. Verify repository permissions (Settings → Actions → General)
3. Check Actions logs for error messages
4. Ensure safe-outputs are properly configured

**Compilation errors:**
1. Verify GitHub CLI is installed: `gh --version`
2. Check gh-aw extension: `gh extension list`
3. Validate YAML frontmatter in markdown file
4. Check for syntax errors in the markdown

**"gh aw" command not found:**
```bash
# Install the extension
gh extension install github/gh-aw

# If already installed, update it
gh extension upgrade gh-aw
```

### Getting Help

1. **Custom Agents Documentation**: https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents
2. **Agentic Workflows Documentation**: https://github.github.com/gh-aw/introduction/overview/
3. **GitHub Community**: https://github.com/orgs/community/discussions
4. **GitHub Support**: https://support.github.com/

---

## Next Steps

1. **Test the Custom Agent**
   - Open VS Code and try reviewing some code
   - Get familiar with the types of issues it catches

2. **Deploy the Agentic Workflows**
   - Install gh-aw extension
   - Compile both workflows
   - Workflows will run on their daily schedules

3. **Customize the Tools**
   - Adjust the agent's focus areas based on your needs
   - Modify workflow schedules or behavior
   - Add team-specific guidelines

4. **Monitor and Iterate**
   - Review the automated documentation updates
   - Check daily status reports for insights
   - Gather team feedback

---

## Files Created

```
.github/
├── agents/
│   └── pr-reviewer.agent.md           # Custom Copilot agent definition
└── workflows/
    ├── daily-doc-updater.md           # Documentation updater source (human-editable)
    ├── daily-doc-updater.lock.yml     # Compiled workflow (auto-generated)
    ├── daily-repo-status.md           # Repo status source (human-editable)
    └── daily-repo-status.lock.yml     # Compiled workflow (auto-generated)
```

---

## Important Notes

1. **Never edit `.lock.yml` files directly** - they're auto-generated. Edit the `.md` file and recompile.

2. **Agentic Workflows are in public preview** - expect potential changes and updates.

3. **All tools require active Copilot subscription** - ensure your subscription is active.

4. **Review automatic feedback** - AI reviews are helpful but not perfect. Use human judgment.

5. **Customize for your team** - Both systems can be tailored to your specific needs and coding standards.

---

**Happy Reviewing! 🚀**

If you have questions or need help, refer to the troubleshooting section or check the official documentation links above.

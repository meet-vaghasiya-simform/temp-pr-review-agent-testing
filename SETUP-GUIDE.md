# PR Reviewer Setup Guide

This repository includes **four AI-powered systems** that work together to improve code quality and project maintenance:

1. **Custom Copilot Agent** - Manual reviews in VS Code/GitHub.com
2. **Agentic Workflow** - Automatic reviews triggered on push/PR events
3. **Daily Documentation Updater** - Automated documentation updates based on recent changes
4. **Daily Repo Status** - Automated daily status reports

---

## 📋 Table of Contents

- [System 1: Custom Copilot Agent (Manual Reviews)](#system-1-custom-copilot-agent-manual-reviews)
- [System 2: Agentic Workflow (Automatic Reviews)](#system-2-agentic-workflow-automatic-reviews)
- [System 3: Daily Documentation Updater](#system-3-daily-documentation-updater)
- [System 4: Daily Repo Status](#system-4-daily-repo-status)
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

## System 3: Daily Documentation Updater

### What is it?

An automated workflow that runs daily to keep documentation up-to-date. It scans merged pull requests from the last 24 hours, identifies new features or changes that should be documented, and automatically creates pull requests with documentation updates.

### File Location

```
.github/workflows/daily-doc-updater.md (source)
.github/workflows/daily-doc-updater.lock.yml (compiled)
```

### How It Works

1. **Runs daily** via scheduled GitHub Actions workflow
2. **Scans** the last 24 hours of activity:
   - Merged pull requests
   - Recent commits
   - Code changes
3. **Identifies** documentation gaps:
   - New features not yet documented
   - Modified functionality
   - Breaking changes
4. **Updates** appropriate documentation files:
   - Follows existing style and conventions
   - Adds new sections for new features
   - Updates existing sections for changes
5. **Creates a pull request** with:
   - List of features documented
   - Links to original PRs
   - Summary of changes made

### Setup

The workflow is already configured and will run automatically once the `.lock.yml` file is committed. No additional setup required beyond the general prerequisites.

To customize the workflow:
```bash
# Edit the source file
nano .github/workflows/daily-doc-updater.md

# Recompile
gh aw compile .github/workflows/daily-doc-updater.md

# Commit and push
git add .github/workflows/daily-doc-updater.lock.yml
git commit -m "Update documentation updater workflow"
git push
```

### Benefits

- ✅ Documentation stays current automatically
- ✅ Reduces documentation debt
- ✅ Captures feature changes as they happen
- ✅ Maintains consistent documentation style
- ✅ No manual effort required

---

## System 4: Daily Repo Status

### What is it?

An automated workflow that creates daily status reports as GitHub issues. It provides an overview of repository activity, progress tracking, and actionable recommendations for maintainers.

### File Location

```
.github/workflows/daily-repo-status.md (source)
.github/workflows/daily-repo-status.lock.yml (compiled)
```

### How It Works

1. **Runs daily** via scheduled GitHub Actions workflow
2. **Gathers** recent repository activity:
   - New and updated issues
   - Pull requests
   - Discussions
   - Releases
   - Code changes
3. **Analyzes** project status:
   - Progress on goals
   - Community engagement
   - Outstanding tasks
4. **Creates** a GitHub issue with:
   - Activity summary
   - Productivity insights
   - Community highlights
   - Actionable next steps
   - Project recommendations

### Setup

The workflow is already configured and will run automatically once the `.lock.yml` file is committed. No additional setup required beyond the general prerequisites.

To customize the workflow:
```bash
# Edit the source file
nano .github/workflows/daily-repo-status.md

# Recompile
gh aw compile .github/workflows/daily-repo-status.md

# Commit and push
git add .github/workflows/daily-repo-status.lock.yml
git commit -m "Update repo status workflow"
git push
```

### Benefits

- ✅ Stay informed about project activity
- ✅ Track progress automatically
- ✅ Identify bottlenecks and priorities
- ✅ Encourage team engagement
- ✅ Positive, encouraging reports

---

## Prerequisites

### Required for Both Systems:

1. **GitHub Copilot Subscription**
   - GitHub Copilot Pro ($10/month)
   - GitHub Copilot Pro+ ($39/month)
   - GitHub Copilot Business (organization plan)
   - GitHub Copilot Enterprise (enterprise plan)
   
   [Sign up here](https://github.com/features/copilot/plans)

### Required for Custom Agent Only:

2. **Visual Studio Code** with GitHub Copilot extension

### Required for Agentic Workflows Only:

3. **GitHub CLI with Agentic Workflows Extension** (for code review, daily documentation, and repo status workflows)
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

### To Deploy Agentic Workflow (Automatic Reviews):

```bash
# 1. Install gh-aw extension
gh extension install github/gh-aw

# 2. Compile the workflow
gh aw compile .github/workflows/code-review-agent.md

# 3. Commit and push
git add .github/workflows/code-review-agent.lock.yml
git commit -m "Add automated code review workflow"
git push

# 4. Test by pushing a change
git commit --allow-empty -m "Test workflow trigger"
git push
```

### To Deploy Daily Workflows:

```bash
# Compile both daily workflows
gh aw compile .github/workflows/daily-doc-updater.md
gh aw compile .github/workflows/daily-repo-status.md

# Commit and push
git add .github/workflows/daily-doc-updater.lock.yml .github/workflows/daily-repo-status.lock.yml
git commit -m "Add daily automation workflows"
git push

# The workflows will run automatically on their daily schedule
# You can also trigger them manually from the Actions tab on GitHub
```

---

## Comparison

| Feature | Custom Copilot Agent | Agentic Workflow | Daily Documentation | Daily Repo Status |
|---------|---------------------|------------------|---------------------|-------------------|
| **Trigger** | Manual (on-demand) | Automatic (push/PR) | Daily schedule | Daily schedule |
| **Location** | VS Code / GitHub.com | GitHub Actions | GitHub Actions | GitHub Actions |
| **Cost** | No extra cost* | Uses GitHub Actions minutes | Uses GitHub Actions minutes | Uses GitHub Actions minutes |
| **Speed** | Instant when invoked | Runs within minutes | Runs once per day | Runs once per day |
| **Purpose** | Code review & guidance | Automated code review | Documentation updates | Status reporting |
| **Output** | Interactive conversation | PR comments & labels | Documentation PRs | GitHub issues |
| **Setup Complexity** | Very easy | Moderate (needs compilation) | Moderate (needs compilation) | Moderate (needs compilation) |

*Requires Copilot subscription

### When to Use Each:

**Use Custom Agent when:**
- Working on complex features and need guidance
- Want to discuss design decisions
- Learning new patterns
- Reviewing uncommitted local changes
- Need interactive back-and-forth

**Use Agentic Workflow when:**
- Want automatic quality gates
- Need consistent reviews on all PRs
- Working in teams (automated checks for everyone)
- Want to catch issues before human review
- Maintaining high security standards

**Daily Workflows run automatically:**
- **Documentation Updater**: Keeps docs in sync with code changes
- **Repo Status**: Provides daily project insights and recommendations

**Use All Systems Together:**
- Get comprehensive automation and manual control! 🚀
- Automatic reviews catch obvious issues
- Manual reviews for deeper consultation
- Documentation stays current
- Track project progress daily

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
   gh aw compile .github/workflows/code-review-agent.md
   ```
2. Ensure `.lock.yml` file was created and committed
3. Check GitHub Actions is enabled for the repository
4. Verify you have GitHub Copilot subscription

**Workflow fails to run:**
1. Check workflow file syntax in `.lock.yml`
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
   - Compile and push the code review workflow
   - Compile and push the daily workflows
   - Test with a sample commit

3. **Customize All Systems**
   - Adjust the agent's focus areas based on your needs
   - Modify workflow triggers for your branching strategy
   - Customize daily workflow schedules
   - Add team-specific guidelines

4. **Monitor and Iterate**
   - Review the automated comments for quality
   - Check daily status reports and documentation PRs
   - Adjust sensitivity and focus areas
   - Gather team feedback

---

## Files Created

```
.github/
├── agents/
│   └── pr-reviewer.agent.md               # Custom Copilot agent definition
└── workflows/
    ├── code-review-agent.md               # Code review workflow source (human-editable)
    ├── code-review-agent.lock.yml         # Compiled workflow (auto-generated, after compilation)
    ├── daily-doc-updater.md               # Documentation updater workflow source
    ├── daily-doc-updater.lock.yml         # Compiled workflow (auto-generated, after compilation)
    ├── daily-repo-status.md               # Repo status workflow source
    └── daily-repo-status.lock.yml         # Compiled workflow (auto-generated, after compilation)
```

---

## Important Notes

1. **Never edit `.lock.yml` files directly** - they're auto-generated. Edit the `.md` file and recompile.

2. **Agentic Workflows are in public preview** - expect potential changes and updates.

3. **Both systems require active Copilot subscription** - ensure your subscription is active.

4. **Review automatic feedback** - AI reviews are helpful but not perfect. Use human judgment.

5. **Customize for your team** - Both systems can be tailored to your specific needs and coding standards.

---

**Happy Reviewing! 🚀**

If you have questions or need help, refer to the troubleshooting section or check the official documentation links above.

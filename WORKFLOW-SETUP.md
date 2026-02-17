# Quick Setup Instructions

## The workflow is already configured for merged PRs! ✓

When a PR is merged to `main` or `develop`, it triggers a `push` event which will run the workflow.

---

## Setup Steps (Choose One Method)

### Method 1: Automated PowerShell Script (Recommended)

```powershell
# Open PowerShell in this directory and run:
.\setup-workflow.ps1
```

This script will:
1. ✓ Verify GitHub CLI installation
2. ✓ Authenticate with GitHub (if needed)
3. ✓ Install gh-aw extension
4. ✓ Compile the workflow
5. ✓ Show you the next steps

---

### Method 2: Manual Steps

#### 1. Close and reopen your terminal
After installing GitHub CLI, you need a fresh terminal session.

#### 2. Authenticate with GitHub
```bash
gh auth login
```
Follow the prompts to authenticate.

#### 3. Install gh-aw extension
```bash
gh extension install github/gh-aw
```

#### 4. Compile the workflow
```bash
gh aw compile .github/workflows/code-review-agent.md
```
This creates: `.github/workflows/code-review-agent.lock.yml`

#### 5. Commit and push
```bash
git add .github/workflows/code-review-agent.lock.yml
git commit -m "Add automated code review workflow"
git push
```

---

## When Will It Run?

The workflow triggers automatically when:

✅ **A PR is merged to main or develop** (via push event)
✅ **Code is pushed to main, develop, or feature/* branches**
✅ **A PR is opened, updated, or reopened**

---

## Verify It's Working

1. **After pushing**, go to your GitHub repository
2. **Click the "Actions" tab**
3. **Look for**: "Code Review Agent - Automatic PR Analyzer"
4. **Click on a run** to see the output

---

## Troubleshooting

### "gh: command not found" after installation
- **Close and reopen your terminal**
- Or run: `refreshenv` (if you have Chocolatey)

### "gh aw: unknown command"
```bash
gh extension install github/gh-aw
```

### Workflow doesn't appear on GitHub
- Make sure you pushed the `.lock.yml` file
- Check: Settings → Actions → General → Actions permissions

### Need Help?
See [SETUP-GUIDE.md](./SETUP-GUIDE.md) for detailed troubleshooting.

---

## Quick Commands Reference

```bash
# Authenticate
gh auth login

# Install extension
gh extension install github/gh-aw

# Compile workflow
gh aw compile .github/workflows/code-review-agent.md

# Check compiled file
ls .github/workflows/*.lock.yml

# Commit and push
git add .github/workflows/code-review-agent.lock.yml
git commit -m "Add automated code review workflow"
git push
```

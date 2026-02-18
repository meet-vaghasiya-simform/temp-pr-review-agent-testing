# Agentic Workflows Setup

## Available Workflows ✓

This repository includes two automated workflows:

1. **Daily Documentation Updater** - Scans code changes and updates documentation
2. **Daily Repo Status** - Creates daily status reports with insights

Both workflows run on daily schedules and can be triggered manually.

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
4. ✓ Compile both workflows
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

#### 4. Compile the workflows
```bash
gh aw compile .github/workflows/daily-doc-updater.md
gh aw compile .github/workflows/daily-repo-status.md
```
This creates:
- `.github/workflows/daily-doc-updater.lock.yml`
- `.github/workflows/daily-repo-status.lock.yml`

#### 5. Commit and push
```bash
git add .github/workflows/*.lock.yml
git commit -m "Add agentic workflows"
git push
```

---

## When Will They Run?

Both workflows:

✅ **Run daily on a schedule** (via cron)
✅ **Can be triggered manually** from the Actions tab on GitHub

---

## Verify They're Working

1. **After pushing**, go to your GitHub repository
2. **Click the "Actions" tab**
3. **Look for**: 
   - "Daily Documentation Updater"
   - "Daily Repo Status"
4. **Click "Run workflow"** to trigger manually for testing
5. **Click on a run** to see the output

---

## Troubleshooting

### "gh: command not found" after installation
- **Close and reopen your terminal**
- Or run: `refreshenv` (if you have Chocolatey)

### "gh aw: unknown command"
```bash
gh extension install github/gh-aw
```

### Workflows don't appear on GitHub
- Make sure you pushed the `.lock.yml` files
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

# Compile workflows
gh aw compile .github/workflows/daily-doc-updater.md
gh aw compile .github/workflows/daily-repo-status.md

# Check compiled files
ls .github/workflows/*.lock.yml

# Commit and push
git add .github/workflows/*.lock.yml
git commit -m "Add agentic workflows"
git push
```

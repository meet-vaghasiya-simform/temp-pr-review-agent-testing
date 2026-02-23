# How to Add GitHub Secret for Teams Webhook

## Quick Steps

### 1. Get Your Teams Webhook URL

First, create an incoming webhook in Microsoft Teams:

1. Open **Microsoft Teams**
2. Go to the channel where you want notifications
3. Click the **three dots (⋯)** next to the channel name
4. Select **Connectors** or **Workflows**
5. Search for **Incoming Webhook**
6. Click **Add** or **Configure**
7. Give it a name: `GitHub PR Notifications`
8. Click **Create**
9. **Copy the webhook URL** (looks like: `https://outlook.office.com/webhook/...`)

### 2. Add Secret to GitHub Repository

#### Option A: Via GitHub Web UI (Recommended)

1. Go to your repository on GitHub: `https://github.com/YOUR-USERNAME/PR-reviewer`
2. Click **Settings** (top menu)
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret** (green button)
5. Fill in:
   - **Name:** `TEAMS_WEBHOOK_URL`
   - **Secret:** Paste the webhook URL you copied from Teams
6. Click **Add secret**

#### Option B: Via GitHub CLI

If you have GitHub CLI installed:

```bash
# Navigate to your repository
cd c:/Users/meet.vaghasiya/Desktop/projects/demo/PR-reviewer

# Add the secret (you'll be prompted to enter the webhook URL)
gh secret set TEAMS_WEBHOOK_URL

# Or add it directly (replace YOUR_WEBHOOK_URL with the actual URL)
echo "YOUR_WEBHOOK_URL" | gh secret set TEAMS_WEBHOOK_URL
```

#### Option C: Via PowerShell with GitHub API

```powershell
# Set your values
$GITHUB_TOKEN = "your_github_token"
$REPO_OWNER = "your-username"
$REPO_NAME = "PR-reviewer"
$WEBHOOK_URL = "your_teams_webhook_url"

# Create the secret
$headers = @{
    "Authorization" = "Bearer $GITHUB_TOKEN"
    "Accept" = "application/vnd.github+json"
}

$body = @{
    "encrypted_value" = $WEBHOOK_URL
    "key_id" = ""
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/actions/secrets/TEAMS_WEBHOOK_URL" `
    -Method Put -Headers $headers -Body $body
```

### 3. Verify the Secret

1. Go to your repository → **Settings** → **Secrets and variables** → **Actions**
2. You should see `TEAMS_WEBHOOK_URL` listed
3. You won't be able to view the value (GitHub keeps it secure)

### 4. Test the Workflow

Once the secret is added:

```bash
# Compile the workflow
gh aw compile .github/workflows/pr-security-review-with-teams.md

# Create a test branch and PR
git checkout -b test/teams-notification
echo "test" > test.txt
git add test.txt
git commit -m "Test Teams notification"
git push origin test/teams-notification

# Create a PR targeting develop
gh pr create --base develop --head test/teams-notification --title "Test PR" --body "Testing Teams integration"
```

Check your Teams channel for the notification!

## Troubleshooting

### Secret Not Working?

1. **Check the secret name:** Must be exactly `TEAMS_WEBHOOK_URL` (case-sensitive)
2. **Check the workflow is compiled:** Run `gh aw compile .github/workflows/pr-security-review-with-teams.md`
3. **Check workflow logs:** `gh aw logs pr-security-review-with-teams`
4. **Verify webhook URL:** Test it manually:
   ```bash
   curl -H "Content-Type: application/json" -d '{"text":"Test"}' YOUR_WEBHOOK_URL
   ```

### Can't Access Repository Settings?

You need repository **admin** or **owner** permissions to add secrets. Contact your repository owner.

### Webhook Expired?

Teams webhooks can expire or be revoked. If notifications stop working:
1. Create a new webhook in Teams
2. Update the GitHub secret with the new URL

## Security Best Practices

✅ **DO:**
- Store webhook URLs as secrets
- Use unique webhooks for different repositories
- Regenerate webhooks if accidentally exposed
- Limit who has access to repository secrets

❌ **DON'T:**
- Commit webhook URLs to code
- Share webhook URLs publicly
- Use the same webhook for multiple unrelated projects
- Print webhook URLs in logs

## What Happens Next?

Once you add the secret and compile the workflow:

1. **Every time a PR targets `develop` or `main`:**
   - Security review runs automatically
   - PR comment is added with findings
   - Teams notification is sent
   - Team is alerted in their channel

2. **Teams Message Will Say:**
   ```
   Pull Request Raised
   [Auto-generated message]
   
   Kindly note, @username has raised PR #42 - Add new feature 
   targeting develop branch. Please review.
   
   Files Changed: 5
   Description: [PR description]
   
   [View Pull Request] (button)
   ```

That's it! Your Teams integration is ready. 🎉

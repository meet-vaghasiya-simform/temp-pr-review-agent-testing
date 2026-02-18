# PR Reviewer - Nuxt 3 Project

A Nuxt 3 application with **built-in AI-powered code review and automation systems** using GitHub Copilot.

## 🤖 AI-Powered Automation

This project includes multiple AI-powered systems to enhance development workflow:

### Code Review Systems

1. **Custom Copilot Agent** (`.github/agents/pr-reviewer.agent.md`)
   - Manual code reviews in VS Code or GitHub.com
   - Interactive conversations about code quality
   - Expert in Nuxt.js, Vue.js, TypeScript, and security

2. **Automated PR Review Workflow** (`.github/workflows/code-review-agent.md`)
   - Automatic reviews triggered on push/PR events
   - Posts review comments with security, performance, and quality findings
   - Adds labels and creates issues for critical problems

### Daily Automation Workflows

3. **Daily Repo Status** (`.github/workflows/daily-repo-status.md`)
   - Runs daily to generate repository activity reports
   - Creates GitHub issues with insights on PRs, issues, discussions, and releases
   - Provides productivity insights and actionable next steps
   - Includes community highlights and project recommendations

4. **Daily Documentation Updater** (`.github/workflows/daily-doc-updater.md`)
   - Scans for merged PRs and code changes in the last 24 hours
   - Automatically identifies documentation gaps for new features
   - Updates relevant documentation files to keep docs in sync with code
   - Creates pull requests with documentation improvements

### 📖 Getting Started

See **[SETUP-GUIDE.md](./SETUP-GUIDE.md)** for complete instructions on:
- Setting up and using the Custom Copilot Agent
- Deploying the Code Review Workflow
- Understanding the daily automation workflows
- Prerequisites and troubleshooting

### Quick Start (Custom Agent)

1. Open VS Code in this repository
2. Open Copilot Chat (`Ctrl+Shift+I`)
3. Select "PR Reviewer" from the agent dropdown
4. Ask: "Review my recent changes"

---

## 🚀 Nuxt 3 Development

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

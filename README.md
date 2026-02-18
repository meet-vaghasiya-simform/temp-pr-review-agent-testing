# PR Reviewer - Nuxt 3 Project

A Nuxt 3 application with **built-in AI-powered code review systems** using GitHub Copilot.

## 🤖 AI-Powered Automation Systems

This project includes multiple AI-powered systems to improve code quality and project management:

### Code Review Systems

1. **Custom Copilot Agent** (`.github/agents/pr-reviewer.agent.md`)
   - Manual code reviews in VS Code or GitHub.com
   - Interactive conversations about code quality
   - Expert in Nuxt.js, Vue.js, TypeScript, and security

2. **Agentic Workflow** (`.github/workflows/code-review-agent.md`)
   - Automatic reviews triggered on push/PR events
   - Posts review comments with security, performance, and quality findings
   - Adds labels and creates issues for critical problems

### Automated Documentation & Reporting

3. **Daily Documentation Updater** (`.github/workflows/daily-doc-updater.md`)
   - Automatically scans merged PRs and commits from the last 24 hours
   - Identifies features that need documentation
   - Updates documentation files and creates PRs with changes
   - Runs daily via scheduled workflow

4. **Daily Repository Status** (`.github/workflows/daily-repo-status.md`)
   - Generates daily status reports as GitHub issues
   - Tracks recent activity (issues, PRs, discussions, releases)
   - Provides productivity insights and project recommendations
   - Runs daily to keep team informed

### 📖 Getting Started

See **[SETUP-GUIDE.md](./SETUP-GUIDE.md)** for complete instructions on:
- Setting up and using the Custom Copilot Agent
- Deploying the Code Review Workflow
- Understanding the automated documentation and reporting workflows
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

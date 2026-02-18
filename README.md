# PR Reviewer - Nuxt 3 Project

A Nuxt 3 application with **built-in AI-powered code review systems** using GitHub Copilot.

## 🤖 AI Code Review Systems

This project includes two complementary code review systems:

1. **Custom Copilot Agent** (`.github/agents/pr-reviewer.agent.md`)
   - Manual code reviews in VS Code or GitHub.com
   - Interactive conversations about code quality
   - Expert in Nuxt.js, Vue.js, TypeScript, and security

2. **Agentic Workflow** (`.github/workflows/code-review-agent.md`)
   - Automatic reviews triggered on push/PR events
   - Posts review comments with security, performance, and quality findings
   - Adds labels and creates issues for critical problems

## 🔄 Automated Workflows

This project includes daily automation workflows:

1. **Daily Documentation Updater** (`.github/workflows/daily-doc-updater.md`)
   - Runs daily to scan merged PRs from the last 24 hours
   - Automatically updates documentation for new features
   - Creates pull requests with documentation changes

2. **Daily Repo Status** (`.github/workflows/daily-repo-status.md`)
   - Generates daily status reports as GitHub issues
   - Tracks recent activity (issues, PRs, discussions, releases)
   - Provides insights and actionable next steps

### 📖 Getting Started with AI Reviews

See **[SETUP-GUIDE.md](./SETUP-GUIDE.md)** for complete instructions on:
- Setting up and using the Custom Copilot Agent
- Deploying the Agentic Workflow
- Configuring automated daily workflows
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

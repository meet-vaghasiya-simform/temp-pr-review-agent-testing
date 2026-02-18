# PR Reviewer - Nuxt 3 Project

A Nuxt 3 application with **built-in AI-powered systems** using GitHub Copilot.

## 🤖 AI-Powered Features

This project includes three AI-powered tools:

1. **Custom Copilot Agent** (`.github/agents/pr-reviewer.agent.md`)
   - Manual code reviews in VS Code or GitHub.com
   - Interactive conversations about code quality
   - Expert in Nuxt.js, Vue.js, TypeScript, and security

2. **Daily Documentation Updater** (`.github/workflows/daily-doc-updater.md`)
   - Automatically scans merged PRs and code changes
   - Updates documentation for new features
   - Creates pull requests with documentation improvements

3. **Daily Repo Status** (`.github/workflows/daily-repo-status.md`)
   - Creates daily status reports as GitHub issues
   - Tracks repository activity, PRs, and discussions
   - Provides actionable insights and recommendations

### 📖 Getting Started

See **[SETUP-GUIDE.md](./SETUP-GUIDE.md)** for complete instructions on:
- Setting up and using the Custom Copilot Agent
- Deploying the Agentic Workflows
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

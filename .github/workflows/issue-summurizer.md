---
description: A GitHub issue summarizer workflow that creates a summary of the most recent issues in the repository. It gathers recent issues and generates engaging GitHub issues with insights, highlights, and recommendations.

on:
  issues:
    types: [opened]

permissions:
  issues: read

jobs:
  summarize-issues:
    steps:
      - run: copilot "Summarize the most recent issues in the repository and create a new issue with insights, highlights, and recommendations."
---


# Daily Repo Status

You have to understand the issue, help me summarize it, explain how to fix it in simple language, add a comment, and suggest a plan for improvement and resolution.
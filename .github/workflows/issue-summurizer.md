---
description: A GitHub issue summarizer workflow that creates a summary of the most recent issues in the repository. It gathers recent issues and generates engaging GitHub issues with insights, highlights, and recommendations.

on:
  issues:
    types: [opened]

permissions:
  contents: read

safe-outputs:
  add-comment:

jobs:
  summarize-issues:
    steps:
      - run: copilot "Summarize the most recent issues in the repository and create a new issue with insights, highlights, and recommendations."
---

Summarize issue and response in comment
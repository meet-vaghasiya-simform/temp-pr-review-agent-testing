---
description: A github issue summarizer workflow that creates a summary of the most recent issues in the repository. It gathers recent issues and generates engaging GitHub issues with insights, highlights, and recommendations.
on:
  issues:
    types: [opened]
permissions:
    issues: read

jobs:
    agent:
        steps:
            - run: copilot "Summarize the most recent issues in the repository and create a new issue with insights, highlights, and recommendations."

---
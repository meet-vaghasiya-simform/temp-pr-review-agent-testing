---
description: Tool definition for sending Microsoft Teams notifications using webhooks
---

# Microsoft Teams Notification Tool (Safe Input)

This safe-input tool enables sending formatted notifications to Microsoft Teams channels.

```yaml
safe-inputs:
  send_teams_notification:
    description: "Send a formatted notification to Microsoft Teams channel"
    parameters:
      title:
        type: string
        description: "Notification title"
        required: true
      summary:
        type: string
        description: "Brief summary of the notification"
        required: true
      severity:
        type: string
        description: "Severity level: info, success, warning, error"
        required: true
        enum: ["info", "success", "warning", "error"]
      details:
        type: object
        description: "Structured details to include in the message"
        properties:
          risk_level:
            type: string
          files_analyzed:
            type: number
          issues_found:
            type: number
          critical_issues:
            type: array
          high_priority_issues:
            type: array
          pr_url:
            type: string
          issue_url:
            type: string
      action_items:
        type: array
        description: "List of action items or next steps"
    implementation:
      type: webhook
      url: "${{ secrets.TEAMS_WEBHOOK_URL }}"
      method: POST
      headers:
        Content-Type: "application/json"
      body: |
        {
          "@type": "MessageCard",
          "@context": "http://schema.org/extensions",
          "themeColor": "{{#if (eq severity 'error')}}d33d3d{{else if (eq severity 'warning')}}f4a300{{else if (eq severity 'success')}}28a745{{else}}0078d4{{/if}}",
          "summary": "{{ summary }}",
          "sections": [{
            "activityTitle": "{{ title }}",
            "activitySubtitle": "{{ summary }}",
            "facts": [
              {{#if details.risk_level}}
              {
                "name": "Risk Level:",
                "value": "{{ details.risk_level }}"
              },
              {{/if}}
              {{#if details.files_analyzed}}
              {
                "name": "Files Analyzed:",
                "value": "{{ details.files_analyzed }}"
              },
              {{/if}}
              {{#if details.issues_found}}
              {
                "name": "Issues Found:",
                "value": "{{ details.issues_found }}"
              }
              {{/if}}
            ],
            {{#if details.critical_issues}}
            "text": "**Critical Issues:**\n{{#each details.critical_issues}}- {{ this }}\n{{/each}}"
            {{/if}}
          }],
          "potentialAction": [
            {{#if details.issue_url}}
            {
              "@type": "OpenUri",
              "name": "View Issue",
              "targets": [{
                "os": "default",
                "uri": "{{ details.issue_url }}"
              }]
            },
            {{/if}}
            {{#if details.pr_url}}
            {
              "@type": "OpenUri",
              "name": "View Pull Request",
              "targets": [{
                "os": "default",
                "uri": "{{ details.pr_url }}"
              }]
            }
            {{/if}}
          ]
        }
```

## Alternative: Simple HTTP Call Approach

Since GitHub Agentic Workflows may not support complex safe-inputs templating, use this simpler approach:

Add to your workflow frontmatter:

```yaml
network:
  allowed:
    - defaults
    - "*.webhook.office.com"  # Allow Microsoft Teams webhook domain
```

Then in your workflow instructions, the agent can make HTTP POST requests directly to Teams webhooks stored in secrets.

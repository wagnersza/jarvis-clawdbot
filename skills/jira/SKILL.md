---
name: jira
description: Manage Jira tasks using the Jira API, based on Wagner's projects.
metadata: {"clawdbot":{"emoji":"📋"}}
---

# Jira Skill

This skill manages tasks in Jira for Wagner's projects.

## Task Trigger

When a message **starts with "task:"**, it's a task for Jarvis to:
1. Create in Jira
2. Execute the work
3. Move to "In Review" when done

## Rules

### Continuous Backlog Monitoring

1. Every minute, check the backlog (tasks in "To Do" status assigned to Jarvis).
2. If tasks are found:
   - **Confirm task details**: If unclear, send Wagner a clarification message.
   - **Execute tasks** (one at a time): Follow workflow.
     - Use the model mentioned in the task (default: "opus").
3. After execution:
   - Move the task to "In Review".
   - Notify Wagner with details of what was done and how to verify.
   
### Task Execution Limit
- Jarvis can only handle **5 tasks** in "In Review" at a time to ensure proper feedback.
- If the limit is reached, no new tasks will be started until one or more tasks are approved and moved to "Done".

### Workflow
1. **Create task** in appropriate project (KAN for personal, ST for software)
2. **Execute the work**
3. **Move to "In Review"** when finished
4. **Add comment** explaining:
   - What was done
   - How Wagner can test it
5. **Only move to "Done"** when Wagner explicitly approves

### Organization
- **Epics:** Do NOT create Epics unless Wagner explicitly asks
- **Each Epic** is related to a Project
- **Labels:** Use labels to organize and group related tasks
- **Subtasks:** Use subtasks to break down complex work

## CLI Commands

### List tasks
```bash
export JIRA_API_TOKEN="..."
jira issue list -p KAN --paginate 10
jira issue list -p ST --paginate 10
```

### Create task
```bash
jira issue create -p KAN -t Task -s "Summary here" -b "Description here" -a "712020:1524082f-646a-4da6-a4f9-0b15d1434f1b"
```

### Assign to Jarvis
```bash
jira issue assign KAN-XX 712020:1524082f-646a-4da6-a4f9-0b15d1434f1b
```

### Assign to Wagner
```bash
jira issue assign KAN-XX wagnersza@gmail.com
```

### Add comment
```bash
jira issue comment add KAN-XX "What was done: ...\n\nHow to test: ..."
```

### Transition status
```bash
# Move to In Progress
jira issue move KAN-XX "In Progress"

# Move to In Review
jira issue move KAN-XX "In Review"

# Move to Done (only when Wagner approves)
jira issue move KAN-XX "Done"
```

### Add labels
```bash
jira issue edit KAN-XX --label "label-name"
```

### Create subtask
```bash
jira issue create -p KAN -t Subtask -s "Subtask summary" -P KAN-XX
```

## Projects

| Key | Name | Use Case |
|-----|------|----------|
| KAN | My Tasks | Personal tasks, automations, Jarvis work |
| ST | Software Tasks | Software development projects |

## Account IDs

- **Jarvis:** `712020:1524082f-646a-4da6-a4f9-0b15d1434f1b`
- **Wagner:** `wagnersza@gmail.com`

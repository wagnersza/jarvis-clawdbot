---
name: jira-acli
description: Manage Jira tasks and issues using the Atlassian CLI (ACLI). Includes setup, authentication guidance, and support for common commands to integrate programmatically or through direct CLI commands.
---

# Jira Management Skill with Atlassian CLI

## Overview
This skill facilitates managing Jira tasks and issues through the **Atlassian Command Line Interface (ACLI)**. It provides detailed instructions, common use cases, and example commands to ensure efficient query execution and task handling.

---
### **Setup**
1. **Install ACLI**: [Follow the guide](https://developer.atlassian.com/cloud/acli/guides/how-to-get-started/#installation).
2. **Authentication**: Authenticate ACLI to Jira following [ACLI Authentication Guide](https://bobswift.atlassian.net/wiki/spaces/ACLI/pages/61276195/ACLI+authentication). If authentication expires or fails, ensure to reauthenticate.

   ```bash
   acli --action login --user <YOUR_USERNAME> --password <YOUR_PASSWORD> --url <JIRA_URL>
   ```

3. **Verify ACLI Connection**:
   ```bash
   acli --action getProjectList
   ```

---
### **Using ACLI for Jira Management**
Below are common commands for managing Jira. Customize these commands for your specific cases:

#### **1. Search and list all issues in a project**
```bash
acli jira workitem search --jql "project = <PROJECT_KEY>"
```

#### **2. List issues in progress**
```bash
acli --server <YOUR_SERVER> --action getIssueList --jql "assignee = currentUser() AND statusCategory = 'In Progress'"
```

#### **3. Create a new issue**
```bash
acli --server <YOUR_SERVER> --action createIssue --project <PROJECT_KEY> --type <TASK_TYPE> --summary "<ISSUE_SUMMARY>" --description "<ISSUE_DESCRIPTION>"
```

#### **3. Transition an issue**
```bash
# Transition work item with work item keys
acli jira workitem transition --key "<WORKITEM_KEY>" --status "<STATUS>"

# Example to move a task to 'In Review'
acli jira workitem transition --key "KAN-26" --status "In Review"
```

#### **4. Add comments to an issue**
```bash
# Add a comment to a work item
acli jira workitem comment create --key "<WORKITEM_KEY>" --body "<COMMENT_TEXT>"

# Example to add a comment
acli jira workitem comment create --key "KAN-26" --body "Task created and successfully moved to 'In Review'. Ready for your review!"
```

#### **5. Search issues using JQL**
```bash
acli --server <YOUR_SERVER> --action runFromJQLSearch --jql "status = 'To Do' AND assignee = currentUser()" --outputFormat 2
```

---
### **Best Practices**
- Test commands using dry-run (`--simulate`) to ensure correctness before execution.
- Confirm appropriate authentication is active before running commands.
- Use scripts for repetitive tasks to streamline your workflow and avoid human errors.
- Utilize local caching for frequently queried issues or data to improve performance.

---
### **Scripting Example in Python**
ACLI can also be combined with scripting languages (e.g., Python) for automation:

#### **Example: Automating Issue Listing**
```python
import os
import subprocess

def get_issues_in_progress(server):
    command = f"acli --server {server} --action getIssueList --jql \"assignee = currentUser() AND statusCategory = 'In Progress'\""
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print("Issues in Progress:")
        print(result.stdout)
    except subprocess.CalledProcessError as e:
        print(f"Error: {e.output}")

# Example usage
get_issues_in_progress("https://your-jira-server-url")
```

---
### **Support and Troubleshooting**
- Refer to the [Command Reference](https://developer.atlassian.com/cloud/acli/reference/commands/jira/) for more commands.
- Contact Wagner for authentication support if needed.
- In case of persistent issues, consider restarting ACLI sessions or rechecking the `acli` version.

---
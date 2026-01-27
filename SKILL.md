# Jira Management Skill with Atlassian CLI (ACLI)

This skill enables you to manage Jira tasks effectively using the Atlassian Command Line Interface (ACLI). Below are the details on how to install, configure, and utilize ACLI commands directly to manage your Jira instance.

---

## Getting Started

### Prerequisites
1. **Java**: ACLI requires Java 8 or later. 
   - Install Java if it is not already installed on your system.
2. **Download ACLI**:
   - [Get the latest version of ACLI here](https://bobswift.atlassian.net/wiki/spaces/ACLI/overview).
   - Extract the downloaded ZIP file to a directory of your choice.
3. **Set Up Environment**:
   - Add the ACLI directory to your system's PATH for convenience.
   - Example on Mac/Linux:
     ```bash
     export PATH=$PATH:/path/to/acli/bin
     ```

---

## Configuration

### Authentication
ACLI requires authentication to access your Jira instance. Provide credentials and server details in the following format for each session:
```bash
--server "https://[your-company].atlassian.net" --userId "[your-email@example.com]" --password "[your-api-token]"
```

> **Tip:** To generate an API token for Jira Cloud, refer to the [Atlassian API Token Documentation](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/).

To save time, consider creating a profile file to store your credentials securely:

```properties
# Create a profile file (e.g., ~/.acli/jiraclient.conf)
server=https://[your-company].atlassian.net
userId=[your-email@example.com]
password=[your-api-token]
```

You can then use the `-v` option to specify your profile when running commands:
```bash
acli --verbose --profile jiraclient [command]
```

---

## Common ACLI Commands for Jira Management

### 1. Retrieve Issue Details
Retrieve the details of a Jira issue:
```bash
acli jira getIssue --issue ISSUE-123
```
> Replace `ISSUE-123` with the issue key you want to get details for.

### 2. Create a New Issue
Create a new Jira issue in a specified project:
```bash
acli jira createIssue --project PROJECT_KEY --type ISSUE_TYPE --summary "Issue summary" --description "Issue description"
```
Parameters:
- `PROJECT_KEY` - Key of the project where the issue belongs (e.g., "ABC").
- `ISSUE_TYPE` - Type of issue, such as "Bug" or "Task".
- `Issue summary` - Short description of the issue.
- `Issue description` - Detailed description (optional).

### 3. Transition an Issue
Transition the issue to a different status (e.g., "Done"):
```bash
acli jira transitionIssue --issue ISSUE_KEY --transition "Transition Name"
```
Parameters:
- `ISSUE_KEY` - Key of the issue to transition (e.g., ISSUE-123).
- `Transition Name` - Exact name of the transition (e.g., "Done").

### 4. Add a Comment
Add a comment to an issue:
```bash
acli jira addComment --issue ISSUE_KEY --comment "Your comment here."
```

### 5. Run JQL Queries
Search issues using Jira Query Language (JQL):
```bash
acli jira runQuery --jql "assignee = currentUser() AND status = 'In Progress'"
```
> Replace the JQL with the query you want to run.

### 6. Attach a File to an Issue
Attach a file to a Jira issue:
```bash
acli jira addAttachment --issue ISSUE_KEY --file "/path/to/your/file"
```
> Replace `ISSUE_KEY` with the issue key and specify the path to the file you want to attach.

### 7. View ACLI Documentation
For more commands and options, check the official [ACLI Jira Commands Reference](https://developer.atlassian.com/cloud/acli/reference/commands/jira/).

---

## Best Practices

1. **Secure Your Credentials:** Always use API tokens for Jira authentication instead of a plaintext password.
2. **Cache Frequent Results:** Consider maintaining a local cache of frequently accessed issue details to save API calls.
3. **Scripting with Python**:
   - If repetitive actions are required, create Python scripts to automate the ACLI commands.
   - Use Python libraries like `subprocess` to invoke ACLI from scripts.

Example:
```python
import subprocess

# Run an ACLI command to retrieve issue details
result = subprocess.run([
    'acli', 'jira', 'getIssue', '--issue', 'ISSUE-123', 
    '--server', 'https://your-jira-instance.atlassian.net',
    '--userId', 'your-username', '--password', 'your-api-token'
], capture_output=True, text=True)

print(result.stdout)
```

---

Feel free to extend these instructions with your own examples or feedback. If any assistance is needed, let me know!
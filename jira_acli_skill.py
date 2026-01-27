import subprocess
import json
import os

class JiraCLIManager:
    def __init__(self, credentials_file='jira_credentials.json', cache_file='jira_cache.json'):
        """
        Initializes the JiraCLIManager object.
        :param credentials_file: Path to the file where credentials are stored.
        :param cache_file: Path to the file where cached Jira-related IDs are stored.
        """
        self.credentials_file = credentials_file
        self.cache_file = cache_file
        self.base_command = ['acli']

        # Load credentials and cache
        self.credentials = self.load_json_file(self.credentials_file)
        self.cache = self.load_json_file(self.cache_file)

    def load_json_file(self, file_path):
        """
        Loads a JSON file and returns its content. If the file doesn't exist, returns an empty dictionary.
        :param file_path: Path to the JSON file.
        :return: Dictionary with the file's content or empty dictionary.
        """
        if os.path.exists(file_path):
            with open(file_path, 'r') as file:
                return json.load(file)
        return {}

    def save_json_file(self, file_path, data):
        """
        Saves data into a JSON file.
        :param file_path: Path to the JSON file.
        :param data: Data to be saved.
        """
        with open(file_path, 'w') as file:
            json.dump(data, file, indent=4)

    def authenticate(self, server_url, username, password):
        """
        Authenticates to Jira using ACLI and saves the credentials to a file.
        :param server_url: Jira server URL.
        :param username: Jira username.
        :param password: Jira password.
        """
        # Store credentials in a JSON file for reuse
        self.credentials = {
            "server_url": server_url,
            "username": username,
            "password": password
        }
        self.save_json_file(self.credentials_file, self.credentials)

    def run_acli_command(self, command):
        """
        Runs an Atlassian CLI command and returns the result.
        Automatically adds authentication and handles re-authentication if needed.
        :param command: List of command arguments (e.g., ['jira', 'getIssue', '--issue', 'ISSUE-123']).
        :return: The output of the command as a string.
        """
        if not self.credentials:
            raise ValueError("Jira credentials not found. Please authenticate first.")

        # Append authentication details
        full_command = self.base_command + [
            '--server', self.credentials['server_url'],
            '--userId', self.credentials['username'],
            '--password', self.credentials['password']
        ] + command

        try:
            result = subprocess.run(full_command, capture_output=True, text=True, check=True)
            return result.stdout
        except subprocess.CalledProcessError as e:
            if "Authentication failed" in e.stderr:
                raise ValueError("Authentication failed. Please check your credentials.")
            else:
                raise

    def get_issue(self, issue_key):
        """
        Retrieves information about a Jira issue.
        :param issue_key: Key of the issue to retrieve (e.g., 'ISSUE-123').
        :return: Issue information as a dictionary.
        """
        command = ['jira', 'getIssue', '--issue', issue_key, '--outputFormat', 'json']
        output = self.run_acli_command(command)
        issue_data = json.loads(output)
        
        # Cache the issue in the local cache
        self.cache[issue_key] = issue_data
        self.save_json_file(self.cache_file, self.cache)
        
        return issue_data

    def create_issue(self, project_key, summary, issue_type, description=None):
        """
        Creates a new Jira issue.
        :param project_key: Key of the project to which the issue will be added (e.g., 'PROJECT').
        :param summary: Summary of the issue.
        :param issue_type: Type of the issue (e.g., 'Task', 'Bug').
        :param description: Optional issue description.
        :return: Key of the newly created issue.
        """
        command = ['jira', 'createIssue', '--project', project_key, '--type', issue_type, '--summary', summary]
        
        if description:
            command += ['--description', description]

        output = self.run_acli_command(command)
        print("Output:" + output)
        # Parse output to find the issue key (assuming output contains the key)
        issue_key = self.extract_issue_key(output)

        # Optionally cache the new issue
        if issue_key:
            self.cache[issue_key] = {
                "project": project_key,
                "summary": summary,
                "type": issue_type,
                "description": description
            }
            self.save_json_file(self.cache_file, self.cache)

        return issue_key

    def extract_issue_key(self, output):
        """
        Extracts the issue key from ACLI output.
        :param output: The ACLI command output.
        :return: Extracted issue key or None if not found.
        """
        # Implementation depends on specific ACLI output format
        # Example assumes "Created issue: ISSUE-123" in the output
        for line in output.splitlines():
            if "Created issue:" in line:
                return line.split(":")[-1].strip()

        return None  # Return None if issue key is not found

    def search_issues(self, jql_query):
        """
        Searches Jira issues using JQL (Jira Query Language).
        :param jql_query: The JQL query string.
        :return: List of issues matching the query.
        """
        command = ['jira', 'runQuery', '--jql', jql_query, '--outputFormat', 'json']
        output = self.run_acli_command(command)
        issues = json.loads(output)

        # Optionally cache issues
        for issue in issues.get('issues', []):
            issue_key = issue['key']
            self.cache[issue_key] = issue

        self.save_json_file(self.cache_file, self.cache)
        
        return issues

# Example usage
if __name__ == '__main__':
    jira_manager = JiraCLIManager()

    # Authenticate (provide your Jira credentials)
    # jira_manager.authenticate('https://your-jira-instance.atlassian.net', 'your-username', 'your-password')

    # Get Jira issue
    # issue = jira_manager.get_issue('ISSUE-123')
    # print(json.dumps(issue, indent=4))

    # Create a new Jira issue
    # new_issue_key = jira_manager.create_issue('PROJECT', 'New Bug', 'Bug', 'Description of the bug')
    # print(f"Created new issue with key: {new_issue_key}")

    # Search for issues
    # issues = jira_manager.search_issues('assignee = currentUser() AND status = "In Progress"')
    # print(json.dumps(issues, indent=4))
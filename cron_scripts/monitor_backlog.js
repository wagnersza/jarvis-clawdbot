function pollKanBoardForJarvisTasks() {
  const axios = require('axios');

  const JIRA_BASE_URL = "https://your-jira-instance.atlassian.net";
  const JIRA_PROJECT_KEY = "KAN";
  const JIRA_JARVIS_ACCOUNT_ID = "712020:1524082f-646a-4da6-a4f9-0b15d1434f1b";
  const JIRA_AUTH_TOKEN = "<YOUR_JIRA_API_TOKEN>";
  const JIRA_IN_REVIEW_STATUS = "In Review";

  async function fetchToDoTasksAssignedToJarvis() {
    const query = `project = ${JIRA_PROJECT_KEY} AND assignee = "${JIRA_JARVIS_ACCOUNT_ID}" AND status = "To Do"`;
    const url = `${JIRA_BASE_URL}/rest/api/2/search?jql=${encodeURIComponent(query)}`;

    try {
      const response = await axios.get(url, {
        headers: {
          "Authorization": `Basic ${JIRA_AUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      return response.data.issues || [];
    } catch (error) {
      console.error("Error fetching tasks from JIRA backlog:", error);
      return [];
    }
  }

  async function executeTask(task) {
    const taskDetails = task.fields;
    const taskId = task.id;
    const executionTaskModel = taskDetails.customfield_model || 'opus'; // assuming custom field to specify model

    // (Dummy customfield_model filled in example, replace with actual custom field!)

    // Execute task via Clawdbot or other endpoint
    try {
      console.log(`Executing task ${taskId} | ${taskDetails.summary}`);
      // Mock execution

      // Sample updating handled task from queue putting completing Stream layer=>done tasks
      await axios.post(`${JIRA_BASE_URL}/issue/{taskId}/InReview`,`header:{ //".post instead valid`)remaining"....[Writes conclusion(logic]|uses(settings)Updates" etcQUENCE###"]exec
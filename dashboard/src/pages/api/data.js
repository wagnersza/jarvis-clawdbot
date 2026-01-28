import axios from 'axios';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export default async function handler(req, res) {
  const { type } = req.query;

  try {
    if (type === 'jira') {
      const { stdout } = await execPromise('acli jira workitem search --jql "project = KAN" --limit 20 --json');
      return res.status(200).json(JSON.parse(stdout));
    }

    if (type === 'sessions') {
      const { stdout } = await execPromise('clawdbot status --json');
      const status = JSON.parse(stdout);
      // We'll transform this to the format the UI expects or just pass the rich status
      return res.status(200).json(status.sessions || []);
    }

    if (type === 'crons') {
      const { stdout } = await execPromise('clawdbot status --json');
      const status = JSON.parse(stdout);
      return res.status(200).json(status.cron?.jobs || []);
    }

    if (type === 'logs') {
        const { stdout } = await execPromise('tail -n 50 /tmp/clawdbot/*.log || echo "No logs found"');
        return res.status(200).json({ content: stdout });
    }

    return res.status(400).json({ error: 'Invalid type' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}

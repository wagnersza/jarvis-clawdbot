import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Terminal, 
  Calendar, 
  CheckSquare, 
  Activity, 
  ChevronRight,
  RefreshCw,
  Search
} from 'lucide-react';

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [crons, setCrons] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [logs, setLogs] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [sRes, cRes, tRes, lRes] = await Promise.all([
        fetch('/api/data?type=sessions').then(r => r.json()),
        fetch('/api/data?type=crons').then(r => r.json()),
        fetch('/api/data?type=jira').then(r => r.json()),
        fetch('/api/data?type=logs').then(r => r.json())
      ]);
      setSessions(sRes);
      setCrons(cRes);
      setTasks(tRes);
      setLogs(lRes.content);
    } catch (err) {
      console.error('Fetch error:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <LayoutDashboard size={24} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Jarvis Dashboard</h1>
        </div>
        <div className="flex gap-4 items-center">
          <button 
            onClick={fetchData}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
          <div className="text-slate-400 text-sm">
            {new Date().toLocaleTimeString()}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Main Stats Column */}
        <div className="md:col-span-8 space-y-6">
          
          {/* Active Sessions */}
          <section className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
              <h2 className="font-semibold flex items-center gap-2">
                <Activity size={18} className="text-green-400" />
                Active Sessions
              </h2>
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full uppercase tracking-wider">Live</span>
            </div>
            <div className="p-0">
              {sessions.map(s => (
                <div key={s.id} className="flex items-center justify-between p-4 hover:bg-slate-800/50 border-b border-slate-800 last:border-0 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <div>
                      <div className="font-medium">{s.displayName || s.label || s.key}</div>
                      <div className="text-xs text-slate-500">{s.model} {s.channel && `• ${s.channel}`}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400">
                      Tokens: {(s.totalTokens || 0).toLocaleString()}
                    </div>
                    {s.contextTokens && (
                      <div className="w-24 bg-slate-800 h-1 mt-1 rounded-full overflow-hidden">
                        <div 
                          className="bg-blue-500 h-full" 
                          style={{ width: `${Math.min(100, ((s.totalTokens || 0) / s.contextTokens) * 100)}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Jira Tasks */}
          <section className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
              <h2 className="font-semibold flex items-center gap-2">
                <CheckSquare size={18} className="text-blue-400" />
                Recent Jira Tasks
              </h2>
            </div>
            <div className="p-0 max-h-[400px] overflow-y-auto">
              {tasks.map(t => (
                <div key={t.key} className="p-4 hover:bg-slate-800/50 border-b border-slate-800 last:border-0 transition-colors group">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold text-blue-500">{t.key}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold ${
                      t.fields.status.name === 'In Review' ? 'bg-purple-500/20 text-purple-400' : 
                      t.fields.status.name === 'Done' ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-300'
                    }`}>
                      {t.fields.status.name}
                    </span>
                  </div>
                  <div className="text-sm font-medium group-hover:text-blue-400 transition-colors">{t.fields.summary}</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Column */}
        <div className="md:col-span-4 space-y-6">
          
          {/* Cron Jobs */}
          <section className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-800 bg-slate-900/50">
              <h2 className="font-semibold flex items-center gap-2">
                <Calendar size={18} className="text-amber-400" />
                Scheduled Crons
              </h2>
            </div>
            <div className="p-0">
              {crons.map(c => (
                <div key={c.jobId || c.id} className="p-4 border-b border-slate-800 last:border-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-medium text-sm">{c.label || c.jobId || 'Untitled Job'}</div>
                    <span className="text-[10px] bg-blue-500/10 text-blue-400 px-1 rounded border border-blue-500/20">Clawdbot</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <code className="text-[10px] bg-slate-950 px-2 py-1 rounded text-slate-400">{c.schedule}</code>
                    <div className="text-[10px] text-slate-500">
                      {c.nextRun ? `Next: ${new Date(c.nextRun).toLocaleDateString()}` : 'Paused'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Logs Terminal */}
          <section className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex flex-col h-[500px]">
            <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex items-center gap-2">
              <Terminal size={18} className="text-slate-400" />
              <h2 className="font-semibold">System Logs</h2>
            </div>
            <div className="flex-1 p-4 font-mono text-[10px] overflow-y-auto text-slate-300 leading-relaxed scrollbar-hide bg-black/40">
              <pre className="whitespace-pre-wrap">{logs || 'No logs found...'}</pre>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

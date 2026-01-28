import Link from 'next/link';
import { LayoutDashboard, Terminal, Clock, Settings, Briefcase, Code } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Sessions', href: '/sessions', icon: Code },
  { name: 'Cron Jobs', href: '/crons', icon: Clock },
  { name: 'Logs', href: '/logs', icon: Terminal },
  { name: 'Tasks (Jira)', href: '/tasks', icon: Briefcase },
  { name: 'Skills', href: '/skills', icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-900/50 p-4">
      <div className="mb-8 flex items-center gap-2 px-2">
        <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
          <Terminal size={20} className="text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight">Jarvis</span>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
          >
            <item.icon size={18} />
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

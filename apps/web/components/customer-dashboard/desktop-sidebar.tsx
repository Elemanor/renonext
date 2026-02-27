'use client';

import { Home, Calendar, FolderOpen, Bell, User, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { icon: Home, label: 'Dashboard', active: true },
  { icon: Calendar, label: 'Schedule', active: false },
  { icon: FolderOpen, label: 'Documents', active: false },
  { icon: Bell, label: 'Alerts', active: false },
  { icon: User, label: 'Team', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

export function DesktopSidebar() {
  return (
    <div className="flex flex-col w-56 bg-[#141419] border-r border-white/[0.06]">
      <div className="p-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Home className="w-[18px] h-[18px] text-white" />
          </div>
          <div>
            <h1 className="text-white font-semibold text-base tracking-tight">RenoNext</h1>
            <p className="text-gray-500 text-[11px]">Construction Portal</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map((item) => (
          <motion.button
            key={item.label}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors ${item.active ? 'bg-blue-500/15 text-blue-400' : 'text-gray-400 hover:bg-white/[0.04] hover:text-gray-300'}`}
          >
            <item.icon className="w-[18px] h-[18px]" />
            <span className="text-sm font-medium">{item.label}</span>
          </motion.button>
        ))}
      </nav>
      <div className="p-3 border-t border-white/[0.06]">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-white/[0.04] cursor-pointer transition-colors">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" alt="User" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">John Homeowner</p>
            <p className="text-gray-500 text-[11px] truncate">42 Maple Drive</p>
          </div>
        </div>
      </div>
    </div>
  );
}

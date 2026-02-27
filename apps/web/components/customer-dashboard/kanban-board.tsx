'use client';

import { KanbanSquare } from 'lucide-react';

const columns = [
  {
    id: 'todo',
    title: 'To Do',
    dot: 'bg-gray-500',
    cardBg: 'bg-white/[0.02] border-white/[0.04]',
    tasks: [
      { title: 'HVAC ductwork install', initials: 'DP', color: 'bg-blue-500/20 text-blue-400' },
      { title: 'Roof shingle delivery', initials: 'MJ', color: 'bg-purple-500/20 text-purple-400' },
    ],
  },
  {
    id: 'progress',
    title: 'In Progress',
    dot: 'bg-amber-400',
    cardBg: 'bg-amber-500/[0.06] border-amber-500/15',
    tasks: [
      { title: 'Electrical rough-in', initials: 'TS', color: 'bg-cyan-500/20 text-cyan-400' },
      { title: 'Drywall hanging', initials: 'JK', color: 'bg-green-500/20 text-green-400' },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    dot: 'bg-green-400',
    cardBg: 'bg-green-500/[0.04] border-green-500/10',
    tasks: [
      { title: 'Foundation inspection', initials: 'RW', color: 'bg-indigo-500/20 text-indigo-400' },
      { title: 'Framing complete', initials: 'DP', color: 'bg-blue-500/20 text-blue-400' },
      { title: 'Plumbing rough-in', initials: 'AL', color: 'bg-emerald-500/20 text-emerald-400' },
    ],
  },
] as const;

const totalTasks = columns.reduce((s, c) => s + c.tasks.length, 0);

export function KanbanBoard() {
  return (
    <div className="bg-[#141419] rounded-xl p-4 lg:p-3 border border-white/[0.06] shadow-lg shadow-black/20 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 lg:mb-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center">
            <KanbanSquare className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <h2 className="text-white/90 text-sm tracking-tight">Task Board</h2>
        </div>
        <span className="text-gray-500 text-[10px]">{totalTasks} tasks</span>
      </div>

      {/* Columns */}
      <div className="flex-1 grid grid-cols-3 gap-2 min-h-0">
        {columns.map((col) => (
          <div key={col.id} className="flex flex-col min-h-0">
            {/* Column header */}
            <div className="flex items-center justify-between mb-2 flex-shrink-0">
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${col.dot}`} />
                <span className="text-[10px] text-gray-400">{col.title}</span>
              </div>
              <span className="text-[9px] text-gray-600">{col.tasks.length}</span>
            </div>

            {/* Cards */}
            <div className="flex-1 space-y-1.5 overflow-hidden">
              {col.tasks.map((task) => (
                <div
                  key={task.title}
                  className={`rounded-lg p-2 border ${col.cardBg}`}
                >
                  <p
                    className={`text-[10px] leading-tight mb-1.5 ${
                      col.id === 'done' ? 'text-gray-500 line-through' : 'text-white/80'
                    }`}
                  >
                    {task.title}
                  </p>
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-medium ${task.color}`}>
                    {task.initials}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

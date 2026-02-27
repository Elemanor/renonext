import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Users,
  ImageOff,
} from 'lucide-react';

/* ─── Types ─── */

interface Task {
  name: string;
  time: string;
  progress: number;
  color: string;
  photo?: string;
}

export interface ScheduleDay {
  day: string;
  date: string;
  crew: number;
  status: 'completed' | 'today' | 'upcoming';
  tasks: Task[];
}

interface Props {
  days: ScheduleDay[];
  onViewAll: () => void;
}

/* ─── Helpers ─── */

const HOUR_START = 7;
const HOUR_END = 17;
const HOUR_SPAN = HOUR_END - HOUR_START;

function parseTime(t: string): [number, number] {
  const parts = t.split('–');
  const parse = (s: string) => {
    const n = parseInt(s);
    if (s.endsWith('p') && n !== 12) return n + 12;
    if (s.endsWith('a') && n === 12) return 0;
    return n;
  };
  return [parse(parts[0]), parse(parts[1])];
}

function fmtHour(h: number) {
  if (h === 12) return '12p';
  return h > 12 ? `${h - 12}p` : `${h}a`;
}

/* ─── Component ─── */

export function WeeklySchedulePanel({ days, onViewAll }: Props) {
  const todayIdx = days.findIndex((d) => d.status === 'today');
  const [dayIdx, setDayIdx] = useState(todayIdx >= 0 ? todayIdx : 0);
  const [activeTask, setActiveTask] = useState(0);

  const day = days[dayIdx];
  const tasks = day.tasks;
  const tasksWithPhotos = tasks.filter((t) => t.photo);
  const currentPhoto = tasks[activeTask]?.photo || tasksWithPhotos[0]?.photo;
  const currentTask = tasks[activeTask];
  const doneCount = tasks.filter((t) => t.progress === 100).length;

  const selectDay = useCallback((i: number) => {
    setDayIdx(i);
    setActiveTask(0);
  }, []);

  const selectTask = useCallback((i: number) => {
    setActiveTask(i);
  }, []);

  // Navigate photos via arrows — jump between tasks that have photos
  const goPhoto = useCallback((dir: 1 | -1) => {
    const indices = tasks.map((t, i) => t.photo ? i : -1).filter((i) => i >= 0);
    if (indices.length === 0) return;
    const curPhotoIdx = indices.indexOf(activeTask);
    if (curPhotoIdx >= 0) {
      const next = (curPhotoIdx + dir + indices.length) % indices.length;
      setActiveTask(indices[next]);
    } else {
      setActiveTask(indices[0]);
    }
  }, [tasks, activeTask]);

  return (
    <div>
      {/* ── Header ── */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900">Weekly Schedule</h2>
        <button
          onClick={onViewAll}
          className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
        >
          Full schedule <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      {/* ── Day tabs ── */}
      <div className="mb-4 flex gap-1 overflow-x-auto rounded-xl bg-slate-100 p-1 scrollbar-hide">
        {days.map((d, i) => {
          const active = i === dayIdx;
          const isToday = d.status === 'today';
          const isDone = d.status === 'completed';
          const isUp = d.status === 'upcoming';
          const dayDone = d.tasks.filter((t) => t.progress === 100).length;
          const dayTotal = d.tasks.length;

          return (
            <button
              key={d.day}
              onClick={() => selectDay(i)}
              className={cn(
                'relative flex flex-1 shrink-0 flex-col items-center gap-0.5 rounded-lg py-2 transition-all duration-200',
                active
                  ? 'bg-white shadow-sm'
                  : 'hover:bg-white/50',
                isUp && !active && 'opacity-50',
              )}
            >
              <span className={cn(
                'text-[10px] font-semibold uppercase tracking-wider',
                active ? (isToday ? 'text-blue-600' : 'text-slate-900') : 'text-slate-400',
              )}>
                {d.day}
              </span>
              <span className={cn(
                'text-lg font-bold leading-none',
                active ? 'text-slate-900' : 'text-slate-500',
              )}>
                {d.date}
              </span>
              {/* Progress pip row */}
              <div className="mt-1 flex gap-0.5">
                {d.tasks.map((t, ti) => (
                  <div
                    key={ti}
                    className="h-1 w-3 rounded-full transition-colors"
                    style={{
                      backgroundColor: t.progress === 100
                        ? '#34D399'
                        : t.progress > 0
                          ? t.color
                          : active ? '#E2E8F0' : '#F1F5F9',
                    }}
                  />
                ))}
              </div>
              {/* Status indicators */}
              {isDone && !active && (
                <CheckCircle2 className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 text-emerald-500" />
              )}
              {isToday && !active && (
                <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500 ring-2 ring-slate-100" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Detail panel ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={dayIdx}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200"
        >
          {/* Desktop: side by side | Mobile: stacked */}
          <div className="md:flex">

            {/* ── Left: Photo panel ── */}
            <div className="relative md:w-[45%] md:shrink-0">
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-900 md:h-full md:aspect-auto">
                <AnimatePresence mode="wait">
                  {currentPhoto ? (
                    <motion.img
                      key={`${dayIdx}-${activeTask}`}
                      src={currentPhoto}
                      alt={currentTask?.name}
                      className="h-full w-full object-cover"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      draggable={false}
                      loading="lazy"
                    />
                  ) : (
                    <motion.div
                      key="no-photo"
                      className="flex h-full w-full flex-col items-center justify-center bg-slate-100 text-slate-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <ImageOff className="h-8 w-8" />
                      <span className="mt-1 text-xs">No photo</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Scrim */}
                {currentPhoto && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                )}

                {/* Task tag on photo — color-coded */}
                {currentTask && currentPhoto && (
                  <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-black/30 py-1 pl-1.5 pr-3 backdrop-blur-md">
                    <span
                      className="flex h-5 w-5 items-center justify-center rounded-full"
                      style={{ backgroundColor: currentTask.color }}
                    >
                      <Camera className="h-3 w-3 text-white" />
                    </span>
                    <span className="text-xs font-semibold text-white">{currentTask.name}</span>
                  </div>
                )}

                {/* Photo arrows */}
                {tasksWithPhotos.length > 1 && (
                  <>
                    <button
                      onClick={() => goPhoto(-1)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition hover:bg-white/30"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => goPhoto(1)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition hover:bg-white/30"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </>
                )}

                {/* Bottom: day info + progress */}
                {currentPhoto && (
                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-base font-bold text-white">
                          {day.day}, Feb {day.date}
                        </p>
                        <div className="mt-0.5 flex items-center gap-3 text-[11px] text-white/70">
                          <span className="flex items-center gap-1"><Users className="h-3 w-3" />{day.crew} crew</span>
                          <span>{doneCount}/{tasks.length} done</span>
                        </div>
                      </div>
                    </div>
                    {/* Overall progress */}
                    <div className="mt-2 h-1 rounded-full bg-white/20">
                      <motion.div
                        className="h-full rounded-full bg-white/80"
                        initial={{ width: 0 }}
                        animate={{ width: `${tasks.length > 0 ? Math.round(tasks.reduce((s, t) => s + t.progress, 0) / tasks.length) : 0}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' as const }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Thumbnail strip — color-bordered, only tasks with photos */}
              {tasksWithPhotos.length > 1 && (
                <div className="flex gap-1.5 border-b border-slate-100 bg-slate-50 px-3 py-2 scrollbar-hide md:border-b-0 md:border-r">
                  {tasks.map((t, ti) => {
                    if (!t.photo) return null;
                    const isActive = ti === activeTask;
                    return (
                      <button
                        key={ti}
                        onClick={() => selectTask(ti)}
                        className={cn(
                          'relative h-11 w-14 shrink-0 overflow-hidden rounded-lg transition-all duration-200',
                          isActive ? 'shadow ring-2 scale-105' : 'opacity-50 ring-1 ring-slate-200 hover:opacity-80',
                        )}
                        style={isActive ? { boxShadow: `0 0 0 2px ${t.color}` } : undefined}
                      >
                        <img src={t.photo} alt={t.name} className="h-full w-full object-cover" loading="lazy" />
                        {/* Color dot indicator */}
                        <span
                          className="absolute bottom-0.5 left-0.5 h-2 w-2 rounded-full ring-1 ring-white"
                          style={{ backgroundColor: t.color }}
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ── Right: Schedule ── */}
            <div className="flex-1 p-4">
              {/* Header */}
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-800">Schedule</span>
                <span className="text-[11px] text-slate-400">
                  {doneCount}/{tasks.length} complete
                </span>
              </div>

              {/* Hour ruler */}
              <div className="mb-1 flex">
                <div className="w-2 shrink-0" />
                <div className="relative flex h-4 flex-1">
                  {[7, 9, 11, 13, 15, 17].map((h) => (
                    <span
                      key={h}
                      className="absolute -translate-x-1/2 text-[9px] font-medium text-slate-300"
                      style={{ left: `${((h - HOUR_START) / HOUR_SPAN) * 100}%` }}
                    >
                      {fmtHour(h)}
                    </span>
                  ))}
                </div>
              </div>

              {/* Task rows — Gantt + clickable */}
              <div className="space-y-1">
                {tasks.map((task, ti) => {
                  const [start, end] = parseTime(task.time);
                  const left = ((start - HOUR_START) / HOUR_SPAN) * 100;
                  const width = ((end - start) / HOUR_SPAN) * 100;
                  const isDone = task.progress === 100;
                  const isActive = task.progress > 0 && task.progress < 100;
                  const isSelected = ti === activeTask;
                  const hasPhoto = !!task.photo;

                  return (
                    <motion.button
                      key={ti}
                      onClick={() => selectTask(ti)}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: ti * 0.04, duration: 0.25, ease: 'easeOut' as const }}
                      className={cn(
                        'group flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-all duration-200',
                        isSelected
                          ? 'bg-slate-50 ring-1 ring-slate-200'
                          : 'hover:bg-slate-50/50',
                      )}
                    >
                      {/* Color indicator + photo icon */}
                      <div className="flex w-2 shrink-0 flex-col items-center">
                        <span
                          className={cn('h-2 w-2 rounded-full transition-transform', isSelected && 'scale-125')}
                          style={{ backgroundColor: task.color }}
                        />
                        {hasPhoto && (
                          <Camera className="mt-0.5 h-2 w-2 text-slate-300" />
                        )}
                      </div>

                      {/* Gantt bar area */}
                      <div className="flex-1">
                        {/* Task name row */}
                        <div className="mb-1 flex items-center justify-between">
                          <span className={cn(
                            'truncate text-[11px]',
                            isDone ? 'text-slate-400 line-through' : 'font-medium text-slate-700',
                            isSelected && !isDone && 'text-slate-900',
                          )}>
                            {task.name}
                          </span>
                          <span className={cn(
                            'ml-2 shrink-0 text-[10px] tabular-nums',
                            isDone ? 'text-slate-300' : 'font-semibold text-slate-500',
                          )}>
                            {task.progress}%
                          </span>
                        </div>

                        {/* Bar */}
                        <div className="relative h-5 rounded bg-slate-50">
                          {/* Grid lines */}
                          {[7, 9, 11, 13, 15, 17].map((h) => (
                            <div
                              key={h}
                              className="absolute top-0 h-full w-px bg-slate-100"
                              style={{ left: `${((h - HOUR_START) / HOUR_SPAN) * 100}%` }}
                            />
                          ))}

                          {/* Slot background */}
                          <div
                            className="absolute top-0.5 bottom-0.5 rounded"
                            style={{
                              left: `${left}%`,
                              width: `${width}%`,
                              backgroundColor: task.color,
                              opacity: 0.1,
                            }}
                          />

                          {/* Progress fill */}
                          <motion.div
                            className="absolute top-0.5 bottom-0.5 rounded"
                            style={{
                              left: `${left}%`,
                              backgroundColor: task.color,
                              opacity: isDone ? 0.35 : 0.85,
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${(width * task.progress) / 100}%` }}
                            transition={{ delay: ti * 0.04 + 0.15, duration: 0.5, ease: 'easeOut' as const }}
                          />

                          {/* Progress edge pulse */}
                          {isActive && (
                            <div
                              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                              style={{ left: `${left + (width * task.progress) / 100}%` }}
                            >
                              <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ backgroundColor: task.color }} />
                                <span className="relative inline-flex h-2 w-2 rounded-full ring-[1.5px] ring-white" style={{ backgroundColor: task.color }} />
                              </span>
                            </div>
                          )}

                          {/* Done check */}
                          {isDone && (
                            <div
                              className="absolute top-1/2 -translate-y-1/2"
                              style={{ left: `${left + width - 1}%` }}
                            >
                              <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                            </div>
                          )}

                          {/* Time label inside bar */}
                          <div
                            className="pointer-events-none absolute top-0 flex h-full items-center overflow-hidden"
                            style={{ left: `${left + 0.5}%`, width: `${width - 1}%` }}
                          >
                            <span className={cn(
                              'truncate text-[8px] font-medium',
                              isDone ? 'text-slate-500/60' : isActive ? 'text-white' : 'text-slate-400',
                            )}>
                              {task.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Today live indicator */}
              {day.status === 'today' && (
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
                  </span>
                  <span className="text-xs font-medium text-blue-700">
                    In progress — {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

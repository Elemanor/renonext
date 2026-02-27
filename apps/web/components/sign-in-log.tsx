'use client';

import { Clock } from 'lucide-react';
import type { SignInRecord } from '@/lib/mock-data/jobs';

interface SignInLogProps {
  logs: SignInRecord[];
}

export function SignInLog({ logs }: SignInLogProps) {
  const totalHours = logs.reduce((sum, l) => sum + (l.hoursOnSite ?? 0), 0);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-2.5 text-left text-xs font-bold uppercase tracking-widest text-gray-500">
              Date
            </th>
            <th className="px-4 py-2.5 text-left text-xs font-bold uppercase tracking-widest text-gray-500">
              Sign In
            </th>
            <th className="px-4 py-2.5 text-left text-xs font-bold uppercase tracking-widest text-gray-500">
              Sign Out
            </th>
            <th className="px-4 py-2.5 text-right text-xs font-bold uppercase tracking-widest text-gray-500">
              Hours
            </th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.date} className="border-b border-gray-100 last:border-0">
              <td className="px-4 py-2.5 font-medium text-gray-900">
                {new Date(log.date + 'T00:00:00').toLocaleDateString('en-CA', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </td>
              <td className="px-4 py-2.5">
                <span className="inline-flex items-center gap-1.5 text-green-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  {log.signIn}
                </span>
              </td>
              <td className="px-4 py-2.5">
                {log.signOut ? (
                  <span className="text-gray-600">{log.signOut}</span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-amber-600">
                    <Clock className="h-3 w-3" />
                    Still on site
                  </span>
                )}
              </td>
              <td className="px-4 py-2.5 text-right font-semibold text-gray-900">
                {log.hoursOnSite != null
                  ? `${log.hoursOnSite.toFixed(1)}h`
                  : '—'}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-50">
            <td
              colSpan={3}
              className="px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-gray-500"
            >
              Total
            </td>
            <td className="px-4 py-2.5 text-right font-bold text-gray-900">
              {totalHours.toFixed(1)}h
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function MetricCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl">
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
            <ArrowUpRight className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg">+1.29%</span>
        </div>
        <p className="text-sm text-slate-400">Total Income</p>
        <h3 className="text-2xl font-bold mt-1 text-white">$632.000</h3>
      </div>

      <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl">
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
            <ArrowDownRight className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg">+1.29%</span>
        </div>
        <p className="text-sm text-slate-400">Total Outcome</p>
        <h3 className="text-2xl font-bold mt-1 text-white">$632.000</h3>
      </div>
    </div>
  );
}
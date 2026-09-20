import React from 'react';
import { useReports } from '../context/ReportContext';
import {
  Accessibility,
  Building2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MapPin,
  Clock,
  Layers,
} from 'lucide-react';

export const RoleSelectView: React.FC = () => {
  const { userRole, setUserRole } = useReports();

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="max-w-4xl w-full space-y-10 sm:space-y-12">
        {/* Header section */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Operational Role Selection</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Welcome to Inclusive Infrastructure Intelligence
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            Turning infrastructure observations into measurable accessibility improvements.
          </p>
        </div>

        {/* Two Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Card 1: Citizen / User */}
          <div
            onClick={() => setUserRole('citizen')}
            className={`group relative bg-white rounded-3xl p-6 sm:p-8 border-2 transition-all duration-200 flex flex-col justify-between cursor-pointer hover:shadow-xl ${
              userRole === 'citizen'
                ? 'border-sky-600 ring-2 ring-sky-200 shadow-md'
                : 'border-slate-200 hover:border-sky-500'
            }`}
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center text-3xl font-bold group-hover:bg-sky-700 group-hover:text-white transition shadow-xs">
                  ♿
                </div>
                <div className="flex items-center gap-1.5">
                  {userRole === 'citizen' && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Active Role
                    </span>
                  )}
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-sky-50 group-hover:text-sky-700 transition">
                    Public Portal
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900 group-hover:text-sky-700 transition flex items-center gap-2">
                  <span>Citizen / User</span>
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Report infrastructure barriers, understand their accessibility impact, get immediate assistance, and track your report.
                </p>
              </div>

              {/* Key Features */}
              <div className="space-y-2.5 pt-3 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>AI Infrastructure photo analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Wheelchair, Visual &amp; Elderly impact evaluation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Verified step-free immediate assistance detours</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Live citizen report tracking to resolution</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="button"
                className="w-full py-3.5 px-5 rounded-xl bg-sky-700 hover:bg-sky-800 group-hover:bg-sky-800 text-white font-bold text-sm shadow-sm transition flex items-center justify-center gap-2"
              >
                <span>Enter as Citizen / User</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 2: Authority */}
          <div
            onClick={() => setUserRole('authority')}
            className={`group relative bg-white rounded-3xl p-6 sm:p-8 border-2 transition-all duration-200 flex flex-col justify-between cursor-pointer hover:shadow-xl ${
              userRole === 'authority'
                ? 'border-sky-600 ring-2 ring-sky-200 shadow-md'
                : 'border-slate-200 hover:border-sky-500'
            }`}
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center text-3xl font-bold group-hover:bg-slate-900 group-hover:text-white transition shadow-xs">
                  🏛️
                </div>
                <div className="flex items-center gap-1.5">
                  {userRole === 'authority' && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Active Role
                    </span>
                  )}
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-slate-200 group-hover:text-slate-900 transition">
                    Municipal Center
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900 group-hover:text-sky-700 transition flex items-center gap-2">
                  <span>Authority</span>
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Monitor infrastructure barriers, prioritize interventions, manage reports, and verify improvements.
                </p>
              </div>

              {/* Key Features */}
              <div className="space-y-2.5 pt-3 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Deterministic 0–100 Priority Scoring engine</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Interactive Hyderabad infrastructure barrier map</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Remediation dispatch queue &amp; work crew orders</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>AI post-fix photo verification &amp; +delta impact measurement</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="button"
                className="w-full py-3.5 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 group-hover:bg-slate-800 text-white font-bold text-sm shadow-sm transition flex items-center justify-center gap-2"
              >
                <span>Enter as Authority</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Prototype Clarification Footer */}
        <div className="text-center space-y-1 pt-2">
          <p className="text-xs text-slate-500 font-semibold">
            Operational Evaluation Prototype • Hyderabad Sector Demo
          </p>
          <p className="text-[11px] text-slate-400">
            No authentication required. You can switch between Citizen and Authority roles at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { InfrastructureReport } from '../types';
import {
  TrendingUp,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Accessibility,
  Building2,
  Calendar,
} from 'lucide-react';
import { MOCK_IMAGES } from '../data/mockImages';

interface BeforeAfterProps {
  report: InfrastructureReport;
  onClose?: () => void;
}

export const BeforeAfterImpactView: React.FC<BeforeAfterProps> = ({ report, onClose }) => {
  const resolution = report.resolution || {
    beforeScore: 32,
    afterScore: 86,
    improvementDelta: 54,
    beforePhoto: report.photoUrl || MOCK_IMAGES.blockedRampBefore,
    afterPhoto: MOCK_IMAGES.blockedRampAfter,
    reanalysisResult:
      'AI Re-analysis: Obstruction cleared. Ramp surface restored to full 1200mm operational width. Step-free accessibility re-established for wheelchair, elderly, and visually impaired pedestrians. Zero critical barriers remaining.',
    resolvedAt: new Date().toLocaleDateString(),
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-emerald-900 text-white rounded-2xl p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-800 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Remediation Verified &amp; Closed
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Before → After Accessibility Impact Measurement
          </h2>
          <p className="text-xs text-emerald-200">
            {report.title} • {report.locationName}
          </p>
        </div>

        {/* Delta Callout Box */}
        <div className="bg-emerald-800/90 border border-emerald-700 px-5 py-3 rounded-xl text-center shadow-inner">
          <div className="text-2xl sm:text-3xl font-black text-white flex items-center justify-center gap-1">
            <TrendingUp className="w-6 h-6 text-emerald-400" />
            <span>+{resolution.improvementDelta}</span>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-300">
            Accessibility Score Gain
          </span>
        </div>
      </div>

      {/* Side-by-side Photo & Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BEFORE PANEL */}
        <div className="bg-white rounded-2xl p-5 border-2 border-red-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded-md">
              Condition: BEFORE INTERVENTION
            </span>
            <span className="text-xs font-bold text-red-600">
              Initial Audit
            </span>
          </div>

          <div className="aspect-video rounded-xl overflow-hidden bg-slate-900 shadow-inner relative">
            <img
              src={resolution.beforePhoto}
              alt="Infrastructure before remediation"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = MOCK_IMAGES.blockedRampBefore;
              }}
            />
            <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
              CRITICAL BARRIER
            </div>
          </div>

          <div className="space-y-3 pt-1">
            <div className="flex items-baseline justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-semibold text-slate-500">
                Initial Accessibility Index:
              </span>
              <span className="text-xl font-bold text-red-600">
                {resolution.beforeScore} <span className="text-xs text-slate-400">/ 100</span>
              </span>
            </div>

            <div className="text-xs text-slate-600 space-y-1">
              <div className="flex justify-between">
                <span>Wheelchair Access:</span>
                <span className="font-bold text-red-600 uppercase">Blocked / Impassable</span>
              </div>
              <div className="flex justify-between">
                <span>Elderly Fall Hazard:</span>
                <span className="font-bold text-amber-600 uppercase">High Vulnerability</span>
              </div>
              <div className="flex justify-between">
                <span>Tactile Clearance:</span>
                <span className="font-bold text-blue-600 uppercase">Obstruction Hazard</span>
              </div>
            </div>
          </div>
        </div>

        {/* AFTER PANEL */}
        <div className="bg-white rounded-2xl p-5 border-2 border-emerald-300 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
              Condition: AFTER REMEDIATION
            </span>
            <span className="text-xs font-bold text-emerald-700">
              Verified Post-Fix
            </span>
          </div>

          <div className="aspect-video rounded-xl overflow-hidden bg-slate-900 shadow-inner relative">
            <img
              src={resolution.afterPhoto}
              alt="Infrastructure after remediation"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = MOCK_IMAGES.blockedRampAfter;
              }}
            />
            <div className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
              VERIFIED COMPLIANT
            </div>
          </div>

          <div className="space-y-3 pt-1">
            <div className="flex items-baseline justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-semibold text-slate-500">
                Post-Fix Accessibility Index:
              </span>
              <span className="text-xl font-bold text-emerald-700">
                {resolution.afterScore} <span className="text-xs text-slate-400">/ 100</span>
              </span>
            </div>

            <div className="text-xs text-slate-600 space-y-1">
              <div className="flex justify-between">
                <span>Wheelchair Access:</span>
                <span className="font-bold text-emerald-600 uppercase">Fully Step-Free</span>
              </div>
              <div className="flex justify-between">
                <span>Elderly Fall Hazard:</span>
                <span className="font-bold text-emerald-600 uppercase">Low Risk</span>
              </div>
              <div className="flex justify-between">
                <span>Tactile Clearance:</span>
                <span className="font-bold text-emerald-600 uppercase">1.5m Unobstructed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Re-analysis Statement Box */}
      <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5 space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sky-700" />
          <h3 className="font-bold text-sm text-sky-950">
            Vision AI Re-Analysis Findings
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-sky-900 leading-relaxed">
          {resolution.reanalysisResult}
        </p>
        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-sky-800">
          <div className="flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5" />
            <span>Assigned: {report.recommendation.department}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>Verified: {resolution.resolvedAt || 'Today'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useReports } from '../context/ReportContext';
import {
  X,
  MapPin,
  Building2,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Wrench,
  Upload,
  ArrowRight,
  TrendingUp,
  Sparkles,
  ShieldAlert,
  Accessibility,
  Eye,
  UserCheck,
} from 'lucide-react';
import { MOCK_IMAGES, getDemoImageForIssue } from '../data/mockImages';
import { BeforeAfterImpactView } from './BeforeAfterImpactView';

interface IssueInspectorProps {
  reportId: string;
  onClose: () => void;
}

export const IssueInspectorModal: React.FC<IssueInspectorProps> = ({ reportId, onClose }) => {
  const {
    reports,
    updateReportStatus,
    resolveReportWithAfterPhoto,
  } = useReports();

  const report = reports.find((r) => r.id === reportId);
  const [afterPhotoUpload, setAfterPhotoUpload] = useState<string>(MOCK_IMAGES.blockedRampAfter);
  const [isResolving, setIsResolving] = useState(false);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);

  if (!report) return null;

  const { analysis, accessibilityImpacts, priority, recommendation, assistance, status } = report;

  const handleMarkInProgress = () => {
    updateReportStatus(
      report.id,
      'in_progress',
      `Assigned to ${recommendation.department}. Remediation work order dispatched.`
    );
  };

  const handleResolve = () => {
    setIsResolving(true);
    setTimeout(() => {
      resolveReportWithAfterPhoto(report.id, afterPhotoUpload);
      setIsResolving(false);
      setShowBeforeAfter(true);
    }, 600);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setAfterPhotoUpload(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold bg-slate-200 text-slate-800 px-2 py-0.5 rounded">
                {report.trackingNumber}
              </span>
              <span
                className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${
                  status === 'resolved'
                    ? 'bg-emerald-100 text-emerald-800'
                    : status === 'in_progress'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                Status: {status.replace('_', ' ')}
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-1">
              {report.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* If already resolved or toggled to view comparison, show BeforeAfterImpactView */}
          {status === 'resolved' || showBeforeAfter ? (
            <div className="space-y-4">
              <BeforeAfterImpactView report={report} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Photo & Vision analysis (5 Cols) */}
              <div className="md:col-span-5 space-y-4">
                <div className="aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-200 relative">
                  <img
                    src={report.photoUrl}
                    alt={report.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = getDemoImageForIssue(report.analysis.issue);
                    }}
                  />
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    INITIAL BARRIER PHOTO
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Issue:</span>
                    <span className="font-bold capitalize text-slate-900">{analysis.issueTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Severity:</span>
                    <span className="font-bold uppercase text-red-600">{analysis.severity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Vision Confidence:</span>
                    <span className="font-bold text-emerald-700">{Math.round(analysis.confidence * 100)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Department:</span>
                    <span className="font-bold text-slate-800">{recommendation.department}</span>
                  </div>
                  <div className="pt-1 border-t border-slate-200">
                    <span className="text-slate-500 block mb-1">Detected Objects:</span>
                    <div className="flex flex-wrap gap-1">
                      {analysis.detectedObjects.map((o, i) => (
                        <span key={i} className="bg-white border px-1.5 py-0.5 rounded text-[11px]">
                          {o}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Priority, Accessibility & Remediation Action (7 Cols) */}
              <div className="md:col-span-7 space-y-4">
                {/* Priority Score Banner */}
                <div className="flex items-center justify-between bg-red-50 border border-red-200 rounded-xl p-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-red-600 tracking-wider">
                      Deterministic Priority
                    </span>
                    <div className="text-2xl font-black text-red-700">
                      {priority.totalScore} <span className="text-xs font-normal text-slate-500">/ 100</span>
                    </div>
                  </div>
                  <div className="text-right text-xs text-red-700">
                    <span className="font-bold uppercase block">{priority.priorityTier} PRIORITY</span>
                    <span className="text-[11px] text-slate-500">Severity {priority.severityScore}/25 • Acc {priority.accessibilityScore}/30</span>
                  </div>
                </div>

                {/* Accessibility Impacts */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    Accessibility Impacts:
                  </span>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-1 font-bold text-slate-700 mb-0.5">
                        <Accessibility className="w-3.5 h-3.5 text-sky-700" />
                        <span>Wheelchair</span>
                      </div>
                      <span className="text-[11px] font-bold uppercase text-red-600">
                        {accessibilityImpacts.wheelchair.level}
                      </span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-1 font-bold text-slate-700 mb-0.5">
                        <Eye className="w-3.5 h-3.5 text-sky-700" />
                        <span>Visual</span>
                      </div>
                      <span className="text-[11px] font-bold uppercase text-blue-600">
                        {accessibilityImpacts.visual.level}
                      </span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-1 font-bold text-slate-700 mb-0.5">
                        <UserCheck className="w-3.5 h-3.5 text-sky-700" />
                        <span>Elderly</span>
                      </div>
                      <span className="text-[11px] font-bold uppercase text-red-600">
                        {accessibilityImpacts.elderly.level}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Controlled Recommendation */}
                <div className="bg-slate-900 text-white rounded-xl p-4 space-y-1">
                  <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">
                    Recommended Fix:
                  </span>
                  <p className="text-sm font-bold">
                    "{recommendation.action}"
                  </p>
                  <p className="text-xs text-slate-400">
                    {recommendation.rationale}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Workflow Action Box (State Transitions) */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-sky-700" />
              <span>Authority Remediation Controls</span>
            </h3>

            {status === 'reported' && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-600">
                  Issue is currently in the initial reported queue. Assign this task to initiate clearance operations.
                </p>
                <button
                  onClick={handleMarkInProgress}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow transition flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Clock className="w-4 h-4" />
                  <span>Mark In Progress</span>
                </button>
              </div>
            )}

            {status === 'in_progress' && (
              <div className="space-y-4">
                <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 p-3 rounded-lg text-xs text-amber-800">
                  <Clock className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
                  <span>
                    Remediation work crew is active. To resolve and measure accessibility improvement, upload the post-fix photo.
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div className="aspect-video rounded-lg overflow-hidden bg-slate-900 border relative">
                    <img
                      src={afterPhotoUpload}
                      alt="After fix preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = MOCK_IMAGES.blockedRampAfter;
                      }}
                    />
                    <div className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      AFTER-FIX VERIFICATION PHOTO
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setAfterPhotoUpload(MOCK_IMAGES.blockedRampAfter)}
                      className="w-full py-2 px-3 rounded-lg bg-white border border-sky-300 text-sky-700 hover:bg-sky-50 text-xs font-semibold shadow-sm transition text-left"
                    >
                      ✓ Use Cleaned Ramp After-Photo (Canonical Demo)
                    </button>

                    <label className="flex items-center justify-center py-2 px-3 border border-dashed border-slate-300 rounded-lg hover:bg-slate-100 cursor-pointer text-xs text-slate-600 transition">
                      <Upload className="w-3.5 h-3.5 mr-1.5" />
                      <span>Upload Custom After Photo</span>
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                  </div>
                </div>

                <button
                  onClick={handleResolve}
                  disabled={isResolving}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white text-xs sm:text-sm font-bold shadow-md transition flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>
                    {isResolving ? 'Analyzing After-Photo with AI...' : 'Verify Post-Fix Photo & Measure Improvement'}
                  </span>
                </button>
              </div>
            )}

            {status === 'resolved' && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Remediation complete and verified by AI. +54 points gained.</span>
                </div>

                <button
                  onClick={() => setShowBeforeAfter(!showBeforeAfter)}
                  className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition"
                >
                  {showBeforeAfter ? 'Hide Detailed Metrics' : 'View Impact Metrics'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold transition"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};

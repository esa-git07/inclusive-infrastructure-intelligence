import React from 'react';
import { useReports } from '../context/ReportContext';
import {
  CheckCircle2,
  Clock,
  MapPin,
  Building2,
  ArrowRight,
  ShieldCheck,
  FilePlus2,
  AlertTriangle,
  TrendingUp,
  Sparkles,
  Accessibility,
  Eye,
  UserCheck,
  LayoutDashboard,
} from 'lucide-react';
import { BeforeAfterImpactView } from './BeforeAfterImpactView';
import { MOCK_IMAGES, getDemoImageForIssue } from '../data/mockImages';

export const CitizenTrackView: React.FC = () => {
  const {
    reports,
    activeReport,
    setActiveReportId,
    setUserRole,
    setCurrentView,
    setSelectedInspectorReportId,
  } = useReports();

  if (!activeReport) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4">
        <p className="text-slate-600">No active report found to track.</p>
        <button
          onClick={() => setCurrentView('report-form')}
          className="px-4 py-2 bg-sky-700 text-white rounded-lg text-sm font-semibold"
        >
          Create New Report
        </button>
      </div>
    );
  }

  const { status, statusHistory, priority, recommendation, analysis } = activeReport;

  const getProfileIcon = () => {
    switch (activeReport.selectedProfile) {
      case 'wheelchair':
        return <Accessibility className="w-3.5 h-3.5 text-sky-700" />;
      case 'visual':
        return <Eye className="w-3.5 h-3.5 text-sky-700" />;
      case 'elderly':
        return <UserCheck className="w-3.5 h-3.5 text-sky-700" />;
    }
  };

  const getProfileLabel = () => {
    switch (activeReport.selectedProfile) {
      case 'wheelchair':
        return 'Wheelchair Access';
      case 'visual':
        return 'Visual Impairment';
      case 'elderly':
        return 'Elderly Mobility';
    }
  };

  const inProgressEntry = statusHistory?.find((h) => h.status === 'in_progress');
  const resolvedEntry = statusHistory?.find((h) => h.status === 'resolved');

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Optional report switcher if user created multiple reports */}
      {reports.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-500 font-semibold flex-shrink-0">Track Report:</span>
          {reports.map((r) => (
            <button
              key={r.id}
              onClick={() => setActiveReportId(r.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
                r.id === activeReport.id
                  ? 'bg-sky-700 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>{r.title}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                  r.status === 'resolved'
                    ? 'bg-emerald-100 text-emerald-800'
                    : r.status === 'in_progress'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                {r.status.replace('_', ' ')}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Top Status Header Banner */}
      <div
        className={`rounded-2xl p-6 sm:p-8 text-center space-y-3 shadow-sm border ${
          status === 'resolved'
            ? 'bg-emerald-50 border-emerald-200'
            : status === 'in_progress'
            ? 'bg-amber-50 border-amber-200'
            : 'bg-sky-50 border-sky-200'
        }`}
      >
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto shadow ${
            status === 'resolved'
              ? 'bg-emerald-600 text-white'
              : status === 'in_progress'
              ? 'bg-amber-500 text-white'
              : 'bg-sky-700 text-white'
          }`}
        >
          {status === 'resolved' && <CheckCircle2 className="w-7 h-7" />}
          {status === 'in_progress' && <Clock className="w-7 h-7" />}
          {status === 'reported' && <ShieldCheck className="w-7 h-7" />}
        </div>

        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border shadow-xs bg-white">
            <span
              className={`w-2 h-2 rounded-full inline-block ${
                status === 'resolved'
                  ? 'bg-emerald-500'
                  : status === 'in_progress'
                  ? 'bg-amber-500'
                  : 'bg-sky-500'
              }`}
            />
            <span
              className={
                status === 'resolved'
                  ? 'text-emerald-800'
                  : status === 'in_progress'
                  ? 'text-amber-800'
                  : 'text-sky-800'
              }
            >
              Current Status: {status.replace('_', ' ').toUpperCase()}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {status === 'resolved'
              ? 'Remediation Verified & Resolved'
              : status === 'in_progress'
              ? 'Remediation In Progress'
              : 'Report Successfully Submitted'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Tracking Number: <strong className="font-mono text-slate-900">{activeReport.trackingNumber}</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-700">
            {getProfileIcon()}
            <span>{getProfileLabel()}</span>
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-700">
            <Building2 className="w-3.5 h-3.5 text-slate-500" />
            <span>{recommendation.department}</span>
          </span>
        </div>
      </div>

      {/* Issue Details Summary Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-slate-900 flex-shrink-0 border border-slate-200 shadow-inner">
            <img
              src={activeReport.photoUrl}
              alt={activeReport.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = getDemoImageForIssue(activeReport.analysis.issue);
              }}
            />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                {activeReport.trackingNumber}
              </span>
              <span
                className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                  status === 'resolved'
                    ? 'bg-emerald-100 text-emerald-800'
                    : status === 'in_progress'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-sky-100 text-sky-800'
                }`}
              >
                {status.replace('_', ' ')}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {activeReport.title}
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <MapPin className="w-4 h-4 text-sky-700 flex-shrink-0" />
              <span>{activeReport.locationName}</span>
            </div>
            <p className="text-xs text-slate-500 line-clamp-2">
              {activeReport.analysis.description}
            </p>
          </div>
        </div>

        {/* Priority Score Box */}
        <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 flex-shrink-0">
          <div className="md:text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Priority Score
            </span>
            <div className="text-2xl sm:text-3xl font-black text-red-600">
              {priority.totalScore}
              <span className="text-xs font-medium text-slate-400"> / 100</span>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md mt-1">
            {recommendation.category}
          </span>
        </div>
      </div>

      {/* Progress Timeline */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Clock className="w-4 h-4 text-sky-700" />
          <span>Remediation Progress Timeline</span>
        </h2>

        <div className="relative pl-6 space-y-8 border-l-2 border-slate-200 ml-4">
          {/* Step 1: Reported */}
          <div className="relative">
            <div className="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
              ✓
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-900">1. Reported &amp; AI Analyzed</span>
                <span className="text-[11px] text-slate-400">
                  {new Date(activeReport.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Barrier identified ({analysis.issueTitle}), accessibility impact evaluated, priority calculated ({priority.totalScore}/100).
              </p>
            </div>
          </div>

          {/* Step 2: In Progress */}
          <div className="relative">
            <div
              className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                status === 'in_progress' || status === 'resolved'
                  ? 'bg-amber-500 text-white'
                  : 'bg-slate-200 text-slate-500'
              }`}
            >
              {status === 'in_progress' || status === 'resolved' ? '✓' : '2'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`font-bold text-sm ${
                    status === 'in_progress' || status === 'resolved'
                      ? 'text-slate-900'
                      : 'text-slate-400'
                  }`}
                >
                  2. Municipal Engineering In Progress
                </span>
                {status === 'in_progress' && (
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">
                    CURRENT STAGE
                  </span>
                )}
                {inProgressEntry && (
                  <span className="text-[11px] text-slate-400">
                    {new Date(inProgressEntry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Assigned to {recommendation.department}. Remediation work crew scheduled for clearance: "{recommendation.action}".
              </p>
            </div>
          </div>

          {/* Step 3: Resolved & Verified */}
          <div className="relative">
            <div
              className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                status === 'resolved'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-200 text-slate-500'
              }`}
            >
              {status === 'resolved' ? '✓' : '3'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`font-bold text-sm ${
                    status === 'resolved' ? 'text-slate-900' : 'text-slate-400'
                  }`}
                >
                  3. Post-Fix Verification &amp; Impact Measured
                </span>
                {status === 'resolved' && (
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    RESOLVED
                  </span>
                )}
                {resolvedEntry && (
                  <span className="text-[11px] text-slate-400">
                    {new Date(resolvedEntry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {status === 'resolved'
                  ? 'Physical obstacle cleared. After-photo verified by AI re-analysis measuring +54 points accessibility recovery.'
                  : 'Pending completion of physical municipal works and post-fix camera verification.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Before / After Impact Section - Automatically displayed when Resolved */}
      {status === 'resolved' && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <h2 className="text-base font-bold text-slate-900">
              Remediation Improvement Measurement
            </h2>
          </div>
          <BeforeAfterImpactView report={activeReport} />
        </div>
      )}

      {/* Authority Next Step Callout for Hackathon Demo */}
      <div className="bg-sky-900 text-white rounded-2xl p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
            Hackathon Live Walkthrough Flow
          </span>
          <h3 className="font-bold text-base text-white">
            {status === 'resolved'
              ? 'Inspect Resolution in Authority Dashboard'
              : 'Switch to Authority Dashboard to Fix & Verify'}
          </h3>
          <p className="text-xs text-slate-300 max-w-lg">
            {status === 'resolved'
              ? 'The report is fully resolved and recorded in the municipal registry. View all city sectors on the authority dashboard.'
              : 'Open the report in the municipal operations queue to dispatch work crews and submit post-fix verification photos.'}
          </p>
        </div>

        <button
          onClick={() => {
            setUserRole('authority');
            setSelectedInspectorReportId(activeReport.id);
            setCurrentView('authority-dashboard');
          }}
          className="px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold transition flex items-center gap-2 whitespace-nowrap shadow-sm flex-shrink-0"
        >
          <span>Open in Authority Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom navigation actions */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => setCurrentView('profile-select')}
          className="text-xs text-slate-600 hover:text-slate-900 font-semibold flex items-center gap-1.5"
        >
          <FilePlus2 className="w-4 h-4" />
          <span>Report Another Barrier</span>
        </button>

        <button
          onClick={() => setCurrentView('map-view')}
          className="text-xs text-sky-700 hover:text-sky-800 font-semibold flex items-center gap-1.5"
        >
          <MapPin className="w-4 h-4" />
          <span>View on City Map</span>
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useReports } from '../context/ReportContext';
import {
  Building2,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Filter,
  MapPin,
  ArrowRight,
  TrendingUp,
  Layers,
  ChevronRight,
  ShieldCheck,
  ShieldAlert,
  Accessibility,
  Eye,
  UserCheck,
  Sparkles,
} from 'lucide-react';
import { InteractiveMapView } from './InteractiveMapView';
import { IssueInspectorModal } from './IssueInspectorModal';
import { getDemoImageForIssue } from '../data/mockImages';

export const AuthorityDashboardView: React.FC = () => {
  const {
    reports,
    selectedInspectorReportId,
    setSelectedInspectorReportId,
    setActiveReportId,
    setCurrentView,
    authorityFilter: filterStatus,
    setAuthorityFilter: setFilterStatus,
    authorityTab: activeTab,
    setAuthorityTab: setActiveTab,
  } = useReports();

  // KPI Calculations - All derived consistently from current reports state
  const totalReports = reports.length;
  const highPriorityReports = reports.filter(
    (r) => r.status !== 'resolved' && r.priority.totalScore >= 70
  ).length;
  const inProgressReports = reports.filter((r) => r.status === 'in_progress').length;
  const resolvedReports = reports.filter((r) => r.status === 'resolved').length;
  const activeBarriers = reports.filter((r) => r.status !== 'resolved').length;

  // Filtered issue list: Priority queue shows ONLY non-resolved reports meeting priority threshold
  const filteredReports = reports.filter((r) => {
    if (filterStatus === 'high_priority') {
      return r.status !== 'resolved' && r.priority.totalScore >= 70;
    }
    if (filterStatus === 'in_progress') {
      return r.status === 'in_progress';
    }
    if (filterStatus === 'resolved') {
      return r.status === 'resolved';
    }
    return true; // 'all' shows all reports
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Dashboard Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-sky-700" />
            <span>Municipal Operations Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Infrastructure Intelligence Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Monitor, prioritize and measure accessibility infrastructure remediation. (Hyderabad Sector Prototype)
          </p>
        </div>

        {/* Prototype Clarification Tag (As required by PRD: never claim live GHMC integration) */}
        <div className="bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2 text-right">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            System Scope
          </span>
          <span className="text-xs text-slate-700 font-semibold">
            Operational Evaluation Prototype (Demo Data)
          </span>
        </div>
      </div>

      {/* KPI Stats Cards (5 Cards as specified in UI Specs) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Total Reports */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-slate-500">Total Reports</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {totalReports}
          </div>
          <span className="text-[11px] text-slate-400">All city sectors</span>
        </div>

        {/* High / Critical Priority */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-red-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-red-600 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>High Priority</span>
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-red-600">
            {highPriorityReports}
          </div>
          <span className="text-[11px] text-red-500 font-medium">Requires immediate fix</span>
        </div>

        {/* In Progress */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-amber-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-amber-700 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>In Progress</span>
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-700">
            {inProgressReports}
          </div>
          <span className="text-[11px] text-amber-600 font-medium">Dispatched crews</span>
        </div>

        {/* Resolved */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-emerald-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Resolved</span>
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700">
            {resolvedReports}
          </div>
          <span className="text-[11px] text-emerald-600 font-medium">Post-fix verified</span>
        </div>

        {/* Active Barriers */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-1 col-span-2 sm:col-span-1">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-sky-700" />
            <span>Active Barriers</span>
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-sky-900">
            {activeBarriers}
          </div>
          <span className="text-[11px] text-slate-400">Restricting transit</span>
        </div>
      </div>

      {/* Main Content Area: View Toggle (Queue vs Map) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Tab buttons */}
          <div className="flex items-center gap-1 bg-slate-200 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('queue')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'queue'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Priority Issue Queue ({filteredReports.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'map'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Map View</span>
            </button>
          </div>

          {/* Filter Pills */}
          {activeTab === 'queue' && (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-slate-400 font-medium mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Filter:
              </span>
              <button
                onClick={() => setFilterStatus('high_priority')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                  filterStatus === 'high_priority'
                    ? 'bg-red-600 text-white font-bold'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                High Priority ({highPriorityReports})
              </button>
              <button
                onClick={() => setFilterStatus('in_progress')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                  filterStatus === 'in_progress'
                    ? 'bg-amber-600 text-white font-bold'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                In Progress ({inProgressReports})
              </button>
              <button
                onClick={() => setFilterStatus('resolved')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                  filterStatus === 'resolved'
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                Resolved ({resolvedReports})
              </button>
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                  filterStatus === 'all'
                    ? 'bg-slate-900 text-white font-bold'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                All ({totalReports})
              </button>
            </div>
          )}
        </div>

        {/* Tab 1: Priority Issue Queue */}
        {activeTab === 'queue' ? (
          filteredReports.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 border border-slate-200 text-center space-y-3">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-500">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
              <h4 className="font-bold text-slate-800 text-base">No Issues in this Category</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {filterStatus === 'high_priority'
                  ? 'No active high-priority barriers currently pending remediation.'
                  : filterStatus === 'in_progress'
                  ? 'No remediation work orders currently marked in progress.'
                  : filterStatus === 'resolved'
                  ? 'No infrastructure barriers marked resolved yet.'
                  : 'No reports found.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredReports.map((report) => {
                const isHigh = report.priority.totalScore >= 70;
                return (
                  <div
                    key={report.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-sky-300 hover:shadow-md transition flex flex-col md:flex-row md:items-center justify-between gap-5"
                  >
                  {/* Left: Thumbnail & Details */}
                  <div className="flex items-start gap-4">
                    <div className="w-24 h-20 sm:w-28 sm:h-20 rounded-xl overflow-hidden bg-slate-900 flex-shrink-0 border border-slate-200 relative">
                      <img
                        src={report.photoUrl}
                        alt={report.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = getDemoImageForIssue(report.analysis.issue);
                        }}
                      />
                      <span className="absolute bottom-1 right-1 bg-black/70 text-[9px] text-white px-1.5 py-0.5 rounded font-mono">
                        {report.trackingNumber.slice(-4)}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-base text-slate-900">
                          {report.title}
                        </h3>
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                            report.status === 'resolved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : report.status === 'in_progress'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {report.status.replace('_', ' ')}
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-sky-600" />
                        <span>{report.locationName}</span>
                      </p>

                      <div className="pt-1 flex flex-wrap items-center gap-2 text-xs">
                        <span className="text-slate-400">Dept:</span>
                        <strong className="text-slate-700">{report.recommendation.department}</strong>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-500 italic truncate max-w-xs">
                          "{report.recommendation.action}"
                        </span>
                      </div>

                      {/* 3 Profile Impact badges */}
                      <div className="pt-1 flex items-center gap-1.5">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">Impacts:</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                          ♿ {report.accessibilityImpacts.wheelchair.level.toUpperCase()}
                        </span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                          👁️ {report.accessibilityImpacts.visual.level.toUpperCase()}
                        </span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                          👴 {report.accessibilityImpacts.elderly.level.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Score & Action Button */}
                  <div className="flex md:flex-col items-center md:items-end justify-between gap-3 border-t md:border-t-0 pt-3 md:pt-0">
                    <div className="text-left md:text-right">
                      <div className="inline-flex items-baseline gap-1 text-slate-900">
                        <span className={`text-2xl font-black ${isHigh ? 'text-red-600' : 'text-amber-600'}`}>
                          {report.priority.totalScore}
                        </span>
                        <span className="text-xs font-medium text-slate-400">/ 100</span>
                      </div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Priority Score
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setActiveReportId(report.id);
                        setSelectedInspectorReportId(report.id);
                      }}
                      className="px-4 py-2 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs shadow-sm transition flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <span>Inspect Issue</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )) : (
          /* Tab 2: Embedded Interactive Map */
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
            <InteractiveMapView
              onSelectReport={(id) => {
                setActiveReportId(id);
                setSelectedInspectorReportId(id);
              }}
            />
          </div>
        )}
      </div>

      {/* Modal Inspector Component */}
      {selectedInspectorReportId && (
        <IssueInspectorModal
          reportId={selectedInspectorReportId}
          onClose={() => setSelectedInspectorReportId(null)}
        />
      )}
    </div>
  );
};

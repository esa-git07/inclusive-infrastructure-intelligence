import React, { useState, useEffect } from 'react';
import { useReports } from '../context/ReportContext';
import {
  Volume2,
  VolumeX,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Accessibility,
  Eye,
  UserCheck,
  ShieldAlert,
  Building2,
  Compass,
  FileCheck,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { speakText, stopSpeaking, isSpeaking } from '../lib/speechSynthesis';
import { getDemoImageForIssue } from '../data/mockImages';

export const AIAnalysisResultView: React.FC = () => {
  const {
    activeReport,
    selectedProfile,
    setCurrentView,
    updateReportStatus,
    setSelectedInspectorReportId,
    setUserRole,
  } = useReports();

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Stop speech when component unmounts
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  if (!activeReport) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4">
        <p className="text-slate-600">No report selected for analysis.</p>
        <button
          onClick={() => setCurrentView('report-form')}
          className="px-4 py-2 bg-sky-700 text-white rounded-lg text-sm font-semibold"
        >
          Create New Report
        </button>
      </div>
    );
  }

  const { analysis, accessibilityImpacts, priority, recommendation, assistance } = activeReport;

  // Vocalize analysis summary via Web Speech API
  const handleToggleVoice = () => {
    if (isPlayingAudio || isSpeaking()) {
      stopSpeaking();
      setIsPlayingAudio(false);
      return;
    }

    const script = `
      Inclusive Infrastructure Intelligence analysis complete.
      Issue detected: ${analysis.issueTitle}.
      Severity is ${analysis.severity}.
      AI confidence: ${Math.round(analysis.confidence * 100)} percent.
      Accessibility impact for wheelchair users is ${accessibilityImpacts.wheelchair.level}.
      Impact for visually impaired pedestrians is ${accessibilityImpacts.visual.level}.
      Impact for elderly pedestrians is ${accessibilityImpacts.elderly.level}.
      ${
        assistance.hasAlternative
          ? `Immediate verified alternative: ${assistance.title}, approximately ${assistance.distance || 'nearby'}.`
          : 'No certified detour is currently surveyed.'
      }
      Deterministic infrastructure priority score: ${priority.totalScore} out of 100.
      Recommended action: ${recommendation.action}.
      Responsible department: ${recommendation.department}.
    `.trim();

    const started = speakText(
      script,
      () => setIsPlayingAudio(true),
      () => setIsPlayingAudio(false),
      () => setIsPlayingAudio(false)
    );

    if (!started) {
      setIsPlayingAudio(false);
    }
  };

  const getImpactBadge = (level: string) => {
    switch (level) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'medium':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Banner & Status bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-200">
              Tracking: {activeReport.trackingNumber}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {new Date(activeReport.createdAt).toLocaleDateString()}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Infrastructure Analysis &amp; Intelligence
          </h1>
          <p className="text-xs text-slate-600 flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 text-sky-600" />
            <span>{activeReport.locationName}</span>
          </p>
        </div>

        {/* Speech Synthesis Voice Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleVoice}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm shadow-sm transition flex items-center gap-2 ${
              isPlayingAudio
                ? 'bg-amber-600 hover:bg-amber-700 text-white animate-pulse'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            {isPlayingAudio ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span>Stop Voice</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <span>Listen to Analysis</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Screen Layout: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Image & AI Vision Scan (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Photo Box */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Photo Ingestion
                </span>
                {analysis.aiSource === 'gemini' ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-full shadow-xs">
                    <Sparkles className="w-3 h-3 text-sky-600" />
                    Analyzed with Gemini Vision
                  </span>
                ) : (
                  <span className="inline-flex items-center text-[10px] font-medium text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
                    Analyzed with Demo AI
                  </span>
                )}
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                Confidence: {Math.round(analysis.confidence * 100)}%
              </span>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 shadow-inner">
              <img
                src={activeReport.photoUrl}
                alt="Detected infrastructure issue"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = getDemoImageForIssue(activeReport.analysis.issue);
                }}
              />
              <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                BARRIER CONFIRMED
              </div>
            </div>

            {/* AI Vision structured data card */}
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Detected Issue:</span>
                <span className="font-bold text-slate-900 capitalize">
                  {analysis.issueTitle}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Severity:</span>
                <span className="font-bold uppercase text-red-600">
                  {analysis.severity}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Accessibility Barrier:</span>
                <span className="font-bold text-amber-700">
                  {analysis.accessibilityBarrier ? 'YES — Restricts Transit' : 'NO'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block mb-1">Detected Objects:</span>
                <div className="flex flex-wrap gap-1">
                  {analysis.detectedObjects.map((obj, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700 font-mono text-[11px]"
                    >
                      {obj}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 italic bg-white p-2.5 rounded-lg border border-slate-100">
              "{analysis.description}"
            </p>
          </div>

          {/* HELP NOW: Immediate Assistance Card */}
          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-600 text-white">
                  <Compass className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-emerald-950">
                  Help Now — Immediate Assistance
                </h3>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-200/60 text-emerald-900 px-2 py-0.5 rounded">
                Verified Survey
              </span>
            </div>

            {assistance.hasAlternative ? (
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <h4 className="font-bold text-emerald-900 text-sm">
                    {assistance.title}
                  </h4>
                  {assistance.distance && (
                    <span className="text-xs font-bold text-emerald-700">
                      {assistance.distance}
                    </span>
                  )}
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  {assistance.details}
                </p>
                <div className="pt-1 flex items-center gap-1.5 text-[11px] text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Audited accessible bypass. Strictly verified—never hallucinated.</span>
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-600">
                <p className="font-medium text-slate-800">
                  No verified alternative currently available.
                </p>
                <p className="mt-1 text-slate-500">
                  No certified accessible pathway has been surveyed for this location. Proceed with caution.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Impacts, Priority Score, Recommendations (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section: Who is Affected? (Accessibility Impact) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  Who is affected? — Accessibility Impact
                </h3>
                <p className="text-xs text-slate-500">
                  Multi-demographic evaluation (non-binary scoring)
                </p>
              </div>
              <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-md font-medium">
                Active View: <strong className="capitalize">{selectedProfile}</strong>
              </span>
            </div>

            <div className="space-y-3">
              {/* Wheelchair */}
              <div
                className={`p-4 rounded-xl border transition ${
                  selectedProfile === 'wheelchair'
                    ? 'bg-sky-50/70 border-sky-400 ring-1 ring-sky-300'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Accessibility className="w-4 h-4 text-sky-700" />
                    <span className="font-bold text-sm text-slate-900">Wheelchair Users</span>
                    {selectedProfile === 'wheelchair' && (
                      <span className="text-[10px] font-bold uppercase bg-sky-200 text-sky-900 px-1.5 py-0.5 rounded">
                        Selected Profile
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-xs font-bold uppercase px-2 py-0.5 rounded border ${getImpactBadge(
                      accessibilityImpacts.wheelchair.level
                    )}`}
                  >
                    {accessibilityImpacts.wheelchair.level} IMPACT
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {accessibilityImpacts.wheelchair.explanation}
                </p>
              </div>

              {/* Visual Impairment */}
              <div
                className={`p-4 rounded-xl border transition ${
                  selectedProfile === 'visual'
                    ? 'bg-sky-50/70 border-sky-400 ring-1 ring-sky-300'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-sky-700" />
                    <span className="font-bold text-sm text-slate-900">Visual Impairment</span>
                    {selectedProfile === 'visual' && (
                      <span className="text-[10px] font-bold uppercase bg-sky-200 text-sky-900 px-1.5 py-0.5 rounded">
                        Selected Profile
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-xs font-bold uppercase px-2 py-0.5 rounded border ${getImpactBadge(
                      accessibilityImpacts.visual.level
                    )}`}
                  >
                    {accessibilityImpacts.visual.level} IMPACT
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {accessibilityImpacts.visual.explanation}
                </p>
              </div>

              {/* Elderly */}
              <div
                className={`p-4 rounded-xl border transition ${
                  selectedProfile === 'elderly'
                    ? 'bg-sky-50/70 border-sky-400 ring-1 ring-sky-300'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-sky-700" />
                    <span className="font-bold text-sm text-slate-900">Elderly Pedestrians</span>
                    {selectedProfile === 'elderly' && (
                      <span className="text-[10px] font-bold uppercase bg-sky-200 text-sky-900 px-1.5 py-0.5 rounded">
                        Selected Profile
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-xs font-bold uppercase px-2 py-0.5 rounded border ${getImpactBadge(
                      accessibilityImpacts.elderly.level
                    )}`}
                  >
                    {accessibilityImpacts.elderly.level} IMPACT
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {accessibilityImpacts.elderly.explanation}
                </p>
              </div>
            </div>
          </div>

          {/* Section: Priority Engine (Deterministic 0-100 score) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Infrastructure Priority Engine
                </span>
                <h3 className="font-bold text-base text-slate-900 mt-0.5">
                  Deterministic Remediation Score
                </h3>
              </div>

              {/* Score Display Badge */}
              <div className="text-right">
                <div className="inline-flex items-baseline gap-1 bg-red-50 border-2 border-red-500/30 px-3.5 py-1.5 rounded-xl text-red-700">
                  <span className="text-2xl sm:text-3xl font-black">
                    {priority.totalScore}
                  </span>
                  <span className="text-xs font-bold text-red-500">/ 100</span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-red-600 mt-1">
                  CRITICAL / HIGH PRIORITY
                </div>
              </div>
            </div>

            {/* Contributing Factor Breakdown Bars */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                Contributing Factor Calculations:
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Severity</span>
                  <span className="font-bold text-slate-800">{priority.severityScore}/25</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Accessibility</span>
                  <span className="font-bold text-slate-800">{priority.accessibilityScore}/30</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">3 Profiles</span>
                  <span className="font-bold text-slate-800">{priority.affectedUsersScore}/15</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Footfall</span>
                  <span className="font-bold text-slate-800">{priority.locationScore}/20</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Env Risk</span>
                  <span className="font-bold text-slate-800">{priority.environmentalScore}/10</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 pt-1 leading-relaxed">
                <strong>Engine Rationale:</strong> {priority.rationale}
              </p>
            </div>
          </div>

          {/* Section: Recommendation */}
          <div className="bg-sky-900 text-white rounded-2xl p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-sky-800 text-sky-200">
                  <Building2 className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm tracking-wide">
                  Recommended Municipal Action
                </h3>
              </div>
              <span className="text-xs font-semibold bg-sky-800 text-sky-200 px-2.5 py-1 rounded-md">
                Dept: {recommendation.department}
              </span>
            </div>

            <div className="bg-sky-950/60 rounded-xl p-4 border border-sky-800/80 space-y-1">
              <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">
                Controlled Action Protocol:
              </span>
              <p className="text-base font-bold text-white">
                "{recommendation.action}"
              </p>
              <p className="text-xs text-slate-300 pt-1">
                {recommendation.rationale}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={() => {
                  updateReportStatus(activeReport.id, 'reported', 'Citizen submission logged in municipal queue.');
                  setCurrentView('citizen-track');
                }}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs sm:text-sm shadow transition flex items-center justify-center gap-2"
              >
                <FileCheck className="w-4 h-4" />
                <span>Confirm Report &amp; Track Status</span>
              </button>

              <button
                onClick={() => {
                  setUserRole('authority');
                  setSelectedInspectorReportId(activeReport.id);
                  setCurrentView('authority-dashboard');
                }}
                className="w-full sm:w-auto py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm transition flex items-center justify-center gap-1.5"
              >
                <span>View in Authority Dashboard</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

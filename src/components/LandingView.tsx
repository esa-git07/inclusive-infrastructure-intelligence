import React from 'react';
import { useReports } from '../context/ReportContext';
import {
  ScanEye,
  BrainCircuit,
  LifeBuoy,
  Gauge,
  Wrench,
  TrendingUp,
  Accessibility,
  Eye,
  UserCheck,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const LandingView: React.FC = () => {
  const { setCurrentView, setSelectedProfile } = useReports();

  const handleStartWithProfile = (profile: 'wheelchair' | 'visual' | 'elderly') => {
    setSelectedProfile(profile);
    setCurrentView('report-form');
  };

  const steps = [
    {
      num: '01',
      title: 'DETECT',
      icon: <ScanEye className="w-5 h-5 text-sky-600" />,
      desc: 'AI computer vision analyzes urban photos to identify ramps, cracks, drains, and obstacles.',
    },
    {
      num: '02',
      title: 'UNDERSTAND',
      icon: <BrainCircuit className="w-5 h-5 text-sky-600" />,
      desc: 'Evaluates distinct accessibility impacts for wheelchair, visually impaired, and elderly citizens.',
    },
    {
      num: '03',
      title: 'HELP NOW',
      icon: <LifeBuoy className="w-5 h-5 text-sky-600" />,
      desc: 'Delivers immediate verified step-free detours where audited alternatives exist—never invented.',
    },
    {
      num: '04',
      title: 'PRIORITIZE',
      icon: <Gauge className="w-5 h-5 text-sky-600" />,
      desc: 'Calculates a deterministic 0–100 priority score based on severity, groups affected, and footfall.',
    },
    {
      num: '05',
      title: 'FIX',
      icon: <Wrench className="w-5 h-5 text-sky-600" />,
      desc: 'Routes controlled actionable recommendations to responsible municipal engineering departments.',
    },
    {
      num: '06',
      title: 'MEASURE',
      icon: <TrendingUp className="w-5 h-5 text-sky-600" />,
      desc: 'Verifies remediation with post-fix imagery, measuring exact before-and-after accessibility gains.',
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-sky-50/80 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 border border-sky-200 text-sky-800 text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Civic Accessibility Intelligence
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Turn Infrastructure Problems Into{' '}
            <span className="text-sky-700 underline decoration-sky-300 decoration-4 underline-offset-4">
              Measurable Accessibility Improvements
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Detect infrastructure barriers with AI, understand who they affect across 3 key accessibility profiles, prioritize what needs urgent attention, and verify real improvement after the fix.
          </p>

          {/* Core Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setCurrentView('profile-select')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-semibold text-base shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
            >
              <span>Report Infrastructure Barrier</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => setCurrentView('map-view')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-base shadow-sm transition flex items-center justify-center gap-2"
            >
              <MapPin className="w-5 h-5 text-slate-500" />
              <span>Explore City Map</span>
            </button>
          </div>

          {/* Trust Banner */}
          <div className="pt-6 flex items-center justify-center gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Deterministic 0–100 Scoring</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Verified Alternatives Only</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Before & After Impact Auditing</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6-Step Closed Loop Architecture */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <p className="text-xs font-bold text-sky-700 uppercase tracking-wider">The Complete Solution Loop</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            From Detection to Measurable Resolution
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Traditional complaints stop at reporting. Inclusive Infrastructure Intelligence connects the entire lifecycle.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {steps.map((step) => (
            <div
              key={step.title}
              className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:border-sky-300 hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-slate-400">{step.num}</span>
                  <div className="p-2 rounded-lg bg-sky-50 border border-sky-100">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-sm font-bold text-slate-900 tracking-wide mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Target Accessibility Profiles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-xl overflow-hidden relative">
          <div className="relative z-10 space-y-8">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Target Demographic Focus</span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                3 Dedicated Accessibility Profiles
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                The same physical defect produces completely different mobility consequences. Our engine evaluates each barrier across three specific user perspectives:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Wheelchair Profile */}
              <div className="bg-slate-800/90 rounded-xl p-6 border border-slate-700 hover:border-sky-500 transition space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30">
                    <Accessibility className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white">Wheelchair Users</h3>
                    <p className="text-xs text-slate-400">Step-free physical transit</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Evaluates missing ramps, steep cross-slopes, buckled sidewalk lips exceeding 15mm, and caster-trapping debris.
                </p>
                <button
                  onClick={() => handleStartWithProfile('wheelchair')}
                  className="w-full py-2 px-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition flex items-center justify-center gap-1.5"
                >
                  <span>Select &amp; Report</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Visual Impairment Profile */}
              <div className="bg-slate-800/90 rounded-xl p-6 border border-slate-700 hover:border-sky-500 transition space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30">
                    <Eye className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white">Visual Impairment</h3>
                    <p className="text-xs text-slate-400">Tactile &amp; hazard navigation</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Evaluates open drain voids, missing tactile warning pavers, unexpected street-level drop-offs, and head-height obstacles.
                </p>
                <button
                  onClick={() => handleStartWithProfile('visual')}
                  className="w-full py-2 px-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition flex items-center justify-center gap-1.5"
                >
                  <span>Select &amp; Report</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Elderly Profile */}
              <div className="bg-slate-800/90 rounded-xl p-6 border border-slate-700 hover:border-sky-500 transition space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white">Elderly Users</h3>
                    <p className="text-xs text-slate-400">Balance &amp; fall mitigation</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Evaluates stumbling hazards, absence of dual continuous handrails on stairs, slippery waterlogging, and short crossing times.
                </p>
                <button
                  onClick={() => handleStartWithProfile('elderly')}
                  className="w-full py-2 px-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition flex items-center justify-center gap-1.5"
                >
                  <span>Select &amp; Report</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Demo Launcher Card */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-sky-100 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="inline-block px-2.5 py-0.5 rounded bg-amber-100 text-amber-800 text-xs font-bold uppercase">
              Hackathon Walkthrough Scenario
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              Run Canonical Blocked Ramp Demo
            </h3>
            <p className="text-xs text-slate-600 max-w-md">
              Demonstrates: Wheelchair Profile → Blocked Ramp Scan → High Impact → Gate B Alternative → 91 Priority → Authority Fix → +54 Point Gain.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedProfile('wheelchair');
              setCurrentView('report-form');
            }}
            className="px-6 py-3 rounded-xl bg-sky-700 hover:bg-sky-800 text-white text-sm font-bold shadow transition flex items-center gap-2 whitespace-nowrap"
          >
            <span>Launch Demo Flow</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};

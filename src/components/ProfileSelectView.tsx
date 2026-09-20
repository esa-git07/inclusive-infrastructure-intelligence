import React from 'react';
import { useReports } from '../context/ReportContext';
import { AccessibilityProfile } from '../types';
import { Accessibility, Eye, UserCheck, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

export const ProfileSelectView: React.FC = () => {
  const { selectedProfile, setSelectedProfile, setCurrentView } = useReports();

  const profiles: Array<{
    id: AccessibilityProfile;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    keyFactors: string[];
  }> = [
    {
      id: 'wheelchair',
      title: 'Wheelchair Users',
      subtitle: 'Physical step-free transit & grade safety',
      icon: <Accessibility className="w-8 h-8" />,
      keyFactors: [
        'Missing, blocked, or steep ramps',
        'Stairs without accessible bypass',
        'Uneven sidewalk lips & caster traps',
        'Curb drop-offs lacking curb cuts',
      ],
    },
    {
      id: 'visual',
      title: 'Visual Impairment',
      subtitle: 'Tactile orientation & obstacle hazards',
      icon: <Eye className="w-8 h-8" />,
      keyFactors: [
        'Open drains & uncovered pits',
        'Unexpected obstacles in pathway',
        'Missing tactile guidance paving',
        'Unsafe or non-audible road crossings',
      ],
    },
    {
      id: 'elderly',
      title: 'Elderly Pedestrians',
      subtitle: 'Fall mitigation & walking endurance',
      icon: <UserCheck className="w-8 h-8" />,
      keyFactors: [
        'Slippery or loose walking surfaces',
        'Stairs lacking continuous handrails',
        'Insufficient crossing clearance intervals',
        'Potholes and tripping displacement',
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Top Header */}
      <div className="text-center space-y-2">
        <button
          onClick={() => setCurrentView('landing')}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-medium mb-2 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Home
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          How should we analyze accessibility impact?
        </h1>
        <p className="text-slate-600 text-sm max-w-xl mx-auto">
          Choose a primary profile. The system will prioritize explanations for this perspective while also evaluating impacts across all three groups.
        </p>
      </div>

      {/* 3 Profile Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {profiles.map((p) => {
          const isSelected = selectedProfile === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedProfile(p.id)}
              className={`text-left rounded-2xl p-6 transition-all duration-200 border-2 flex flex-col justify-between ${
                isSelected
                  ? 'border-sky-600 bg-sky-50/50 shadow-md ring-2 ring-sky-600/20'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className={`p-3 rounded-xl ${
                      isSelected
                        ? 'bg-sky-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {p.icon}
                  </div>
                  {isSelected ? (
                    <div className="flex items-center gap-1 text-xs font-bold text-sky-700 bg-sky-100 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Active</span>
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-lg text-slate-900">{p.title}</h3>
                  <p className="text-xs text-slate-500 font-medium">{p.subtitle}</p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Key Analysis Factors:
                  </span>
                  <ul className="mt-2 space-y-1.5">
                    {p.keyFactors.map((f, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                        <span className="text-sky-500 font-bold">•</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100/80">
                <div
                  className={`text-xs font-semibold flex items-center justify-between ${
                    isSelected ? 'text-sky-700' : 'text-slate-400'
                  }`}
                >
                  <span>{isSelected ? 'Selected Profile' : 'Click to Select'}</span>
                  {isSelected && <ArrowRight className="w-4 h-4" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Confirmation & Continue */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <div className="text-xs text-slate-500 text-center sm:text-left">
          Currently analyzing from:{' '}
          <strong className="text-slate-800 uppercase tracking-wide">
            {selectedProfile}
          </strong>{' '}
          perspective
        </div>

        <button
          onClick={() => setCurrentView('report-form')}
          className="w-full sm:w-auto px-8 py-3 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-semibold text-sm shadow-md transition flex items-center justify-center gap-2"
        >
          <span>Continue to Report Form</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

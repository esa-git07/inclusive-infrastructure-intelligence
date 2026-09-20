import React, { useState } from 'react';
import { useReports } from '../context/ReportContext';
import {
  Upload,
  MapPin,
  FileText,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Camera,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { MOCK_IMAGES } from '../data/mockImages';
import { calculateAccessibilityImpacts } from '../lib/accessibilityEngine';
import { calculatePriorityScore } from '../lib/priorityEngine';
import { getControlledRecommendation } from '../lib/recommendationEngine';
import { getVerifiedAssistance } from '../lib/assistanceEngine';
import { InfrastructureReport, IssueType, Severity } from '../types';

export const ReportIssueView: React.FC = () => {
  const {
    selectedProfile,
    setCurrentView,
    addReport,
    setActiveReportId,
  } = useReports();

  const [locationName, setLocationName] = useState('BRKR Bhavan / Secretariat Gate 3, Hyderabad');
  const [description, setDescription] = useState('Wheelchair ramp is completely blocked by accumulated municipal garbage and wooden pallets.');
  const [photoPreview, setPhotoPreview] = useState<string>(MOCK_IMAGES.blockedRampBefore);
  const [selectedIssueType, setSelectedIssueType] = useState<IssueType>('blocked_ramp');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState('');

  const quickLocations = [
    'BRKR Bhavan / Secretariat Gate 3, Hyderabad',
    'Osmania Medical College Rd, Koti, Hyderabad',
    'Ameerpet Metro Station Pillar 1042, Hyderabad',
    'Secunderabad Junction Railway North Gate, Hyderabad',
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setPhotoPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPreset = (preset: 'blocked_ramp' | 'open_drain' | 'broken_sidewalk' | 'waterlogging') => {
    setSelectedIssueType(preset);
    if (preset === 'blocked_ramp') {
      setPhotoPreview(MOCK_IMAGES.blockedRampBefore);
      setLocationName('BRKR Bhavan / Secretariat Gate 3, Hyderabad');
      setDescription('Wheelchair ramp is completely blocked by accumulated municipal garbage and wooden pallets.');
    } else if (preset === 'open_drain') {
      setPhotoPreview(MOCK_IMAGES.openDrain);
      setLocationName('Osmania Medical College Rd, Koti, Hyderabad');
      setDescription('Uncovered stormwater drain directly on pedestrian walking path.');
    } else if (preset === 'broken_sidewalk') {
      setPhotoPreview(MOCK_IMAGES.brokenSidewalk);
      setLocationName('Ameerpet Metro Station Pillar 1042, Hyderabad');
      setDescription('Severely broken and buckled sidewalk slabs creating tripping hazard.');
    } else if (preset === 'waterlogging') {
      setPhotoPreview(MOCK_IMAGES.waterlogging);
      setLocationName('Dilsukhnagar Bus Station Approach, Hyderabad');
      setDescription('Stormwater pooling obscures curb edge and sidewalk ramps, blocking pedestrian access.');
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);

    // Realistic progressive loading sequence as specified in PRD
    setAnalysisStep('1/4: Ingesting image and preprocessing resolution...');
    await new Promise((r) => setTimeout(r, 350));

    setAnalysisStep('2/4: Gemini Vision AI analyzing barrier objects & conditions...');

    // Fallback baseline values
    let issue: IssueType = selectedIssueType;
    let severity: Severity = issue === 'open_drain' ? 'critical' : 'high';
    let confidence = issue === 'blocked_ramp' ? 0.93 : 0.94;
    let detectedObjects =
      issue === 'blocked_ramp'
        ? ['garbage', 'ramp', 'uneven surface']
        : issue === 'open_drain'
        ? ['open drain pit', 'missing slab', 'curb edge']
        : ['broken concrete', 'uneven slab', 'buckled curb'];

    let barrierDescription =
      issue === 'blocked_ramp'
        ? 'A designated wheelchair access ramp is physically obstructed by accumulated municipal waste and debris.'
        : description || 'Civic infrastructure obstruction observed.';
    let accessibilityBarrier = true;
    let aiSource: 'gemini' | 'mock' = 'mock';

    // Call real Gemini Vision backend API
    try {
      const apiRes = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photoData: photoPreview }),
      });

      if (apiRes.ok) {
        const data = await apiRes.json();
        if (data.success && data.analysis) {
          issue = data.analysis.issue;
          severity = data.analysis.severity;
          confidence = data.analysis.confidence;
          detectedObjects = data.analysis.detected_objects;
          barrierDescription = data.analysis.description;
          accessibilityBarrier = data.analysis.accessibility_barrier;
          aiSource = 'gemini';
        }
      }
    } catch (err) {
      console.warn('Gemini vision API unavailable; gracefully falling back to demo analysis:', err);
    }

    setAnalysisStep('3/4: Accessibility Engine evaluating profile impacts...');
    await new Promise((r) => setTimeout(r, 450));

    // Run deterministic engines
    const accessibilityImpacts = calculateAccessibilityImpacts(issue, severity);

    setAnalysisStep('4/4: Calculating deterministic priority score (0–100)...');
    await new Promise((r) => setTimeout(r, 400));

    const issueTitle =
      issue === 'blocked_ramp'
        ? 'Blocked Ramp'
        : issue.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

    const priority = calculatePriorityScore({
      severity,
      accessibilityImpacts,
      locationImportance: 'high',
      environmentalRisk: 'high',
      issueTitle: issue === 'blocked_ramp' ? 'Blocked Ramp at Civic Entrance' : `${issueTitle} at ${locationName.split(',')[0]}`,
      locationName,
    });
    const recommendation = getControlledRecommendation(issue);
    const assistance = getVerifiedAssistance(issue, locationName);

    const reportId = `rep-hyd-${Date.now().toString().slice(-4)}`;
    const trackingNumber = `III-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const getCoordinatesForLocation = (location: string): [number, number] => {
      const locLower = location.toLowerCase();
      let baseCoords: [number, number] = [17.4120, 78.4680];

      if (locLower.includes('secretariat') || locLower.includes('brkr')) {
        baseCoords = [17.4082, 78.4745];
      } else if (locLower.includes('koti') || locLower.includes('osmania')) {
        baseCoords = [17.3820, 78.4867];
      } else if (locLower.includes('ameerpet')) {
        baseCoords = [17.4375, 78.4482];
      } else if (locLower.includes('secunderabad')) {
        baseCoords = [17.4344, 78.5015];
      } else if (locLower.includes('dilsukhnagar')) {
        baseCoords = [17.3688, 78.5247];
      } else if (locLower.includes('hitec') || locLower.includes('cyber')) {
        baseCoords = [17.4435, 78.3772];
      } else if (locLower.includes('charminar')) {
        baseCoords = [17.3616, 78.4747];
      } else if (locLower.includes('banjara')) {
        baseCoords = [17.4156, 78.4350];
      } else if (locLower.includes('jubilee')) {
        baseCoords = [17.4319, 78.4073];
      }

      const jitterLat = (Math.random() * 0.003 + 0.001) * (Math.random() > 0.5 ? 1 : -1);
      const jitterLng = (Math.random() * 0.003 + 0.001) * (Math.random() > 0.5 ? 1 : -1);

      return [
        Number((baseCoords[0] + jitterLat).toFixed(5)),
        Number((baseCoords[1] + jitterLng).toFixed(5)),
      ];
    };

    const newReport: InfrastructureReport = {
      id: reportId,
      trackingNumber,
      title: issue === 'blocked_ramp' ? 'Blocked Ramp at Civic Entrance' : `${issueTitle} at ${locationName.split(',')[0]}`,
      locationName,
      coordinates: getCoordinatesForLocation(locationName),
      locationImportance: 'high',
      environmentalRisk: 'high',
      photoUrl: photoPreview,
      userDescription: description,
      selectedProfile,
      createdAt: new Date().toISOString(),

      analysis: {
        issue,
        issueTitle,
        severity,
        confidence,
        detectedObjects,
        description: barrierDescription,
        accessibilityBarrier,
        aiSource,
      },

      accessibilityImpacts,
      priority,
      recommendation,
      assistance,

      status: 'reported',
      statusHistory: [
        {
          status: 'reported',
          timestamp: new Date().toISOString(),
          note: `Submitted by citizen using ${selectedProfile.toUpperCase()} accessibility profile${
            aiSource === 'gemini' ? ' (Analyzed by Gemini Vision)' : ''
          }.`,
        },
      ],
    };

    addReport(newReport);
    setActiveReportId(newReport.id);
    setIsAnalyzing(false);
    setCurrentView('analysis-result');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="space-y-6">
        {/* Navigation back */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentView('profile-select')}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-medium transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Change Profile ({selectedProfile})
          </button>

          <span className="text-xs bg-sky-100 text-sky-800 font-semibold px-2.5 py-1 rounded-full">
            Active Mode: {selectedProfile.toUpperCase()}
          </span>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Report Infrastructure Issue
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Upload an image of the physical barrier. Our Vision AI and accessibility engines will analyze the problem.
          </p>
        </div>

        {/* Canonical Hackathon Demo Bar */}
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="text-[11px] font-bold text-sky-800 uppercase tracking-wider">
              1-Click Demo Scenarios
            </span>
            <p className="text-xs text-sky-900 font-medium">
              Load ready-to-test inspection scenarios for fast presentation:
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleSelectPreset('blocked_ramp')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition shadow-sm ${
                selectedIssueType === 'blocked_ramp'
                  ? 'bg-sky-700 text-white'
                  : 'bg-white text-slate-700 hover:bg-sky-100 border border-sky-200'
              }`}
            >
              ♿ Blocked Ramp (Canonical)
            </button>
            <button
              type="button"
              onClick={() => handleSelectPreset('open_drain')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition shadow-sm ${
                selectedIssueType === 'open_drain'
                  ? 'bg-sky-700 text-white'
                  : 'bg-white text-slate-700 hover:bg-sky-100 border border-sky-200'
              }`}
            >
              ⚠️ Open Drain
            </button>
            <button
              type="button"
              onClick={() => handleSelectPreset('broken_sidewalk')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition shadow-sm ${
                selectedIssueType === 'broken_sidewalk'
                  ? 'bg-sky-700 text-white'
                  : 'bg-white text-slate-700 hover:bg-sky-100 border border-sky-200'
              }`}
            >
              🚧 Broken Sidewalk
            </button>
            <button
              type="button"
              onClick={() => handleSelectPreset('waterlogging')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition shadow-sm ${
                selectedIssueType === 'waterlogging'
                  ? 'bg-sky-700 text-white'
                  : 'bg-white text-slate-700 hover:bg-sky-100 border border-sky-200'
              }`}
            >
              💧 Waterlogging
            </button>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleAnalyze} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          {/* Photo Upload Section */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-900">
              Infrastructure Photo <span className="text-red-500">*</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              {/* Image Preview Box */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-300 shadow-inner flex items-center justify-center">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Infrastructure barrier preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = MOCK_IMAGES.blockedRampBefore;
                    }}
                  />
                ) : (
                  <div className="text-center p-4 text-slate-400">
                    <Camera className="w-8 h-8 mx-auto mb-2 text-slate-500" />
                    <span className="text-xs">No image loaded</span>
                  </div>
                )}
                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-white font-mono">
                  READY FOR SCAN
                </div>
              </div>

              {/* Upload Action */}
              <div className="space-y-2">
                <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 rounded-xl hover:border-sky-500 hover:bg-sky-50/50 cursor-pointer transition text-center">
                  <Upload className="w-6 h-6 text-slate-400 mb-1" />
                  <span className="text-xs font-semibold text-slate-700">
                    Upload Custom Photo
                  </span>
                  <span className="text-[11px] text-slate-400">
                    JPG, PNG, WebP up to 10MB
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Preset Blocked Ramp image loaded by default</span>
                </div>
              </div>
            </div>
          </div>

          {/* Location Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-sky-600" />
                <span>Location <span className="text-red-500">*</span></span>
              </label>
              <span className="text-[11px] text-slate-400 font-medium">Hyderabad Demo Area</span>
            </div>

            <input
              type="text"
              required
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              placeholder="e.g. BRKR Bhavan / Secretariat Gate 3, Hyderabad"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-sky-600 focus:ring-1 focus:ring-sky-600 text-sm text-slate-900"
            />

            {/* Quick Chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[11px] text-slate-400 py-0.5">Quick select:</span>
              {quickLocations.map((loc) => (
                <button
                  type="button"
                  key={loc}
                  onClick={() => setLocationName(loc)}
                  className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                >
                  {loc.split(',')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-sky-600" />
              <span>Optional Description</span>
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe physical conditions, hazards, or specific pedestrian difficulties..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-sky-600 focus:ring-1 focus:ring-sky-600 text-sm text-slate-900"
            />
          </div>

          {/* Notice */}
          <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <AlertCircle className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
            <span>
              The system analyzes physical geometry, cross-slopes, step hazards, and compares against certified accessible municipal detours.
            </span>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isAnalyzing}
            className="w-full py-4 rounded-xl bg-sky-700 hover:bg-sky-800 disabled:bg-sky-400 text-white font-bold text-base shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{analysisStep}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Analyze Infrastructure with AI</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

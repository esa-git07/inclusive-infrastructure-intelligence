import React from 'react';
import { useReports } from './context/ReportContext';
import { Navbar } from './components/Navbar';
import { RoleSelectView } from './components/RoleSelectView';
import { LandingView } from './components/LandingView';
import { ProfileSelectView } from './components/ProfileSelectView';
import { ReportIssueView } from './components/ReportIssueView';
import { AIAnalysisResultView } from './components/AIAnalysisResultView';
import { CitizenTrackView } from './components/CitizenTrackView';
import { AuthorityDashboardView } from './components/AuthorityDashboardView';
import { InteractiveMapView } from './components/InteractiveMapView';
import { IssueInspectorModal } from './components/IssueInspectorModal';
import { Heart, Shield } from 'lucide-react';

export const App: React.FC = () => {
  const { currentView, selectedInspectorReportId, setSelectedInspectorReportId } = useReports();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar />

      <main className="flex-1">
        {currentView === 'role-select' && <RoleSelectView />}
        {currentView === 'landing' && <LandingView />}
        {currentView === 'profile-select' && <ProfileSelectView />}
        {currentView === 'report-form' && <ReportIssueView />}
        {currentView === 'analysis-result' && <AIAnalysisResultView />}
        {currentView === 'citizen-track' && <CitizenTrackView />}
        {currentView === 'authority-dashboard' && <AuthorityDashboardView />}
        {currentView === 'map-view' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <InteractiveMapView />
          </div>
        )}
      </main>

      {/* Global Inspector Modal */}
      {selectedInspectorReportId && (
        <IssueInspectorModal
          reportId={selectedInspectorReportId}
          onClose={() => setSelectedInspectorReportId(null)}
        />
      )}

      {/* Civic Tech Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-600 font-medium">
            <span>Inclusive Infrastructure Intelligence</span>
            <span>•</span>
            <span>Deterministic Accessibility Scoring</span>
            <span>•</span>
            <span>Hyderabad Demonstration Sandbox</span>
          </div>
          <p className="text-slate-400 text-[11px]">
            Designed for civic accessibility auditing. Evaluates barriers across Wheelchair, Visual Impairment, and Elderly demographics.
          </p>
        </div>
      </footer>
    </div>
  );
};

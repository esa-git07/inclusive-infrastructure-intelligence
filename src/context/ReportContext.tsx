import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  InfrastructureReport,
  AccessibilityProfile,
  ReportStatus,
} from '../types';
import { SEED_REPORTS } from '../data/seedReports';
import { calculateImpactComparison } from '../lib/impactComparisonEngine';
import { MOCK_IMAGES, getDemoImageForIssue } from '../data/mockImages';

export type UserRole = 'citizen' | 'authority';
export type AuthorityFilter = 'all' | 'high_priority' | 'in_progress' | 'resolved';
export type AuthorityTab = 'queue' | 'map';

export type AppView =
  | 'role-select'
  | 'landing'
  | 'profile-select'
  | 'report-form'
  | 'analysis-result'
  | 'citizen-track'
  | 'authority-dashboard'
  | 'map-view';

interface ReportContextType {
  reports: InfrastructureReport[];
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  userRole: UserRole | null;
  setUserRole: (role: UserRole | null) => void;
  authorityFilter: AuthorityFilter;
  setAuthorityFilter: (filter: AuthorityFilter) => void;
  authorityTab: AuthorityTab;
  setAuthorityTab: (tab: AuthorityTab) => void;
  selectedProfile: AccessibilityProfile;
  setSelectedProfile: (profile: AccessibilityProfile) => void;
  activeReportId: string | null;
  setActiveReportId: (id: string | null) => void;
  activeReport: InfrastructureReport | null;
  addReport: (report: InfrastructureReport) => void;
  updateReportStatus: (reportId: string, newStatus: ReportStatus, note?: string) => void;
  resolveReportWithAfterPhoto: (reportId: string, afterPhotoUrl: string) => void;
  resetToCanonicalDemo: () => void;
  selectedInspectorReportId: string | null;
  setSelectedInspectorReportId: (id: string | null) => void;
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

const ROLE_STORAGE_KEY = 'iii_user_role';

const STORAGE_KEY = 'iii_reports_v3';

// Helper to ensure every report always has a valid renderable image
function sanitizeReports(reportList: InfrastructureReport[]): InfrastructureReport[] {
  return reportList.map((rep) => {
    let photoUrl = rep.photoUrl;
    // If photoUrl is empty, contains the old unencoded utf8 scheme, or is invalid, heal it
    if (!photoUrl || photoUrl.startsWith('data:image/svg+xml;utf8') || photoUrl.length < 50) {
      photoUrl = getDemoImageForIssue(rep.analysis.issue);
    }

    let resolution = rep.resolution;
    if (resolution) {
      let beforePhoto = resolution.beforePhoto;
      let afterPhoto = resolution.afterPhoto;
      if (!beforePhoto || beforePhoto.startsWith('data:image/svg+xml;utf8') || beforePhoto.length < 50) {
        beforePhoto = MOCK_IMAGES.blockedRampBefore;
      }
      if (!afterPhoto || afterPhoto.startsWith('data:image/svg+xml;utf8') || afterPhoto.length < 50) {
        afterPhoto = MOCK_IMAGES.blockedRampAfter;
      }
      resolution = {
        ...resolution,
        beforePhoto,
        afterPhoto,
      };
    }

    return {
      ...rep,
      photoUrl,
      resolution,
    };
  });
}

export const ReportProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reports, setReports] = useState<InfrastructureReport[]>(() => {
    try {
      // Clear old storage keys if present
      localStorage.removeItem('iii_reports_v1');
      localStorage.removeItem('iii_reports_v2');

      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return sanitizeReports(parsed);
        }
      }
    } catch {
      // Fallback
    }
    return sanitizeReports(SEED_REPORTS);
  });

  const [userRole, setUserRoleState] = useState<UserRole | null>(() => {
    try {
      // Prevent Authority role from automatically taking over on initial load/refresh
      localStorage.removeItem(ROLE_STORAGE_KEY);
    } catch {
      // Ignore
    }
    return 'citizen';
  });

  const [currentView, setCurrentView] = useState<AppView>('landing');

  const [authorityFilter, setAuthorityFilter] = useState<AuthorityFilter>('high_priority');
  const [authorityTab, setAuthorityTab] = useState<AuthorityTab>('queue');

  const setUserRole = (role: UserRole | null) => {
    setUserRoleState(role);
    try {
      if (role) {
        localStorage.setItem(ROLE_STORAGE_KEY, role);
      } else {
        localStorage.removeItem(ROLE_STORAGE_KEY);
      }
    } catch {
      // Ignore
    }

    if (role === 'citizen') {
      setCurrentView('landing');
    } else if (role === 'authority') {
      setCurrentView('authority-dashboard');
      setAuthorityFilter('high_priority');
      setAuthorityTab('queue');
    } else {
      setCurrentView('role-select');
    }
  };

  const [selectedProfile, setSelectedProfile] = useState<AccessibilityProfile>('wheelchair');
  const [activeReportId, setActiveReportId] = useState<string | null>('rep-hyd-001');
  const [selectedInspectorReportId, setSelectedInspectorReportId] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
    } catch {
      // Ignore
    }
  }, [reports]);

  const activeReport = reports.find((r) => r.id === activeReportId) || reports[0] || null;

  const addReport = (newReport: InfrastructureReport) => {
    const sanitized = sanitizeReports([newReport])[0];
    setReports((prev) => [sanitized, ...prev]);
    setActiveReportId(sanitized.id);
  };

  const updateReportStatus = (reportId: string, newStatus: ReportStatus, note?: string) => {
    setReports((prev) =>
      prev.map((rep) => {
        if (rep.id !== reportId) return rep;
        const newHistory = [
          ...rep.statusHistory,
          {
            status: newStatus,
            timestamp: new Date().toISOString(),
            note: note || `Status transitioned to ${newStatus.toUpperCase()}`,
          },
        ];
        return {
          ...rep,
          status: newStatus,
          statusHistory: newHistory,
        };
      })
    );
  };

  const resolveReportWithAfterPhoto = (reportId: string, afterPhotoUrl: string) => {
    setReports((prev) =>
      prev.map((rep) => {
        if (rep.id !== reportId) return rep;
        const safeAfterPhoto =
          afterPhotoUrl && !afterPhotoUrl.startsWith('data:image/svg+xml;utf8') && afterPhotoUrl.length > 50
            ? afterPhotoUrl
            : MOCK_IMAGES.blockedRampAfter;

        const safeBeforePhoto =
          rep.photoUrl && !rep.photoUrl.startsWith('data:image/svg+xml;utf8') && rep.photoUrl.length > 50
            ? rep.photoUrl
            : MOCK_IMAGES.blockedRampBefore;

        const resolution = calculateImpactComparison(
          rep.analysis.issue,
          safeBeforePhoto,
          safeAfterPhoto
        );
        const newHistory = [
          ...rep.statusHistory,
          {
            status: 'resolved' as ReportStatus,
            timestamp: new Date().toISOString(),
            note: 'Remediation confirmed via post-fix photo inspection. Impact evaluated.',
          },
        ];
        return {
          ...rep,
          status: 'resolved' as ReportStatus,
          statusHistory: newHistory,
          resolution,
        };
      })
    );
  };

  const resetToCanonicalDemo = () => {
    try {
      localStorage.removeItem('iii_reports_v1');
      localStorage.removeItem('iii_reports_v2');
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
    setReports(sanitizeReports(SEED_REPORTS));
    setSelectedProfile('wheelchair');
    setActiveReportId('rep-hyd-001');
    if (userRole === 'authority') {
      setCurrentView('authority-dashboard');
      setAuthorityFilter('high_priority');
      setAuthorityTab('queue');
    } else if (userRole === 'citizen') {
      setCurrentView('landing');
    } else {
      setCurrentView('role-select');
    }
  };

  return (
    <ReportContext.Provider
      value={{
        reports,
        currentView,
        setCurrentView,
        userRole,
        setUserRole,
        authorityFilter,
        setAuthorityFilter,
        authorityTab,
        setAuthorityTab,
        selectedProfile,
        setSelectedProfile,
        activeReportId,
        setActiveReportId,
        activeReport,
        addReport,
        updateReportStatus,
        resolveReportWithAfterPhoto,
        resetToCanonicalDemo,
        selectedInspectorReportId,
        setSelectedInspectorReportId,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export const useReports = (): ReportContextType => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error('useReports must be used within a ReportProvider');
  }
  return context;
};

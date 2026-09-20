import React from 'react';
import { useReports } from '../context/ReportContext';
import {
  Accessibility,
  MapPin,
  LayoutDashboard,
  FilePlus2,
  FileCheck,
  RefreshCw,
  Eye,
  UserCheck,
  Home,
  AlertTriangle,
  Layers,
  ArrowLeftRight,
  Building2,
  Users,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    userRole,
    setUserRole,
    authorityFilter,
    setAuthorityFilter,
    authorityTab,
    setAuthorityTab,
    selectedProfile,
    resetToCanonicalDemo,
  } = useReports();

  const getProfileIcon = () => {
    switch (selectedProfile) {
      case 'wheelchair':
        return <Accessibility className="w-4 h-4 text-sky-600" />;
      case 'visual':
        return <Eye className="w-4 h-4 text-sky-600" />;
      case 'elderly':
        return <UserCheck className="w-4 h-4 text-sky-600" />;
    }
  };

  const getProfileLabel = () => {
    switch (selectedProfile) {
      case 'wheelchair':
        return 'Wheelchair';
      case 'visual':
        return 'Visual Impairment';
      case 'elderly':
        return 'Elderly';
    }
  };

  const handleBrandClick = () => {
    if (userRole === 'authority') {
      setCurrentView('authority-dashboard');
      setAuthorityTab('queue');
      setAuthorityFilter('high_priority');
    } else if (userRole === 'citizen') {
      setCurrentView('landing');
    } else {
      setCurrentView('role-select');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <button
            onClick={handleBrandClick}
            className="flex items-center gap-3 text-left group focus:outline-none"
            aria-label="Go to home page"
          >
            <div className="w-10 h-10 rounded-lg bg-sky-700 text-white flex items-center justify-center font-bold shadow-sm group-hover:bg-sky-800 transition">
              <span className="text-xl">III</span>
            </div>
            <div>
              <div className="font-bold text-slate-900 leading-tight group-hover:text-sky-700 transition">
                Inclusive Infrastructure
              </div>
              <div className="text-xs text-sky-700 font-semibold tracking-wider uppercase">
                Intelligence Platform
              </div>
            </div>
          </button>

          {/* Center Navigation - Conditional per Role */}
          {userRole === 'citizen' && currentView !== 'role-select' && (
            <nav className="hidden md:flex items-center gap-1">
              <button
                onClick={() => setCurrentView('landing')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                  currentView === 'landing'
                    ? 'bg-sky-50 text-sky-800 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>

              <button
                onClick={() => setCurrentView('profile-select')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                  currentView === 'report-form' || currentView === 'analysis-result'
                    ? 'bg-sky-50 text-sky-800 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <FilePlus2 className="w-4 h-4" />
                <span>Report Issue</span>
              </button>

              <button
                onClick={() => setCurrentView('citizen-track')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                  currentView === 'citizen-track'
                    ? 'bg-sky-50 text-sky-800 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <FileCheck className="w-4 h-4" />
                <span>Track My Report</span>
              </button>

              <button
                onClick={() => setCurrentView('profile-select')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                  currentView === 'profile-select'
                    ? 'bg-sky-50 text-sky-800 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Accessibility className="w-4 h-4" />
                <span>Profile</span>
              </button>
            </nav>
          )}

          {userRole === 'authority' && currentView !== 'role-select' && (
            <nav className="hidden md:flex items-center gap-1">
              <button
                onClick={() => {
                  setCurrentView('authority-dashboard');
                  setAuthorityTab('queue');
                  setAuthorityFilter('high_priority');
                }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                  currentView === 'authority-dashboard' && authorityTab === 'queue' && authorityFilter === 'high_priority'
                    ? 'bg-sky-50 text-sky-800 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setCurrentView('map-view')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                  currentView === 'map-view'
                    ? 'bg-sky-50 text-sky-800 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Infrastructure Map</span>
              </button>

              <button
                onClick={() => {
                  setCurrentView('authority-dashboard');
                  setAuthorityTab('queue');
                  setAuthorityFilter('high_priority');
                }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                  currentView === 'authority-dashboard' && authorityFilter === 'high_priority' && authorityTab === 'queue'
                    ? 'bg-sky-50 text-sky-800 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span>Priority Issues</span>
              </button>

              <button
                onClick={() => {
                  setCurrentView('authority-dashboard');
                  setAuthorityTab('queue');
                  setAuthorityFilter('all');
                }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                  currentView === 'authority-dashboard' && authorityFilter === 'all'
                    ? 'bg-sky-50 text-sky-800 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Reports</span>
              </button>
            </nav>
          )}

          {currentView === 'role-select' && (
            <div className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
              <Users className="w-3.5 h-3.5 text-sky-700" />
              <span>Select Your Role to Continue</span>
            </div>
          )}

          {/* Right Tools Area */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Citizen Active Profile Pill */}
            {userRole === 'citizen' && currentView !== 'role-select' && (
              <button
                onClick={() => setCurrentView('profile-select')}
                title="Change active accessibility profile"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-medium text-slate-700 transition"
              >
                {getProfileIcon()}
                <span className="hidden lg:inline text-slate-500">Profile:</span>
                <span className="font-semibold text-slate-900">{getProfileLabel()}</span>
              </button>
            )}

            {/* Authority Role Indicator Badge */}
            {userRole === 'authority' && currentView !== 'role-select' && (
              <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800">
                <Building2 className="w-3.5 h-3.5 text-sky-700" />
                <span>Authority Mode</span>
              </div>
            )}

            {/* Switch Role Option */}
            {userRole && (
              <button
                onClick={() => setCurrentView('role-select')}
                title="Open role selection screen to switch between Citizen and Authority"
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-300 hover:border-sky-500 hover:bg-sky-50 text-xs font-bold text-slate-700 hover:text-sky-700 transition shadow-xs"
              >
                <ArrowLeftRight className="w-3.5 h-3.5 text-sky-600" />
                <span>Switch Role</span>
              </button>
            )}

            {/* Reset Demo Button */}
            <button
              onClick={resetToCanonicalDemo}
              title="Reset application to canonical demonstration state"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-100 text-xs font-medium text-slate-600 transition"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Reset Demo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sub-bar: Citizen Navigation */}
      {userRole === 'citizen' && currentView !== 'role-select' && (
        <div className="md:hidden flex border-t border-slate-200 bg-slate-50 px-2 py-1.5 justify-around text-xs">
          <button
            onClick={() => setCurrentView('landing')}
            className={`px-3 py-1.5 rounded flex items-center gap-1 font-medium ${
              currentView === 'landing' ? 'text-sky-700 bg-sky-100 font-bold' : 'text-slate-600'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            Home
          </button>
          <button
            onClick={() => setCurrentView('profile-select')}
            className={`px-3 py-1.5 rounded flex items-center gap-1 font-medium ${
              currentView === 'report-form' || currentView === 'analysis-result'
                ? 'text-sky-700 bg-sky-100 font-bold'
                : 'text-slate-600'
            }`}
          >
            <FilePlus2 className="w-3.5 h-3.5" />
            Report
          </button>
          <button
            onClick={() => setCurrentView('citizen-track')}
            className={`px-3 py-1.5 rounded flex items-center gap-1 font-medium ${
              currentView === 'citizen-track' ? 'text-sky-700 bg-sky-100 font-bold' : 'text-slate-600'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            Track
          </button>
          <button
            onClick={() => setCurrentView('profile-select')}
            className={`px-3 py-1.5 rounded flex items-center gap-1 font-medium ${
              currentView === 'profile-select' ? 'text-sky-700 bg-sky-100 font-bold' : 'text-slate-600'
            }`}
          >
            <Accessibility className="w-3.5 h-3.5" />
            Profile
          </button>
        </div>
      )}

      {/* Mobile sub-bar: Authority Navigation */}
      {userRole === 'authority' && currentView !== 'role-select' && (
        <div className="md:hidden flex border-t border-slate-200 bg-slate-50 px-2 py-1.5 justify-around text-xs">
          <button
            onClick={() => {
              setCurrentView('authority-dashboard');
              setAuthorityTab('queue');
              setAuthorityFilter('high_priority');
            }}
            className={`px-3 py-1.5 rounded flex items-center gap-1 font-medium ${
              currentView === 'authority-dashboard' && authorityFilter === 'high_priority'
                ? 'text-sky-700 bg-sky-100 font-bold'
                : 'text-slate-600'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            Dashboard
          </button>
          <button
            onClick={() => setCurrentView('map-view')}
            className={`px-3 py-1.5 rounded flex items-center gap-1 font-medium ${
              currentView === 'map-view' ? 'text-sky-700 bg-sky-100 font-bold' : 'text-slate-600'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            Map
          </button>
          <button
            onClick={() => {
              setCurrentView('authority-dashboard');
              setAuthorityTab('queue');
              setAuthorityFilter('high_priority');
            }}
            className={`px-3 py-1.5 rounded flex items-center gap-1 font-medium ${
              currentView === 'authority-dashboard' && authorityFilter === 'high_priority'
                ? 'text-sky-700 bg-sky-100 font-bold'
                : 'text-slate-600'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Priority
          </button>
          <button
            onClick={() => {
              setCurrentView('authority-dashboard');
              setAuthorityTab('queue');
              setAuthorityFilter('all');
            }}
            className={`px-3 py-1.5 rounded flex items-center gap-1 font-medium ${
              currentView === 'authority-dashboard' && authorityFilter === 'all'
                ? 'text-sky-700 bg-sky-100 font-bold'
                : 'text-slate-600'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Reports
          </button>
        </div>
      )}
    </header>
  );
};

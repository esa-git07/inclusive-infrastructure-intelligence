import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { useReports } from '../context/ReportContext';
import { InfrastructureReport } from '../types';
import {
  MapPin,
  Layers,
  CheckCircle2,
  Accessibility,
  Eye,
  UserCheck,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { MOCK_IMAGES, getDemoImageForIssue } from '../data/mockImages';

interface MapViewProps {
  onSelectReport?: (reportId: string) => void;
}

export const InteractiveMapView: React.FC<MapViewProps> = ({ onSelectReport }) => {
  const { reports, setSelectedInspectorReportId } = useReports();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Active infrastructure issues only (Reported or In Progress). Resolved issues do NOT appear on active map.
  const activeReports = reports.filter((r) => r.status !== 'resolved');

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Center on Hyderabad
    const defaultCenter: [number, number] = [17.4065, 78.4772];
    const defaultZoom = 13;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: defaultCenter,
        zoom: defaultZoom,
        zoomControl: true,
      });

      // Standard clean OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Layer group for pins
    const markerLayer = L.layerGroup().addTo(map);

    activeReports.forEach((report) => {
      // Validate coordinates; fallback to valid Hyderabad coordinates if missing
      const coords: [number, number] =
        report.coordinates &&
        report.coordinates.length === 2 &&
        !isNaN(report.coordinates[0]) &&
        !isNaN(report.coordinates[1])
          ? report.coordinates
          : [17.4055, 78.4716];

      const isCriticalOrHigh = report.priority.totalScore >= 70;
      const isMedium = report.priority.totalScore >= 45 && report.priority.totalScore < 70;

      const markerColor = isCriticalOrHigh
        ? '#dc2626' // Red
        : isMedium
        ? '#ea580c' // Orange
        : '#16a34a'; // Green

      const customPinSvg = `
        <div style="position: relative; width: 34px; height: 42px; cursor: pointer;">
          <svg viewBox="0 0 24 32" width="34" height="42" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.35));">
            <path d="M12 0C5.37 0 0 5.37 0 12C0 21 12 32 12 32S24 21 24 12C24 5.37 18.63 0 12 0Z" fill="${markerColor}"/>
            <circle cx="12" cy="12" r="5.5" fill="#ffffff"/>
            <text x="12" y="14.5" text-anchor="middle" font-size="7" font-weight="900" fill="${markerColor}">${report.priority.totalScore}</text>
          </svg>
        </div>
      `;

      const customIcon = L.divIcon({
        html: customPinSvg,
        className: 'custom-infra-marker',
        iconSize: [34, 42],
        iconAnchor: [17, 42],
        popupAnchor: [0, -40],
      });

      const popupContent = document.createElement('div');
      popupContent.className = 'infra-popup text-slate-800 p-1 space-y-2';
      popupContent.innerHTML = `
        <div style="font-family: sans-serif; min-width: 230px;">
          <div style="width: 100%; height: 110px; border-radius: 8px; overflow: hidden; margin-bottom: 8px; background: #0f172a;">
            <img src="${report.photoUrl}" alt="${report.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='${MOCK_IMAGES.blockedRampBefore}'" />
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
            <span style="font-size: 10px; font-weight: bold; background: ${markerColor}; color: white; padding: 2px 6px; border-radius: 4px; text-transform: uppercase;">
              Priority ${report.priority.totalScore}/100
            </span>
            <span style="font-size: 10px; color: #64748b; font-weight: bold; text-transform: uppercase;">
              ${report.status.replace('_', ' ')}
            </span>
          </div>
          <h4 style="font-weight: bold; font-size: 13px; color: #0f172a; margin: 0 0 2px 0;">${report.title}</h4>
          <p style="font-size: 11px; color: #64748b; margin: 0 0 6px 0;">${report.locationName}</p>
          <div style="font-size: 11px; color: #334155; margin-bottom: 8px;">
            <strong>Fix:</strong> ${report.recommendation.action}
          </div>
          <button id="inspect-btn-${report.id}" style="width: 100%; background: #0284c7; color: white; border: none; padding: 6px 8px; border-radius: 6px; font-size: 11px; font-weight: bold; cursor: pointer;">
            Inspect Full Barrier Details →
          </button>
        </div>
      `;

      // Attach click listener to button inside popup
      popupContent.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target && target.id === `inspect-btn-${report.id}`) {
          setSelectedInspectorReportId(report.id);
          if (onSelectReport) onSelectReport(report.id);
        }
      });

      const marker = L.marker(coords, { icon: customIcon }).bindPopup(popupContent);
      markerLayer.addLayer(marker);
    });

    return () => {
      markerLayer.clearLayers();
    };
  }, [reports, setSelectedInspectorReportId, onSelectReport]);

  return (
    <div className="space-y-4">
      {/* Map Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-sky-700" />
            <span>Infrastructure Barrier Map</span>
          </h2>
          <p className="text-xs text-slate-600">
            Real-time geographical distribution of detected accessibility barriers (Hyderabad Sector).
          </p>
        </div>

        {/* Priority Color Legend */}
        <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs shadow-sm">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-600 inline-block" />
            <span className="font-semibold text-slate-700">Critical / High (70-100)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-orange-500 inline-block" />
            <span className="font-semibold text-slate-700">Medium (45-69)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" />
            <span className="font-semibold text-slate-700">Low (0-44)</span>
          </div>
        </div>
      </div>

      {/* Map Canvas */}
      <div className="relative w-full h-[540px] rounded-2xl overflow-hidden border border-slate-300 shadow-md bg-slate-100">
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Map Floating Guide Overlay */}
        <div className="absolute bottom-4 left-4 z-[400] bg-white/95 backdrop-blur-sm px-3.5 py-2.5 rounded-xl border border-slate-200 shadow-md text-xs text-slate-700 max-w-xs space-y-1">
          <div className="font-bold text-slate-900 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-sky-700" />
            <span>Active Barrier Points: {activeReports.length}</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Click any pin to inspect the barrier, review accessibility impacts, or initiate municipal resolution.
          </p>
        </div>
      </div>
    </div>
  );
};

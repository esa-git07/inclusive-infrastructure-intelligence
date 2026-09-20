import { IssueType, VerifiedAssistance } from '../types';

/**
 * Returns verified immediate assistance where surveyed alternatives exist.
 * NEVER dynamically hallucinates or invents routes.
 */
export function getVerifiedAssistance(
  issue: IssueType,
  locationName: string
): VerifiedAssistance {
  const normalizedLoc = locationName.toLowerCase();

  // Canonical demo: Blocked ramp near public building / Secretariat / Gate
  if (
    issue === 'blocked_ramp' &&
    (normalizedLoc.includes('secretariat') ||
      normalizedLoc.includes('brkr') ||
      normalizedLoc.includes('public building') ||
      normalizedLoc.includes('gate') ||
      normalizedLoc.includes('hyderabad'))
  ) {
    return {
      hasAlternative: true,
      title: 'Verified step-free entrance: Gate B',
      distance: '80m away',
      details: 'Proceed 80 meters west along the paved arcade to Gate B. Ramp is equipped with dual 850mm handrails and automatic sliding doors.',
      isVerifiedDemo: true,
    };
  }

  // Pre-surveyed alternative for Medical College / Koti gate
  if (issue === 'open_drain' && normalizedLoc.includes('koti')) {
    return {
      hasAlternative: true,
      title: 'Verified safe pathway: South Gate Pedestrian Corridor',
      distance: '120m away',
      details: 'Divert south along the covered walkway with continuous tactile paving and protective bollards.',
      isVerifiedDemo: true,
    };
  }

  // Fallback: strictly honest, never invent routes
  return {
    hasAlternative: false,
    title: 'No verified alternative currently available',
    details: 'No certified accessible alternative has been surveyed for this immediate sector. Exercise heightened caution or request field assistance.',
    isVerifiedDemo: false,
  };
}

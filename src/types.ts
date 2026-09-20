export type AccessibilityProfile = 'wheelchair' | 'visual' | 'elderly';

export type IssueType =
  | 'blocked_ramp'
  | 'broken_sidewalk'
  | 'stairs'
  | 'obstruction'
  | 'open_drain'
  | 'waterlogging'
  | 'damaged_crossing'
  | 'uneven_surface'
  | 'blocked_pathway'
  | 'pothole'
  | 'missing_ramp'
  | 'other';

export type Severity = 'low' | 'medium' | 'high' | 'critical';

export type ImpactLevel = 'low' | 'medium' | 'high' | 'critical';

export type ReportStatus = 'reported' | 'in_progress' | 'resolved';

export type LocationImportance = 'high' | 'medium' | 'low';

export type EnvironmentalRisk = 'high' | 'medium' | 'low';

export interface ProfileImpact {
  level: ImpactLevel;
  explanation: string;
}

export interface AccessibilityImpacts {
  wheelchair: ProfileImpact;
  visual: ProfileImpact;
  elderly: ProfileImpact;
}

export interface PriorityBreakdown {
  severityScore: number;        // max 25
  accessibilityScore: number;   // max 30
  affectedUsersScore: number;   // max 15
  locationScore: number;        // max 20
  environmentalScore: number;   // max 10
  totalScore: number;           // 0 - 100
  priorityTier: 'critical' | 'high' | 'medium' | 'low';
  rationale: string;
}

export interface RecommendationInfo {
  action: string;
  department: string;
  category: string;
  rationale: string;
}

export interface VerifiedAssistance {
  hasAlternative: boolean;
  title: string;
  distance?: string;
  details: string;
  isVerifiedDemo: boolean;
}

export interface VisionAnalysisResult {
  issue: IssueType;
  issueTitle: string;
  severity: Severity;
  confidence: number; // e.g. 0.93
  detectedObjects: string[];
  description: string;
  accessibilityBarrier: boolean;
  aiSource?: 'gemini' | 'mock';
}

export interface BeforeAfterComparison {
  beforeScore: number;
  afterScore: number;
  improvementDelta: number;
  beforePhoto: string;
  afterPhoto: string;
  reanalysisResult: string;
  resolvedAt?: string;
}

export interface InfrastructureReport {
  id: string;
  trackingNumber: string;
  title: string;
  locationName: string;
  coordinates: [number, number]; // [lat, lng]
  locationImportance: LocationImportance;
  environmentalRisk: EnvironmentalRisk;
  photoUrl: string;
  userDescription?: string;
  selectedProfile: AccessibilityProfile;
  createdAt: string;

  // Analysis & Engines
  analysis: VisionAnalysisResult;
  accessibilityImpacts: AccessibilityImpacts;
  priority: PriorityBreakdown;
  recommendation: RecommendationInfo;
  assistance: VerifiedAssistance;

  // Status & Resolution
  status: ReportStatus;
  statusHistory: Array<{
    status: ReportStatus;
    timestamp: string;
    note: string;
  }>;
  resolution?: BeforeAfterComparison;
}

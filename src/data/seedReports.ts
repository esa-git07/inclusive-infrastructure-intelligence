import { InfrastructureReport } from '../types';
import { calculateAccessibilityImpacts } from '../lib/accessibilityEngine';
import { calculatePriorityScore } from '../lib/priorityEngine';
import { getControlledRecommendation } from '../lib/recommendationEngine';
import { getVerifiedAssistance } from '../lib/assistanceEngine';
import { calculateImpactComparison } from '../lib/impactComparisonEngine';
import { MOCK_IMAGES } from './mockImages';

const blockedRampImpacts = calculateAccessibilityImpacts('blocked_ramp', 'high');
const blockedRampPriority = calculatePriorityScore({
  severity: 'high',
  accessibilityImpacts: blockedRampImpacts,
  locationImportance: 'high',
  environmentalRisk: 'high',
  issueTitle: 'Blocked Ramp at Civic Entrance',
  locationName: 'BRKR Bhavan / Secretariat Gate 3, Hyderabad',
});

const openDrainImpacts = calculateAccessibilityImpacts('open_drain', 'critical');
const openDrainPriority = calculatePriorityScore({
  severity: 'critical',
  accessibilityImpacts: openDrainImpacts,
  locationImportance: 'high',
  environmentalRisk: 'high',
  issueTitle: 'Unguarded Open Drain Chamber',
  locationName: 'Osmania Medical College Rd, Koti, Hyderabad',
});

const brokenSidewalkImpacts = calculateAccessibilityImpacts('broken_sidewalk', 'high');
const brokenSidewalkPriority = calculatePriorityScore({
  severity: 'high',
  accessibilityImpacts: brokenSidewalkImpacts,
  locationImportance: 'medium',
  environmentalRisk: 'medium',
  issueTitle: 'Buckled Sidewalk & Broken Curb',
  locationName: 'Ameerpet Metro Station Pillar 1042, Hyderabad',
});

const damagedCrossingImpacts = calculateAccessibilityImpacts('damaged_crossing', 'high');
const damagedCrossingPriority = calculatePriorityScore({
  severity: 'high',
  accessibilityImpacts: damagedCrossingImpacts,
  locationImportance: 'high',
  environmentalRisk: 'medium',
  issueTitle: 'Damaged Tactile Crossing',
  locationName: 'Station Road, Secunderabad Junction, Hyderabad',
});

const waterloggingImpacts = calculateAccessibilityImpacts('waterlogging', 'high');
const waterloggingPriority = calculatePriorityScore({
  severity: 'high',
  accessibilityImpacts: waterloggingImpacts,
  locationImportance: 'medium',
  environmentalRisk: 'high',
  issueTitle: 'Flooded Sidewalk & Pedestrian Sump',
  locationName: 'Dilsukhnagar Bus Station Approach, Hyderabad',
});

export const SEED_REPORTS: InfrastructureReport[] = [
  // 1. CANONICAL DEMO REPORT
  {
    id: 'rep-hyd-001',
    trackingNumber: 'III-2026-0842',
    title: 'Blocked Ramp at Civic Entrance',
    locationName: 'BRKR Bhavan / Secretariat Gate 3, Hyderabad',
    coordinates: [17.4055, 78.4716],
    locationImportance: 'high',
    environmentalRisk: 'high',
    photoUrl: MOCK_IMAGES.blockedRampBefore,
    userDescription: 'The wheelchair access ramp is obstructed by accumulated municipal garbage and construction waste.',
    selectedProfile: 'wheelchair',
    createdAt: '2026-09-20T10:15:00Z',

    analysis: {
      issue: 'blocked_ramp',
      issueTitle: 'Blocked Ramp',
      severity: 'high',
      confidence: 0.93,
      detectedObjects: ['garbage', 'ramp', 'uneven surface'],
      description: 'A designated wheelchair access ramp is physically obstructed by accumulated municipal waste and debris.',
      accessibilityBarrier: true,
    },

    accessibilityImpacts: blockedRampImpacts,
    priority: blockedRampPriority,
    recommendation: getControlledRecommendation('blocked_ramp'),
    assistance: getVerifiedAssistance('blocked_ramp', 'BRKR Bhavan / Secretariat Gate 3, Hyderabad'),

    status: 'reported',
    statusHistory: [
      {
        status: 'reported',
        timestamp: '2026-09-20T10:15:00Z',
        note: 'Initial citizen scan submitted with Wheelchair profile analysis.',
      },
    ],
  },

  // 2. Open Drain near Koti Medical College
  {
    id: 'rep-hyd-002',
    trackingNumber: 'III-2026-0619',
    title: 'Unguarded Open Drain Chamber',
    locationName: 'Osmania Medical College Rd, Koti, Hyderabad',
    coordinates: [17.3820, 78.4867],
    locationImportance: 'high',
    environmentalRisk: 'high',
    photoUrl: MOCK_IMAGES.openDrain,
    userDescription: 'Missing concrete slab over stormwater chamber along pedestrian walking line.',
    selectedProfile: 'visual',
    createdAt: '2026-09-19T14:30:00Z',

    analysis: {
      issue: 'open_drain',
      issueTitle: 'Open Drain',
      severity: 'critical',
      confidence: 0.96,
      detectedObjects: ['open drain pit', 'missing slab', 'curb edge'],
      description: 'Stormwater manhole is completely uncovered directly within the pedestrian walking pathway.',
      accessibilityBarrier: true,
    },

    accessibilityImpacts: openDrainImpacts,
    priority: openDrainPriority,
    recommendation: getControlledRecommendation('open_drain'),
    assistance: getVerifiedAssistance('open_drain', 'Osmania Medical College Rd, Koti, Hyderabad'),

    status: 'in_progress',
    statusHistory: [
      {
        status: 'reported',
        timestamp: '2026-09-19T14:30:00Z',
        note: 'Reported by pedestrian.',
      },
      {
        status: 'in_progress',
        timestamp: '2026-09-19T16:00:00Z',
        note: 'Drainage & Sanitation inspection team dispatched with replacement slab.',
      },
    ],
  },

  // 3. Broken Sidewalk at Ameerpet
  {
    id: 'rep-hyd-003',
    trackingNumber: 'III-2026-0511',
    title: 'Buckled Sidewalk & Broken Curb',
    locationName: 'Ameerpet Metro Station Pillar 1042, Hyderabad',
    coordinates: [17.4375, 78.4482],
    locationImportance: 'medium',
    environmentalRisk: 'medium',
    photoUrl: MOCK_IMAGES.brokenSidewalk,
    userDescription: 'Severe pavement upheaval caused by tree roots and broken granite curbing.',
    selectedProfile: 'elderly',
    createdAt: '2026-09-18T09:45:00Z',

    analysis: {
      issue: 'broken_sidewalk',
      issueTitle: 'Broken Sidewalk',
      severity: 'high',
      confidence: 0.91,
      detectedObjects: ['broken concrete', 'uneven slab', 'buckled curb'],
      description: 'Heavy displacement of sidewalk slabs creating 65mm vertical step hazards.',
      accessibilityBarrier: true,
    },

    accessibilityImpacts: brokenSidewalkImpacts,
    priority: brokenSidewalkPriority,
    recommendation: getControlledRecommendation('broken_sidewalk'),
    assistance: getVerifiedAssistance('broken_sidewalk', 'Ameerpet Metro Station Pillar 1042, Hyderabad'),

    status: 'reported',
    statusHistory: [
      {
        status: 'reported',
        timestamp: '2026-09-18T09:45:00Z',
        note: 'Citizen report logged.',
      },
    ],
  },

  // 4. Resolved Issue with Before / After Demo at Secunderabad
  {
    id: 'rep-hyd-004',
    trackingNumber: 'III-2026-0394',
    title: 'Damaged Tactile Crossing',
    locationName: 'Station Road, Secunderabad Junction, Hyderabad',
    coordinates: [17.4344, 78.5015],
    locationImportance: 'high',
    environmentalRisk: 'medium',
    photoUrl: MOCK_IMAGES.damagedCrossing,
    userDescription: 'Crossing curb was chipped and tactile warning pavers were completely missing.',
    selectedProfile: 'visual',
    createdAt: '2026-09-15T11:20:00Z',

    analysis: {
      issue: 'damaged_crossing',
      issueTitle: 'Damaged Crossing',
      severity: 'high',
      confidence: 0.94,
      detectedObjects: ['curb gap', 'missing tactile pavers'],
      description: 'Pedestrian crossing approach lacked tactile paving and had an uneven 90mm lip.',
      accessibilityBarrier: true,
    },

    accessibilityImpacts: damagedCrossingImpacts,
    priority: damagedCrossingPriority,
    recommendation: getControlledRecommendation('damaged_crossing'),
    assistance: getVerifiedAssistance('damaged_crossing', 'Secunderabad Junction'),

    status: 'resolved',
    statusHistory: [
      {
        status: 'reported',
        timestamp: '2026-09-15T11:20:00Z',
        note: 'Reported by commuter.',
      },
      {
        status: 'in_progress',
        timestamp: '2026-09-16T08:00:00Z',
        note: 'Roads & Traffic engineering team assigned.',
      },
      {
        status: 'resolved',
        timestamp: '2026-09-17T15:30:00Z',
        note: 'Remediation completed and verified with post-fix imagery.',
      },
    ],

    resolution: calculateImpactComparison(
      'damaged_crossing',
      MOCK_IMAGES.blockedRampBefore,
      MOCK_IMAGES.blockedRampAfter
    ),
  },

  // 5. Waterlogging at Dilsukhnagar Bus Terminal
  {
    id: 'rep-hyd-005',
    trackingNumber: 'III-2026-0288',
    title: 'Flooded Sidewalk & Pedestrian Sump',
    locationName: 'Dilsukhnagar Bus Station Approach, Hyderabad',
    coordinates: [17.3688, 78.5247],
    locationImportance: 'medium',
    environmentalRisk: 'high',
    photoUrl: MOCK_IMAGES.waterlogging,
    userDescription: 'Stormwater pooling obscures curb edge and sidewalk ramps, blocking pedestrian access.',
    selectedProfile: 'elderly',
    createdAt: '2026-09-17T08:15:00Z',

    analysis: {
      issue: 'waterlogging',
      issueTitle: 'Waterlogging',
      severity: 'high',
      confidence: 0.92,
      detectedObjects: ['standing water', 'submerged curb', 'drain sump'],
      description: 'Deep standing water over walkway forcing pedestrians into vehicular traffic.',
      accessibilityBarrier: true,
    },

    accessibilityImpacts: waterloggingImpacts,
    priority: waterloggingPriority,
    recommendation: getControlledRecommendation('waterlogging'),
    assistance: getVerifiedAssistance('waterlogging', 'Dilsukhnagar Bus Station Approach, Hyderabad'),

    status: 'reported',
    statusHistory: [
      {
        status: 'reported',
        timestamp: '2026-09-17T08:15:00Z',
        note: 'Reported by transit user.',
      },
    ],
  },
];

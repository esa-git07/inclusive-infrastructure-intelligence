import { IssueType, RecommendationInfo } from '../types';

const RECOMMENDATION_REGISTRY: Record<IssueType, RecommendationInfo> = {
  blocked_ramp: {
    action: 'Remove the obstruction and restore clear ramp access.',
    department: 'Municipal / Engineering',
    category: 'Obstruction Clearance & Access Restoration',
    rationale: 'Ramp slope and handrails are structurally intact; immediate manual clearance will instantly restore step-free accessibility.',
  },
  broken_sidewalk: {
    action: 'Repair damaged surface and level pavement slabs.',
    department: 'Municipal / Engineering',
    category: 'Footpath Pavement Repair',
    rationale: 'Re-leveling concrete slabs and sealing joints removes caster traps for wheelchair users and eliminates elder trip hazards.',
  },
  stairs: {
    action: 'Install accessible ramp or step-free lift alternative.',
    department: 'Public Works Department',
    category: 'Barrier-Free Capital Works',
    rationale: 'Stairs cannot be negotiated by wheelchair users; adding a 1:12 slope ramp or platform lift ensures universal access.',
  },
  obstruction: {
    action: 'Clear debris and physical obstruction from pedestrian right-of-way.',
    department: 'Sanitation & Solid Waste',
    category: 'Pedestrian Path Clearance',
    rationale: 'Clearing commercial encroachments and waste restores the mandatory 1.5m accessible travel envelope.',
  },
  open_drain: {
    action: 'Cover or protect drain with heavy-duty slotted slab.',
    department: 'Drainage & Sanitation',
    category: 'Drain Chamber Safety Retrofit',
    rationale: 'Direct life-safety intervention to prevent catastrophic falls by visually impaired, elderly, and wheelchair pedestrians.',
  },
  waterlogging: {
    action: 'Inspect drainage and clear blockage.',
    department: 'Drainage & Sanitation',
    category: 'Stormwater Culvert Desilting',
    rationale: 'Removes deep standing water that obscures curb lines and damages wheelchair electronic drive systems.',
  },
  damaged_crossing: {
    action: 'Repair crossing infrastructure and restore tactile curb ramps.',
    department: 'Roads & Traffic',
    category: 'Accessible Intersection Works',
    rationale: 'Flush curb cuts and tactile blister pavers enable safe, independent street crossing before signal intervals expire.',
  },
  uneven_surface: {
    action: 'Resurface pathway to uniform level grade.',
    department: 'Municipal / Engineering',
    category: 'Pavement Resurfacing',
    rationale: 'Smoothing abrupt vertical displacement eliminates the primary cause of balance loss and cane snagging.',
  },
  blocked_pathway: {
    action: 'Remove obstruction and restore 1.5m clear corridor.',
    department: 'Municipal / Engineering',
    category: 'Encroachment Removal',
    rationale: 'Reclaims public walkway space and prevents pedestrians from having to divert onto active vehicle lanes.',
  },
  pothole: {
    action: 'Fill cavity with compact bituminous patch.',
    department: 'Roads & Traffic',
    category: 'Carriageway / Crossing Patching',
    rationale: 'Immediate patch eliminates wheel drop hazards for wheelchair users and severe trip risks for elderly walkers.',
  },
};

/**
 * Returns controlled recommendation mapping based on detected issue.
 * AI is not permitted to hallucinate infrastructure actions.
 */
export function getControlledRecommendation(issue: IssueType): RecommendationInfo {
  return RECOMMENDATION_REGISTRY[issue] || RECOMMENDATION_REGISTRY.blocked_ramp;
}

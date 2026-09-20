import { IssueType, Severity, AccessibilityImpacts, ImpactLevel } from '../types';

interface ImpactDefinition {
  wheelchair: { level: ImpactLevel; explanation: string };
  visual: { level: ImpactLevel; explanation: string };
  elderly: { level: ImpactLevel; explanation: string };
}

const IMPACT_REGISTRY: Record<IssueType, ImpactDefinition> = {
  blocked_ramp: {
    wheelchair: {
      level: 'high',
      explanation: 'The blocked ramp eliminates step-free access, forcing wheelchair users to turn back or risk entering active vehicular lanes.',
    },
    visual: {
      level: 'medium',
      explanation: 'The obstruction creates an unexpected navigation obstacle directly across the designated pedestrian pathway.',
    },
    elderly: {
      level: 'high',
      explanation: 'Eliminates gentle ramp grades and forces reliance on stairs, significantly increasing physical strain and fall hazard.',
    },
  },
  broken_sidewalk: {
    wheelchair: {
      level: 'high',
      explanation: 'Broken and buckled sidewalk slabs catch front caster wheels, risking wheelchair tipping and mechanical damage.',
    },
    visual: {
      level: 'medium',
      explanation: 'Sudden surface gaps and jagged edges disrupt white cane sweeps and present tripping hazards.',
    },
    elderly: {
      level: 'high',
      explanation: 'Uneven broken pavement is a leading cause of loss of balance, stumble hazards, and severe falls.',
    },
  },
  stairs: {
    wheelchair: {
      level: 'critical',
      explanation: 'Complete physical barrier. Zero independent transit is possible without step-free ramp or lift infrastructure.',
    },
    visual: {
      level: 'medium',
      explanation: 'Stairs lacking high-contrast edge nosings and tactile warning strips cause miscalculated step depths.',
    },
    elderly: {
      level: 'high',
      explanation: 'Steep steps without continuous dual-height handrails cause acute joint strain and substantial fall hazards.',
    },
  },
  obstruction: {
    wheelchair: {
      level: 'high',
      explanation: 'Physical obstruction narrows the accessible pathway below the mandatory 900mm clear passage width.',
    },
    visual: {
      level: 'high',
      explanation: 'Protruding or overhead obstacles cannot be detected by cane sweeps in time to prevent upper-body collision.',
    },
    elderly: {
      level: 'medium',
      explanation: 'Forces pedestrians to navigate tight bottlenecks or detour off the sidewalk into active traffic lanes.',
    },
  },
  open_drain: {
    wheelchair: {
      level: 'critical',
      explanation: 'Direct drop hazard. Wheelchair wheels will sink immediately into the open chamber, causing severe injury.',
    },
    visual: {
      level: 'critical',
      explanation: 'Extreme life-safety hazard with no tactile perimeter warning, creating catastrophic stepping-in fall risks.',
    },
    elderly: {
      level: 'critical',
      explanation: 'Dangerous unguarded void along the walking line presenting catastrophic fall and fracture hazards.',
    },
  },
  waterlogging: {
    wheelchair: {
      level: 'high',
      explanation: 'Standing murky water conceals deep drop-offs and destroys traction, risking electric wheelchair motor damage.',
    },
    visual: {
      level: 'high',
      explanation: 'Water masks sidewalk edges, tactile pavers, and curb boundaries, depriving visually impaired pedestrians of orientation.',
    },
    elderly: {
      level: 'high',
      explanation: 'Slick, hidden surface irregularities create extreme slip hazards and force exhausting detours.',
    },
  },
  damaged_crossing: {
    wheelchair: {
      level: 'high',
      explanation: 'Missing or steep curb ramps trap wheelchairs at street level, exposing users to oncoming traffic.',
    },
    visual: {
      level: 'critical',
      explanation: 'Absence of tactile blister paving leaves visually impaired pedestrians without orientation toward the safe crossing axis.',
    },
    elderly: {
      level: 'high',
      explanation: 'Broken crossing surfaces slow walking speed, leaving elderly pedestrians stranded in the middle of roadway cycles.',
    },
  },
  uneven_surface: {
    wheelchair: {
      level: 'medium',
      explanation: 'Cross-slopes and root heaves produce continuous vibration, lateral drift, and risk of tipping.',
    },
    visual: {
      level: 'medium',
      explanation: 'Inconsistent grades produce confusing cane resistance and misjudged stride clearances.',
    },
    elderly: {
      level: 'high',
      explanation: 'Subtle height transitions catch shoes, causing shuffling gaits to trip and lose dynamic balance.',
    },
  },
  blocked_pathway: {
    wheelchair: {
      level: 'high',
      explanation: 'Obstruction completely closes the pedestrian right-of-way, forcing detour into vehicular traffic.',
    },
    visual: {
      level: 'high',
      explanation: 'Blocks navigation line; cane users must search into the street to circumvent the barrier.',
    },
    elderly: {
      level: 'medium',
      explanation: 'Impairs direct access and requires additional walking distance over unpaved road shoulders.',
    },
  },
  pothole: {
    wheelchair: {
      level: 'high',
      explanation: 'Deep cavity can trap front casters abruptly, throwing wheelchair occupants forward.',
    },
    visual: {
      level: 'medium',
      explanation: 'Sudden elevation drop not always caught by cane tip prior to weight transfer.',
    },
    elderly: {
      level: 'high',
      explanation: 'Direct ankle-twist and stumbling hazard, especially under poor lighting conditions.',
    },
  },
  missing_ramp: {
    wheelchair: {
      level: 'critical',
      explanation: 'Absence of curb ramps prevents wheelchair entry, stranding users on roadways or blocking building access entirely.',
    },
    visual: {
      level: 'medium',
      explanation: 'Unramped curb drop-offs without tactile warning surfaces create step-down stumbling hazards.',
    },
    elderly: {
      level: 'high',
      explanation: 'High step curbs without ramp transitions strain joints and increase the risk of serious falls.',
    },
  },
  other: {
    wheelchair: {
      level: 'high',
      explanation: 'Identified infrastructure impediment restricts smooth wheel transit or safe accessible routing.',
    },
    visual: {
      level: 'medium',
      explanation: 'Unexpected obstacle or surface defect compromises tactile orientation and walkway navigation.',
    },
    elderly: {
      level: 'high',
      explanation: 'Pedestrian right-of-way hazard requiring sudden avoidance maneuvers, increasing fall likelihood.',
    },
  },
};

/**
 * Deterministically evaluates accessibility impacts for all 3 profiles.
 * Adapts severity level when issue severity is marked critical.
 */
export function calculateAccessibilityImpacts(
  issue: IssueType,
  severity: Severity = 'high'
): AccessibilityImpacts {
  const base = IMPACT_REGISTRY[issue] || IMPACT_REGISTRY.blocked_ramp;

  // Scale critical severity if global severity is critical
  const scaleLevel = (lvl: ImpactLevel): ImpactLevel => {
    if (severity === 'critical') return 'critical';
    return lvl;
  };

  return {
    wheelchair: {
      level: scaleLevel(base.wheelchair.level),
      explanation: base.wheelchair.explanation,
    },
    visual: {
      level: scaleLevel(base.visual.level),
      explanation: base.visual.explanation,
    },
    elderly: {
      level: scaleLevel(base.elderly.level),
      explanation: base.elderly.explanation,
    },
  };
}

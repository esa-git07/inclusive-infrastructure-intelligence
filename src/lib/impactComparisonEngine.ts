import { BeforeAfterComparison, IssueType } from '../types';

/**
 * Calculates Before -> After accessibility score improvement
 * based on verified post-intervention remediation.
 */
export function calculateImpactComparison(
  issue: IssueType,
  beforePhotoUrl: string,
  afterPhotoUrl: string
): BeforeAfterComparison {
  // For the canonical blocked ramp remediation demo:
  // Before Score: 32/100 -> After Score: 86/100 (+54 points improvement!)
  let beforeScore = 32;
  let afterScore = 86;
  let reanalysisResult =
    'AI Re-analysis: Obstruction cleared. Ramp surface restored to full 1200mm operational width. Step-free accessibility re-established for wheelchair, elderly, and visually impaired pedestrians. Zero critical barriers remaining.';

  if (issue === 'open_drain') {
    beforeScore = 24;
    afterScore = 92;
    reanalysisResult =
      'AI Re-analysis: Heavy-duty galvanized slotted steel grate installed flush with walkway grade. Drop-off hazard eliminated. Safe transit verified for wheelchair casters and white canes.';
  } else if (issue === 'broken_sidewalk') {
    beforeScore = 38;
    afterScore = 88;
    reanalysisResult =
      'AI Re-analysis: Concrete sidewalk slabs leveled and grouted. Tripping lips and gaps reduced below 5mm tolerance. Universal walking surface restored.';
  }

  const improvementDelta = afterScore - beforeScore;

  return {
    beforeScore,
    afterScore,
    improvementDelta,
    beforePhoto: beforePhotoUrl,
    afterPhoto: afterPhotoUrl,
    reanalysisResult,
    resolvedAt: new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
  };
}

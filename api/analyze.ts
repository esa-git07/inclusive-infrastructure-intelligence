// System prompt instructing Gemini to analyze pedestrian barriers and civic infrastructure
export const GEMINI_SYSTEM_PROMPT = `You are an expert civic accessibility and infrastructure inspection vision AI.
Inspect the provided infrastructure photo and identify pedestrian barriers, physical hazards, or accessibility obstructions.

Return ONLY a valid JSON object with exactly these fields:
{
  "issue": "blocked_ramp | broken_sidewalk | stairs | obstruction | open_drain | waterlogging | damaged_crossing | uneven_surface | blocked_pathway | pothole | missing_ramp | other",
  "severity": "low | medium | high | critical",
  "confidence": 0.0 to 1.0,
  "detected_objects": ["list", "of", "detected", "elements"],
  "description": "Short factual description of what is visible",
  "accessibility_barrier": true or false
}

Rules for "issue":
- blocked_ramp: Wheelchair ramp blocked by trash, debris, vehicles, or physical objects.
- broken_sidewalk: Cracked, buckled, or broken concrete/pavement on pedestrian path.
- stairs: Steps or stairs without ramp/lift access.
- obstruction: Poles, signs, debris, stalls, or items blocking sidewalk.
- open_drain: Uncovered or broken drain pits/gratings/manholes.
- waterlogging: Flooded or standing water on walkway or crossing.
- damaged_crossing: Damaged zebra crossing, missing curb cut, or hazardous street crossing.
- uneven_surface: Heaved, sunken, or irregular pavers causing stumbling hazards.
- blocked_pathway: Blocked or closed pedestrian right-of-way.
- pothole: Pit or cavity in roadway/crossing.
- missing_ramp: Curb or entrance where a ramp is absent.
- other: Any other pedestrian hazard or accessibility barrier.

Rules for "severity":
- critical: Direct fall hazard, deep open hole, complete impassable hazard with high injury risk.
- high: Substantial barrier completely blocking wheelchairs/elderly, forcing into vehicle traffic.
- medium: Partial obstruction or surface irregularity requiring detour or careful navigation.
- low: Minor imperfection with minimal transit disruption.`;

export const VALID_ISSUES = [
  'blocked_ramp',
  'broken_sidewalk',
  'stairs',
  'obstruction',
  'open_drain',
  'waterlogging',
  'damaged_crossing',
  'uneven_surface',
  'blocked_pathway',
  'pothole',
  'missing_ramp',
  'other',
] as const;

export const VALID_SEVERITIES = ['low', 'medium', 'high', 'critical'] as const;

export type ValidIssue = (typeof VALID_ISSUES)[number];
export type ValidSeverity = (typeof VALID_SEVERITIES)[number];

export interface StructuredAnalysis {
  issue: ValidIssue;
  severity: ValidSeverity;
  confidence: number;
  detected_objects: string[];
  description: string;
  accessibility_barrier: boolean;
}

export async function runGeminiVisionAnalysis(
  photoData: string,
  apiKey?: string
): Promise<{ success: boolean; analysis?: StructuredAnalysis; model?: string; error?: string }> {
  const key = apiKey || process.env.GEMINI_API_KEY;
  if (!key) {
    return { success: false, error: 'GEMINI_API_KEY environment variable is not configured.' };
  }

  // Extract mimeType and base64 data
  let mimeType = 'image/jpeg';
  let base64 = photoData;

  const match = photoData.match(/^data:([^;]+);base64,(.+)$/);
  if (match) {
    mimeType = match[1];
    base64 = match[2];
  }

  // Priority list of Gemini models tested and verified
  const models = ['gemini-3.5-flash-lite', 'gemini-3.6-flash', 'gemini-flash-latest'];
  let lastError = '';

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: GEMINI_SYSTEM_PROMPT },
                {
                  inlineData: {
                    mimeType,
                    data: base64,
                  },
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.2,
            responseMimeType: 'application/json',
          },
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        lastError = `Gemini API [${model}] status ${response.status}: ${errText}`;
        continue;
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) {
        lastError = `Empty response from Gemini [${model}]`;
        continue;
      }

      // Parse JSON safely
      let cleaned = rawText.trim();
      if (cleaned.startsWith('```json')) {
        cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleaned.startsWith('```')) {
        cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }

      const parsed = JSON.parse(cleaned);

      // Normalize issue
      const rawIssue = (parsed.issue || 'other').toString().toLowerCase().trim().replace(/[-\s]/g, '_');
      const issue: ValidIssue = (VALID_ISSUES as readonly string[]).includes(rawIssue)
        ? (rawIssue as ValidIssue)
        : 'other';

      // Normalize severity
      const rawSeverity = (parsed.severity || 'high').toString().toLowerCase().trim();
      const severity: ValidSeverity = (VALID_SEVERITIES as readonly string[]).includes(rawSeverity)
        ? (rawSeverity as ValidSeverity)
        : 'high';

      // Normalize confidence
      const rawConfidence = Number(parsed.confidence);
      const confidence = isNaN(rawConfidence) ? 0.92 : Math.max(0.1, Math.min(1.0, rawConfidence));

      // Normalize detected objects
      const detected_objects = Array.isArray(parsed.detected_objects) && parsed.detected_objects.length > 0
        ? parsed.detected_objects.map((o: any) => String(o).trim()).filter(Boolean)
        : ['infrastructure barrier'];

      // Normalize description
      const description =
        typeof parsed.description === 'string' && parsed.description.trim()
          ? parsed.description.trim()
          : 'Infrastructure barrier detected along pedestrian route.';

      // Normalize accessibility barrier flag
      const accessibility_barrier =
        typeof parsed.accessibility_barrier === 'boolean' ? parsed.accessibility_barrier : true;

      return {
        success: true,
        model,
        analysis: {
          issue,
          severity,
          confidence: Number(confidence.toFixed(2)),
          detected_objects,
          description,
          accessibility_barrier,
        },
      };
    } catch (err: any) {
      lastError = err.message || String(err);
    }
  }

  return { success: false, error: lastError || 'All Gemini models failed' };
}

// Vercel Serverless Function entrypoint
export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        // use raw body
      }
    }

    const { photoData } = body || {};
    if (!photoData) {
      return res.status(400).json({ success: false, error: 'Missing photoData in request body' });
    }

    const result = await runGeminiVisionAnalysis(photoData);
    if (!result.success) {
      return res.status(200).json({
        success: false,
        error: result.error,
        fallback: true,
      });
    }

    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(200).json({
      success: false,
      error: err.message,
      fallback: true,
    });
  }
}

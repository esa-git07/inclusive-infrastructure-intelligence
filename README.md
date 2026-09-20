Inclusive Infrastructure
AI-Powered Detection & Prioritization of Accessibility Barriers

Inclusive Infrastructure is an AI-powered web application that helps identify infrastructure problems and understand how they affect people with different accessibility needs.

Instead of simply reporting where a problem exists, our system helps answer:

What is the problem? → Who is affected? → How serious is it? → What should be done? → Did the situation improve?

The Problem

Infrastructure problems such as:

Waterlogging
Potholes
Broken sidewalks
Blocked ramps
Open drains
Uneven surfaces
Damaged crossings

do not affect everyone in the same way.

For example, a blocked ramp may be a minor inconvenience for one person but can completely prevent a wheelchair user from entering a building.

Traditional reporting systems mainly focus on location and complaint reporting.

We focus on understanding the accessibility impact of the problem.

Our Solution

Inclusive Infrastructure combines AI image analysis with accessibility and priority logic.

A user can simply:

Upload a photo → Get AI analysis → Understand accessibility impact → Get assistance → See priority → Follow the recommended action → Track the fix → Measure improvement

How It Works
1. Report an Infrastructure Problem

A citizen uploads a photograph of an infrastructure problem and provides its location.

Example:

A photograph shows a ramp near a public building that is blocked by garbage.

↓

2. AI Detects the Problem

The image is analyzed using Gemini Vision.

The system identifies:

Issue: Blocked Ramp
Severity: High
Accessibility Barrier: Yes
Confidence: 93%

↓

3. Understand Who Is Affected

The system checks the problem against three accessibility profiles:

Wheelchair Users
Visually Impaired Users
Elderly Users

Example:

Blocked Ramp

Wheelchair Users → HIGH impact
Visually Impaired Users → MEDIUM impact
Elderly Users → HIGH impact

The same infrastructure problem can therefore have different impacts on different people.

↓

4. Help the User Immediately

If a verified alternative is available, the system can provide immediate assistance.

Example:

Verified step-free entrance: Gate B, 80m away.

If there is no verified alternative:

No verified alternative is currently available.

The system does not invent alternative routes or facilities.

↓

5. Calculate Infrastructure Priority

The system calculates a Priority Score from 0–100 using factors such as:

Issue severity
Accessibility impact
Number of affected user groups
Location importance
Environmental risk

Example:

Priority Score: 91/100

This helps authorities understand which infrastructure problems require greater attention.

↓

6. Recommend an Action

The recommendation engine connects the detected issue with an appropriate intervention.

Example:

Blocked Ramp

→ Remove obstruction
→ Restore clear ramp access

Other examples:

Open Drain → Cover/protect the drain

Broken Sidewalk → Repair the surface

Waterlogging → Inspect drainage and clear blockage

↓

7. Authority Dashboard

The reported problem appears on the infrastructure map and authority dashboard.

Authorities can see:

Location
Infrastructure issue
Severity
Priority score
Affected user groups
Recommended action
Current status

Issues can be managed through:

Reported → In Progress → Resolved

↓

8. Measure the Improvement

After the infrastructure is fixed, an after-photo can be uploaded.

The system compares the condition before and after the intervention.

Example:

Before: 32/100 accessibility condition

After: 86/100 accessibility condition

Improvement: +54 points

This helps answer:

Did the intervention actually improve accessibility?

Complete Example
Scenario: Blocked Wheelchair Ramp

A wheelchair user notices that the ramp outside a public building is blocked by garbage.

User uploads the photo

📷 Photo of blocked ramp

↓

Gemini Vision

Detected issue: Blocked Ramp
Severity: High
Accessibility barrier: Yes

↓

Accessibility Analysis

♿ Wheelchair Users → HIGH

👁 Visually Impaired Users → MEDIUM

👴 Elderly Users → HIGH

↓

Immediate Assistance

Verified step-free entrance: Gate B, 80m away.

↓

Priority Engine

Priority Score: 91/100

↓

Recommendation

Remove the obstruction and restore clear ramp access.

↓

Authority Dashboard

Status: Reported

↓

Authority begins work:

Status: In Progress

↓

After the Fix

Authority uploads an after-photo.

The system analyzes the new condition.

Before: 32/100
After: 86/100

↓

Final Status

RESOLVED & VERIFIED

This creates a complete loop:

DETECT → UNDERSTAND → HELP NOW → PRIORITIZE → FIX → MEASURE

Key Features
AI-powered infrastructure image analysis
Accessibility impact analysis
Three accessibility profiles
Infrastructure priority score (0–100)
Interactive infrastructure map
Authority dashboard
Recommended interventions
Verified immediate assistance
Citizen report tracking
Before-and-after impact measurement
Voice output using browser text-to-speech
Responsive web interface
Technology Stack
React + TypeScript
Vite
Gemini Vision API
JavaScript / CSS
LocalStorage
Browser Web Speech API
GitHub
Vercel
Why Our Approach Is Different

The system separates AI perception from decision-making.

Gemini Vision answers:

"What is wrong?"

Accessibility Engine answers:

"Who is affected?"

Priority Engine answers:

"What needs attention first?"

Recommendation Engine answers:

"What should be done?"

This makes the system more controlled and explainable instead of asking AI to make every decision.

Who Can Use It?
Citizens
Report infrastructure problems
Understand accessibility impact
Get verified assistance
Track report status
Authorities
View infrastructure problems
Understand affected user groups
Prioritize interventions
Manage issue status
Verify improvements
Future Scope

With more time, the platform could be extended with:

Integration with authorized municipal systems
Cloud database and authentication
Real-time weather and flooding data
IoT infrastructure monitoring
Historical infrastructure analytics
Accessible route planning
Multilingual voice assistance
Automated maintenance/work-order generation
City-wide accessibility analytics
Project Vision

Traditional infrastructure reporting asks:

"Where is the problem?"

Inclusive Infrastructure aims to go further:

"What is the problem, who is affected, what should be prioritized, what action should be taken, and did accessibility improve?"

Turning infrastructure observations into measurable accessibility improvements.
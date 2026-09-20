# Inclusive Infrastructure Intelligence

## 1. Project Overview

**Project Name:** Inclusive Infrastructure Intelligence

**Product Type:** Responsive web application

**Core Purpose:**

An AI-powered urban infrastructure intelligence platform that identifies infrastructure barriers, evaluates their impact on wheelchair users, visually impaired people, and elderly users, provides immediate assistance where verified alternatives exist, prioritizes interventions, and measures accessibility improvement after an issue is fixed.

**Core Value Proposition:**

> Turn infrastructure observations into measurable accessibility improvements.

**Core Product Loop:**

DETECT → UNDERSTAND → HELP NOW → PRIORITIZE → FIX → MEASURE

---

## 2. Problem

Urban infrastructure problems such as blocked ramps, broken sidewalks, open drains, uneven surfaces, waterlogging, damaged crossings, stairs, and blocked pathways can create serious accessibility barriers.

Existing civic reporting systems generally focus on reporting and resolution tracking. They do not necessarily provide a unified workflow that connects:

Infrastructure detection → user-specific accessibility impact → immediate assistance → intervention prioritization → recommended action → measurable before/after improvement.

---

## 3. Solution

The platform allows citizens to upload a photo of an infrastructure problem.

The system:

1. Analyzes the image using Vision AI.
2. Identifies the infrastructure issue.
3. Determines severity and AI confidence.
4. Evaluates accessibility impact for three profiles:

   * Wheelchair users
   * Visually impaired users
   * Elderly users
5. Provides immediate assistance where verified alternatives exist.
6. Calculates a deterministic infrastructure priority score.
7. Provides a controlled recommendation for intervention.
8. Sends the issue into an authority dashboard.
9. Allows authorities to mark the issue as in progress.
10. Allows an after-fix photo to be uploaded.
11. Re-analyzes the issue.
12. Shows before → after accessibility improvement.

---

## 4. Target Users

The MVP supports exactly three accessibility profiles:

### Wheelchair Users

Important factors:

* Stairs
* Missing or blocked ramps
* Uneven surfaces
* Steep slopes
* Narrow sidewalks
* Missing curb cuts
* Physical obstructions

### Visually Impaired Users

Important factors:

* Unexpected obstacles
* Open drains
* Damaged pathways
* Missing navigation cues
* Unsafe crossings
* Unexpected surface changes
* Obstructions

### Elderly Users

Important factors:

* Uneven surfaces
* Stairs
* Slopes
* Crossing safety
* Obstacles
* Difficult walking conditions
* Lack of accessible pathways

Accessibility impact must NOT be binary.

The interface should show separate impact levels for each profile.

Example:

Wheelchair — HIGH
Visual Impairment — MEDIUM
Elderly — HIGH

---

## 5. MVP Features

### Feature 1 — AI Infrastructure Scanner

Input:

* Photo
* Location
* Optional description

Possible detected issues:

* Pothole
* Broken sidewalk
* Stairs
* Missing or blocked ramp
* Obstruction
* Open drain
* Waterlogging
* Damaged crossing
* Uneven surface
* Blocked pathway

AI output should be structured.

Example:

{
"issue": "blocked_ramp",
"severity": "high",
"confidence": 0.93,
"detected_objects": [
"garbage",
"ramp",
"uneven_surface"
],
"description": "A wheelchair ramp is obstructed by accumulated garbage.",
"accessibility_barrier": true
}

---

### Feature 2 — Accessibility Profiles

User selects:

♿ Wheelchair
👁️ Visual Impairment
👴 Elderly

The same infrastructure problem may have different impacts for different profiles.

---

### Feature 3 — Infrastructure Priority Score

The priority score must be calculated by deterministic application logic.

Do NOT ask AI to invent the final score.

Conceptual formula:

Severity + Accessibility Impact + Affected Users + Location Importance + Environmental Risk

Output:

0–100 priority score.

Example:

Severity: 9/10
Accessibility: 10/10
Affected Users: 8/10
Location Importance: 8/10
Environmental Risk: 2/10

Priority: 91/100

Location importance:

High:

* Hospital
* School
* College
* Railway/Metro station
* Government building
* Public transport stop

Medium:

* Market
* Commercial area
* Residential street

Low:

* Low-footfall location

Environmental risk may initially use predefined Low/Medium/High values.

Live weather integration is optional and should not delay the MVP.

---

### Feature 4 — Infrastructure Map

Reports appear on an interactive map.

Marker categories:

High/Critical → red
Medium → orange
Low → green

Selecting a marker should show:

* Issue
* Severity
* Priority
* Accessibility impacts
* Recommendation
* Status

---

### Feature 5 — Before → After Impact

Before:

Accessibility Impact: 32/100

Wheelchair: Critical
Visual: High
Elderly: High

After:

Accessibility Impact: 86/100

Wheelchair: Low
Visual: Low
Elderly: Low

Improvement:

+54 points

Preferred workflow:

BEFORE PHOTO
→ AI ANALYSIS
→ BARRIER DETECTED
→ FIX
→ AFTER PHOTO
→ AI ANALYSIS
→ IMPACT COMPARISON

---

### Feature 6 — Voice Output

Provide a visible:

🔊 Listen to Analysis

button on analysis/result screens.

Use browser Text-to-Speech for the MVP.

Example:

"High priority infrastructure issue detected. A blocked pedestrian pathway was identified. This creates a high accessibility barrier for visually impaired users. Recommended action: remove the obstruction and restore a clear pathway."

---

### Feature 7 — Recommendation Engine

Recommendations should use controlled mappings.

Examples:

Blocked ramp → Remove obstruction and restore ramp access.

Broken sidewalk → Repair surface.

Stairs without accessible alternative → Provide step-free alternative.

Open drain → Cover or protect drain.

Waterlogging → Inspect drainage and clear blockage.

Blocked pathway → Remove obstruction.

Damaged crossing → Repair crossing infrastructure.

Uneven surface → Resurface pathway.

Do not allow the AI to freely invent infrastructure recommendations.

---

## 6. User Assistance Layer

User assistance is part of the product experience, not a separate eighth feature.

After accessibility analysis, provide immediate assistance where verified information exists.

Example:

"Blocked ramp. Critical barrier for wheelchair access.

Verified alternative:
Step-free entrance at Gate B — 80m away."

If no verified alternative exists:

"No verified alternative is currently available."

Never invent an alternative.

For the hackathon prototype, predefined/demo alternatives may be used.

---

## 7. User Flows

### Citizen Flow

Landing
→ Choose Accessibility Profile
→ Report Infrastructure Issue
→ Upload Photo
→ Confirm Location
→ AI Analysis
→ Accessibility Impact
→ Immediate Assistance
→ Priority
→ Recommended Solution
→ Listen
→ Submit Report
→ Track Status

### Authority Flow

Authority Dashboard
→ Infrastructure Map
→ Priority Issues
→ Select Issue
→ View AI Analysis
→ View Affected User Groups
→ View Recommended Action
→ Mark In Progress
→ Upload After Photo
→ AI Re-analysis
→ Before → After Impact
→ Resolve

---

## 8. Authority Workflow

The hackathon MVP uses an Authority Dashboard.

Citizen:

Report
→ AI analysis
→ Accessibility analysis
→ Priority
→ Authority Queue

Authority:

Authority Dashboard
→ Issue
→ Recommended action
→ Department
→ Status update
→ Fix
→ After photo
→ Impact verification

The MVP must NOT claim live integration with GHMC or another municipal authority.

For demonstration, authority routing can be represented within the dashboard.

Example routing:

Broken sidewalk → Municipal/Engineering

Blocked drain or waterlogging → Drainage/Sanitation

Garbage obstruction → Sanitation/Solid Waste

Road/crossing infrastructure → Roads/Engineering

---

## 9. AI Architecture

The system uses three intelligence layers.

### Layer 1 — Vision AI

Question:

WHAT IS WRONG?

Photo
→ Infrastructure detection
→ Issue type
→ Detected objects
→ Severity
→ Confidence

### Layer 2 — Accessibility Engine

Question:

WHO IS AFFECTED?

Issue
→ Deterministic rules
→ Wheelchair impact
→ Visual impairment impact
→ Elderly impact

### Layer 3 — Priority Engine

Question:

WHAT SHOULD BE FIXED FIRST?

Severity

* Accessibility Impact
* Affected Users
* Location Importance
* Environmental Risk
  → Priority 0–100

Then:

Priority
→ Recommendation Engine
→ Authority Dashboard

---

## 10. System Architecture

Conceptual architecture:

React Frontend
↓
Application Logic
↓
Supabase
↓
Database / Storage / Auth

Vision AI is accessed through a secure backend/server-side function.

Frontend must NOT expose secret AI API keys.

---

## 11. Technology Stack

### Frontend

React + Vite

### Styling

Tailwind CSS

### Backend Services

Supabase

### Database

PostgreSQL through Supabase

### File Storage

Supabase Storage

### Authentication

Supabase Auth if required by the MVP

### AI

Vision-capable AI API

### Map

Leaflet + OpenStreetMap or another simple map provider

### Voice

Browser Web Speech API / Text-to-Speech

### Version Control

Git + GitHub

### Deployment

Vercel

### Analytics

PostHog is optional and should only be added after the core application works.

### Cloudflare

Not required for the hackathon MVP.

---

## 12. Data Model

The conceptual Report object contains:

* id
* image
* location
* timestamp
* issue_type
* severity
* confidence
* wheelchair_impact
* visual_impact
* elderly_impact
* location_importance
* environmental_risk
* priority_score
* recommendation
* user_assistance
* status
* after_image
* impact_score

The implementation may normalize these into multiple Supabase tables where appropriate.

---

## 13. UI/UX Principles

The product should feel:

* Modern
* Professional
* Civic
* Trustworthy
* Accessible
* Data-driven
* Human-centered

Avoid:

* Generic chatbot appearance
* Overly futuristic neon interfaces
* Excessive animations
* Cluttered dashboards
* Unnecessary features

Accessibility requirements:

* Strong color contrast
* Readable typography
* Keyboard accessibility
* Visible focus states
* Icons combined with text
* Screen-reader-friendly labels
* Responsive layouts
* Clear error messages
* Voice output where relevant

---

## 14. Main Screens

### Citizen

1. Landing Page
2. Accessibility Profile
3. Report Issue
4. Upload Photo / Location
5. AI Analysis
6. Accessibility Impact
7. Immediate Assistance
8. Priority + Recommendation
9. Track Report

### Authority

10. Authority Dashboard
11. Infrastructure Map
12. Issue Details
13. Before → After Impact

---

## 15. MVP Scope

The MVP MUST include:

* AI photo analysis
* Three accessibility profiles
* Accessibility impact assessment
* Immediate user assistance where verified
* Deterministic priority score
* Interactive infrastructure map
* Recommendation engine
* Authority dashboard
* Issue status workflow
* Before/after impact
* Voice output
* Responsive UI
* Working deployment

---

## 16. Explicitly Out of Scope

Do NOT add these during the hackathon unless the core MVP is already working:

* Full navigation/routing system
* Live municipal API integration
* IoT sensors
* Complex GIS analysis
* Predictive infrastructure maintenance
* Social feed
* Chatbot
* Separate mobile application
* Extra accessibility categories
* Advanced predictive analytics

---

## 17. Coding Rules

The coding AI must:

1. Inspect existing files before modifying them.
2. Modify only files required for the current task.
3. Avoid rewriting unrelated working code.
4. Avoid unnecessary dependency installation.
5. Never change architecture without approval.
6. Never invent new product features without approval.
7. Never expose API secrets in frontend code.
8. Explain important changes.
9. List files changed.
10. Explain how to test the change.
11. Stop after completing the requested task.
12. Work feature-by-feature instead of generating the entire application in one step.

---

## 18. Development Workflow

Every implementation task follows:

PLAN
→ IMPLEMENT
→ RUN
→ TEST
→ DEBUG
→ VERIFY
→ COMMIT

Each feature should be completed and tested before moving to the next feature.

---

## 19. Git Workflow

Use GitHub as the source of truth for code.

Meaningful commits should be created after working features.

Example commit messages:

feat: add accessibility profile selection

feat: add infrastructure report form

feat: add AI image analysis

feat: add accessibility scoring

feat: add authority dashboard

fix: correct report submission error

Do not make huge commits containing the entire project whenever possible.

---

## 20. Testing Requirements

Test:

* Image upload
* Location selection
* AI analysis
* Accessibility scoring
* Priority calculation
* Recommendation
* Voice output
* Map
* Report submission
* Authority dashboard
* Status updates
* Before/after analysis
* Mobile responsiveness
* Invalid inputs
* Missing data
* API errors
* Loading states
* Empty states
* Accessibility
* Security

---

## 21. Security Requirements

Never expose:

* AI API keys
* Supabase service-role keys
* Database credentials
* Private secrets

Use environment variables.

Validate file uploads.

Restrict database access using appropriate Supabase security policies.

Do not trust frontend-provided priority scores.

Do not trust frontend-provided authorization roles.

Validate important data on the backend.

---

## 22. Design-to-Code Workflow

Google Stitch is the UI/UX design tool.

Stitch output becomes the visual reference.

Claude Code is the primary coding agent.

Claude Code should implement the approved design rather than redesigning it.

Flow:

Requirements
→ Stitch
→ Approved UI
→ UI/UX documentation
→ Claude Code
→ React implementation

---

## 23. AI Tool Responsibilities

### ChatGPT

Product planning, requirements, architecture reasoning, documentation, workflow guidance, troubleshooting guidance.

### Google Stitch

UI/UX design and visual screen generation.

### Claude Code

Primary coding agent, implementation, debugging, testing assistance, project inspection.

### Supabase

Database, storage, authentication, backend services.

### GitHub

Source control and project history.

### Vercel

Deployment.

### PostHog

Optional analytics after the MVP works.

### Cloudflare

Not required for MVP.

### Antigravity

Not used as the primary coding agent. Avoid using two coding agents simultaneously to reduce conflicting changes and context.

---

## 24. Current Implementation Status

Status:

PLANNING / PRE-CODING

No application code should be generated until the basic product requirements and UI direction are established.

---

## 25. Non-Negotiable Product Constraints

Do not change the core concept.

Do not remove the three target accessibility profiles.

Do not turn the product into a generic civic complaint app.

Do not turn the product into a generic AI image analyzer.

Do not turn the product into only a map.

The product must connect:

Infrastructure Detection
→ Accessibility Impact
→ Immediate Assistance
→ Prioritization
→ Recommended Intervention
→ Authority Action
→ Before/After Measurement

The core value is measurable accessibility improvement.

---

## 26. Core Demonstration Scenario

The preferred hackathon demonstration scenario is:

A wheelchair user encounters a blocked ramp near a public building.

The user:

1. Selects Wheelchair profile.
2. Uploads a photo.
3. Confirms location.
4. AI detects the blocked ramp.
5. System identifies the accessibility impact.
6. System provides verified immediate assistance if available.
7. System calculates a high priority score.
8. System recommends removing the obstruction and restoring ramp access.
9. The issue appears in the authority dashboard.
10. Authority marks it In Progress.
11. Authority uploads an after-fix photo.
12. AI analyzes the after photo.
13. System compares before and after accessibility.
14. System displays improvement.

Narrative:

PROBLEM
→ DETECTION
→ UNDERSTANDING
→ ASSISTANCE
→ PRIORITIZATION
→ INTERVENTION
→ IMPACT

---

## 27. Current Build Priority

Build in this order:

1. Project foundation
2. Landing page
3. Accessibility profile selection
4. Report form
5. Image upload
6. AI infrastructure analysis
7. Accessibility impact engine
8. Priority engine
9. Recommendation engine
10. Authority dashboard
11. Infrastructure map
12. Report status
13. Before/after analysis
14. Voice output
15. Responsive polish
16. Testing
17. Deployment

If time becomes limited, prioritize working functionality over visual perfection.

---

## 28. Golden Rule

The goal is NOT to build the largest application.

The goal is to build a convincing, functional prototype demonstrating:

> An infrastructure problem can be detected, understood from the perspective of different users, acted upon, prioritized, fixed, and measured for accessibility improvement.
 
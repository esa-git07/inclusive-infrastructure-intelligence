# UI/UX Specification — Inclusive Infrastructure Intelligence

## 1. Design Goal

The interface should communicate:

> **Infrastructure problems → Accessibility impact → Action → Measurable improvement**

The product should feel like a modern civic technology platform rather than a traditional government complaint portal.

Design priorities:

1. Clear
2. Accessible
3. Trustworthy
4. Data-driven
5. Modern
6. Fast to understand

The interface must work well for both citizens and authority users.

---

# 2. Visual Direction

## Overall Style

Use a modern, clean civic-tech dashboard aesthetic.

Characteristics:

* Minimal interface
* Spacious layouts
* Strong typography
* Rounded cards
* Clear hierarchy
* Accessible contrast
* Simple icons
* Subtle shadows
* Data visualization where useful
* Responsive design

Avoid:

* Excessive gradients
* Overly decorative UI
* Gaming-style interfaces
* Excessive animations
* Cluttered dashboards
* Tiny text
* Excessive colors

---

# 3. Color System

Use color primarily to communicate status and priority.

### Priority

* High / Critical → Red
* Medium → Orange
* Low → Green

### General UI

Use:

* Neutral background
* White or slightly contrasting cards
* Dark text
* One consistent primary accent
* Accessible contrast ratios

Do not rely only on color to communicate information.

For example:

**HIGH — 91/100**

should appear alongside the red indicator.

---

# 4. Typography

Use a modern sans-serif font.

Typography hierarchy:

### Page Title

Large and bold.

### Section Heading

Medium-large and bold.

### Card Title

Medium and semibold.

### Body

Comfortable readable size.

### Supporting Information

Smaller but still accessible.

Avoid excessively small text.

---

# 5. Accessibility Requirements

Accessibility is a core product requirement, not an optional design feature.

The interface should include:

* Strong color contrast
* Large readable text
* Clear focus states
* Keyboard-friendly interactions
* Descriptive button labels
* Icons paired with text when necessary
* Avoid color-only communication
* Clear error messages
* Large clickable controls
* Visible voice output controls

Important actions should always have text labels.

---

# 6. Application Structure

The application should contain these major areas:

```text id="1hgj7t"
Landing
│
├── Report Issue
│
├── Accessibility Profile
│
├── AI Analysis
│
├── Accessibility Impact
│
├── Immediate Assistance
│
├── Priority
│
├── Recommendation
│
├── Report Tracking
│
├── Infrastructure Map
│
└── Authority Dashboard
```

---

# 7. Landing Page

## Purpose

Introduce the product and immediately communicate its value.

### Hero Section

Headline:

**Turn Infrastructure Problems Into Measurable Accessibility Improvements.**

Supporting text:

> Detect infrastructure barriers with AI, understand who they affect, prioritize what needs attention, and measure improvement after the fix.

Primary CTA:

**Report an Issue**

Secondary CTA:

**View Infrastructure Map**

---

## Product Loop

Show the six-step product loop:

**DETECT → UNDERSTAND → HELP NOW → PRIORITIZE → FIX → MEASURE**

Use simple icons and short descriptions.

---

## Accessibility Profiles

Show the three supported profiles:

### ♿ Wheelchair

Understand barriers involving ramps, stairs, sidewalks, slopes and surface conditions.

### 👁️ Visual Impairment

Understand obstacles, crossings, navigation hazards and unexpected surface changes.

### 👴 Elderly

Understand fall risks, uneven surfaces, stairs, slopes and crossing safety.

---

# 8. Accessibility Profile Selection

Create a dedicated profile-selection interface.

Title:

**How should we analyze accessibility impact?**

Three large selectable cards:

```text id="3y6j4s"
┌─────────────────────┐
│ ♿                   │
│ Wheelchair           │
│                     │
│ Analyze wheelchair  │
│ accessibility       │
└─────────────────────┘

┌─────────────────────┐
│ 👁️                   │
│ Visual Impairment    │
│                     │
│ Analyze navigation  │
│ and obstacle risks  │
└─────────────────────┘

┌─────────────────────┐
│ 👴                   │
│ Elderly             │
│                     │
│ Analyze mobility    │
│ and fall risks      │
└─────────────────────┘
```

Selected profile should have a strong visible state.

CTA:

**Continue**

---

# 9. Report Issue Screen

Title:

**Report Infrastructure Issue**

Components:

* Photo upload area
* Camera option where supported
* Location field
* Map preview
* Optional description
* Analyze button

Primary CTA:

**Analyze Infrastructure**

Photo upload should be visually prominent.

---

# 10. AI Analysis Screen

Show the uploaded image alongside AI analysis.

Layout:

```text id="v8v4gd"
┌────────────────────┬──────────────────────┐
│                    │ AI Analysis           │
│                    │                      │
│   Uploaded Photo   │ Issue: Blocked Ramp  │
│                    │ Severity: HIGH       │
│                    │ Confidence: 93%       │
│                    │                      │
│                    │ Detected:             │
│                    │ • Ramp                │
│                    │ • Garbage             │
│                    │ • Uneven Surface      │
└────────────────────┴──────────────────────┘
```

Include:

* Issue type
* Severity
* Confidence
* Detected objects
* AI description
* Accessibility barrier indicator

---

# 11. Accessibility Impact Screen

Title:

**Who is affected?**

Display all three profiles.

Example:

```text id="1s8qk6"
♿ Wheelchair
HIGH IMPACT

The blocked ramp prevents safe step-free access.

👁️ Visual Impairment
MEDIUM IMPACT

The obstruction creates an unexpected navigation hazard.

👴 Elderly
HIGH IMPACT

The obstruction may increase mobility and fall risk.
```

The selected user profile should be visually emphasized.

Do not display accessibility as simply "accessible / inaccessible."

---

# 12. Immediate Assistance

Place this directly after accessibility impact.

Title:

**Help Now**

If verified assistance exists:

```text id="j9z2pz"
┌──────────────────────────────────────┐
│ ✓ Verified Alternative                │
│                                      │
│ Step-free entrance available         │
│ at Gate B                            │
│                                      │
│ Approximately 80m away              │
└──────────────────────────────────────┘
```

If no verified alternative exists:

```text id="w3z5ag"
No verified alternative is currently available.
```

Never display an invented route or alternative.

---

# 13. Priority Score

Show the priority score prominently.

Example:

```text id="9k0jrr"
PRIORITY

91 / 100

HIGH PRIORITY
```

Below it, show contributing factors:

* Severity
* Accessibility impact
* Affected user groups
* Location importance
* Environmental risk

Use a simple visual score indicator.

---

# 14. Recommendation

Title:

**Recommended Action**

Example:

> Remove the obstruction and restore clear ramp access.

Show:

* Recommended action
* Responsible department category
* Reason for recommendation

Example:

**Department:** Municipal / Engineering

Recommendations must come from controlled issue-to-action mappings.

---

# 15. Voice Output

Every major analysis result should include:

**🔊 Listen to Analysis**

The button should be:

* Clearly visible
* Large enough to tap
* Labeled with text
* Available on mobile

The browser reads the important result information aloud.

---

# 16. Report Confirmation

After the user submits the report:

Title:

**Report Submitted**

Display:

```text id="u3w4u2"
✓ Report Submitted

Issue:
Blocked Ramp

Priority:
91 / 100

Status:
Reported

Location:
Public Building Area
```

CTA:

**Track Report**

Secondary CTA:

**View Infrastructure Map**

---

# 17. Report Tracking

Show a simple status timeline:

```text id="d7z2tq"
✓ Reported
      │
      ↓
○ In Progress
      │
      ↓
○ Resolved
```

Display:

* Issue
* Priority
* Accessibility impact
* Recommendation
* Current status
* Before/after results when resolved

---

# 18. Infrastructure Map

The map is a major feature.

Display infrastructure issues as markers.

Priority:

* 🔴 High / Critical
* 🟠 Medium
* 🟢 Low

Selecting a marker opens a compact issue card.

Example:

```text id="n5q8t1"
Blocked Ramp

Priority: 91/100
Severity: High

Wheelchair: High
Visual: Medium
Elderly: High

Status: Reported

View Details →
```

The map should have:

* Zoom controls
* Search or location control if practical
* Priority legend
* Marker clustering if needed
* Responsive layout

For the hackathon MVP, demo/predefined map data is acceptable.

---

# 19. Authority Dashboard

The authority dashboard should be visually distinct from the citizen reporting experience.

## Dashboard Header

Title:

**Infrastructure Intelligence Dashboard**

Supporting text:

> Monitor, prioritize and measure accessibility infrastructure improvements.

---

## KPI Cards

Display:

* Total Reports
* High Priority
* In Progress
* Resolved
* Accessibility Barriers

Example:

```text id="x4y9q1"
┌────────────┐ ┌────────────┐ ┌────────────┐
│ 128        │ │ 24         │ │ 18         │
│ Reports    │ │ High       │ │ In Progress│
└────────────┘ └────────────┘ └────────────┘
```

---

# 20. Priority Issue List

Show the highest-priority infrastructure problems.

Each issue card should include:

* Issue type
* Location
* Priority
* Severity
* Affected profiles
* Status

Example:

**Blocked Ramp — Public Building**

**91/100 — HIGH**

♿ High | 👁️ Medium | 👴 High

**Reported**

**View Issue →**

---

# 21. Authority Issue Detail

When an authority selects an issue, show:

### Issue

Blocked Ramp

### AI Analysis

* Severity
* Confidence
* Detected objects
* Description

### Accessibility Impact

Wheelchair — High

Visual Impairment — Medium

Elderly — High

### Priority

91 / 100

### Recommendation

Remove obstruction and restore ramp access.

### Status

Reported

Buttons:

**Mark In Progress**

**Resolve Issue**

---

# 22. Before → After Screen

This is a major demonstration screen.

Show two large panels:

```text id="9yrt2f"
BEFORE                         AFTER

[Before Photo]                [After Photo]

Accessibility                 Accessibility
Impact                        Impact

32 / 100                      86 / 100

             +54
        IMPROVEMENT
```

Use a clear visual comparison.

The improvement value should be easy to understand.

Preferred workflow:

**Before Photo → AI Analysis → Fix → After Photo → AI Re-analysis → Impact Comparison**

---

# 23. Navigation

Use a simple navigation structure.

Suggested navigation:

```text id="5f4y0d"
Logo

Report Issue
Map
Track Reports

Authority Dashboard

Profile / Settings
```

Keep navigation minimal.

On smaller screens, use a mobile-friendly menu or bottom navigation where appropriate.

---

# 24. Responsive Design

The application must work across:

* Desktop
* Tablet
* Mobile

Desktop:

* Two-column layouts where appropriate
* Dashboard side navigation
* Large map

Mobile:

* Single-column layouts
* Large buttons
* Stacked cards
* Simplified navigation
* Touch-friendly controls

---

# 25. Important Interaction Principles

### Progressive Disclosure

Do not show every technical detail immediately.

Primary information first:

**What happened?**

Then:

**Who is affected?**

Then:

**What can be done?**

Then:

**How urgent is it?**

Then:

**What should authorities do?**

---

### Clear Feedback

Every important action should produce visible feedback.

Examples:

* Upload successful
* Analysis in progress
* Analysis complete
* Report submitted
* Status changed
* After-photo analyzed
* Issue resolved

---

### Loading State

AI analysis should have a clear loading state.

Example:

**Analyzing infrastructure...**

Possible supporting steps:

```text
✓ Reading image
✓ Detecting infrastructure
○ Evaluating accessibility
○ Calculating priority
```

Do not make the interface appear frozen during AI processing.

---

# 26. Demo-First UX

The primary hackathon demo should be optimized around this sequence:

```text id="0r3x0b"
Choose Wheelchair
        ↓
Upload Blocked Ramp Photo
        ↓
AI Analysis
        ↓
Accessibility Impact
        ↓
Verified Assistance
        ↓
Priority 91/100
        ↓
Recommended Fix
        ↓
Authority Dashboard
        ↓
Mark In Progress
        ↓
Upload After Photo
        ↓
Before → After
        ↓
+54 Accessibility Improvement
```

The interface should make this journey extremely easy to demonstrate.

---

# 27. Design Constraints

Do not add features outside the approved MVP.

Do not add:

* Social feed
* Chatbot
* Full navigation system
* IoT dashboard
* Predictive maintenance
* Additional accessibility profiles
* Complex GIS tools
* Live municipal integration

The UI should focus on the core product loop:

**DETECT → UNDERSTAND → HELP NOW → PRIORITIZE → FIX → MEASURE**

---

# 28. Stitch Design Instruction

The design should generate a coherent multi-screen application rather than isolated unrelated screens.

Required screens:

1. Landing Page
2. Accessibility Profile Selection
3. Report Issue
4. AI Analysis
5. Accessibility Impact
6. Immediate Assistance
7. Priority & Recommendation
8. Report Confirmation / Tracking
9. Infrastructure Map
10. Authority Dashboard
11. Authority Issue Detail
12. Before → After Impact

Maintain the same:

* Typography
* Color system
* Spacing
* Components
* Buttons
* Cards
* Icons
* Navigation
* Visual language

across all screens.

The design should feel like one complete product.

---

# 29. Primary Design Message

The interface should make the following story obvious within seconds:

> **We don't just detect infrastructure problems. We understand who they affect, help people immediately, prioritize what should be fixed, and measure whether the fix actually improved accessibility.**

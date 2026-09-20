# User Flows — Inclusive Infrastructure Intelligence

## 1. Overview

Inclusive Infrastructure Intelligence has two primary user journeys:

1. **Citizen Journey** — report and understand an infrastructure barrier.
2. **Authority Journey** — review, prioritize, act on, and verify infrastructure improvements.

The complete product loop is:

**DETECT → UNDERSTAND → HELP NOW → PRIORITIZE → FIX → MEASURE**

---

# 2. Citizen User Flow

## Flow 1 — Report an Infrastructure Issue

```text
Landing Page
      ↓
Choose Accessibility Profile
      ↓
Report Infrastructure Issue
      ↓
Upload / Capture Photo
      ↓
Confirm Location
      ↓
AI Infrastructure Analysis
      ↓
Accessibility Impact Analysis
      ↓
Immediate Assistance
      ↓
Priority Score
      ↓
Recommended Solution
      ↓
Listen to Analysis
      ↓
Submit Report
      ↓
Track Report Status
```

### Step 1 — Landing Page

The user sees:

* Product name
* Short explanation of the platform
* Primary CTA: **Report an Issue**
* Secondary CTA: **View Infrastructure Map**
* Accessibility profile selection

---

### Step 2 — Choose Accessibility Profile

The user selects exactly one primary profile:

* ♿ Wheelchair
* 👁️ Visual Impairment
* 👴 Elderly

The selected profile determines how the detected infrastructure issue is explained.

Example:

**Issue:** Broken sidewalk

Wheelchair:

> High impact because the uneven surface may prevent safe wheelchair movement.

Visual Impairment:

> Medium impact because the unexpected surface change may create a navigation hazard.

Elderly:

> High impact because the uneven surface increases fall risk.

---

### Step 3 — Report Infrastructure Issue

The user selects:

**Report Infrastructure Issue**

The system asks for:

* Photo
* Location
* Optional description

The user can upload an existing image or capture one using the device camera if supported.

---

### Step 4 — Confirm Location

The user confirms where the issue was detected.

Location can be:

* Browser/device location
* Selected location on map
* Manually entered location

For the MVP, location can also use predefined/demo locations if required.

---

### Step 5 — AI Infrastructure Analysis

The uploaded image is analyzed by the Vision AI layer.

The system identifies:

* Infrastructure issue
* Severity
* Confidence
* Detected objects/conditions
* Description
* Accessibility barrier status

Example:

```text
Issue: Blocked Ramp

Severity: High

Confidence: 93%

Detected:
• Ramp
• Garbage
• Uneven surface

Accessibility Barrier:
Yes
```

---

# 3. Accessibility Impact Flow

After infrastructure detection:

```text
Detected Issue
      ↓
Accessibility Engine
      ↓
 ┌─────────────┬─────────────┬─────────────┐
 ↓             ↓             ↓
Wheelchair    Visual       Elderly
Impact        Impact       Impact
```

The system evaluates the issue separately for each accessibility profile.

The interface must avoid treating accessibility as simply:

**Accessible / Not Accessible**

Instead, display an impact level:

* Low
* Medium
* High
* Critical

Example:

```text
Accessibility Impact

♿ Wheelchair       HIGH
👁️ Visual          MEDIUM
👴 Elderly         HIGH
```

The selected user profile receives the most prominent explanation.

---

# 4. Immediate Assistance Flow

After accessibility analysis:

```text
Accessibility Impact
        ↓
Check Verified Alternatives
        ↓
 ┌───────────────────────┐
 │ Alternative Available │
 └───────────┬───────────┘
             ↓
      Show Assistance
```

Example:

> The ramp is currently blocked.
>
> **Verified alternative:** Step-free entrance at Gate B, approximately 80m away.

If no verified alternative exists:

> No verified alternative is currently available.

The system must **never invent an accessibility alternative**.

For the MVP, verified alternatives can come from predefined/demo data.

---

# 5. Priority Flow

After accessibility analysis:

```text
Severity
   +
Accessibility Impact
   +
Affected Users
   +
Location Importance
   +
Environmental Risk
   ↓
Priority Engine
   ↓
Priority Score: 0–100
```

Example:

```text
Priority Score

91 / 100

HIGH PRIORITY
```

The score is calculated by deterministic application logic.

AI should not generate the final priority score.

---

# 6. Recommendation Flow

The system maps the detected issue to a controlled recommendation.

Examples:

| Detected Issue                        | Recommended Action                         |
| ------------------------------------- | ------------------------------------------ |
| Blocked ramp                          | Remove obstruction and restore ramp access |
| Broken sidewalk                       | Repair damaged surface                     |
| Stairs without accessible alternative | Provide a step-free alternative            |
| Open drain                            | Cover/protect the drain                    |
| Waterlogging                          | Inspect drainage and clear blockage        |
| Blocked pathway                       | Remove obstruction                         |
| Damaged crossing                      | Repair crossing infrastructure             |
| Uneven surface                        | Resurface pathway                          |

The recommendation should be practical and directly connected to the detected issue.

---

# 7. Voice Output Flow

The result screen contains:

**🔊 Listen to Analysis**

When selected, the browser reads the important result information aloud.

Example:

> "A blocked wheelchair ramp was detected. The issue has high severity and creates a high accessibility impact for wheelchair users. The recommended action is to remove the obstruction and restore ramp access."

Voice output is provided using browser text-to-speech for the MVP.

---

# 8. Submit Report Flow

After reviewing the result:

```text
AI Analysis
      ↓
Accessibility Impact
      ↓
Assistance
      ↓
Priority
      ↓
Recommendation
      ↓
Submit Report
```

The report stores:

* Photo
* Location
* Issue type
* Severity
* AI confidence
* Accessibility impacts
* Priority score
* Recommendation
* Status
* Timestamp

Initial status:

**Reported**

---

# 9. Citizen Tracking Flow

After submission:

```text
Report Submitted
      ↓
Reported
      ↓
In Progress
      ↓
Resolved
```

The citizen can view:

* Issue
* Location
* Priority
* Accessibility impact
* Current status
* Recommended action
* Before/after improvement when resolved

---

# 10. Authority User Flow

## Flow 2 — Review and Resolve Infrastructure Issues

```text
Authority Dashboard
       ↓
Infrastructure Map
       ↓
Priority Issues
       ↓
Select Issue
       ↓
View AI Analysis
       ↓
View Accessibility Impact
       ↓
View Recommendation
       ↓
Mark In Progress
       ↓
Fix Infrastructure
       ↓
Upload After Photo
       ↓
AI Re-analysis
       ↓
Before → After Comparison
       ↓
Resolve Issue
```

---

# 11. Authority Dashboard

The dashboard provides an overview of infrastructure issues.

Important information:

* Total reports
* High-priority issues
* Issues in progress
* Resolved issues
* Accessibility barriers
* Infrastructure map

The dashboard should make priority issues immediately visible.

---

# 12. Infrastructure Map Flow

The authority can open:

**Infrastructure Map**

Each report appears as a map marker.

Marker priority colors:

* 🔴 High / Critical
* 🟠 Medium
* 🟢 Low

Selecting a marker opens:

```text
Issue
Severity
Priority Score
Location
Accessibility Impact
Recommendation
Status
```

---

# 13. Authority Issue Detail Flow

When an authority selects an issue:

```text
Issue Details
      ↓
AI Analysis
      ↓
Accessibility Impact
      ↓
Priority Score
      ↓
Recommended Action
      ↓
Status
```

Example:

```text
Blocked Ramp

Severity: High
Priority: 91/100

Accessibility Impact:
Wheelchair: HIGH
Visual: MEDIUM
Elderly: HIGH

Recommended Action:
Remove obstruction and restore ramp access.

Status:
Reported
```

---

# 14. Status Update Flow

Authority can change:

**Reported → In Progress → Resolved**

When an issue is marked **In Progress**, the system records the status change.

When resolving an issue, the preferred workflow is:

```text
Fix Infrastructure
      ↓
Upload After Photo
      ↓
AI Re-analysis
      ↓
Compare Before / After
      ↓
Resolve
```

---

# 15. Before → After Impact Flow

The system compares the infrastructure condition before and after intervention.

```text
BEFORE
Photo
  ↓
AI Analysis
  ↓
Accessibility Impact
32 / 100

       FIX

AFTER
Photo
  ↓
AI Re-analysis
  ↓
Accessibility Impact
86 / 100

Improvement:
+54 points
```

The interface should visually emphasize:

**Before → After → Improvement**

This demonstrates that the platform measures the effect of an intervention rather than only collecting reports.

---

# 16. Core Demo Flow

The primary hackathon demonstration uses a blocked wheelchair ramp near a public building.

```text
1. Select Wheelchair Profile
             ↓
2. Upload Ramp Photo
             ↓
3. Confirm Location
             ↓
4. AI Detects Blocked Ramp
             ↓
5. Accessibility Impact Shown
             ↓
6. Verified Assistance Shown
             ↓
7. Priority Score Generated
             ↓
8. Recommended Fix Shown
             ↓
9. Report Appears on Authority Dashboard
             ↓
10. Authority Marks In Progress
             ↓
11. Authority Uploads After Photo
             ↓
12. AI Re-analyzes
             ↓
13. Before → After Impact Shown
             ↓
14. Issue Resolved
```

---

# 17. End-to-End Product Loop

The complete system connects citizen reporting and authority action:

```text
                    DETECT
                      ↓
              AI Infrastructure
                  Analysis
                      ↓
                  UNDERSTAND
                      ↓
            Accessibility Engine
                      ↓
                  HELP NOW
                      ↓
             Verified Assistance
                      ↓
                 PRIORITIZE
                      ↓
               Priority Engine
                      ↓
                    FIX
                      ↓
             Authority Workflow
                      ↓
                  MEASURE
                      ↓
             Before → After Impact
                      ↓
                 Accessibility
                  Improvement
```

The product therefore moves beyond simply reporting an infrastructure problem.

Its core purpose is to connect:

**Problem → Impact → Assistance → Priority → Intervention → Measurable Improvement**

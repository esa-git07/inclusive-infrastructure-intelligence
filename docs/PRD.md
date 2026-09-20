# Product Requirements Document

## 1. Product

**Name:** Inclusive Infrastructure Intelligence

**Type:** Responsive web application

**Purpose:**
Transform urban infrastructure observations into actionable accessibility intelligence.

---

## 2. Problem Statement

People with different accessibility needs can experience the same infrastructure problem differently.

A blocked ramp, broken sidewalk, open drain, uneven surface, or damaged crossing may create a minor inconvenience for one person but a serious accessibility barrier for another.

Traditional infrastructure reporting generally focuses on identifying and resolving an issue. This product adds a user-specific accessibility layer that explains who is affected, provides immediate assistance where verified alternatives exist, prioritizes the issue, recommends an intervention, and measures improvement after the fix.

---

## 3. Target Users

### Primary Citizen Users

The MVP supports exactly three profiles:

1. Wheelchair users
2. Visually impaired users
3. Elderly users

### Authority Users

Municipal/administrative personnel who need to:

* View infrastructure issues
* Understand accessibility impact
* Prioritize issues
* Take action
* Track status
* Verify improvements

The prototype represents this through an Authority Dashboard.

---

## 4. Product Goal

The product should answer four questions:

### 1. What is wrong?

AI analyzes the infrastructure image.

### 2. Who is affected?

The accessibility engine evaluates the issue for:

* Wheelchair users
* Visually impaired users
* Elderly users

### 3. What should happen first?

The priority engine calculates a score from 0–100.

### 4. Did the situation improve?

A before/after workflow measures accessibility improvement after the issue is fixed.

---

## 5. Core Product Loop

DETECT
→ UNDERSTAND
→ HELP NOW
→ PRIORITIZE
→ FIX
→ MEASURE

---

# 6. MVP Features

## F1 — AI Infrastructure Scanner

### Description

Allow users to upload a photo of an infrastructure problem.

### Inputs

* Image
* Location
* Optional description

### Possible detections

* Pothole
* Broken sidewalk
* Stairs
* Blocked/missing ramp
* Obstruction
* Open drain
* Waterlogging
* Damaged crossing
* Uneven surface
* Blocked pathway

### Outputs

* Issue type
* Severity
* AI confidence
* Detected objects/conditions
* Description
* Accessibility barrier indicator

---

## F2 — Accessibility Profile

Allow the user to select:

* Wheelchair
* Visual Impairment
* Elderly

The selected profile should influence how the infrastructure problem is explained and assessed.

The system should still be able to display all three impact assessments when appropriate.

---

## F3 — Accessibility Impact

Display profile-specific impact.

Example:

Wheelchair — Critical
Visual Impairment — Medium
Elderly — High

Impact must be generated using deterministic application rules rather than relying entirely on AI.

---

## F4 — Priority Score

Calculate a 0–100 infrastructure priority score.

Inputs:

* Severity
* Accessibility impact
* Number of affected user groups
* Location importance
* Environmental risk

Example:

91 / 100

The score must be deterministic and reproducible.

---

## F5 — Immediate Assistance

After identifying an accessibility barrier, provide immediate assistance where verified information exists.

Example:

"Step-free entrance available at Gate B — 80m away."

If no verified alternative exists:

"No verified alternative is currently available."

The system must never invent an alternative.

---

## F6 — Recommendation Engine

Provide a controlled recommended intervention based on the issue.

Examples:

Blocked ramp
→ Remove obstruction and restore ramp access.

Broken sidewalk
→ Repair surface.

Open drain
→ Cover or protect drain.

Waterlogging
→ Inspect drainage and clear blockage.

Blocked pathway
→ Remove obstruction.

---

## F7 — Infrastructure Map

Display reported infrastructure issues on an interactive map.

Markers should communicate priority:

High/Critical → Red
Medium → Orange
Low → Green

Selecting a marker displays issue details.

---

## F8 — Authority Dashboard

Authorities should be able to:

* View total issues
* View high-priority issues
* View infrastructure map
* Open an issue
* See AI analysis
* See accessibility impact
* See priority
* See recommendation
* See responsible department
* Change status
* Upload an after-fix photo

---

## F9 — Before/After Impact

Compare the infrastructure condition before and after intervention.

Example:

Before:

Accessibility Impact
32 / 100

After:

Accessibility Impact
86 / 100

Improvement:

+54 points

Preferred workflow:

Before Photo
→ AI Analysis
→ Fix
→ After Photo
→ AI Analysis
→ Impact Comparison

---

## F10 — Voice Output

Provide a visible "Listen to Analysis" button.

Use browser text-to-speech for the MVP.

The spoken output should summarize:

* Issue
* Severity
* Accessibility impact
* Recommended action

---

# 7. User Journey

## Citizen

Landing Page
→ Accessibility Profile
→ Report Issue
→ Upload Photo
→ Location
→ AI Analysis
→ Accessibility Impact
→ Immediate Assistance
→ Priority
→ Recommendation
→ Voice Output
→ Submit
→ Track Status

## Authority

Dashboard
→ Map / Priority Queue
→ Select Issue
→ Review Analysis
→ Review Accessibility Impact
→ Review Recommendation
→ Mark In Progress
→ Upload After Photo
→ AI Re-analysis
→ Before/After Impact
→ Resolve

---

# 8. Functional Requirements

### FR1 — Image Upload

The user must be able to upload an infrastructure image.

### FR2 — Image Analysis

The application must send the image to a Vision AI service and receive structured analysis.

### FR3 — Accessibility Analysis

The application must evaluate the detected issue for all three accessibility profiles.

### FR4 — Priority Calculation

The application must calculate a deterministic priority score.

### FR5 — Recommendations

The application must provide a recommendation based on the detected issue.

### FR6 — Assistance

The application must display verified alternative assistance where available.

### FR7 — Report Storage

Reports must be stored in the backend.

### FR8 — Map

Reports must be represented geographically.

### FR9 — Authority Management

Authority users must be able to view and update report status.

### FR10 — Before/After

Authorities must be able to submit an after-fix image and compare the result.

### FR11 — Voice

Users must be able to listen to the analysis.

### FR12 — Responsive Design

The application must work on desktop, tablet, and mobile screens.

---

# 9. Non-Functional Requirements

## Performance

The application should provide clear loading states during AI processing.

## Accessibility

The UI should support:

* Keyboard navigation
* Clear labels
* Good contrast
* Screen-reader-friendly controls
* Visible focus states
* Responsive layouts
* Voice output

## Security

* Secrets must remain server-side.
* API keys must not be exposed in frontend code.
* File uploads must be validated.
* Database access must be protected.
* Users must only receive permissions appropriate to their role.

## Reliability

Errors should be handled gracefully.

Example:

"Unable to analyze image. Please try again."

Do not display raw technical errors to users.

---

# 10. MVP Boundaries

## Included

* AI image analysis
* Three accessibility profiles
* Accessibility impact
* Immediate assistance
* Priority scoring
* Recommendations
* Map
* Authority dashboard
* Status workflow
* Before/after comparison
* Voice output
* Responsive UI
* Deployment

## Excluded

* Full navigation system
* Live municipal API integration
* IoT sensors
* Complex GIS
* Predictive maintenance
* Social feed
* Chatbot
* Native mobile application
* Additional accessibility categories

---

# 11. Success Criteria

The prototype is successful if a judge can see the following complete story:

1. A user selects an accessibility profile.
2. The user uploads an infrastructure photo.
3. AI identifies the infrastructure issue.
4. The system explains its accessibility impact.
5. The system provides assistance if verified information exists.
6. The system calculates a priority score.
7. The system recommends an intervention.
8. The issue appears in the authority dashboard/map.
9. The authority changes its status.
10. An after-fix image can be submitted.
11. The system demonstrates before/after improvement.
12. The user can listen to the analysis.

The core demonstration should be understandable without technical explanation.

---

# 12. Product Constraints

The application must remain focused on accessibility-aware infrastructure intelligence.

It must not become:

* A generic complaint portal
* A generic image-recognition application
* A generic map
* A generic AI chatbot

The central relationship must remain:

Infrastructure Problem
→ Accessibility Impact
→ Assistance
→ Priority
→ Intervention
→ Measured Improvement

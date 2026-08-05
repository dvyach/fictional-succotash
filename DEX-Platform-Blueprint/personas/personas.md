# AetherDEX Personas — Session 1

**Authority:** Principal Product Manager · Digital Workplace Architect  
**Referenced by:** Volumes 1A–1E

---

## Persona Model

Personas are jobs-to-be-done oriented. Each persona has:

- Primary outcomes
- Decision cadence
- Preferred surfaces (Session 1)
- Frustration triggers
- Success signals

---

## P1 — Avery Chen · Chief Digital Officer / CIO

| Attribute | Detail |
|-----------|--------|
| Role | CDO / CIO |
| Org size | 15,000–80,000 employees |
| Decision cadence | Weekly exec review; quarterly board pack |
| Primary outcome | Prove digital workplace ROI; reduce experience risk |
| Session 1 surfaces | Executive DEX Index, Experience Heatmap, Investment ROI |
| Frustration | Fragmented vendor dashboards; no single experience score |
| Success signal | One narrative: score → drivers → actions → outcome |

**Jobs**

1. Answer “Are employees having a good digital day?” in under 60 seconds.  
2. Compare regions and business units on a comparable index.  
3. Link experience degradation to revenue or productivity risk.  
4. Brief the board with trend + confidence, not raw telemetry.

---

## P2 — Jordan Hale · Head of Digital Workplace / DEX Lead

| Attribute | Detail |
|-----------|--------|
| Role | Digital Workplace / DEX Program Lead |
| Decision cadence | Daily standup; weekly program board |
| Primary outcome | Improve Digital Experience Index; prioritize interventions |
| Session 1 surfaces | Experience Overview, Journey Quality, Sentiment, Endpoint + App cross-links |
| Frustration | Symptom-only tickets; no cross-domain correlation |
| Success signal | Closed-loop: insight → change → score lift |

**Jobs**

1. Identify top experience drivers this week.  
2. Segment by location type (office / hybrid / remote).  
3. Coordinate endpoint and app owners with shared evidence.  
4. Track initiative impact against baseline DEX score.

---

## P3 — Morgan Blake · Endpoint Engineering Manager

| Attribute | Detail |
|-----------|--------|
| Role | Endpoint / Desktop Engineering |
| Decision cadence | Near-real-time for incidents; daily fleet review |
| Primary outcome | Stable, performant, compliant fleet |
| Session 1 surfaces | Endpoint Health, Stability, Hardware Lifecycle, Boot/Login |
| Frustration | Mean-looking averages that hide long-tail pain |
| Success signal | Reduced crash rate, boot time P95, battery / disk risk |

**Jobs**

1. Find devices and cohorts below performance SLOs.  
2. Prioritize hardware refresh by experience impact, not age alone.  
3. Correlate OS / driver / image changes to regressions.  
4. Drill device → process → event without tool hopping.

---

## P4 — Riley Okonkwo · Application Experience Owner

| Attribute | Detail |
|-----------|--------|
| Role | Business application / SaaS owner (e.g., collaboration suite) |
| Decision cadence | Continuous for critical apps; weekly for portfolio |
| Primary outcome | Reliable app experience for assigned portfolio |
| Session 1 surfaces | Application Portfolio, App Detail, Dependency Map, Adoption |
| Frustration | APM that ignores client-side and endpoint context |
| Success signal | Lower frustration events; faster time-to-interactive; higher adoption of healthy versions |

**Jobs**

1. Rank apps by employee impact, not just error rate.  
2. Separate network vs endpoint vs app-tier causation.  
3. Track version rollouts against experience.  
4. Trigger investigation with shared timeline evidence.

---

## P5 — Sam Rivera · IT Operations / Command Center Lead

| Attribute | Detail |
|-----------|--------|
| Role | IT Ops / Service Operations |
| Decision cadence | Real-time shift |
| Primary outcome | Detect, triage, and contain experience-impacting incidents |
| Session 1 surfaces | Executive Alerts (read), Experience Alerts, Endpoint Alerts, App Alerts |
| Frustration | Alert storms without impact radius |
| Success signal | Fewer false positives; clear blast radius; faster MTTR |

**Jobs**

1. See active experience incidents ranked by employee impact.  
2. Cross-filter alerts to region / BU / app.  
3. Hand off to investigation with preserved filter context.  
4. Validate recovery via score rebound, not ticket closure alone.

---

## P6 — Quinn Patel · People Experience / HR Digital Partner (Secondary)

| Attribute | Detail |
|-----------|--------|
| Role | HR / Employee Experience partner |
| Decision cadence | Monthly pulse; quarterly planning |
| Primary outcome | Connect sentiment to digital friction |
| Session 1 surfaces | Sentiment & Voice of Employee, Journey Quality |
| Frustration | Survey data disconnected from telemetry |
| Success signal | Actionable themes with technical owners assigned |

---

## P7 — Casey Nguyen · Site Reliability / Platform Engineer (Secondary)

| Attribute | Detail |
|-----------|--------|
| Role | Platform / SRE supporting internal SaaS |
| Decision cadence | Continuous |
| Primary outcome | Reduce client-visible regressions |
| Session 1 surfaces | Application Detail, Dependencies |
| Frustration | Server green while clients red |
| Success signal | Client SLOs aligned with backend SLOs |

---

## Persona → Dashboard Matrix (Session 1)

| Dashboard | P1 | P2 | P3 | P4 | P5 | P6 | P7 |
|-----------|----|----|----|----|----|----|----|
| Executive DEX Index | ● | ● | ○ | ○ | ○ | ○ | — |
| Executive Risk & Investment | ● | ● | — | — | ○ | ○ | — |
| Experience Overview | ○ | ● | ○ | ○ | ● | ○ | — |
| Journey & Sentiment | ○ | ● | — | ○ | ○ | ● | — |
| Endpoint Fleet Health | — | ● | ● | ○ | ● | — | ○ |
| Endpoint Stability & Lifecycle | — | ○ | ● | — | ● | — | — |
| Application Portfolio | ○ | ● | ○ | ● | ● | — | ● |
| Application Detail | — | ○ | ○ | ● | ● | — | ● |

● Primary · ○ Secondary · — Rare

---

## Permission Tiers (Session 1 Seed)

| Tier | Code | Typical personas |
|------|------|------------------|
| Executive Viewer | `role.exec_viewer` | P1 |
| DEX Analyst | `role.dex_analyst` | P2, P6 |
| Endpoint Operator | `role.endpoint_ops` | P3, P5 |
| App Owner | `role.app_owner` | P4, P7 |
| Platform Admin | `role.platform_admin` | Platform team |

Row-level security scopes: Enterprise → Region → Country → Business Unit → Department. Employee-identifying fields require `pii.employee_view` entitlement.

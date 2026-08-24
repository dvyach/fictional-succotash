# Volume 2B — Operations Center

**Product:** AetherDEX  
**Session:** 2  
**Depends on:** Session 1 · Volume 2A · [IA S2](../../navigation/information-architecture-session-2.md) · [Metrics S2](../../metrics/metric-catalog-session-2.md)  
**Mockups:** [`mockups/operations/`](../../mockups/operations/)  
**Widget prefix:** `w-ops-*`

---

# Document Control

| Version | Status |
|---------|--------|
| 2.0.0 | Complete |

Operations is impact-first: every alert, incident, and automation is ranked by **employee / business impact radius**, not raw event volume.

---

# Shared Operations Framework

## Roles & Permissions

| Role | Capabilities |
|------|----------------|
| `role.ops_viewer` | Read command center, SLAs, aggregates |
| `role.ops_responder` | Ack alerts, update incidents, join war rooms |
| `role.ops_commander` | Major incident command, broadcast comms |
| `role.automation_operator` | Queue/approve automations & remote actions |
| `role.platform_admin` | Policy, noise thresholds, integrations |

## Shared Behaviors

| Concern | Spec |
|---------|------|
| Cross-filtering | Status wall ↔ timeline ↔ alert feed ↔ impact |
| Timeline | Multi-track; change markers; brush sets global time |
| Alert handling | Dedup, enrich with AI, impact rank, ack/snooze/page |
| Export | CSV/PDF; war-room notes; audited |
| Keyboard | `G A` alerts, `G I` incidents, `?` shortcuts, `Esc` clear |
| a11y | Live regions polite for feeds; assertive for Sev1 |

## Widget Registry — Operations

| ID | Name |
|----|------|
| `w-ops-availability` | System Availability KPI |
| `w-ops-open-incidents` | Open Incidents KPI |
| `w-ops-mtta` / `w-ops-mttr` | MTTA / MTTR KPIs |
| `w-ops-biz-impact` | Business Impact KPI |
| `w-ops-status-wall` | Status Wall |
| `w-ops-incident-timeline` | Incident Timeline |
| `w-ops-alert-feed` | Alert Feed (extends Session 1) |
| `w-ops-automation-queue` | Automation Queue |
| `w-ops-incident-table` | Incident Queue Table |
| `w-ops-problem-table` | Problem Table |
| `w-ops-major-timeline` | Major Incident Timeline |
| `w-ops-war-room` | War Room Participants |
| `w-ops-noise-ratio` | Alert Noise KPI |
| `w-ops-ticket-volume` | Ticket Volume KPI |
| `w-ops-deflection` | Deflection KPI |
| `w-ops-automation-success` | Automation Success KPI |
| `w-ops-workflow-board` | Workflow Board |
| `w-ops-remote-actions` | Remote Actions Table |
| `w-ops-sla-attainment` | SLA Attainment KPI |
| `w-ops-sla-table` | Service SLA Table |
| `w-ops-capacity-hotspots` | Capacity Hotspots |
| `w-ops-change-table` | Change Table |
| `w-ops-release-table` | Release Health Table |
| `w-ops-ai-assist` | Ops AI Assist Cards |

---

# Part A — Enterprise Operations Command Center (NOC)

**Route:** `/app/operations/command-center` · **ID:** `ops.command`  
**Mockups:** `ops-command-{1920|1440}-{dark|light}.svg`

### Purpose
Live NOC wall: availability, incidents, impact, automation queue, status of critical services, timeline, and ranked alerts.

### Audience
P5 Ops lead, shift commanders, executives (read-only wall mode).

### Business Questions
Are we green? What is burning? Who is impacted? What is automating? What needs a human?

### KPIs
`m.ops.system_availability_pct`, `m.ops.open_incidents`, `m.ops.mtta_minutes`, `m.ops.business_impact_score`, `m.ops.automation_queue_depth`.

### Layout
KPI×5 → Status Wall (6) + Incident Timeline/Alert Feed (6). Ultra-wide wall mode hides toolbar; 60s auto-refresh.

### Widgets
Status Wall, Incident Timeline, Alert Feed, Automation Queue, Risk/Impact indicators, SLA strip optional.

### Interactions
Click service → filter incidents/alerts · Double-click → Investigate · `F` focus feed.

### AI / Actions
Auto-suggest major promotion; recommend automation; open bridge.

### Engineering
SSE preferred for wall; fallback poll 15s; `GET /api/v1/ops/command-center`.

---

# Part B — Incident Dashboard

**Route:** `/app/operations/incidents` · **Mockups:** `ops-incidents-*`

Purpose: Manage incident lifecycle with impact ranking.  
Audience: Responders, commanders.  
KPIs: open, MTTR, MTTA, Sev1 active.  
Widgets: Incident table, AI actions panel.  
Filters: severity, owner, service, AI-enriched.  
Drilldowns: Incident → Investigate Incident · Major promote.  
Permissions: update requires `ops_responder+`.  
Export: CSV + evidence pack link.  
Keyboard: `N` new (ITSM), `A` assign, `/` search.

---

# Part C — Problem Dashboard

**Route:** `/app/operations/problems` · **Mockups:** `ops-problems-*`

Purpose: Structural problem / known-error management linked to recurring incidents.  
KPIs: open problems, linked incidents, known errors, avg age.  
Widgets: Problem table, AI theme clusters.  
Actions: Link incidents, publish workaround, schedule review board.

---

# Part D — Major Incident Dashboard

**Route:** `/app/operations/major-incidents` · **Mockups:** `ops-major-*`

Purpose: War-room grade major incident command with business impact and comms.  
KPIs: active major, employees impacted, war room live, comms sent.  
Widgets: Major timeline, business impact panel, participants.  
Actions: Broadcast, page, mitigate automation, resolve/demote.  
Timeline behavior: T+ clocks; immutable after close.

---

# Part E — Alert Center

**Route:** `/app/operations/alerts` · **Mockups:** `ops-alerts-*`

Purpose: Impact-ranked alert management with noise control.  
KPIs: high-impact active, noise ratio, flapping, alert MTTR.  
Widgets: Feed, policy summary.  
Alert handling: ack, snooze, suppress flap, page, open investigation.  
Cross-filter with Command Center.

---

# Part F — Service Desk Analytics

**Route:** `/app/operations/service-desk` · **Mockups:** `ops-servicedesk-*`

Purpose: Ticket volume, deflection, FCR, CSAT linked to DEX themes.  
KPIs: `m.ops.ticket_volume`, `m.ops.deflection_pct`, FCR, CSAT.  
Widgets: Category bars, AI deflection opportunities.  
Deep link: categories → Experience sentiment themes / infra.

---

# Part G — Automation Dashboard

**Route:** `/app/operations/automation` · **Mockups:** `ops-automation-*`

Purpose: Queue, success, guardrails for automations that remediate experience issues.  
KPIs: `m.ops.automation_success_pct`, queue depth, failures, hours saved.  
Widgets: Queue table, guardrail panel.  
Permissions: `automation_operator`; change window enforced.

---

# Part H — Workflow Dashboard

**Route:** `/app/operations/workflows` · **Mockups:** `ops-workflows-*`

Purpose: IT process workflows (access, patch, refresh, major comms) with bottleneck detection.  
KPIs: active workflows, breached steps, cycle time, bot-assisted %.  
Widgets: Critical workflow list, bottleneck AI.

---

# Part I — Remote Actions Dashboard

**Route:** `/app/operations/remote-actions` · **Mockups:** `ops-remote-*`

Purpose: Governed remote actions on devices/users with consent and audit.  
KPIs: success, pending consent, devices targeted, policy blocks.  
Widgets: Actions table, permission callouts.  
Links: Device Investigation · Evidence packs.

---

# Part J — SLA Dashboard

**Route:** `/app/operations/sla` · **Mockups:** `ops-sla-*`

Purpose: Service and experience-linked SLA attainment.  
KPIs: `m.ops.sla_attainment_pct`, at-risk, breached, credits est.  
Widgets: SLA table, exec export.  
Permissions: financial credits may need `finance.investment_view`.

---

# Part K — Capacity Dashboard (Ops view)

**Route:** `/app/operations/capacity` · **Mockups:** `ops-capacity-*`

Purpose: Ops-facing capacity hotspots bridging Infra DC/VPN/VDI forecasts.  
KPIs: capacity risk, hotspots, days to breach, funded initiatives.  
Deep link: Infrastructure Data Center / VPN.

---

# Part L — Change Analytics

**Route:** `/app/operations/change` · **Mockups:** `ops-change-*`

Purpose: Correlate changes to experience/infra deltas.  
KPIs: changes 7d, `m.ops.change_failure_pct`, DEX impact Δ, unlinked changes.  
Widgets: Change table, AI correlation.  
Rule: Sev≥2 incidents should attach change evidence when present.

---

# Part M — Release Analytics

**Route:** `/app/operations/release` · **Mockups:** `ops-release-*`

Purpose: App release rings vs experience health; rollback candidates.  
KPIs: releases 30d, `m.ops.release_rollback_pct`, experience delta, guarded rings.  
Deep link: Application Detail version compare.

---

# Functional Spec Completeness Matrix

Each dashboard above includes: purpose, audience, KPIs, filters (shared+specific), widgets, interactions, cross-filtering, timeline behavior (where applicable), alert handling (where applicable), permissions, export, navigation (IA routes), actions, keyboard a11y — via Shared Framework + part-specific notes.

---

# Mockup Index

`ops-command`, `ops-incidents`, `ops-problems`, `ops-major`, `ops-alerts`, `ops-servicedesk`, `ops-automation`, `ops-workflows`, `ops-remote`, `ops-sla`, `ops-capacity`, `ops-change`, `ops-release` × 1920/1440 × dark/light.

---

*End of Volume 2B* · *Next: [Volume 2C](Volume-2C-AI-Intelligence.md)*

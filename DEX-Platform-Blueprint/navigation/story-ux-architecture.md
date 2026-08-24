# AetherDEX Story UX Architecture

**Authority:** Information Architect · Product Design Lead  
**Status:** Active — supersedes flat multi-dashboard nav as the **primary** mental model  
**Inputs:** DEX Dashboard Catalog v1 · Sessions 1–3 specs · [Lakeside SysTrack Dashboards](https://documentation.lakesidesoftware.com/docs/dashboards) · [Nexthink Platform](https://docs.nexthink.com/platform)

---

## 1. Problem

A 71-item catalog (and a long sidebar of peer dashboards) optimizes for **coverage**, not **decisions**. Decision-makers must stitch a narrative across Executive, Experience, Endpoints, Apps, Infra, Ops, and AI pages. That mental model fails:

| Anti-pattern | Why it hurts |
|--------------|--------------|
| Many equal dashboards | No single place answers “what matters now?” |
| Template-identical pages | Catalog widgets repeat; signal looks the same everywhere |
| Domain silos | Experience vs Endpoints vs Apps split one causal story |
| Nav as inventory | Sidebar becomes a table of contents, not a workflow |

**Principle:** A powerful dashboard tells a **story**. Specialist depth exists — but as chapters, lenses, and investigations, not 70 peer destinations.

---

## 2. What We Borrow (Without Copying UI)

### From Nexthink Digital Experience

- One **north-star score** with Technology + Sentiment drivers ([DEX overview](https://docs.nexthink.com/platform/user-guide/digital-experience/using-the-overview-dashboard))
- Impact framing: employees affected, time lost, potential score lift
- Drill from node → investigation with context preserved
- Device/User deep views for resolution ([Device View](https://docs.nexthink.com/platform/user-guide/device-view))
- Capabilities flow: **see → diagnose → remediate** ([platform capabilities](https://docs.nexthink.com/platform/overview/capabilities.md))

### From Lakeside SysTrack

- Curated **dashboard packs** + interactive Viewer (filters, selections) rather than raw report sprawl ([Dashboards](https://documentation.lakesidesoftware.com/docs/dashboards))
- Builder for advanced authors; most users consume curated stories
- Domain packs (Enterprise Health, Risk, Desktop, etc.) as **lenses**, not primary IA

### AetherDEX original

- **Story arcs** as first-class routes (Pulse → Experience → Reliability → Operations → Decide)
- Catalog v1 items mapped to **chapters / lenses / saved views**
- Session 1–3 widgets & KPIs reused inside stories (IDs preserved)

---

## 3. Primary Mental Model — Five Stories

```
┌─────────────────────────────────────────────────────────────────┐
│  PULSE — What should leadership care about right now?           │
│  Score → Change → Drivers → Business impact → Recommended acts  │
└────────────────────────────┬────────────────────────────────────┘
         ┌───────────────────┼───────────────────┐
         ▼                   ▼                   ▼
   EXPERIENCE           RELIABILITY           OPERATIONS
   How people feel      Why tech fails        Detect → Fix
   & where friction     (device·app·infra)     by employee impact
         └───────────────────┬───────────────────┘
                             ▼
                         DECIDE
              Cost · Risk · Investment · Sustainability
                             ▼
                    INVESTIGATE (entity depth)
```

| Story | Route | Decision question | Primary audience |
|-------|-------|-------------------|------------------|
| **Pulse** | `/app/stories/pulse` | What changed, who is hurt, what do we do? | Exec, CIO, Head of DEX |
| **Experience** | `/app/stories/experience` | Where is friction in the employee day? | DEX lead, HR/IT partners |
| **Reliability** | `/app/stories/reliability` | Which tech layers are driving poor DEX? | Endpoint, App, Infra owners |
| **Operations** | `/app/stories/operations` | What is on fire and how do we clear it? | Ops, Service Desk leads |
| **Decide** | `/app/stories/decide` | Where should money and risk focus go? | Exec, FinOps, Risk |

Each story page uses a fixed narrative spine:

1. **Headline** — one sentence of current state  
2. **Scoreboard** — 3–5 KPIs that advance the plot  
3. **Plot** — drivers / chapters (interactive)  
4. **Characters** — who/what is impacted (segments, services, entities)  
5. **Climax** — ranked actions / AI recommendations  
6. **Continue** — drill into Investigate or a specialist lens

---

## 4. Secondary Surfaces (Depth, Not Peers)

| Surface | Role |
|---------|------|
| **Investigate** | Entity workbench (device / user / app / incident) — Nexthink Device View class |
| **AI Copilot** | Contextual assistant on any story; not a separate “AI dump” of dashboards |
| **Catalog Library** | All 71 catalog dashboards as **lenses / saved analytical views** under stories |
| Legacy Session routes | Still reachable for engineering handoff; demoted in primary nav |

---

## 5. Catalog v1 → Story Mapping

### Pulse absorbs

Enterprise Command Center · Executive Scorecard · Executive AI · Digital Experience (exec slice) · Alerts (top)

### Experience absorbs

Employee Experience · Experience Journey · Experience Trends · Sentiment · Productivity · Remote / Hybrid Workforce · Department Experience · Persona Analytics · Digital Adoption

### Reliability absorbs

**Devices:** Device Health · Performance · Reliability · Lifecycle · Hardware Inventory · Patch · Windows · Battery · BIOS · Driver · Storage · Endpoint Security  

**Apps:** Application Health · M365 · Teams · Outlook · Browser · SaaS · License · Portfolio · Performance · Software Inventory  

**Infra:** Network · VPN · Wi‑Fi · Internet · Azure · AWS · GCP · VDI · Server · Storage Capacity

### Operations absorbs

Operations Command Center · Incident · Problem · Change · Alert Center · Automation · SLA · Service Desk

### Decide absorbs

Business Impact · Technology Health (investment lens) · Cost Intelligence · Sustainability · Risk Intelligence · Predictions (planning)

### Investigate / Intelligence depth

Root Cause · Correlation · Digital Twin · Knowledge Graph · User / Device / Application Investigation · Timeline · Dependency · Relationship Explorer

---

## 6. Interaction Grammar

| Pattern | Spec |
|---------|------|
| Chapter chips | Horizontal story chapters; selecting filters the plot (does not navigate away) |
| Driver nodes | Click → slide-over with impact, trend, “open investigation” |
| Scope / time | Global header (unchanged Session 1) — stories inherit scope |
| Compare | WoW / MoM / vs initiative baked into Pulse + Decide |
| Action strip | Always visible on Pulse & Ops: Ack · Investigate · Automate · Brief exec |
| Packs | Lakeside-style “Experience Pack”, “Endpoint Pack” = pre-scoped story chapters |

---

## 7. Nav Contract (Application Shell)

**Primary sidebar (≤ 8 destinations):**

1. Home (story picker + persona briefing)  
2. Pulse  
3. Experience  
4. Reliability  
5. Operations  
6. Decide  
7. Investigate  
8. Library (catalog lenses + legacy dashboards)

---

## 8. Success Criteria

- A CIO answers “how are we?” in **one** screen (Pulse) without hopping domains  
- An ops lead starts from **impact**, not alert volume  
- Catalog coverage remains complete via Library, without polluting primary IA  
- Existing Session 1–3 widget/KPI IDs remain the source of truth inside stories

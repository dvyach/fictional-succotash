# AetherDEX Information Architecture — Session 2 Extensions

**Authority:** Information Architect · Frontend Architecture Lead  
**Builds on:** [`information-architecture.md`](information-architecture.md) (Session 1)  
**Product shell route prefix:** `/app`

Session 2 **enables** previously disabled sidebar sections and adds nested routes. Session 1 routes remain unchanged.

---

## 1. Sidebar — Session 2 Visible

| Section | Items | Route |
|---------|-------|-------|
| **Overview** | Home | `/app/home` |
| **Executive** | DEX Index · Risk & Investment | `/app/executive/*` |
| **Experience** | Overview · Journeys · Sentiment | `/app/experience/*` |
| **Endpoints** | Fleet Health · Stability · Lifecycle | `/app/endpoints/*` |
| **Applications** | Portfolio · App Detail | `/app/applications/*` |
| **Infrastructure** | Network · VPN · Wi‑Fi · Internet · WAN · Cloud · VDI · Data Center | `/app/infrastructure/*` |
| **Operations** | Command Center · Incidents · Problems · Major Incident · Alerts · Service Desk · Automation · Workflows · Remote Actions · SLA · Capacity · Change · Release | `/app/operations/*` |
| **AI Hub** | Command Center · Root Cause · Correlations · Predictions · Recommendations · Digital Twin · Risk · Exec Insights · Copilot · Knowledge Graph | `/app/ai/*` |
| **Investigate** | Device · User · Application · Incident · Alert · Timeline · Events · Dependencies · Process · Session Replay · Cases | `/app/investigate/*` |

Session 3+ items (Admin, Marketplace) remain hidden.

---

## 2. Route Map — Session 2

### Infrastructure (`infra.*`)

| Route ID | Path | Volume | Dashboard |
|----------|------|--------|-----------|
| `infra.network` | `/app/infrastructure/network` | 2A | Network Intelligence |
| `infra.vpn` | `/app/infrastructure/vpn` | 2A | VPN Analytics |
| `infra.wifi` | `/app/infrastructure/wifi` | 2A | Wi‑Fi Analytics |
| `infra.internet` | `/app/infrastructure/internet` | 2A | Internet Experience |
| `infra.wan` | `/app/infrastructure/wan` | 2A | WAN Analytics |
| `infra.cloud` | `/app/infrastructure/cloud` | 2A | Cloud Infrastructure (Azure/AWS/GCP) |
| `infra.vdi` | `/app/infrastructure/vdi` | 2A | Virtual Desktop Infrastructure |
| `infra.datacenter` | `/app/infrastructure/datacenter` | 2A | Data Center Health & Capacity |

### Operations (`ops.*`)

| Route ID | Path | Volume | Dashboard |
|----------|------|--------|-----------|
| `ops.command` | `/app/operations/command-center` | 2B | Enterprise Operations Command Center (NOC) |
| `ops.incidents` | `/app/operations/incidents` | 2B | Incident Dashboard |
| `ops.problems` | `/app/operations/problems` | 2B | Problem Dashboard |
| `ops.major` | `/app/operations/major-incidents` | 2B | Major Incident Dashboard |
| `ops.alerts` | `/app/operations/alerts` | 2B | Alert Center |
| `ops.servicedesk` | `/app/operations/service-desk` | 2B | Service Desk Analytics |
| `ops.automation` | `/app/operations/automation` | 2B | Automation Dashboard |
| `ops.workflows` | `/app/operations/workflows` | 2B | Workflow Dashboard |
| `ops.remote` | `/app/operations/remote-actions` | 2B | Remote Actions Dashboard |
| `ops.sla` | `/app/operations/sla` | 2B | SLA Dashboard |
| `ops.capacity` | `/app/operations/capacity` | 2B | Capacity Dashboard |
| `ops.change` | `/app/operations/change` | 2B | Change Analytics |
| `ops.release` | `/app/operations/release` | 2B | Release Analytics |

### AI Hub (`ai.*`)

| Route ID | Path | Volume | Dashboard |
|----------|------|--------|-----------|
| `ai.command` | `/app/ai/command-center` | 2C | AI Command Center |
| `ai.rootcause` | `/app/ai/root-cause` | 2C | Root Cause Explorer |
| `ai.correlate` | `/app/ai/correlations` | 2C | Correlation Explorer |
| `ai.predict` | `/app/ai/predictions` | 2C | Prediction Center |
| `ai.recommend` | `/app/ai/recommendations` | 2C | Recommendation Center |
| `ai.twin` | `/app/ai/digital-twin` | 2C | Digital Twin Explorer |
| `ai.risk` | `/app/ai/risk` | 2C | Risk Intelligence |
| `ai.exec` | `/app/ai/executive-insights` | 2C | Executive AI Insights |
| `ai.copilot` | `/app/ai/copilot` | 2C | AI Copilot Dashboard |
| `ai.graph` | `/app/ai/knowledge-graph` | 2C | Enterprise Knowledge Graph |

### Investigate (`inv.*`)

| Route ID | Path | Volume | Dashboard |
|----------|------|--------|-----------|
| `inv.home` | `/app/investigate` | 2D | Investigation Home / Cases |
| `inv.device` | `/app/investigate/device/:deviceId` | 2D | Device Investigation |
| `inv.user` | `/app/investigate/user/:employeeId` | 2D | User Investigation |
| `inv.app` | `/app/investigate/application/:appId` | 2D | Application Investigation |
| `inv.incident` | `/app/investigate/incident/:incidentId` | 2D | Incident Investigation |
| `inv.alert` | `/app/investigate/alert/:alertId` | 2D | Alert Investigation |
| `inv.timeline` | `/app/investigate/timeline` | 2D | Timeline Explorer |
| `inv.events` | `/app/investigate/events` | 2D | Event Explorer |
| `inv.deps` | `/app/investigate/dependencies` | 2D | Dependency Explorer |
| `inv.correlate` | `/app/investigate/correlations` | 2D | Correlation Explorer |
| `inv.process` | `/app/investigate/process` | 2D | Process Explorer |
| `inv.service` | `/app/investigate/service-deps` | 2D | Service Dependency Explorer |
| `inv.replay` | `/app/investigate/session-replay` | 2D | Session Replay Timeline |
| `inv.activity` | `/app/investigate/activity` | 2D | Activity Timeline |
| `inv.behavior` | `/app/investigate/behavior` | 2D | Behavior Analytics |
| `inv.graph` | `/app/investigate/relationships` | 2D | Relationship Explorer |
| `inv.case` | `/app/investigate/cases/:caseId` | 2D | Collaborative Case |

---

## 3. Cross-Domain Deep Links (Session 2 additions)

| From | To | Payload |
|------|----|---------|
| Experience friction (network) | Infrastructure Network / VPN / Wi‑Fi | time, scope, location |
| App dependency node (GW/CDN) | Infrastructure Cloud / WAN | dependencyId |
| Ops alert | Investigate Alert / Incident | alertId, evidence pack |
| AI root cause | Investigate Case (create) | insightId, entities |
| Command Center tile | Domain dashboard | preserved filters |
| Any Session 1 AI “Investigate” stub | Live Investigation workspace | full context |

Preserve: `timeRange`, `scope`, `timezone`, `compareMode`, plus `caseId` when in collaborative mode.

---

## 4. Persona → Session 2 Surfaces

| Persona | Primary Session 2 homes |
|---------|-------------------------|
| P5 Ops Lead | Command Center, Alerts, Incidents |
| P3 Endpoint | Remote Actions, Device Investigation |
| P4 App Owner | App Investigation, Change/Release |
| P2 DEX Lead | AI Command, Recommendations |
| P1 Exec | AI Executive Insights, Risk Intelligence |
| P7 SRE | Cloud, WAN, Correlation, Service Deps |

---

## 5. Naming Consistency

Widget IDs: `w-infra-*`, `w-ops-*`, `w-ai-*`, `w-inv-*`  
Metric IDs: `m.infra.*`, `m.ops.*`, `m.ai.*`, `m.inv.*`  
Routes and breadcrumb domain labels must match sidebar section names exactly.

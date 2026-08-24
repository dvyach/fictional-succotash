# Volume 2D — Investigation Workspace

**Product:** AetherDEX  
**Session:** 2  
**Depends on:** Volumes 1A–1E, 2A–2C  
**Mockups:** [`mockups/investigations/`](../../mockups/investigations/)  
**Widget prefix:** `w-inv-*`  
**Diagrams:** [`architecture/investigation-flows.mmd`](../../architecture/investigation-flows.mmd)

---

# Document Control

| Version | Status |
|---------|--------|
| 2.0.0 | Complete |

Investigation workspaces replace Session 1 “Investigate stub” deep links with full case-centric diagnosis — timeline scrubbing, compare mode, collaborative cases, and AI assistant side-by-side.

---

# Shared Investigation Capabilities

Every investigation page supports:

| Capability | Spec |
|------------|------|
| Saved Investigations | Named filter+layout+entity packs |
| Bookmarks | Shell bookmarks with case context |
| History | Last 25 investigation deep links |
| Pinned Widgets | Per-user pins persisted on case |
| Dynamic Filters | Scope/time + entity facets |
| AI Assistant | Context-grounded Copilot drawer |
| Split View | Two entities side-by-side |
| Compare | Devices / Users / Apps (max 3) |
| Graph Navigation | Push neighborhood to Dependency/Relationship explorers |
| Timeline Scrubbing | Multi-track scrubber synced across widgets |
| Drill-through | Canonical hierarchy to Logs/Automation |
| Export | Evidence pack ZIP + PDF summary |
| Share | ACL’d link; optional Slack |
| Collaborative Investigation | Case participants, comments, assignments |
| Case Management | Lifecycle New→Active→Monitoring→Resolved→Closed |

## Permissions

| Action | Role |
|--------|------|
| View case | Participant or matching entity ACL |
| Edit pins/filters | Participant |
| Invite | Case owner / ops_commander |
| Execute remote action | `action.execute` |
| Seal evidence pack | Owner or commander |

## Widget Registry — Investigation

| ID | Name |
|----|------|
| `w-inv-case-list` | Case List |
| `w-inv-case-header` | Case Header |
| `w-inv-timeline` | Multi-track Timeline |
| `w-inv-event-table` | Event Explorer Table |
| `w-inv-process-tree` | Process Explorer |
| `w-inv-dependency-graph` | Dependency Graph |
| `w-inv-correlation` | Correlation Panel |
| `w-inv-session-replay` | Session Replay Timeline |
| `w-inv-activity` | Activity Timeline |
| `w-inv-behavior` | Behavior Analytics |
| `w-inv-relationship` | Relationship Explorer |
| `w-inv-compare` | Compare Strip |
| `w-inv-ai-assistant` | Case AI Assistant |
| `w-inv-evidence` | Evidence Pack List |
| `w-inv-participants` | Participants |
| `w-inv-comments` | Case Comments |

---

# Part A — Investigation Home / Cases

**Route:** `/app/investigate` · **Mockups:** `inv-home-*`  
Purpose: Enter investigations via open cases or start Device/User/App/Incident/Alert flows.  
KPIs: `m.inv.open_cases`, median duration, collab active, evidence packs.  
Actions: New case from template · Continue · Close.

---

# Part B — Device Investigation

**Route:** `/app/investigate/device/:deviceId` · **Mockups:** `inv-device-*`  
Purpose: Full device forensics: boot/login, processes, crashes, apps, network contribution.  
Compare: up to 3 devices.  
Actions: Remote diagnostics, quarantine (entitled), pin to case.

---

# Part C — User Investigation

**Route:** `/app/investigate/user/:employeeId` · **Mockups:** `inv-user-*`  
Purpose: Employee experience across devices, journeys, apps, sentiment (PII gated).  
Compare: users or vs team baseline.

---

# Part D — Application Investigation

**Route:** `/app/investigate/application/:appId` · **Mockups:** `inv-app-*`  
Purpose: App-centric RCA with versions, deps, session replay, impact cohort.  
Links: App Detail · Release Analytics · Cloud deps.

---

# Part E — Incident Investigation

**Route:** `/app/investigate/incident/:incidentId` · **Mockups:** `inv-incident-*`  
Purpose: Bridge ITSM incident with DEX evidence, AI RCA, war-room collab.  
Sync: bidirectional status with ITSM connector.

---

# Part F — Alert Investigation

**Route:** `/app/investigate/alert/:alertId`  
Purpose: Enrich alert → impact → entities → promote incident/case.  
(Layout shares incident patterns; mockup via alert center deep link + incident shell.)

---

# Part G — Timeline Explorer

**Route:** `/app/investigate/timeline` · **Mockups:** `inv-timeline-*`  
Purpose: Cross-domain multi-track scrubbing (friction, alerts, changes, network, app, endpoint).  
Interactions: brush, snap to marker, split compare windows.

---

# Part H — Event Explorer

**Route:** `/app/investigate/events`  
Purpose: Raw/normalized event search with saved queries; feeds timeline.  
Widget: `w-inv-event-table` virtualized; export capped & audited.

---

# Part I — Dependency Explorer

**Route:** `/app/investigate/dependencies` · **Mockups:** `inv-deps-*`  
Purpose: Client-to-service dependency graphs with critical path and blast radius.

---

# Part J — Correlation Explorer (Investigation)

**Route:** `/app/investigate/correlations`  
Purpose: Case-scoped correlation (shares AI correlation widgets with filtered case entities).

---

# Part K — Process Explorer

**Route:** `/app/investigate/process`  
Purpose: Process trees, resource use, crash modules; links to device timeline.

---

# Part L — Service Dependency Explorer

**Route:** `/app/investigate/service-deps`  
Purpose: Service-level topology for platform/SRE; shares dependency graph widget with service root.

---

# Part M — Session Replay Timeline

**Route:** `/app/investigate/session-replay`  
Purpose: Privacy-preserving session milestone replay (not pixel video by default): launch, hang, network, errors.  
Opt-in higher fidelity per policy.

---

# Part N — Activity Timeline

**Route:** `/app/investigate/activity`  
Purpose: User/device activity stream for behavior context.

---

# Part O — Behavior Analytics

**Route:** `/app/investigate/behavior`  
Purpose: Anomalous behavior cohorts (experience-impacting), not HR surveillance — policy-gated.

---

# Part P — Relationship Explorer

**Route:** `/app/investigate/relationships`  
Purpose: Knowledge-graph neighborhood for any entity; save subgraph to case.

---

# Part Q — Collaborative Case

**Route:** `/app/investigate/cases/:caseId`  
Purpose: Case container binding entities, pins, evidence, participants, comments, status.  
Lifecycle: see Mermaid case lifecycle diagram.

---

# Engineering

```
GET/POST /api/v1/cases
POST /api/v1/cases/{id}/evidence:seal
GET /api/v1/investigate/timeline
GET /api/v1/investigate/events
GET /api/v1/investigate/graph
```

State: URL encodes entity IDs + brush + compare set. Real-time: case comments via SSE.

---

*End of Volume 2D* · *Next: [Volume 2E](Volume-2E-Widget-Design-System.md)*

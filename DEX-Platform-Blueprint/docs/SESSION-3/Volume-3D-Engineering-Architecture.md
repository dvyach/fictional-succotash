# Volume 3D — Engineering Architecture

**Product:** AetherDEX  
**Session:** 3  
**Authority:** Enterprise / Frontend / Backend / Cloud / DevOps / AI Architects  
**Diagrams:** `system-context.mmd`, `deployment.mmd`, `api-topology.mmd`, `ai-pipeline.mmd`, plus Session 3 data diagrams

---

# Document Control

| Version | Status |
|---------|--------|
| 3.0.0 | Complete |

---

# 1. System Context

Actors: Employees (telemetry subjects), Analysts, Executives, Ops, Automation operators, IdP, ITSM, Cloud providers, Network controllers.  
AetherDEX Platform sits as the DEX system of record for experience analytics, AI assistance, and governed actions.

See `architecture/system-context.mmd`.

---

# 2. Domain Boundaries (Microservices)

| Domain service | Responsibility |
|----------------|----------------|
| `gateway-bff` | AuthN edge, BFF aggregation, SSE fanout |
| `identity-dir` | Employee/org sync, entitlements cache |
| `telemetry-ingest` | Agent/beacon validation → Kafka |
| `metrics-semantic` | KPI queries, weight profiles |
| `entity-graph` | Dependencies, KG reads |
| `alerting` | Alert state, noise, impact |
| `itsm-connector` | Incident/problem/change sync |
| `automation` | Playbooks, remote actions, guardrails |
| `insights-ai` | Insights, RCA, recs, predictions |
| `copilot` | RAG chat, plan execution orchestration |
| `cases` | Investigation cases, evidence packs |
| `views` | Saved views/bookmarks |
| `admin-tenant` | Tenant config, feature flags |
| `export` | PDF/CSV/evidence ZIP |

Shared libs: authz, audit, telemetry SDK, design tokens publish.

---

# 3. Frontend Architecture

| Choice | Spec |
|--------|------|
| Framework | React + TypeScript |
| Routing | `/app/...` matching IA |
| State | URL for scope/time/filters; server state via React Query/SWR; light UI chrome store |
| Components | `Adx*` design system; compose `w-*` widgets |
| Charts | Shared chart kit wrapping primitives |
| Realtime | SSE hooks for NOC/feeds/cases |
| Perf | KPI priority fetch; virtualize grids; code-split domains |
| a11y | Storybook a11y; axe CI |
| i18n | ICU catalogs |
| Offline | Read-only last shell + banner |
| RUM | Self-telemetry on AetherDEX |

Module layout: `shell`, `domains/{executive,experience,endpoints,applications,infrastructure,operations,ai,investigate}`, `widgets`, `design-system`.

---

# 4. Backend Architecture

- APIs: REST primary; GraphQL for entity/dependency graphs; WebSocket/SSE for streams  
- AuthN: OIDC/SAML via enterprise IdP  
- AuthZ: RBAC + scope ACL + ABAC attributes (Volume 3F)  
- Multi-tenant: tenant_id isolation at gateway + data layer  
- Idempotency keys on mutations  
- Outbox pattern for ITSM/automation events  

---

# 5. Streaming & Event Bus

Kafka topics by domain (`telemetry.endpoint`, `telemetry.app`, `infra.path`, `ops.alert`, `ai.insight`, `case.activity`).  
Schema Registry required. Consumer groups per service. See `streaming.mmd`.

---

# 6. Caching & Search

- Redis: query cache, session entitlements, rate limits  
- OpenSearch/Elastic: omnisearch entities, event explorer  
- CDN: static assets & design token bundles  

---

# 7. Observability

OpenTelemetry traces across BFF→services→warehouse jobs.  
Metrics: RED/USE + query p95 + rollup lag.  
Logs: structured JSON; PII redaction.  
Alerting on platform SLOs (API 99.9%, ingest lag).

---

# 8. CI/CD & Config

- Monorepo or polyrepo with versioned contracts  
- Pipelines: lint, typecheck, unit, contract tests, a11y, build, deploy  
- Environments: dev / test / stage / prod  
- Feature flags: LaunchDarkly-style; tenant overrides  
- Config: sealed secrets; no secrets in repo  

---

# 9. Scalability & HA / DR

- Stateless services behind LBs; Kafka & stores multi-AZ  
- Read replicas for semantic queries  
- RPO ≤ 15 min; RTO ≤ 4h (tenant tier adjustable)  
- Chaos tests on ingest & API  

---

# 10. Testing Strategy

| Layer | Focus |
|-------|-------|
| Unit | measures, authz, reducers |
| Contract | OpenAPI/GraphQL/pact |
| Integration | Kafka→Silver→Gold |
| E2E | critical journeys per persona |
| Perf | k6 on metric summary/timeseries |
| Security | SAST/DAST, dependency scan |

---

# 11. Plugin / SDK / Extensions

- **Public API** (3E) for integrations  
- **Webhook subscriptions** for insights/alerts  
- **Widget SDK** (post-GA): register `w-ext-*` with review  
- **Agent SDK** for telemetry producers  
- Extension model: signed plugins; tenant admin enablement  

---

# 12. Performance Budgets

| Surface | Target |
|---------|--------|
| Shell LCP | < 2.5s |
| KPI summary p95 | < 300ms cached; < 2s cold enterprise 7d |
| NOC refresh | ≤ 15s |
| Copilot first token | < 1.5s |

---

# 13. Offline Support

Service worker caches shell + last dashboard JSON; mutations disabled; reconnect sync.

---

*End of Volume 3D · Next: [Volume 3E](Volume-3E-API-Contracts.md)*

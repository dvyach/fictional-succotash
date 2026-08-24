# Volume 3E — API Contracts

**Product:** AetherDEX  
**Session:** 3  
**Artifacts:** [`api/openapi.yaml`](../../api/openapi.yaml) · [`api/graphql-schema.graphql`](../../api/graphql-schema.graphql)

---

# Document Control

| Version | Status |
|---------|--------|
| 3.0.0 | Complete · API version `v1` |

---

# 1. Conventions

| Topic | Spec |
|-------|------|
| Base URL | `https://{tenant}.aetherdex.example/api/v1` |
| Auth | Bearer access token (OIDC) |
| Content type | `application/json` |
| Time | ISO-8601; query `from`,`to`,`tz` |
| Scope | `scope[region]`,`scope[bu]`,… or `scopeId` |
| Pagination | `cursor` + `limit` (default 50, max 200) |
| Sorting | `sort=field:asc\|desc` |
| Filtering | `filter[field]=` + encoded KPI filters |
| Idempotency | Header `Idempotency-Key` on POST mutations |
| Versioning | URL `/v1`; deprecations announced 6 months |
| Rate limit | 600 req/min user; 60/min expensive exports; headers `X-RateLimit-*` |
| Errors | RFC7807 problem+json |
| Audit | Mutations emit audit events |
| Webhooks | Signed HMAC SHA-256 body |

---

# 2. REST Surface (summary)

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/metrics/{kpiId}/summary` | KPI summary |
| GET | `/metrics/{kpiId}/timeseries` | Time series |
| GET | `/metrics/{kpiId}/breakdown` | Dimensional breakdown |
| GET | `/catalog/kpis` | KPI catalog |
| GET | `/search` | Omnisearch |
| GET | `/entities/{type}/{id}` | Entity fetch |
| GET | `/insights` | AI insights |
| POST | `/ai/chat` | Copilot SSE |
| GET | `/alerts` | Alerts |
| POST | `/alerts/{id}/ack` | Acknowledge |
| GET | `/incidents` | Incidents |
| GET/POST | `/cases` | Investigation cases |
| POST | `/cases/{id}/evidence:seal` | Seal evidence |
| GET/POST | `/views` | Saved views |
| POST | `/automation/jobs` | Queue automation |
| POST | `/remote-actions` | Remote action |
| POST | `/exports/exec-pack` | Exec PDF |
| GET | `/scopes/tree` | Scope tree |
| POST | `/webhooks` | Register webhook |

Full schemas: OpenAPI file.

---

# 3. Example — Metric Summary

**Request**
```http
GET /api/v1/metrics/kpi.dex.digital_experience_index/summary?from=2026-07-23T00:00:00Z&to=2026-07-30T23:59:59Z&tz=America/New_York&compare=wow
Authorization: Bearer eyJ...
```

**Response**
```json
{
  "kpiId": "kpi.dex.digital_experience_index",
  "value": 78.4,
  "unit": "score",
  "band": "good",
  "delta": { "compare": "wow", "absolute": 1.2, "percent": null },
  "meta": {
    "coverage": 92.1,
    "freshness": "2026-07-30T18:05:00Z",
    "queryId": "q_01J...",
    "weightProfileId": "wp_default_v3"
  }
}
```

---

# 4. Example — Create Case

**Request**
```http
POST /api/v1/cases
Idempotency-Key: 8f14e45f
Content-Type: application/json

{
  "title": "CRM hangs — Sales",
  "severity": "sev1",
  "entityRefs": [
    { "type": "application", "id": "app_crm" },
    { "type": "insight", "id": "ins_8821" }
  ],
  "timeRange": { "from": "2026-07-30T08:00:00Z", "to": "2026-07-30T12:00:00Z" }
}
```

**Response** `201`
```json
{ "id": "case_441", "status": "active", "deepLink": "/app/investigate/cases/case_441" }
```

---

# 5. GraphQL

Used for dependency / knowledge graph neighborhoods. See schema file.

Example:
```graphql
query AppDeps($appId: ID!, $scope: ScopeInput!) {
  application(id: $appId) {
    id name experienceScore
    dependencies(scope: $scope) {
      nodes { id name kind health }
      edges { from to weight }
    }
  }
}
```

---

# 6. WebSockets / SSE

| Channel | Events |
|---------|--------|
| `GET /api/v1/stream/alerts` SSE | alert upsert |
| `GET /api/v1/stream/cases/{id}` SSE | comment, status |
| `POST /api/v1/ai/chat` SSE | token, step, final |

---

# 7. Streaming Events (Kafka → webhooks optional)

Envelope:
```json
{
  "id": "evt_...",
  "type": "insight.created",
  "tenantId": "t_...",
  "occurredAt": "2026-07-30T18:00:00Z",
  "data": {}
}
```

---

# 8. Bulk / Export / Import

- Bulk entity fetch: `POST /entities:batch` max 100  
- Export: async job `POST /exports` → poll `GET /exports/{id}`  
- Import: app registry CSV `POST /admin/apps:import` (admin)

---

# 9. Error Handling

```json
{
  "type": "https://aetherdex.example/errors/forbidden",
  "title": "Forbidden",
  "status": 403,
  "detail": "Missing entitlement pii.employee_view",
  "instance": "/api/v1/entities/employee/e_1"
}
```

---

# 10. Webhook Security

- Header `X-ADX-Signature: sha256=...`  
- Rotate secrets via admin API  
- Retry with exponential backoff 5×  

---

*End of Volume 3E · Next: [Volume 3F](Volume-3F-Security-Governance.md)*

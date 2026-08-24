# Volume 3F — Security & Governance

**Product:** AetherDEX  
**Session:** 3  
**Authority:** Security Architect · Privacy · Platform Admin

---

# Document Control

| Version | Status |
|---------|--------|
| 3.0.0 | Complete |

---

# 1. Identity & Access

| Control | Spec |
|---------|------|
| AuthN | OIDC / SAML SSO mandatory for GA |
| Sessions | Short-lived access tokens + refresh; step-up for remote actions |
| RBAC | Roles from personas (`exec_viewer`, `dex_analyst`, `endpoint_ops`, `app_owner`, `ops_responder`, `ops_commander`, `automation_operator`, `platform_admin`, …) |
| ABAC | Attributes: region, BU, criticality, employment type |
| Scope ACL | Hierarchical; users only see permitted scopes |
| Entitlements | `pii.employee_view`, `finance.investment_view`, `action.execute`, `ai.assistant.use`, `infra.capacity_view` |

---

# 2. Row & Column Security

- **RLS:** All Gold queries inject `tenant_id` + scope predicates.  
- **CLS:** PII columns null unless entitlement; sentiment free-text restricted; device hostname masked for exec-only.  
- Aggregates preferred below Department without PII.

---

# 3. Tenant Isolation

- Hard tenant_id isolation in DB, Kafka, cache keys, object storage prefixes.  
- No cross-tenant AI retrieval.  
- Pen-test shared infra boundaries annually.

---

# 4. Encryption & Secrets

| Area | Spec |
|------|------|
| In transit | TLS 1.2+ |
| At rest | AES-256 (cloud KMS) |
| Secrets | Vault / cloud secret manager; rotation 90d |
| Key management | CMK optional per tenant tier |

---

# 5. Audit Logging

Immutable audit for: logins, entitlement elevation, PII access, exports, automation/remote actions, weight profile changes, case seal, webhook secret view.  
Retention ≥ 1 year (regulated tenants longer).

---

# 6. Compliance Mapping

| Framework | Controls addressed |
|-----------|-------------------|
| SOC2 | Access, change mgmt, monitoring, encryption |
| ISO27001 | ISMS-aligned policies; asset & access control |
| GDPR | Lawful basis, minimization, DSR export/delete workflows, residency |
| HIPAA | If healthcare tenant: BAA, ePHI classification, stricter CLS |

---

# 7. Data Residency & Retention

- Region pinning per tenant  
- Retention profiles (Volume 3B) enforceable  
- Backup encrypted; restore tested quarterly  
- DR per Volume 3D RPO/RTO  

---

# 8. Governance Workflows

| Workflow | Approvers |
|----------|-----------|
| DEX weight profile change | DEX Lead + Platform Admin |
| Automation playbook publish | Automation Ops + Security |
| Remote action high blast | Commander + change window |
| KPI threshold change | Domain owner + Analytics |
| Production schema break | CAB / platform |

---

# 9. Administration & Licensing

- Tenant admin: SSO, roles, scopes, feature flags, residency  
- License seats by role packs; overage alerts  
- Platform settings: default timezones, impact thresholds, AI confidence floors  

---

# 10. Secure SDLC

SAST/DAST, dependency scanning, signed images, least-privilege cloud IAM, private clusters optional.

---

*End of Volume 3F · Next: [Volume 3G](Volume-3G-Implementation-Roadmap.md)*

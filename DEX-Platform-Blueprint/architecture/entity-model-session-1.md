# AetherDEX Entity Model — Session 1

**Authority:** Enterprise Solution Architect · Analytics Platform Architect  
**Purpose:** Shared entities for Volumes 1B–1E. Session 2 expands infrastructure and investigation entities.

---

## 1. Core Entities

```
Organization
  └── Region
        └── Country
              └── Site (optional)
BusinessUnit
  └── Department
        └── Manager
              └── Employee
Device ──< owns >── Employee (M:N via assignments)
Application
  └── ApplicationVersion
  └── ApplicationDependency
Session (Employee + Device + Application + time)
JourneyInstance (Employee + JourneyDefinition + steps)
FrictionEvent
Alert
Insight
Initiative
```

---

## 2. Entity Definitions

### Organization

| Attribute | Type | Notes |
|-----------|------|-------|
| `org_id` | UUID | Tenant |
| `name` | string | |
| `timezone_default` | IANA TZ | |
| `dex_weight_profile_id` | UUID | Weight config for DEX |

### Region / Country / Site

Hierarchical geography. Sites optional; when absent, Country is leaf geo.

### BusinessUnit / Department / Manager

HR-derived org hierarchy. Manager is an Employee with `is_manager=true` and direct reports.

### Employee

| Attribute | Type | Sensitivity |
|-----------|------|-------------|
| `employee_id` | UUID | Internal |
| `display_name` | string | PII |
| `email` | string | PII |
| `persona_segment` | enum | |
| `location_type` | enum | |
| `bu_id`, `dept_id`, `manager_id` | UUID | |
| `status` | active/leave/terminated | |

### Device

| Attribute | Type | Notes |
|-----------|------|-------|
| `device_id` | UUID | |
| `hostname` | string | |
| `os_family`, `os_version` | string | |
| `model`, `manufacturer` | string | |
| `image_id` | string | |
| `last_seen_at` | timestamp | |
| `compliance_flags` | jsonb | |
| `warranty_end` | date | |
| `battery_health_pct` | float | |
| `disk_health_score` | float | |

### Application

| Attribute | Type | Notes |
|-----------|------|-------|
| `app_id` | UUID | |
| `name` | string | |
| `app_type` | desktop \| saas \| browser | |
| `criticality` | tier0–tier3 | |
| `owner_team_id` | UUID | |
| `entitled_user_count` | int | |

### Session

Fact grain for many app/endpoint measures: `session_id`, `employee_id`, `device_id`, `app_id`, `started_at`, `ended_at`, experience measures.

### JourneyDefinition / JourneyInstance

Definitions are configurable; instances are runtime executions with step timings and outcomes.

### FrictionEvent

| Attribute | Type |
|-----------|------|
| `event_id` | UUID |
| `event_type` | hang, crash, long_wait, failed_join, sentiment_detractor, boot_slow, … |
| `severity` | low, medium, high, critical |
| `employee_id`, `device_id`, `app_id` | nullable FKs |
| `occurred_at` | timestamp |
| `payload` | jsonb |

### Alert / Insight / Initiative

Operational and AI entities. Insights reference evidence packs (query snapshots + entity IDs). Initiatives track change programs with baseline and target DEX.

---

## 3. Fact Tables (Session 1)

| Fact | Grain | Key measures |
|------|-------|--------------|
| `fact_dex_employee_hourly` | employee × hour | DEX, component scores, coverage |
| `fact_endpoint_device_hourly` | device × hour | boot, login, cpu, mem, crash, disk, battery |
| `fact_app_session` | session | launch_ms, hang, errors, RTT |
| `fact_journey_instance` | journey instance | success, duration, step failures |
| `fact_sentiment_pulse` | pulse response | score, themes |
| `fact_alert_state` | alert × state change | severity, impact_radius |
| `fact_initiative_progress` | initiative × day | score_delta, spend |

---

## 4. Relationships (Cardinality)

| From | To | Card |
|------|----|------|
| Employee | Device | M:N (assignment history) |
| Employee | Session | 1:N |
| Device | Session | 1:N |
| Application | Session | 1:N |
| Application | ApplicationVersion | 1:N |
| Application | ApplicationDependency | 1:N |
| Employee | JourneyInstance | 1:N |
| JourneyInstance | FrictionEvent | 1:N |
| Insight | FrictionEvent / Alert / Entity | M:N via evidence |

---

## 5. Security & Privacy

- Aggregates above Department visible to `role.exec_viewer` without PII.
- Employee name/email requires `pii.employee_view`.
- Device hostname visible to endpoint roles; masked for exec-only roles unless elevated.
- Sentiment free-text: restricted; theme aggregates preferred in Session 1 UI.
- All exports audited.

---

## 6. Identifier Stability

Public API and UI deep links use opaque UUIDs. Human-readable codes (e.g., `DX-48291`) are display aliases only and may change; never use as primary keys in integrations.

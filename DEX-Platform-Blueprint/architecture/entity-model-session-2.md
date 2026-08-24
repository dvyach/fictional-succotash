# AetherDEX Entity Model — Session 2 Extensions

**Builds on:** [`entity-model-session-1.md`](entity-model-session-1.md)

---

## New / Extended Entities

### NetworkPath
`path_id`, `path_type` (lan|wifi|vpn|wan|internet), `src_site`, `dst_region`, quality measures.

### VpnGateway / VpnSession
Gateway capacity, protocol, auth method; session link to Employee + Device.

### WifiAccessPoint / WifiAssociation
AP, SSID, band, channel, RSSI, roam events.

### CloudResource
`provider` (azure|aws|gcp), `region`, `service`, `resource_id`, health, error budget.

### VdiBroker / VdiSession
Broker type (citrix|avd|horizon|w365), pool, protocol latency, logon stages.

### DataCenter / Rack / Server / StorageVolume
Facility hierarchy with capacity and health facts.

### Incident / Problem / MajorIncident
ITSM-aligned; link to Alert, Insight, Journey, Application, NetworkPath.

### AutomationJob / RemoteAction / WorkflowRun
Execution records with success, target entities, evidence.

### ChangeRecord / Release
Change windows annotated on timelines; link to score deltas.

### InvestigationCase
Collaborative case: participants, pinned widgets, evidence packs, status lifecycle.

### EvidencePack
Immutable snapshot of queries, entity IDs, time range, insight IDs.

### KnowledgeNode / KnowledgeEdge
Graph nodes for semantic search and Digital Twin.

### Prediction
Forecast series with model version, confidence band, target metric.

### Recommendation (extended)
Links to AutomationJob templates and expected DEX/infra lift.

---

## Fact Tables (Session 2)

| Fact | Grain |
|------|-------|
| `fact_network_path_minute` | path × minute |
| `fact_vpn_session` | session |
| `fact_wifi_association_minute` | device × AP × minute |
| `fact_cloud_resource_minute` | resource × minute |
| `fact_vdi_session` | session |
| `fact_dc_server_minute` | server × minute |
| `fact_incident_state` | incident × state change |
| `fact_alert_state` | (extended Session 1) |
| `fact_automation_run` | job run |
| `fact_change_event` | change |
| `fact_case_activity` | case × activity |
| `fact_prediction_daily` | prediction × day |

---

## Relationships

```
Incident 1—N Alert
Incident M—N Insight (evidence)
Case 1—N EvidencePack
Case M—N Participant (Employee)
CloudResource M—N ApplicationDependency
VdiSession → Employee, Device, Broker
NetworkPath M—N Session (contribution)
KnowledgeEdge → KnowledgeNode × 2
AutomationJob → target Device|User|App|Path
ChangeRecord → annotated Timeline
```

---

## Security

- Investigation cases inherit ACL from entities + explicit participants.
- Remote actions require `action.execute` + change window policy.
- Cloud cost/capacity may require `infra.capacity_view`.
- Case exports audited; evidence packs immutable after seal.

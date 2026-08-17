# Document 7 — Competitive Roadmap (12–24 months)

**Status:** implemented · 2026-08-15

---

## Final product questions

### If we only had current V2 data, could Nanoheal credibly sell itself as a serious DEX analytics platform?

**No.**

We could sell **endpoint operations analytics with autoheal outcomes** and **partial experience visibility**. Calling that a full DEX platform against Nexthink/Lakeside would overclaim: missing high-frequency telemetry, system memory, boot/login, sentiment, org identity, and a real experience score.

### Top 10 data/analytics additions to close the biggest gaps

1. **Metric cadence ≤ 60 seconds** for core system gauges (CPU, mem, disk latency, network)  
2. **System memory + page fault metrics**  
3. **Boot + interactive logon timing events**  
4. **Working experience score** (populate/replace `score` with transparent formula)  
5. **Directory-backed cohorts** (dept, BU, location, persona)  
6. **Full device inventory** (OS build, RAM GB, model, age proxies)  
7. **Packet loss / retransmit + Wi-Fi/VPN metric series**  
8. **App launch / ready-time events**  
9. **ITSM linkage** for ticket deflection ROI  
10. **Insight engine + before/after remediation measurement** as productized features  

### 12–24 month roadmap shape

Compete with **fewer, deeper surfaces + closed-loop proof**, not chart count.

---

## Phase A — 0–90 days (make V2 honest & useful)

**Product:** Operations + Reliability story (not “DEX Score” branding yet)

- Ship working dashboards from V2 (outliers, crashes, network, URL, compliance, remediation)  
- Metric dictionary + “no naked averages” UI rules  
- Customer-scoped baselines (MAD/percentile) even on coarse data  
- Noise filters for crash storms  
- Document data gaps in-product (“DATA GAP”) instead of fake insights  

**Exit:** Credible EUC/ops analytics; sales narrative = “actionable endpoint intelligence + autoheal proof”

## Phase B — 3–9 months (become real DEX tech score)

- Agent pack: mem, disk latency, ≤60s sampling, boot/login, loss/Wi-Fi/VPN  
- Identity sync  
- Experience score v1 (technology only)  
- App launch timing  
- 5 story surfaces wired to insight templates  
- Rollup tables for 50k–500k devices  

**Exit:** Technology DEX comparable to mid-market buyers; still behind Nexthink on sentiment

## Phase C — 9–18 months (competitive wedge)

- Sentiment / pulse (optional module)  
- ITSM ROI  
- Investigate workspace (timeline correlation)  
- Vertical packs (e.g. branch banking)  
- Post-remediation uplift always-on  

**Exit:** Differentiated on **fix → prove**, competitive on tech experience

## Phase D — 18–24 months (predictive / prescriptive)

- Risk prediction for disk/network/app failure  
- Prescriptive next-best-action library  
- Cross-customer anonymized benchmarks (opt-in)  

---

## Prioritization principle

| Build | Defer |
|-------|-------|
| Insight templates with impact | 200th specialist chart |
| Cadence + memory + login | Sentiment (until tech score works) |
| Remediation proof | Fancy causal ML |
| Story UX | Flat dashboard sprawl |

---

## Document History

| Date | Change | Status |
|------|--------|--------|
| 2026-08-15 | 12–24 month competitive roadmap | implemented |

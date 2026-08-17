# Changelog

## 2026-08-15 — DEX scoring executable contract (nh_score_v1)

**What:** Added `DEX-Platform-Blueprint/scoring/nh_score_v1.json` + README. Reconciles chat draft with Blueprint: 4-pillar DEX (0.3/0.3/0.2/0.2), Excellent/Good/Fair/Poor bands, boot/login cutoffs aligned to P90 Good/Fair/Poor, client metric scores vs server category/DEX weights, Claude review fixes (`link_util_*_pct`, worst-case window stats, vpn null-until-emitted, proportional renormalize, compliance streak rule). Pointed Volume-3A + metric-catalog-session-1 + Blueprint README at the contract. Supersedes draft technology 70/sentiment 30 and Frustrating/Average/Good labels. README also notes live DATA GAP banner on `computeBranchScores` and that `control_unhealthy_streak_days` is not in `compliance_v2` yet.

**Why:** One source of truth so implementers do not choose between Blueprint and an incompatible draft.

**Files:** `DEX-Platform-Blueprint/scoring/**`, `DEX-Platform-Blueprint/README.md`, `DEX-Platform-Blueprint/metrics/metric-catalog-session-1.md`, `DEX-Platform-Blueprint/docs/SESSION-3/Volume-3A-KPI-Dictionary.md`

**Status:** implemented

## 2026-08-15 — DEX V2 Pinot assessment package

**What:** Added `DEX-V2-Assessment/` with Documents 1–7 (data assessment, competitive analysis, 65-dashboard catalog, gap analysis, insight engine, architecture, roadmap), production SQL templates, live Pinot query snapshot, and working HTML dashboards built from real V2 data (no fabricated metrics).

**Why:** Determine whether current V2 Pinot telemetry can support a competitive DEX platform and define an honest build path vs Nexthink/Lakeside.

**Files:** `DEX-V2-Assessment/**`

**Status:** implemented

## 2026-08-15 — Reconciliation with Claude live audit

**What:** Added `00-RECONCILIATION-CLAUDE-AUDIT.md` after re-querying production Pinot. Confirmed events noise (91.75% one non-fleet device), branch autoheal split (Downtown 100% vs Northside/Westgate/Harborview 0%), dead `score`, irregular 1.7–30h sampling gaps, unwired Blueprint. Corrected Claude on `process_version` (populated). Noted `dashboards/app.js` live app is not in this workspace tree.

**Why:** Lock ground truth across two audits; prevent catalog/blueprint overclaim.

**Status:** implemented

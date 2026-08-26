#!/usr/bin/env python3
"""Build ui-walkthrough/README.md from crawl-meta.json."""
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parent
meta = json.loads((ROOT / "crawl-meta.json").read_text())

DESC = {
    "experience-dashboard": "Tenant home / control tower. Use it to see device health, compliance posture, open alerts, and recommended actions for the selected site at a glance.",
    "home-recent-activity": "Operational activity log — who changed automations, published surveys, pushed software, or linked profiles. Useful when auditing recent admin work. Hub also exposes Ticket Audit and System Events.",
    "automation-config": "Automation library of self-help, autoheal, and scheduler profiles. Browse friendly remediations (disk cleanup, VPN repair, app recovery), open details, then link scope to device groups.",
    "visual-builder": "Workflow Builder for authoring automations visually: pick a template or create custom, add actions, set When (On demand / Event Trigger / Schedule), add Matches / Does not match conditions, review, save, then link or unlink scope.",
    "insights-campaigns": "Survey campaigns for desktop satisfaction, employee satisfaction, and sentiment. Launch and track feedback workflows for the current site.",
    "data-collection": "Catalog of data-collection profiles (performance, storage, user activity, network). Used to decide what telemetry agents gather for DEX and compliance.",
    "protection-policies": "Device protection profiles (registry, services, application control, paths, USB). Apply desired lockdown baselines to classified device groups.",
    "gpo-catalog": "ADMX policy template browser for Windows desired-state. Active templates only — pick a template to create GPO-style policies without repeating inactive catalog versions.",
    "pending-changes": "Pending Publish lists staged configuration changes (link/unlink of automations, SWD, protection, GPO) per machine group before they go live.",
    "innovate-assistant": "Conversational AI Helpdesk (Haya). Ask plain-language estate questions; use suggested prompts and the details panel to drill into devices and issues.",
    "innovate-investigations": "Investigation workspace that shares the Haya conversation surface — continue a helpdesk thread into a structured investigation.",
    "innovate-anomaly": "Anomaly clusters surfaced by Haya. Open a cluster when you need to investigate unusual device or experience patterns.",
    "innovate-forecasts": "Forecast instances bound to Studio-published definitions — projected capacity, risk, or experience trends.",
    "innovate-query-builder": "Ad-hoc analytics: choose dimensions and measures, apply JSON filters, and Execute for custom estate questions.",
    "innovate-agent-workbench": "Agent chat workbench with smart recommendations driven by telemetry — explore remediation ideas before pushing them.",
    "innovate-alerts": "Alert triage surface (Haya conversation in this build) for operational notifications.",
    "dex-dashboards": "Catalog of Digital Experience (DEX) and device reports — search/filter and open View for each report definition.",
    "dex-reports": "Executive Digital Experience Overview — fleet score, device counts, sentiment, trends, and experience pillars for leadership.",
    "dex-employee": "Employee Experience story: sentiment, respondents, and complaint themes that explain how people feel about their devices.",
    "dex-device": "Device Experience story: satisfaction plus boot/hardware health signals that drive endpoint quality.",
    "dex-application": "Application Experience story: business and collaboration app scores (Teams, browsers, Office, etc.).",
    "dex-network": "Network Experience story: infrastructure performance, latency, and connectivity impact by site.",
    "compliance-score": "Digital Experience dashboard (fleet DEX score, location impact, and experience drivers) — not an external BI login.",
    "dex-benchmarks": "Benchmarks comparing satisfaction indexes against endpoint performance so you can spot outliers.",
    "compliance-trends": "Trends placeholder for historical posture reporting (coming soon).",
    "census": "Device inventory (Census) — OS filters, search, add device, export, and health chips for the managed fleet.",
    "devices-device-explorer": "Coming soon — planned device search + full profile explorer.",
    "actions-results": "Execution History of solutions pushed to devices — success, failed, and pending runs with profile and machine context.",
    "automate-remote-execution": "Remote Execution: pick a linked remediation and run it now against a site, group, or device when you need immediate fix-forward.",
    "manage-swd": "Software Distribution — install and uninstall profiles plus snippets. Create packages, then deploy them to rings or groups.",
    "swd-push-audit": "Software distribution Deploy queue — per-device audit of install/uninstall jobs (queued, success, failed).",
    "manage-patch": "Coming soon — Windows Update / patch tracking.",
    "issues-compliance-violations": "Violations triage (Haya conversation in this build).",
    "tenants": "Organisation tenants/sites — names, Nanoheal organization, tenant keys, active installs, and license pools.",
    "org-branding": "Coming soon — branding on the IA roadmap.",
    "admin-licensing": "License pools — entitlements, seat usage, and which sites consume which pool.",
    "platform-integration": "Integrations hub: Connectors, API Keys, API catalog, and Event Subscriptions for ITSM/SIEM and partner systems.",
    "admin-agent-mgmt": "Agent Management — versions & rings, device updates, version catalog, and package uploads.",
    "access-security": "Users & Access — accounts, roles/RBAC, SSO, and MFA policy for who can operate the console.",
    "settings-security": "Coming soon — certificates/secrets and GDPR ops placeholders.",
    "device-classification": "Device classification groups used for targeting automations, SWD, and protection policies.",
    "audit-logs": "Administration Audit hub — activity logs of console actions, plus ticket and system event views for governance.",
    "scoring": "Score Models — metrics that feed DEX and operations scoring (responsiveness, boot time, composite experience, deflection, etc.).",
    "account-profile": "Personal profile — display name, timezone, and password for the signed-in operator.",
    "account-preferences": "Theme and accent color preferences for the console chrome.",
    "header-help-feedback": "Help & Feedback — submit product feedback or open help from the header.",
}

sections_order = [
    "Home",
    "Automate",
    "Innovate",
    "Experience",
    "Manage",
    "Administration",
    "Settings",
    "Header",
    "DEX report views",
    "Create / edit overlays",
    "Device detail",
    "Disabled menu",
    "Workflow Builder deep",
    "Software Distribution deep",
]

by_sec = {s: [] for s in sections_order}
for r in meta["results"]:
    by_sec.setdefault(r.get("section") or "Other", []).append(r)

counts = meta.get("counts") or {}
lines = [
    "# Live AEX product — UI walkthrough",
    "",
    "**Status:** implemented · 2026-08-25 (pass 3 — seeded data + DEX dashboard + workflow/SWD deep flows)",
    f"**Source:** `{meta.get('base', 'http://localhost:5176')}` (admin session)",
    "**Scope:** Enabled sidebar pages, disabled menu routes, DEX report views, create/edit overlays, device detail, Workflow Builder deep steps, Software Distribution create/deploy",
    "**Screenshots:** `screenshots/` (1440×900; taken after shell + content ready — not mid-skeleton)",
    "**Recapture:** `node crawl-screenshots.mjs` then `node crawl-deep-flows.mjs` then `python3 generate-readme.py`",
    "",
    "## How to read this",
    "",
    "Each entry is one navigable product surface or overlay. Descriptions come from live UI copy and observed behavior. Items marked **Coming soon / placeholder** have nav wired but limited UI. **Disabled menu** items are `enabled: false` in `MenuItems` but still reachable by URL.",
    "",
    f"**Captured:** {counts.get('ok', sum(1 for r in meta['results'] if r.get('ok')))}/{len(meta['results'])} ok · {meta.get('capturedAt', '')}",
    "",
]

if counts:
    lines += [
        "| Bucket | Count |",
        "| --- | ---: |",
        f"| Enabled pages | {counts.get('enabledPages', '—')} |",
        f"| Disabled menu | {counts.get('disabledMenu', '—')} |",
        f"| DEX report views | {counts.get('dexReports', '—')} |",
        f"| Total results (incl. overlays/detail) | {counts.get('totalResults', len(meta['results']))} |",
        "",
    ]

coming = [
    f"{r.get('section')} / {r.get('label')}"
    for r in meta["results"]
    if (r.get("notes") or {}).get("comingSoon")
]
if coming:
    lines.append("### Placeholder / coming soon in this build")
    lines.append("")
    for c in coming:
        lines.append(f"- {c}")
    lines.append("")

failed = [r for r in meta["results"] if not r.get("ok")]
if failed:
    lines.append("### Capture failures")
    lines.append("")
    for r in failed:
        lines.append(f"- **{r.get('section')} / {r.get('label')}** — `{r.get('error', 'unknown')}`")
    lines.append("")

for sec in sections_order:
    items = by_sec.get(sec) or []
    if not items:
        continue
    lines.append(f"## {sec}")
    lines.append("")
    for r in items:
        n = r.get("notes") or {}
        h1 = (n.get("h1") or "").strip()
        label = r.get("label") or r.get("id") or "Untitled"
        if h1 and h1.lower() != label.lower():
            title = f"{label} — {h1}"
        else:
            title = label
        tags = []
        if n.get("comingSoon"):
            tags.append("coming soon / placeholder")
        if r.get("menuEnabled") is False:
            tags.append("menu disabled")
        if r.get("kind") == "drawer":
            tags.append("drawer")
        if not r.get("ok"):
            tags.append("capture failed")
        tag = f" *({'; '.join(tags)})*" if tags else ""

        desc = DESC.get(r.get("id") or "", "")
        if not desc and r.get("description"):
            desc = r["description"]
        if not desc:
            desc = (n.get("snippet") or "")[:240] or "(see screenshot)"

        lines.append(f"### {title}{tag}")
        lines.append("")
        if r.get("path"):
            lines.append(f"- **Path:** `{r['path']}`")
        if r.get("category"):
            lines.append(f"- **Category:** {r['category']}")
        final = r.get("finalUrl") or ""
        if final and r.get("path") and r["path"] not in final:
            lines.append(f"- **Resolved URL:** `{final}`")
        lines.append(f"- **What it does:** {desc}")
        if r.get("file"):
            lines.append(f"- **Screenshot:** ![{label}](screenshots/{r['file']})")
        lines.append("")

(ROOT / "README.md").write_text("\n".join(lines) + "\n")
print(f"Wrote README with {len(meta['results'])} entries")

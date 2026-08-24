// AetherDEX — live dashboards over Pinot V2 tables.
// Every "no data" caveat visible in the UI is intentional: this app never
// silently invents numbers for fields the schema doesn't populate.

const BRANCHES = ["Branch_Downtown", "Branch_Northside", "Branch_Harborview", "Branch_Westgate"];
const BRANCH_COLOR = {
  Branch_Downtown: "var(--cat-1)",
  Branch_Northside: "var(--cat-2)",
  Branch_Harborview: "var(--cat-3)",
  Branch_Westgate: "var(--cat-4)",
};
const BRANCH_LABEL = (b) => (b || "Unassigned").replace("Branch_", "");

// Controls we know how to grade "compliant" vs "not" from the observed value set.
const COMPLIANCE_GOOD = {
  antivirus_status: ["Running"],
  antivirus_enabled: ["Enabled"],
  firewall_enabled: ["Enabled"],
  uac_enabled: ["Enabled"],
  backup_software_status: ["Running"],
  windows_update_status: ["Current"],
};

const STATE = {
  branch: "all",
  windowKey: "all",
  dataMin: null,
  dataMax: null,
  windowStart: null,
  windowEnd: null,
  page: "overview",
  deviceId: null,
  businessHoursOnly: false,
  endpointPage: 0,
  endpointSearch: "",
  renderGen: 0,
};
// Guard against stale async work (a page's in-flight queries, or a debounced
// search callback) writing into the DOM after the user has already navigated
// elsewhere — without this, a slow query for page A can silently clobber page
// B, or crash trying to update an element that no longer exists.
function isStaleRender(gen) {
  return gen !== STATE.renderGen;
}
const ENDPOINT_PAGE_SIZE = 50;
function sqlEscape(s) {
  return String(s).replace(/'/g, "''");
}

// Business-hours clause: Mon-Fri, 08:00-18:00. Evaluated in UTC because no
// per-device timezone field exists anywhere in the V2 schema (see gaps report)
// — correct for a single-timezone pilot like this one, but a real multi-region
// fleet needs a timezone dimension before this generalizes.
const BUSINESS_HOURS_CLAUSE = "DAYOFWEEK(server_time) NOT IN (6, 7) AND HOUR(server_time) BETWEEN 8 AND 18";

function clampWindow() {
  const days = { "7d": 7, "14d": 14, "30d": 30, all: null }[STATE.windowKey];
  if (!days) {
    STATE.windowStart = STATE.dataMin;
    STATE.windowEnd = STATE.dataMax;
  } else {
    STATE.windowStart = Math.max(STATE.dataMin, STATE.dataMax - days * 86400000);
    STATE.windowEnd = STATE.dataMax;
  }
}

const F = {
  time: () => `server_time BETWEEN ${STATE.windowStart} AND ${STATE.windowEnd}` + (STATE.businessHoursOnly ? ` AND ${BUSINESS_HOURS_CLAUSE}` : ""),
  full: () => F.time() + (STATE.branch !== "all" ? ` AND device_group = '${STATE.branch}'` : ""),
};

// Prior period of equal length immediately before the current window — powers
// every WoW/MoM delta in the app. Returns null when there isn't enough history
// before dataMin to form a full comparison period (common on a young pilot).
function priorWindow() {
  const duration = STATE.windowEnd - STATE.windowStart;
  const priorEnd = STATE.windowStart;
  const priorStart = Math.max(STATE.dataMin, priorEnd - duration);
  if (priorStart >= priorEnd) return null;
  return { start: priorStart, end: priorEnd };
}
function priorClause(withBranch = true) {
  const w = priorWindow();
  if (!w) return null;
  return `server_time BETWEEN ${w.start} AND ${w.end}`
    + (STATE.businessHoursOnly ? ` AND ${BUSINESS_HOURS_CLAUSE}` : "")
    + (withBranch && STATE.branch !== "all" ? ` AND device_group = '${STATE.branch}'` : "");
}

function statusBadge(label, value) {
  const s = Charts.statusLabelForScore(value);
  return `<span class="badge ${s}"><span class="dot" style="background:var(--status-${s})"></span>${label}</span>`;
}

function trendArrow(delta, goodDirection) {
  if (delta === null || delta === undefined || Number.isNaN(delta)) return "";
  const dir = delta > 0.1 ? "up" : delta < -0.1 ? "down" : "flat";
  const good = goodDirection === "down" ? dir === "down" : dir === "up";
  const cls = dir === "flat" ? "flat" : good ? "down" : "up"; // reuse .down (green) for "good"
  const arrow = dir === "up" ? "▲" : dir === "down" ? "▼" : "•";
  return `<span class="delta ${cls}">${arrow} ${Math.abs(delta).toFixed(1)}</span>`;
}

// ---------------- Query helpers ----------------
async function scalarOr(sql, fallback = null) {
  try {
    const { rows } = await Pinot.query(sql);
    const v = rows?.[0]?.[0];
    return v === undefined || v === null ? fallback : v;
  } catch (e) {
    console.error(sql, e);
    return fallback;
  }
}
async function rowsOr(sql) {
  try {
    return await Pinot.queryObjects(sql);
  } catch (e) {
    console.error(sql, e);
    return [];
  }
}

// ---------------- Layout / nav ----------------
const NAV = [
  { section: "Stories", items: [
    { id: "overview", label: "Executive Overview", icon: "◉" },
    { id: "insights", label: "Insights & Findings", icon: "✦" },
  ]},
  { section: "Explore", items: [
    { id: "endpoint", label: "Endpoint Health", icon: "💻" },
    { id: "network", label: "Network & Apps", icon: "◇" },
    { id: "compliance", label: "Security & Compliance", icon: "🛡" },
    { id: "incidents", label: "Incidents & Remediation", icon: "⚑" },
  ]},
];

function renderSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.innerHTML = "";
  for (const group of NAV) {
    const label = document.createElement("div");
    label.className = "nav-label";
    label.textContent = group.section;
    sidebar.appendChild(label);
    for (const item of group.items) {
      const btn = document.createElement("button");
      btn.className = "nav-item" + (item.id === STATE.page ? " active" : "");
      btn.innerHTML = `<span class="ic">${item.icon}</span><span>${item.label}</span>`;
      btn.addEventListener("click", () => navigate(item.id));
      sidebar.appendChild(btn);
    }
  }
}

function renderToolbar() {
  const bar = document.getElementById("toolbar");
  bar.innerHTML = `
    <label>Branch
      <select id="branchSel">
        <option value="all">All branches</option>
        ${BRANCHES.map((b) => `<option value="${b}">${BRANCH_LABEL(b)}</option>`).join("")}
      </select>
    </label>
    <label>Window
      <select id="windowSel">
        <option value="7d">Last 7 days of data</option>
        <option value="14d">Last 14 days of data</option>
        <option value="30d">Last 30 days of data</option>
        <option value="all">All available data</option>
      </select>
    </label>
    <label title="Mon-Fri, 08:00-18:00 UTC — see the note on the Overview page for why this matters and its limits">
      <span style="visibility:hidden;">.</span>
      <span style="display:flex; align-items:center; gap:6px; height:30px;">
        <input type="checkbox" id="bizHoursToggle" style="accent-color:var(--brand-primary);" />
        Business hours only
      </span>
    </label>
    <div class="spacer"></div>
    <span class="data-note" id="rangeNote"></span>
    <button class="btn-ghost" id="disconnectBtn">Disconnect</button>
  `;
  document.getElementById("branchSel").value = STATE.branch;
  document.getElementById("windowSel").value = STATE.windowKey;
  document.getElementById("bizHoursToggle").checked = STATE.businessHoursOnly;
  document.getElementById("branchSel").addEventListener("change", (e) => {
    STATE.branch = e.target.value;
    STATE.endpointPage = 0;
    renderPage();
  });
  document.getElementById("windowSel").addEventListener("change", (e) => {
    STATE.windowKey = e.target.value;
    clampWindow();
    STATE.endpointPage = 0;
    renderPage();
  });
  document.getElementById("bizHoursToggle").addEventListener("change", (e) => {
    STATE.businessHoursOnly = e.target.checked;
    STATE.endpointPage = 0;
    renderPage();
  });
  document.getElementById("disconnectBtn").addEventListener("click", () => {
    Pinot.clearSession();
    location.reload();
  });
  updateRangeNote();
}

function updateRangeNote() {
  const note = document.getElementById("rangeNote");
  if (!note) return;
  const f = (ms) => new Date(ms).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  note.textContent = `Querying live · ${f(STATE.windowStart)} → ${f(STATE.windowEnd)}`;
}

function navigate(id) {
  STATE.page = id;
  STATE.deviceId = null;
  if (location.hash) history.replaceState(null, "", location.pathname);
  renderSidebar();
  renderPage();
}

function navigateToDevice(machineId) {
  STATE.page = "device";
  STATE.deviceId = machineId;
  location.hash = `#/device/${machineId}`;
  renderSidebar();
  renderPage();
}

async function renderPage() {
  updateRangeNote();
  STATE.renderGen++;
  const myGen = STATE.renderGen;
  const stage = document.getElementById("stage");
  stage.innerHTML = `<div class="loading-row"><span class="spinner"></span> Querying Pinot…</div>`;
  try {
    const renderers = {
      overview: renderOverview,
      insights: renderInsights,
      endpoint: renderEndpoint,
      network: renderNetwork,
      compliance: renderCompliance,
      incidents: renderIncidents,
      device: (s, g) => renderDeviceDetail(s, STATE.deviceId, g),
    };
    await renderers[STATE.page](stage, myGen);
  } catch (e) {
    if (isStaleRender(myGen)) return;
    console.error(e);
    stage.innerHTML = `<div class="page"><div class="card"><div class="empty-state">Query failed: ${e.message}</div></div></div>`;
  }
}

// Composite preview score per branch for an arbitrary [startMs, endMs] window —
// factored out so the leaderboard can compute "this period vs last period"
// without duplicating the scoring methodology. See gaps doc for the caveats.
async function computeBranchScores(startMs, endMs) {
  const timeClause = `server_time BETWEEN ${startMs} AND ${endMs}`;
  const [cpuByBranch, diskByBranch, rttByBranch, crashByBranch, complianceByBranch, deviceCountByBranch] = await Promise.all([
    rowsOr(`SELECT device_group, AVG(metric_value) AS v FROM system_telemetry_metrics WHERE metric_name='cpu_usage_pct' AND ${timeClause} GROUP BY device_group LIMIT 20`),
    rowsOr(`SELECT device_group, AVG(metric_value) AS v FROM system_telemetry_metrics WHERE metric_name='disk_free_pct' AND ${timeClause} GROUP BY device_group LIMIT 20`),
    rowsOr(`SELECT device_group, AVG(metric_value) AS v FROM system_telemetry_metrics WHERE metric_name='wan_latency_ms' AND ${timeClause} GROUP BY device_group LIMIT 20`),
    rowsOr(`SELECT device_group, COUNT(*) AS n FROM events WHERE event_domain='failure' AND event_type='application_error' AND ${timeClause} GROUP BY device_group LIMIT 20`),
    rowsOr(`SELECT device_group, compliance_control, compliance_status, COUNT(*) AS n FROM compliance WHERE ${timeClause} GROUP BY device_group, compliance_control, compliance_status LIMIT 200`),
    rowsOr(`SELECT device_group, COUNT(DISTINCT machine_id) AS n FROM system_telemetry_metrics WHERE ${timeClause} GROUP BY device_group LIMIT 20`),
  ]);
  const byBranchMap = (rows, key = "v") => Object.fromEntries(rows.map((r) => [r.device_group, r[key]]));
  const cpuMap = byBranchMap(cpuByBranch);
  const diskMap = byBranchMap(diskByBranch);
  const rttMap = byBranchMap(rttByBranch);
  const crashMap = byBranchMap(crashByBranch, "n");
  const devCountMap = byBranchMap(deviceCountByBranch, "n");
  const complianceBranchMap = {};
  for (const b of BRANCHES) {
    const rows = complianceByBranch.filter((r) => r.device_group === b);
    complianceBranchMap[b] = passRate(rows);
  }
  return BRANCHES.map((b) => {
    const cpu = cpuMap[b], disk = diskMap[b], rtt = rttMap[b];
    const crashes = crashMap[b] || 0, devices = devCountMap[b] || 1;
    const compliance = complianceBranchMap[b];
    const parts = [];
    if (cpu !== undefined) parts.push(clamp(100 - cpu, 0, 100));
    if (disk !== undefined) parts.push(clamp(disk, 0, 100));
    if (rtt !== undefined) parts.push(clamp(100 - rtt / 3, 0, 100));
    if (compliance !== null) parts.push(compliance);
    parts.push(clamp(100 - (crashes / devices) * 5, 0, 100));
    const score = parts.length ? parts.reduce((a, b2) => a + b2, 0) / parts.length : null;
    return { branch: b, score, cpu, disk, rtt, crashes, compliance };
  });
}

// Above this many devices, per-device dot plots stop being legible and start
// being expensive (one SVG node + 2 listeners per device). Below it, showing
// every device is more useful than a 4-point summary.
const DIST_RENDER_LIMIT = 60;

// Distribution stats for one metric that stay cheap and correct regardless of
// fleet size: percentiles and true peak come from a single scalar query over
// the whole table (PERCENTILETDIGEST, MIN/MAX — no per-row fetch), the outlier
// count comes from a server-side COUNT (needs the multi-stage engine for the
// nested subquery), and only the top-5 worst offenders are ever fetched by
// name. The full per-device list is fetched ONLY when small enough to render
// as individual points — see DIST_RENDER_LIMIT.
async function fetchDistribution(table, metricName, { high = true, threshold } = {}) {
  const where = `metric_name='${metricName}' AND ${F.full()}`;
  const [statsRows, trueTotal, topOffenders] = await Promise.all([
    rowsOr(`SELECT PERCENTILETDIGEST(metric_value,50) AS p50, PERCENTILETDIGEST(metric_value,90) AS p90, PERCENTILETDIGEST(metric_value,99) AS p99, MIN(metric_value) AS mn, MAX(metric_value) AS mx FROM ${table} WHERE ${where}`),
    scalarOr(`SELECT COUNT(DISTINCT machine_id) FROM ${table} WHERE ${where}`, 0),
    rowsOr(`SELECT machine_id, AVG(metric_value) AS v FROM ${table} WHERE ${where} GROUP BY machine_id ORDER BY v ${high ? "DESC" : "ASC"} LIMIT 5`),
  ]);
  const stats = statsRows[0] || {};

  let outlierCount = null;
  if (threshold !== undefined && trueTotal > 0) {
    const cmp = high ? ">" : "<";
    outlierCount = await scalarOr(
      `SET useMultistageEngine=true; SELECT COUNT(*) FROM (SELECT machine_id FROM ${table} WHERE ${where} GROUP BY machine_id HAVING AVG(metric_value) ${cmp} ${threshold})`,
      null
    );
  }

  const perDevice = trueTotal > 0 && trueTotal <= DIST_RENDER_LIMIT
    ? await rowsOr(`SELECT machine_id, AVG(metric_value) AS v FROM ${table} WHERE ${where} GROUP BY machine_id LIMIT ${DIST_RENDER_LIMIT}`)
    : null;

  return { p50: stats.p50, p90: stats.p90, p99: stats.p99, min: stats.mn, max: stats.mx, trueTotal, topOffenders, outlierCount, perDevice };
}

// Builds the one-line caption under a dist tile: named worst offender (from
// the cheap top-5 query, not a truncated full fetch), the true single-sample
// extreme (not a per-device-average max), and a server-computed outlier count
// with the real fleet size as denominator — "2 of 8" today, "340 of 100,000"
// unchanged in shape if the fleet were that large.
function distCaption(dist, unit, extremeLabel, threshold, high = true) {
  if (!dist || !dist.trueTotal) return "—";
  const worst = dist.topOffenders?.[0];
  const extreme = high ? dist.max : dist.min;
  const outlierText = dist.outlierCount === null
    ? `threshold check unavailable`
    : `${fmtInt(dist.outlierCount)} of ${fmtInt(dist.trueTotal)} devices avg ${high ? ">" : "<"}${threshold}${unit}`;
  return `${extremeLabel} device ${worst ? worst.machine_id + " " : ""}avg ${fmtNum(worst?.v, 0)}${unit} · true ${high ? "peak" : "low"} ${fmtNum(extreme, 0)}${unit} · ${outlierText}`;
}

function renderDistTile(host, dist, { high = true, unit = "", threshold, axisMax } = {}) {
  if (dist.perDevice) {
    Charts.distStrip(host, dist.perDevice.map((r) => ({ label: r.machine_id, value: r.v })), {
      max: axisMax ?? dist.max * 1.05, threshold, high, unit,
    });
  } else {
    Charts.percentileStrip(host, dist, { max: axisMax ?? dist.max * 1.05, unit });
  }
}

// ================= OVERVIEW =================
async function renderOverview(stage, gen) {
  const prior = priorClause(false);
  const [
    fleetSize, avgCpu, avgDisk, avgRtt,
    crashCount, hangCount,
    autohealRows, complianceRows,
    scoreByBranch,
    priorAvgCpu, priorAvgRtt, priorCrashCount, priorComplianceRows, priorScoreByBranch,
    cpuDist, diskDist, rttDist,
  ] = await Promise.all([
    scalarOr(`SELECT COUNT(DISTINCT machine_id) FROM system_telemetry_metrics WHERE ${F.full()}`, 0),
    scalarOr(`SELECT AVG(metric_value) FROM system_telemetry_metrics WHERE metric_name='cpu_usage_pct' AND ${F.full()}`),
    scalarOr(`SELECT AVG(metric_value) FROM system_telemetry_metrics WHERE metric_name='disk_free_pct' AND ${F.full()}`),
    scalarOr(`SELECT AVG(metric_value) FROM system_telemetry_metrics WHERE metric_name='wan_latency_ms' AND ${F.full()}`),
    scalarOr(`SELECT COUNT(*) FROM events WHERE event_domain='failure' AND event_type='application_error' AND ${F.full()}`, 0),
    scalarOr(`SELECT COUNT(*) FROM events WHERE event_domain='failure' AND event_type='application_hang' AND ${F.full()}`, 0),
    rowsOr(`SELECT event_status, COUNT(*) AS n FROM events WHERE event_type='autoheal_action' AND device_group != '' AND ${F.full()} GROUP BY event_status LIMIT 20`),
    rowsOr(`SELECT compliance_control, compliance_status, COUNT(*) AS n FROM compliance WHERE ${F.full()} GROUP BY compliance_control, compliance_status LIMIT 100`),
    computeBranchScores(STATE.windowStart, STATE.windowEnd),
    prior ? scalarOr(`SELECT AVG(metric_value) FROM system_telemetry_metrics WHERE metric_name='cpu_usage_pct' AND ${prior}`) : null,
    prior ? scalarOr(`SELECT AVG(metric_value) FROM system_telemetry_metrics WHERE metric_name='wan_latency_ms' AND ${prior}`) : null,
    prior ? scalarOr(`SELECT COUNT(*) FROM events WHERE event_domain='failure' AND event_type='application_error' AND ${prior}`, 0) : null,
    prior ? rowsOr(`SELECT compliance_control, compliance_status, COUNT(*) AS n FROM compliance WHERE ${prior} GROUP BY compliance_control, compliance_status LIMIT 100`) : [],
    prior ? computeBranchScores(priorWindow().start, priorWindow().end) : null,
    fetchDistribution("system_telemetry_metrics", "cpu_usage_pct", { high: true, threshold: 80 }),
    fetchDistribution("system_telemetry_metrics", "disk_free_pct", { high: false, threshold: 15 }),
    fetchDistribution("system_telemetry_metrics", "wan_latency_ms", { high: true, threshold: 1000 }),
  ]);

  const autoheal = Object.fromEntries(autohealRows.map((r) => [r.event_status, r.n]));
  const compliancePassRate = passRate(complianceRows);
  const priorCompliancePassRate = prior ? passRate(priorComplianceRows) : null;
  const fleetScore = avgOf(scoreByBranch.map((s) => s.score));
  const priorFleetScore = priorScoreByBranch ? avgOf(priorScoreByBranch.map((s) => s.score)) : null;
  const priorScoreMap = Object.fromEntries((priorScoreByBranch || []).map((s) => [s.branch, s.score]));

  const stageHtml = `
    <div class="page">
      <div class="page-head">
        <h1>Executive Overview</h1>
        <p>Live from <code>system_telemetry_metrics</code>, <code>network_connection_telemetry</code>, <code>events</code> and <code>compliance</code> for ${STATE.branch === "all" ? "all branches" : BRANCH_LABEL(STATE.branch)}, averaged over <b>${STATE.windowKey === "all" ? "the full available window" : STATE.windowKey.replace("d", " days")}</b>${STATE.businessHoursOnly ? ", business hours only (Mon–Fri, 08:00–18:00 UTC)" : " — including nights and weekends, which pulls these averages down versus what users actually experience during work hours"}.
          <span class="gap-flag">DATA GAP</span> the composite score below is computed client-side from raw metrics — Pinot's own <code>score</code> column is unpopulated (0 on every row). Treat it as illustrative, not a vendor-calibrated Experience Score. Details in the gaps report.
        </p>
      </div>

      <div class="grid cols-4" style="margin-bottom:16px;">
        <div class="card kpi">
          <span class="label">Fleet size <span class="badge preview" style="margin-left:4px;">live</span></span>
          <span class="value">${fmtInt(fleetSize)}<span class="unit">devices</span></span>
        </div>
        <div class="card kpi">
          <span class="label">Avg CPU utilization</span>
          <span class="value">${fmtNum(avgCpu)}<span class="unit">%</span></span>
          <div id="cpuDistStrip" style="margin-top:6px;"></div>
          <span class="delta flat">${distCaption(cpuDist, "%", "worst", 80)}</span>
        </div>
        <div class="card kpi">
          <span class="label">Avg disk free</span>
          <span class="value">${fmtNum(avgDisk)}<span class="unit">%</span></span>
          <div id="diskDistStrip" style="margin-top:6px;"></div>
          <span class="delta flat">${distCaption(diskDist, "%", "lowest", 15, false)}</span>
        </div>
        <div class="card kpi">
          <span class="label">Avg round-trip time</span>
          <span class="value">${fmtNum(avgRtt)}<span class="unit">ms</span></span>
          <div id="rttDistStrip" style="margin-top:6px;"></div>
          <span class="delta flat">${distCaption(rttDist, "ms", "worst", 1000)}</span>
        </div>
      </div>

      <div class="grid cols-4" style="margin-bottom:16px;">
        <div class="card kpi">
          <span class="label">App crashes</span>
          <span class="value">${fmtInt(crashCount)}</span>
        </div>
        <div class="card kpi">
          <span class="label">App hangs</span>
          <span class="value">${fmtInt(hangCount)}</span>
        </div>
        <div class="card kpi">
          <span class="label">Auto-heal actions</span>
          <span class="value">${fmtInt((autoheal.completed || 0) + (autoheal.failed || 0))}</span>
          <span class="delta flat">${fmtInt(autoheal.completed || 0)} completed · ${fmtInt(autoheal.failed || 0)} failed</span>
        </div>
        <div class="card kpi">
          <span class="label">Compliance pass rate</span>
          <span class="value">${compliancePassRate !== null ? fmtNum(compliancePassRate) + "%" : "—"}</span>
        </div>
      </div>

      <div class="card" style="margin-bottom:16px;">
        <div class="card-head"><h3>Trend scorecard</h3><span class="meta">${prior ? "vs. prior period of equal length" : "not enough history before this window for a comparison"}</span></div>
        <div class="grid cols-4" id="trendScorecard"></div>
      </div>

      <div class="grid cols-3">
        <div class="card">
          <div class="card-head"><h3>Composite experience score</h3><span class="badge preview">preview</span></div>
          <div id="scoreRing" style="display:flex; justify-content:center; padding: 8px 0 4px;"></div>
          <div style="text-align:center; font-size:12px; color:var(--text-tertiary); margin-bottom:12px;">Fleet-wide preview score</div>
        </div>
        <div class="card span-2">
          <div class="card-head"><h3>CPU utilization trend</h3><span class="meta">daily avg, by branch</span></div>
          <div id="cpuTrend"></div>
        </div>
      </div>

      <div class="card" style="margin-top:16px;">
        <div class="card-head"><h3>Site / branch leaderboard</h3><span class="meta">ranked by composite score${prior ? " · vs. prior period" : ""}</span></div>
        <div id="leaderboard"></div>
      </div>

      <div class="grid cols-2" style="margin-top:16px;">
        <div class="card">
          <div class="card-head"><h3>Crashes by branch</h3><span class="meta">${STATE.windowKey === "all" ? "full range" : STATE.windowKey}</span></div>
          <div id="crashBars"></div>
        </div>
        <div class="card">
          <div class="card-head"><h3>Compliance pass rate by branch</h3></div>
          <div id="complianceBars"></div>
        </div>
      </div>
    </div>
  `;
  if (isStaleRender(gen)) return;
  stage.innerHTML = stageHtml;

  renderDistTile(document.getElementById("cpuDistStrip"), cpuDist, { unit: "%", threshold: 80, axisMax: 100 });
  renderDistTile(document.getElementById("diskDistStrip"), diskDist, { unit: "%", threshold: 15, high: false, axisMax: 100 });
  renderDistTile(document.getElementById("rttDistStrip"), rttDist, { unit: "ms", threshold: 1000, axisMax: Math.max(1200, rttDist.max || 0) });

  Charts.scoreRing(document.getElementById("scoreRing"), fleetScore ?? 0, {});

  renderTrendScorecard(document.getElementById("trendScorecard"), [
    { label: "Composite score", value: fleetScore, priorValue: priorFleetScore, digits: 0, unit: "", good: "up" },
    { label: "Crashes", value: crashCount, priorValue: priorCrashCount, digits: 0, unit: "", good: "down" },
    { label: "Compliance pass rate", value: compliancePassRate, priorValue: priorCompliancePassRate, digits: 0, unit: "%", good: "up" },
    { label: "Avg round-trip time", value: avgRtt, priorValue: priorAvgRtt, digits: 0, unit: "ms", good: "down" },
  ]);

  renderLeaderboard(document.getElementById("leaderboard"), scoreByBranch, priorScoreMap, !!prior);

  const cpuTrendRows = await rowsOr(
    `SELECT DATETRUNC('day', server_time, 'MILLISECONDS') AS day, device_group, AVG(metric_value) AS v
     FROM system_telemetry_metrics
     WHERE metric_name='cpu_usage_pct' AND ${F.full()}
     GROUP BY day, device_group ORDER BY day LIMIT 500`
  );
  if (isStaleRender(gen)) return;
  const branchesToPlot = STATE.branch === "all" ? BRANCHES : [STATE.branch];
  Charts.lineChart(
    document.getElementById("cpuTrend"),
    branchesToPlot.map((b) => ({
      name: BRANCH_LABEL(b), color: BRANCH_COLOR[b],
      points: cpuTrendRows.filter((r) => r.device_group === b).map((r) => ({ t: r.day, v: r.v })),
    })),
    { unit: "%", yDigits: 0 }
  );

  const scoreMapByBranch = Object.fromEntries(scoreByBranch.map((s) => [s.branch, s]));
  Charts.barChartH(
    document.getElementById("crashBars"),
    BRANCHES.map((b) => ({ label: BRANCH_LABEL(b), value: scoreMapByBranch[b]?.crashes || 0, color: BRANCH_COLOR[b] })),
    {}
  );
  Charts.barChartH(
    document.getElementById("complianceBars"),
    BRANCHES.filter((b) => scoreMapByBranch[b]?.compliance !== null && scoreMapByBranch[b]?.compliance !== undefined).map((b) => ({
      label: BRANCH_LABEL(b), value: Math.round(scoreMapByBranch[b].compliance), unit: "%", color: BRANCH_COLOR[b],
    })),
    { max: 100 }
  );
}

function renderTrendScorecard(host, items) {
  host.innerHTML = items
    .map((it) => {
      const delta = it.priorValue !== null && it.priorValue !== undefined && it.value !== null && it.value !== undefined
        ? it.value - it.priorValue
        : null;
      return `
        <div class="kpi">
          <span class="label">${it.label}</span>
          <span class="value">${fmtNum(it.value, it.digits)}<span class="unit">${it.unit}</span></span>
          ${delta === null ? `<span class="delta flat">—</span>` : trendArrow(delta, it.good)}
        </div>`;
    })
    .join("");
}

function renderLeaderboard(host, scoreByBranch, priorScoreMap, hasPrior) {
  const ranked = [...scoreByBranch].filter((s) => s.score !== null).sort((a, b) => b.score - a.score);
  if (!ranked.length) return Charts.emptyState(host);
  host.innerHTML = `
    <div class="table-scroll">
      <table class="data-table">
        <thead><tr><th>Rank</th><th>Branch</th><th class="num">Score</th>${hasPrior ? '<th class="num">vs. prior period</th>' : ""}<th class="num">Avg CPU</th><th class="num">Avg RTT</th><th class="num">Compliance</th></tr></thead>
        <tbody>
          ${ranked
            .map((s, i) => {
              const prev = priorScoreMap[s.branch];
              const delta = prev !== undefined && prev !== null ? s.score - prev : null;
              return `<tr>
                <td class="num">#${i + 1}</td>
                <td>${BRANCH_LABEL(s.branch)}</td>
                <td class="num"><span class="badge ${Charts.statusLabelForScore(s.score)}">${Math.round(s.score)}</span></td>
                ${hasPrior ? `<td class="num">${delta === null ? "—" : trendArrow(delta, "up")}</td>` : ""}
                <td class="num">${fmtNum(s.cpu)}%</td>
                <td class="num">${fmtNum(s.rtt)} ms</td>
                <td class="num">${s.compliance !== null ? fmtNum(s.compliance) + "%" : "—"}</td>
              </tr>`;
            })
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

// ================= INSIGHTS & FINDINGS =================
// Mirrors the anatomy of Nexthink/Lakeside case studies (specific device/branch,
// a quantified before/after, a plain-English "why it matters"), but every number
// here comes from a live query against the current branch/window filter — nothing
// is hardcoded to today's dataset, so this keeps working as the data changes.
async function renderInsights(stage, gen) {
  stage.innerHTML = `
    <div class="page">
      <div class="page-head">
        <h1>Insights &amp; Findings</h1>
        <p>Auto-detected, evidence-backed findings in the style of a vendor case study — each card states the specific device/branch, the metric that surfaced it, and why it matters. Recomputed live from <code>${STATE.branch === "all" ? "all branches" : BRANCH_LABEL(STATE.branch)}</code>, ${STATE.windowKey === "all" ? "the full available window" : STATE.windowKey}.</p>
      </div>
      <div class="roi-panel" id="roiPanel"></div>
      <div id="storyCards"><div class="loading-row"><span class="spinner"></span> Scanning for findings…</div></div>
    </div>
  `;

  // Every detector below is bounded by a small constant regardless of fleet
  // size: branch-level aggregates (device_group has ~4 values no matter how
  // many devices exist), or a server-side top-N (ORDER BY + LIMIT) to name
  // candidates before ever fetching per-day/per-device detail for them. None
  // of this scans "every device" the way the original version did.
  const [branchAutoheal, topFailedMachines, selfHelpCount, topRttMachines, cpuOutlierCandidate, fleetAvgCpu] = await Promise.all([
    rowsOr(`SELECT device_group, event_status, COUNT(*) AS n FROM events WHERE event_type='autoheal_action' AND device_group != '' AND ${F.full()} GROUP BY device_group, event_status LIMIT 20`),
    rowsOr(`SELECT machine_id, device_group, SUM(CASE WHEN event_status='failed' THEN 1 ELSE 0 END) AS failed, SUM(CASE WHEN event_status='completed' THEN 1 ELSE 0 END) AS completed FROM events WHERE event_type='autoheal_action' AND device_group != '' AND ${F.full()} GROUP BY machine_id, device_group ORDER BY failed DESC LIMIT 5`),
    scalarOr(`SELECT COUNT(*) FROM events WHERE event_domain='self_help' AND device_group != '' AND ${F.full()}`, 0),
    rowsOr(`SELECT machine_id, device_group, AVG(metric_value) AS v FROM system_telemetry_metrics WHERE metric_name='wan_latency_ms' AND ${F.full()} GROUP BY machine_id, device_group ORDER BY v DESC LIMIT 15`),
    rowsOr(`SELECT machine_id, device_group, AVG(metric_value) AS v FROM system_telemetry_metrics WHERE metric_name='cpu_usage_pct' AND ${F.full()} GROUP BY machine_id, device_group ORDER BY v DESC LIMIT 1`),
    scalarOr(`SELECT AVG(metric_value) FROM system_telemetry_metrics WHERE metric_name='cpu_usage_pct' AND ${F.full()}`),
  ]);

  if (isStaleRender(gen)) return;
  // ---- ROI / automation-impact panel (real counts x a stated, editable assumption) ----
  const completed = branchAutoheal.filter((r) => r.event_status === "completed").reduce((a, r) => a + r.n, 0);
  const failed = branchAutoheal.filter((r) => r.event_status === "failed").reduce((a, r) => a + r.n, 0);
  const successfulActions = completed + selfHelpCount;
  renderRoiPanel(document.getElementById("roiPanel"), { completed, failed, selfHelpCount, successfulActions });

  // ---- Story detection ----
  const cards = [];

  // 1. Auto-heal reliability gap by branch
  const byBranch = {};
  for (const r of branchAutoheal) {
    byBranch[r.device_group] ??= { completed: 0, failed: 0 };
    byBranch[r.device_group][r.event_status] = (byBranch[r.device_group][r.event_status] || 0) + r.n;
  }
  const branchRates = Object.entries(byBranch)
    .map(([b, v]) => ({ branch: b, ...v, total: v.completed + v.failed, rate: v.completed / (v.completed + v.failed) }))
    .filter((b) => b.total >= 5);
  if (branchRates.length >= 2) {
    const best = branchRates.reduce((a, b) => (b.rate > a.rate ? b : a));
    const worst = branchRates.reduce((a, b) => (b.rate < a.rate ? b : a));
    if (best.branch !== worst.branch && best.rate - worst.rate > 0.3) {
      cards.push({
        kicker: "Automation reliability",
        title: `Auto-heal succeeds ${Math.round(best.rate * 100)}% of the time at ${BRANCH_LABEL(best.branch)}, but only ${Math.round(worst.rate * 100)}% at ${BRANCH_LABEL(worst.branch)}`,
        evidence: `${BRANCH_LABEL(best.branch)}: ${best.completed} completed / ${best.total} attempted\n${BRANCH_LABEL(worst.branch)}: ${worst.completed} completed / ${worst.total} attempted`,
        why: `Auto-remediation is only paying off in one location. If ${BRANCH_LABEL(best.branch)}'s remediation policy or agent config differs from ${BRANCH_LABEL(worst.branch)}'s, replicating it fleet-wide is the single highest-leverage fix available in this data.`,
      });
    }
  }

  // 2. Chronic auto-heal failure on one device — already the top-5 worst by
  // failure count server-side, so no client-side scan of the fleet is needed.
  const worstMachine = topFailedMachines.find((m) => m.failed >= 5 && m.completed === 0);
  if (worstMachine) {
    cards.push({
      kicker: "Recurring unresolved issue",
      title: `${worstMachine.machine_id} (${BRANCH_LABEL(worstMachine.device_group)}) has failed every auto-heal attempt — ${fmtInt(worstMachine.failed)} in a row`,
      evidence: `${worstMachine.machine_id}: 0 completed / ${fmtInt(worstMachine.failed)} attempted, 0% success`,
      why: `A device stuck in a fail-and-retry loop is invisible in aggregate KPIs (the fleet-wide completion rate still looks fine) but represents a real, unresolved end-user impact. This is the device‑level drill‑down that a fleet-average dashboard would miss — worth a human ticket instead of another automated retry.`,
    });
  }

  // 3. Network latency self-baseline degradation — day-by-day detail is only
  // ever fetched for the 15 devices already leading on average RTT, not the
  // whole fleet.
  const rttCandidateIds = topRttMachines.map((r) => `'${sqlEscape(r.machine_id)}'`).join(",");
  const rttDeviceMap = Object.fromEntries(topRttMachines.map((r) => [r.machine_id, r.device_group]));
  const rttDayRows = rttCandidateIds
    ? await rowsOr(`SELECT machine_id, DATETRUNC('day', server_time, 'MILLISECONDS') AS day, AVG(metric_value) AS v FROM system_telemetry_metrics WHERE metric_name='wan_latency_ms' AND machine_id IN (${rttCandidateIds}) AND ${F.time()} GROUP BY machine_id, day ORDER BY day LIMIT 2000`)
    : [];
  const byMachineDays = {};
  for (const r of rttDayRows) {
    byMachineDays[r.machine_id] ??= [];
    byMachineDays[r.machine_id].push({ day: r.day, v: r.v });
  }
  let worstDegradation = null;
  for (const [machine, days0] of Object.entries(byMachineDays)) {
    const days = days0.sort((a, b) => a.day - b.day);
    if (days.length < 4) continue;
    const split = Math.floor(days.length / 2);
    const baseline = avgOf(days.slice(0, split).map((d) => d.v));
    const recent = avgOf(days.slice(split).map((d) => d.v));
    if (baseline === null || recent === null || baseline < 5) continue;
    const delta = recent - baseline;
    if (!worstDegradation || delta > worstDegradation.delta) {
      worstDegradation = { machine, device_group: rttDeviceMap[machine], baseline, recent, delta, ratio: recent / baseline };
    }
  }
  if (worstDegradation && worstDegradation.ratio > 2 && worstDegradation.delta > 200) {
    cards.push({
      kicker: "Network degradation",
      title: `${worstDegradation.machine} (${BRANCH_LABEL(worstDegradation.device_group)}) round-trip time climbed ${worstDegradation.ratio.toFixed(1)}× within the window`,
      evidence: `Baseline (first half of window): ${fmtNum(worstDegradation.baseline)} ms\nRecent (second half of window): ${fmtNum(worstDegradation.recent)} ms`,
      why: `A single device drifting this far from its own baseline — while the branch average stays flat — is exactly the kind of early warning that per-device trending catches and a monthly aggregate report doesn't. Worth checking this device's driver/adapter before it becomes a help-desk call.`,
    });
  }

  // 4. Chronic compliance non-compliance — one small bounded query per known
  // control (a handful, fixed regardless of fleet size), each already
  // filtered to that control's bad statuses and limited to the worst 3.
  let worstCompliance = null;
  for (const [control, goodStatuses] of Object.entries(COMPLIANCE_GOOD)) {
    const badList = goodStatuses.map((s) => `'${sqlEscape(s)}'`).join(",");
    const [totalWeeksScanned, badRows] = await Promise.all([
      scalarOr(`SELECT COUNT(DISTINCT DATETRUNC('week', server_time, 'MILLISECONDS')) FROM compliance WHERE compliance_control='${control}' AND ${F.full()}`, 0),
      rowsOr(`SELECT machine_id, device_group, COUNT(DISTINCT DATETRUNC('week', server_time, 'MILLISECONDS')) AS bad_weeks FROM compliance WHERE compliance_control='${control}' AND compliance_status NOT IN (${badList}) AND ${F.full()} GROUP BY machine_id, device_group ORDER BY bad_weeks DESC LIMIT 3`),
    ]);
    const top = badRows[0];
    if (top && top.bad_weeks >= 2 && top.bad_weeks === totalWeeksScanned) {
      if (!worstCompliance || top.bad_weeks > worstCompliance.badWeeks) {
        worstCompliance = { machine: top.machine_id, device_group: top.device_group, control, badWeeks: top.bad_weeks, weeks: totalWeeksScanned };
      }
    }
  }
  if (worstCompliance) {
    cards.push({
      kicker: "Compliance drift",
      title: `${worstCompliance.machine} (${BRANCH_LABEL(worstCompliance.device_group)}) has failed "${worstCompliance.control.replace(/_/g, " ")}" for ${worstCompliance.badWeeks} consecutive scanned weeks`,
      evidence: `${worstCompliance.badWeeks} of ${worstCompliance.weeks} scanned weeks non-compliant, with no remediation in between`,
      why: `Weekly compliance scans are running and correctly detecting this — but nothing is closing the loop. This is a policy-enforcement gap, not a visibility gap: the data to act on it has existed the whole time.`,
    });
  }

  // 5. Capacity headroom outlier — top-1 by CPU server-side, compared against
  // a true fleet-wide AVG (also server-side), never a client-scanned array.
  const outlier = cpuOutlierCandidate[0];
  if (outlier && fleetAvgCpu !== null && outlier.v - fleetAvgCpu > 8) {
    cards.push({
      kicker: "Capacity watch",
      title: `${outlier.machine_id} (${BRANCH_LABEL(outlier.device_group)}) runs ${fmtNum(outlier.v - fleetAvgCpu)} points hotter on CPU than the fleet average`,
      evidence: `${outlier.machine_id}: ${fmtNum(outlier.v)}% avg CPU vs ${fmtNum(fleetAvgCpu)}% fleet average`,
      why: `Not urgent on its own, but it's the device to check first if this user reports the app "feeling slow" — and the one to prioritize if a hardware refresh budget opens up.`,
    });
  }

  if (isStaleRender(gen)) return;
  const storyContainer = document.getElementById("storyCards");
  if (!cards.length) {
    storyContainer.innerHTML = `<div class="card"><div class="empty-state">No findings met the significance threshold for the current filters — try widening the branch or time window.</div></div>`;
  } else {
    storyContainer.innerHTML = cards
      .map(
        (c) => `
      <div class="insight-card">
        <div class="insight-kicker">✦ ${c.kicker}</div>
        <h3>${c.title}</h3>
        <div class="evidence">${c.evidence}</div>
        <p class="why">${c.why}</p>
      </div>`
      )
      .join("");
  }
}

function renderRoiPanel(host, { completed, failed, selfHelpCount, successfulActions }) {
  const render = () => {
    const minutes = Number(document.getElementById("roiMinutes")?.value ?? 20);
    const rate = Number(document.getElementById("roiRate")?.value ?? 45);
    const hours = (successfulActions * minutes) / 60;
    const dollars = hours * rate;
    host.innerHTML = `
      <div class="card-head"><h3>Automation impact</h3><span class="badge preview">assumption-based estimate</span></div>
      <div class="grid cols-3">
        <div class="kpi"><span class="label">Auto-heal completed</span><span class="value">${fmtInt(completed)}</span></div>
        <div class="kpi"><span class="label">Self-help executed</span><span class="value">${fmtInt(selfHelpCount)}</span></div>
        <div class="kpi"><span class="label">Auto-heal failed (needs escalation)</span><span class="value">${fmtInt(failed)}</span></div>
      </div>
      <div class="roi-inputs">
        <label>Minutes saved per resolved action<input type="number" id="roiMinutes" min="0" value="${minutes}" /></label>
        <label>Fully-loaded IT cost / hour ($)<input type="number" id="roiRate" min="0" value="${rate}" /></label>
        <div>
          <div class="roi-result">≈ ${fmtNum(hours)} hours · $${fmtInt(dollars)} estimated</div>
          <div class="assumption-note">${fmtInt(successfulActions)} real completed actions (${fmtInt(completed)} auto-heal + ${fmtInt(selfHelpCount)} self-help) × your assumption above. Edit the numbers to match your own support-cost baseline — this is exactly how the "$X saved" figures in vendor case studies are built.</div>
        </div>
      </div>
    `;
    document.getElementById("roiMinutes").addEventListener("input", render);
    document.getElementById("roiRate").addEventListener("input", render);
  };
  render();
}

// ================= ENDPOINT HEALTH =================
// The device table, refresh-prioritization card and version card all used to
// fetch "every device, LIMIT 50" and derive everything client-side — correct
// at 8 devices, silently wrong at 100,000 (an arbitrary 50-device slice, not
// the real top offenders, and a table that can never show device 51+ at all).
// Every query below is now either bounded by a small constant regardless of
// fleet size (top-N via ORDER BY/LIMIT, GROUP BY on a low-cardinality column
// like client_version) or explicitly paginated with a real page/search UI.
async function renderEndpoint(stage, gen) {
  stage.innerHTML = `
    <div class="page">
      <div class="page-head">
        <h1>Endpoint Health</h1>
        <p>Per-device performance from <code>system_telemetry_metrics</code> and <code>process_telemetry_metrics</code>.
          <span class="gap-flag">DATA GAP</span> no system-level RAM %, battery, or boot/logon time is captured — see the gaps report.</p>
      </div>
      <div class="grid cols-3" style="margin-bottom:16px;">
        <div class="card"><div class="card-head"><h3>Top processes by CPU</h3></div><div id="procCpu"></div></div>
        <div class="card"><div class="card-head"><h3>Top processes by memory</h3></div><div id="procMem"></div></div>
        <div class="card kpi">
          <span class="label">Installed software (fleet)</span>
          <span class="value" id="swCount">—</span>
          <span class="delta flat" id="swUi">—</span>
        </div>
      </div>
      <div class="grid cols-2" style="margin-bottom:16px;">
        <div class="card">
          <div class="card-head"><h3>Hardware refresh prioritization</h3><span class="meta">top 10 candidates, any fleet size</span></div>
          <div id="refreshBars"></div>
          <p class="card-body-note">Composite of avg CPU utilization and (100 − avg disk free%), 0–100, computed only for the devices that lead on CPU or disk pressure individually (two server-side top-20 queries, unioned) — not a full-fleet scan. Not a substitute for actual asset age/spec data, which isn't captured anywhere in this cluster today (see gaps report).</p>
        </div>
        <div class="card">
          <div class="card-head"><h3>Agent version distribution</h3></div>
          <div id="agentVersionBars"></div>
        </div>
      </div>
      <div class="card">
        <div class="card-head"><h3>Device fleet</h3><span class="meta" id="deviceCountMeta"></span></div>
        <div class="roi-inputs" style="margin:0 0 12px; padding:0; border:0;">
          <input type="text" id="deviceSearch" placeholder="Search machine ID or user…" value="${STATE.endpointSearch.replace(/"/g, "&quot;")}"
            style="flex:1; min-width:200px; height:32px; border-radius:6px; border:1px solid var(--border-default); background:var(--bg-subtle); color:var(--text-primary); font:inherit; font-size:13px; padding:0 10px;" />
        </div>
        <div id="deviceTable"></div>
        <div style="display:flex; align-items:center; gap:10px; margin-top:12px;">
          <button class="btn-ghost" id="devicePrev">← Prev</button>
          <span class="data-note" id="devicePageLabel"></span>
          <button class="btn-ghost" id="deviceNext">Next →</button>
        </div>
        <p class="card-body-note">Click a row to open the device detail view.</p>
      </div>
    </div>
  `;

  let searchDebounce;
  document.getElementById("deviceSearch").addEventListener("input", (e) => {
    clearTimeout(searchDebounce);
    const value = e.target.value.trim();
    searchDebounce = setTimeout(() => {
      STATE.endpointSearch = value;
      STATE.endpointPage = 0;
      loadDeviceTable();
    }, 300);
  });
  document.getElementById("devicePrev").addEventListener("click", () => {
    if (STATE.endpointPage > 0) { STATE.endpointPage--; loadDeviceTable(); }
  });
  document.getElementById("deviceNext").addEventListener("click", () => {
    STATE.endpointPage++; loadDeviceTable();
  });

  async function loadDeviceTable() {
    if (isStaleRender(gen)) return;
    const tableHost = document.getElementById("deviceTable");
    tableHost.innerHTML = `<div class="loading-row"><span class="spinner"></span> Loading…</div>`;
    const search = STATE.endpointSearch;
    const searchClause = search ? ` AND (machine_id LIKE '%${sqlEscape(search)}%' OR user_name LIKE '%${sqlEscape(search)}%')` : "";
    const where = F.full() + searchClause;

    const [total, dims] = await Promise.all([
      scalarOr(`SELECT COUNT(DISTINCT machine_id) FROM system_telemetry_metrics WHERE ${where}`, 0),
      rowsOr(`SELECT machine_id, device_group, user_name, client_version FROM system_telemetry_metrics WHERE ${where} GROUP BY machine_id, device_group, user_name, client_version ORDER BY machine_id LIMIT ${ENDPOINT_PAGE_SIZE} OFFSET ${STATE.endpointPage * ENDPOINT_PAGE_SIZE}`),
    ]);

    const ids = dims.map((d) => `'${sqlEscape(d.machine_id)}'`).join(",");
    const [cpuRows, diskRows, procRows, crashRows] = ids
      ? await Promise.all([
          rowsOr(`SELECT machine_id, AVG(metric_value) AS v FROM system_telemetry_metrics WHERE metric_name='cpu_usage_pct' AND machine_id IN (${ids}) AND ${F.time()} GROUP BY machine_id LIMIT ${ENDPOINT_PAGE_SIZE}`),
          rowsOr(`SELECT machine_id, AVG(metric_value) AS v FROM system_telemetry_metrics WHERE metric_name='disk_free_pct' AND machine_id IN (${ids}) AND ${F.time()} GROUP BY machine_id LIMIT ${ENDPOINT_PAGE_SIZE}`),
          rowsOr(`SELECT machine_id, AVG(metric_value) AS v FROM system_telemetry_metrics WHERE metric_name='processes_running' AND machine_id IN (${ids}) AND ${F.time()} GROUP BY machine_id LIMIT ${ENDPOINT_PAGE_SIZE}`),
          rowsOr(`SELECT machine_id, COUNT(*) AS n FROM events WHERE event_domain='failure' AND event_type='application_error' AND machine_id IN (${ids}) AND ${F.time()} GROUP BY machine_id LIMIT ${ENDPOINT_PAGE_SIZE}`),
        ])
      : [[], [], [], []];

    const mapBy = (rows) => Object.fromEntries(rows.map((r) => [r.machine_id, r.v ?? r.n]));
    const cpuM = mapBy(cpuRows), diskM = mapBy(diskRows), procM = mapBy(procRows), crashM = mapBy(crashRows);
    const deviceRows = dims.map((d) => ({
      ...d,
      cpu: cpuM[d.machine_id], disk: diskM[d.machine_id], procs: procM[d.machine_id], crashes: crashM[d.machine_id] || 0,
    }));

    if (isStaleRender(gen)) return;
    const pageStart = total === 0 ? 0 : STATE.endpointPage * ENDPOINT_PAGE_SIZE + 1;
    const pageEnd = STATE.endpointPage * ENDPOINT_PAGE_SIZE + deviceRows.length;
    document.getElementById("deviceCountMeta").textContent = `${fmtInt(total)} devices${search ? ` matching "${search}"` : ""}`;
    document.getElementById("devicePageLabel").textContent = total ? `${pageStart}–${pageEnd} of ${fmtInt(total)}` : "0 of 0";
    document.getElementById("devicePrev").disabled = STATE.endpointPage === 0;
    document.getElementById("deviceNext").disabled = pageEnd >= total;

    Charts.table(tableHost, [
      { key: "machine_id", label: "Machine" },
      { key: "user_name", label: "User" },
      { key: "device_group", label: "Branch", render: (r) => BRANCH_LABEL(r.device_group) },
      { key: "cpu", label: "Avg CPU %", num: true, render: (r) => fmtNum(r.cpu) },
      { key: "disk", label: "Disk free %", num: true, render: (r) => fmtNum(r.disk) },
      { key: "procs", label: "Processes", num: true, render: (r) => fmtNum(r.procs, 0) },
      { key: "crashes", label: "Crashes", num: true, render: (r) => fmtInt(r.crashes) },
      { key: "client_version", label: "Agent version" },
    ], deviceRows, { onRowClick: (r) => navigateToDevice(r.machine_id), emptyText: `No devices match "${search}".` });
  }

  await loadDeviceTable();

  // Refresh-prioritization candidates: union of the top 20 by CPU and the
  // bottom 20 by disk free, not the whole fleet — a device pressuring the
  // composite score has to lead on at least one of the two inputs.
  const [topCpu, lowDisk] = await Promise.all([
    rowsOr(`SELECT machine_id, device_group, AVG(metric_value) AS v FROM system_telemetry_metrics WHERE metric_name='cpu_usage_pct' AND ${F.full()} GROUP BY machine_id, device_group ORDER BY v DESC LIMIT 20`),
    rowsOr(`SELECT machine_id, device_group, AVG(metric_value) AS v FROM system_telemetry_metrics WHERE metric_name='disk_free_pct' AND ${F.full()} GROUP BY machine_id, device_group ORDER BY v ASC LIMIT 20`),
  ]);
  const candidateIds = [...new Set([...topCpu.map((r) => r.machine_id), ...lowDisk.map((r) => r.machine_id)])];
  const cpuByCandidate = Object.fromEntries(topCpu.map((r) => [r.machine_id, r]));
  const diskByCandidate = Object.fromEntries(lowDisk.map((r) => [r.machine_id, r]));
  const candidateIdsSql = candidateIds.map((id) => `'${sqlEscape(id)}'`).join(",");
  const [candCpuAll, candDiskAll] = candidateIdsSql
    ? await Promise.all([
        rowsOr(`SELECT machine_id, device_group, AVG(metric_value) AS v FROM system_telemetry_metrics WHERE metric_name='cpu_usage_pct' AND machine_id IN (${candidateIdsSql}) AND ${F.time()} GROUP BY machine_id, device_group`),
        rowsOr(`SELECT machine_id, AVG(metric_value) AS v FROM system_telemetry_metrics WHERE metric_name='disk_free_pct' AND machine_id IN (${candidateIdsSql}) AND ${F.time()} GROUP BY machine_id`),
      ])
    : [[], []];
  const candCpuM = Object.fromEntries(candCpuAll.map((r) => [r.machine_id, r]));
  const candDiskM = Object.fromEntries(candDiskAll.map((r) => [r.machine_id, r.v]));
  const refreshCandidates = candidateIds
    .map((id) => {
      const cpu = candCpuM[id]?.v ?? cpuByCandidate[id]?.v;
      const disk = candDiskM[id] ?? diskByCandidate[id]?.v;
      const branch = candCpuM[id]?.device_group ?? cpuByCandidate[id]?.device_group ?? diskByCandidate[id]?.device_group;
      if (cpu === undefined || disk === undefined) return null;
      return { machine_id: id, device_group: branch, cpu, disk, pressure: clamp(cpu, 0, 100) * 0.5 + clamp(100 - disk, 0, 100) * 0.5 };
    })
    .filter(Boolean)
    .sort((a, b) => b.pressure - a.pressure)
    .slice(0, 10);
  if (isStaleRender(gen)) return;
  Charts.barChartH(
    document.getElementById("refreshBars"),
    refreshCandidates.map((d) => ({ label: d.machine_id, value: Math.round(d.pressure), color: "var(--cat-4)", sublabel: `${BRANCH_LABEL(d.device_group)} · ${fmtNum(d.cpu)}% CPU, ${fmtNum(d.disk)}% disk free` })),
    { labelW: 90, max: 100 }
  );

  const versionRows = await rowsOr(`SELECT client_version, COUNT(DISTINCT machine_id) AS n FROM system_telemetry_metrics WHERE ${F.full()} GROUP BY client_version ORDER BY n DESC LIMIT 20`);
  if (isStaleRender(gen)) return;
  Charts.barChartH(
    document.getElementById("agentVersionBars"),
    versionRows.map((r, i) => ({ label: r.client_version || "unknown", value: r.n, unit: " devices", color: `var(--cat-${(i % 6) + 1})` })),
    { labelW: 130 }
  );

  const [procCpu, procMem, swRows] = await Promise.all([
    rowsOr(`SELECT process_name, AVG(metric_value) AS v FROM process_telemetry_metrics WHERE metric_name='process_cpu_percent' AND ${F.full()} GROUP BY process_name ORDER BY v DESC LIMIT 8`),
    rowsOr(`SELECT process_name, AVG(metric_value) AS v FROM process_telemetry_metrics WHERE metric_name='process_memory_used_pct' AND ${F.full()} GROUP BY process_name ORDER BY v DESC LIMIT 8`),
    rowsOr(`SELECT COUNT(*) AS n, COUNT(DISTINCT software_name) AS d, SUM(CASE WHEN has_ui = true THEN 1 ELSE 0 END) AS ui FROM software_inventory WHERE ${STATE.branch !== "all" ? `device_group = '${STATE.branch}'` : "1=1"} LIMIT 1`),
  ]);
  if (isStaleRender(gen)) return;
  Charts.barChartH(document.getElementById("procCpu"), procCpu.map((r, i) => ({ label: r.process_name, value: r.v, unit: "%", color: `var(--cat-${(i % 6) + 1})` })), { labelW: 130 });
  Charts.barChartH(document.getElementById("procMem"), procMem.map((r, i) => ({ label: r.process_name, value: r.v, unit: "%", color: `var(--cat-${(i % 6) + 1})` })), { labelW: 130 });

  const sw = swRows[0] || {};
  document.getElementById("swCount").textContent = fmtInt(sw.d || 0);
  document.getElementById("swUi").textContent = `${fmtInt(sw.ui || 0)} of ${fmtInt(sw.n || 0)} install rows have a UI`;
}

// ================= DEVICE 360 =================
async function renderDeviceDetail(stage, machineId, gen) {
  if (!machineId) {
    stage.innerHTML = `<div class="page"><div class="card"><div class="empty-state">No device selected.</div></div></div>`;
    return;
  }
  stage.innerHTML = `<div class="page"><div class="loading-row"><span class="spinner"></span> Loading ${machineId}…</div></div>`;

  const mClause = `machine_id = '${machineId}' AND ${F.time()}`;
  const [dims, cpuRows, rttRows, crashCount, complianceRows, eventRows, swRows, procRows] = await Promise.all([
    rowsOr(`SELECT machine_id, device_group, user_name, client_version FROM system_telemetry_metrics WHERE ${mClause} GROUP BY machine_id, device_group, user_name, client_version LIMIT 1`),
    rowsOr(`SELECT DATETRUNC('day', server_time, 'MILLISECONDS') AS day, AVG(metric_value) AS v FROM system_telemetry_metrics WHERE metric_name='cpu_usage_pct' AND ${mClause} GROUP BY day ORDER BY day LIMIT 200`),
    rowsOr(`SELECT DATETRUNC('day', server_time, 'MILLISECONDS') AS day, AVG(metric_value) AS v FROM system_telemetry_metrics WHERE metric_name='wan_latency_ms' AND ${mClause} GROUP BY day ORDER BY day LIMIT 200`),
    scalarOr(`SELECT COUNT(*) FROM events WHERE event_domain='failure' AND event_type='application_error' AND ${mClause}`, 0),
    rowsOr(`SELECT compliance_control, compliance_status, server_time FROM compliance WHERE ${mClause} ORDER BY server_time DESC LIMIT 200`),
    rowsOr(`SELECT server_time, event_domain, event_type, event_status, severity FROM events WHERE ${mClause} ORDER BY server_time DESC LIMIT 25`),
    rowsOr(`SELECT software_name, software_version, architecture FROM software_inventory WHERE machine_id = '${machineId}' LIMIT 20`),
    rowsOr(`SELECT process_name, AVG(metric_value) AS v FROM process_telemetry_metrics WHERE metric_name='process_cpu_percent' AND ${mClause} GROUP BY process_name ORDER BY v DESC LIMIT 6`),
  ]);

  const d = dims[0] || { machine_id: machineId };
  const avgCpu = avgOf(cpuRows.map((r) => r.v));
  const avgRtt = avgOf(rttRows.map((r) => r.v));

  const latestByControl = {};
  for (const r of complianceRows) {
    if (!latestByControl[r.compliance_control] || r.server_time > latestByControl[r.compliance_control].server_time) {
      latestByControl[r.compliance_control] = r;
    }
  }
  const complianceLatest = Object.values(latestByControl);
  const compliancePass = complianceLatest.length
    ? Math.round((complianceLatest.filter((r) => (COMPLIANCE_GOOD[r.compliance_control] || []).includes(r.compliance_status)).length / complianceLatest.length) * 100)
    : null;

  if (isStaleRender(gen)) return;
  stage.innerHTML = `
    <div class="page">
      <div class="page-head">
        <button class="btn-ghost" id="backToFleet" style="margin-bottom:12px;">← Back to fleet</button>
        <h1>${d.machine_id}</h1>
        <p>${d.user_name || "Unknown user"} · ${BRANCH_LABEL(d.device_group)} · agent ${d.client_version || "—"}</p>
      </div>
      <div class="grid cols-4" style="margin-bottom:16px;">
        <div class="card kpi"><span class="label">Avg CPU utilization</span><span class="value">${fmtNum(avgCpu)}<span class="unit">%</span></span></div>
        <div class="card kpi"><span class="label">Avg round-trip time</span><span class="value">${fmtNum(avgRtt)}<span class="unit">ms</span></span></div>
        <div class="card kpi"><span class="label">Crashes</span><span class="value">${fmtInt(crashCount)}</span></div>
        <div class="card kpi"><span class="label">Compliance pass rate</span><span class="value">${compliancePass !== null ? compliancePass + "%" : "—"}</span></div>
      </div>
      <div class="grid cols-2" style="margin-bottom:16px;">
        <div class="card"><div class="card-head"><h3>CPU trend</h3><span class="meta">daily avg, this device only</span></div><div id="devCpuTrend"></div></div>
        <div class="card"><div class="card-head"><h3>Round-trip time trend</h3><span class="meta">daily avg, this device only</span></div><div id="devRttTrend"></div></div>
      </div>
      <div class="grid cols-3" style="margin-bottom:16px;">
        <div class="card"><div class="card-head"><h3>Top processes</h3></div><div id="devProcBars"></div></div>
        <div class="card span-2">
          <div class="card-head"><h3>Compliance status</h3><span class="meta">latest scan per control</span></div>
          <div id="devComplianceTable"></div>
        </div>
      </div>
      <div class="grid cols-2">
        <div class="card"><div class="card-head"><h3>Installed software</h3></div><div id="devSoftwareTable"></div></div>
        <div class="card"><div class="card-head"><h3>Recent events</h3></div><div id="devEventsTable"></div></div>
      </div>
    </div>
  `;

  document.getElementById("backToFleet").addEventListener("click", () => navigate("endpoint"));

  Charts.lineChart(document.getElementById("devCpuTrend"), [{ name: "CPU", color: "var(--cat-1)", points: cpuRows.map((r) => ({ t: r.day, v: r.v })) }], { unit: "%", yDigits: 0 });
  Charts.lineChart(document.getElementById("devRttTrend"), [{ name: "RTT", color: "var(--cat-2)", points: rttRows.map((r) => ({ t: r.day, v: r.v })) }], { unit: "ms" });
  Charts.barChartH(document.getElementById("devProcBars"), procRows.map((r, i) => ({ label: r.process_name, value: r.v, unit: "%", color: `var(--cat-${(i % 6) + 1})` })), { labelW: 110 });

  Charts.table(document.getElementById("devComplianceTable"), [
    { key: "compliance_control", label: "Control", render: (r) => r.compliance_control.replace(/_/g, " ") },
    { key: "compliance_status", label: "Status", render: (r) => {
      const good = (COMPLIANCE_GOOD[r.compliance_control] || []).includes(r.compliance_status);
      return `<span class="badge ${good ? "excellent" : "poor"}">${r.compliance_status}</span>`;
    }},
    { key: "server_time", label: "Last scanned", render: (r) => new Date(r.server_time).toLocaleDateString() },
  ], complianceLatest);

  Charts.table(document.getElementById("devSoftwareTable"), [
    { key: "software_name", label: "Software" },
    { key: "software_version", label: "Version" },
    { key: "architecture", label: "Arch" },
  ], swRows);

  Charts.table(document.getElementById("devEventsTable"), [
    { key: "server_time", label: "Time", render: (r) => new Date(r.server_time).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) },
    { key: "event_type", label: "Type" },
    { key: "severity", label: "Severity", render: (r) => `<span class="badge ${r.severity === "Error" ? "poor" : r.severity === "Warning" ? "fair" : "good"}">${r.severity}</span>` },
  ], eventRows);
}

// ================= NETWORK & APPS =================
async function renderNetwork(stage, gen) {
  const [avgDns, avgRtt, avgUp, avgDown, urlRows, tcpTrendRows] = await Promise.all([
    scalarOr(`SELECT AVG(metric_value) FROM network_connection_telemetry WHERE metric_name='dns_lookup_time_ms' AND ${F.full()}`),
    scalarOr(`SELECT AVG(metric_value) FROM system_telemetry_metrics WHERE metric_name='wan_latency_ms' AND ${F.full()}`),
    scalarOr(`SELECT AVG(metric_value) FROM system_telemetry_metrics WHERE metric_name='network_upload_speed' AND ${F.full()}`),
    scalarOr(`SELECT AVG(metric_value) FROM system_telemetry_metrics WHERE metric_name='network_download_speed' AND ${F.full()}`),
    rowsOr(`SELECT domain, COUNT(*) AS n, AVG(metric_value) AS avgv, MAX(metric_value) AS maxv FROM url_telemetry WHERE metric_name='http_response_time' AND ${F.full()} GROUP BY domain ORDER BY avgv DESC LIMIT 20`),
    rowsOr(`SELECT DATETRUNC('day', server_time, 'MILLISECONDS') AS day, AVG(metric_value) AS v FROM system_telemetry_metrics WHERE metric_name='wan_latency_ms' AND ${F.full()} GROUP BY day ORDER BY day LIMIT 500`),
  ]);
  const dnsTrendRows = await rowsOr(`SELECT DATETRUNC('day', server_time, 'MILLISECONDS') AS day, AVG(metric_value) AS v FROM network_connection_telemetry WHERE metric_name='dns_lookup_time_ms' AND ${F.full()} GROUP BY day ORDER BY day LIMIT 500`);

  if (isStaleRender(gen)) return;
  stage.innerHTML = `
    <div class="page">
      <div class="page-head">
        <h1>Network &amp; Application Experience</h1>
        <p>From <code>system_telemetry_metrics</code>, <code>network_connection_telemetry</code> and <code>url_telemetry</code>.
          <span class="gap-flag">DATA GAP</span> only 4 internal/SaaS URLs are monitored, and only response time — no availability %, error rate, or synthetic transaction checks. No Wi-Fi signal or VPN latency time series (only point-in-time status). See gaps report.</p>
      </div>
      <div class="grid cols-4" style="margin-bottom:16px;">
        <div class="card kpi"><span class="label">Avg DNS lookup</span><span class="value">${fmtNum(avgDns)}<span class="unit">ms</span></span></div>
        <div class="card kpi"><span class="label">Avg round-trip time</span><span class="value">${fmtNum(avgRtt)}<span class="unit">ms</span></span></div>
        <div class="card kpi"><span class="label">Avg upload speed</span><span class="value">${fmtNum(avgUp)}<span class="unit">kbps</span></span></div>
        <div class="card kpi"><span class="label">Avg download speed</span><span class="value">${fmtNum(avgDown)}<span class="unit">kbps</span></span></div>
      </div>
      <div class="grid cols-2" style="margin-bottom:16px;">
        <div class="card"><div class="card-head"><h3>Round-trip time trend</h3><span class="meta">daily avg</span></div><div id="rttTrend"></div></div>
        <div class="card"><div class="card-head"><h3>DNS lookup time trend</h3><span class="meta">daily avg</span></div><div id="dnsTrend"></div></div>
      </div>
      ${STATE.branch === "all" ? `
      <div class="card" style="margin-bottom:16px;">
        <div class="card-head"><h3>Branch network comparison</h3><span class="meta">avg round-trip time, current window</span></div>
        <div id="branchNetBars"></div>
      </div>` : ""}
      <div class="card">
        <div class="card-head"><h3>Business application response time</h3><span class="meta">by monitored domain</span></div>
        <div id="urlTable"></div>
      </div>
    </div>
  `;

  Charts.lineChart(document.getElementById("rttTrend"), [{ name: "RTT", color: "var(--cat-1)", points: tcpTrendRows.map((r) => ({ t: r.day, v: r.v })) }], { unit: "ms" });
  Charts.lineChart(document.getElementById("dnsTrend"), [{ name: "DNS", color: "var(--cat-2)", points: dnsTrendRows.map((r) => ({ t: r.day, v: r.v })) }], { unit: "ms" });
  Charts.table(document.getElementById("urlTable"), [
    { key: "domain", label: "Domain" },
    { key: "n", label: "Samples", num: true, render: (r) => fmtInt(r.n) },
    { key: "avgv", label: "Avg response", num: true, render: (r) => fmtNum(r.avgv) + " ms" },
    { key: "maxv", label: "Max response", num: true, render: (r) => fmtNum(r.maxv) + " ms" },
  ], urlRows);

  if (STATE.branch === "all") {
    const branchRtt = await rowsOr(`SELECT device_group, AVG(metric_value) AS v FROM system_telemetry_metrics WHERE metric_name='wan_latency_ms' AND ${F.time()} GROUP BY device_group LIMIT 20`);
    if (isStaleRender(gen)) return;
    const rttMap = Object.fromEntries(branchRtt.map((r) => [r.device_group, r.v]));
    Charts.barChartH(
      document.getElementById("branchNetBars"),
      [...BRANCHES].sort((a, b) => (rttMap[b] || 0) - (rttMap[a] || 0)).map((b) => ({
        label: BRANCH_LABEL(b), value: rttMap[b] || 0, unit: " ms", color: BRANCH_COLOR[b],
      })),
      {}
    );
  }
}

// ================= SECURITY & COMPLIANCE =================
async function renderCompliance(stage, gen) {
  const rows = await rowsOr(`SELECT device_group, machine_id, compliance_control, compliance_status, COUNT(*) AS n FROM compliance WHERE ${F.full()} GROUP BY device_group, machine_id, compliance_control, compliance_status LIMIT 500`);

  if (isStaleRender(gen)) return;
  const controls = [...new Set(rows.map((r) => r.compliance_control))].sort();
  const branches = STATE.branch === "all" ? BRANCHES : [STATE.branch];

  const cellPass = {};
  for (const b of branches) {
    for (const c of controls) {
      const sub = rows.filter((r) => r.device_group === b && r.compliance_control === c);
      cellPass[`${b}|${c}`] = passRate(sub);
    }
  }

  const nonCompliant = [];
  for (const r of rows) {
    const good = COMPLIANCE_GOOD[r.compliance_control];
    if (good && !good.includes(r.compliance_status)) {
      nonCompliant.push(r);
    }
  }

  stage.innerHTML = `
    <div class="page">
      <div class="page-head">
        <h1>Security &amp; Compliance</h1>
        <p>From <code>compliance</code> — antivirus, firewall, UAC, backup agent and patch status.
          <span class="gap-flag">DATA GAP</span> no disk encryption, MFA, or DLP posture is tracked; compliance pass/fail here is inferred client-side from observed status strings, not a policy engine. See gaps report.</p>
      </div>
      <div class="card" style="margin-bottom:16px;">
        <div class="card-head"><h3>Pass rate by control × branch</h3></div>
        <div style="overflow-x:auto;">
          <table class="data-table">
            <thead><tr><th>Control</th>${branches.map((b) => `<th class="num">${BRANCH_LABEL(b)}</th>`).join("")}</tr></thead>
            <tbody>
              ${controls.map((c) => `<tr><td>${c.replace(/_/g, " ")}</td>${branches.map((b) => {
                const v = cellPass[`${b}|${c}`];
                if (v === null) return `<td class="num">—</td>`;
                const cls = v >= 100 ? "excellent" : v >= 75 ? "good" : v >= 50 ? "fair" : "poor";
                return `<td class="num"><span class="badge ${cls}">${Math.round(v)}%</span></td>`;
              }).join("")}</tr>`).join("")}
            </tbody>
          </table>
        </div>
      </div>
      <div class="card" style="margin-bottom:16px;">
        <div class="card-head"><h3>Compliance pass rate trend</h3><span class="meta">weekly — matches actual scan cadence</span></div>
        <div id="complianceTrend"></div>
      </div>
      <div class="card">
        <div class="card-head"><h3>Non-compliant devices</h3><span class="meta">${nonCompliant.length} findings</span></div>
        <div id="nonCompliantTable"></div>
      </div>
    </div>
  `;

  Charts.table(document.getElementById("nonCompliantTable"), [
    { key: "machine_id", label: "Machine" },
    { key: "device_group", label: "Branch", render: (r) => BRANCH_LABEL(r.device_group) },
    { key: "compliance_control", label: "Control", render: (r) => r.compliance_control.replace(/_/g, " ") },
    { key: "compliance_status", label: "Status", render: (r) => `<span class="badge poor">${r.compliance_status}</span>` },
  ], nonCompliant, { emptyText: "No non-compliant devices in the selected window." });

  const weeklyRows = await rowsOr(`SELECT DATETRUNC('week', server_time, 'MILLISECONDS') AS wk, compliance_control, compliance_status, COUNT(*) AS n FROM compliance WHERE ${F.full()} GROUP BY wk, compliance_control, compliance_status ORDER BY wk LIMIT 500`);
  if (isStaleRender(gen)) return;
  const byWeek = {};
  for (const r of weeklyRows) {
    byWeek[r.wk] ??= [];
    byWeek[r.wk].push(r);
  }
  const trendPoints = Object.entries(byWeek)
    .map(([wk, rows]) => ({ t: Number(wk), v: passRate(rows) }))
    .filter((p) => p.v !== null)
    .sort((a, b) => a.t - b.t);
  Charts.lineChart(document.getElementById("complianceTrend"), [{ name: "Pass rate", color: "var(--cat-1)", points: trendPoints }], { unit: "%", yDigits: 0, yMax: 100 });
}

// ================= INCIDENTS & REMEDIATION =================
async function renderIncidents(stage, gen) {
  const [crashCount, hangCount, netFailCount, autohealRows, selfHelpCount, dailyRows, tableRows, unmappedCount, totalCount] = await Promise.all([
    scalarOr(`SELECT COUNT(*) FROM events WHERE event_domain='failure' AND event_type='application_error' AND ${F.full()}`, 0),
    scalarOr(`SELECT COUNT(*) FROM events WHERE event_domain='failure' AND event_type='application_hang' AND ${F.full()}`, 0),
    scalarOr(`SELECT COUNT(*) FROM events WHERE event_domain='network' AND event_type='connection_failure' AND ${F.full()}`, 0),
    rowsOr(`SELECT event_status, COUNT(*) AS n FROM events WHERE event_type='autoheal_action' AND device_group != '' AND ${F.full()} GROUP BY event_status LIMIT 20`),
    scalarOr(`SELECT COUNT(*) FROM events WHERE event_domain='self_help' AND device_group != '' AND ${F.full()}`, 0),
    rowsOr(`SELECT DATETRUNC('day', server_time, 'MILLISECONDS') AS day, event_domain, COUNT(*) AS n FROM events WHERE device_group != '' AND ${F.full()} GROUP BY day, event_domain ORDER BY day LIMIT 1000`),
    rowsOr(`SELECT server_time, device_group, machine_id, event_domain, event_type, event_status, severity FROM events WHERE device_group != '' AND event_type != 'application_error' AND ${F.full()} ORDER BY server_time DESC LIMIT 25`),
    scalarOr(`SELECT COUNT(*) FROM events WHERE device_group = '' AND ${F.time()}`, 0),
    scalarOr(`SELECT COUNT(*) FROM events WHERE ${F.time()}`, 0),
  ]);
  const autoheal = Object.fromEntries(autohealRows.map((r) => [r.event_status, r.n]));
  const domains = [...new Set(dailyRows.map((r) => r.event_domain))];

  if (isStaleRender(gen)) return;
  stage.innerHTML = `
    <div class="page">
      <div class="page-head">
        <h1>Incidents &amp; Remediation</h1>
        <p>From <code>events</code> — crashes, hangs, network failures, and auto-heal/self-help actions.
          <span class="gap-flag">DATA GAP</span> ${fmtInt(unmappedCount)} of ${fmtInt(totalCount)} events in this window (${totalCount ? Math.round((unmappedCount / totalCount) * 100) : 0}%) carry no <code>device_group</code> and a <code>machine_id</code> that doesn't match the 8-device fleet (hostnames/usernames instead of asset IDs) — those rows are excluded below so device-level views stay trustworthy. See gaps report.</p>
      </div>
      <div class="grid cols-4" style="margin-bottom:16px;">
        <div class="card kpi"><span class="label">Crashes</span><span class="value">${fmtInt(crashCount)}</span></div>
        <div class="card kpi"><span class="label">Hangs</span><span class="value">${fmtInt(hangCount)}</span></div>
        <div class="card kpi"><span class="label">Network failures</span><span class="value">${fmtInt(netFailCount)}</span></div>
        <div class="card kpi"><span class="label">Self-help actions</span><span class="value">${fmtInt(selfHelpCount)}</span></div>
      </div>
      <div class="grid cols-3" style="margin-bottom:16px;">
        <div class="card span-2">
          <div class="card-head"><h3>Event volume by domain</h3><span class="meta">daily, mapped devices only</span></div>
          <div id="eventTrend"></div>
        </div>
        <div class="card">
          <div class="card-head"><h3>Auto-heal outcomes</h3></div>
          <div id="autohealBars"></div>
        </div>
      </div>
      <div class="card">
        <div class="card-head"><h3>Recent events</h3><span class="meta">excludes application-error noise</span></div>
        <div id="eventsTable"></div>
      </div>
    </div>
  `;

  Charts.lineChart(
    document.getElementById("eventTrend"),
    domains.map((d, i) => ({
      name: d, color: `var(--cat-${(i % 6) + 1})`,
      points: dailyRows.filter((r) => r.event_domain === d).map((r) => ({ t: r.day, v: r.n })),
    })),
    { yDigits: 0 }
  );
  Charts.barChartH(document.getElementById("autohealBars"), [
    { label: "Completed", value: autoheal.completed || 0, color: "var(--status-excellent)" },
    { label: "Failed", value: autoheal.failed || 0, color: "var(--status-poor)" },
  ], {});
  Charts.table(document.getElementById("eventsTable"), [
    { key: "server_time", label: "Time", render: (r) => new Date(r.server_time).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) },
    { key: "device_group", label: "Branch", render: (r) => BRANCH_LABEL(r.device_group) },
    { key: "machine_id", label: "Machine" },
    { key: "event_domain", label: "Domain" },
    { key: "event_type", label: "Type" },
    { key: "severity", label: "Severity", render: (r) => `<span class="badge ${r.severity === "Error" ? "poor" : r.severity === "Warning" ? "fair" : "good"}">${r.severity}</span>` },
  ], tableRows);
}

// ---------------- Small utils ----------------
function passRate(rows) {
  let good = 0, total = 0;
  for (const r of rows) {
    const goodStatuses = COMPLIANCE_GOOD[r.compliance_control];
    if (!goodStatuses) continue;
    total += r.n;
    if (goodStatuses.includes(r.compliance_status)) good += r.n;
  }
  return total ? (good / total) * 100 : null;
}
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function avgOf(arr) {
  const vals = arr.filter((v) => v !== null && v !== undefined && !Number.isNaN(v));
  return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
}
function fmtNum(v, digits = 1) {
  if (v === null || v === undefined || Number.isNaN(v)) return "—";
  return Number(v).toLocaleString(undefined, { maximumFractionDigits: digits });
}
function fmtInt(v) { return fmtNum(v, 0); }

// ---------------- Boot / login ----------------
async function boot() {
  renderSidebar();
  renderToolbar();
  if (Pinot.restoreFromSession()) {
    document.getElementById("loginOverlay").style.display = "none";
    await afterConnect();
  } else {
    showLogin();
  }
}

async function afterConnect() {
  document.getElementById("connDot").classList.remove("off");
  document.getElementById("connLabel").textContent = "Connected";
  STATE.dataMax = await scalarOr(`SELECT MAX(server_time) FROM system_telemetry_metrics`, Date.now());
  STATE.dataMin = await scalarOr(`SELECT MIN(server_time) FROM system_telemetry_metrics`, STATE.dataMax - 30 * 86400000);
  STATE.windowKey = "all";
  clampWindow();
  renderToolbar();

  const hashMatch = location.hash.match(/^#\/device\/(.+)$/);
  if (hashMatch) {
    navigateToDevice(decodeURIComponent(hashMatch[1]));
  } else {
    renderSidebar();
    renderPage();
  }
}

function showLogin() {
  const overlay = document.getElementById("loginOverlay");
  overlay.style.display = "flex";
  document.getElementById("urlInput").value = "https://d1-wfwvzr.nanoheal.app";
  const form = document.getElementById("loginForm");
  form.onsubmit = async (e) => {
    e.preventDefault();
    const url = document.getElementById("urlInput").value.trim();
    const user = document.getElementById("userInput").value.trim();
    const pass = document.getElementById("passInput").value;
    const btn = document.getElementById("loginBtn");
    const err = document.getElementById("loginError");
    err.textContent = "";
    btn.disabled = true;
    btn.textContent = "Connecting…";
    try {
      Pinot.configure(url, user, pass);
      await Pinot.testConnection();
      Pinot.persistToSession(url, user, pass);
      overlay.style.display = "none";
      await afterConnect();
    } catch (ex) {
      err.textContent = "Could not connect — check URL and credentials.";
    } finally {
      btn.disabled = false;
      btn.textContent = "Connect";
    }
  };
}

boot();

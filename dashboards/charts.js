// Minimal, dependency-free SVG chart primitives. No external CDN — this runs
// as a local file against a live Pinot broker, so nothing here should require
// network access besides the Pinot queries themselves.
const Charts = (() => {
  const NS = "http://www.w3.org/2000/svg";
  const fmt = (n, digits = 1) => {
    if (n === null || n === undefined || Number.isNaN(n)) return "—";
    if (Math.abs(n) >= 1000) return n.toLocaleString(undefined, { maximumFractionDigits: 0 });
    return n.toLocaleString(undefined, { maximumFractionDigits: digits });
  };

  function el(tag, attrs = {}, children = []) {
    const e = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
    for (const c of children) e.appendChild(c);
    return e;
  }

  function ensureTooltip(host) {
    let tt = host.querySelector(".chart-tt");
    if (!tt) {
      host.classList.add("tooltip-layer");
      tt = document.createElement("div");
      tt.className = "chart-tt";
      host.appendChild(tt);
    }
    return tt;
  }

  function showTooltip(host, tt, x, y, html) {
    tt.innerHTML = html;
    tt.style.display = "block";
    const hostRect = host.getBoundingClientRect();
    let left = x + 14;
    let top = y - 10;
    if (left + 180 > hostRect.width) left = x - 194;
    tt.style.left = `${left}px`;
    tt.style.top = `${Math.max(0, top)}px`;
  }
  function hideTooltip(tt) {
    tt.style.display = "none";
  }

  // ---- Horizontal bar chart ----
  // data: [{label, value, color, unit}]
  function barChartH(host, data, opts = {}) {
    host.innerHTML = "";
    if (!data.length) return emptyState(host, opts.emptyText);
    const w = opts.width || host.clientWidth || 480;
    const rowH = opts.rowH || 30;
    const gap = 10;
    const labelW = opts.labelW || 110;
    const valueW = 56;
    const plotW = w - labelW - valueW - 16;
    const h = data.length * (rowH + gap) - gap + 8;
    const max = opts.max || Math.max(...data.map((d) => d.value), 1) * 1.12;

    const svg = el("svg", { class: "chart-svg", viewBox: `0 0 ${w} ${h}`, width: "100%" });
    const tt = ensureTooltip(host);

    data.forEach((d, i) => {
      const y = i * (rowH + gap);
      const barW = Math.max(2, (d.value / max) * plotW);
      const color = d.color || "var(--cat-1)";

      svg.appendChild(
        el("text", { x: 0, y: y + rowH / 2 + 4, class: "cat-label" }, []).also((t) => (t.textContent = d.label))
      );
      const track = el("rect", {
        x: labelW, y: y + 4, width: plotW, height: rowH - 8, rx: 4,
        fill: "var(--bg-subtle)",
      });
      const bar = el("rect", {
        x: labelW, y: y + 4, width: barW, height: rowH - 8, rx: 4,
        fill: color, style: "cursor:pointer;",
      });
      const valTxt = el("text", {
        x: labelW + plotW + 10, y: y + rowH / 2 + 4, class: "bar-label",
      }).also((t) => (t.textContent = `${fmt(d.value)}${d.unit || ""}`));

      bar.addEventListener("mousemove", (ev) => {
        const rect = host.getBoundingClientRect();
        showTooltip(host, tt, ev.clientX - rect.left, ev.clientY - rect.top,
          `<div class="tt-title">${d.label}</div><div class="tt-row"><span class="sw" style="background:${color}"></span>${fmt(d.value)}${d.unit || ""}${d.sublabel ? ` · ${d.sublabel}` : ""}</div>`);
      });
      bar.addEventListener("mouseleave", () => hideTooltip(tt));

      svg.appendChild(track);
      svg.appendChild(bar);
      svg.appendChild(valTxt);
    });

    host.appendChild(svg);
  }

  // ---- Multi-series line chart over time ----
  // series: [{name, color, points:[{t: msEpoch, v: number}]}]
  function lineChart(host, series, opts = {}) {
    host.innerHTML = "";
    const allPts = series.flatMap((s) => s.points);
    if (!allPts.length) return emptyState(host, opts.emptyText);

    const w = opts.width || host.clientWidth || 600;
    const h = opts.height || 220;
    const padL = 40, padR = 12, padT = 14, padB = 26;
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;

    const xs = allPts.map((p) => p.t);
    const ys = allPts.map((p) => p.v);
    const xMin = Math.min(...xs), xMax = Math.max(...xs);
    const yMin = opts.yMin !== undefined ? opts.yMin : Math.min(0, ...ys);
    const yMax = opts.yMax !== undefined ? opts.yMax : Math.max(...ys) * 1.15 || 1;

    const xScale = (t) => padL + ((t - xMin) / (xMax - xMin || 1)) * plotW;
    const yScale = (v) => padT + plotH - ((v - yMin) / (yMax - yMin || 1)) * plotH;

    const svg = el("svg", { class: "chart-svg", viewBox: `0 0 ${w} ${h}`, width: "100%" });
    const tt = ensureTooltip(host);

    // gridlines (4 horizontal)
    const steps = 4;
    for (let i = 0; i <= steps; i++) {
      const v = yMin + ((yMax - yMin) * i) / steps;
      const y = yScale(v);
      svg.appendChild(el("line", { x1: padL, x2: w - padR, y1: y, y2: y, class: "grid-line" }));
      svg.appendChild(el("text", { x: 4, y: y + 3, class: "axis-label" }).also((t) => (t.textContent = fmt(v, opts.yDigits ?? 0))));
    }
    // x-axis labels: first, mid, last
    [0, 0.5, 1].forEach((frac) => {
      const t = xMin + (xMax - xMin) * frac;
      const x = xScale(t);
      const d = new Date(t);
      const label = opts.dateFmt ? opts.dateFmt(d) : `${d.getMonth() + 1}/${d.getDate()}`;
      svg.appendChild(el("text", { x, y: h - 6, class: "axis-label", "text-anchor": frac === 0 ? "start" : frac === 1 ? "end" : "middle" }).also((t2) => (t2.textContent = label)));
    });

    series.forEach((s) => {
      if (!s.points.length) return;
      const sorted = [...s.points].sort((a, b) => a.t - b.t);
      const d = sorted.map((p, i) => `${i === 0 ? "M" : "L"}${xScale(p.t).toFixed(1)},${yScale(p.v).toFixed(1)}`).join(" ");
      svg.appendChild(el("path", { d, fill: "none", stroke: s.color, "stroke-width": 2, "stroke-linecap": "round", "stroke-linejoin": "round" }));
    });

    // hover crosshair using nearest-point on first series' x grid
    const hoverLine = el("line", { x1: 0, x2: 0, y1: padT, y2: padT + plotH, stroke: "var(--border-strong)", "stroke-width": 1, style: "display:none" });
    svg.appendChild(hoverLine);

    const overlay = el("rect", { x: padL, y: padT, width: plotW, height: plotH, fill: "transparent", style: "cursor:crosshair;" });
    overlay.addEventListener("mousemove", (ev) => {
      const rect = svg.getBoundingClientRect();
      const scaleX = w / rect.width;
      const mx = (ev.clientX - rect.left) * scaleX;
      const t = xMin + ((mx - padL) / plotW) * (xMax - xMin);
      hoverLine.setAttribute("x1", mx);
      hoverLine.setAttribute("x2", mx);
      hoverLine.style.display = "block";

      const rows = series
        .map((s) => {
          if (!s.points.length) return null;
          const nearest = s.points.reduce((a, b) => (Math.abs(b.t - t) < Math.abs(a.t - t) ? b : a));
          return { name: s.name, color: s.color, v: nearest.v, t: nearest.t };
        })
        .filter(Boolean);
      if (!rows.length) return;
      const d = new Date(rows[0].t);
      const html =
        `<div class="tt-title">${d.toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</div>` +
        rows.map((r) => `<div class="tt-row"><span class="sw" style="background:${r.color}"></span>${r.name}: ${fmt(r.v, opts.yDigits ?? 1)}${opts.unit || ""}</div>`).join("");
      const hostRect = host.getBoundingClientRect();
      showTooltip(host, tt, (ev.clientX - hostRect.left), (ev.clientY - hostRect.top), html);
    });
    overlay.addEventListener("mouseleave", () => {
      hoverLine.style.display = "none";
      hideTooltip(tt);
    });
    svg.appendChild(overlay);

    host.appendChild(svg);

    if (series.length > 1) {
      const legend = document.createElement("div");
      legend.className = "legend";
      legend.innerHTML = series
        .map((s) => `<span class="item"><span class="sw" style="background:${s.color}"></span>${s.name}</span>`)
        .join("");
      host.appendChild(legend);
    }
  }

  // ---- Donut / score ring ----
  function scoreRing(host, value, opts = {}) {
    host.innerHTML = "";
    const size = opts.size || 132;
    const stroke = opts.stroke || 12;
    const r = (size - stroke) / 2;
    const c = 2 * Math.PI * r;
    const pct = Math.max(0, Math.min(100, value)) / 100;
    const color = opts.color || statusColorForScore(value);

    const svg = el("svg", { viewBox: `0 0 ${size} ${size}`, width: size, height: size });
    svg.appendChild(el("circle", { cx: size / 2, cy: size / 2, r, fill: "none", stroke: "var(--bg-subtle)", "stroke-width": stroke }));
    const arc = el("circle", {
      cx: size / 2, cy: size / 2, r, fill: "none", stroke: color, "stroke-width": stroke,
      "stroke-dasharray": `${c * pct} ${c}`, "stroke-linecap": "round",
      transform: `rotate(-90 ${size / 2} ${size / 2})`,
    });
    svg.appendChild(arc);
    const text = el("text", { x: size / 2, y: size / 2 + 8, "text-anchor": "middle", fill: "var(--text-primary)", style: "font-size:30px;font-weight:600;font-family:var(--font-mono);" });
    text.textContent = Number.isFinite(value) ? Math.round(value) : "—";
    svg.appendChild(text);
    host.appendChild(svg);
  }

  function statusColorForScore(v) {
    if (v >= 85) return "var(--status-excellent)";
    if (v >= 70) return "var(--status-good)";
    if (v >= 55) return "var(--status-fair)";
    return "var(--status-poor)";
  }
  function statusLabelForScore(v) {
    if (v >= 85) return "excellent";
    if (v >= 70) return "good";
    if (v >= 55) return "fair";
    return "poor";
  }

  function emptyState(host, text) {
    const d = document.createElement("div");
    d.className = "empty-state";
    d.innerHTML = `<div>${text || "No data for the selected filters"}</div>`;
    host.appendChild(d);
  }

  function table(host, columns, rows, opts = {}) {
    host.innerHTML = "";
    if (!rows.length) return emptyState(host, opts.emptyText);
    const wrap = document.createElement("div");
    wrap.className = "table-scroll";
    const t = document.createElement("table");
    t.className = "data-table";
    const thead = document.createElement("thead");
    thead.innerHTML = `<tr>${columns.map((c) => `<th class="${c.num ? "num" : ""}">${c.label}</th>`).join("")}</tr>`;
    const tbody = document.createElement("tbody");
    tbody.innerHTML = rows
      .map(
        (r) =>
          `<tr>${columns.map((c) => `<td class="${c.num ? "num" : ""}">${c.render ? c.render(r) : r[c.key] ?? "—"}</td>`).join("")}</tr>`
      )
      .join("");
    t.appendChild(thead);
    t.appendChild(tbody);
    wrap.appendChild(t);
    host.appendChild(wrap);
    if (opts.onRowClick) {
      [...tbody.children].forEach((tr, i) => {
        tr.style.cursor = "pointer";
        tr.addEventListener("click", () => opts.onRowClick(rows[i]));
      });
    }
  }

  // ---- Distribution strip ----
  // A single average hides exactly the thing that matters most in fleet
  // monitoring: one device pegged at 99% reads identically to eight devices
  // idling at 12% once you collapse them to a mean. This renders every point
  // (one per device) on a shared 0..max axis so the spread is visible at a
  // glance, with points past `threshold` called out in the "poor" color.
  function distStrip(host, points, opts = {}) {
    host.innerHTML = "";
    if (!points.length) return emptyState(host, opts.emptyText);
    const w = opts.width || host.clientWidth || 280;
    const h = 34;
    const padL = 4, padR = 4;
    const max = opts.max ?? Math.max(...points.map((p) => p.value), 1) * 1.05;
    const threshold = opts.threshold;
    const x = (v) => padL + (v / max) * (w - padL - padR);

    const svg = el("svg", { class: "chart-svg", viewBox: `0 0 ${w} ${h}`, width: "100%", height: h });
    const tt = ensureTooltip(host);

    svg.appendChild(el("line", { x1: padL, x2: w - padR, y1: h / 2, y2: h / 2, class: "grid-line" }));
    if (threshold !== undefined) {
      const tx = x(threshold);
      svg.appendChild(el("line", { x1: tx, x2: tx, y1: 4, y2: h - 4, stroke: "var(--status-poor)", "stroke-width": 1, "stroke-dasharray": "3,3", opacity: 0.6 }));
    }

    const high = opts.high !== false;
    points.forEach((p) => {
      const isOutlier = threshold !== undefined && (high ? p.value > threshold : p.value < threshold);
      const dot = el("circle", {
        cx: x(p.value), cy: h / 2, r: isOutlier ? 6 : 4.5,
        fill: isOutlier ? "var(--status-poor)" : "var(--brand-primary)",
        stroke: "var(--bg-surface)", "stroke-width": 1.5, style: "cursor:pointer;",
      });
      dot.addEventListener("mousemove", (ev) => {
        const rect = host.getBoundingClientRect();
        showTooltip(host, tt, ev.clientX - rect.left, ev.clientY - rect.top,
          `<div class="tt-title">${p.label}</div><div class="tt-row">${fmt(p.value)}${opts.unit || ""}</div>`);
      });
      dot.addEventListener("mouseleave", () => hideTooltip(tt));
      svg.appendChild(dot);
    });

    host.appendChild(svg);
  }

  // ---- Percentile-marker strip ----
  // distStrip renders one dot per device — fine at 8, unreadable and DOM-heavy
  // at 100,000. This renders the same axis but with a fixed 4 tick marks
  // (P50/P90/P99/max), computed server-side via PERCENTILETDIGEST, so cost and
  // legibility stay flat no matter how many devices are behind the number.
  function percentileStrip(host, { p50, p90, p99, max }, opts = {}) {
    host.innerHTML = "";
    if (p50 === null || p50 === undefined) return emptyState(host, opts.emptyText);
    const w = opts.width || host.clientWidth || 280;
    const h = 34;
    const padL = 4, padR = 4;
    const axisMax = opts.max ?? max * 1.05;
    const x = (v) => padL + (v / axisMax) * (w - padL - padR);
    const marks = [
      { v: p50, label: "P50", color: "var(--brand-primary)" },
      { v: p90, label: "P90", color: "var(--brand-primary)" },
      { v: p99, label: "P99", color: "var(--status-fair)" },
      { v: max, label: "max", color: "var(--status-poor)" },
    ].filter((m) => m.v !== null && m.v !== undefined);

    const svg = el("svg", { class: "chart-svg", viewBox: `0 0 ${w} ${h}`, width: "100%", height: h });
    const tt = ensureTooltip(host);
    svg.appendChild(el("line", { x1: padL, x2: w - padR, y1: h / 2, y2: h / 2, class: "grid-line" }));

    marks.forEach((m) => {
      const dot = el("circle", { cx: x(m.v), cy: h / 2, r: 5, fill: m.color, stroke: "var(--bg-surface)", "stroke-width": 1.5, style: "cursor:pointer;" });
      dot.addEventListener("mousemove", (ev) => {
        const rect = host.getBoundingClientRect();
        showTooltip(host, tt, ev.clientX - rect.left, ev.clientY - rect.top,
          `<div class="tt-title">${m.label}</div><div class="tt-row">${fmt(m.v)}${opts.unit || ""}</div>`);
      });
      dot.addEventListener("mouseleave", () => hideTooltip(tt));
      svg.appendChild(dot);
    });
    host.appendChild(svg);
  }

  return { barChartH, lineChart, scoreRing, statusColorForScore, statusLabelForScore, table, distStrip, percentileStrip, emptyState, fmt };
})();

// tiny helper used above
Object.defineProperty(Element.prototype, "also", {
  value: function (fn) {
    fn(this);
    return this;
  },
  enumerable: false,
});

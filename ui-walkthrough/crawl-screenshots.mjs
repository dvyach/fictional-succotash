/**
 * Live AEX UI crawl — wait for data, screenshot pages + overlays + DEX reports.
 * Usage: node crawl-screenshots.mjs
 */
import { chromium } from '../../AEX/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, 'screenshots');
const META = path.join(__dirname, 'crawl-meta.json');
const DASHBOARDS_CFG = path.join(
  __dirname,
  '../../AEX/aex-V1.2/frontend/src/config/dashboards-config.json'
);
const BASE = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:5176';
const EMAIL = process.env.AEX_TEST_EMAIL ?? 'admin@nanoheal.com';
const PASSWORD = process.env.AEX_TEST_PASSWORD ?? 'nanoheal@123';

/** Enabled sidebar leaves */
const ENABLED_PAGES = [
  { section: 'Home', id: 'experience-dashboard', label: 'Overview', path: '/home' },
  { section: 'Home', id: 'home-recent-activity', label: 'Recent Activity', path: '/settings/audit/activity-log' },
  { section: 'Automate', id: 'automation-config', label: 'Automation', path: '/actions/library' },
  { section: 'Automate', id: 'visual-builder', label: 'Workflow Builder', path: '/actions/library/visual-builder' },
  { section: 'Automate', id: 'insights-campaigns', label: 'Survey', path: '/actions/campaigns' },
  { section: 'Automate', id: 'data-collection', label: 'Data Collection', path: '/actions/catalogs/data-collection' },
  { section: 'Automate', id: 'protection-policies', label: 'Device Protection', path: '/actions/catalogs/device-protection' },
  { section: 'Automate', id: 'gpo-catalog', label: 'GPO', path: '/actions/catalogs/gpo-templates' },
  { section: 'Automate', id: 'pending-changes', label: 'Pending Publish', path: '/actions/pending-publish' },
  { section: 'Innovate', id: 'innovate-assistant', label: 'AI Helpdesk', path: '/innovate/conversation' },
  { section: 'Innovate', id: 'innovate-investigations', label: 'Investigations', path: '/innovate/haya' },
  { section: 'Innovate', id: 'innovate-anomaly', label: 'Anomaly Detection', path: '/innovate/clusters' },
  { section: 'Innovate', id: 'innovate-forecasts', label: 'Forecasting', path: '/innovate/forecasts' },
  { section: 'Innovate', id: 'innovate-query-builder', label: 'Query Builder', path: '/insights/exploration/query-builder' },
  { section: 'Innovate', id: 'innovate-agent-workbench', label: 'Agent Workbench', path: '/insights/exploration/agent-workbench' },
  { section: 'Innovate', id: 'innovate-alerts', label: 'Alerts', path: '/innovate/haya?feature=alerts' },
  { section: 'Experience', id: 'dex-dashboards', label: 'Dashboards catalog', path: '/experience/dashboards' },
  { section: 'Experience', id: 'dex-reports', label: 'Reports', path: '/experience/reports' },
  { section: 'Experience', id: 'dex-employee', label: 'Employee Experience', path: '/experience/employee' },
  { section: 'Experience', id: 'dex-device', label: 'Device Experience', path: '/experience/device' },
  { section: 'Experience', id: 'dex-application', label: 'Application Experience', path: '/experience/application' },
  { section: 'Experience', id: 'dex-network', label: 'Network Experience', path: '/experience/network' },
  { section: 'Experience', id: 'compliance-score', label: 'Digital Experience', path: '/experience/compliance-score' },
  { section: 'Experience', id: 'dex-benchmarks', label: 'Benchmarks', path: '/experience/benchmarks' },
  { section: 'Experience', id: 'compliance-trends', label: 'Trends', path: '/experience/trends' },
  { section: 'Manage', id: 'census', label: 'Inventory', path: '/devices/inventory/census' },
  { section: 'Manage', id: 'devices-device-explorer', label: 'Device Explorer', path: '/devices/inventory/device-explorer' },
  { section: 'Manage', id: 'actions-results', label: 'Execution History', path: '/manage/execution-history' },
  { section: 'Manage', id: 'automate-remote-execution', label: 'Remote Execution', path: '/actions/execution/remediation' },
  { section: 'Manage', id: 'manage-swd', label: 'Software Distribution', path: '/devices/software/software-distribution' },
  { section: 'Manage', id: 'swd-push-audit', label: 'Deploy', path: '/devices/software/swd-push-audit' },
  { section: 'Manage', id: 'manage-patch', label: 'Patch Management', path: '/devices/software/patch-management' },
  { section: 'Manage', id: 'issues-compliance-violations', label: 'Violations', path: '/innovate/haya?feature=violations' },
  { section: 'Administration', id: 'tenants', label: 'Tenants', path: '/settings/organization/tenants' },
  { section: 'Administration', id: 'org-branding', label: 'Branding', path: '/manage/organisation/branding' },
  { section: 'Administration', id: 'admin-licensing', label: 'Licensing', path: '/settings/licensing' },
  { section: 'Administration', id: 'platform-integration', label: 'Integrations', path: '/settings/integrations' },
  { section: 'Administration', id: 'admin-agent-mgmt', label: 'Agent Management', path: '/settings/agents' },
  { section: 'Administration', id: 'access-security', label: 'Users & Access', path: '/settings/users' },
  { section: 'Administration', id: 'settings-security', label: 'Security', path: '/settings/security' },
  { section: 'Administration', id: 'device-classification', label: 'Classification', path: '/devices/organization/device-classification' },
  { section: 'Administration', id: 'audit-logs', label: 'Audit', path: '/settings/audit' },
  { section: 'Administration', id: 'scoring', label: 'Score Models', path: '/compliance/policy/score-models' },
  { section: 'Settings', id: 'account-profile', label: 'Profile', path: '/account/profile' },
  { section: 'Settings', id: 'account-preferences', label: 'Preferences', path: '/account/preferences' },
  { section: 'Header', id: 'header-help-feedback', label: 'Help & Feedback', path: '/experience/help' },
];

/** Menu items with enabled=false in seed — still routed; capture for completeness */
const DISABLED_MENU_PAGES = [
  { section: 'Disabled menu', id: 'automate-scheduling', label: 'Scheduling', path: '/actions/scheduling', menuEnabled: false },
  { section: 'Disabled menu', id: 'monitoring-profiles', label: 'Monitoring', path: '/actions/catalogs/data-collection', menuEnabled: false },
  { section: 'Disabled menu', id: 'haya', label: 'Haya', path: '/innovate/haya', menuEnabled: false },
  { section: 'Disabled menu', id: 'innovate-recommendations', label: 'Recommendations', path: '/innovate/haya?feature=recommendations', menuEnabled: false },
  { section: 'Disabled menu', id: 'innovate-automation-insights', label: 'Automation Insights', path: '/innovate/haya?feature=automation-insights', menuEnabled: false },
  { section: 'Disabled menu', id: 'innovate-knowledge', label: 'Knowledge', path: '/innovate/haya?feature=knowledge', menuEnabled: false },
  { section: 'Disabled menu', id: 'compliance-alert-rules', label: 'Alert rules', path: '/innovate/haya?feature=alert-rules', menuEnabled: false },
  { section: 'Disabled menu', id: 'admin-deployment', label: 'Deployment', path: '/settings/deployment', menuEnabled: false },
  { section: 'Disabled menu', id: 'census-device-updates', label: 'Updates', path: '/devices/software/device-updates', menuEnabled: false },
  { section: 'Disabled menu', id: 'version-catalog', label: 'Version Catalog', path: '/settings/agents', menuEnabled: false },
  { section: 'Disabled menu', id: 'gpo-policies', label: 'GPO Policies', path: '/compliance/gpo-policies', menuEnabled: false },
  { section: 'Disabled menu', id: 'compliance-policy-execution', label: 'Policy Execution', path: '/compliance/policy-execution', menuEnabled: false },
];

function loadDexReportPages() {
  const cfg = JSON.parse(fs.readFileSync(DASHBOARDS_CFG, 'utf8'));
  return (cfg.dashboards || []).map((d) => ({
    section: 'DEX report views',
    id: `dex-view-${d.id}`,
    label: d.title,
    path: `/experience/dashboard/view/${d.internalDashboardId}`,
    catalogId: d.id,
    category: d.category,
    description: d.description,
  }));
}

function slug(s) {
  return String(s)
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
    .slice(0, 80);
}

/** Playwright: arg is 2nd param; options must be 3rd. */
async function waitFn(page, fn, timeoutMs) {
  await page.waitForFunction(fn, null, { timeout: timeoutMs });
}

async function waitForShell(page, timeoutMs = 120_000) {
  await waitFn(
    page,
    () => {
      const t = document.body?.innerText || '';
      if (t.includes('Loading runtime')) return false;
      if (t.includes('Loading sign in')) return false;
      return /Welcome|Automate|Inventory|Administration|Experience|Home|Devices/i.test(t);
    },
    timeoutMs
  );
  // Soft-wait for sidebar menu (do not fail the crawl if menu stays pending)
  await waitFn(
    page,
    () => !document.body.innerText.includes('Loading menu items'),
    20_000
  ).catch(() => {});
}

/**
 * Wait until page content is past skeleton / "Loading…" primary states.
 * Accepts empty/coming-soon states as ready. On timeout, caller may still screenshot.
 */
async function waitForContentReady(page, timeoutMs = 90_000) {
  await waitForShell(page);
  try {
    await waitFn(
      page,
      () => {
        const main = document.querySelector('main') || document.body;
        const t = (main.innerText || '').replace(/\s+/g, ' ').trim();
        if (!t || t.includes('Loading runtime')) return false;

        const pulses = main.querySelectorAll(
          '[class*="animate-pulse"], [class*="skeleton"], [data-loading="true"]'
        ).length;
        if (pulses >= 6) return false;

        if (/^(Loading[….]*|Loading…)$/i.test(t) || (t.length < 40 && /Loading/i.test(t))) {
          return false;
        }

        if (
          /No (record|execution|audit|conversation|rows|devices)|Coming soon|not available yet|What can I help|What needs fixing|Create |Add |Columns|Filters|No conversations yet|Schedules|Device updates|Policy execution/i.test(
            t
          )
        ) {
          return true;
        }

        return t.length > 120;
      },
      timeoutMs
    );
  } catch {
    // Soft: proceed; capture() notes stillLoading if still bad
  }
  await page.waitForTimeout(2500);
}

async function dismissChrome(page) {
  await page.keyboard.press('Escape').catch(() => {});
  await page.waitForTimeout(200);
  // Close login success / toast if present
  const toastClose = page.locator('[data-sonner-toast] button, [role="status"] button').first();
  if (await toastClose.isVisible().catch(() => false)) {
    await toastClose.click().catch(() => {});
  }
}

async function login(page) {
  await page.goto(`${BASE}/login`, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await page.waitForTimeout(1500);
  if (!page.url().includes('login')) {
    await waitForContentReady(page);
    return;
  }
  const emailField = page.getByLabel(/email or username/i);
  await emailField.waitFor({ timeout: 30_000 });
  const fillDev = page.getByRole('button', { name: /fill dev credentials/i });
  if (await fillDev.isVisible().catch(() => false)) {
    await fillDev.click();
  } else {
    await emailField.fill(EMAIL);
    await page.getByLabel(/^password$/i).fill(PASSWORD);
  }
  await page.getByRole('button', { name: /^(login|get started|sign in)$/i }).click();
  await page.waitForURL((u) => !u.pathname.includes('login'), { timeout: 90_000 });
  await waitForContentReady(page);
  await dismissChrome(page);
}

async function pageNotes(page) {
  return page.evaluate(() => {
    const h1 = document.querySelector('h1')?.textContent?.trim() || '';
    const h2 = [...document.querySelectorAll('h2')]
      .slice(0, 4)
      .map((el) => el.textContent?.trim())
      .filter(Boolean);
    const bodyText = (document.querySelector('main') || document.body)?.innerText || '';
    const snippet = bodyText.replace(/\s+/g, ' ').trim().slice(0, 400);
    const comingSoon = /coming soon|not available yet|under construction/i.test(bodyText);
    const stillLoading =
      /Loading runtime|Loading menu items/i.test(bodyText) ||
      document.querySelectorAll('[class*="animate-pulse"]').length >= 6;
    const overlayOpen = Boolean(
      document.querySelector('[role="dialog"], [data-state="open"][role="dialog"], aside[data-state="open"]')
    );
    return { h1, h2, snippet, comingSoon, stillLoading, overlayOpen, title: document.title };
  });
}

async function capture(page, results, item) {
  const idx = String(results.length + 1).padStart(3, '0');
  const file = `${idx}-${slug(item.section)}-${slug(item.label)}.png`;
  const outPath = path.join(OUT, file);
  console.log(`→ ${item.section} / ${item.label} (${item.path || item.kind || ''})`);
  try {
    const notes = await pageNotes(page);
    if (notes.stillLoading) {
      console.warn(`  warn: still loading indicators on ${item.label}`);
    }
    await page.screenshot({ path: outPath, fullPage: false });
    results.push({
      ...item,
      file,
      finalUrl: page.url(),
      ok: !page.url().includes('/login'),
      notes,
    });
    console.log(`  saved ${file} h1="${notes.h1}" loading=${notes.stillLoading}`);
  } catch (err) {
    results.push({
      ...item,
      file,
      ok: false,
      error: String(err?.message || err),
      finalUrl: page.url(),
    });
    console.error(`  FAIL`, err?.message || err);
  }
}

async function gotoAndReady(page, urlPath) {
  await page.goto(`${BASE}${urlPath}`, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await waitForContentReady(page);
  await dismissChrome(page);
}

async function clickFirstMatching(page, names) {
  for (const name of names) {
    const btn = page.getByRole('button', { name }).first();
    if (await btn.isVisible().catch(() => false)) {
      await btn.click();
      return true;
    }
  }
  // Fallback: link-styled create
  for (const name of names) {
    const link = page.getByRole('link', { name }).first();
    if (await link.isVisible().catch(() => false)) {
      await link.click();
      return true;
    }
  }
  return false;
}

async function waitForOverlay(page, timeoutMs = 30_000) {
  await waitFn(
    page,
    () => {
      const dlg = document.querySelector('[role="dialog"]');
      if (dlg && (dlg.getAttribute('data-state') === 'open' || dlg.offsetParent !== null)) return true;
      const sheets = [...document.querySelectorAll('[data-state="open"]')].filter((el) =>
        /sheet|drawer|dialog|overlay/i.test(el.className + (el.getAttribute('class') || ''))
      );
      if (sheets.length) return true;
      const text = document.body.innerText || '';
      return (
        /Create |New |Add |Save|Cancel|Enrollment|Download/i.test(text) &&
        document.querySelectorAll('[role="dialog"], [class*="Sheet"], [class*="sheet"]').length > 0
      );
    },
    timeoutMs
  );
  await page.waitForTimeout(1500);
}

async function closeOverlay(page) {
  await page.keyboard.press('Escape').catch(() => {});
  await page.waitForTimeout(400);
  await page.keyboard.press('Escape').catch(() => {});
  await page.waitForTimeout(300);
}

/** Create/edit overlays & drawers opened from list pages */
async function captureOverlays(page, results) {
  const overlays = [
    {
      id: 'overlay-users-create',
      label: 'Users — Create overlay',
      path: '/settings/users',
      openNames: [/^Create$/i],
    },
    {
      id: 'overlay-classification-create',
      label: 'Classification — Create overlay',
      path: '/devices/organization/device-classification',
      openNames: [/^Create$/i],
    },
    {
      id: 'overlay-tenants-create',
      label: 'Tenants — Create overlay',
      path: '/settings/organization/tenants',
      openNames: [/^Create$/i],
    },
    {
      id: 'overlay-automation-create',
      label: 'Automation — Create overlay',
      path: '/actions/library',
      openNames: [/^Create$/i],
    },
    {
      id: 'overlay-data-collection-create',
      label: 'Data Collection — Create overlay',
      path: '/actions/catalogs/data-collection',
      openNames: [/^Create$/i],
    },
    {
      id: 'overlay-device-protection-create',
      label: 'Device Protection — Create overlay',
      path: '/actions/catalogs/device-protection',
      openNames: [/^Create$/i],
    },
    {
      id: 'overlay-integrations-add',
      label: 'Integrations — Add connector',
      path: '/settings/integrations',
      openNames: [/Add connector/i, /^Create$/i, /Add /i],
    },
    {
      id: 'overlay-inventory-add-device',
      label: 'Inventory — Add device',
      path: '/devices/inventory/census',
      openNames: [/Add device/i],
    },
    {
      id: 'overlay-score-models-create',
      label: 'Score Models — Create overlay',
      path: '/compliance/policy/score-models',
      openNames: [/^Create$/i, /\+ Create/i, /New /i, /Add /i],
    },
    {
      id: 'overlay-swd-create',
      label: 'Software Distribution — Create overlay',
      path: '/devices/software/software-distribution',
      openNames: [/^Create$/i, /\+ Create/i, /New profile/i, /Add /i],
    },
  ];

  for (const o of overlays) {
    const item = { section: 'Create / edit overlays', ...o };
    try {
      await gotoAndReady(page, o.path);
      const opened = await clickFirstMatching(page, o.openNames);
      if (!opened) throw new Error(`Create/open control not found on ${o.path}`);
      await waitForOverlay(page).catch(async () => {
        // Some creates open inline panes without role=dialog — wait for form fields
        await page.waitForTimeout(2000);
      });
      await waitForContentReady(page).catch(() => {});
      await capture(page, results, item);
      await closeOverlay(page);
    } catch (err) {
      results.push({
        ...item,
        file: null,
        ok: false,
        error: String(err?.message || err),
        finalUrl: page.url(),
      });
      console.error(`  FAIL overlay ${o.label}`, err?.message || err);
      await closeOverlay(page);
    }
  }
}

async function captureDeviceDetail(page, results) {
  console.log('→ Device detail drawer / full page');
  try {
    await gotoAndReady(page, '/devices/inventory/census');
    await waitFn(
      page,
      () => {
        const rows = document.querySelectorAll('table tbody tr');
        if (rows.length < 1) return false;
        return document.querySelectorAll('[class*="animate-pulse"]').length < 6;
      },
      90_000
    );
    await page.waitForTimeout(1000);

    const firstRow = page.locator('table tbody tr').first();
    if (!(await firstRow.isVisible().catch(() => false))) {
      await capture(page, results, {
        section: 'Device detail',
        id: 'device-detail-skipped',
        label: 'Device detail (no rows)',
        path: '/devices/inventory/census',
      });
      return;
    }

    // Click device/endpoint cell (skip checkbox column)
    const nameCell = firstRow.locator('td').nth(1);
    if (await nameCell.isVisible().catch(() => false)) {
      await nameCell.click();
    } else {
      await firstRow.click({ position: { x: 120, y: 14 } });
    }
    await page.waitForTimeout(3000);

    const overlayVisible = await page
      .locator('[role="dialog"]')
      .first()
      .isVisible()
      .catch(() => false);

    if (overlayVisible) {
      await page.waitForTimeout(2000);
      await capture(page, results, {
        section: 'Device detail',
        id: 'device-detail-drawer',
        label: 'Inventory — Device detail drawer',
        path: '/devices/inventory/census',
        kind: 'drawer',
      });

      const fullBtn = page.getByRole('button', { name: /full page|view full|open full/i }).first();
      if (await fullBtn.isVisible().catch(() => false)) {
        await fullBtn.click();
        await waitForContentReady(page);
        await capture(page, results, {
          section: 'Device detail',
          id: 'device-detail-full',
          label: 'Device detail — full page',
          path: page.url().replace(BASE, '') || '/devices/view',
        });
        return;
      }
      await closeOverlay(page);
    }

    // Resolve device id from row link or API-ish href
    const href = await firstRow
      .locator('a[href]')
      .first()
      .getAttribute('href')
      .catch(() => null);
    let deviceId = null;
    if (href) {
      const m = href.match(/\/(?:devices\/view|census|inventory)\/([^/?#]+)/);
      deviceId = m?.[1] || null;
    }
    if (!deviceId) {
      // Read host name and search list API is unavailable; try census full-page path from data attributes
      deviceId = await firstRow.getAttribute('data-id').catch(() => null);
      if (!deviceId) {
        deviceId = await firstRow.getAttribute('data-row-id').catch(() => null);
      }
    }

    if (deviceId) {
      await gotoAndReady(page, `/devices/view/${deviceId}`);
      await capture(page, results, {
        section: 'Device detail',
        id: 'device-detail-full',
        label: 'Device detail — full page',
        path: `/devices/view/${deviceId}`,
      });
    } else if (!overlayVisible) {
      throw new Error('Could not open device drawer or resolve device id');
    }
  } catch (err) {
    results.push({
      section: 'Device detail',
      id: 'device-detail',
      label: 'Device detail',
      ok: false,
      error: String(err?.message || err),
      finalUrl: page.url(),
    });
    console.error('  FAIL device detail', err?.message || err);
  }
}

async function captureWorkflowCreate(page, results) {
  try {
    await gotoAndReady(page, '/actions/library/visual-builder');
    const blank = page.getByRole('button', { name: /Blank workflow/i }).first();
    const blankCard = page.getByText(/Blank workflow/i).first();
    if (await blank.isVisible().catch(() => false)) {
      await blank.click();
    } else if (await blankCard.isVisible().catch(() => false)) {
      await blankCard.click();
    } else {
      throw new Error('Blank workflow control not found');
    }
    await page.waitForTimeout(3000);
    await waitForContentReady(page).catch(() => {});
    await capture(page, results, {
      section: 'Create / edit overlays',
      id: 'overlay-workflow-blank',
      label: 'Workflow Builder — Blank workflow',
      path: '/actions/library/visual-builder',
    });
  } catch (err) {
    results.push({
      section: 'Create / edit overlays',
      id: 'overlay-workflow-blank',
      label: 'Workflow Builder — Blank workflow',
      ok: false,
      error: String(err?.message || err),
    });
    console.error('  FAIL blank workflow', err?.message || err);
  }
}

fs.mkdirSync(OUT, { recursive: true });
// Clear previous PNGs so numbering stays consistent
for (const f of fs.readdirSync(OUT)) {
  if (f.endsWith('.png')) fs.unlinkSync(path.join(OUT, f));
}

const dexPages = loadDexReportPages();
const allPages = [...ENABLED_PAGES, ...DISABLED_MENU_PAGES, ...dexPages];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const page = await context.newPage();

console.log('Logging in…');
await login(page);
console.log('Logged in at', page.url());

const results = [];

for (const item of allPages) {
  try {
    await gotoAndReady(page, item.path);
    await capture(page, results, item);
  } catch (err) {
    results.push({
      ...item,
      ok: false,
      error: String(err?.message || err),
      finalUrl: page.url(),
    });
    console.error(`  FAIL nav ${item.label}`, err?.message || err);
  }
}

await captureOverlays(page, results);
await captureWorkflowCreate(page, results);
await captureDeviceDetail(page, results);

fs.writeFileSync(
  META,
  JSON.stringify(
    {
      capturedAt: new Date().toISOString(),
      base: BASE,
      counts: {
        enabledPages: ENABLED_PAGES.length,
        disabledMenu: DISABLED_MENU_PAGES.length,
        dexReports: dexPages.length,
        totalResults: results.length,
        ok: results.filter((r) => r.ok).length,
      },
      results,
    },
    null,
    2
  )
);
console.log(
  `Done. ${results.filter((r) => r.ok).length}/${results.length} ok → ${META}`
);
await browser.close();

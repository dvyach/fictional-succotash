/**
 * Deep UI flows for walkthrough: Workflow Builder steps + SWD create + priority re-shots.
 * Appends to crawl-meta.json / screenshots/.
 *
 * Usage: node crawl-deep-flows.mjs
 */
import { chromium } from '../../AEX/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, 'screenshots');
const META = path.join(__dirname, 'crawl-meta.json');
const BASE = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:5176';
const EMAIL = process.env.AEX_TEST_EMAIL ?? 'admin@nanoheal.com';
const PASSWORD = process.env.AEX_TEST_PASSWORD ?? 'nanoheal@123';

function slug(s) {
  return String(s)
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
    .slice(0, 80);
}

async function waitFn(page, fn, timeoutMs) {
  await page.waitForFunction(fn, null, { timeout: timeoutMs });
}

async function waitForShell(page, timeoutMs = 120_000) {
  await waitFn(
    page,
    () => {
      const t = document.body?.innerText || '';
      if (t.includes('Loading runtime') || t.includes('Loading sign in')) return false;
      return /Welcome|Automate|Inventory|Administration|Experience|Home|Devices/i.test(t);
    },
    timeoutMs
  );
  await waitFn(page, () => !document.body.innerText.includes('Loading menu items'), 20_000).catch(
    () => {}
  );
}

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
        if (t.length < 40 && /Loading/i.test(t)) return false;
        return t.length > 80;
      },
      timeoutMs
    );
  } catch {
    /* soft */
  }
  await page.waitForTimeout(2000);
}

async function login(page) {
  await page.goto(`${BASE}/login`, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await page.waitForTimeout(1200);
  if (!page.url().includes('login')) {
    await waitForContentReady(page);
    return;
  }
  const fillDev = page.getByRole('button', { name: /fill dev credentials/i });
  if (await fillDev.isVisible().catch(() => false)) {
    await fillDev.click();
  } else {
    await page.getByLabel(/email or username/i).fill(EMAIL);
    await page.getByLabel(/^password$/i).fill(PASSWORD);
  }
  await page.getByRole('button', { name: /^(login|get started|sign in)$/i }).click();
  await page.waitForURL((u) => !u.pathname.includes('login'), { timeout: 90_000 });
  await waitForContentReady(page);
}

async function pageNotes(page) {
  return page.evaluate(() => {
    const h1 = document.querySelector('h1')?.textContent?.trim() || '';
    const bodyText = (document.querySelector('main') || document.body)?.innerText || '';
    const snippet = bodyText.replace(/\s+/g, ' ').trim().slice(0, 400);
    return {
      h1,
      snippet,
      comingSoon: /coming soon|not available yet/i.test(bodyText),
      stillLoading: /Loading runtime/i.test(bodyText),
      title: document.title,
    };
  });
}

async function capture(page, results, item) {
  const idx = String(results.length + 1).padStart(3, '0');
  const file = `${idx}-${slug(item.section)}-${slug(item.label)}.png`;
  const outPath = path.join(OUT, file);
  console.log(`→ ${item.section} / ${item.label}`);
  try {
    const notes = await pageNotes(page);
    await page.screenshot({ path: outPath, fullPage: false });
    results.push({ ...item, file, finalUrl: page.url(), ok: true, notes });
    console.log(`  saved ${file}`);
  } catch (err) {
    results.push({ ...item, file: null, ok: false, error: String(err?.message || err), finalUrl: page.url() });
    console.error('  FAIL', err?.message || err);
  }
}

async function gotoReady(page, p) {
  await page.goto(`${BASE}${p}`, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await waitForContentReady(page);
  await page.keyboard.press('Escape').catch(() => {});
}

async function clickText(page, re, opts = {}) {
  const loc = page.getByRole(opts.role || 'button', { name: re }).first();
  if (await loc.isVisible().catch(() => false)) {
    await loc.click();
    return true;
  }
  const any = page.getByText(re).first();
  if (await any.isVisible().catch(() => false)) {
    await any.click();
    return true;
  }
  return false;
}

async function capturePriorityLists(page, results) {
  const pages = [
    { section: 'Home', id: 'home-recent-activity', label: 'Recent Activity (seeded)', path: '/settings/audit/activity-log' },
    { section: 'Automate', id: 'automation-config', label: 'Automation Profiles (seeded)', path: '/actions/library' },
    { section: 'Automate', id: 'insights-campaigns', label: 'Survey Campaigns (seeded)', path: '/actions/campaigns' },
    { section: 'Automate', id: 'gpo-catalog', label: 'GPO ADMX (active only)', path: '/actions/catalogs/gpo-templates' },
    { section: 'Automate', id: 'pending-changes', label: 'Pending Publish (seeded)', path: '/actions/pending-publish' },
    { section: 'Experience', id: 'compliance-score', label: 'Digital Experience dashboard', path: '/experience/compliance-score' },
    { section: 'Manage', id: 'actions-results', label: 'Execution History (seeded)', path: '/manage/execution-history' },
    { section: 'Manage', id: 'automate-remote-execution', label: 'Remote Execution', path: '/actions/execution/remediation' },
    { section: 'Manage', id: 'manage-swd', label: 'Software Distribution (seeded)', path: '/devices/software/software-distribution' },
    { section: 'Manage', id: 'swd-push-audit', label: 'Deploy (seeded)', path: '/devices/software/swd-push-audit' },
    { section: 'Administration', id: 'tenants', label: 'Tenants (Nanoheal org)', path: '/settings/organization/tenants' },
    { section: 'Administration', id: 'access-security', label: 'Users & Access (seeded)', path: '/settings/users' },
    { section: 'Administration', id: 'audit-logs', label: 'Audit Activity logs', path: '/settings/audit' },
    { section: 'Administration', id: 'scoring', label: 'Score Models (seeded)', path: '/compliance/policy/score-models' },
  ];
  for (const p of pages) {
    await gotoReady(page, p.path);
    await capture(page, results, p);
  }
}

async function captureWorkflowBuilder(page, results) {
  const section = 'Workflow Builder deep';
  await gotoReady(page, '/actions/library/visual-builder');
  await capture(page, results, {
    section,
    id: 'wf-hub',
    label: '01 Hub — templates & create custom',
    path: '/actions/library/visual-builder',
  });

  // Prefer Create custom workflow
  const started =
    (await clickText(page, /Create custom workflow/i)) ||
    (await clickText(page, /Start draft/i)) ||
    (await clickText(page, /Create custom/i));
  if (!started) {
    results.push({
      section,
      id: 'wf-create-start',
      label: '02 Start create',
      path: page.url(),
      ok: false,
      error: 'Create custom / Start draft not found',
    });
    return;
  }
  await page.waitForTimeout(2500);
  await waitForContentReady(page).catch(() => {});
  await capture(page, results, {
    section,
    id: 'wf-actions',
    label: '02 Actions canvas',
    path: page.url().replace(BASE, ''),
  });

  // Continue to details if available
  if (await clickText(page, /Continue to details|Continue|Next/i)) {
    await page.waitForTimeout(2000);
    await capture(page, results, {
      section,
      id: 'wf-details',
      label: '03 Details — When (On demand / Event / Schedule)',
      path: page.url().replace(BASE, ''),
    });

    // Capture each When option if present
    for (const [id, label, re] of [
      ['wf-when-ondemand', '04 When — On demand (selfhelp)', /On demand/i],
      ['wf-when-event', '05 When — Event Trigger (autoheal)', /Event Trigger/i],
      ['wf-when-schedule', '06 When — Schedule (scheduler)', /Schedule/i],
    ]) {
      if (await clickText(page, re, { role: 'radio' }).catch(() => false) || (await clickText(page, re))) {
        await page.waitForTimeout(800);
        await capture(page, results, { section, id, label, path: page.url().replace(BASE, '') });
      }
    }
  }

  // Conditions / Matches if CHECK or condition UI visible
  const body = await page.locator('body').innerText();
  if (/Matches|Does not match|Condition|CHECK/i.test(body)) {
    await capture(page, results, {
      section,
      id: 'wf-conditions',
      label: '07 Conditions — Matches / Does not match',
      path: page.url().replace(BASE, ''),
    });
  } else {
    // Try opening a decision / condition control
    await clickText(page, /Add condition|Condition|Decision|CHECK/i);
    await page.waitForTimeout(1200);
    await capture(page, results, {
      section,
      id: 'wf-conditions',
      label: '07 Conditions step',
      path: page.url().replace(BASE, ''),
    });
  }

  if (await clickText(page, /Continue to review|Review/i)) {
    await page.waitForTimeout(2000);
    await capture(page, results, {
      section,
      id: 'wf-review',
      label: '08 Review before save',
      path: page.url().replace(BASE, ''),
    });
  }

  // Leave canvas; open library row for Link scope
  await gotoReady(page, '/actions/library');
  const row = page.locator('table tbody tr').filter({ hasText: /Disk Cleanup|VPN Repair|Application Recovery/i }).first();
  if (await row.isVisible().catch(() => false)) {
    await row.click();
    await page.waitForTimeout(2000);
    await capture(page, results, {
      section,
      id: 'wf-inspector',
      label: '09 Library inspector — edit / link',
      path: '/actions/library',
    });
    if (await clickText(page, /Link scope|Link|Assign/i)) {
      await page.waitForTimeout(2000);
      await capture(page, results, {
        section,
        id: 'wf-link-scope',
        label: '10 Link scope confirm',
        path: page.url().replace(BASE, ''),
      });
    }
    await page.keyboard.press('Escape').catch(() => {});
    if (await clickText(page, /Unlink|Detach|Remove scope/i)) {
      await page.waitForTimeout(1200);
      await capture(page, results, {
        section,
        id: 'wf-unlink',
        label: '11 Unlink / detach',
        path: page.url().replace(BASE, ''),
      });
      await page.keyboard.press('Escape').catch(() => {});
    }
  }
}

async function captureSwdCreate(page, results) {
  const section = 'Software Distribution deep';
  await gotoReady(page, '/devices/software/software-distribution');
  await capture(page, results, {
    section,
    id: 'swd-list',
    label: '01 Install profiles list',
    path: '/devices/software/software-distribution',
  });

  const opened =
    (await clickText(page, /Create profile/i)) ||
    (await clickText(page, /^Create$/i)) ||
    (await clickText(page, /New profile/i));
  if (opened) {
    await page.waitForTimeout(2500);
    await capture(page, results, {
      section,
      id: 'swd-create',
      label: '02 Create software distribution profile',
      path: page.url().replace(BASE, ''),
    });
    await page.keyboard.press('Escape').catch(() => {});
  }

  // Tabs if present
  for (const [id, label, re] of [
    ['swd-uninstall-tab', '03 Uninstall profiles tab', /Uninstall/i],
    ['swd-snippets-tab', '04 Snippets tab', /Snippet/i],
    ['swd-deploy-tab', '05 Deploy tab', /Deploy|Push|audit/i],
  ]) {
    if (await clickText(page, re, { role: 'tab' }).catch(() => false) || (await clickText(page, re))) {
      await page.waitForTimeout(1500);
      await capture(page, results, {
        section,
        id,
        label,
        path: page.url().replace(BASE, ''),
      });
    }
  }

  await gotoReady(page, '/devices/software/swd-push-audit');
  await capture(page, results, {
    section,
    id: 'swd-deploy-page',
    label: '06 Deploy page (queue & audit)',
    path: '/devices/software/swd-push-audit',
  });
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const prev = fs.existsSync(META) ? JSON.parse(fs.readFileSync(META, 'utf8')) : { results: [] };
  const startIdx = prev.results?.length || 0;

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const results = [];

  try {
    await login(page);
    await capturePriorityLists(page, results);
    await captureWorkflowBuilder(page, results);
    await captureSwdCreate(page, results);
  } finally {
    await browser.close();
  }

  // Renumber deep files continuing from previous catalog
  const remapped = [];
  for (let i = 0; i < results.length; i++) {
    const r = results[i];
    if (!r.file) {
      remapped.push(r);
      continue;
    }
    const newIdx = String(startIdx + i + 1).padStart(3, '0');
    const newFile = `${newIdx}-${slug(r.section)}-${slug(r.label)}.png`;
    const from = path.join(OUT, r.file);
    const to = path.join(OUT, newFile);
    if (fs.existsSync(from) && from !== to) {
      fs.renameSync(from, to);
    }
    remapped.push({ ...r, file: newFile });
  }

  const merged = {
    ...prev,
    base: BASE,
    capturedAt: new Date().toISOString(),
    results: [...(prev.results || []), ...remapped],
    counts: {
      ...(prev.counts || {}),
      deepFlows: remapped.length,
      totalResults: (prev.results?.length || 0) + remapped.length,
      ok: (prev.results || []).filter((x) => x.ok).length + remapped.filter((x) => x.ok).length,
    },
  };
  fs.writeFileSync(META, JSON.stringify(merged, null, 2));
  console.log(`Appended ${remapped.length} deep captures → ${META}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

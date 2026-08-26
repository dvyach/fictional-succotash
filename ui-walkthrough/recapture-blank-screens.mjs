/**
 * Recapture blank/weak walkthrough screens after audits + seed fixes.
 * Overwrites known primary PNG files and patches crawl-meta.json by id.
 *
 * Usage: node recapture-blank-screens.mjs
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

/** Fixed filenames already linked from README / crawl-meta primaries */
const SHOTS = [
  { id: 'automate-scheduling', file: '047-disabled-menu-scheduling.png', path: '/actions/scheduling' },
  { id: 'monitoring-profiles', file: '095-disabled-menu-monitoring.png', path: '/actions/catalogs/data-collection' },
  { id: 'admin-deployment', file: '096-disabled-menu-deployment.png', path: '/settings/deployment' },
  { id: 'version-catalog', file: '097-disabled-menu-version-catalog.png', path: '/settings/agents', after: 'catalog-tab' },
  { id: 'gpo-policies', file: '098-disabled-menu-gpo-policies.png', path: '/compliance/gpo-policies' },
  { id: 'compliance-policy-execution', file: '058-disabled-menu-policy-execution.png', path: '/compliance/policy-execution' },
  { id: 'actions-results', file: '103-manage-execution-history-seeded.png', path: '/manage/execution-history' },
  { id: 'swd-push-audit', file: '106-manage-deploy-seeded.png', path: '/devices/software/swd-push-audit' },
  { id: 'census', file: '104-device-detail-inventory-drawer.png', path: '/devices/inventory/census', after: 'open-first-row' },
  { id: 'selfhelp-library', file: '125-automate-selfhelp-library.png', path: '/actions/library', after: 'filter-selfhelp' },
  { id: 'autoheal-library', file: '126-automate-autoheal-library.png', path: '/actions/library', after: 'filter-autoheal' },
];

async function waitFn(page, fn, timeoutMs) {
  await page.waitForFunction(fn, null, { timeout: timeoutMs });
}

async function waitReady(page) {
  await waitFn(
    page,
    () => {
      const t = document.body?.innerText || '';
      if (t.includes('Loading runtime') || t.includes('Loading sign in')) return false;
      return /Welcome|Automate|Inventory|Administration|Home/i.test(t);
    },
    120_000
  );
  await page.waitForTimeout(2000);
}

async function login(page) {
  await page.goto(`${BASE}/login`, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await page.waitForTimeout(1000);
  if (!page.url().includes('login')) {
    await waitReady(page);
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
  await waitReady(page);
  await page.keyboard.press('Escape').catch(() => {});
}

async function ensureSite(page) {
  const siteBtn = page.getByRole('button', { name: /Axiom_4|SITE/i }).first();
  if (await siteBtn.isVisible().catch(() => false)) {
    const label = (await siteBtn.innerText().catch(() => '')) || '';
    if (!/Axiom_4/i.test(label)) {
      await siteBtn.click();
      const opt = page.getByRole('option', { name: /Axiom_4/i }).first();
      if (await opt.isVisible().catch(() => false)) await opt.click();
      await page.waitForTimeout(1500);
    }
  }
}

async function afterAction(page, kind) {
  if (kind === 'catalog-tab') {
    const tab = page.getByRole('tab', { name: /version catalog|catalog/i }).first();
    if (await tab.isVisible().catch(() => false)) {
      await tab.click();
      await page.waitForTimeout(2500);
    }
  }
  if (kind === 'open-first-row') {
    const row = page.locator('table tbody tr, [role="row"]').nth(1);
    if (await row.isVisible().catch(() => false)) {
      await row.click();
      await page.waitForTimeout(2500);
    }
  }
  if (kind === 'filter-selfhelp' || kind === 'filter-autoheal') {
    const type = kind === 'filter-selfhelp' ? 'selfhelp' : 'autoheal';
    const search = page.getByPlaceholder(/search/i).first();
    if (await search.isVisible().catch(() => false)) {
      await search.fill(type === 'selfhelp' ? 'Disk Cleanup' : 'VPN Repair');
      await page.waitForTimeout(2000);
    }
    // Prefer Profiles tab if present
    const profiles = page.getByRole('tab', { name: /profiles/i }).first();
    if (await profiles.isVisible().catch(() => false)) await profiles.click().catch(() => {});
    await page.waitForTimeout(1500);
  }
}

async function pageNotes(page) {
  return page.evaluate(() => {
    const h1 = document.querySelector('h1')?.textContent?.trim() || '';
    const bodyText = (document.querySelector('main') || document.body)?.innerText || '';
    const snippet = bodyText.replace(/\s+/g, ' ').trim().slice(0, 400);
    return { h1, snippet, title: document.title };
  });
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await login(page);
await ensureSite(page);

const meta = JSON.parse(fs.readFileSync(META, 'utf8'));
const byId = new Map((meta.pages || []).map((p) => [p.id, p]));

for (const shot of SHOTS) {
  console.log('→', shot.id, shot.path);
  await page.goto(`${BASE}${shot.path}`, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await waitReady(page);
  await ensureSite(page);
  if (shot.after) await afterAction(page, shot.after);
  await page.waitForTimeout(2500);
  const notes = await pageNotes(page);
  const outPath = path.join(OUT, shot.file);
  await page.screenshot({ path: outPath, fullPage: false });
  console.log('  saved', shot.file, 'h1=', notes.h1, 'snippet=', notes.snippet.slice(0, 80));

  const existing = byId.get(shot.id) || { id: shot.id, section: 'Recapture', label: shot.id };
  Object.assign(existing, {
    file: shot.file,
    path: shot.path,
    finalUrl: page.url(),
    ok: !page.url().includes('/login'),
    notes,
    recapturedAt: new Date().toISOString(),
  });
  byId.set(shot.id, existing);
}

meta.pages = [...byId.values()];
meta.recaptureBlankScreens = {
  at: new Date().toISOString(),
  count: SHOTS.length,
  note: 'Pass after audits-list-read Prisma handler + walkthrough seed (execution_status, schedules, VC)',
};
fs.writeFileSync(META, JSON.stringify(meta, null, 2));
await browser.close();
console.log('done', SHOTS.length, 'shots');

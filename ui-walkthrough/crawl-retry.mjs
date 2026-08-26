/**
 * Retry failed pages + device detail from last crawl-meta.json (append/replace by id).
 * Does NOT wipe existing screenshots.
 * Usage: node crawl-retry.mjs
 */
import { chromium } from '../../AEX/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const META = path.join(__dirname, 'crawl-meta.json');
const OUT = path.join(__dirname, 'screenshots');
const BASE = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:5176';

// Import helpers by evaluating the main module is awkward; duplicate minimal boot via dynamic import of shared logic.
// Instead: spawn inline by importing rewritten functions from crawl via child process of targeted crawl.

const RETRY_PAGES = [
  { section: 'Experience', id: 'compliance-score', label: 'Digital Experience', path: '/experience/compliance-score' },
  { section: 'Disabled menu', id: 'monitoring-profiles', label: 'Monitoring', path: '/actions/catalogs/monitoring', menuEnabled: false },
  { section: 'Disabled menu', id: 'admin-deployment', label: 'Deployment', path: '/settings/deployment', menuEnabled: false },
  { section: 'Disabled menu', id: 'version-catalog', label: 'Version Catalog', path: '/devices/software/version-catalog', menuEnabled: false },
  { section: 'Disabled menu', id: 'gpo-policies', label: 'GPO Policies', path: '/compliance/gpo-policies', menuEnabled: false },
];

// Reuse crawl-screenshots by setting env — simpler: paste essential helpers here
import { createRequire } from 'node:module';
// Load playwright and copy wait helpers by reading/executing shared path — keep self-contained:

async function waitFn(page, fn, timeoutMs) {
  await page.waitForFunction(fn, null, { timeout: timeoutMs });
}

async function waitForShell(page) {
  await waitFn(
    page,
    () => {
      const t = document.body?.innerText || '';
      if (t.includes('Loading runtime')) return false;
      if (t.includes('Loading sign in')) return false;
      return /Welcome|Automate|Inventory|Administration|Experience|Home|Devices/i.test(t);
    },
    120_000
  );
  await waitFn(page, () => !document.body.innerText.includes('Loading menu items'), 20_000).catch(() => {});
}

async function waitForContentReady(page) {
  await waitForShell(page);
  try {
    await waitFn(
      page,
      () => {
        const main = document.querySelector('main') || document.body;
        const t = (main.innerText || '').replace(/\s+/g, ' ').trim();
        if (!t || t.includes('Loading runtime')) return false;
        if (main.querySelectorAll('[class*="animate-pulse"]').length >= 6) return false;
        if (t.length < 40 && /Loading/i.test(t)) return false;
        return t.length > 80 || /Coming soon|No |Create |Schedules|Policy|Version|Deployment|Monitoring/i.test(t);
      },
      90_000
    );
  } catch {}
  await page.waitForTimeout(2500);
}

async function login(page) {
  await page.goto(`${BASE}/login`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);
  if (page.url().includes('login')) {
    await page.getByLabel(/email or username/i).waitFor({ timeout: 30_000 });
    const fill = page.getByRole('button', { name: /fill dev credentials/i });
    if (await fill.isVisible().catch(() => false)) await fill.click();
    else {
      await page.getByLabel(/email or username/i).fill('admin@nanoheal.com');
      await page.getByLabel(/^password$/i).fill('nanoheal@123');
    }
    await page.getByRole('button', { name: /^(login|get started|sign in)$/i }).click();
    await page.waitForURL((u) => !u.pathname.includes('login'), { timeout: 90_000 });
  }
  await waitForContentReady(page);
  await page.keyboard.press('Escape').catch(() => {});
}

function slug(s) {
  return String(s).replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase().slice(0, 80);
}

async function pageNotes(page) {
  return page.evaluate(() => {
    const h1 = document.querySelector('h1')?.textContent?.trim() || '';
    const bodyText = (document.querySelector('main') || document.body)?.innerText || '';
    const snippet = bodyText.replace(/\s+/g, ' ').trim().slice(0, 400);
    const comingSoon = /coming soon|not available yet/i.test(bodyText);
    const stillLoading =
      /Loading runtime|Loading menu items/i.test(bodyText) ||
      document.querySelectorAll('[class*="animate-pulse"]').length >= 6;
    return { h1, snippet, comingSoon, stillLoading, title: document.title };
  });
}

const meta = JSON.parse(fs.readFileSync(META, 'utf8'));
const byId = new Map(meta.results.map((r) => [r.id, r]));
let maxIdx = 0;
for (const f of fs.readdirSync(OUT)) {
  const m = f.match(/^(\d+)-/);
  if (m) maxIdx = Math.max(maxIdx, Number(m[1]));
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await login(page);

async function save(item) {
  maxIdx += 1;
  const file = `${String(maxIdx).padStart(3, '0')}-${slug(item.section)}-${slug(item.label)}.png`;
  await page.screenshot({ path: path.join(OUT, file), fullPage: false });
  const notes = await pageNotes(page);
  const row = { ...item, file, finalUrl: page.url(), ok: true, notes };
  byId.set(item.id, row);
  console.log('saved', file, notes.h1);
  return row;
}

for (const item of RETRY_PAGES) {
  console.log('retry', item.label);
  try {
    await page.goto(`${BASE}${item.path}`, { waitUntil: 'domcontentloaded', timeout: 60_000 });
    await waitForContentReady(page);
    await page.keyboard.press('Escape').catch(() => {});
    await save(item);
  } catch (e) {
    console.error('FAIL', item.label, e.message);
    byId.set(item.id, { ...item, ok: false, error: String(e.message) });
  }
}

// Device detail
console.log('retry device detail');
try {
  await page.goto(`${BASE}/devices/inventory/census`, { waitUntil: 'domcontentloaded' });
  await waitForContentReady(page);
  await waitFn(
    page,
    () => document.querySelectorAll('table tbody tr').length > 0 &&
      document.querySelectorAll('[class*="animate-pulse"]').length < 6,
    90_000
  );
  const row = page.locator('table tbody tr').first();
  await row.locator('td').nth(1).click();
  await page.waitForTimeout(3500);
  const dlg = page.locator('[role="dialog"]').first();
  if (await dlg.isVisible().catch(() => false)) {
    await page.waitForTimeout(2000);
    await save({
      section: 'Device detail',
      id: 'device-detail-drawer',
      label: 'Inventory — Device detail drawer',
      path: '/devices/inventory/census',
      kind: 'drawer',
    });
    // Try extract id from dialog text / close and use census API via window
    const full = page.getByRole('button', { name: /full page|view full|open full/i }).first();
    if (await full.isVisible().catch(() => false)) {
      await full.click();
      await waitForContentReady(page);
      await save({
        section: 'Device detail',
        id: 'device-detail-full',
        label: 'Device detail — full page',
        path: page.url().replace(BASE, ''),
      });
    } else {
      // Double-click host for full page navigate if app supports it
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);
      // Get machine id from row via evaluate
      const id = await page.evaluate(() => {
        const tr = document.querySelector('table tbody tr');
        if (!tr) return null;
        return (
          tr.getAttribute('data-id') ||
          tr.getAttribute('data-row-id') ||
          tr.querySelector('[data-id]')?.getAttribute('data-id') ||
          null
        );
      });
      if (id) {
        await page.goto(`${BASE}/devices/view/${id}`, { waitUntil: 'domcontentloaded' });
        await waitForContentReady(page);
        await save({
          section: 'Device detail',
          id: 'device-detail-full',
          label: 'Device detail — full page',
          path: `/devices/view/${id}`,
        });
      }
    }
  } else {
    throw new Error('Device detail dialog did not open');
  }
} catch (e) {
  console.error('FAIL device detail', e.message);
  byId.set('device-detail', {
    section: 'Device detail',
    id: 'device-detail',
    label: 'Device detail',
    ok: false,
    error: String(e.message),
  });
}

// SWD / Score create — try more selectors
for (const o of [
  { id: 'overlay-score-models-create', label: 'Score Models — Create overlay', path: '/compliance/policy/score-models' },
  { id: 'overlay-swd-create', label: 'Software Distribution — Create overlay', path: '/devices/software/software-distribution' },
]) {
  console.log('retry overlay', o.label);
  try {
    await page.goto(`${BASE}${o.path}`, { waitUntil: 'domcontentloaded' });
    await waitForContentReady(page);
    const candidates = [
      page.getByRole('button', { name: /create|add|new/i }).first(),
      page.locator('button').filter({ hasText: /create|add|new/i }).first(),
    ];
    let clicked = false;
    for (const c of candidates) {
      if (await c.isVisible().catch(() => false)) {
        await c.click();
        clicked = true;
        break;
      }
    }
    if (!clicked) throw new Error('No create control');
    await page.waitForTimeout(2500);
    await save({ section: 'Create / edit overlays', ...o });
    await page.keyboard.press('Escape');
  } catch (e) {
    console.error('FAIL overlay', o.label, e.message);
    byId.set(o.id, { section: 'Create / edit overlays', ...o, ok: false, error: String(e.message) });
  }
}

const results = [...byId.values()];
meta.results = results;
meta.capturedAt = new Date().toISOString();
meta.counts = {
  ...meta.counts,
  totalResults: results.length,
  ok: results.filter((r) => r.ok).length,
  retryPass: true,
};
fs.writeFileSync(META, JSON.stringify(meta, null, 2));
console.log(`Retry done. ${meta.counts.ok}/${results.length} ok`);
await browser.close();

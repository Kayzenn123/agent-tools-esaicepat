// Functional QA for EsaiCepat — exercises the whole tool flow.
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });

  await page.goto('http://127.0.0.1:8931/agent-tools-esaicepat/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1200);

  // scroll through stations to trigger reveals
  for (const sel of ['#stasiun-1', '#stasiun-2', '#stasiun-3']) {
    await page.locator(sel).scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
  }
  await page.screenshot({ path: '/tmp/func-st1.png' });

  // 1. select LPDP template
  await page.click('.tpl-card[data-tpl="lpdp"]');
  await page.waitForTimeout(600);
  const pressed = await page.getAttribute('.tpl-card[data-tpl="lpdp"]', 'aria-pressed');
  console.log('template select aria-pressed:', pressed);

  // 2. fill example + seal with EMPTY prestasi to test optional
  await page.click('#btn-contoh');
  await page.fill('#f-prestasi', '');
  await page.click('#btn-segel');
  await page.waitForTimeout(800);
  const wrapHidden = await page.isHidden('#hasil-wrap');
  console.log('result visible:', !wrapHidden);
  const totalStats = await page.textContent('#hasil-stats');
  console.log('stats:', totalStats.replace(/\s+/g, ' ').trim());
  await page.locator('#stasiun-4').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/func-result.png' });

  // 3. honesty flags should include juara/IPK ones from example
  const flags = await page.$$eval('#honesty-flags li', (els) => els.map((e) => e.textContent.slice(0, 40)));
  console.log('honesty flags:', flags.length, flags);

  // 4. checklist
  await page.check('[data-honest="h1"]');
  await page.check('[data-honest="h2"]');
  console.log('checklist count:', await page.textContent('#honest-count'));

  // 5. copy link (clipboard may fail headless — just check no crash)
  await page.click('#btn-link');
  await page.waitForTimeout(400);
  console.log('link msg:', await page.textContent('#hasil-msg'));

  // 6. save draft + archive
  await page.fill('#draft-name', 'Draf QA');
  await page.click('#btn-simpan');
  await page.waitForTimeout(400);
  console.log('archive items:', await page.$$eval('#draft-list li', (els) => els.length));

  // 7. reload -> state persisted
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  console.log('persisted nama:', await page.inputValue('#f-nama'));

  // 8. deep-link
  const link = await page.evaluate(() => {
    const payload = { t: 'kip', a: { nama: 'Link Test', tujuan: 'KIP Kuliah', pembuka: 'Halo saya Link Test', latar: 'x'.repeat(200), motivasi: 'y'.repeat(200), prestasi: '', rencana: 'z'.repeat(150), kontribusi: 'w'.repeat(150), penutup: 'Terima kasih banyak atas perhatiannya ya' } };
    const b64 = btoa(unescape(encodeURIComponent(JSON.stringify(payload)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return 'http://127.0.0.1:8931/agent-tools-esaicepat/?s=' + b64;
  });
  await page.goto(link, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  console.log('deeplink nama:', await page.inputValue('#f-nama'), '| tpl:', await page.getAttribute('.tpl-card[data-tpl="kip"]', 'aria-pressed'));

  // 9. validation: clear + seal -> errors
  await page.click('#btn-bersih');
  await page.click('#btn-segel');
  await page.waitForTimeout(500);
  const errCount = await page.$$eval('.field-msg.err', (els) => els.length);
  console.log('validation errors shown:', errCount);

  // 10. easter egg
  await page.keyboard.press('l');
  await page.keyboard.press('o');
  await page.keyboard.press('l');
  await page.keyboard.press('o');
  await page.keyboard.press('s');
  await page.waitForTimeout(300);
  console.log('egg visible:', await page.isVisible('#egg-stamp'));

  console.log('ERRORS:', errors.length ? errors : 'none');
  await browser.close();
})().catch((e) => { console.error('FATAL', e); process.exit(1); });

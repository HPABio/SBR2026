const { chromium } = require('playwright');
const fs = require('fs');

async function scrape(url) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000);
  
  // Try to find any session elements
  const items = await page.$$eval('[data-testid^="planning"]', els => els.map(el => el.innerText));
  const fullHtml = await page.content();
  
  await browser.close();
  
  return { items, html: fullHtml };
}

async function main() {
  const url1 = 'https://app.swapcard.com/event/synbioreactor-summit-sbr2026/plannings/RXZlbnRWaWV3XzEyNDIwNTM=';
  const data = await scrape(url1);
  fs.writeFileSync('swapcard_html.html', data.html);
  fs.writeFileSync('swapcard_items.json', JSON.stringify(data.items, null, 2));
  console.log(`Saved HTML length: ${data.html.length}, items found: ${data.items.length}`);
}

main().catch(console.error);

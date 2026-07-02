const { chromium } = require('playwright');
const fs = require('fs');

async function scrape(url, label) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  let captured = [];

  page.on('response', async (response) => {
    if (response.url().includes('graphql') || response.url().includes('api')) {
      try {
        const json = await response.json();
        // save to file just to check what we got
        if (json.data && json.data.plannings && json.data.plannings.nodes) {
          console.log(`Found ${json.data.plannings.nodes.length} plannings!`);
          captured = captured.concat(json.data.plannings.nodes);
        }
      } catch (e) {
      }
    }
  });

  console.log(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil: 'networkidle' });
  
  // Try to click accept cookies if it exists
  try {
    const acceptBtn = await page.getByText('Accept all');
    if (await acceptBtn.count() > 0) {
      await acceptBtn.click();
      console.log('Clicked Accept all cookies');
      await page.waitForTimeout(2000);
    }
  } catch(e) {}

  // scroll a bit
  await page.evaluate(() => window.scrollBy(0, 1000));
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollBy(0, 1000));
  await page.waitForTimeout(2000);
  
  const html = await page.content();
  
  await browser.close();
  
  return { captured, html };
}

async function main() {
  const url1 = 'https://app.swapcard.com/event/synbioreactor-summit-sbr2026/plannings/RXZlbnRWaWV3XzEyNDIwNTM=';
  const url2 = 'https://app.swapcard.com/event/synbioreactor-summit-sbr2026/plannings/RXZlbnRWaWV3XzEyNDIwNTM=?aggregationId=eyJkYXRhIjp7InJhbmdlIjpbMTc2ODg2MzYwMCwxNzY4OTUwMDAwXX19';
  
  const data1 = await scrape(url1);
  const data2 = await scrape(url2);

  const result = {
    url1: data1.captured,
    url2: data2.captured
  };
  fs.writeFileSync('swapcard_plannings.json', JSON.stringify(result, null, 2));
  fs.writeFileSync('swapcard_html_1.html', data1.html);
  
  console.log(`Saved plannings: url1 has ${data1.captured.length}, url2 has ${data2.captured.length}`);
}

main().catch(console.error);

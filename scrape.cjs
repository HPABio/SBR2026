const { chromium } = require('playwright');
const fs = require('fs');

async function scrape(url, label) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  let allPlannings = [];

  page.on('response', async (response) => {
    if (response.url().includes('graphql')) {
      try {
        const json = await response.json();
        if (json.data && json.data.plannings && json.data.plannings.nodes) {
          console.log(`Found ${json.data.plannings.nodes.length} plannings for ${label}`);
          allPlannings = allPlannings.concat(json.data.plannings.nodes);
        }
      } catch (e) {
        // Not a JSON response or error parsing
      }
    }
  });

  console.log(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil: 'networkidle' });
  
  // Wait a bit just in case
  await page.waitForTimeout(5000);
  
  await browser.close();
  
  return allPlannings;
}

async function main() {
  const url1 = 'https://app.swapcard.com/event/synbioreactor-summit-sbr2026/plannings/RXZlbnRWaWV3XzEyNDIwNTM=';
  const url2 = 'https://app.swapcard.com/event/synbioreactor-summit-sbr2026/plannings/RXZlbnRWaWV3XzEyNDIwNTM=?aggregationId=eyJkYXRhIjp7InJhbmdlIjpbMTc2ODg2MzYwMCwxNzY4OTUwMDAwXX19';

  console.log('Scraping URL 1...');
  const plannings1 = await scrape(url1, 'URL1');
  
  console.log('Scraping URL 2...');
  const plannings2 = await scrape(url2, 'URL2');

  const result = {
    url1: plannings1,
    url2: plannings2
  };

  fs.writeFileSync('swapcard_plannings.json', JSON.stringify(result, null, 2));
  console.log('Saved swapcard_plannings.json');
}

main().catch(console.error);

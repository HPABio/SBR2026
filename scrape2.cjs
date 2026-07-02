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
        captured.push({
          url: response.url(),
          data: json
        });
      } catch (e) {
      }
    }
  });

  console.log(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil: 'networkidle' });
  
  // Wait a bit
  await page.waitForTimeout(5000);
  
  await browser.close();
  
  return captured;
}

async function main() {
  const url1 = 'https://app.swapcard.com/event/synbioreactor-summit-sbr2026/plannings/RXZlbnRWaWV3XzEyNDIwNTM=';
  console.log('Scraping URL 1...');
  const responses = await scrape(url1, 'URL1');

  fs.writeFileSync('swapcard_graphql_dump.json', JSON.stringify(responses, null, 2));
  console.log(`Saved ${responses.length} GraphQL/API responses.`);
}

main().catch(console.error);

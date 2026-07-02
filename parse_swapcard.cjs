const fs = require('fs');

const raw = fs.readFileSync('swapcard_raw.html', 'utf8');

// A very simple manual parser using regexes since we don't want to rely on cheerio being present.
const events = [];

// Split the raw string by list__CardWrapper to process each card
const cards = raw.split('list__CardWrapper');

for (let i = 1; i < cards.length; i++) {
  const card = cards[i];

  const titleMatch = card.match(/planning-card-list__Title[^>]+>([^<]+)<\/h3>/);
  if (!titleMatch) continue;
  const title = titleMatch[1].trim();

  const beginsAtMatch = card.match(/planning-card-list__BeginsAt[^>]+>([^<]+)<\/div>/);
  const endsAtMatch = card.match(/planning-card-list__EndsAt[^>]+>([^<]+)<\/div>/);
  
  const beginsAt = beginsAtMatch ? beginsAtMatch[1].trim() : '';
  const endsAt = endsAtMatch ? endsAtMatch[1].trim() : '';

  const descMatch = card.match(/planning-card-list__Description[^>]+>([^<]+)<\/span>/);
  const description = descMatch ? descMatch[1].trim() : null;

  // Extract all item-with-icon__Item
  const metaRegex = /item-with-icon__Item[^>]+>([^<]+)<\/div>/g;
  let m;
  const metadata = [];
  while ((m = metaRegex.exec(card)) !== null) {
    metadata.push(m[1].trim());
  }

  // Extract all chip__SpanWrapper
  const tagRegex = /chip__SpanWrapper[^>]+>([^<]+)<\/span>/g;
  const tags = [];
  while ((m = tagRegex.exec(card)) !== null) {
    tags.push(m[1].trim());
  }

  // Extract images
  const imgRegex = /<img[^>]+alt="([^"]+)"[^>]+src="([^"]+)"/g;
  const images = [];
  const imageUrls = [];
  while ((m = imgRegex.exec(card)) !== null) {
    images.push(m[1].trim());
    let src = m[2];
    if (src.includes('?')) {
        const uParam = new URLSearchParams(src.split('?')[1]).get('u');
        if (uParam) src = decodeURIComponent(uParam);
    }
    imageUrls.push(src);
  }

  // Extract speakers from list__FullName and list__Organization
  const speakerNameRegex = /list__FullName[^>]+>([^<]+)<\/span>/g;
  const orgRegex = /list__Organization[^>]+>([^<]+)<\/span>/g;
  
  const speakers = [];
  while ((m = speakerNameRegex.exec(card)) !== null) {
      speakers.push({ name: m[1].trim() });
  }
  
  let orgIdx = 0;
  while ((m = orgRegex.exec(card)) !== null) {
      if (speakers[orgIdx]) {
          speakers[orgIdx].organization = m[1].trim();
      }
      orgIdx++;
  }

  events.push({
    title,
    beginsAt,
    endsAt,
    description,
    metadata,
    tags,
    images,
    imageUrls,
    speakers
  });
}

// Since the user only provided Day 1, let's read the existing swapcard_plannings.json if it exists,
// but actually they said "DAY 1 - 19th", maybe it has all of it or just day 1?
// Let's write the parsed array to parsed_temp.json first to inspect it.
fs.writeFileSync('parsed_temp.json', JSON.stringify(events, null, 2));
console.log('Parsed ' + events.length + ' events.');

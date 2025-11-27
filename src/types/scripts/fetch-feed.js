// scripts/fetch-feed.js
const fs = require('fs');
const path = require('path');
const Parser = require('rss-parser');

(async () => {
  const parser = new Parser({ timeout: 15000 });
  const feedUrl = process.env.FEED_URL || 'https://medium.com/feed/@yasith.banula06'; // replace or set env
  console.log('Fetching feed:', feedUrl);

  try {
    const feed = await parser.parseURL(feedUrl);
    const items = (feed.items || []).map(item => ({
      id: item.guid || item.link || item.title,
      title: item.title || 'Untitled',
      link: item.link || null,
      date: item.isoDate || item.pubDate || null,
      excerpt: item.contentSnippet || '',
      content: item['content:encoded'] || item.content || null
    }));

    const outDir = path.join(__dirname, '../public');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    const outFile = path.join(outDir, 'articles.json');

    fs.writeFileSync(outFile, JSON.stringify({ fetchedAt: new Date().toISOString(), items }, null, 2), 'utf8');
    console.log('Wrote', outFile, 'with', items.length, 'items');
  } catch (err) {
    console.error('Failed to fetch feed:', (err && err.message) || err);
    const outDir = path.join(__dirname, '../public');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    const outFile = path.join(outDir, 'articles.json');
    fs.writeFileSync(outFile, JSON.stringify({ fetchedAt: new Date().toISOString(), items: [] }, null, 2));
    process.exit(0);
  }
})();

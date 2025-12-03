// scripts/fetch-feed.js
import fs from 'fs';
import path from 'path';
import Parser from 'rss-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(async () => {
  const parser = new Parser({ timeout: 15000 });
  const feedUrl = process.env.FEED_URL || 'https://medium.com/feed/@yasith.banula06'; // replace or set env
  console.log('Fetching feed:', feedUrl);

  try {
    const feed = await parser.parseURL(feedUrl);
    console.log('Feed title:', feed.title);
    console.log('Number of items:', feed.items?.length || 0);
    
    const items = (feed.items || []).map(item => ({
      id: item.guid || item.link || item.title,
      title: item.title || 'Untitled',
      link: item.link || null,
      date: item.isoDate || item.pubDate || null,
      excerpt: item.contentSnippet?.substring(0, 200) + '...' || '',
      content: item['content:encoded'] || item.content || null,
      thumbnail: extractImageFromContent(item['content:encoded'] || item.content || ''),
      tags: item.categories || []
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

// Helper function to extract first image from HTML content
function extractImageFromContent(content) {
  if (!content) return '/api/placeholder/400/250';
  
  const imgMatch = content.match(/<img[^>]+src="([^"]+)"/i);
  if (imgMatch && imgMatch[1]) {
    return imgMatch[1];
  }
  
  // Fallback placeholder
  return '/api/placeholder/400/250';
}
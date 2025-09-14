// filepath: src/utils/notion.ts
import { Client } from '@notionhq/client';


console.log("NOTION_API_KEY:", import.meta.env.NOTION_API_KEY); // Log API key (should NOT be undefined)
const notion = new Client({ auth: import.meta.env.NOTION_API_KEY });

export async function fetchArticles(databaseId: string) {
  try {
    console.log("Fetching articles from Notion DB:", databaseId);
    const response = await notion.databases.query({ database_id: databaseId });
    console.log("Notion response:", response);
    return response.results.map(page => ({
      id: page.id,
      title: page.properties.Title?.title?.[0]?.plain_text || '',
      excerpt: page.properties.Excerpt?.rich_text?.[0]?.plain_text || '',
      author: page.properties.Author?.rich_text?.[0]?.plain_text || '',
      date: page.properties.Date?.date?.start || '',
      category: page.properties.Category?.select?.name || '',
      image: page.properties.Image?.url || '',
      slug: page.properties.Slug?.rich_text?.[0]?.plain_text || '',
      content: page.properties.Content?.rich_text?.[0]?.plain_text || '',
    }));
  } catch (error) {
    console.error("Error fetching articles from Notion:", error);
    return [];
  }
}
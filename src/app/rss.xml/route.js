import Rss from 'rss';

import { getBlogPostList } from '@/helpers/file-helpers';
import { BLOG_TITLE, BLOG_DESCRIPTION } from '@/constants';

const SITE_URL = 'http://localhost:3000';

export async function GET() {
  const articles = await getBlogPostList();

  const feed = new Rss({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    feed_url: `${SITE_URL}/rss.xml`,
    site_url: SITE_URL,
    language: 'en',
  });

  articles.forEach((article) => {
    feed.item({
      title: article.title,
      description: article.abstract,
      url: `${SITE_URL}/blog/${article.slug}`,
      date: article.publishedOn,
    });
  });

  return new Response(feed.xml(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

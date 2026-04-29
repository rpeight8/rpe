import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (
    await getCollection('posts', ({ data }) => !data.draft)
  ).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'rpe',
    description: 'Test description',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `${import.meta.env.BASE_URL.replace(/\/$/, '')}/posts/${post.id}`,
      categories: post.data.tags,
    })),
    customData: '<language>en-us</language>',
  });
}

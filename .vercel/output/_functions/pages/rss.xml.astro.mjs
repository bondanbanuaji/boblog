import rss from '@astrojs/rss';
import { d as db } from '../chunks/db_CcHuIs8X.mjs';
export { renderers } from '../renderers.mjs';

const GET = async (context) => {
  const articles = await db.article.findMany({
    where: { status: "PUBLISHED" },
    include: { author: { select: { displayName: true } } },
    orderBy: { publishedAt: "desc" },
    take: 20
  });
  return rss({
    title: "BoBlog - Artikel Terbaru",
    description: "Platform blog modern tangguh dengan Astro.js",
    site: context.site || "https://boblog.vercel.app",
    items: articles.map((post) => ({
      title: post.title,
      pubDate: post.publishedAt || post.createdAt,
      description: post.excerpt,
      author: post.author.displayName,
      link: `/blog/${post.slug}`
    })),
    customData: `<language>id</language>`
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

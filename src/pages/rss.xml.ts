import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { db } from "@/lib/db";

export const GET: APIRoute = async (context) => {
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
        items: articles.map((post: any) => ({
            title: post.title,
            pubDate: post.publishedAt || post.createdAt,
            description: post.excerpt || undefined,
            author: post.author.displayName,
            link: `/blog/${post.slug}`,
        })),
        customData: `<language>id</language>`,
    });
}

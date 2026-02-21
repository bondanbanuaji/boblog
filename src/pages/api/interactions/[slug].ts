import type { APIContext } from "astro";
import { db } from "@/lib/db";
import { jsonResponse, errorResponse } from "@/lib/utils";

export const prerender = false;

// POST /api/interactions/[articleSlug]
export async function POST(context: APIContext): Promise<Response> {
    try {
        const user = context.locals.user;
        if (!user) return errorResponse("Harap login untuk melakukan aksi ini", 401);

        const slug = context.params.slug;
        if (!slug) return errorResponse("Article slug required", 400);

        const body = await context.request.json();
        const { action } = body; // "like" or "bookmark"

        const article = await db.article.findUnique({ where: { slug } });
        if (!article) return errorResponse("SArtikel tidak ditemukan", 404);

        if (action === "like") {
            const existing = await db.like.findUnique({
                where: { userId_articleId: { userId: user.id, articleId: article.id } }
            });

            if (existing) {
                await db.like.delete({
                    where: { userId_articleId: { userId: user.id, articleId: article.id } }
                });
                return jsonResponse({ liked: false });
            } else {
                await db.like.create({
                    data: { userId: user.id, articleId: article.id }
                });
                // Create notification for author
                if (article.authorId !== user.id) {
                    await db.notification.create({
                        data: {
                            userId: article.authorId,
                            type: "LIKE",
                            message: `${user.displayName} menyukai artikel Anda "${article.title}"`,
                            link: `/blog/${article.slug}`
                        }
                    });
                }
                return jsonResponse({ liked: true });
            }
        }

        if (action === "bookmark") {
            const existing = await db.bookmark.findUnique({
                where: { userId_articleId: { userId: user.id, articleId: article.id } }
            });

            if (existing) {
                await db.bookmark.delete({
                    where: { userId_articleId: { userId: user.id, articleId: article.id } }
                });
                return jsonResponse({ bookmarked: false });
            } else {
                await db.bookmark.create({
                    data: { userId: user.id, articleId: article.id }
                });
                return jsonResponse({ bookmarked: true });
            }
        }

        return errorResponse("Aksi tidak valid", 400);
    } catch (error) {
        console.error("Interaction error:", error);
        return errorResponse("Gagal melakukan aksi", 500);
    }
}

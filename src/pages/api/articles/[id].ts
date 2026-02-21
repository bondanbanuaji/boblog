import type { APIContext } from "astro";
import { db } from "@/lib/db";
import { articleSchema } from "@/lib/validation";
import { jsonResponse, errorResponse, calculateReadingTime, generateExcerpt } from "@/lib/utils";

export const prerender = false;

// GET /api/articles/[id]
export async function GET(context: APIContext): Promise<Response> {
    try {
        const { id } = context.params;
        if (!id) return errorResponse("ID wajib diisi", 400);

        const article = await db.article.findFirst({
            where: {
                OR: [{ id }, { slug: id }],
            },
            include: {
                author: {
                    select: { id: true, username: true, displayName: true, avatar: true, bio: true },
                },
                category: {
                    select: { id: true, name: true, slug: true, color: true },
                },
                tags: {
                    include: {
                        tag: { select: { id: true, name: true, slug: true } },
                    },
                },
                _count: { select: { comments: true, likes: true, bookmarks: true } },
            },
        });

        if (!article) return errorResponse("Artikel tidak ditemukan", 404);

        return jsonResponse({ data: article });
    } catch (error) {
        console.error("Get article error:", error);
        return errorResponse("Gagal memuat artikel", 500);
    }
}

// PUT /api/articles/[id]
export async function PUT(context: APIContext): Promise<Response> {
    try {
        const user = context.locals.user;
        if (!user) return errorResponse("Unauthorized", 401);

        const { id } = context.params;
        if (!id) return errorResponse("ID wajib diisi", 400);

        const existing = await db.article.findUnique({ where: { id } });
        if (!existing) return errorResponse("Artikel tidak ditemukan", 404);

        // Check permission
        const isOwner = existing.authorId === user.id;
        const isAdmin = ["SUPER_ADMIN", "ADMIN", "EDITOR"].includes(user.role);
        if (!isOwner && !isAdmin) return errorResponse("Forbidden", 403);

        const body = await context.request.json();
        const result = articleSchema.safeParse(body);

        if (!result.success) {
            return errorResponse(
                Object.values(result.error.flatten().fieldErrors).flat().join(", "),
                400,
            );
        }

        const { tagIds, ...data } = result.data;

        // Check slug uniqueness (if changed)
        if (data.slug !== existing.slug) {
            const slugExists = await db.article.findUnique({ where: { slug: data.slug } });
            if (slugExists) return errorResponse("Slug sudah digunakan", 409);
        }

        const readingTime = calculateReadingTime(data.content);
        const excerpt = data.excerpt || generateExcerpt(data.content);

        // Set publishedAt if status changes to PUBLISHED
        let publishedAt = existing.publishedAt;
        if (data.status === "PUBLISHED" && existing.status !== "PUBLISHED") {
            publishedAt = new Date();
        }

        // Save revision
        await db.articleRevision.create({
            data: {
                title: existing.title,
                content: existing.content,
                articleId: existing.id,
            },
        });

        // Update tags: delete existing, create new
        await db.tagOnArticle.deleteMany({ where: { articleId: id } });

        const article = await db.article.update({
            where: { id },
            data: {
                ...data,
                excerpt,
                readingTime,
                publishedAt,
                tags: tagIds.length
                    ? { create: tagIds.map((tagId: string) => ({ tagId })) }
                    : undefined,
            },
            include: {
                author: { select: { id: true, username: true, displayName: true } },
                category: { select: { id: true, name: true, slug: true } },
                tags: { include: { tag: true } },
            },
        });

        return jsonResponse({ data: article });
    } catch (error) {
        console.error("Update article error:", error);
        return errorResponse("Gagal memperbarui artikel", 500);
    }
}

// DELETE /api/articles/[id]
export async function DELETE(context: APIContext): Promise<Response> {
    try {
        const user = context.locals.user;
        if (!user) return errorResponse("Unauthorized", 401);

        const { id } = context.params;
        if (!id) return errorResponse("ID wajib diisi", 400);

        const article = await db.article.findUnique({ where: { id } });
        if (!article) return errorResponse("Artikel tidak ditemukan", 404);

        const isOwner = article.authorId === user.id;
        const isAdmin = ["SUPER_ADMIN", "ADMIN"].includes(user.role);
        if (!isOwner && !isAdmin) return errorResponse("Forbidden", 403);

        // Soft delete → archive
        await db.article.update({
            where: { id },
            data: { status: "ARCHIVED" },
        });

        return jsonResponse({ message: "Artikel berhasil diarsipkan" });
    } catch (error) {
        console.error("Delete article error:", error);
        return errorResponse("Gagal menghapus artikel", 500);
    }
}

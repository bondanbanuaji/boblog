import type { APIContext } from "astro";
import { db } from "@/lib/db";
import { jsonResponse, errorResponse } from "@/lib/utils";

export const prerender = false;

// GET /api/comments/[articleId] — List comments
export async function GET(context: APIContext): Promise<Response> {
    try {
        const articleId = context.params.articleId;
        if (!articleId) return errorResponse("Article ID required", 400);

        const comments = await db.comment.findMany({
            where: { articleId, parentId: null, spam: false }, // Only top-level
            include: {
                author: { select: { id: true, displayName: true, avatar: true } },
                replies: {
                    where: { spam: false },
                    include: {
                        author: { select: { id: true, displayName: true, avatar: true } }
                    },
                    orderBy: { createdAt: "asc" }
                }
            },
            orderBy: { createdAt: "desc" }
        });

        return jsonResponse({ data: comments });
    } catch (error) {
        return errorResponse("Failed to load comments", 500);
    }
}

// POST /api/comments/[articleId] — Create comment
export async function POST(context: APIContext): Promise<Response> {
    try {
        const user = context.locals.user;
        if (!user) return errorResponse("Harap login untuk berkomentar", 401);

        const articleId = context.params.articleId;
        if (!articleId) return errorResponse("Article ID required", 400);

        const body = await context.request.json();
        const { content, parentId } = body;

        if (!content || content.length < 3) {
            return errorResponse("Komentar minimal 3 karakter", 400);
        }

        const comment = await db.comment.create({
            data: {
                content,
                articleId,
                authorId: user.id,
                parentId: parentId || null,
                approved: true, // Assuming auto-approve for now
            },
            include: {
                author: { select: { id: true, displayName: true, avatar: true } }
            }
        });

        return jsonResponse({ data: comment }, 201);
    } catch (error) {
        return errorResponse("Failed to create comment", 500);
    }
}

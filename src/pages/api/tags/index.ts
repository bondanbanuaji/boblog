import type { APIContext } from "astro";
import { db } from "@/lib/db";
import { tagSchema } from "@/lib/validation";
import { jsonResponse, errorResponse } from "@/lib/utils";

export const prerender = false;

// GET /api/tags
export async function GET(): Promise<Response> {
    try {
        const tags = await db.tag.findMany({
            orderBy: { name: "asc" },
            include: {
                _count: { select: { articles: true } },
            },
        });
        return jsonResponse({ data: tags });
    } catch (error) {
        console.error("List tags error:", error);
        return errorResponse("Gagal memuat tag", 500);
    }
}

// POST /api/tags
export async function POST(context: APIContext): Promise<Response> {
    try {
        const user = context.locals.user;
        if (!user) return errorResponse("Unauthorized", 401);
        if (!["SUPER_ADMIN", "ADMIN", "EDITOR"].includes(user.role)) {
            return errorResponse("Forbidden", 403);
        }

        const body = await context.request.json();
        const result = tagSchema.safeParse(body);
        if (!result.success) {
            return errorResponse(
                Object.values(result.error.flatten().fieldErrors).flat().join(", "),
                400,
            );
        }

        const existing = await db.tag.findUnique({ where: { slug: result.data.slug } });
        if (existing) return errorResponse("Slug tag sudah digunakan", 409);

        const tag = await db.tag.create({ data: result.data });
        return jsonResponse({ data: tag }, 201);
    } catch (error) {
        console.error("Create tag error:", error);
        return errorResponse("Gagal membuat tag", 500);
    }
}

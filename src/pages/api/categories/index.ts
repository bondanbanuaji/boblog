import type { APIContext } from "astro";
import { db } from "@/lib/db";
import { categorySchema, tagSchema } from "@/lib/validation";
import { jsonResponse, errorResponse } from "@/lib/utils";

export const prerender = false;

// GET /api/categories
export async function GET(): Promise<Response> {
    try {
        const categories = await db.category.findMany({
            orderBy: { name: "asc" },
            include: {
                _count: { select: { articles: true } },
            },
        });
        return jsonResponse({ data: categories });
    } catch (error) {
        console.error("List categories error:", error);
        return errorResponse("Gagal memuat kategori", 500);
    }
}

// POST /api/categories
export async function POST(context: APIContext): Promise<Response> {
    try {
        const user = context.locals.user;
        if (!user) return errorResponse("Unauthorized", 401);
        if (!["SUPER_ADMIN", "ADMIN"].includes(user.role)) {
            return errorResponse("Forbidden", 403);
        }

        const body = await context.request.json();
        const result = categorySchema.safeParse(body);
        if (!result.success) {
            return errorResponse(
                Object.values(result.error.flatten().fieldErrors).flat().join(", "),
                400,
            );
        }

        const existing = await db.category.findUnique({ where: { slug: result.data.slug } });
        if (existing) return errorResponse("Slug kategori sudah digunakan", 409);

        const category = await db.category.create({ data: result.data });
        return jsonResponse({ data: category }, 201);
    } catch (error) {
        console.error("Create category error:", error);
        return errorResponse("Gagal membuat kategori", 500);
    }
}

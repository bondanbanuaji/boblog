import { d as db } from '../../chunks/db_CcHuIs8X.mjs';
import { c as categorySchema } from '../../chunks/validation_DPAxoH0U.mjs';
import { j as jsonResponse, e as errorResponse } from '../../chunks/utils_TLTR-e7h.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
async function GET() {
  try {
    const categories = await db.category.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: { select: { articles: true } }
      }
    });
    return jsonResponse({ data: categories });
  } catch (error) {
    console.error("List categories error:", error);
    return errorResponse("Gagal memuat kategori", 500);
  }
}
async function POST(context) {
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
        400
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

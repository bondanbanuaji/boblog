import { d as db } from '../../chunks/db_CcHuIs8X.mjs';
import { t as tagSchema } from '../../chunks/validation_DPAxoH0U.mjs';
import { j as jsonResponse, e as errorResponse } from '../../chunks/utils_TLTR-e7h.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
async function GET() {
  try {
    const tags = await db.tag.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: { select: { articles: true } }
      }
    });
    return jsonResponse({ data: tags });
  } catch (error) {
    console.error("List tags error:", error);
    return errorResponse("Gagal memuat tag", 500);
  }
}
async function POST(context) {
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
        400
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

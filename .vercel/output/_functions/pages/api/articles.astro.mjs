import { d as db } from '../../chunks/db_CcHuIs8X.mjs';
import { a as articleSchema } from '../../chunks/validation_DPAxoH0U.mjs';
import { j as jsonResponse, e as errorResponse, c as calculateReadingTime, g as generateExcerpt } from '../../chunks/utils_TLTR-e7h.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
async function GET(context) {
  try {
    const url = new URL(context.request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const perPage = parseInt(url.searchParams.get("perPage") || "10");
    const status = url.searchParams.get("status");
    const categoryId = url.searchParams.get("categoryId");
    const search = url.searchParams.get("search");
    const sort = url.searchParams.get("sort") || "latest";
    const where = {};
    const user = context.locals.user;
    const isAdmin = user && ["SUPER_ADMIN", "ADMIN", "EDITOR"].includes(user.role);
    if (!isAdmin) {
      where.status = "PUBLISHED";
    } else if (status) {
      where.status = status;
    }
    if (categoryId) where.categoryId = categoryId;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } }
      ];
    }
    const orderBy = sort === "popular" ? { viewCount: "desc" } : sort === "oldest" ? { publishedAt: "asc" } : { publishedAt: "desc" };
    const [articles, total] = await Promise.all([
      db.article.findMany({
        where,
        include: {
          author: {
            select: { id: true, username: true, displayName: true, avatar: true }
          },
          category: {
            select: { id: true, name: true, slug: true, color: true }
          },
          tags: {
            include: {
              tag: { select: { id: true, name: true, slug: true } }
            }
          },
          _count: { select: { comments: true, likes: true, bookmarks: true } }
        },
        orderBy,
        skip: (page - 1) * perPage,
        take: perPage
      }),
      db.article.count({ where })
    ]);
    const totalPages = Math.ceil(total / perPage);
    return jsonResponse({
      data: articles,
      meta: {
        page,
        perPage,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error("List articles error:", error);
    return errorResponse("Gagal memuat artikel", 500);
  }
}
async function POST(context) {
  try {
    const user = context.locals.user;
    if (!user) return errorResponse("Unauthorized", 401);
    const canCreate = ["SUPER_ADMIN", "ADMIN", "EDITOR", "AUTHOR"].includes(user.role);
    if (!canCreate) return errorResponse("Forbidden", 403);
    const body = await context.request.json();
    const result = articleSchema.safeParse(body);
    if (!result.success) {
      return errorResponse(
        result.error.flatten().fieldErrors ? Object.values(result.error.flatten().fieldErrors).flat().join(", ") : "Validasi gagal",
        400
      );
    }
    const { tagIds, ...data } = result.data;
    const existing = await db.article.findUnique({ where: { slug: data.slug } });
    if (existing) {
      return errorResponse("Slug sudah digunakan", 409);
    }
    const readingTime = calculateReadingTime(data.content);
    const excerpt = data.excerpt || generateExcerpt(data.content);
    const publishedAt = data.status === "PUBLISHED" ? /* @__PURE__ */ new Date() : null;
    const article = await db.article.create({
      data: {
        ...data,
        excerpt,
        readingTime,
        publishedAt,
        authorId: user.id,
        tags: tagIds.length ? { create: tagIds.map((tagId) => ({ tagId })) } : void 0
      },
      include: {
        author: { select: { id: true, username: true, displayName: true } },
        category: { select: { id: true, name: true, slug: true } },
        tags: { include: { tag: true } }
      }
    });
    return jsonResponse({ data: article }, 201);
  } catch (error) {
    console.error("Create article error:", error);
    return errorResponse("Gagal membuat artikel", 500);
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

import { d as db } from '../../../chunks/db_CcHuIs8X.mjs';
import { a as articleSchema } from '../../../chunks/validation_DPAxoH0U.mjs';
import { e as errorResponse, j as jsonResponse, c as calculateReadingTime, g as generateExcerpt } from '../../../chunks/utils_TLTR-e7h.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
async function GET(context) {
  try {
    const { id } = context.params;
    if (!id) return errorResponse("ID wajib diisi", 400);
    const article = await db.article.findFirst({
      where: {
        OR: [{ id }, { slug: id }]
      },
      include: {
        author: {
          select: { id: true, username: true, displayName: true, avatar: true, bio: true }
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
      }
    });
    if (!article) return errorResponse("Artikel tidak ditemukan", 404);
    return jsonResponse({ data: article });
  } catch (error) {
    console.error("Get article error:", error);
    return errorResponse("Gagal memuat artikel", 500);
  }
}
async function PUT(context) {
  try {
    const user = context.locals.user;
    if (!user) return errorResponse("Unauthorized", 401);
    const { id } = context.params;
    if (!id) return errorResponse("ID wajib diisi", 400);
    const existing = await db.article.findUnique({ where: { id } });
    if (!existing) return errorResponse("Artikel tidak ditemukan", 404);
    const isOwner = existing.authorId === user.id;
    const isAdmin = ["SUPER_ADMIN", "ADMIN", "EDITOR"].includes(user.role);
    if (!isOwner && !isAdmin) return errorResponse("Forbidden", 403);
    const body = await context.request.json();
    const result = articleSchema.safeParse(body);
    if (!result.success) {
      return errorResponse(
        Object.values(result.error.flatten().fieldErrors).flat().join(", "),
        400
      );
    }
    const { tagIds, ...data } = result.data;
    if (data.slug !== existing.slug) {
      const slugExists = await db.article.findUnique({ where: { slug: data.slug } });
      if (slugExists) return errorResponse("Slug sudah digunakan", 409);
    }
    const readingTime = calculateReadingTime(data.content);
    const excerpt = data.excerpt || generateExcerpt(data.content);
    let publishedAt = existing.publishedAt;
    if (data.status === "PUBLISHED" && existing.status !== "PUBLISHED") {
      publishedAt = /* @__PURE__ */ new Date();
    }
    await db.articleRevision.create({
      data: {
        title: existing.title,
        content: existing.content,
        articleId: existing.id
      }
    });
    await db.tagOnArticle.deleteMany({ where: { articleId: id } });
    const article = await db.article.update({
      where: { id },
      data: {
        ...data,
        excerpt,
        readingTime,
        publishedAt,
        tags: tagIds.length ? { create: tagIds.map((tagId) => ({ tagId })) } : void 0
      },
      include: {
        author: { select: { id: true, username: true, displayName: true } },
        category: { select: { id: true, name: true, slug: true } },
        tags: { include: { tag: true } }
      }
    });
    return jsonResponse({ data: article });
  } catch (error) {
    console.error("Update article error:", error);
    return errorResponse("Gagal memperbarui artikel", 500);
  }
}
async function DELETE(context) {
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
    await db.article.update({
      where: { id },
      data: { status: "ARCHIVED" }
    });
    return jsonResponse({ message: "Artikel berhasil diarsipkan" });
  } catch (error) {
    console.error("Delete article error:", error);
    return errorResponse("Gagal menghapus artikel", 500);
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    DELETE,
    GET,
    PUT,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

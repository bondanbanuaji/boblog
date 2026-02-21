import { d as db } from '../../../chunks/db_CcHuIs8X.mjs';
import { e as errorResponse, j as jsonResponse } from '../../../chunks/utils_TLTR-e7h.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
async function POST(context) {
  try {
    const user = context.locals.user;
    if (!user) return errorResponse("Harap login untuk melakukan aksi ini", 401);
    const slug = context.params.slug;
    if (!slug) return errorResponse("Article slug required", 400);
    const body = await context.request.json();
    const { action } = body;
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
        if (article.authorId !== user.id) {
          await db.notification.create({
            data: {
              userId: article.authorId,
              type: "LIKE",
              content: `${user.displayName} menyukai artikel Anda "${article.title}"`,
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

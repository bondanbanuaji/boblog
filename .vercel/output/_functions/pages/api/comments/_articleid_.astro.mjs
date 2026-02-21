import { d as db } from '../../../chunks/db_CcHuIs8X.mjs';
import { e as errorResponse, j as jsonResponse } from '../../../chunks/utils_TLTR-e7h.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
async function GET(context) {
  try {
    const articleId = context.params.articleId;
    if (!articleId) return errorResponse("Article ID required", 400);
    const comments = await db.comment.findMany({
      where: { articleId, parentId: null, isSpam: false },
      // Only top-level
      include: {
        author: { select: { id: true, displayName: true, avatar: true } },
        replies: {
          where: { isSpam: false },
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
async function POST(context) {
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
        isApproved: true
        // Assuming auto-approve for now
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

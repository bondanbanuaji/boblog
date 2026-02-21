import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate } from '../../../../chunks/astro/server_7-zI95CH.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../../../chunks/AdminLayout_B0N_SyUx.mjs';
import { A as ArticleForm } from '../../../../chunks/ArticleForm_B_JG2sSm.mjs';
import { d as db } from '../../../../chunks/db_CcHuIs8X.mjs';
export { renderers } from '../../../../renderers.mjs';

const $$Astro = createAstro("https://boblog.vercel.app");
const prerender = false;
const $$Edit = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Edit;
  const { slug } = Astro2.params;
  const article = await db.article.findUnique({
    where: { slug },
    include: {
      tags: { select: { tagId: true } }
    }
  });
  if (!article) {
    return Astro2.redirect("/admin/articles");
  }
  const [categories, tags] = await Promise.all([
    db.category.findMany({ orderBy: { name: "asc" } }),
    db.tag.findMany({ orderBy: { name: "asc" } })
  ]);
  const articleData = {
    id: article.id,
    title: article.title,
    slug: article.slug,
    content: article.content,
    excerpt: article.excerpt || "",
    thumbnail: article.thumbnail || "",
    status: article.status,
    categoryId: article.categoryId || "",
    tagIds: article.tags.map((t) => t.tagId),
    metaTitle: article.metaTitle || "",
    metaDesc: article.metaDesc || "",
    ogImage: article.ogImage || "",
    canonicalUrl: article.canonicalUrl || "",
    scheduledAt: article.scheduledAt?.toISOString().slice(0, 16) || ""
  };
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": `Edit: ${article.title}` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "ArticleForm", ArticleForm, { "client:load": true, "article": articleData, "categories": categories.map((c) => ({ id: c.id, name: c.name, slug: c.slug })), "tags": tags.map((t) => ({ id: t.id, name: t.name, slug: t.slug })), "client:component-hydration": "load", "client:component-path": "@/components/admin/ArticleForm", "client:component-export": "default" })} ` })}`;
}, "/home/boba/Projects/ngaduburit-bareng-astro/boblog/src/pages/admin/articles/[slug]/edit.astro", void 0);

const $$file = "/home/boba/Projects/ngaduburit-bareng-astro/boblog/src/pages/admin/articles/[slug]/edit.astro";
const $$url = "/admin/articles/[slug]/edit";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Edit,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

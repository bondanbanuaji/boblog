import { f as createComponent, k as renderComponent, r as renderTemplate } from '../../../chunks/astro/server_7-zI95CH.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../../chunks/AdminLayout_B0N_SyUx.mjs';
import { A as ArticleForm } from '../../../chunks/ArticleForm_B_JG2sSm.mjs';
import { d as db } from '../../../chunks/db_CcHuIs8X.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const $$New = createComponent(async ($$result, $$props, $$slots) => {
  const [categories, tags] = await Promise.all([
    db.category.findMany({ orderBy: { name: "asc" } }),
    db.tag.findMany({ orderBy: { name: "asc" } })
  ]);
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Tulis Artikel Baru" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "ArticleForm", ArticleForm, { "client:load": true, "categories": categories.map((c) => ({ id: c.id, name: c.name, slug: c.slug })), "tags": tags.map((t) => ({ id: t.id, name: t.name, slug: t.slug })), "client:component-hydration": "load", "client:component-path": "@/components/admin/ArticleForm", "client:component-export": "default" })} ` })}`;
}, "/home/boba/Projects/ngaduburit-bareng-astro/boblog/src/pages/admin/articles/new.astro", void 0);

const $$file = "/home/boba/Projects/ngaduburit-bareng-astro/boblog/src/pages/admin/articles/new.astro";
const $$url = "/admin/articles/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$New,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

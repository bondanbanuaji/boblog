import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_7-zI95CH.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_BZwoteYL.mjs';
import { $ as $$ArticleCard } from '../../chunks/ArticleCard_DX_XKaK4.mjs';
import { d as db } from '../../chunks/db_CcHuIs8X.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://boblog.vercel.app");
const prerender = false;
const $$username = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$username;
  const { username } = Astro2.params;
  if (!username) {
    return Astro2.redirect("/404");
  }
  const url = new URL(Astro2.request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const perPage = 9;
  const [author, articles, totalArticles] = await Promise.all([
    db.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        displayName: true,
        avatar: true,
        bio: true,
        createdAt: true
      }
    }),
    db.article.findMany({
      where: { author: { username }, status: "PUBLISHED" },
      include: {
        author: { select: { displayName: true, avatar: true, username: true } },
        category: { select: { name: true, slug: true, color: true } }
      },
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage
    }),
    db.article.count({
      where: { author: { username }, status: "PUBLISHED" }
    })
  ]);
  if (!author) {
    return Astro2.redirect("/404");
  }
  const totalPages = Math.ceil(totalArticles / perPage);
  const getPageUrl = (p) => {
    const newUrl = new URL(url.href);
    newUrl.searchParams.set("page", p.toString());
    return newUrl.pathname + newUrl.search;
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `Penulis: ${author.displayName}` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-4xl mx-auto px-4 py-12"> <!-- Author Profile Header --> <div class="bg-base-200 p-8 rounded-3xl flex flex-col sm:flex-row gap-8 items-center sm:items-start text-center sm:text-left mb-16 shadow-inner"> <div class="avatar"> <div class="w-32 rounded-full shadow-lg ring-4 ring-primary/20 ring-offset-base-200 ring-offset-4"> <img${addAttribute(author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(author.displayName)}&size=128&background=random`, "src")}${addAttribute(author.displayName, "alt")}> </div> </div> <div class="flex-1"> <h1 class="text-3xl md:text-4xl font-bold mb-2">${author.displayName}</h1> <p class="font-mono text-sm opacity-50 mb-4">@${author.username}</p> <p class="text-lg opacity-80 max-w-2xl mb-6"> ${author.bio || "Seorang penulis yang gemar berbagi wawasan baru tentang teknologi dan pemrograman."} </p> <div class="flex flex-wrap gap-4 justify-center sm:justify-start"> <div class="stat bg-base-100 rounded-2xl shadow-sm border border-base-300 w-auto px-6 py-2"> <div class="stat-title text-xs">Total Artikel</div> <div class="stat-value text-2xl text-primary">${totalArticles}</div> </div> <div class="stat bg-base-100 rounded-2xl shadow-sm border border-base-300 w-auto px-6 py-2"> <div class="stat-title text-xs">Bergabung Sejak</div> <div class="stat-value text-lg font-medium mt-1"> ${new Date(author.createdAt).toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric"
  })} </div> </div> </div> </div> </div> <!-- Author's Articles --> <h2 class="text-2xl font-bold mb-8 border-b border-base-200 pb-4">
Artikel oleh ${author.displayName} </h2> ${articles.length === 0 ? renderTemplate`<div class="text-center py-16 bg-base-200/50 rounded-2xl border border-dashed border-base-300"> <p class="opacity-50">Belum ada artikel yang dipublikasikan.</p> </div>` : renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"> ${articles.map((article) => renderTemplate`${renderComponent($$result2, "ArticleCard", $$ArticleCard, { "article": article })}`)} </div>`} <!-- Pagination --> ${totalPages > 1 && renderTemplate`<div class="flex justify-center mt-8"> <div class="join shadow-md"> <a${addAttribute(page > 1 ? getPageUrl(page - 1) : "#", "href")}${addAttribute(`join-item btn ${page <= 1 ? "btn-disabled" : "bg-base-100"}`, "class")}>
«
</a> ${Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => renderTemplate`<a${addAttribute(getPageUrl(p), "href")}${addAttribute(`join-item btn ${p === page ? "btn-primary" : "bg-base-100"}`, "class")}> ${p} </a>`)} <a${addAttribute(page < totalPages ? getPageUrl(page + 1) : "#", "href")}${addAttribute(`join-item btn ${page >= totalPages ? "btn-disabled" : "bg-base-100"}`, "class")}>
»
</a> </div> </div>`} </div> ` })}`;
}, "/home/boba/Projects/ngaduburit-bareng-astro/boblog/src/pages/author/[username].astro", void 0);

const $$file = "/home/boba/Projects/ngaduburit-bareng-astro/boblog/src/pages/author/[username].astro";
const $$url = "/author/[username]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$username,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

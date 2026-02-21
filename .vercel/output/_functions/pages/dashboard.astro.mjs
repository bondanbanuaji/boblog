import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_7-zI95CH.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_BZwoteYL.mjs';
import { $ as $$ArticleCard } from '../chunks/ArticleCard_DX_XKaK4.mjs';
import { d as db } from '../chunks/db_CcHuIs8X.mjs';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://boblog.vercel.app");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const user = Astro2.locals.user;
  if (!user) return Astro2.redirect("/auth/login?redirect=/dashboard");
  const activeTab = Astro2.url.searchParams.get("tab") || "saved";
  const [savedArticles, recentComments, notifications] = await Promise.all([
    db.bookmark.findMany({
      where: { userId: user.id },
      include: {
        article: {
          include: { author: true, category: true }
        }
      },
      orderBy: { createdAt: "desc" },
      take: 10
    }),
    db.comment.findMany({
      where: { authorId: user.id },
      include: { article: { select: { title: true, slug: true } } },
      orderBy: { createdAt: "desc" },
      take: 10
    }),
    db.notification.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 10
    })
  ]);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Dashboard Pengguna" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-6xl mx-auto px-4 py-8 md:py-12"> <div class="flex flex-col md:flex-row gap-8"> <!-- Sidebar / Profil --> <aside class="md:w-1/3 lg:w-1/4"> <div class="bg-base-200 rounded-3xl p-6 shadow-sm border border-base-300 sticky top-24"> <div class="text-center mb-6"> <div class="avatar mb-4"> <div class="w-24 rounded-full ring ring-primary ring-offset-base-200 ring-offset-2"> <img${addAttribute(user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName)}&size=96`, "src")}${addAttribute(user.displayName, "alt")}> </div> </div> <h2 class="text-xl font-bold">${user.displayName}</h2> <p class="text-sm opacity-60 font-mono">@${user.username}</p> </div> <div class="space-y-2"> <a href="/dashboard?tab=saved"${addAttribute(`btn w-full justify-start ${activeTab === "saved" ? "btn-primary" : "btn-ghost"}`, "class")}>
🔖 Artikel Disimpan
</a> <a href="/dashboard?tab=comments"${addAttribute(`btn w-full justify-start ${activeTab === "comments" ? "btn-primary" : "btn-ghost"}`, "class")}>
💬 Komentar Saya
</a> <a href="/dashboard?tab=notifications"${addAttribute(`btn w-full justify-start ${activeTab === "notifications" ? "btn-primary" : "btn-ghost"}`, "class")}>
🔔 Notifikasi
${notifications.filter((n) => !n.isRead).length > 0 && renderTemplate`<span class="badge badge-sm badge-secondary"> ${notifications.filter((n) => !n.isRead).length} </span>`} </a> <a href="/dashboard/settings"${addAttribute(`btn w-full justify-start ${activeTab === "settings" ? "btn-primary" : "btn-ghost"}`, "class")}>
⚙️ Pengaturan Profil
</a> ${user.role === "ADMIN" && renderTemplate`<div class="divider my-1">Admin</div>`} ${user.role === "ADMIN" && renderTemplate`<a href="/admin" class="btn w-full justify-start btn-outline btn-secondary mt-2">
🛡️ Admin Panel
</a>`} <div class="divider my-1">Akun</div> <form action="/api/auth/logout" method="POST"> <button type="submit" class="btn w-full justify-start btn-ghost text-error hover:bg-error/10 hover:text-error">
🚪 Keluar
</button> </form> </div> </div> </aside> <!-- Main Content Area --> <main class="flex-1"> ${activeTab === "saved" && renderTemplate`<section class="animate-fade-in"> <h1 class="text-3xl font-bold mb-6 flex items-center gap-3"> <span class="text-primary">🔖</span> Artikel Disimpan
</h1> ${savedArticles.length === 0 ? renderTemplate`<div class="bg-base-200/50 p-12 rounded-3xl text-center border border-dashed border-base-300"> <div class="text-5xl opacity-20 mb-4">📚</div> <h3 class="text-xl font-bold mb-2">Belum ada artikel yang disimipan</h3> <p class="opacity-60 mb-6">
Jelajahi blog dan simpan artikel untuk dibaca nanti.
</p> <a href="/blog" class="btn btn-primary">
Eksplorasi Blog
</a> </div>` : renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 gap-6"> ${savedArticles.map(({ article }) => renderTemplate`${renderComponent($$result2, "ArticleCard", $$ArticleCard, { "article": article })}`)} </div>`} </section>`} ${activeTab === "comments" && renderTemplate`<section class="animate-fade-in"> <h1 class="text-3xl font-bold mb-6 flex items-center gap-3"> <span class="text-primary">💬</span> Komentar Saya
</h1> ${recentComments.length === 0 ? renderTemplate`<div class="bg-base-200/50 p-12 rounded-3xl text-center border border-dashed border-base-300"> <p class="opacity-60">Anda belum pernah meninggalkan komentar.</p> </div>` : renderTemplate`<div class="space-y-4"> ${recentComments.map((comment) => renderTemplate`<div class="bg-base-200 p-5 rounded-2xl border border-base-300"> <div class="flex justify-between items-baseline mb-2"> <div class="text-sm font-semibold opacity-70">
Pada:${" "} <a${addAttribute(`/blog/${comment.article.slug}`, "href")} class="text-primary hover:underline"> ${comment.article.title} </a> </div> <span class="text-xs opacity-50"> ${formatDistanceToNow(new Date(comment.createdAt), {
    addSuffix: true,
    locale: id
  })} </span> </div> <p class="pl-4 border-l-2 border-base-300 opacity-90">${comment.content}</p> </div>`)} </div>`} </section>`} ${activeTab === "notifications" && renderTemplate`<section class="animate-fade-in"> <h1 class="text-3xl font-bold mb-6 flex items-center gap-3"> <span class="text-primary">🔔</span> Notifikasi
</h1> ${notifications.length === 0 ? renderTemplate`<div class="bg-base-200/50 p-12 rounded-3xl text-center border border-dashed border-base-300"> <p class="opacity-60">Belum ada notifikasi baru.</p> </div>` : renderTemplate`<div class="space-y-3"> ${notifications.map((notif) => renderTemplate`<a${addAttribute(notif.link || "#", "href")}${addAttribute(`block bg-base-100 p-4 rounded-xl border ${notif.isRead ? "border-base-200 opacity-70" : "border-primary/30 shadow-sm bg-base-200/50"} hover:bg-base-200 transition-colors`, "class")}> <div class="flex items-start gap-4"> <div class="text-2xl mt-1"> ${notif.type === "LIKE" ? "\u2764\uFE0F" : notif.type === "COMMENT" ? "\u{1F4AC}" : "\u{1F514}"} </div> <div class="flex-1"> <p class="font-medium text-sm md:text-base">${notif.content}</p> <p class="text-xs opacity-50 mt-1"> ${formatDistanceToNow(new Date(notif.createdAt), {
    addSuffix: true,
    locale: id
  })} </p> </div> ${!notif.isRead && renderTemplate`<div class="w-2 h-2 rounded-full bg-primary mt-2"></div>`} </div> </a>`)} </div>`} </section>`} </main> </div> </div> ` })}`;
}, "/home/boba/Projects/ngaduburit-bareng-astro/boblog/src/pages/dashboard/index.astro", void 0);

const $$file = "/home/boba/Projects/ngaduburit-bareng-astro/boblog/src/pages/dashboard/index.astro";
const $$url = "/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, n as renderSlot, m as maybeRenderHead, h as addAttribute } from './astro/server_7-zI95CH.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from './BaseLayout_BZwoteYL.mjs';

const $$Astro = createAstro("https://boblog.vercel.app");
const $$AdminLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AdminLayout;
  const { title } = Astro2.props;
  const user = Astro2.locals.user;
  const navItems = [
    { label: "Dashboard", href: "/admin", icon: "\u{1F4CA}" },
    { label: "Artikel", href: "/admin/articles", icon: "\u{1F4DD}" },
    { label: "Kategori", href: "/admin/categories", icon: "\u{1F5C2}\uFE0F" },
    { label: "Tag", href: "/admin/tags", icon: "\u{1F3F7}\uFE0F" },
    { label: "Komentar", href: "/admin/comments", icon: "\u{1F4AC}" },
    { label: "Media", href: "/admin/media", icon: "\u{1F5BC}\uFE0F" },
    { label: "Pengguna", href: "/admin/users", icon: "\u{1F465}" },
    { label: "Newsletter", href: "/admin/newsletter", icon: "\u{1F4E7}" },
    { label: "Pengaturan", href: "/admin/settings", icon: "\u2699\uFE0F" }
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${title} \u2014 Admin`, "noIndex": true }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["header"], renderTemplate` <!-- Admin specific header --> ${maybeRenderHead()}<header class="navbar bg-base-200/80 backdrop-blur-lg sticky top-0 z-50 border-b border-base-300"> <div class="navbar-start"> <label for="admin-drawer" class="btn btn-ghost drawer-button lg:hidden"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16"></path> </svg> </label> <a href="/admin" class="btn btn-ghost text-xl font-bold"> <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">BoBlog</span> <span class="badge badge-sm badge-primary">Admin</span> </a> </div> <div class="navbar-end gap-2"> <a href="/" class="btn btn-ghost btn-sm" target="_blank"> <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path> </svg>
Lihat Situs
</a> <div class="dropdown dropdown-end"> <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar"> <div class="w-8 rounded-full"> <img${addAttribute(user?.displayName || "Admin", "alt")}${addAttribute(user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || "Admin")}&background=random`, "src")}> </div> </div> <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow-xl"> <li><a href="/profile">Profil</a></li> <li> <form method="POST" action="/api/auth/logout"> <button type="submit" class="w-full text-left text-error">Keluar</button> </form> </li> </ul> </div> </div> </header> `)} <div class="drawer lg:drawer-open"> <input id="admin-drawer" type="checkbox" class="drawer-toggle"> <div class="drawer-content p-6"> <!-- Page title --> <div class="mb-6"> <h1 class="text-2xl font-bold">${title}</h1> <div class="text-sm breadcrumbs opacity-60"> <ul> <li><a href="/admin">Admin</a></li> <li>${title}</li> </ul> </div> </div> ${renderSlot($$result2, $$slots["default"])} </div> <div class="drawer-side z-40"> <label for="admin-drawer" aria-label="close sidebar" class="drawer-overlay"></label> <aside class="bg-base-200 min-h-full w-64 border-r border-base-300"> <ul class="menu p-4 gap-1"> ${navItems.map((item) => renderTemplate`<li> <a${addAttribute(item.href, "href")}${addAttribute(["rounded-lg", { active: Astro2.url.pathname === item.href }], "class:list")}> <span>${item.icon}</span> ${item.label} </a> </li>`)} </ul> </aside> </div> </div> ` })}`;
}, "/home/boba/Projects/ngaduburit-bareng-astro/boblog/src/layouts/AdminLayout.astro", void 0);

export { $$AdminLayout as $ };

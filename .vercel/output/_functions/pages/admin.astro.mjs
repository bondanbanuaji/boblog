import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_7-zI95CH.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../chunks/AdminLayout_B0N_SyUx.mjs';
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Dashboard" }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"> <div class="stat bg-base-200 rounded-box shadow"> <div class="stat-figure text-primary"> <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path> </svg> </div> <div class="stat-title">Total Artikel</div> <div class="stat-value text-primary">0</div> <div class="stat-desc">Belum ada artikel</div> </div> <div class="stat bg-base-200 rounded-box shadow"> <div class="stat-figure text-secondary"> <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.197-2.803a4 4 0 10-5.394 0"></path> </svg> </div> <div class="stat-title">Total User</div> <div class="stat-value text-secondary">0</div> <div class="stat-desc">Belum ada user</div> </div> <div class="stat bg-base-200 rounded-box shadow"> <div class="stat-figure text-accent"> <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path> </svg> </div> <div class="stat-title">Total Komentar</div> <div class="stat-value text-accent">0</div> <div class="stat-desc">Belum ada komentar</div> </div> <div class="stat bg-base-200 rounded-box shadow"> <div class="stat-figure text-info"> <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path> </svg> </div> <div class="stat-title">Total Views</div> <div class="stat-value text-info">0</div> <div class="stat-desc">Hari ini</div> </div> </div>  <div class="mb-8"> <h2 class="text-xl font-bold mb-4">Aksi Cepat</h2> <div class="flex flex-wrap gap-3"> <a href="/admin/articles/new" class="btn btn-primary gap-2"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path> </svg>
Tulis Artikel Baru
</a> <a href="/admin/categories" class="btn btn-outline gap-2"> 🗂️ Kelola Kategori </a> <a href="/admin/comments" class="btn btn-outline gap-2"> 💬 Moderasi Komentar </a> </div> </div>  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"> <!-- Recent Articles --> <div class="card bg-base-200 shadow"> <div class="card-body"> <h3 class="card-title">📝 Artikel Terbaru</h3> <div class="text-center py-8 opacity-50"> <p class="text-sm">Belum ada artikel.</p> <a href="/admin/articles/new" class="btn btn-primary btn-sm mt-2">Buat Artikel Pertama</a> </div> </div> </div> <!-- Recent Comments --> <div class="card bg-base-200 shadow"> <div class="card-body"> <h3 class="card-title">💬 Komentar Terbaru</h3> <div class="text-center py-8 opacity-50"> <p class="text-sm">Belum ada komentar.</p> </div> </div> </div> </div> ` })}`;
}, "/home/boba/Projects/ngaduburit-bareng-astro/boblog/src/pages/admin/index.astro", void 0);

const $$file = "/home/boba/Projects/ngaduburit-bareng-astro/boblog/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, l as renderScript } from '../../chunks/astro/server_7-zI95CH.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_B0N_SyUx.mjs';
import { d as db } from '../../chunks/db_CcHuIs8X.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: { select: { articles: true } }
    }
  });
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Kategori" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex justify-between items-center mb-6"> <p class="text-sm opacity-60">${categories.length} kategori</p> <button class="btn btn-primary btn-sm gap-2" onclick="document.getElementById('add-modal')?.showModal()">
+ Tambah Kategori
</button> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> ${categories.length === 0 ? renderTemplate`<div class="col-span-full text-center py-12 opacity-50"> <p class="text-lg mb-2">Belum ada kategori</p> <button class="btn btn-primary btn-sm" onclick="document.getElementById('add-modal')?.showModal()">
Buat Kategori Pertama
</button> </div>` : categories.map((cat) => renderTemplate`<div class="card bg-base-200 shadow hover:shadow-lg transition-shadow"> <div class="card-body"> <div class="flex items-center gap-3"> ${cat.icon && renderTemplate`<span class="text-2xl">${cat.icon}</span>`} <div> <h3 class="card-title text-base"> ${cat.color && renderTemplate`<span class="w-3 h-3 rounded-full inline-block"${addAttribute(`background-color: ${cat.color}`, "style")}></span>`} ${cat.name} </h3> <p class="text-xs font-mono opacity-50">/${cat.slug}</p> </div> </div> ${cat.description && renderTemplate`<p class="text-sm opacity-60 mt-2">${cat.description}</p>`} <div class="flex justify-between items-center mt-2"> <span class="badge badge-sm badge-ghost">${cat._count.articles} artikel</span> <div class="flex gap-1"> <button class="btn btn-ghost btn-xs">✏️</button> <button class="btn btn-ghost btn-xs text-error">🗑️</button> </div> </div> </div> </div>`)} </div>  <dialog id="add-modal" class="modal"> <div class="modal-box"> <h3 class="font-bold text-lg mb-4">Tambah Kategori</h3> <form id="category-form" class="space-y-4"> <div class="form-control"> <label class="label"><span class="label-text">Nama</span></label> <input type="text" name="name" class="input input-bordered" placeholder="Nama Kategori" required> </div> <div class="form-control"> <label class="label"><span class="label-text">Slug</span></label> <input type="text" name="slug" class="input input-bordered" placeholder="nama-kategori" required> </div> <div class="form-control"> <label class="label"><span class="label-text">Deskripsi</span></label> <textarea name="description" class="textarea textarea-bordered" placeholder="Deskripsi singkat"></textarea> </div> <div class="grid grid-cols-2 gap-4"> <div class="form-control"> <label class="label"><span class="label-text">Warna</span></label> <input type="color" name="color" class="input input-bordered h-10" value="#3B82F6"> </div> <div class="form-control"> <label class="label"><span class="label-text">Icon (emoji)</span></label> <input type="text" name="icon" class="input input-bordered" placeholder="📁"> </div> </div> <div id="form-error" class="alert alert-error hidden"></div> <div class="modal-action"> <button type="button" class="btn btn-ghost" onclick="document.getElementById('add-modal')?.close()">Batal</button> <button type="submit" class="btn btn-primary">Simpan</button> </div> </form> </div> </dialog> ${renderScript($$result2, "/home/boba/Projects/ngaduburit-bareng-astro/boblog/src/pages/admin/categories/index.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/home/boba/Projects/ngaduburit-bareng-astro/boblog/src/pages/admin/categories/index.astro", void 0);

const $$file = "/home/boba/Projects/ngaduburit-bareng-astro/boblog/src/pages/admin/categories/index.astro";
const $$url = "/admin/categories";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

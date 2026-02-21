import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as renderScript } from '../../chunks/astro/server_7-zI95CH.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_B0N_SyUx.mjs';
import { d as db } from '../../chunks/db_CcHuIs8X.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const tags = await db.tag.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: { select: { articles: true } }
    }
  });
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Tag" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex justify-between items-center mb-6"> <p class="text-sm opacity-60">${tags.length} tag</p> <button class="btn btn-primary btn-sm gap-2" onclick="document.getElementById('add-tag-modal')?.showModal()">
+ Tambah Tag
</button> </div> <div class="flex flex-wrap gap-3"> ${tags.length === 0 ? renderTemplate`<div class="w-full text-center py-12 opacity-50"> <p class="text-lg mb-2">Belum ada tag</p> <button class="btn btn-primary btn-sm" onclick="document.getElementById('add-tag-modal')?.showModal()">
Buat Tag Pertama
</button> </div>` : tags.map((tag) => renderTemplate`<div class="badge badge-lg gap-2 p-4"> <span class="font-medium">${tag.name}</span> <span class="badge badge-sm badge-ghost">${tag._count.articles}</span> </div>`)} </div>  <dialog id="add-tag-modal" class="modal"> <div class="modal-box"> <h3 class="font-bold text-lg mb-4">Tambah Tag</h3> <form id="tag-form" class="space-y-4"> <div class="form-control"> <label class="label"><span class="label-text">Nama</span></label> <input type="text" name="name" class="input input-bordered" placeholder="Nama Tag" required> </div> <div class="form-control"> <label class="label"><span class="label-text">Slug</span></label> <input type="text" name="slug" class="input input-bordered" placeholder="nama-tag" required> </div> <div id="tag-form-error" class="alert alert-error hidden"></div> <div class="modal-action"> <button type="button" class="btn btn-ghost" onclick="document.getElementById('add-tag-modal')?.close()">Batal</button> <button type="submit" class="btn btn-primary">Simpan</button> </div> </form> </div> </dialog> ${renderScript($$result2, "/home/boba/Projects/ngaduburit-bareng-astro/boblog/src/pages/admin/tags/index.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/home/boba/Projects/ngaduburit-bareng-astro/boblog/src/pages/admin/tags/index.astro", void 0);

const $$file = "/home/boba/Projects/ngaduburit-bareng-astro/boblog/src/pages/admin/tags/index.astro";
const $$url = "/admin/tags";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

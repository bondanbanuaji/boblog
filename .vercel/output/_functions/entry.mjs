import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_LFAhIUMd.mjs';
import { manifest } from './manifest_BtRxhGsY.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/articles/new.astro.mjs');
const _page2 = () => import('./pages/admin/articles/_slug_/edit.astro.mjs');
const _page3 = () => import('./pages/admin/articles.astro.mjs');
const _page4 = () => import('./pages/admin/categories.astro.mjs');
const _page5 = () => import('./pages/admin/tags.astro.mjs');
const _page6 = () => import('./pages/admin.astro.mjs');
const _page7 = () => import('./pages/api/articles/_id_.astro.mjs');
const _page8 = () => import('./pages/api/articles.astro.mjs');
const _page9 = () => import('./pages/api/auth/login.astro.mjs');
const _page10 = () => import('./pages/api/auth/logout.astro.mjs');
const _page11 = () => import('./pages/api/auth/register.astro.mjs');
const _page12 = () => import('./pages/api/categories.astro.mjs');
const _page13 = () => import('./pages/api/comments/_articleid_.astro.mjs');
const _page14 = () => import('./pages/api/interactions/_slug_.astro.mjs');
const _page15 = () => import('./pages/api/tags.astro.mjs');
const _page16 = () => import('./pages/auth/login.astro.mjs');
const _page17 = () => import('./pages/auth/register.astro.mjs');
const _page18 = () => import('./pages/author/_username_.astro.mjs');
const _page19 = () => import('./pages/blog/_slug_.astro.mjs');
const _page20 = () => import('./pages/dashboard.astro.mjs');
const _page21 = () => import('./pages/rss.xml.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/admin/articles/new.astro", _page1],
    ["src/pages/admin/articles/[slug]/edit.astro", _page2],
    ["src/pages/admin/articles/index.astro", _page3],
    ["src/pages/admin/categories/index.astro", _page4],
    ["src/pages/admin/tags/index.astro", _page5],
    ["src/pages/admin/index.astro", _page6],
    ["src/pages/api/articles/[id].ts", _page7],
    ["src/pages/api/articles/index.ts", _page8],
    ["src/pages/api/auth/login.ts", _page9],
    ["src/pages/api/auth/logout.ts", _page10],
    ["src/pages/api/auth/register.ts", _page11],
    ["src/pages/api/categories/index.ts", _page12],
    ["src/pages/api/comments/[articleId].ts", _page13],
    ["src/pages/api/interactions/[slug].ts", _page14],
    ["src/pages/api/tags/index.ts", _page15],
    ["src/pages/auth/login.astro", _page16],
    ["src/pages/auth/register.astro", _page17],
    ["src/pages/author/[username].astro", _page18],
    ["src/pages/blog/[slug].astro", _page19],
    ["src/pages/dashboard/index.astro", _page20],
    ["src/pages/rss.xml.ts", _page21]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "1cd5b24b-f387-4d0f-8aa6-2cfbe5f6c780",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };

import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, o as defineScriptVars, m as maybeRenderHead } from '../../chunks/astro/server_7-zI95CH.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_BZwoteYL.mjs';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://boblog.vercel.app");
const prerender = false;
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  if (Astro2.locals.user) {
    return Astro2.redirect("/");
  }
  const redirect = Astro2.url.searchParams.get("redirect") || "/";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Masuk" }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", '<div class="min-h-[80vh] flex items-center justify-center px-4"> <div class="card w-full max-w-md bg-base-200 shadow-2xl"> <div class="card-body"> <div class="text-center mb-4"> <h1 class="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">\nMasuk\n</h1> <p class="text-sm opacity-60 mt-1">Selamat datang kembali di BoBlog</p> </div> <!-- Error Alert --> <div id="error-alert" class="alert alert-error hidden mb-4"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> <span id="error-message"></span> </div> <form id="login-form" class="space-y-4"> <div class="form-control"> <label class="label" for="email"> <span class="label-text">Email</span> </label> <input type="email" id="email" name="email" placeholder="nama@email.com" class="input input-bordered w-full" required> </div> <div class="form-control"> <label class="label" for="password"> <span class="label-text">Password</span> </label> <input type="password" id="password" name="password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" class="input input-bordered w-full" required> <label class="label"> <a href="/auth/forgot-password" class="label-text-alt link link-hover link-primary">\nLupa password?\n</a> </label> </div> <button type="submit" id="submit-btn" class="btn btn-primary w-full"> <span id="submit-text">Masuk</span> <span id="submit-loading" class="loading loading-spinner loading-sm hidden"></span> </button> </form> <div class="divider text-xs opacity-50">ATAU</div> <div class="space-y-2"> <a href="/api/auth/google" class="btn btn-outline w-full gap-2"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24"> <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"></path> <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path> <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"></path> <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path> </svg>\nMasuk dengan Google\n</a> <a href="/api/auth/github" class="btn btn-outline w-full gap-2"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"> <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path> </svg>\nMasuk dengan GitHub\n</a> </div> <p class="text-center text-sm mt-4">\nBelum punya akun?\n<a href="/auth/register" class="link link-primary font-semibold">Daftar sekarang</a> </p> </div> </div> </div> <script>(function(){', '\n    const form = document.getElementById("login-form");\n    const errorAlert = document.getElementById("error-alert");\n    const errorMessage = document.getElementById("error-message");\n    const submitBtn = document.getElementById("submit-btn");\n    const submitText = document.getElementById("submit-text");\n    const submitLoading = document.getElementById("submit-loading");\n\n    form?.addEventListener("submit", async (e) => {\n      e.preventDefault();\n      errorAlert?.classList.add("hidden");\n      submitBtn?.setAttribute("disabled", "true");\n      submitText?.classList.add("hidden");\n      submitLoading?.classList.remove("hidden");\n\n      const formData = new FormData(form);\n      const data = {\n        email: formData.get("email"),\n        password: formData.get("password"),\n      };\n\n      try {\n        const res = await fetch("/api/auth/login", {\n          method: "POST",\n          headers: { "Content-Type": "application/json" },\n          body: JSON.stringify(data),\n        });\n\n        const result = await res.json();\n\n        if (!res.ok) {\n          throw new Error(result.error || "Login gagal");\n        }\n\n        window.location.href = redirect;\n      } catch (err) {\n        errorAlert?.classList.remove("hidden");\n        if (errorMessage) errorMessage.textContent = err.message;\n        submitBtn?.removeAttribute("disabled");\n        submitText?.classList.remove("hidden");\n        submitLoading?.classList.add("hidden");\n      }\n    });\n  })();<\/script> '])), maybeRenderHead(), defineScriptVars({ redirect })) })}`;
}, "/home/boba/Projects/ngaduburit-bareng-astro/boblog/src/pages/auth/login.astro", void 0);

const $$file = "/home/boba/Projects/ngaduburit-bareng-astro/boblog/src/pages/auth/login.astro";
const $$url = "/auth/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

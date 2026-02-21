import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, p as Fragment, h as addAttribute, u as unescapeHTML, m as maybeRenderHead } from '../../chunks/astro/server_7-zI95CH.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_BZwoteYL.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { d as db } from '../../chunks/db_CcHuIs8X.mjs';
export { renderers } from '../../renderers.mjs';

function Interactions({
  articleSlug,
  initialLikes,
  initialBookmarks,
  isLoggedIn,
  userLikedInitially,
  userBookmarkedInitially
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [bookmarks, setBookmarks] = useState(initialBookmarks);
  const [liked, setLiked] = useState(userLikedInitially);
  const [bookmarked, setBookmarked] = useState(userBookmarkedInitially);
  const [loadingAction, setLoadingAction] = useState(null);
  const handleAction = async (action) => {
    if (!isLoggedIn) {
      alert("Silakan login terlebih dahulu.");
      window.location.href = "/auth/login";
      return;
    }
    if (loadingAction) return;
    setLoadingAction(action);
    if (action === "like") {
      setLiked(!liked);
      setLikes((prev) => liked ? prev - 1 : prev + 1);
    } else {
      setBookmarked(!bookmarked);
      setBookmarks((prev) => bookmarked ? prev - 1 : prev + 1);
    }
    try {
      const res = await fetch(`/api/interactions/${articleSlug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action })
      });
      if (!res.ok) {
        throw new Error("Gagal menyimpan interaksi");
      }
      const data = await res.json();
      if (action === "like" && data.liked !== void 0) {
        if (data.liked !== !liked) {
          setLiked(data.liked);
          setLikes(data.liked ? initialLikes + (userLikedInitially ? 0 : 1) : initialLikes - (userLikedInitially ? 1 : 0));
        }
      }
      if (action === "bookmark" && data.bookmarked !== void 0) {
        if (data.bookmarked !== !bookmarked) {
          setBookmarked(data.bookmarked);
          setBookmarks(data.bookmarked ? initialBookmarks + (userBookmarkedInitially ? 0 : 1) : initialBookmarks - (userBookmarkedInitially ? 1 : 0));
        }
      }
    } catch (err) {
      if (action === "like") {
        setLiked(liked);
        setLikes(likes);
      } else {
        setBookmarked(bookmarked);
        setBookmarks(bookmarks);
      }
      console.error(err);
      alert("Terjadi kesalahan, coba lagi nanti.");
    } finally {
      setLoadingAction(null);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => handleAction("like"),
        disabled: loadingAction === "like",
        className: `btn btn-circle ${liked ? "btn-primary shadow-lg shadow-primary/30" : "btn-outline border-base-300"}`,
        "aria-label": "Suka artikel ini",
        title: "Suka",
        children: [
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Like" }),
          /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: liked ? "currentColor" : "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm font-medium opacity-70", children: [
      likes,
      " suka"
    ] }),
    /* @__PURE__ */ jsx("div", { className: "divider divider-horizontal mx-0" }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => handleAction("bookmark"),
        disabled: loadingAction === "bookmark",
        className: `btn btn-circle ${bookmarked ? "btn-accent shadow-lg shadow-accent/30 text-white" : "btn-outline border-base-300"}`,
        "aria-label": "Simpan artikel ini",
        title: "Simpan",
        children: [
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Bookmark" }),
          /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: bookmarked ? "currentColor" : "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm font-medium opacity-70", children: [
      bookmarks,
      " disimpan"
    ] })
  ] });
}

function Comments({ articleId, isLoggedIn }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments/${articleId}`);
      const data = await res.json();
      if (data.data) {
        setComments(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchComments();
  }, [articleId]);
  const handleSubmit = async (e, parentId) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("Silakan login untuk berkomentar");
      return;
    }
    const text = parentId ? replyContent : content;
    if (text.length < 3) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/comments/${articleId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text, parentId })
      });
      if (res.ok) {
        if (parentId) {
          setReplyContent("");
          setReplyTo(null);
        } else {
          setContent("");
        }
        await fetchComments();
      } else {
        const err = await res.json();
        alert(err.error || "Gagal mengirim komentar");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "text-center py-8", children: /* @__PURE__ */ jsx("span", { className: "loading loading-spinner text-primary" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-bold mb-8", children: [
      "Komentar (",
      comments.reduce((acc, c) => acc + 1 + c.replies.length, 0),
      ")"
    ] }),
    isLoggedIn ? /* @__PURE__ */ jsxs("form", { onSubmit: (e) => handleSubmit(e, null), className: "bg-base-200 p-4 rounded-2xl border border-base-300 shadow-sm relative", children: [
      /* @__PURE__ */ jsx(
        "textarea",
        {
          value: content,
          onChange: (e) => setContent(e.target.value),
          placeholder: "Tulis pendapat Anda...",
          className: "textarea w-full bg-base-100 border-none focus:ring-0 text-base min-h-[100px] mb-2",
          disabled: submitting
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center px-2", children: [
        /* @__PURE__ */ jsxs("span", { className: "text-xs opacity-50", children: [
          content.length,
          " karakter"
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "btn btn-primary btn-sm px-6 rounded-full shadow-md shadow-primary/20",
            disabled: submitting || content.length < 3,
            children: submitting ? /* @__PURE__ */ jsx("span", { className: "loading loading-spinner loading-xs" }) : "Kirim"
          }
        )
      ] })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "bg-base-200/50 p-6 rounded-2xl text-center border-dashed border border-base-300", children: [
      /* @__PURE__ */ jsx("p", { className: "mb-4 opacity-70", children: "Bergabung dalam diskusi dengan meninggalkan komentar." }),
      /* @__PURE__ */ jsx("a", { href: "/auth/login", className: "btn btn-primary", children: "Login untuk Berkomentar" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-6 mt-8", children: comments.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-center opacity-50 py-4", children: "Belum ada komentar. Jadilah yang pertama!" }) : comments.map((comment) => /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "avatar shrink-0 self-start", children: /* @__PURE__ */ jsx("div", { className: "w-10 rounded-full bg-base-300", children: /* @__PURE__ */ jsx("img", { src: comment.author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.author.displayName)}`, alt: comment.author.displayName }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-base-200 rounded-2xl rounded-tl-none px-5 py-4 border border-base-300", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-baseline mb-2", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm", children: comment.author.displayName }),
            /* @__PURE__ */ jsx("span", { className: "text-xs opacity-50", children: formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: id }) })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm opacity-90 leading-relaxed break-words", children: comment.content })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "px-2", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setReplyTo(replyTo === comment.id ? null : comment.id),
            className: "text-xs font-semibold opacity-60 hover:opacity-100 hover:text-primary transition-colors",
            children: "Balas"
          }
        ) }),
        replyTo === comment.id && isLoggedIn && /* @__PURE__ */ jsxs("form", { onSubmit: (e) => handleSubmit(e, comment.id), className: "mt-2 flex gap-2 animate-fade-in pl-4 border-l-2 border-base-300", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: replyContent,
              onChange: (e) => setReplyContent(e.target.value),
              placeholder: "Tulis balasan...",
              className: "input input-sm input-bordered flex-1 rounded-full bg-base-100",
              autoFocus: true
            }
          ),
          /* @__PURE__ */ jsx("button", { type: "submit", disabled: submitting || replyContent.length < 3, className: "btn btn-sm btn-primary rounded-full px-4", children: "Kirim" }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setReplyTo(null), className: "btn btn-sm btn-ghost rounded-full", children: "Batal" })
        ] }),
        comment.replies.length > 0 && /* @__PURE__ */ jsx("div", { className: "space-y-4 mt-3", children: comment.replies.map((reply) => /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "avatar shrink-0 self-start", children: /* @__PURE__ */ jsx("div", { className: "w-8 rounded-full bg-base-300", children: /* @__PURE__ */ jsx("img", { src: reply.author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(reply.author.displayName)}`, alt: reply.author.displayName }) }) }),
          /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxs("div", { className: "bg-base-200/60 rounded-2xl rounded-tl-none px-4 py-3 text-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-baseline mb-1", children: [
              /* @__PURE__ */ jsx("h5", { className: "font-bold text-xs", children: reply.author.displayName }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] opacity-50", children: formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true, locale: id }) })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "opacity-90", children: reply.content })
          ] }) })
        ] }, reply.id)) })
      ] })
    ] }, comment.id)) })
  ] });
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://boblog.vercel.app");
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  if (!slug) {
    return Astro2.redirect("/blog");
  }
  const user = Astro2.locals.user;
  const article = await db.article.findUnique({
    where: { slug, status: "PUBLISHED" },
    include: {
      author: { select: { displayName: true, username: true, avatar: true, bio: true } },
      category: { select: { name: true, slug: true, color: true } },
      tags: {
        include: {
          tag: { select: { name: true, slug: true } }
        }
      },
      _count: { select: { likes: true, bookmarks: true } }
    }
  });
  if (!article) {
    return Astro2.redirect("/404");
  }
  let userLikedInitially = false;
  let userBookmarkedInitially = false;
  if (user) {
    const [like, bookmark] = await Promise.all([
      db.like.findUnique({ where: { userId_articleId: { userId: user.id, articleId: article.id } } }),
      db.bookmark.findUnique({
        where: { userId_articleId: { userId: user.id, articleId: article.id } }
      })
    ]);
    userLikedInitially = !!like;
    userBookmarkedInitially = !!bookmark;
  }
  db.article.update({
    where: { id: article.id },
    data: { viewCount: { increment: 1 } }
  }).catch(console.error);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    image: article.thumbnail || article.ogImage || [],
    datePublished: article.publishedAt?.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    author: [
      {
        "@type": "Person",
        name: article.author.displayName,
        url: `/author/${article.author.username}`
      }
    ]
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": article.metaTitle || article.title, "description": article.metaDesc || article.excerpt, "image": article.ogImage || article.thumbnail || void 0 }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<article class="max-w-4xl mx-auto px-4 py-8 md:py-12"> <!-- Breadcrumbs --> <div class="text-sm breadcrumbs mb-6 hidden md:block"> <ul> <li><a href="/">Home</a></li> <li><a href="/blog">Blog</a></li> ${article.category && renderTemplate`<li> <a${addAttribute(`/blog?category=${article.category.slug}`, "href")}>${article.category.name}</a> </li>`} <li class="opacity-60 max-w-xs truncate">${article.title}</li> </ul> </div> <!-- Article Header --> <header class="mb-10 text-center animate-slide-up"> ${article.category && renderTemplate`<a${addAttribute(`/blog?category=${article.category.slug}`, "href")} class="badge badge-lg font-bold mb-6 border-none text-white shadow-md hover:scale-105 transition-transform"${addAttribute(`background-color: ${article.category.color || "var(--p)"};`, "style")}> ${article.category.name} </a>`} <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight text-balance"> ${article.title} </h1> <p class="text-xl md:text-2xl opacity-70 mb-8 max-w-3xl mx-auto text-balance"> ${article.excerpt} </p> <div class="flex flex-wrap items-center justify-center gap-6 opacity-80 border-y border-base-200 py-4"> <a${addAttribute(`/author/${article.author.username}`, "href")} class="flex items-center gap-3 hover:text-primary transition-colors"> <div class="avatar"> <div class="w-10 rounded-full bg-base-300"> <img${addAttribute(article.author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(article.author.displayName)}&size=80`, "src")}${addAttribute(article.author.displayName, "alt")}> </div> </div> <div class="text-left"> <div class="font-bold text-sm leading-tight">${article.author.displayName}</div> <div class="text-xs opacity-70">Author</div> </div> </a> <div class="divider divider-horizontal hidden sm:flex mx-0"></div> <div class="flex items-center gap-2 text-sm"> <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path> </svg> <time${addAttribute(article.publishedAt?.toISOString(), "datetime")}> ${new Date(article.publishedAt || article.createdAt).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })} </time> </div> <div class="flex items-center gap-2 text-sm"> <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path> </svg> ${article.readingTime} mnt baca
</div> <div class="flex items-center gap-2 text-sm"> <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path> </svg> ${article.viewCount} views
</div> </div> </header> <!-- Thumbnail --> ${article.thumbnail && renderTemplate`<div class="mb-12 rounded-3xl overflow-hidden shadow-2xl animate-fade-in relative group aspect-[21/9]"> <img${addAttribute(article.thumbnail, "src")}${addAttribute(article.title, "alt")} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"> </div>`} <!-- Main Content & Sidebar --> <div class="flex flex-col lg:flex-row gap-12"> <!-- Article Content --> <div class="lg:w-2/3">  <div class="prose prose-lg md:prose-xl max-w-none prose-img:rounded-2xl prose-img:shadow-lg prose-headings:font-bold prose-a:text-primary mb-12"> ${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate`${unescapeHTML(article.content)}` })} </div> <!-- Tags & Interactions --> <div class="mt-12 pt-6 border-t border-base-200"> <div class="flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center"> ${article.tags.length > 0 ? renderTemplate`<div class="flex flex-wrap gap-2 items-center"> <span class="text-sm font-bold mr-2">Tags:</span> ${article.tags.map(({ tag }) => renderTemplate`<a${addAttribute(`/blog?tag=${tag.slug}`, "href")} class="badge badge-lg badge-outline hover:badge-primary transition-colors">
#${tag.name} </a>`)} </div>` : renderTemplate`<div></div>`} ${renderComponent($$result2, "Interactions", Interactions, { "client:load": true, "articleSlug": article.slug, "initialLikes": article._count.likes, "initialBookmarks": article._count.bookmarks, "isLoggedIn": !!user, "userLikedInitially": userLikedInitially, "userBookmarkedInitially": userBookmarkedInitially, "client:component-hydration": "load", "client:component-path": "@/components/blog/Interactions", "client:component-export": "default" })} </div> </div> <!-- Author Bio Box --> <div class="mt-12 bg-base-200 p-8 rounded-3xl flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left"> <div class="avatar"> <div class="w-24 rounded-full shadow-lg ring ring-primary ring-offset-base-100 ring-offset-2"> <img${addAttribute(article.author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(article.author.displayName)}&size=100`, "src")}${addAttribute(article.author.displayName, "alt")}> </div> </div> <div> <h3 class="text-2xl font-bold mb-2">Ditulis oleh ${article.author.displayName}</h3> <p class="opacity-70 mb-4"> ${article.author.bio || "Seorang penulis yang gemar berbagi wawasan baru tentang teknologi dan pemrograman."} </p> <a${addAttribute(`/author/${article.author.username}`, "href")} class="btn btn-outline btn-sm rounded-full">Lihat semua artikel</a> </div> </div> </div> <!-- Sticky Sidebar --> <aside class="lg:w-1/3 space-y-8"> <div class="sticky top-24 space-y-8"> <!-- Share Box --> <div class="card bg-base-100 border border-base-200 shadow-sm"> <div class="card-body p-6"> <h3 class="font-bold text-lg mb-4">Bagikan Artikel</h3> <div class="flex gap-2"> <a${addAttribute(`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://boblog.vercel.app/blog/${article.slug}`)}`, "href")} target="_blank" rel="noopener noreferrer" class="btn btn-square btn-outline hover:bg-black hover:text-white">
𝕏
</a> <a${addAttribute(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://boblog.vercel.app/blog/${article.slug}`)}`, "href")} target="_blank" rel="noopener noreferrer" class="btn btn-square btn-outline hover:bg-[#1877F2] hover:text-white border-transparent">
f
</a> <a${addAttribute(`https://wa.me/?text=${encodeURIComponent(`${article.title} - https://boblog.vercel.app/blog/${article.slug}`)}`, "href")} target="_blank" rel="noopener noreferrer" class="btn btn-square btn-outline hover:bg-[#25D366] hover:text-white border-transparent">
Wa
</a> <button class="btn btn-square btn-outline"${addAttribute(`navigator.clipboard.writeText(window.location.href); alert('Tautan disalin ke clipboard!');`, "onclick")}>
🔗
</button> </div> </div> </div> <!-- Newsletter Widget --> <div class="card bg-primary text-primary-content shadow-lg"> <div class="card-body p-6"> <h3 class="card-title text-xl mb-2">Boba Newsletter 📬</h3> <p class="text-sm opacity-90 mb-4">
Dapatkan update artikel terbaru langsung di email Anda setiap minggu.
</p> <form class="flex flex-col gap-2"> <input type="email" placeholder="Email Anda" class="input input-sm text-base-content w-full" required> <button class="btn btn-sm btn-neutral w-full">Subscribe</button> </form> </div> </div> </div> </aside> </div> <!-- Comments Section --> <div class="mt-16 border-t border-base-200 pt-16 max-w-3xl" id="comments"> ${renderComponent($$result2, "Comments", Comments, { "client:load": true, "articleId": article.id, "isLoggedIn": !!user, "client:component-hydration": "load", "client:component-path": "@/components/blog/Comments", "client:component-export": "default" })} </div> </article> `, "head": async ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "head" }, { "default": async ($$result3) => renderTemplate(_a || (_a = __template([' <script type="application/ld+json">', "<\/script> ", ""])), unescapeHTML(JSON.stringify(jsonLd)), article.canonicalUrl && renderTemplate`<link rel="canonical"${addAttribute(article.canonicalUrl, "href")}>`) })}` })}`;
}, "/home/boba/Projects/ngaduburit-bareng-astro/boblog/src/pages/blog/[slug].astro", void 0);

const $$file = "/home/boba/Projects/ngaduburit-bareng-astro/boblog/src/pages/blog/[slug].astro";
const $$url = "/blog/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$slug,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

import { jsxs, jsx } from 'react/jsx-runtime';
import { useCallback, useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { Youtube } from '@tiptap/extension-youtube';

const MenuButton = ({
  onClick,
  isActive = false,
  disabled = false,
  title,
  children
}) => /* @__PURE__ */ jsx(
  "button",
  {
    type: "button",
    onClick,
    disabled,
    title,
    className: `btn btn-xs btn-ghost ${isActive ? "btn-active bg-primary/20 text-primary" : ""}`,
    children
  }
);
function TipTapEditor({
  content = "",
  onChange,
  placeholder = "Mulai menulis artikelmu..."
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] }
      }),
      Image.configure({ inline: false, allowBase64: true }),
      Link.configure({ openOnClick: false, autolink: true }),
      Placeholder.configure({ placeholder }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      Youtube.configure({ width: 640, height: 360 })
    ],
    content,
    onUpdate: ({ editor: editor2 }) => {
      onChange?.(editor2.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-lg max-w-none min-h-[400px] p-4 focus:outline-none"
      }
    }
  });
  const addImage = useCallback(() => {
    const url = window.prompt("URL Gambar:");
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);
  const addLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL Link:", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);
  const addYoutube = useCallback(() => {
    const url = window.prompt("URL Video YouTube:");
    if (url && editor) {
      editor.chain().focus().setYoutubeVideo({ src: url }).run();
    }
  }, [editor]);
  const addTable = useCallback(() => {
    if (editor) {
      editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
    }
  }, [editor]);
  if (!editor) return null;
  return /* @__PURE__ */ jsxs("div", { className: "border border-base-300 rounded-xl overflow-hidden bg-base-100", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1 p-2 bg-base-200 border-b border-base-300 sticky top-0 z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-0.5 border-r border-base-300 pr-2 mr-1", children: [
        /* @__PURE__ */ jsx(
          MenuButton,
          {
            onClick: () => editor.chain().focus().toggleBold().run(),
            isActive: editor.isActive("bold"),
            title: "Bold",
            children: /* @__PURE__ */ jsx("strong", { children: "B" })
          }
        ),
        /* @__PURE__ */ jsx(
          MenuButton,
          {
            onClick: () => editor.chain().focus().toggleItalic().run(),
            isActive: editor.isActive("italic"),
            title: "Italic",
            children: /* @__PURE__ */ jsx("em", { children: "I" })
          }
        ),
        /* @__PURE__ */ jsx(
          MenuButton,
          {
            onClick: () => editor.chain().focus().toggleUnderline().run(),
            isActive: editor.isActive("underline"),
            title: "Underline",
            children: /* @__PURE__ */ jsx("u", { children: "U" })
          }
        ),
        /* @__PURE__ */ jsx(
          MenuButton,
          {
            onClick: () => editor.chain().focus().toggleStrike().run(),
            isActive: editor.isActive("strike"),
            title: "Strikethrough",
            children: /* @__PURE__ */ jsx("s", { children: "S" })
          }
        ),
        /* @__PURE__ */ jsx(
          MenuButton,
          {
            onClick: () => editor.chain().focus().toggleCode().run(),
            isActive: editor.isActive("code"),
            title: "Inline Code",
            children: "</>"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-0.5 border-r border-base-300 pr-2 mr-1", children: [
        /* @__PURE__ */ jsx(
          MenuButton,
          {
            onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            isActive: editor.isActive("heading", { level: 2 }),
            title: "Heading 2",
            children: "H2"
          }
        ),
        /* @__PURE__ */ jsx(
          MenuButton,
          {
            onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            isActive: editor.isActive("heading", { level: 3 }),
            title: "Heading 3",
            children: "H3"
          }
        ),
        /* @__PURE__ */ jsx(
          MenuButton,
          {
            onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
            isActive: editor.isActive("heading", { level: 4 }),
            title: "Heading 4",
            children: "H4"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-0.5 border-r border-base-300 pr-2 mr-1", children: [
        /* @__PURE__ */ jsx(
          MenuButton,
          {
            onClick: () => editor.chain().focus().setTextAlign("left").run(),
            isActive: editor.isActive({ textAlign: "left" }),
            title: "Rata Kiri",
            children: "≡"
          }
        ),
        /* @__PURE__ */ jsx(
          MenuButton,
          {
            onClick: () => editor.chain().focus().setTextAlign("center").run(),
            isActive: editor.isActive({ textAlign: "center" }),
            title: "Rata Tengah",
            children: "≡"
          }
        ),
        /* @__PURE__ */ jsx(
          MenuButton,
          {
            onClick: () => editor.chain().focus().setTextAlign("right").run(),
            isActive: editor.isActive({ textAlign: "right" }),
            title: "Rata Kanan",
            children: "≡"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-0.5 border-r border-base-300 pr-2 mr-1", children: [
        /* @__PURE__ */ jsx(
          MenuButton,
          {
            onClick: () => editor.chain().focus().toggleBulletList().run(),
            isActive: editor.isActive("bulletList"),
            title: "Bullet List",
            children: "•"
          }
        ),
        /* @__PURE__ */ jsx(
          MenuButton,
          {
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
            isActive: editor.isActive("orderedList"),
            title: "Numbered List",
            children: "1."
          }
        ),
        /* @__PURE__ */ jsx(
          MenuButton,
          {
            onClick: () => editor.chain().focus().toggleBlockquote().run(),
            isActive: editor.isActive("blockquote"),
            title: "Blockquote",
            children: "❝"
          }
        ),
        /* @__PURE__ */ jsx(
          MenuButton,
          {
            onClick: () => editor.chain().focus().toggleCodeBlock().run(),
            isActive: editor.isActive("codeBlock"),
            title: "Code Block",
            children: "{ }"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-0.5 border-r border-base-300 pr-2 mr-1", children: [
        /* @__PURE__ */ jsx(MenuButton, { onClick: addImage, title: "Sisipkan Gambar", children: "🖼️" }),
        /* @__PURE__ */ jsx(MenuButton, { onClick: addLink, isActive: editor.isActive("link"), title: "Sisipkan Link", children: "🔗" }),
        /* @__PURE__ */ jsx(MenuButton, { onClick: addYoutube, title: "Sisipkan Video YouTube", children: "▶️" }),
        /* @__PURE__ */ jsx(MenuButton, { onClick: addTable, title: "Sisipkan Tabel", children: "📊" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-0.5", children: [
        /* @__PURE__ */ jsx(
          MenuButton,
          {
            onClick: () => editor.chain().focus().setHorizontalRule().run(),
            title: "Garis Horizontal",
            children: "―"
          }
        ),
        /* @__PURE__ */ jsx(
          MenuButton,
          {
            onClick: () => editor.chain().focus().undo().run(),
            disabled: !editor.can().undo(),
            title: "Undo",
            children: "↩"
          }
        ),
        /* @__PURE__ */ jsx(
          MenuButton,
          {
            onClick: () => editor.chain().focus().redo().run(),
            disabled: !editor.can().redo(),
            title: "Redo",
            children: "↪"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(EditorContent, { editor }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center px-4 py-2 bg-base-200 border-t border-base-300 text-xs opacity-60", children: [
      /* @__PURE__ */ jsxs("span", { children: [
        editor.storage.characterCount?.characters?.() ?? editor.getText().length,
        " karakter"
      ] }),
      /* @__PURE__ */ jsxs("span", { children: [
        editor.getText().split(/\s+/).filter(Boolean).length,
        " kata"
      ] })
    ] })
  ] });
}

function slugify(text) {
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
function ArticleForm({ article, categories, tags }) {
  const isEdit = !!article;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showSEO, setShowSEO] = useState(false);
  const [formData, setFormData] = useState({
    title: article?.title || "",
    slug: article?.slug || "",
    content: article?.content || "",
    excerpt: article?.excerpt || "",
    thumbnail: article?.thumbnail || "",
    status: article?.status || "DRAFT",
    categoryId: article?.categoryId || "",
    tagIds: article?.tagIds || [],
    metaTitle: article?.metaTitle || "",
    metaDesc: article?.metaDesc || "",
    ogImage: article?.ogImage || "",
    canonicalUrl: article?.canonicalUrl || "",
    scheduledAt: article?.scheduledAt || ""
  });
  const [autoSlug, setAutoSlug] = useState(!isEdit);
  useEffect(() => {
    if (autoSlug && formData.title) {
      setFormData((prev) => ({ ...prev, slug: slugify(prev.title) }));
    }
  }, [formData.title, autoSlug]);
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleTagToggle = (tagId) => {
    setFormData((prev) => ({
      ...prev,
      tagIds: prev.tagIds.includes(tagId) ? prev.tagIds.filter((id) => id !== tagId) : [...prev.tagIds, tagId]
    }));
  };
  const handleSubmit = async (status) => {
    setLoading(true);
    setError("");
    setSuccess("");
    const payload = {
      ...formData,
      status: status || formData.status
    };
    try {
      const url = isEdit ? `/api/articles/${article.id}` : "/api/articles";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gagal menyimpan artikel");
      setSuccess(isEdit ? "Artikel berhasil diperbarui!" : "Artikel berhasil dibuat!");
      if (!isEdit && result.data?.slug) {
        setTimeout(() => {
          window.location.href = `/admin/articles/${result.data.slug}/edit`;
        }, 1e3);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
      error && /* @__PURE__ */ jsx("div", { className: "alert alert-error", children: /* @__PURE__ */ jsx("span", { children: error }) }),
      success && /* @__PURE__ */ jsx("div", { className: "alert alert-success", children: /* @__PURE__ */ jsx("span", { children: success }) }),
      /* @__PURE__ */ jsx("div", { className: "form-control", children: /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          value: formData.title,
          onChange: (e) => handleChange("title", e.target.value),
          placeholder: "Judul Artikel",
          className: "input input-bordered input-lg w-full text-2xl font-bold"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
        /* @__PURE__ */ jsxs("label", { className: "label", children: [
          /* @__PURE__ */ jsx("span", { className: "label-text text-sm opacity-60", children: "Slug (URL)" }),
          /* @__PURE__ */ jsxs("label", { className: "label cursor-pointer gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "label-text text-xs", children: "Auto" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                className: "toggle toggle-xs toggle-primary",
                checked: autoSlug,
                onChange: () => setAutoSlug(!autoSlug)
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: formData.slug,
            onChange: (e) => {
              setAutoSlug(false);
              handleChange("slug", e.target.value);
            },
            placeholder: "judul-artikel",
            className: "input input-bordered input-sm w-full font-mono text-sm"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "label", children: /* @__PURE__ */ jsx("span", { className: "label-text", children: "Konten Artikel" }) }),
        /* @__PURE__ */ jsx(
          TipTapEditor,
          {
            content: formData.content,
            onChange: (html) => handleChange("content", html)
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
        /* @__PURE__ */ jsxs("label", { className: "label", children: [
          /* @__PURE__ */ jsx("span", { className: "label-text", children: "Ringkasan" }),
          /* @__PURE__ */ jsxs("span", { className: "label-text-alt", children: [
            formData.excerpt.length,
            "/500"
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            value: formData.excerpt,
            onChange: (e) => handleChange("excerpt", e.target.value),
            placeholder: "Tulis ringkasan singkat artikel...",
            className: "textarea textarea-bordered h-24",
            maxLength: 500
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "collapse collapse-arrow bg-base-200 border border-base-300", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            checked: showSEO,
            onChange: () => setShowSEO(!showSEO)
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "collapse-title font-medium", children: "🔍 Pengaturan SEO" }),
        /* @__PURE__ */ jsxs("div", { className: "collapse-content space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
            /* @__PURE__ */ jsxs("label", { className: "label", children: [
              /* @__PURE__ */ jsx("span", { className: "label-text", children: "Meta Title" }),
              /* @__PURE__ */ jsxs("span", { className: "label-text-alt", children: [
                formData.metaTitle.length,
                "/70"
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: formData.metaTitle,
                onChange: (e) => handleChange("metaTitle", e.target.value),
                placeholder: formData.title || "Judul untuk mesin pencari",
                className: "input input-bordered input-sm",
                maxLength: 70
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
            /* @__PURE__ */ jsxs("label", { className: "label", children: [
              /* @__PURE__ */ jsx("span", { className: "label-text", children: "Meta Description" }),
              /* @__PURE__ */ jsxs("span", { className: "label-text-alt", children: [
                formData.metaDesc.length,
                "/160"
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                value: formData.metaDesc,
                onChange: (e) => handleChange("metaDesc", e.target.value),
                placeholder: formData.excerpt || "Deskripsi untuk mesin pencari",
                className: "textarea textarea-bordered textarea-sm h-20",
                maxLength: 160
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
            /* @__PURE__ */ jsx("label", { className: "label", children: /* @__PURE__ */ jsx("span", { className: "label-text", children: "OG Image URL" }) }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "url",
                value: formData.ogImage,
                onChange: (e) => handleChange("ogImage", e.target.value),
                placeholder: "https://...",
                className: "input input-bordered input-sm"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
            /* @__PURE__ */ jsx("label", { className: "label", children: /* @__PURE__ */ jsx("span", { className: "label-text", children: "Canonical URL" }) }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "url",
                value: formData.canonicalUrl,
                onChange: (e) => handleChange("canonicalUrl", e.target.value),
                placeholder: "https://...",
                className: "input input-bordered input-sm"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs opacity-50 mb-2", children: "Preview di Google:" }),
            /* @__PURE__ */ jsxs("div", { className: "bg-base-100 p-3 rounded-lg border border-base-300", children: [
              /* @__PURE__ */ jsxs("p", { className: "text-primary text-sm truncate", children: [
                formData.metaTitle || formData.title || "Judul Artikel",
                " | BoBlog"
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-success truncate", children: [
                "boblog.vercel.app/blog/",
                formData.slug || "judul-artikel"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs opacity-60 line-clamp-2", children: formData.metaDesc || formData.excerpt || "Deskripsi artikel akan muncul di sini..." })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx("div", { className: "card bg-base-200 shadow", children: /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
        /* @__PURE__ */ jsx("h3", { className: "card-title text-sm", children: "Publikasi" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs opacity-60", children: "Status:" }),
          /* @__PURE__ */ jsx(
            "span",
            {
              className: `badge badge-sm ${formData.status === "PUBLISHED" ? "badge-success" : formData.status === "SCHEDULED" ? "badge-warning" : formData.status === "ARCHIVED" ? "badge-error" : "badge-ghost"}`,
              children: formData.status
            }
          )
        ] }),
        formData.status === "SCHEDULED" && /* @__PURE__ */ jsxs("div", { className: "form-control mb-2", children: [
          /* @__PURE__ */ jsx("label", { className: "label", children: /* @__PURE__ */ jsx("span", { className: "label-text text-xs", children: "Jadwal Publish" }) }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "datetime-local",
              value: formData.scheduledAt,
              onChange: (e) => handleChange("scheduledAt", e.target.value),
              className: "input input-bordered input-sm"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => handleSubmit("DRAFT"),
              className: "btn btn-ghost btn-sm",
              disabled: loading,
              children: "💾 Simpan Draft"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => handleSubmit("SCHEDULED"),
              className: "btn btn-warning btn-sm",
              disabled: loading,
              children: "📅 Jadwalkan"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => handleSubmit("PUBLISHED"),
              className: "btn btn-primary btn-sm",
              disabled: loading,
              children: loading ? /* @__PURE__ */ jsx("span", { className: "loading loading-spinner loading-xs" }) : "🚀 Publish"
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "card bg-base-200 shadow", children: /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
        /* @__PURE__ */ jsx("h3", { className: "card-title text-sm", children: "Thumbnail" }),
        /* @__PURE__ */ jsx("div", { className: "form-control", children: /* @__PURE__ */ jsx(
          "input",
          {
            type: "url",
            value: formData.thumbnail,
            onChange: (e) => handleChange("thumbnail", e.target.value),
            placeholder: "URL gambar thumbnail",
            className: "input input-bordered input-sm"
          }
        ) }),
        formData.thumbnail && /* @__PURE__ */ jsx(
          "img",
          {
            src: formData.thumbnail,
            alt: "Thumbnail preview",
            className: "rounded-lg mt-2 w-full h-40 object-cover"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "card bg-base-200 shadow", children: /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
        /* @__PURE__ */ jsx("h3", { className: "card-title text-sm", children: "Kategori" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: formData.categoryId,
            onChange: (e) => handleChange("categoryId", e.target.value),
            className: "select select-bordered select-sm w-full",
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Pilih Kategori" }),
              categories.map((cat) => /* @__PURE__ */ jsx("option", { value: cat.id, children: cat.name }, cat.id))
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "card bg-base-200 shadow", children: /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
        /* @__PURE__ */ jsx("h3", { className: "card-title text-sm", children: "Tag" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
          tags.map((tag) => /* @__PURE__ */ jsxs("label", { className: "cursor-pointer", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: formData.tagIds.includes(tag.id),
                onChange: () => handleTagToggle(tag.id),
                className: "hidden"
              }
            ),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: `badge badge-sm cursor-pointer transition-colors ${formData.tagIds.includes(tag.id) ? "badge-primary" : "badge-outline"}`,
                children: tag.name
              }
            )
          ] }, tag.id)),
          tags.length === 0 && /* @__PURE__ */ jsx("span", { className: "text-xs opacity-50", children: "Belum ada tag" })
        ] })
      ] }) })
    ] })
  ] });
}

export { ArticleForm as A };

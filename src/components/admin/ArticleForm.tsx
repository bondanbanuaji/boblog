import { useState, useEffect } from "react";
import TipTapEditor from "./TipTapEditor";

interface ArticleFormProps {
    article?: {
        id: string;
        title: string;
        slug: string;
        content: string;
        excerpt: string;
        thumbnail: string;
        status: string;
        categoryId: string;
        tagIds: string[];
        metaTitle: string;
        metaDesc: string;
        ogImage: string;
        canonicalUrl: string;
        scheduledAt: string;
    };
    categories: { id: string; name: string; slug: string }[];
    tags: { id: string; name: string; slug: string }[];
}

function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export default function ArticleForm({ article, categories, tags }: ArticleFormProps) {
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
        scheduledAt: article?.scheduledAt || "",
    });

    // Auto-generate slug from title
    const [autoSlug, setAutoSlug] = useState(!isEdit);
    useEffect(() => {
        if (autoSlug && formData.title) {
            setFormData((prev) => ({ ...prev, slug: slugify(prev.title) }));
        }
    }, [formData.title, autoSlug]);

    const handleChange = (field: string, value: string | string[]) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleTagToggle = (tagId: string) => {
        setFormData((prev) => ({
            ...prev,
            tagIds: prev.tagIds.includes(tagId)
                ? prev.tagIds.filter((id) => id !== tagId)
                : [...prev.tagIds, tagId],
        }));
    };

    const handleSubmit = async (status?: string) => {
        setLoading(true);
        setError("");
        setSuccess("");

        const payload = {
            ...formData,
            status: status || formData.status,
        };

        try {
            const url = isEdit ? `/api/articles/${article.id}` : "/api/articles";
            const method = isEdit ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.error || "Gagal menyimpan artikel");

            setSuccess(isEdit ? "Artikel berhasil diperbarui!" : "Artikel berhasil dibuat!");

            if (!isEdit && result.data?.slug) {
                setTimeout(() => {
                    window.location.href = `/admin/articles/${result.data.slug}/edit`;
                }, 1000);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
                {/* Alerts */}
                {error && (
                    <div className="alert alert-error">
                        <span>{error}</span>
                    </div>
                )}
                {success && (
                    <div className="alert alert-success">
                        <span>{success}</span>
                    </div>
                )}

                {/* Title */}
                <div className="form-control">
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        placeholder="Judul Artikel"
                        className="input input-bordered input-lg w-full text-2xl font-bold"
                    />
                </div>

                {/* Slug */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-sm opacity-60">Slug (URL)</span>
                        <label className="label cursor-pointer gap-2">
                            <span className="label-text text-xs">Auto</span>
                            <input
                                type="checkbox"
                                className="toggle toggle-xs toggle-primary"
                                checked={autoSlug}
                                onChange={() => setAutoSlug(!autoSlug)}
                            />
                        </label>
                    </label>
                    <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => {
                            setAutoSlug(false);
                            handleChange("slug", e.target.value);
                        }}
                        placeholder="judul-artikel"
                        className="input input-bordered input-sm w-full font-mono text-sm"
                    />
                </div>

                {/* Editor */}
                <div>
                    <label className="label">
                        <span className="label-text">Konten Artikel</span>
                    </label>
                    <TipTapEditor
                        content={formData.content}
                        onChange={(html) => handleChange("content", html)}
                    />
                </div>

                {/* Excerpt */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Ringkasan</span>
                        <span className="label-text-alt">{formData.excerpt.length}/500</span>
                    </label>
                    <textarea
                        value={formData.excerpt}
                        onChange={(e) => handleChange("excerpt", e.target.value)}
                        placeholder="Tulis ringkasan singkat artikel..."
                        className="textarea textarea-bordered h-24"
                        maxLength={500}
                    />
                </div>

                {/* SEO Panel */}
                <div className="collapse collapse-arrow bg-base-200 border border-base-300">
                    <input
                        type="checkbox"
                        checked={showSEO}
                        onChange={() => setShowSEO(!showSEO)}
                    />
                    <div className="collapse-title font-medium">
                        🔍 Pengaturan SEO
                    </div>
                    <div className="collapse-content space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Meta Title</span>
                                <span className="label-text-alt">{formData.metaTitle.length}/70</span>
                            </label>
                            <input
                                type="text"
                                value={formData.metaTitle}
                                onChange={(e) => handleChange("metaTitle", e.target.value)}
                                placeholder={formData.title || "Judul untuk mesin pencari"}
                                className="input input-bordered input-sm"
                                maxLength={70}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Meta Description</span>
                                <span className="label-text-alt">{formData.metaDesc.length}/160</span>
                            </label>
                            <textarea
                                value={formData.metaDesc}
                                onChange={(e) => handleChange("metaDesc", e.target.value)}
                                placeholder={formData.excerpt || "Deskripsi untuk mesin pencari"}
                                className="textarea textarea-bordered textarea-sm h-20"
                                maxLength={160}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">OG Image URL</span>
                            </label>
                            <input
                                type="url"
                                value={formData.ogImage}
                                onChange={(e) => handleChange("ogImage", e.target.value)}
                                placeholder="https://..."
                                className="input input-bordered input-sm"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Canonical URL</span>
                            </label>
                            <input
                                type="url"
                                value={formData.canonicalUrl}
                                onChange={(e) => handleChange("canonicalUrl", e.target.value)}
                                placeholder="https://..."
                                className="input input-bordered input-sm"
                            />
                        </div>

                        {/* SEO Preview */}
                        <div className="mt-4">
                            <p className="text-xs opacity-50 mb-2">Preview di Google:</p>
                            <div className="bg-base-100 p-3 rounded-lg border border-base-300">
                                <p className="text-primary text-sm truncate">
                                    {formData.metaTitle || formData.title || "Judul Artikel"} | BoBlog
                                </p>
                                <p className="text-xs text-success truncate">
                                    boblog.vercel.app/blog/{formData.slug || "judul-artikel"}
                                </p>
                                <p className="text-xs opacity-60 line-clamp-2">
                                    {formData.metaDesc || formData.excerpt || "Deskripsi artikel akan muncul di sini..."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
                {/* Publish Card */}
                <div className="card bg-base-200 shadow">
                    <div className="card-body">
                        <h3 className="card-title text-sm">Publikasi</h3>

                        {/* Status Badge */}
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs opacity-60">Status:</span>
                            <span
                                className={`badge badge-sm ${formData.status === "PUBLISHED"
                                        ? "badge-success"
                                        : formData.status === "SCHEDULED"
                                            ? "badge-warning"
                                            : formData.status === "ARCHIVED"
                                                ? "badge-error"
                                                : "badge-ghost"
                                    }`}
                            >
                                {formData.status}
                            </span>
                        </div>

                        {/* Schedule */}
                        {formData.status === "SCHEDULED" && (
                            <div className="form-control mb-2">
                                <label className="label">
                                    <span className="label-text text-xs">Jadwal Publish</span>
                                </label>
                                <input
                                    type="datetime-local"
                                    value={formData.scheduledAt}
                                    onChange={(e) => handleChange("scheduledAt", e.target.value)}
                                    className="input input-bordered input-sm"
                                />
                            </div>
                        )}

                        <div className="flex flex-col gap-2">
                            <button
                                type="button"
                                onClick={() => handleSubmit("DRAFT")}
                                className="btn btn-ghost btn-sm"
                                disabled={loading}
                            >
                                💾 Simpan Draft
                            </button>
                            <button
                                type="button"
                                onClick={() => handleSubmit("SCHEDULED")}
                                className="btn btn-warning btn-sm"
                                disabled={loading}
                            >
                                📅 Jadwalkan
                            </button>
                            <button
                                type="button"
                                onClick={() => handleSubmit("PUBLISHED")}
                                className="btn btn-primary btn-sm"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="loading loading-spinner loading-xs"></span>
                                ) : (
                                    "🚀 Publish"
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Thumbnail */}
                <div className="card bg-base-200 shadow">
                    <div className="card-body">
                        <h3 className="card-title text-sm">Thumbnail</h3>
                        <div className="form-control">
                            <input
                                type="url"
                                value={formData.thumbnail}
                                onChange={(e) => handleChange("thumbnail", e.target.value)}
                                placeholder="URL gambar thumbnail"
                                className="input input-bordered input-sm"
                            />
                        </div>
                        {formData.thumbnail && (
                            <img
                                src={formData.thumbnail}
                                alt="Thumbnail preview"
                                className="rounded-lg mt-2 w-full h-40 object-cover"
                            />
                        )}
                    </div>
                </div>

                {/* Category */}
                <div className="card bg-base-200 shadow">
                    <div className="card-body">
                        <h3 className="card-title text-sm">Kategori</h3>
                        <select
                            value={formData.categoryId}
                            onChange={(e) => handleChange("categoryId", e.target.value)}
                            className="select select-bordered select-sm w-full"
                        >
                            <option value="">Pilih Kategori</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Tags */}
                <div className="card bg-base-200 shadow">
                    <div className="card-body">
                        <h3 className="card-title text-sm">Tag</h3>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <label key={tag.id} className="cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.tagIds.includes(tag.id)}
                                        onChange={() => handleTagToggle(tag.id)}
                                        className="hidden"
                                    />
                                    <span
                                        className={`badge badge-sm cursor-pointer transition-colors ${formData.tagIds.includes(tag.id)
                                                ? "badge-primary"
                                                : "badge-outline"
                                            }`}
                                    >
                                        {tag.name}
                                    </span>
                                </label>
                            ))}
                            {tags.length === 0 && (
                                <span className="text-xs opacity-50">Belum ada tag</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

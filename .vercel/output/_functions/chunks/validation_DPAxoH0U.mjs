import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email("Email tidak valid").min(1, "Email wajib diisi"),
  username: z.string().min(3, "Username minimal 3 karakter").max(30, "Username maksimal 30 karakter").regex(/^[a-zA-Z0-9_-]+$/, "Username hanya boleh huruf, angka, underscore, dan strip"),
  displayName: z.string().min(1, "Nama tampilan wajib diisi").max(100, "Nama tampilan maksimal 100 karakter"),
  password: z.string().min(8, "Password minimal 8 karakter").regex(/[A-Z]/, "Password harus mengandung huruf besar").regex(/[0-9]/, "Password harus mengandung angka").regex(/[^A-Za-z0-9]/, "Password harus mengandung simbol")
});
const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(1, "Password wajib diisi")
});
const articleSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi").max(200, "Judul maksimal 200 karakter"),
  slug: z.string().min(1, "Slug wajib diisi").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug harus berupa huruf kecil dan strip"),
  content: z.string().min(1, "Konten wajib diisi"),
  excerpt: z.string().max(500, "Ringkasan maksimal 500 karakter").optional(),
  thumbnail: z.string().url("URL thumbnail tidak valid").optional().nullable(),
  status: z.enum(["DRAFT", "PUBLISHED", "SCHEDULED", "ARCHIVED"]).default("DRAFT"),
  publishedAt: z.string().datetime().optional().nullable(),
  scheduledAt: z.string().datetime().optional().nullable(),
  categoryId: z.string().optional().nullable(),
  tagIds: z.array(z.string()).optional().default([]),
  metaTitle: z.string().max(70, "Meta title maksimal 70 karakter").optional(),
  metaDesc: z.string().max(160, "Meta description maksimal 160 karakter").optional(),
  ogImage: z.string().url().optional().nullable(),
  canonicalUrl: z.string().url().optional().nullable()
});
z.object({
  content: z.string().min(1, "Komentar tidak boleh kosong").max(5e3, "Komentar maksimal 5000 karakter"),
  articleId: z.string().min(1, "Article ID wajib diisi"),
  parentId: z.string().optional().nullable()
});
const categorySchema = z.object({
  name: z.string().min(1, "Nama kategori wajib diisi").max(50),
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().max(500).optional(),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  icon: z.string().optional()
});
const tagSchema = z.object({
  name: z.string().min(1, "Nama tag wajib diisi").max(30),
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
});
z.object({
  displayName: z.string().min(1).max(100),
  username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_-]+$/),
  bio: z.string().max(500).optional(),
  avatar: z.string().url().optional().nullable()
});

export { articleSchema as a, categorySchema as c, loginSchema as l, registerSchema as r, tagSchema as t };

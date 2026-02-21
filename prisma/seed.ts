import { PrismaClient } from "@prisma/client";
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding database...");

    // Create Super Admin user
    const adminId = generateIdFromEntropySize(10);
    const hashedPassword = await hash("Admin@123", {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
    });

    const admin = await prisma.user.upsert({
        where: { email: "admin@boblog.com" },
        update: {},
        create: {
            id: adminId,
            email: "admin@boblog.com",
            username: "admin",
            displayName: "Admin BoBlog",
            hashedPassword,
            role: "SUPER_ADMIN",
            emailVerified: true,
        },
    });
    console.log(`✅ Admin user created: ${admin.email}`);

    // Create categories
    const categories = [
        { name: "Teknologi", slug: "teknologi", description: "Artikel seputar teknologi dan pemrograman", color: "#3B82F6", icon: "💻" },
        { name: "Tutorial", slug: "tutorial", description: "Panduan dan tutorial step-by-step", color: "#10B981", icon: "📘" },
        { name: "Opini", slug: "opini", description: "Opini dan pemikiran", color: "#F59E0B", icon: "💭" },
        { name: "Lifestyle", slug: "lifestyle", description: "Gaya hidup dan tips sehari-hari", color: "#EC4899", icon: "🌟" },
    ];

    for (const cat of categories) {
        await prisma.category.upsert({
            where: { slug: cat.slug },
            update: {},
            create: cat,
        });
    }
    console.log(`✅ ${categories.length} categories created`);

    // Create tags
    const tags = [
        { name: "JavaScript", slug: "javascript" },
        { name: "TypeScript", slug: "typescript" },
        { name: "Astro", slug: "astro" },
        { name: "React", slug: "react" },
        { name: "CSS", slug: "css" },
        { name: "Node.js", slug: "nodejs" },
        { name: "Database", slug: "database" },
        { name: "DevOps", slug: "devops" },
    ];

    for (const tag of tags) {
        await prisma.tag.upsert({
            where: { slug: tag.slug },
            update: {},
            create: tag,
        });
    }
    console.log(`✅ ${tags.length} tags created`);

    // Create a sample article
    const category = await prisma.category.findUnique({ where: { slug: "teknologi" } });
    const tag1 = await prisma.tag.findUnique({ where: { slug: "astro" } });
    const tag2 = await prisma.tag.findUnique({ where: { slug: "typescript" } });

    if (category && tag1 && tag2) {
        const article = await prisma.article.upsert({
            where: { slug: "selamat-datang-di-boblog" },
            update: {},
            create: {
                title: "Selamat Datang di BoBlog!",
                slug: "selamat-datang-di-boblog",
                content: `
<h2>Halo Dunia! 👋</h2>
<p>Selamat datang di <strong>BoBlog</strong>, sebuah platform blog modern yang dibangun dengan teknologi terkini.</p>

<h3>Apa itu BoBlog?</h3>
<p>BoBlog adalah blog fullstack yang menggunakan <strong>Astro.js</strong> sebagai framework utama, dengan fitur-fitur canggih seperti:</p>
<ul>
  <li>⚡ Performa tinggi dengan Astro Islands architecture</li>
  <li>🔍 SEO-friendly dengan metadata lengkap</li>
  <li>🎨 Tampilan modern dengan dark/light mode</li>
  <li>💬 Sistem komentar interaktif</li>
  <li>📊 Dashboard admin lengkap</li>
</ul>

<h3>Tech Stack</h3>
<p>Teknologi yang digunakan:</p>
<ul>
  <li><strong>Frontend:</strong> Astro.js + React + Tailwind CSS + DaisyUI</li>
  <li><strong>Backend:</strong> Astro API Routes</li>
  <li><strong>Database:</strong> PostgreSQL via Supabase + Prisma ORM</li>
  <li><strong>Auth:</strong> Lucia Auth</li>
</ul>

<h3>Mulai Membaca</h3>
<p>Jelajahi blog ini dan temukan artikel-artikel menarik seputar teknologi, tutorial, dan banyak lagi!</p>
        `.trim(),
                excerpt: "Kenalan dengan BoBlog — platform blog modern yang dibangun dengan Astro.js, penuh fitur dan siap production.",
                status: "PUBLISHED",
                publishedAt: new Date(),
                readingTime: 2,
                authorId: admin.id,
                categoryId: category.id,
                tags: {
                    create: [
                        { tagId: tag1.id },
                        { tagId: tag2.id },
                    ],
                },
            },
        });
        console.log(`✅ Sample article created: ${article.title}`);
    }

    // Create default site settings
    const settings = [
        { key: "site_name", value: "BoBlog" },
        { key: "site_tagline", value: "Blog Modern dengan Astro.js" },
        { key: "site_description", value: "BoBlog adalah platform blog modern yang dibangun dengan Astro.js" },
        { key: "comments_enabled", value: "true" },
        { key: "comments_moderation", value: "false" },
        { key: "comments_guest", value: "false" },
    ];

    for (const setting of settings) {
        await prisma.siteSetting.upsert({
            where: { key: setting.key },
            update: {},
            create: setting,
        });
    }
    console.log(`✅ ${settings.length} site settings created`);

    console.log("\n🎉 Seeding selesai!");
}

main()
    .catch((e) => {
        console.error("❌ Seed error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

/**
 * BoBlog Utility Functions
 */

/**
 * Generate a URL-friendly slug from a string
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

/**
 * Calculate estimated reading time in minutes
 */
export function calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

/**
 * Format a date to a human-readable string
 */
export function formatDate(date: Date | string, locale: string = "id-ID"): string {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

/**
 * Format relative time (e.g., "2 jam yang lalu")
 */
export function timeAgo(date: Date | string): string {
    const d = typeof date === "string" ? new Date(date) : date;
    const now = new Date();
    const seconds = Math.floor((now.getTime() - d.getTime()) / 1000);

    const intervals = [
        { label: "tahun", seconds: 31536000 },
        { label: "bulan", seconds: 2592000 },
        { label: "minggu", seconds: 604800 },
        { label: "hari", seconds: 86400 },
        { label: "jam", seconds: 3600 },
        { label: "menit", seconds: 60 },
    ];

    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
            return `${count} ${interval.label} yang lalu`;
        }
    }

    return "baru saja";
}

/**
 * Truncate text to a max length with ellipsis
 */
export function truncate(text: string, maxLength: number = 150): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
}

/**
 * Strip HTML tags from content
 */
export function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, "");
}

/**
 * Generate excerpt from HTML content
 */
export function generateExcerpt(htmlContent: string, maxLength: number = 160): string {
    return truncate(stripHtml(htmlContent), maxLength);
}

/**
 * Format number with K, M suffix
 */
export function formatNumber(num: number): string {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
    return num.toString();
}

/**
 * Create a JSON API response
 */
export function jsonResponse(data: unknown, status: number = 200): Response {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json" },
    });
}

/**
 * Create a JSON error response
 */
export function errorResponse(message: string, status: number = 400): Response {
    return new Response(JSON.stringify({ error: message }), {
        status,
        headers: { "Content-Type": "application/json" },
    });
}

/**
 * Validate request method
 */
export function validateMethod(request: Request, allowed: string[]): Response | null {
    if (!allowed.includes(request.method)) {
        return errorResponse("Method not allowed", 405);
    }
    return null;
}

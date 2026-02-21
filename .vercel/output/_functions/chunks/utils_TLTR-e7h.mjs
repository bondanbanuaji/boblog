function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}
function timeAgo(date) {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = /* @__PURE__ */ new Date();
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1e3);
  const intervals = [
    { label: "tahun", seconds: 31536e3 },
    { label: "bulan", seconds: 2592e3 },
    { label: "minggu", seconds: 604800 },
    { label: "hari", seconds: 86400 },
    { label: "jam", seconds: 3600 },
    { label: "menit", seconds: 60 }
  ];
  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label} yang lalu`;
    }
  }
  return "baru saja";
}
function truncate(text, maxLength = 150) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
}
function stripHtml(html) {
  return html.replace(/<[^>]*>/g, "");
}
function generateExcerpt(htmlContent, maxLength = 160) {
  return truncate(stripHtml(htmlContent), maxLength);
}
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}
function errorResponse(message, status = 400) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

export { calculateReadingTime as c, errorResponse as e, generateExcerpt as g, jsonResponse as j, timeAgo as t };

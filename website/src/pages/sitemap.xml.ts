import type { APIRoute } from "astro";

// Include only canonical, indexable pages. Keep in sync when adding routes.
export const GET: APIRoute = ({ site }) => {
  const routes = ["/", "/privacy/", "/terms/"];
  const urls = routes.map((route) => `<url><loc>${new URL(route, site).href}</loc></url>`);

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
};

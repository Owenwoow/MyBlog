import type { APIRoute } from "astro";

const siteUrl = import.meta.env.SITE || "https://blog.owenwoow.com";

const robotsTxt = `
User-agent: *
Allow: /
Disallow: /_astro/
Disallow: /404

# Crawl-delay for well-behaved bots
User-agent: Bingbot
Crawl-delay: 1

Sitemap: ${new URL("sitemap-index.xml", siteUrl).href}
`.trim();

export const GET: APIRoute = () => {
	return new Response(robotsTxt, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
};

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.winnieswim.com",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "daily",
  priority: 0.7,
  sourceDir: ".next", // ✅ tells it where to find the app router output
  outDir: "public", // ✅ puts sitemap in /public where Vercel can serve it
};

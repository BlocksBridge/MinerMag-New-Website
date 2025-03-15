/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_website_url || 'https://theminermag.com',
    generateRobotsTxt: true, // (optional)
    generateIndexSitemap: true, changefreq: 'hourly'
    // ...other options
}
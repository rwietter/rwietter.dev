const fs = require('node:fs');
const path = require('node:path');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://rwietter.dev/',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 1,
  exclude: ['/admin/**'], // Se houver páginas a serem excluídas
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://rwietter.dev/sitemap-0.xml',
    ],
    policies: [
      { userAgent: '*', allow: '/*' },
      { userAgent: 'Twitterbot', allow: '/*' },
      { userAgent: 'Googlebot', allow: '/*' },
      { userAgent: 'Bingbot', allow: '/*' },
      { userAgent: 'Slurp', allow: '/*' },
      { userAgent: 'DuckDuckBot', allow: '/*' },
    ],
  },
  additionalPaths: async (config) => {
    const blogPath = path.join(__dirname, 'public/posts');
    const blogFiles = fs.readdirSync(blogPath);

    const blogPaths = blogFiles.map((file) => {
      const mdmdx = /\.mdx?$/;
      const slug = file.replace(mdmdx, '');
      
      return {
        loc: `${config.siteUrl}/blog/article/${slug}`,
        changefreq: 'hourly',
        priority: 1,
      };
    });

    return blogPaths;
  },
};

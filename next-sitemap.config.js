import fs from 'node:fs';
import path from 'node:path';

const pth = (target) => path.join(path.resolve(), target)
const readDir = (path) => fs.readdirSync(path)

/** @type {import('next-sitemap').IConfig} */
const options = {
  siteUrl: 'https://rwietter.dev/',
  generateRobotsTxt: true,
  changefreq: 'daily',
  autoLastmod: true,
  generateIndexSitemap: true,
  priority: 1,
  exclude: ['/admin/**'],
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
    const enBlogPath = pth('public/posts/en');
    const ptBlogPath = pth('public/posts/pt');
    const awesomePath = pth('public/awesome');
    const enBlogFiles = readDir(enBlogPath);
    const ptBlogFiles = readDir(ptBlogPath);
    const awesomeFiles = readDir(awesomePath);

    const enBlogPaths = enBlogFiles.map((file) => {
      const mdmdx = /\.mdx?$/;
      const slug = file.replace(mdmdx, '');

      return {
        loc: `${config.siteUrl}/blog/${slug}`,
        changefreq: 'daily',
        priority: 1,
      };
    });

    const ptBlogPaths = ptBlogFiles.map((file) => {
      const mdmdx = /\.mdx?$/;
      const slug = file.replace(mdmdx, '');

      return {
        loc: `${config.siteUrl}/blog/${slug}`,
        changefreq: 'daily',
        priority: 1,
      };
    });

    const awesomePaths = awesomeFiles.map((file) => ({
      loc: `${config.siteUrl}/awesome/${file.replace(/\.mdx?$/, '')}`,
      changefreq: 'weekly',
      priority: 1,
    }))

    const allPaths = [...enBlogPaths, ...ptBlogPaths, ...awesomePaths];

    return allPaths;
  },
};


export default options;

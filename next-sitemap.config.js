module.exports = {
  siteUrl: 'https://www.rutgerseconomics.org',
  outDir: 'out',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/404', '/500'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
  },
  transform: async (config, path) => {
    // Customize priority and changefreq based on path
    let priority = config.priority;
    let changefreq = config.changefreq;

    // Homepage gets highest priority
    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    }
    
    // About and main pages get high priority
    if (['/about', '/people', '/projects', '/partner-with-rel'].includes(path)) {
      priority = 0.9;
      changefreq = 'weekly';
    }
    
    // Apply and resources pages
    if (['/apply', '/resources'].includes(path)) {
      priority = 0.8;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};

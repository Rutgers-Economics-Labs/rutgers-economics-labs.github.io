module.exports = {
  siteUrl: 'https://www.rutgerseconomics.org',
  outDir: 'out',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/404', '/500', '/check-in', '/unsubscribe'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/check-in'],
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
    if (['/about', '/people', '/projects', '/work-with-rel', '/student-experience'].includes(path)) {
      priority = 0.9;
      changefreq = 'weekly';
    }
    
    // Apply and resources pages
    if (['/apply', '/club-fair', '/resources'].includes(path)) {
      priority = 0.8;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
    };
  },
};

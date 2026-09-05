import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const origin = 'https://www.rutgerseconomics.org';
const routes = ['/', '/about', '/projects', '/people', '/resources', '/apply', '/club-fair', '/work-with-rel', '/student-experience'];
const sitemap = readFileSync('out/sitemap-0.xml', 'utf8');
const robots = readFileSync('out/robots.txt', 'utf8');
const titles = new Set();
for (const route of routes) {
  const base = route === '/' ? 'out/index.html' : `out${route}.html`;
  const file = existsSync(base) ? base : `out${route}/index.html`;
  const html = readFileSync(file, 'utf8');
  const tags = [...html.matchAll(/<(?:meta|link)\b[^>]*>/g)].map(([tag]) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, value])));
  const meta = key => tags.find(t => t.name === key || t.property === key)?.content;
  const canonical = tags.find(t => t.rel === 'canonical')?.href;
  const expected = route === '/' ? `${origin}/` : `${origin}${route}`;
  assert.equal(new URL(canonical).href, new URL(expected).href, `${route}: canonical`);
  assert.equal(new URL(meta('og:url')).href, new URL(expected).href, `${route}: og:url`);
  for (const key of ['description', 'og:title', 'og:description', 'og:image', 'twitter:title', 'twitter:description', 'twitter:image']) assert.ok(meta(key), `${route}: missing ${key}`);
  assert.equal(meta('og:image'), `${origin}/images/og-image.jpg`);
  assert.equal(meta('og:image:width'), '500');
  assert.equal(meta('og:image:height'), '500');
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${route}: one main heading`);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert.ok(title && !titles.has(title), `${route}: unique title`); titles.add(title);
  assert.ok(!meta('robots')?.includes('noindex'), `${route}: indexable`);
  assert.ok(sitemap.includes(`<loc>${expected.replace(/\/$/, '')}</loc>`) || sitemap.includes(`<loc>${expected}</loc>`), `${route}: sitemap`);
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(json);
  for (const [, href] of html.matchAll(/href="(\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
    const decoded = decodeURIComponent(href);
    assert.ok(existsSync(path.join('out', decoded)) || existsSync(`out${decoded}.html`) || existsSync(`out${decoded}/index.html`), `${route}: missing internal destination ${href}`);
  }
}
for (const route of ['/unsubscribe', '/check-in']) {
  const file = existsSync(`out${route}.html`) ? `out${route}.html` : `out${route}/index.html`;
  assert.match(readFileSync(file, 'utf8'), /name="robots" content="[^"]*noindex/);
  assert.ok(!sitemap.includes(`<loc>${origin}${route}</loc>`));
}
assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
assert.ok(!sitemap.includes('https://rutgerseconomics.org'));
const image = await sharp('public/images/og-image.jpg').metadata();
assert.equal(image.width, 500); assert.equal(image.height, 500);
const header = readFileSync('src/components/Header.tsx', 'utf8');
for (const route of ['/club-fair', '/work-with-rel', '/student-experience']) assert.ok(!header.includes(route), `Top navigation excludes ${route}`);
console.log(`SEO checks passed: ${routes.length} public routes, canonicals, social cards, headings, internal links, JSON-LD, sitemap, and utility noindex.`);

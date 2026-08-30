const CACHE_NAME = 'scarlet-check-in-v1';
const APP_SHELL = [
  '/check-in',
  '/check-in-manifest.webmanifest',
  '/images/REL Logo.JPEG',
  '/check-in-assets/opencv.js',
  '/check-in-assets/worker.min.js',
  '/check-in-assets/lang/eng.traineddata.gz',
  '/check-in-assets/core/tesseract-core.wasm.js',
  '/check-in-assets/core/tesseract-core.wasm',
  '/check-in-assets/core/tesseract-core-simd.wasm.js',
  '/check-in-assets/core/tesseract-core-simd.wasm',
  '/check-in-assets/core/tesseract-core-relaxedsimd.wasm.js',
  '/check-in-assets/core/tesseract-core-relaxedsimd.wasm',
  '/check-in-assets/core/tesseract-core-lstm.wasm.js',
  '/check-in-assets/core/tesseract-core-lstm.wasm',
  '/check-in-assets/core/tesseract-core-relaxedsimd-lstm.wasm.js',
  '/check-in-assets/core/tesseract-core-relaxedsimd-lstm.wasm',
  '/check-in-assets/core/tesseract-core-simd-lstm.wasm.js',
  '/check-in-assets/core/tesseract-core-simd-lstm.wasm'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith('scarlet-check-in-') && key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => cached || (event.request.mode === 'navigate' ? caches.match('/check-in') : undefined));
      return cached || network;
    })
  );
});

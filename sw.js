// ABC Tap service worker: makes the game work offline once it has been opened online.
// Bump the version in CACHE whenever you change a file, so installed copies pick up the update.
const CACHE = 'abc-tap-v1';
const CORE = ['./', './index.html', './manifest.json', './icons/icon-192.png', './icons/icon-512.png',
  './fonts/andika-700-latin.woff2', './fonts/baloo2-latin.woff2'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

// Stale-while-revalidate for our own files: answer instantly from the cache,
// then fetch a fresh copy in the background so the next launch has any updates.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  e.respondWith(caches.open(CACHE).then(async c => {
    const hit = await c.match(e.request, { ignoreSearch: url.pathname.endsWith('/') || url.pathname.endsWith('.html') });
    const fresh = fetch(e.request).then(res => {
      if (res.ok && !url.search) { const copy = res.clone(); c.put(e.request, copy); }
      return res;
    });
    if (hit) { e.waitUntil(fresh.catch(() => {})); return hit; }
    return fresh.catch(() => c.match('./index.html'));
  }));
});

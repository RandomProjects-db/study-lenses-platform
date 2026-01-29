const CACHE_NAME = 'code-tracers-v2';
const PYODIDE_URL = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/';
const BABEL_URL = 'https://unpkg.com/@babel/standalone/babel.min.js';

const urlsToCache = [
  './',
  './index.html',
  './js-tracer.html',
  './js-auto-tracer.html',
  './python-tracer.html',
  './hybrid-tracer.html',
  './timetravel-debugger.html',
  './manifest.json',
  BABEL_URL,
  PYODIDE_URL + 'pyodide.js',
  PYODIDE_URL + 'pyodide.asm.js',
  PYODIDE_URL + 'pyodide.asm.wasm'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache).catch(err => {
        console.log('Cache failed for some resources:', err);
      });
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

const CACHE='reisgids-au-v22';
const KEEP=[CACHE,'reisgids-maps'];
const CORE=["./","index.html","manifest.webmanifest","font/fraunces-latin.woff2","font/fraunces-italic-latin.woff2","lib/maplibre-gl.js","lib/maplibre-gl.css","lib/pmtiles.js","font/glyphs/Noto%20Sans%20Regular/0-255.pbf","font/glyphs/Noto%20Sans%20Regular/256-511.pbf","font/glyphs/Noto%20Sans%20Medium/0-255.pbf","font/glyphs/Noto%20Sans%20Medium/256-511.pbf","img/ai/cover.jpg","img/ai/duiken.jpg","img/ai/inpakken.jpg","img/hero/sydney.jpg","img/hero/katoomba.jpg","img/hero/portmacquarie.jpg","img/hero/byron.jpg","img/hero/noosa.jpg","img/hero/fraser.jpg","img/hero/rockhampton.jpg","img/hero/eungella.jpg","img/hero/airlie.jpg","img/hero/reef.jpg","img/hero/magnetic.jpg","img/hero/atherton.jpg","img/hero/daintree.jpg","img/hero/palmcove.jpg"];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>Promise.allSettled(CORE.map(u=>c.add(u)))));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>KEEP.indexOf(k)<0).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||!r.url.startsWith(self.location.origin))return;
  if(r.url.indexOf('.pmtiles')>=0)return; // kaart-tiles: pagina beheert eigen 'reisgids-maps'-cache
  e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{if(res&&res.status===200){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp));}return res;}).catch(()=>caches.match('index.html'))));});

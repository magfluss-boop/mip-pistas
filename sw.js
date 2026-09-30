const CACHE="mip-pistas-v1";
const FILES=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./apple-touch-icon.png",
 "./01_Inici.mp3","./03_Revista_TicTac.mp3","./04_RisingCards_.mp3","./07_Cabdell.mp3"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET") return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>hit||fetch(e.request).then(res=>{
    const url=new URL(e.request.url);
    if(res.ok||res.type==="opaque"){ if(url.origin===location.origin||/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)){ const cp=res.clone(); caches.open(CACHE).then(c=>c.put(e.request,cp)); } }
    return res;
  }).catch(()=>caches.match("./index.html"))));
});

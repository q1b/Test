const staticCacheName = 'site-static'; 

const assets = [
    './index.html',
    './hamburger.css',
    './Relation_and_function.html',
    './trignometry.html',
    './Matrix.html',
    './Determinant.html',
    './Continuty_and_differentiation.html',
    './Applications_of_Differentiation.html',
    './Integration.html',
    './Applications_of_Intgration.html',
    './Differential_equations.html',
    './Vector_algebra.html',
    './3d-geometry.html',
    './Linear_inquality.html',
    './Probability.html',
    './public/App.js',
    './tailwind.css',
    'https://polyfill.io/v3/polyfill.min.js?features=es6',
    'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js',
    'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300&display=swap',
    './favicon.ico',
    './apple-icon-180.png',
    './icons/favicon-32x32.png',
    './icons/favicon-16x16.png',
    './icons/manifest-icon-192.png',
    './icons/manifest-icon-512.png',
];
//install service worker
self.addEventListener('install', evt =>{
    console.log('service worker is installed')
    evt.waitUntil(
        caches.open(staticCacheName).then( Cache => {
            console.log('cache shell');
            Cache.addAll(assets);
        })
    );
});
//Well done
self.addEventListener('activate',evt=>{
    evt.waitUntil(
        caches.keys().then(keys =>{
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
            )
        })
    )
    console.log("Service Worker Activated")
})
//Fetch Event
self.addEventListener('fetch',evt =>{
    evt.respondWith(
        caches.match(evt.request)
        .then(cacheRes =>{
            return cacheRes || fetch(evt.request);
        }))
    // evt.respondWith(
    //     fetch(evt.request).catch(()=>{
    //         return caches.open(staticCacheName).then(Cache => {
    //             return caches.match(evt.request);             
    //         })
    //     })
    // )
});
self.addEventListener('fetch', e=>{
    e.respondWith(
        fetch(e.request).catch(()=>{
            return new Response("Hello installed")
        })
    )
})

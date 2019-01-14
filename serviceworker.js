

function onInstall(event)
{

    function fillCache(cache)
	return cache.addAll(['./', 'vue.js']);


    event.waitUntil(caches.open('v1-tab-sw').then(fillCache));
}

function onFetch(event)
{
    function onMatch(response)
	return response || fetch(event.request);

    event.respondWith(caches.match(event.request).then(onMatch));
}

self.addEventListener('install', onInstall);
self.addEventListener('fetch', onFetch);




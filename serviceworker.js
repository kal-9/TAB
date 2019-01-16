
const TABCACHE = 'v1-tab-sw';

function log(msg)
    { console.log(msg) }

function onInstall(event)
{

    function fillCache(cache)
	{ return cache.addAll(['./tab.html', 'vue.js']) }


    self.skipWaiting();
    event.waitUntil(caches.open(TABCACHE).then(fillCache));
}

function onFetch(event)
{
    function onError(error)
    {
	log("Network Down - returning offline version ...");
	return caches.match(event.request);
    }

    function onSuccess(response)
    {
	log("Network Up!");

	function updateCache(cache)
	{ 
	    log("Updating cache ...");

	    cache.put(event.request, response.clone()); //see MDN/Using_Service_Workers
	    return response; 
	} 
	
	return caches.open(TABCACHE).then(updateCache);
    }


    event.respondWith(fetch(event.request).then(onSuccess).catch(onError));

}

self.addEventListener('install', onInstall);
self.addEventListener('fetch', onFetch);




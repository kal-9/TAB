
const TABCACHE = 'v1-tab-sw';

function onInstall(event)
{

    function fillCache(cache)
	{ return cache.addAll(['./tab.html', 'vue.js']) }


    self.skipWaiting();
    event.waitUntil(caches.open(TABCACHE).then(fillCache));
}

function onFetch(event)
{

    /*
    function log(response)
    {
	console.log("cache match !");
	console.log("event.request");
	console.log(event.request);
	console.log("response : ");
	console.log(response);
    }
    */

    function onMatch(response)
    { 
	//log(response);
	return response || fetch(event.request) 
    }

    function log(error)
	{ console.log("Network Down, returning offline version ...") }

    function onError(error)
    {
	log(error);
	return caches.match(event.request);
    }

    function onSuccess(response)
    {
	console.log("Network Up! - updating cache");

	function updateCache(cache)
	    { cache.put(event.request, response.clone()); return response; } //see MDN/Using_Service_Workers
	
	return caches.open(TABCACHE).then(updateCache);
    }


    event.respondWith(fetch(event.request).then(onSuccess).catch(onError));

    //event.respondWith(caches.match(event.request).then(onMatch));
}

self.addEventListener('install', onInstall);
self.addEventListener('fetch', onFetch);




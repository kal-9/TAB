

function onInstall(event)
{

    function fillCache(cache)
	{ return cache.addAll(['./tab.html', 'vue.js']) }


    self.skipWaiting();
    event.waitUntil(caches.open('v1-tab-sw').then(fillCache));
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

    function onNetworkLost(error)
    {
	log(error);
	return caches.match(event.request);
    }


    event.respondWith(fetch(event.request).catch(onNetworkLost));

    //event.respondWith(caches.match(event.request).then(onMatch));
}

self.addEventListener('install', onInstall);
self.addEventListener('fetch', onFetch);




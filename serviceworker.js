

function onInstall(event)
{

    function fillCache(cache)
	{ return cache.addAll(['./tab.html', 'vue.js']) }


    event.waitUntil(caches.open('v1-tab-sw').then(fillCache));
}

function onFetch(event)
{

    function log(response)
    {
	console.log("cache match !");
	console.log("event.request");
	console.log(event.request);
	console.log("response : ");
	console.log(response);
    }

    function onMatch(response)
    { 
	//log(response);
	return response || fetch(event.request) 
    }

    event.respondWith(caches.match(event.request).then(onMatch));
}

self.addEventListener('install', onInstall);
self.addEventListener('fetch', onFetch);




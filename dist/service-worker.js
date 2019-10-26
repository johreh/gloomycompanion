// https://googlechrome.github.io/samples/service-worker/basic/

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

// Names of the two caches used in this version of the service worker.
// Change to v2, etc. when you update any of the local resources, which will
// in turn trigger the install event again.
const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
    'index.html',
    './', // Alias for index.html
    'cards.css',
    'style.css',
    'main.js',
    'Philosopher-Bold.ttf',
    'PirataOne-Gloomhaven.ttf',
    'images/add_target.svg',
    'images/air.svg',
    'images/any_element.svg',
    'images/aoe-4-with-black.svg',
    'images/aoe-circle-with-middle-black.svg',
    'images/aoe-circle-with-side-black.svg',
    'images/aoe-circle.svg',
    'images/aoe-line-3-with-black.svg',
    'images/aoe-line-4-with-black.svg',
    'images/aoe-line-6-with-black.svg',
    'images/aoe-triangle-2-side-with-black.svg',
    'images/aoe-triangle-2-side.svg',
    'images/aoe-triangle-3-side-with-corner-black.svg',
    'images/aoe1.svg',
    'images/aoe2.svg',
    'images/attack.svg',
    'images/attack_mod_+0.jpg',
    'images/attack_mod_+1.jpg',
    'images/attack_mod_+2.jpg',
    'images/attack_mod_-1.jpg',
    'images/attack_mod_-2.jpg',
    'images/attack_mod_2x.jpg',
    'images/attack_mod_back.jpg',
    'images/attack_mod_bless.jpg',
    'images/attack_mod_curse.jpg',
    'images/attack_mod_null.jpg',
    'images/back.jpg',
    'images/back.svg',
    'images/bless.svg',
    'images/curse.svg',
    'images/dark.svg',
    'images/disarm.svg',
    'images/draw-two.svg',
    'images/earth.svg',
    'images/elderDrake.special1Area.svg',
    'images/fire.svg',
    'images/fly.svg',
    'images/front.jpg',
    'images/heal.svg',
    'images/ice.svg',
    'images/icon.png',
    'images/immobilize.svg',
    'images/inoxBodyguard.special1Area.svg',
    'images/invisibility.svg',
    'images/jump.svg',
    'images/light.svg',
    'images/loot.svg',
    'images/minus-circle.svg',
    'images/move.svg',
    'images/muddle.svg',
    'images/pierce.svg',
    'images/plus-circle.svg',
    'images/poison.svg',
    'images/push.svg',
    'images/range.svg',
    'images/retaliate.svg',
    'images/settings.svg',
    'images/shield.svg',
    'images/shuffle-black.svg',
    'images/shuffle.svg',
    'images/sightlessEye.special1Area.svg',
    'images/sightlessEye.special2Area.svg',
    'images/strengthen.svg',
    'images/stun.svg',
    'images/target.svg',
    'images/use_element.svg',
    'images/wound.svg'
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(PRECACHE)
            .then(cache => cache.addAll(PRECACHE_URLS))
            .then(self.skipWaiting())
    );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
    const currentCaches = [PRECACHE, RUNTIME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
        }).then(cachesToDelete => {
            return Promise.all(cachesToDelete.map(cacheToDelete => {
                return caches.delete(cacheToDelete);
            }));
        }).then(() => self.clients.claim())
    );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
    // Skip cross-origin requests, like those for Google Analytics.
    if (event.request.url.startsWith(self.location.origin)) {
        event.respondWith(
            caches.match(event.request).then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return caches.open(RUNTIME).then(cache => {
                    return fetch(event.request).then(response => {
                        // Put a copy of the response in the runtime cache.
                        return cache.put(event.request, response.clone()).then(() => {
                            return response;
                        });
                    });
                });
            })
        );
    }
});

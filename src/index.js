import { init } from './logic.js'
import { init_ui } from './ui.js'

document.addEventListener('DOMContentLoaded', function () {
    init()
    init_ui()
})

// https://developers.google.com/web/tools/workbox/guides/generate-service-worker/webpack
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/service-worker.js');
    });
}

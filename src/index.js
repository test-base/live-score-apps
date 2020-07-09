import './public/css/main.css';
import './public/css/responsive.css';
import './public/css/materialize.min.css';
import './public/js/materialize.min.js';
import main from './public/js/main.js';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

if ('serviceWorker' in navigator) {
    runtime.register();
    // const registration = runtime.register();

    /* window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js');
        console.log("ServiceWorker terpasang!");
    }); */
} else {
    console.log("ServiceWorker belum didukung pada peramban");
}

main();
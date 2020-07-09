import './public/css/main.css';
import './public/css/responsive.css';
import './public/css/materialize.min.css';
import './public/js/materialize.min.js';
import main from './public/js/main.js';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js');
    });
} else {
    console.log("ServiceWorker belum didukung pada peramban");
}

main();
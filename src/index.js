import './public/css/main.css';
import './public/css/responsive.css';
import './public/css/materialize.min.css';
import './public/js/materialize.min.js';
import main from './public/js/main.js';

import runtime from 'serviceworker-webpack-plugin/lib/runtime';

if ('serviceWorker' in navigator) {
    runtime.register()
    .then(((res) => {
        console.log("Pemasangan ServiceWorker berhasil!")
        return "Pemasangan ServiceWorker berhasil!"
    }))
    .catch(((err) => {
        console.log(err)
        return "Pemasangan ServiceWorker gagal";
    }));
} else {
    console.log("ServiceWorker belum didukung pada peramban");
}

main();
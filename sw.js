const CACHE_NAME = "v1_cache_contador_app_vue";
const urlsToCache = [
    "./",
    "./img/favicon.png",
    "./img/icon32.png",
    "./img/icon64.png",
    "./img/icon128.png",
    "./img/icon256.png",
    "./img/icon512.png",
    "./img/icon1024.png",
    "./js/main.js",
    "https://unpkg.com/vue@next",
    "./js/mountApp.js",
    "./css/style.css",
    "https://necolas.github.io/normalize.css/8.0.1/normalize.css",
];
//sel -  para hacer referencia la service worker
//agregamos tres eventos 1 install para instalar el service worker
self.addEventListener("install", (e) => {
    //metodo waituntill escucha y ejecuta lo que vamos a cacher 
    e.waitUntil(
        //ejecuta el documento cache y asiga el nombre a nuestro nuevo cahe 
        caches.open(CACHE_NAME).then((cache) =>
            //creamos un apromesa
            cache
            //registar todos los caches y todas estas urls
            .addAll(urlsToCache)
            //otra prmesa then recibe una funcion de flecha ejecuta que self.skipwaitin e suna funcion del cache que espera qu este cacheando el cache
            .then(() => self.skipWaiting())
            .catch((err) => console.log(err))
        )
    );
});
//self - agregamos un evento activate va verificar qu eeste activado y no haya modificaciones
self.addEventListener("activate", (e) => {
    //va a tomar ltoda la infomacion que tenemos en nuestra cache
    const cacheWhitelist = [CACHE_NAME];
    //va aesperar que todo  se ejecute
    e.waitUntil(
        caches
        //todo lo qu etniene le nombre de nuestro cache las llaves key 
        .keys()
        //recibir el nombre de ese cache cachenames
        .then((cacheNames) => {
            //retonar una promesa que vaa contener nuestro resultado que son las caches name
            return Promise.all(
                // map nos va apermitir uno por uno mapear 
                cacheNames.map((cacheName) => {
                    //si el nombre del cache es diferente del cache names y esto retorna -1
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        //retornar caches y borrrar este cache  
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        //en caso que esto no ocurra solo va  actulizar nuestro cache se actualiza automatica
        .then(() => self.clients.claim())
    );
});

//por ultimo se crea un nuevo evento que se encaga de hacer peticiones y descargar toda nuestra cache
self.addEventListener("fetch", (e) => {
    //fetch descarga todo - va a responder cuando algo pase
    e.respondWith(
        //responder cuando nuestro objeto de cache haga match con nuestra peticion
        caches.match(e.request).then((res) => {
            //retorna una promesa recibe la promesa 
            if (res) {
                //si el cahe tiene una respuesta
                return res;
            }
            //si no conicde con el cache  vamos a retorar toda la peticon del usuario que genere toda esta cache

            return fetch(e.request);
        })
    );
});
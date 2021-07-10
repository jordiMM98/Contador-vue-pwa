//navigator es una propiedad del BOM hacemos unan aconidicion si el service worker existe en nuestro navegador si si la soporta va acargarlo
if ("serviceWorker" in navigator) {
    //en caso que si exista y lo enuentre ocuparemos nuestro objeto navigator que viene del BOM
    navigator.serviceWorker
        // register es la ruta del service worker  ./sw.js es donde esta la configuracion del servie worker y retorna una promesa
        .register("./sw.js")
        //then no s permite tratar la inofrmacion de esa promesa el reg es un callback si se puedo registar
        .then((reg) => console.log("Registro Exitoso"))
        //catch si esto falla vamos a recivbir si faala y imprimir el error
        .catch((err) => console.log(err));
}
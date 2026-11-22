/*
 * carrusel.js — Código sencillo para los dos carruseles de la portada.
 *
 * La idea es simple:
 *  - Hay una "pista" con todas las diapositivas una al lado de otra.
 *  - Para cambiar de diapositiva, movemos la pista con translateX.
 *  - Los puntos y las flechas llaman a la función mostrarSlide().
 */

/* Guarda el temporizador de cada carrusel para poder pararlo. */
const temporizadores = {};

/* Crea el HTML básico del carrusel dentro del elemento indicado. */
function prepararCarrusel(id, totalSlides) {
   const carrusel = document.querySelector("#" + id);

   /* Ventana: oculta lo que se sale. */
   const ventana = document.createElement("div");
   ventana.className = "carrusel-ventana";

   /* Pista: aquí van todas las diapositivas en fila. */
   const pista = document.createElement("div");
   pista.className = "carrusel-pista";
   ventana.appendChild(pista);

   /* Flecha anterior. */
   const btnPrev = document.createElement("button");
   btnPrev.type = "button";
   btnPrev.className = "carrusel-flecha carrusel-flecha-prev";
   btnPrev.innerHTML = "&#10094;";
   btnPrev.setAttribute("aria-label", "Anterior");

   /* Flecha siguiente. */
   const btnNext = document.createElement("button");
   btnNext.type = "button";
   btnNext.className = "carrusel-flecha carrusel-flecha-next";
   btnNext.innerHTML = "&#10095;";
   btnNext.setAttribute("aria-label", "Siguiente");

   /* Puntos de abajo. */
   const puntos = document.createElement("div");
   puntos.className = "carrusel-puntos";

   for (let i = 0; i < totalSlides; i++) {
      const punto = document.createElement("button");
      punto.type = "button";
      punto.className = "carrusel-punto";
      punto.setAttribute("aria-label", "Ir a la diapositiva " + (i + 1));
      puntos.appendChild(punto);
   }

   carrusel.appendChild(ventana);
   carrusel.appendChild(btnPrev);
   carrusel.appendChild(btnNext);
   carrusel.appendChild(puntos);

   return { carrusel, pista, btnPrev, btnNext, puntos };
}

/* Muestra la diapositiva con el número "indice". */
function mostrarSlide(id, indice) {
   const carrusel = document.querySelector("#" + id);
   const pista = carrusel.querySelector(".carrusel-pista");
   const slides = carrusel.querySelectorAll(".carrusel-slide");
   const puntos = carrusel.querySelectorAll(".carrusel-punto");
   const total = slides.length;

   /* Si nos pasamos por la derecha o por la izquierda, damos la vuelta. */
   if (indice >= total) {
      indice = 0;
   }
   if (indice < 0) {
      indice = total - 1;
   }

   /* Movemos la pista. Cada slide ocupa el 100% del ancho. */
   pista.style.transform = "translateX(-" + (indice * 100) + "%)";

   /* Marcamos el punto activo. */
   puntos.forEach(function (punto, i) {
      if (i === indice) {
         punto.classList.add("activo");
      } else {
         punto.classList.remove("activo");
      }
   });

   /* Guardamos en qué diapositiva estamos. */
   carrusel.dataset.indice = indice;
}

/* Inicia un carrusel.
   id        -> id del div en el HTML
   datos     -> array con la información de cada diapositiva
   crearSlide -> función que recibe (dato, idioma) y devuelve un elemento HTML
   intervalo -> milisegundos para pasar solo (0 si no quieres que pase solo)
*/
export function iniciarCarrusel(id, datos, crearSlide, intervalo) {
   const partes = prepararCarrusel(id, datos.length);
   const carrusel = partes.carrusel;

   /* Creamos las diapositivas y las metemos en la pista. */
   datos.forEach(function (dato) {
      const slide = document.createElement("div");
      slide.className = "carrusel-slide";
      /* El contenido se rellena luego con actualizarIdioma(). */
      slide._dato = dato;
      slide._crearSlide = crearSlide;
      partes.pista.appendChild(slide);
   });

   /* Flechas. */
   partes.btnPrev.addEventListener("click", function () {
      const actual = Number(carrusel.dataset.indice);
      mostrarSlide(id, actual - 1);
   });

   partes.btnNext.addEventListener("click", function () {
      const actual = Number(carrusel.dataset.indice);
      mostrarSlide(id, actual + 1);
   });

   /* Puntos. */
   const listaPuntos = partes.puntos.querySelectorAll(".carrusel-punto");
   listaPuntos.forEach(function (punto, i) {
      punto.addEventListener("click", function () {
         mostrarSlide(id, i);
      });
   });

   /* Mostramos la primera diapositiva. */
   carrusel.dataset.indice = 0;
   mostrarSlide(id, 0);

   /* Si tiene intervalo, hacemos que pase solo. */
   if (intervalo > 0) {
      temporizadores[id] = setInterval(function () {
         const actual = Number(carrusel.dataset.indice);
         mostrarSlide(id, actual + 1);
      }, intervalo);
   }
}

/* Cambia el idioma de todas las diapositivas del carrusel. */
export function actualizarIdiomaCarrusel(id, idioma) {
   const carrusel = document.querySelector("#" + id);
   const slides = carrusel.querySelectorAll(".carrusel-slide");

   slides.forEach(function (slide) {
      /* Vaciamos la diapositiva y la volvemos a crear en el idioma nuevo. */
      slide.innerHTML = "";
      const contenido = slide._crearSlide(slide._dato, idioma);
      slide.appendChild(contenido);
   });
}

/* Pone el carrusel en una diapositiva concreta (se usa para el pan del día). */
export function irASlide(id, indice) {
   mostrarSlide(id, indice);
}
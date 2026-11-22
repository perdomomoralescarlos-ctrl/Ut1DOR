/*
 * carrusel.js — Carruseles de la portada con Bootstrap 5.
 *
 * Genera la estructura del componente Carousel de Bootstrap (indicadores,
 * .carousel-inner, .carousel-item y flechas). El movimiento lo gestiona
 * el bundle de Bootstrap, así que aquí no hay ni temporizadores ni
 * escuchadores propios.
 */

/* Instancias de Bootstrap para poder ir a una diapositiva concreta. */
const instancias = {};

function idiomaActual() {
   return document.documentElement.lang || "es";
}

/* Puntos de abajo: cada uno apunta a su diapositiva con data-bs-slide-to. */
function crearIndicadores(id, total) {
   const puntos = document.createElement("div");
   puntos.className = "carousel-indicators";

   for (let i = 0; i < total; i++) {
      const punto = document.createElement("button");
      punto.type = "button";
      punto.setAttribute("data-bs-target", "#" + id);
      punto.setAttribute("data-bs-slide-to", String(i));
      punto.setAttribute("aria-label", "Ir a la diapositiva " + (i + 1));

      if (i === 0) {
         punto.classList.add("active");
         punto.setAttribute("aria-current", "true");
      }

      puntos.appendChild(punto);
   }

   return puntos;
}

/* Flecha anterior o siguiente, controlada por Bootstrap. */
function crearFlecha(id, tipo, etiqueta) {
   const flecha = document.createElement("button");
   flecha.className = "carousel-control-" + tipo;
   flecha.type = "button";
   flecha.setAttribute("data-bs-target", "#" + id);
   flecha.setAttribute("data-bs-slide", tipo);

   const icono = document.createElement("span");
   icono.className = "carousel-control-" + tipo + "-icon";
   icono.setAttribute("aria-hidden", "true");

   const texto = document.createElement("span");
   texto.className = "visually-hidden";
   texto.textContent = etiqueta;

   flecha.append(icono, texto);
   return flecha;
}

/* Crea y arranca un carrusel de Bootstrap dentro del elemento indicado. */
export function iniciarCarrusel(id, datos, crearSlide, intervalo) {
   const carrusel = document.querySelector("#" + id);
   if (!carrusel) return;

   carrusel.replaceChildren();
   carrusel.appendChild(crearIndicadores(id, datos.length));

   const pista = document.createElement("div");
   pista.className = "carousel-inner";

   datos.forEach(function (dato, i) {
      const diapositiva = document.createElement("div");
      diapositiva.className = "carousel-item" + (i === 0 ? " active" : "");
      diapositiva._dato = dato;
      diapositiva._crearSlide = crearSlide;
      diapositiva.appendChild(crearSlide(dato, idiomaActual()));
      pista.appendChild(diapositiva);
   });

   carrusel.appendChild(pista);
   carrusel.appendChild(crearFlecha(id, "prev", "Anterior"));
   carrusel.appendChild(crearFlecha(id, "next", idiomaActual() === "pt" ? "Seguinte" : "Siguiente"));

   instancias[id] = new bootstrap.Carousel(carrusel, {
      interval: intervalo > 0 ? intervalo : false,
      ride: intervalo > 0 ? "carousel" : false
   });
}

/* Vuelve a pintar el contenido de todas las diapositivas en otro idioma. */
export function actualizarIdiomaCarrusel(id, idioma) {
   const carrusel = document.querySelector("#" + id);
   if (!carrusel) return;

   carrusel.querySelectorAll(".carousel-item").forEach(function (diapositiva) {
      diapositiva.replaceChildren();
      diapositiva.appendChild(diapositiva._crearSlide(diapositiva._dato, idioma));
   });
}

/* Coloca el carrusel en una diapositiva concreta (día de hoy). */
export function irASlide(id, indice) {
   const instancia = instancias[id];
   if (instancia) instancia.to(indice);
}

/*
 * temporadas.js — Datos de las diapositivas de temporada.
 *
 * Cada objeto tiene la información en español (es) y en portugués (pt).
 * Si quieres usar imagen en vez de emoji, añade: imagen: "assets/tu-foto.jpg"
 */

export let temporadas = [
   {
      clase: "slide-carnaval",
      emoji: "🎭",
      // imagen: "assets/dulces/churros.png",  // <- descomenta para usar imagen
      es: {
         fecha: "Febrero",
         titulo: "Buñuelos de Carnaval",
         texto: "Buñuelos de viento y orejas recién fritos. Solo durante los días de fiesta."
      },
      pt: {
         fecha: "Fevereiro",
         titulo: "Bolinhos de Carnaval",
         texto: "Bolinhos de vento e orelhas acabados de fritar. Só nos dias de festa."
      }
   },
   {
      clase: "slide-verano",
      emoji: "☀️",
      es: {
         fecha: "Junio – septiembre",
         titulo: "Sabores de verano",
         texto: "Pan de aceitunas y hogaza de cerveza para las mesas largas."
      },
      pt: {
         fecha: "Junho – setembro",
         titulo: "Sabores de verão",
         texto: "Pão de azeitonas e fogaça de cerveja para as mesas compridas."
      }
   },
   {
      clase: "slide-otono",
      emoji: "🍂",
      es: {
         fecha: "Septiembre – noviembre",
         titulo: "Otoño en el obrador",
         texto: "Pan de castañas, nueces y centeno. El horno vuelve a oler a leña."
      },
      pt: {
         fecha: "Setembro – novembro",
         titulo: "Outono na padaria",
         texto: "Pão de castanhas, nozes e centeio. O forno volta a cheirar a lenha."
      }
   },
   {
      clase: "slide-halloween",
      emoji: "🎃",
      es: {
         fecha: "25 octubre – 1 noviembre",
         titulo: "Halloween en el horno",
         texto: "Pan de calabaza, jengibre y canela. También buñuelos de calabaza."
      },
      pt: {
         fecha: "25 de outubro – 1 de novembro",
         titulo: "Halloween no forno",
         texto: "Pão de abóbora, gengibre e canela. Também bolinhos de abóbora."
      }
   },
   {
      clase: "slide-navidad",
      emoji: "🎄",
      es: {
         fecha: "Diciembre – 6 enero",
         titulo: "Navidad y roscón",
         texto: "Pan de Navidad, mantecados y roscón de Reyes por encargo."
      },
      pt: {
         fecha: "Dezembro – 6 de janeiro",
         titulo: "Natal e bolo-rei",
         texto: "Pão de Natal, mantecados e bolo-rei por encomenda."
      }
   }
];

/* Crea el contenido de una diapositiva de temporada. */
export function crearSlideTemporada(dato, idioma) {
   const texto = dato[idioma];

   const caja = document.createElement("div");
   caja.className = "slide-temporada " + dato.clase;

   const contenido = document.createElement("div");
   contenido.className = "slide-temporada-texto";

   const fecha = document.createElement("span");
   fecha.className = "slide-temporada-fecha";
   fecha.textContent = texto.fecha;

   const titulo = document.createElement("h3");
   titulo.textContent = texto.titulo;

   const parrafo = document.createElement("p");
   parrafo.textContent = texto.texto;

   contenido.append(fecha, titulo, parrafo);
   caja.appendChild(contenido);

   /* Si el dato tiene imagen, la mostramos. Si no, mostramos el emoji. */
   if (dato.imagen) {
      const imagen = document.createElement("img");
      imagen.className = "slide-temporada-imagen";
      imagen.src = dato.imagen;
      imagen.alt = texto.titulo;
      caja.appendChild(imagen);
   } else {
      const emoji = document.createElement("span");
      emoji.className = "slide-temporada-emoji";
      emoji.textContent = dato.emoji;
      emoji.setAttribute("aria-hidden", "true");
      caja.appendChild(emoji);
   }

   return caja;
}
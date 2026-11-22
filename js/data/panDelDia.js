/*
 * panDelDia.js — Datos del carrusel "El pan del día".
 *
 * El orden va de lunes a domingo.
 * Así podemos abrir el carrusel en el día de hoy usando new Date().getDay().
 */

export let panDelDia = [
   {
      imagen: "assets/pan/pan-con-masa-madre.jpg",
      es: { dia: "Lunes", titulo: "Hogaza de masa madre", texto: "Fermentada 24 horas, corteza crujiente y miga alveolada." },
      pt: { dia: "Segunda-feira", titulo: "Fogaça de massa-mãe", texto: "Fermentada 24 horas, crosta crocante e miolo alveolar." }
   },
   {
      imagen: "assets/pan/pan-de-centeno.jpg",
      es: { dia: "Martes", titulo: "Pan de centeno", texto: "Denso y oscuro, con harina de centeno y un toque de miel." },
      pt: { dia: "Terça-feira", titulo: "Pão de centeio", texto: "Denso e escuro, com farinha de centeio e um toque de mel." }
   },
   {
      imagen: "assets/pan/pan-de-multicereales.jpg",
      es: { dia: "Miércoles", titulo: "Pan de multicereales", texto: "Mezcla de harinas con semillas de girasol y sésamo." },
      pt: { dia: "Quarta-feira", titulo: "Pão de multicereais", texto: "Mistura de farinhas com sementes de girassol e sésamo." }
   },
   {
      imagen: "assets/pan/pan-de-millo.jpg",
      es: { dia: "Jueves", titulo: "Pan de millo", texto: "Tradicional canario, con harina de maíz, agua y sal." },
      pt: { dia: "Quinta-feira", titulo: "Pão de milho", texto: "Tradicional das Canárias, com farinha de milho, água e sal." }
   },
   {
      imagen: "assets/pan/pan-de-huevo.jpg",
      es: { dia: "Viernes", titulo: "Pan de huevo", texto: "Tierno y dorado, con harina, huevo y mantequilla." },
      pt: { dia: "Sexta-feira", titulo: "Pão de ovo", texto: "Macio e dourado, com farinha, ovo e manteiga." }
   },
   {
      imagen: "assets/pan/pan-matalauva.jpeg",
      es: { dia: "Sábado", titulo: "Pan matalauva", texto: "Aromático, con harina, anís y aceite de oliva." },
      pt: { dia: "Sábado", titulo: "Pão de matalahúva", texto: "Aromático, com farinha, anis e azeite." }
   },
   {
      imagen: "assets/pan/pan-de-leche.jpg",
      es: { dia: "Domingo", titulo: "Pan de leche", texto: "Esponjoso, con harina, leche y un toque de azúcar." },
      pt: { dia: "Domingo", titulo: "Pão de leite", texto: "Fofo, com farinha, leite e um toque de açúcar." }
   }
];

/* Esta función crea el contenido de una diapositiva del pan del día con Bootstrap. */
export function crearSlidePanDelDia(dato, idioma) {
   const texto = dato[idioma] || dato.es;

   const caja = document.createElement("div");
   caja.className = "bg-light px-5 py-5 d-flex flex-column flex-md-row align-items-center gap-4";

   const imagen = document.createElement("img");
   imagen.className = "img-fluid rounded border border-warning border-2";
   imagen.setAttribute("width", "220");
   imagen.src = dato.imagen;
   imagen.alt = texto.titulo;

   const contenido = document.createElement("div");

   const dia = document.createElement("span");
   dia.className = "badge rounded-pill bg-warning text-dark";
   dia.textContent = texto.dia;

   const titulo = document.createElement("h3");
   titulo.className = "h3 text-warning-emphasis mt-2";
   titulo.textContent = texto.titulo;

   const parrafo = document.createElement("p");
   parrafo.className = "mb-0";
   parrafo.textContent = texto.texto;

   contenido.append(dia, titulo, parrafo);
   caja.append(imagen, contenido);

   return caja;
}
/*
 * cssClassMap.js — Fuente de datos y nombres de clases CSS del proyecto.
 *
 * Este módulo centraliza el texto literal de las clases CSS (para no
 * repetirlos como cadenas sueltas en el JavaScript) y el contenido de las
 * tarjetas que se renderizan en cards.html.
 */

/* Mapa entre nombres legibles en JS y las clases reales definidas en cards.css. */
export let cardClassMap = {
   cardSection: "card-section",
   cardImageContainer: "card-image-container",
   cardImage: "card-image",
   cardContentContainer: "card-content-container",
   cardContentParagraphContainer: "card-content-paragraph-container",
   cardClosed: "card-closed",
   cardOpen: "card-open"
}

/* Datos de cada tarjeta: imagen, título y descripción. */
export let cardsContent = [
   {
      image: "assets/pan/baguete.jpg",
      title: "Baguete",
      paragraph: "Corteza crujiente de harina, agua, sal y levadura."
   },
   {
      image: "assets/pan/pan-blanco.jpg",
      title: "Pan blanco",
      paragraph: "Suave miga con harina refinada, agua y sal."
   },
   {
      image: "assets/pan/pan-con-masa-madre.jpg",
      title: "Pan con masa madre",
      paragraph: "Fermentado lento con harina, agua y cultivo vivo."
   },
   {
      image: "assets/pan/pan-de-centeno.jpg",
      title: "Pan de centeno",
      paragraph: "Denso y oscuro con harina de centeno y agua."
   },
   {
      image: "assets/pan/pan-de-huevo.jpg",
      title: "Pan de huevo",
      paragraph: "Tierno y dorado con harina, huevo y mantequilla."
   },
   {
      image: "assets/pan/pan-de-leche.jpg",
      title: "Pan de leche",
      paragraph: "Esponjoso con harina, leche y un toque de azúcar."
   },
   {
      image: "assets/pan/pan-de-millo.jpg",
      title: "Pan de millo",
      paragraph: "Tradicional con harina de maíz, agua y sal."
   },
   {
      image: "assets/pan/pan-de-multicereales.jpg",
      title: "Pan de multicereales",
      paragraph: "Mezcla de harinas con semillas de girasol y sésamo."
   },
   {
      image: "assets/pan/pan-de-soda.jpg",
      title: "Pan de soda",
      paragraph: "Rápido con harina, bicarbonato y suero de leche."
   },
   {
      image: "assets/pan/pan-integral.jpg",
      title: "Pan integral",
      paragraph: "Fibra y sabor con harina integral, agua y sal."
   },
   {
      image: "assets/pan/pan-matalauva.jpeg",
      title: "Pan matalauva",
      paragraph: "Aromático con harina, anís y aceite de oliva."
   },
   {
      image: "assets/pan/pan-sin-levadura.jpg",
      title: "Pan sin levadura",
      paragraph: "Plano y sencillo con harina, agua y sal."
   }
]

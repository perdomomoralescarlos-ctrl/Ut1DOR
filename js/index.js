import { Card } from "./card.js";
import { cardsContent } from "./cssClassMap.js"; 

/*
 * index.js — Punto de entrada de cards.html.
 * Toma los datos de cardsContent, crea una Card por cada uno, la construye
 * dentro de la galería y activa sus eventos de apertura/cierre.
 */

/* Contenedor donde se insertan todas las tarjetas. */
let section1 = document.getElementById("section1");

cardsContent.forEach((info)=>{
   let cardElement = new Card(info);
   cardElement.build(section1);
   cardElement.addEvents();
})

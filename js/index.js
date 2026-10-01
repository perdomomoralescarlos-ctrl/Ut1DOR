import { Card } from "./card.js";
import { panes } from "./data/panes.js";
import { dulces } from "./data/dulces.js";
import { empanadas } from "./data/empanadas.js";

/*
 * index.js — Punto de entrada de cards.html.
 * Toma los datos de cada tipo de producto, crea una Card por cada uno, la
 * construye dentro de la galería y activa sus eventos de apertura/cierre.
 */

/* Todos los productos de la galería, agrupados por tipo. */
let productsContent = [...panes, ...dulces, ...empanadas];

/* Contenedor donde se insertan todas las tarjetas. */
let section1 = document.getElementById("section1");

productsContent.forEach((info)=>{
   let cardElement = new Card(info);
   cardElement.build(section1);
   cardElement.addEvents();
})

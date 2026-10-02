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

/* Contenedor donde se insertan todas las tarjetas. */
let panaderia = document.getElementById("panaderia");
let dulceria = document.getElementById("dulceria")
let empanadasElement = document.getElementById("empanadas")


const sectionsArray = [panaderia, dulceria, empanadasElement]
const productArray = [panes, dulces, empanadas]

function listRender(list, section){
   list.forEach((info)=>{
      let cardElement = new Card(info);
      cardElement.build(section);
      cardElement.addEvents();
   })
}

for(let i = 0;
    i<sectionsArray.length;
    i++){
   
   listRender(productArray[i], sectionsArray[i])
}


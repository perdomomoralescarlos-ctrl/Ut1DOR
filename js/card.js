import { C } from "./cssClassMap.js";

/*
 * Card — representa una tarjeta de pan de la galería.
 *
 * En el constructor se crean los nodos del DOM (sin insertarlos todavía).
 * build() los ensambla y los agrega al contenedor recibido, y addEvents()
 * registra la apertura/cierre de la tarjeta al pasar el mouse.
 */
export class Card {
   /* Crea los elementos del DOM a partir de los datos de la tarjeta. */
   constructor(cardInfo){
      /* Datos de la tarjeta: imagen, título y descripción. */
      this._cardInfo = cardInfo;

      /* Contenedor principal; nace cerrado. */
      this._column = document.createElement("div")
      this._column.classList.add(C.col);

      /* Contenedor del texto (título + descripción). */
      this._card = document.createElement("div")
      this._card.classList.add(C.card, C.cardSection, C.cardClosed);

      this._image = document.createElement("img")
      this._image.classList.add(C.cardImgTop, C.cardImage)

      this._body = document.createElement("div")
      this._body.classList.add(C.cardBody)

      this._title = document.createElement("h4");
      this._title.classList.add(C.cardTitle)

      this._paragraph = document.createElement("p");
      this._paragraph.classList.add(C.cardText)
   }

   /* Ensambla los nodos y los inserta dentro de `element`. */
   build(element){
      this._title.textContent = this._cardInfo.title;
      this._paragraph.textContent = this._cardInfo.paragraph;

      this._image.setAttribute("src", this._cardInfo.image);
      this._image.setAttribute("alt", this._cardInfo.title);

      this._body.append(this._title, this._paragraph);
      this._card.append(this._image, this._body);
      this._column.appendChild(this._card);
      element.appendChild(this._column);
   }

   /* Expande la tarjeta al entrar el mouse y la cierra al salir. */
   addEvents(){
      this._section.addEventListener("mouseenter", ()=>{
	 this._card.classList.replace(C.cardClosed, C.cardOpen);
      });

      this._section.addEventListener("mouseleave", ()=>{
	 this._card.classList.replace(C.cardOpen, C.cardClosed);
      });
   }

}

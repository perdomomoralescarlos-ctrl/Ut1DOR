import { cardClassMap } from "./cssClassMap.js";

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
      this._section = document.createElement("div")
      this._section.classList.add(cardClassMap.cardSection, cardClassMap.cardClosed);

      /* Contenedor del texto (título + descripción). */
      this._contentContainer = document.createElement("div")
      this._contentContainer.classList.add(cardClassMap.cardContentContainer);

      this._title = document.createElement("h4");
      this._paragraph = document.createElement("p");
      this._paragraphContainer = document.createElement("div")
      this._paragraphContainer.classList.add(cardClassMap.cardContentParagraphContainer)

      /* Contenedor de la imagen. */
      this._imageContainer = document.createElement("div")
      this._imageContainer.classList.add(cardClassMap.cardImageContainer)

      this._image = document.createElement("img")
      this._image.classList.add(cardClassMap.cardImage)

   }

   /* Ensambla los nodos y los inserta dentro de `element`. */
   build(element){
      this._title.innerText = this._cardInfo.title;
      this._paragraph.innerText = this._cardInfo.paragraph;

      this._image.setAttribute("src", this._cardInfo.image);

      this._imageContainer.appendChild(this._image);
      this._section.appendChild(this._imageContainer);

      this._paragraphContainer.appendChild(this._paragraph);

      this._contentContainer.appendChild(this._title);
      this._contentContainer.appendChild(this._paragraphContainer);

      this._section.appendChild(this._contentContainer);

      element.appendChild(this._section);
   }

   /* Expande la tarjeta al entrar el mouse y la cierra al salir. */
   addEvents(){
      this._section.addEventListener("mouseenter", ()=>{
	 this._section.classList.add(cardClassMap.cardOpen);
	 this._section.classList.remove(cardClassMap.cardClosed);
      });

      this._section.addEventListener("mouseleave", ()=>{
	 this._section.classList.remove(cardClassMap.cardOpen);
	 this._section.classList.add(cardClassMap.cardClosed);
      });
   }

}

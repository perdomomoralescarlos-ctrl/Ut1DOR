import { cardClassMap } from "./cssClassMap.js";

/* Contador para dar un id único al título de cada tarjeta. */
let cardCounter = 0;

/*
 * Card — representa una tarjeta de pan de la galería.
 *
 * En el constructor se crean los nodos del DOM (sin insertarlos todavía).
 * build() los ensambla y los agrega al contenedor recibido, y addEvents()
 * registra la apertura/cierre de la tarjeta al pasar el mouse o al recibir
 * el foco. La tarjeta es contenido, no un control: se puede recorrer con el
 * teclado y su título/descripción los lee el lector de pantalla sin abrirla.
 */
export class Card {
   /* Crea los elementos del DOM a partir de los datos de la tarjeta. */
   constructor(cardInfo){
      /* Datos de la tarjeta: imagen, título y descripción. */
      this._cardInfo = cardInfo;

      /* Contenedor principal; nace cerrado. */
      this._section = document.createElement("article")
      this._section.classList.add(cardClassMap.cardSection, cardClassMap.cardClosed);

      /* Contenedor del texto (título + descripción). */
      this._contentContainer = document.createElement("div")
      this._contentContainer.classList.add(cardClassMap.cardContentContainer);

      this._title = document.createElement("h3");
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
      this._image.setAttribute("alt", "");

      /*
       * Accesibilidad. La tarjeta es contenido, no un control: no se anuncia
       * como botón ni hay que activarla para leerla.
       *  - tabindex="0": Tab recorre las tarjetas en el orden del DOM, que es
       *    el orden en que renderCards() las inserta; Shift+Tab retrocede.
       *  - aria-labelledby: cada tarjeta se anuncia por el título (<h3>).
       */
      const titleId = `card-title-${++cardCounter}`;
      this._title.setAttribute("id", titleId);
      this._section.setAttribute("tabindex", "0");
      this._section.setAttribute("aria-labelledby", titleId);

      this._imageContainer.appendChild(this._image);
      this._section.appendChild(this._imageContainer);

      this._paragraphContainer.appendChild(this._paragraph);

      this._contentContainer.appendChild(this._title);
      this._contentContainer.appendChild(this._paragraphContainer);

      this._section.appendChild(this._contentContainer);

      element.appendChild(this._section);
   }

   /*
    * Muestra la tarjeta al entrar el mouse o al recibir el foco (teclado), y
    * la cierra al salir. Es puramente estético: no cambia la semántica ni el
    * contenido. El texto nunca se oculta a la accesibilidad (overflow solo lo
    * recorta a la vista), así que un lector de pantalla lee título y
    * descripción sin necesidad de abrir la tarjeta.
    */
   addEvents(){
      const sync = () => {
         const visible = this._section.matches(":hover") || this._section.matches(":focus");
         this._section.classList.toggle(cardClassMap.cardOpen, visible);
         this._section.classList.toggle(cardClassMap.cardClosed, !visible);
      };

      this._section.addEventListener("mouseenter", sync);
      this._section.addEventListener("mouseleave", sync);
      this._section.addEventListener("focus", sync);
      this._section.addEventListener("blur", sync);
   }

}

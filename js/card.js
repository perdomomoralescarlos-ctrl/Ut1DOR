import { cardClassMap } from "./cssClassMap.js?v=3";

/* Contador para dar un id único al título de cada tarjeta. */
let cardCounter = 0;

/*
 * Card — representa una tarjeta de producto de la galería.
 *
 * La tarjeta se construye con las clases de Bootstrap (columnas, tarjeta,
 * imagen y cuerpo) definidas en cssClassMap.js. build() ensambla los nodos y
 * los agrega al contenedor recibido.
 */
export class Card {
   /* Crea los elementos del DOM a partir de los datos de la tarjeta. */
   constructor(cardInfo){
      /* Datos de la tarjeta: imagen, título y descripción. */
      this._cardInfo = cardInfo;

      /* Columna de la rejilla de Bootstrap. */
      this._column = document.createElement("div");
      this._column.className = cardClassMap.cardColumn;

      /* Tarjeta de Bootstrap. */
      this._section = document.createElement("article");
      this._section.className = cardClassMap.cardSection;

      /* Contenedor de la imagen con proporción fija. */
      this._imageContainer = document.createElement("div");
      this._imageContainer.className = cardClassMap.cardImageContainer;

      this._image = document.createElement("img");
      this._image.className = cardClassMap.cardImage;

      /* Cuerpo de la tarjeta: título y descripción. */
      this._contentContainer = document.createElement("div");
      this._contentContainer.className = cardClassMap.cardContentContainer;

      this._title = document.createElement("h3");
      this._title.className = cardClassMap.cardTitle;

      this._paragraphContainer = document.createElement("div");
      this._paragraphContainer.className = cardClassMap.cardContentParagraphContainer;

      this._paragraph = document.createElement("p");
      this._paragraph.className = cardClassMap.cardParagraph;
   }

   /* Ensambla los nodos y los inserta dentro de `element`. */
   build(element){
      this._title.innerText = this._cardInfo.title;
      this._paragraph.innerText = this._cardInfo.paragraph;

      this._image.setAttribute("src", this._cardInfo.image);
      // El nombre del producto identifica la imagen para lectores de pantalla.
      this._image.setAttribute("alt", this._cardInfo.title);

      /*
       * Accesibilidad. La tarjeta es contenido, no un control: no se anuncia
       * como botón ni hay que activarla para leerla.
       *  - id: etiqueta única de cada elemento en el DOM para que la tecnología
       *    ARIA pueda apuntar a los elementos con dicho id.
       *  - aria-labelledby: el nombre accesible de la tarjeta es el texto del
       *    <h3>, de modo que al tabular se anuncia el nombre del producto.
       *  - aria-describedby: apunta al id del párrafo, que se lee como
       *    descripción de la tarjeta.
       *  - tabindex="0": Tab recorre las tarjetas en el orden del DOM y anuncia
       *    nombre e ingredientes en una sola parada.
       */
      const cardId = ++cardCounter;
      const titleId = `card-title-${cardId}`;
      const paragraphId = `card-paragraph-${cardId}`;
      this._title.setAttribute("id", titleId);
      this._paragraph.setAttribute("id", paragraphId);
      this._section.setAttribute("tabindex", "0");
      this._section.setAttribute("aria-labelledby", titleId);
      this._section.setAttribute("aria-describedby", paragraphId);

      this._imageContainer.appendChild(this._image);
      this._section.appendChild(this._imageContainer);

      this._paragraphContainer.appendChild(this._paragraph);

      this._contentContainer.appendChild(this._title);
      this._contentContainer.appendChild(this._paragraphContainer);

      this._section.appendChild(this._contentContainer);

      this._column.appendChild(this._section);
      element.appendChild(this._column);
   }
}

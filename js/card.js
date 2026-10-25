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

      /* Contenedor principal (componente .card de Bootstrap); nace cerrado. */
      this._section = document.createElement("article")
      this._section.classList.add(
         cardClassMap.card,
         cardClassMap.cardSection,
         cardClassMap.cardClosed
      );

      /* Cuerpo de la tarjeta (.card-body): título + descripción. */
      this._contentContainer = document.createElement("div")
      this._contentContainer.classList.add(cardClassMap.cardContentContainer);

      this._title = document.createElement("h3");
      this._title.classList.add(cardClassMap.cardTitle);

      this._paragraph = document.createElement("p");
      this._paragraph.classList.add(cardClassMap.cardText);

      this._paragraphContainer = document.createElement("div")
      this._paragraphContainer.classList.add(cardClassMap.cardContentParagraphContainer)

      /* Imagen de la tarjeta (.card-img-top de Bootstrap). */
      this._image = document.createElement("img")
      this._image.classList.add(cardClassMap.cardImageTop, cardClassMap.cardImage);

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
       *  - id: etiqueta única de cada elemento en el DOM. Sirve para la tecnología 
       *  ARIA apunte a los elemntos con dicho id
       *  - aria-labelledby: el nombre accesible de la tarjeta es el texto del
       *    <h3>, de modo que al tabular se anuncia el nombre del plato. Al 
       *    apuntar a un elemento mediante su ID, dicho elemento se convierte en 
       *    el "nombre" del elemento que tiene este atributo, en este caso, el h3.
       *  - aria-describedby: de forma similar al anterior, apunta al id de un elemento,
       *    que se lee como la descripción del elemento con este atributo, en este caso, el elemento p
       *  - tabindex="0": Tab recorre las tarjetas en el orden del DOM; al
       *    recibir el foco se anuncian nombre e ingredientes en una sola parada.
       */
      const cardId = ++cardCounter;
      const titleId = `card-title-${cardId}`;
      const paragraphId = `card-paragraph-${cardId}`;
      this._title.setAttribute("id", titleId);
      this._paragraph.setAttribute("id", paragraphId);
      this._section.setAttribute("tabindex", "0");
      this._section.setAttribute("aria-labelledby", titleId);
      this._section.setAttribute("aria-describedby", paragraphId);

      this._section.appendChild(this._image);

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

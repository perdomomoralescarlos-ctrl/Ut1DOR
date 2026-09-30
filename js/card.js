import { cardClassMap } from "./cssClassMap.js";

export class Card {
   constructor(cardInfo){
      this._cardInfo = cardInfo;

      this._section = document.createElement("section")
      this._section.classList.add(cardClassMap.cardSection, cardClassMap.cardClosed);

      this._contentContainer = document.createElement("div")
      this._contentContainer.classList.add(cardClassMap.cardContentContainer);

      this._title = document.createElement("h4");
      this._paragraph = document.createElement("p");
      this._paragraphContainer = document.createElement("div")
      this._paragraphContainer.classList.add(cardClassMap.cardContentParagraphContainer)

      this._imageContainer = document.createElement("div")
      this._imageContainer.classList.add(cardClassMap.cardImageContainer)

      this._image = document.createElement("img")
      this._image.classList.add(cardClassMap.cardImage)

   }

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

   addEvents(){
      this._section.addEventListener("mouseenter", ()=>{
	 this._section.classList.add("card-open");
	 this._section.classList.remove("card-closed");
      });

      this._section.addEventListener("mouseleave", ()=>{
	 this._section.classList.remove("card-open");
	 this._section.classList.add("card-closed");
      });
   }

}

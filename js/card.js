export class Card {
   constructor(element){
      this._element = element;
      this._contentContainer = this._element.querySelector("card-content-container");
   }

   build(){
      this._element.addEventListener("mouseenter", ()=>{
	 this._contentContainer.classList.remove("non-visible")
      });

      this._element.addEventListener("mouseleave", ()=>{
	 this._contentContainer.classList.add("non-visible")
      });
   }

}

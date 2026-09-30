import { cardClassMap } from "./cssClassMap.js";

function cardElementGenerator(cardInfo){
   let cardElement = document.createElement("section");
   cardElement.classList.add(cardClassMap.cardSection, cardClassMap.nonVisible);
}

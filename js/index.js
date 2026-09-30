import { Card } from "./card.js";
import { cardsContent } from "./cssClassMap.js"; 

let section1 = document.getElementById("section1");

cardsContent.forEach((info)=>{
   let cardElement = new Card(info);
   cardElement.build(section1);
   cardElement.addEvents();
})

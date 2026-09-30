import { Card } from "./card.js";

let elementCardList = document.querySelectorAll(".card-section");
let cardList = [];

elementCardList.forEach((elementCard) => {
   let card = new Card(elementCard);
   card.build();
   cardList.push(card);
})

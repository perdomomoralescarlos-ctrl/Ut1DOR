import { Card } from "./card.js";
import { panes } from "./data/panes.js";
import { dulces } from "./data/dulces.js";
import { empanadas } from "./data/empanadas.js";

/* Punto de entrada de index.html: traduce la interfaz y renderiza las tarjetas. */

/* Todos los productos de la galería, agrupados por tipo. */

/* Contenedor donde se insertan todas las tarjetas. */
let panaderia = document.getElementById("panaderia");
let dulceria = document.getElementById("dulceria")
let empanadasElement = document.getElementById("empanadas")


const sectionsArray = [panaderia, dulceria, empanadasElement];
const productArray = [panes, dulces, empanadas];

const translations = {
   es: {
      navInicio: "Inicio", navPanaderia: "Panadería", navPasteleria: "Dulceria",
      navEmpanadas: "Empanadas", navContacto: "Contacto", seccionPanaderia: "Panadería",
      seccionDulceria: "Dulcería", seccionEmpanadas: "Empanadas", horarios: "Horarios",
      sabado: "Lunes a sábado: 8:00 - 12:00 / 16:00 - 20:30", domingo: "Domingo: 8:00 - 13:00",
      contactos: "Contacto"
   },
   pt: {
      navInicio: "Início", navPanaderia: "Padaria", navPasteleria: "Doçaria",
      navEmpanadas: "Empanadas", navContacto: "Contacto", seccionPanaderia: "Padaria",
      seccionDulceria: "Doçaria", seccionEmpanadas: "Empanadas", horarios: "Horário",
      sabado: "Segunda-feira a sábado: 8:00 - 12:00 / 16:00 - 20:30", domingo: "Domingo: 8:00 - 13:00",
      contactos: "Contato"
   }
};

function renderCards(language) {
   sectionsArray.forEach((section, index) => {
      section.replaceChildren();
      productArray[index].forEach((info) => {
         const localizedInfo = language === "pt"
            ? { ...info, title: info.titlePt, paragraph: info.paragraphPt }
            : info;
         const card = new Card(localizedInfo);
         card.build(section);
         card.addEvents();
      });
   });
}

function changeLanguage(language) {
   document.documentElement.lang = language;
   document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = translations[language][element.dataset.i18n];
   });
   document.querySelectorAll(".lang-btn").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.lang === language));
   });
   renderCards(language);
   localStorage.setItem("idioma", language);
}

document.querySelectorAll(".lang-btn").forEach((button) => {
   button.addEventListener("click", () => changeLanguage(button.dataset.lang));
});

changeLanguage(localStorage.getItem("idioma") === "pt" ? "pt" : "es");


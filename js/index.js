import { Card } from "./card.js?v=2";
import { panes } from "./data/panes.js";
import { dulces } from "./data/dulces.js";
import { empanadas } from "./data/empanadas.js";
import { iniciarCarrusel, actualizarIdiomaCarrusel, irASlide } from "./carrusel.js";
import { panDelDia, crearSlidePanDelDia } from "./data/panDelDia.js";

/* Punto de entrada de index.html: traduce la interfaz y renderiza las tarjetas. */

/* Todos los productos de la galería, agrupados por tipo. */

/* Contenedor donde se insertan todas las tarjetas. */
let panaderia = document.querySelector("#panaderia .card-gallery");
let dulceria = document.querySelector("#dulceria .card-gallery");
let empanadasElement = document.querySelector("#empanadas .card-gallery");


const sectionsArray = [panaderia, dulceria, empanadasElement];
const productArray = [panes, dulces, empanadas];
/* Iniciamos el carrusel del pan del día (no cambia solo, intervalo 0). */
iniciarCarrusel("carruselPanDelDia", panDelDia, crearSlidePanDelDia, 0);

/* Abrir el pan del día en el día de hoy.
   getDay(): 0=domingo, 1=lunes, ..., 6=sábado */
const diaHoy = new Date().getDay();
let indiceHoy = diaHoy - 1;
if (indiceHoy < 0) {
   indiceHoy = 6; // domingo
}
irASlide("carruselPanDelDia", indiceHoy);

const translations = {
   es: {
      navInicio: "Inicio", navPanaderia: "Panadería", navPasteleria: "Dulcería",
      navEmpanadas: "Empanadas", navContacto: "Contacto", seccionPanaderia: "Panadería",
      seccionDulceria: "Dulcería", seccionEmpanadas: "Empanadas", horarios: "Horarios",
      sabado: "Lunes a sábado: 8:00 - 12:00 / 16:00 - 20:30", domingo: "Domingo: 8:00 - 13:00",
      contactos: "Contacto",
      seccionPanDelDia: "El pan del día"
   },
   pt: {
      navInicio: "Início", navPanaderia: "Padaria", navPasteleria: "Doçaria",
      navEmpanadas: "Empanadas", navContacto: "Contacto", seccionPanaderia: "Padaria",
      seccionDulceria: "Doçaria", seccionEmpanadas: "Empanadas", horarios: "Horário",
      sabado: "Segunda-feira a sábado: 8:00 - 12:00 / 16:00 - 20:30", domingo: "Domingo: 8:00 - 13:00",
      contactos: "Contato",
      seccionPanDelDia: "O pão do dia"
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
   
   actualizarIdiomaCarrusel("carruselPanDelDia", language);
}

document.querySelectorAll(".lang-btn").forEach((button) => {
   button.addEventListener("click", () => changeLanguage(button.dataset.lang));
});

const savedLanguage = localStorage.getItem("idioma");
//Detecta que idioma esta seleccionado actualmente.
const browserLanguage = navigator.language.toLowerCase().startsWith("pt") ? "pt" : "es";
const initialLanguage = savedLanguage === "pt" || savedLanguage === "es"
   ? savedLanguage
   : browserLanguage;
//changeLanguage actualiza el atributo lang en index.html y el contenido traducido.
changeLanguage(initialLanguage);

import { Card } from "./card.js?v=3";
import { panes } from "./data/panes.js";
import { dulces } from "./data/dulces.js";
import { empanadas } from "./data/empanadas.js";
import { iniciarCarrusel, actualizarIdiomaCarrusel, irASlide } from "./carrusel.js";
import { panDelDia, crearSlidePanDelDia } from "./data/panDelDia.js";

/* Punto de entrada de index.html: traduce la interfaz y renderiza las tarjetas. */

/* Todos los productos de la galería, agrupados por tipo. */

/* Contenedor donde se insertan todas las tarjetas. */
let panaderia = document.querySelector("#panaderia .row");
let dulceria = document.querySelector("#dulceria .row");
let empanadasElement = document.querySelector("#empanadas .row");


const sectionsArray = [panaderia, dulceria, empanadasElement];
const productArray = [panes, dulces, empanadas];

/* Carrusel del pan del día (no cambia solo, intervalo 0). */
iniciarCarrusel("carruselPanDelDia", panDelDia, crearSlidePanDelDia, 0);

/* Abrir el pan del día en el día de hoy (0=domingo, 1=lunes...). */
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
      contactos: "Contacto", story: "Nuestra historia",
      storyP1: "Migas Amigas nació del gusto por el pan recién hecho y las recetas de siempre. Cada jornada empieza temprano, mezclando ingredientes sencillos y compartiendo el aroma del horno con el vecindario.",
      storyP2: "Con el tiempo, a los panes se sumaron dulces y empanadas caseras. La idea sigue siendo la misma: ofrecer productos hechos con cariño y convertir cada visita en un momento cercano.",
      storyImageAlt: "Elaboración de pan en Migas Amigas",
      surroundings: "Nuestro entorno",
      surroundingsP1: "Migas Amigas se encuentra en un pequeño pueblo cerca de la frontera entre España y Portugal, rodeado de campos, caminos tranquilos y casas de piedra.",
      surroundingsP2: "La mezcla de tradiciones de ambos lados de la frontera se nota en la vida del pueblo y también inspira algunas de nuestras recetas. Es un lugar apacible, donde vecinos y viajeros paran a conversar y llevarse algo recién horneado.",
      surroundingsImageAlt: "Paisaje rural cerca de la frontera entre España y Portugal",
      seccionPanDelDia: "El pan del día"
   },
   pt: {
      navInicio: "Início", navPanaderia: "Padaria", navPasteleria: "Doçaria",
      navEmpanadas: "Empanadas", navContacto: "Contacto", seccionPanaderia: "Padaria",
      seccionDulceria: "Doçaria", seccionEmpanadas: "Empanadas", horarios: "Horário",
      sabado: "Segunda-feira a sábado: 8:00 - 12:00 / 16:00 - 20:30", domingo: "Domingo: 8:00 - 13:00",
      contactos: "Contato", story: "A nossa história",
      storyP1: "A Migas Amigas nasceu do gosto pelo pão acabado de fazer e pelas receitas de sempre. Cada dia começa cedo, com ingredientes simples e o aroma do forno a espalhar-se pela vizinhança.",
      storyP2: "Com o tempo, aos pães juntaram-se doces e empadas caseiras. A ideia continua a ser a mesma: oferecer produtos feitos com carinho e tornar cada visita num momento próximo.",
      storyImageAlt: "Preparação de pão na Migas Amigas",
      surroundings: "O nosso ambiente",
      surroundingsP1: "A Migas Amigas fica numa pequena aldeia perto da fronteira entre Espanha e Portugal, rodeada de campos, caminhos tranquilos e casas de pedra.",
      surroundingsP2: "A mistura de tradições dos dois lados da fronteira sente-se na vida da aldeia e também inspira algumas das nossas receitas. É um lugar tranquilo, onde moradores e viajantes param para conversar e levar algo acabado de sair do forno.",
      surroundingsImageAlt: "Paisagem rural perto da fronteira entre Espanha e Portugal",
      seccionPanDelDia: "O pão do dia"
   }
};

function renderCards(language) {
   sectionsArray.forEach((section, index) => {
      if (!section) return;
      section.replaceChildren();
      productArray[index].forEach((info) => {
         const localizedInfo = language === "pt"
            ? { ...info, title: info.titlePt, paragraph: info.paragraphPt }
            : info;
         const card = new Card(localizedInfo);
         card.build(section);
      });
   });
}

function changeLanguage(language) {
   document.documentElement.lang = language;
   document.querySelectorAll("[data-i18n]").forEach((element) => {
      const translation = translations[language][element.dataset.i18n];
      if (translation) element.textContent = translation;
   });
   document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
      const translation = translations[language][element.dataset.i18nAlt];
      if (translation) element.alt = translation;
   });
   document.querySelectorAll(".lang-btn").forEach((button) => {
      const active = button.dataset.lang === language;
      button.setAttribute("aria-pressed", String(active));
      button.classList.toggle("active", active);
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

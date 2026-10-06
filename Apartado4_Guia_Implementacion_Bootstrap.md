# Apartado 4: Guía de implementación — Reimplementación con Bootstrap 5.3

> **Documento de guía, no de código.** Este archivo describe *cómo* migrar la
> página a Bootstrap paso a paso. No modifica `index.html`, `css/` ni `js/`.
> Los fragmentos incluidos son plantillas de referencia para aplicar en cada paso.

---

## 0. Cómo usar esta guía

1. Lee la sección **1–5** completa antes de editar nada (contexto y decisiones).
2. Aplica los pasos **6 → 11** en orden. Cada paso indica el archivo, el estado
   actual y el estado objetivo.
3. La sección **12–14** son correcciones transversales (rutas, accesibilidad,
   responsive) que aplican durante los pasos anteriores.
4. Antes de dar por cerrada la tarea, ejecuta la **checklist de verificación**
   (sección 15).

---

## 1. Objetivo y alcance

Reimplementar la página principal (`index.html`) usando **Bootstrap 5.3**,
eliminando la maquetación con `<table>` y el CSS de layout propio, **manteniendo**:

- El renderizado de tarjetas por JavaScript a partir de los datos en `js/data/`.
- La interacción de **expandir / replegar** la tarjeta al pasar el ratón.
- El **selector de idioma ES/PT** con persistencia en `localStorage`.
- El **aspecto visual actual** (paleta naranja), no la de la Guía de Estilos.

**Fuera de alcance:** `cards.html`, la carpeta `ejemplo/` y los datos de producto.

---

## 2. Decisiones fijadas

| Tema | Decisión |
| --- | --- |
| Archivos | Solo `index.html` (más ajustes mínimos en `js/card.js`, `js/cssClassMap.js`, `css/index.css`, `css/cards.css`) |
| Bootstrap | 5.3 por **CDN** |
| Tarjetas | Render por JS, adaptando las clases al grid de Bootstrap |
| Colores | Los reales actuales (`#ce6300`, `#b95a00`, `#d37300`, `#FFF8E7`, `#fbbb25`, `#f9a019`) |
| Interacción tarjeta | Se mantiene `card-closed` / `card-open` con `mouseenter` / `mouseleave` |
| Layout | Se elimina `<table>` y se sustituye por HTML semántico + Bootstrap |
| JS | **Módulos mínimos**: constantes, componente tarjeta y orquestador |

---

## 3. Inventario de archivos

**Se modifican:**
- `index.html` — estructura completa a Bootstrap.
- `js/cssClassMap.js` — añadir/quitar nombres de clases.
- `js/card.js` — adaptar el DOM generado a `.col` + `.card`.
- `css/index.css` — eliminar layout propio, definir tema naranja.
- `css/cards.css` — adaptar dimensiones y conservar hover-expand.
cacct
**No se tocan:**
- `js/index.js` — la lógica (i18n, `localStorage`, agrupación de datos) no cambia.
  Solo se verifica que los `id` de los contenedores sigan existiendo.
- `js/data/*.js` — datos intactos.
- `cards.html`, `ejemplo/`, `assets/` — intactos (las imágenes ya existen).

---

## 4. Dependencias y orden de carga

### 4.1 CDN de Bootstrap 5.3

En el `<head>` de `index.html`, **antes** de los CSS propios:

```html
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
  rel="stylesheet">
```

Antes de `</body>`, **antes** del script de la app:

```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
```

> El bundle incluye Popper y es necesario para que funcione el botón
> hamburguesa del navbar (`data-bs-toggle="collapse"`).
>
> Si necesitas *Subresource Integrity* (SRI), copia el `<link>`/`<script>` con
> `integrity` y `crossorigin` directamente del snippet oficial de
> <https://getbootstrap.com/docs/5.3/getting-started/introduction/> para no
> arriesgar un hash incorrecto que bloquee el recurso.

### 4.2 Orden final en `index.html`

```
<head>
  <meta ...>
  <title>...</title>
  <link fonts Rouge Script>          ← se mantiene
  <link bootstrap.min.css>           ← NUEVO (primero)
  <link css/index.css>               ← después de Bootstrap
  <link css/cards.css>               ← al final
</head>
<body>
  ... markup ...
  <script bootstrap.bundle.min.js>   ← NUEVO (antes del módulo)
  <script js/index.js type="module"> ← se mantiene, al final
</body>
```

**Regla clave:** los CSS propios **siempre después** de Bootstrap. Así los
overrides de tema y la animación de tarjetas ganan en la cascada (misma
especificidad → gana el último).

---

## 5. Módulos JS: diseño mínimo

Se mantienen **tres módulos pequeños y con una sola responsabilidad**. No se
crean carpetas ni frameworks nuevos.

| Módulo | Responsabilidad única | ¿Cambia? |
| --- | --- | --- |
| `js/cssClassMap.js` | Diccionario de nombres de clase (evita strings sueltos) | Sí |
| `js/card.js` | Construir el DOM de **una** tarjeta y gestionar su hover | Sí |
| `js/index.js` | Orquestar: leer datos, traducir, limpiar y renderizar | No (lógica) |

**Principios para que sigan siendo mínimos:**
- `card.js` no conoce los datos ni el idioma: recibe un objeto ya "localizado".
- `cssClassMap.js` no importa nada y no tiene lógica.
- `index.js` no crea nodos a mano: solo instancia `Card` y llama `build()`/`addEvents()`.
- Nada de estado global compartido más allá del `localStorage` ya existente.

---

## 6. Paso 1 — Reestructurar `index.html`

### 6.1 Objetivo

Eliminar la `<table role="presentation">`, los `<tr>`/`<td>` y sustituirlos por
`<header>`, `<main>`, `<section>` y `<footer>` con clases Bootstrap. **Conservar**
todos los `id` (`inicio`, `panaderia`, `dulceria`, `empanadas`, `contacto`), los
atributos `data-i18n` y los `href="#..."` de las anclas.

### 6.2 Header → navbar

**Estado actual:** `<header id="inicio">` con `.logo`, `.nav` y `.lang-selector`,
todo dentro de una celda de tabla.

**Estado objetivo:**

```html
<header id="inicio" class="navbar navbar-expand-lg sticky-top">
  <div class="container">

    <a class="navbar-brand logo" href="#inicio">Migas Amigas</a>

    <button class="navbar-toggler" type="button"
            data-bs-toggle="collapse" data-bs-target="#navPrincipal"
            aria-controls="navPrincipal" aria-expanded="false"
            aria-label="Abrir menú de navegación">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navPrincipal">
      <ul class="navbar-nav mx-auto">
        <li class="nav-item"><a class="nav-link" href="#inicio"     data-i18n="navInicio">Inicio</a></li>
        <li class="nav-item"><a class="nav-link" href="#panaderia"  data-i18n="navPanaderia">Panadería</a></li>
        <li class="nav-item"><a class="nav-link" href="#dulceria"   data-i18n="navPasteleria">Dulcería</a></li>
        <li class="nav-item"><a class="nav-link" href="#empanadas"  data-i18n="navEmpanadas">Empanadas</a></li>
        <li class="nav-item"><a class="nav-link" href="#contacto"   data-i18n="navContacto">Contacto</a></li>
      </ul>

      <div class="lang-selector d-flex gap-2">
        <!-- se conservan los dos <button class="lang-btn" data-lang="es|pt"> con sus SVG -->
      </div>
    </div>

  </div>
</header>
```

Notas:
- `navbar-expand-lg` hace que en móvil el contenido colapse tras el botón hamburguesa.
- Añade `data-bs-theme="dark"` al `<nav>` (o usa `navbar-dark`) para que el icono
  del toggler se vea claro sobre el fondo naranja.
- El selector de idioma va **dentro** del `collapse` para que también sea
  accesible en móvil.
- No cambies los `data-lang`, `aria-pressed` ni los `title` de los botones: el JS
  los usa tal cual.

### 6.3 Main y secciones

**Estado actual:** `<main>` dentro de `<td>`, con 3 `<section class="card-gallery-container">`
y un `<div class="card-gallery" id="...">` vacío por sección.

**Estado objetivo:**

```html
<main class="container py-4">

  <section class="card-gallery-container">
    <h3 class="text-center text-uppercase" data-i18n="seccionPanaderia">Panadería</h3>
    <div id="panaderia" class="card-gallery row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4"></div>
  </section>

  <section class="card-gallery-container">
    <h3 class="text-center text-uppercase" data-i18n="seccionDulceria">Dulcería</h3>
    <div id="dulceria" class="card-gallery row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4"></div>
  </section>

  <section class="card-gallery-container">
    <h3 class="text-center text-uppercase" data-i18n="seccionEmpanadas">Empanadas</h3>
    <div id="empanadas" class="card-gallery row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4"></div>
  </section>

</main>
```

Notas:
- `row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4` reproduce el grid de 3 columnas
  y su salto a 1 columna en móvil (equivalente al `@media` actual).
- Añade `align-items-start` al `.card-gallery` para que una tarjeta abierta no
  estire (stretch) a sus vecinas de la fila.
- **No cambies los `id`**: `js/index.js` hace `getElementById` de esos tres.

### 6.4 Footer

**Estado actual:** `.footer` > `.footer-container` (flex) > 3 `.footer-section`.

**Estado objetivo:**

```html
<footer class="footer" id="contacto">
  <div class="container">
    <div class="row g-4">

      <div class="col-12 col-md-4">
        <div class="footer-brand">Migas Amigas</div>
        <p class="footer-tagline">¡El sabor de lo tradicional!</p>
        <div class="footer-socials">
          <a href="https://www.instagram.com/..." target="_blank" rel="noopener">
            <img src="assets/capital/insta.png" alt="Instagram" class="social-icon">
          </a>
          <a href="https://www.facebook.com/..." target="_blank" rel="noopener">
            <img src="assets/capital/face.png" alt="Facebook" class="social-icon">
          </a>
        </div>
      </div>

      <div class="col-12 col-md-4">
        <h4 data-i18n="horarios">Horarios</h4>
        <p data-i18n="sabado">Lunes a sábado: 8:00 - 12:00 / 16:00 - 20:30</p>
        <p data-i18n="domingo">Domingo: 8:00 - 13:00</p>
      </div>

      <div class="col-12 col-md-4">
        <h4 data-i18n="contactos">Contacto</h4>
        <p>C/Dr. Joaquín Artiles, 18, 35260 Agüimes, Las Palmas, Spain</p>
        <p>+34 7596572369</p>
        <p>Correo: pedidos@migasamigas.com</p>
      </div>

    </div>

    <div class="footer-copyright">
      © 2026 Migas Amigas. Todos los derechos reservados.
    </div>
  </div>
</footer>
```

Notas:
- Bootstrap se encarga del apilado responsive (`col-12 col-md-4`). Se eliminan
  `.footer-container` y `.footer-section` del CSS.
- **Corrige las rutas absolutas** `/assets/capital/...` → `assets/capital/...`
  (ver sección 12).

---

## 7. Paso 2 — `js/cssClassMap.js`

Objetivo: que el mapa describa exactamente las clases que `card.js` va a usar,
sean de Bootstrap o propias.

```js
export const cardClassMap = {
  /* Bootstrap */
  col: "col",
  card: "card",
  cardImgTop: "card-img-top",
  cardBody: "card-body",
  cardTitle: "card-title",
  cardText: "card-text",

  /* Propias (comportamiento hover + aspecto) */
  cardGallery: "card-gallery",
  cardSection: "card-section",
  cardImage: "card-image",
  cardClosed: "card-closed",
  cardOpen: "card-open"
};
```

**Eliminar** las entradas que ya no se usan (se simplifica el módulo):
`cardImageContainer`, `cardContentContainer`, `cardContentParagraphContainer`.

> Si prefieres no borrarlas todavía, no pasa nada, pero la guía apunta a módulos
> mínimos: lo que no se usa, fuera.

---

## 8. Paso 3 — `js/card.js`

Objetivo: que cada producto se convierta en una **columna de Bootstrap** que
contiene una **card**, sin cambiar el contrato público (`new Card(info)`,
`build(parent)`, `addEvents()`).

### 8.1 Estructura objetivo del DOM

```
div.col
└── div.card.card-section.card-closed      ← aquí vive el hover-expand
    ├── img.card-img-top.card-image
    └── div.card-body
        ├── h4.card-title
        └── p.card-text
```

### 8.2 Implementación de referencia

```js
import { cardClassMap as C } from "./cssClassMap.js";

export class Card {
  constructor(info) {
    this._info = info;

    this._column = document.createElement("div");
    this._column.classList.add(C.col);

    this._card = document.createElement("div");
    this._card.classList.add(C.card, C.cardSection, C.cardClosed);

    this._image = document.createElement("img");
    this._image.classList.add(C.cardImgTop, C.cardImage);

    this._body = document.createElement("div");
    this._body.classList.add(C.cardBody);

    this._title = document.createElement("h4");
    this._title.classList.add(C.cardTitle);

    this._paragraph = document.createElement("p");
    this._paragraph.classList.add(C.cardText);
  }

  build(parent) {
    this._title.textContent = this._info.title;
    this._paragraph.textContent = this._info.paragraph;

    this._image.setAttribute("src", this._info.image);
    this._image.setAttribute("alt", this._info.title); // accesibilidad

    this._body.append(this._title, this._paragraph);
    this._card.append(this._image, this._body);
    this._column.appendChild(this._card);
    parent.appendChild(this._column); // parent es el .row (id="panaderia", etc.)
  }

  addEvents() {
    this._card.addEventListener("mouseenter", () => {
      this._card.classList.replace(C.cardClosed, C.cardOpen);
    });
    this._card.addEventListener("mouseleave", () => {
      this._card.classList.replace(C.cardOpen, C.cardClosed);
    });
  }
}
```

Notas:
- Se eliminan los envoltorios `card-image-container` y
  `card-content-paragraph-container` porque no aportan ni estilos ni semántica.
- La clase de Bootstrap `.card-img-top` ya aplica `width:100%`; el alto y el
  `object-fit` vienen de `.card-image` (sección 11).
- `classList.replace` evita el estado intermedio con las dos clases a la vez.
- **Opcional (accesibilidad táctil):** añadir también `focus`/`click` para poder
  abrir la tarjeta sin ratón. No es obligatorio para mantener el comportamiento
  actual.

---

## 9. Paso 4 — `js/index.js`

**Sin cambios de lógica.** Verifica únicamente:

1. Los tres `getElementById` siguen encontrando los contenedores (los `id` no
   cambiaron en el paso 6.3).
2. `renderCards()` sigue recorriendo `sectionsArray`/`productArray` igual.
3. `changeLanguage()` sigue actualizando `[data-i18n]`, `aria-pressed`,
   `localStorage` y disparando `renderCards()`.
4. El script se carga con `type="module"` al final del `<body>`.

No hace falta tocar nada más: `Card` encapsula el cambio a Bootstrap.

---

## 10. Paso 5 — `css/index.css`

### 10.1 Qué eliminar

Reglas que Bootstrap ya cubre o que dependían de la maquetación antigua:

- El reset `* { margin:0; padding:0; box-sizing:border-box }` (lo hace *Reboot*).
- `header { ... display:flex ... }` (ahora es `.navbar`).
- `.nav { ... }` y `.nav a { ... }` (ahora `.navbar-nav` / `.nav-link`).
- `main { ... }` (ahora `.container` + utilidades `py-*`).
- `.footer-container` y `.footer-section` (ahora `.row` / `.col`).
- El `@media (max-width:768px)` del header (lo gestiona el collapse del navbar).

### 10.2 Qué conservar y cómo

Mantén **la identidad visual** definiendo el tema una sola vez con variables y
aplicándolo a los componentes de Bootstrap:

```css
:root {
  --brand-orange:  #ce6300;  /* header  */
  --brand-orange-2:#b95a00;  /* enlaces del nav */
  --brand-orange-3:#d37300;  /* footer  */
  --brand-cream:   #FFF8E7;  /* textos claros */
  --brand-brown:   #5C4033;
}

/* Header / navbar */
.navbar { background-color: var(--brand-orange); border-bottom: 3px solid var(--brand-orange-2); }

/* Logo (fuente Rouge Script que ya se carga en el head) */
.navbar .logo { font-family: "Rouge Script", cursive; font-size: 1.7rem; letter-spacing: 1.5px; color: var(--brand-cream); }

/* Enlaces del nav */
.navbar .nav-link { color: var(--brand-cream); background-color: var(--brand-orange-2); border-radius: 4px; padding: 10px 25px; margin: 0 6px; font-size: 20px; }
.navbar .nav-link:hover { background-color: var(--brand-orange); transform: translateY(-1px); }

/* Selector de idioma (se mantiene tal cual) */
.lang-selector { display: flex; gap: 10px; }
.lang-btn { padding: 6px 16px; background-color: var(--brand-cream); color: var(--brand-brown); border: none; border-radius: 4px; cursor: pointer; font-weight: 600; }
.lang-btn[aria-pressed="true"] { outline: 2px solid var(--brand-orange-2); }
.lang-btn:hover { background-color: var(--brand-orange-2); color: var(--brand-cream); }
.flag-icon { width: 30px; height: 20px; display: block; }

/* Título de sección */
section h3 { font-size: 24px; color: #A0522D; letter-spacing: 2px; }

/* Footer */
.footer { background-color: var(--brand-orange-3); color: #fff; padding: 40px 20px; }
.footer-brand { font-family: "Rouge Script", cursive; font-size: 1.7rem; color: var(--brand-cream); }
.footer-socials { display: flex; gap: 10px; margin-top: 10px; }
.social-icon { width: 24px; height: 24px; object-fit: contain; transition: opacity .3s; }
.social-icon:hover { opacity: .7; }
.footer-copyright { text-align: center; margin-top: 30px; border-top: 1px solid rgba(255,255,255,.2); padding-top: 15px; font-size: .85rem; }
```

> El color `#A0522D` del `h3` se mantiene porque figura en la Guía de Estilos
> para títulos de sección; el resto de la paleta sigue el aspecto naranja actual.

---

## 11. Paso 6 — `css/cards.css`

Objetivo: conservar el **hover-expand** y adaptar las medidas al grid Bootstrap
(la columna ya fija el ancho; la imagen pasa a ocupar el 100% de esa columna).

### 11.1 Variables

Se conservan los colores y el alto. El ancho deja de ser fijo (lo da la columna):

```css
:root {
  --card-image-height: 120px;
  --card-open-height: 210px;
  --amber-flame: #fbbb25;
  --amber-glow:  #f9a019;
  --white: #fefffe;
}
```

### 11.2 Reglas

```css
/* La columna reserva la altura "abierta" para que la fila no salte al hacer hover
   (equivalente al antiguo grid-auto-rows). */
.card-gallery > .col { height: var(--card-open-height); }

/* Tarjeta: aquí vive la animación de altura */
.card-section {
  height: var(--card-image-height);
  overflow: hidden;
  border: 1px solid var(--amber-flame);
  border-radius: 10px;
  background-color: var(--white);
  transition: height .4s ease-in, border-color .3s ease;
}

.card-closed { height: var(--card-image-height); }
.card-open   { height: var(--card-open-height); }

.card-section:hover { border-color: var(--amber-glow); box-shadow: 0 0 0 1px var(--amber-glow); }

/* Imagen: ancho 100% lo pone .card-img-top; aquí fijamos alto y recorte */
.card-image { height: var(--card-image-height); width: 100%; object-fit: cover; }

/* Contenido */
.card-body { padding: 10px; font-size: 12px; }
.card-body .card-title { margin: 0 0 4px; font-size: 1rem; }
.card-body .card-text { margin: 0; }

/* Fondos alternos de sección (se mantiene) */
.card-gallery-container:nth-child(2n+1) { background-color: #fcf3e8; }
.card-gallery-container { border-radius: 12px; padding-top: 80px; }
.card-gallery-container h3 { margin-bottom: 60px; text-align: center; }
```

### 11.3 Puntos de atención

- **No redefinas `display:grid`** en `.card-gallery`: Bootstrap usa `display:flex`
  en `.row`. Solo conserva la clase como hook.
- La regla `.card-gallery > .col { height: ... }` es la que evita el salto de
  layout. Si se omite, la fila crecerá al abrir una tarjeta.
- Si un texto largo desborda la tarjeta abierta, añade
  `.card-text { overflow: hidden; }` o reduce el tamaño de fuente. Los datos
  actuales son cortos, así que no debería ocurrir.

---

## 12. Correcciones transversales

1. **Rutas de assets.** En `index.html` los iconos sociales usan rutas absolutas
   (`/assets/capital/insta.png`, `/assets/capital/face.png`). Cámbialas a
   relativas (`assets/capital/...`) para que funcionen servidas desde cualquier
   subcarpeta. Los datos de `js/data/` ya usan rutas relativas.
2. **`alt` en imágenes generadas.** `card.js` debe setear `alt` con el título del
   producto (ya incluido en el paso 8).
3. **`rel="noopener"`** en los enlaces `target="_blank"` del footer.
4. **`aria-label`** en el botón hamburguesa y mantener `aria-pressed` en los
   botones de idioma (ya existente).
5. **Landmarks.** Al quitar la tabla, `header`, `main` y `footer` pasan a ser
   elementos reales: no añadas `role` redundantes.

---

## 13. Mapa de `data-i18n`

No cambiar estos atributos ni la clave que referencian (los usa `index.js`):

| Elemento | Clave | Estado |
| --- | --- | --- |
| Enlace Inicio | `navInicio` | Se conserva |
| Enlace Panadería | `navPanaderia` | Se conserva |
| Enlace Dulcería | `navPasteleria` | Se conserva |
| Enlace Empanadas | `navEmpanadas` | Se conserva |
| Enlace Contacto | `navContacto` | Se conserva |
| Título sección Panadería | `seccionPanaderia` | Se conserva |
| Título sección Dulcería | `seccionDulceria` | Se conserva |
| Título sección Empanadas | `seccionEmpanadas` | Se conserva |
| Footer Horarios | `horarios` | Se conserva |
| Footer Lunes-sábado | `sabado` | Se conserva |
| Footer Domingo | `domingo` | Se conserva |
| Footer Contacto | `contactos` | Se conserva |

> Dirección, teléfono, correo y copyright siguen **sin traducción** (hardcoded),
> igual que antes.

---

## 14. Responsive

| Elemento | Comportamiento |
| --- | --- |
| Navbar | `navbar-expand-lg`: menú desplegable < 992px; horizontal ≥ 992px |
| Galería | `row-cols-1` (móvil) → `row-cols-sm-2` (≥576px) → `row-cols-lg-3` (≥992px) |
| Footer | `col-12` apilado → `col-md-4` (≥768px) en 3 columnas |
| Imágenes | `.card-img-top` + `.card-image` ocupan el ancho de su columna |

No hace falta ningún `@media` propio para el layout: Bootstrap lo resuelve.

---

## 15. Verificación

### 15.1 Servir en local (obligatorio)

Los `type="module"` no cargan bien con `file://`. Levanta un servidor:

```bash
python3 -m http.server 8000
```

y abre <http://localhost:8000/>.

### 15.2 Checklist manual

- [ ] El `<header>` es un navbar y **no** hay `<table>` en el DOM.
- [ ] En escritorio se ven los 5 enlaces y los 2 botones de idioma.
- [ ] En móvil aparece el botón hamburguesa y despliega/recoge el menú.
- [ ] Las anclas del nav (`#panaderia`, etc.) desplazan a cada sección.
- [ ] Panadería muestra 12 tarjetas, Dulcería 8, Empanadas 4.
- [ ] Al pasar el ratón, la tarjeta se expande y se repliega **sin** que la fila
      salte.
- [ ] Al cambiar a PT, cambian nav, títulos de sección y horarios/contacto.
- [ ] Al recargar, se mantiene el idioma elegido (`localStorage`).
- [ ] Los iconos de Instagram/Facebook cargan (rutas relativas).
- [ ] El footer se apila en móvil y muestra 3 columnas en escritorio.
- [ ] El aspecto (colores naranja, fuente Rouge Script) es equivalente al actual.

### 15.3 Verificación automática (opcional)

Con la skill `webapp-testing` (Playwright): cargar `http://localhost:8000`,
capturar pantalla en escritorio y móvil, hacer clic en el idioma PT y comprobar
que los `textContent` cambian, y hacer hover sobre una tarjeta para validar la
transición de altura. Guardar evidencias junto a la entrega si se piden.

---

## 16. Unidades de trabajo (commits sugeridos)

1. `index.html` migrado a Bootstrap (navbar, main/row, footer) sin tocar JS/CSS.
2. `cssClassMap.js` + `card.js` adaptados a `.col` + `.card`.
3. Tema en `index.css` y hover-expand en `cards.css`.
4. Correcciones de rutas/`alt`/accesibilidad + verificación.

Cada unidad debe dejar la página funcional (aunque sea con estilos a medio migrar).

---

## 17. Riesgos y tradeoffs

| Riesgo | Mitigación |
| --- | --- |
| Bootstrap por CDN requiere internet | Si la entrega es offline, descargar los `.min` a `css/vendor/` y `js/vendor/` y cambiar las rutas |
| La Guía de Estilos describe maquetación con tablas; Bootstrap la elimina | Confirmar con el docente; si se evalúa el uso de tablas, plantear versión híbrida |
| `.card` de Bootstrap aporta borde/estilos por defecto | Los overrides propios van después de Bootstrap y ganan en cascada |
| El hover no existe en táctil | Aceptar limitación actual o añadir apertura por `click`/`focus` (opcional) |

---

## 18. Definición de "hecho"

- `index.html` sin tablas de maquetación, con navbar y footer Bootstrap.
- Render por JS funcionando con tarjetas `.col` + `.card` y hover-expand.
- i18n ES/PT y `localStorage` intactos.
- Paleta y tipografía equivalentes al aspecto actual.
- Sin errores en consola y checklist 15.2 completa.

---

## Apéndice A — Mapa rápido de clases

| Antes (CSS propio) | Ahora (Bootstrap) | Extra |
| --- | --- | --- |
| `.card-gallery` (`display:grid`) | `.row .row-cols-1 .row-cols-sm-2 .row-cols-lg-3 .g-4` | `.align-items-start` |
| nuevo | `.col` | Envoltorio de cada producto |
| `.card-section` | `.card .card-section` | Conserva hover-expand |
| `.card-image` | `.card-img-top .card-image` | Alto + `object-fit` propios |
| `.card-content-container` | `.card-body` | — |
| `h4` de la tarjeta | `.card-title` | — |
| `p` de la tarjeta | `.card-text` | — |
| `.nav` / `.nav a` | `.navbar-nav` / `.nav-link` | Overrides de color |
| `.footer-container` / `.footer-section` | `.row` / `.col-12 .col-md-4` | — |
| `card-image-container` (sin estilos) | *eliminado* | — |
| `card-content-paragraph-container` | *eliminado* | — |

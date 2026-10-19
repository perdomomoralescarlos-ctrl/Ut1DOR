1. Navegación con teclado.

Sirve para comprobar que una persona pueda recorrer y usar la página sin ratón, por ejemplo porque usa un teclado, un conmutador o una tecnología de asistencia.

Cómo probarla:

Recarga la página y empieza desde arriba, sin hacer clic antes.
Pulsa Tab para avanzar y Shift+Tab para retroceder.
Comprueba que el foco se vea claramente en cada elemento y que avance en un orden que tenga sentido: navegación, contenido y controles.
En enlaces y botones, prueba Enter. En botones y controles como casillas, también suele ser válido Espacio.
Comprueba que puedas salir de menús, diálogos u otros componentes sin quedar atrapado en ellos.
Las flechas no sustituyen a Tab para recorrer una página común: normalmente desplazan el contenido. Se usan para moverse dentro de componentes que las admiten, como algunas pestañas, menús o grupos de opciones.

Qué puede revelar: elementos imposibles de alcanzar, foco poco visible, orden confuso, controles que no responden al teclado o trampas de foco.

En tu galería: si una tarjeta solo muestra información, no siempre conviene hacerla una parada de Tab; normalmente se reserva el foco para elementos interactivos, como enlaces y botones. Si al enfocarla se despliega contenido necesario, comprueba que ese contenido también pueda descubrirse con teclado y que el comportamiento sea claro.

2. NVDA en Windows.

NVDA es un lector de pantalla gratuito. Lee en voz alta el contenido y los controles para que una persona ciega pueda orientarse y utilizar la página. No evalúa automáticamente toda la accesibilidad: permite escuchar lo que la página comunica y detectar problemas que una herramienta de análisis puede pasar por alto.

Qué revisar:

Que los títulos se anuncien como títulos y permitan entender la estructura.
Que los enlaces y botones tengan nombres que expliquen su función, no nombres vagos como “clic aquí”.
Que las imágenes tengan una descripción útil cuando aportan información. Las decorativas deberían ignorarse, no anunciarse como imágenes sin descripción.
Que los controles indiquen qué son y, cuando corresponda, su estado.
Que al cambiar de idioma o actualizar contenido, la información siga siendo comprensible.
Puedes recorrer la página con las flechas para leer el contenido y usar los atajos de NVDA para saltar entre títulos, enlaces y botones. Si NVDA lee algo como “botón, sin nombre”, normalmente falta un nombre accesible. Si una imagen importante no se describe, revisa su texto alt.

Limitación: NVDA puede anunciar correctamente una estructura que aun así resulte confusa o difícil de usar. Por eso conviene combinarlo con teclado y revisión visual.

3. axe DevTools y Accessibility Insights for Web.

Son herramientas que se añaden al navegador y analizan la página buscando ciertos incumplimientos de accesibilidad. Suelen encontrar problemas como:

Botones o enlaces sin nombre accesible.
Campos de formulario sin etiqueta.
Uso incorrecto de algunos atributos ARIA.
Contraste de texto insuficiente en casos que pueden medirse automáticamente.
Algunos problemas de estructura y relaciones entre elementos.
axe DevTools ejecuta un análisis y presenta los hallazgos con su gravedad y una explicación del problema. Al abrir un resultado, normalmente puedes ver qué elemento lo causa, por qué importa y una orientación para corregirlo.

Accessibility Insights for Web incluye comprobaciones automáticas y pruebas guiadas. Su prueba de Tab stops ayuda a revisar las paradas del teclado; la evaluación guiada sirve para revisar otros criterios paso a paso.

Limitación importante: que el análisis no reporte errores no significa que la página sea totalmente accesible. Estas herramientas no pueden decidir por sí solas si un texto alternativo describe bien la imagen, si el orden de lectura tiene sentido o si una interacción resulta comprensible con un lector de pantalla.
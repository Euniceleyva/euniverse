---
name: Euniverse
description: Una tarjeta de presentación hecha recorrido, con acuarela, formas amables y la colección completa al alcance.
colors:
  cream: "#f8edda"
  paper: "#fffaf3"
  ink: "#32160f"
  ink-soft: "#735b4d"
  sage: "#7f8154"
  sage-soft: "#d9ddc6"
  sky: "#dce9f2"
  blue: "#52778a"
  mauve: "#b86f79"
  wine: "#722d3c"
  orange: "#d76b35"
  yellow: "#f5c86d"
  artwork-mat: "#e9dfca"
  hero-artwork-mat: "#eee4d2"
  dialog-mat: "#e7ddc9"
typography:
  display:
    fontFamily: "Nunito, Arial Rounded MT Bold, sans-serif"
    fontSize: "clamp(3.25rem, 6vw, 5.8rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Nunito, Arial Rounded MT Bold, sans-serif"
    fontSize: "clamp(2.6rem, 4.8vw, 4.65rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Nunito, Arial, sans-serif"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Nunito, Arial, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 800
    letterSpacing: "0.07em"
rounded:
  inset: "0.75rem"
  panel: "1rem"
  card: "1.25rem"
  pill: "999px"
  circle: "50%"
spacing:
  gutter: "clamp(1.15rem, 4vw, 4.8rem)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.8rem 1.15rem"
    height: "3rem"
  button-primary-hover:
    backgroundColor: "{colors.wine}"
    textColor: "{colors.paper}"
  button-look:
    backgroundColor: "{colors.mauve}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.8rem 1.15rem"
    height: "3rem"
  filter-selected:
    backgroundColor: "{colors.sage}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0.55rem 1rem"
---

# Design System: Euniverse

## Overview

**Creative North Star: "La tarjeta que se vuelve viaje"**

Euniverse amplía la identidad de una tarjeta de presentación real hasta convertirla en un recorrido digital amable. El fondo crema, la acuarela azul y floral, el logo oficial y las formas redondas construyen una experiencia personal y reconocible sin separar la obra de su origen artesanal.

La página avanza en tres momentos de casi un viewport: bienvenida, ruta de obras e historia con cierre. Las 94 piezas viven en un único carrusel; una fila de puntos tenues permite saltar por la colección, mientras el swipe, el teclado y el autoplay sostienen el recorrido.

**Key Characteristics:**

- Identidad basada en los recursos oficiales de `assets/brand/`.
- Fondo crema con acuarela azul y floral tomada de la tarjeta de presentación.
- Una sola voz tipográfica redonda: Nunito.
- Tres momentos amplios y claros, cada uno con una función distinta.
- Carrusel único de 94 obras con imágenes completas y lightbox.
- Navegación secuencial por swipe, teclado o autoplay, con puntos discretos para saltos directos.

## Colors

La paleta conserva el carácter impreso y artesanal de la tarjeta: crema y papel como base, café para legibilidad y acentos botánicos apagados.

### Primary

- **Crema de tarjeta:** fondo principal y base visible bajo la acuarela.
- **Café de tinta:** texto, navegación, botones principales y footer.

### Secondary

- **Azul de acuarela:** tarjeta de conteo y presencia cromática de la identidad.
- **Malva pintado:** segunda línea del titular y acción para abrir la obra.
- **Salvia de ruta:** scrollbar, filtros activos y progreso del recorrido.

### Tertiary

- **Naranja de señal:** foco visible, línea activa de navegación y marcador de la ruta.
- **Vino profundo:** respuesta de hover de las acciones principales.
- **Cielo, salvia clara y amarillo:** tonos de apoyo disponibles para extender la identidad sin desplazar la acuarela real.

### Neutral

- **Papel cálido:** superficies, marcos, menú móvil y diálogo.
- **Café suave:** párrafos, pies de obra y etiquetas secundarias.
- **Paspartús cálidos:** fondos específicos que protegen el color de las obras en bienvenida, carrusel y lightbox.

**The Printed Source Rule.** La acuarela y el logo oficial son la referencia cromática; los colores de interfaz los acompañan, no los reinterpretan con efectos digitales ajenos.

## Typography

**Display Font:** Nunito (con Arial Rounded MT Bold y sans-serif como respaldo)  
**Body Font:** Nunito (con Arial y sans-serif como respaldo)

**Character:** Toda la interfaz comparte una voz redonda, próxima y clara. La jerarquía nace del peso y la escala —no del contraste entre familias— para permanecer coherente con el lettering de la identidad.

### Hierarchy

- **Display:** extranegrita, fluida y compacta; presenta la promesa principal de bienvenida.
- **Headline:** extranegrita y fluida; abre la ruta de obras, la historia y el lightbox.
- **Title:** extranegrita a escala intermedia; identifica la obra activa.
- **Body:** regular, con interlínea generosa y ancho máximo de lectura de 68 caracteres.
- **Label:** extranegrita, pequeña, espaciada y en mayúsculas para navegación, acciones y datos de recorrido.

**The One Rounded Voice Rule.** Usar Nunito en toda nueva interfaz; la variedad procede de los pesos 400, 600, 700 y 800 ya cargados.

## Layout

La página se organiza como tres momentos consecutivos con altura mínima de una ventana: bienvenida, recorrido de las obras e historia/cierre. El gutter es fluido y las composiciones de escritorio se resuelven en dos columnas. A 900 px desaparece la acción secundaria de cabecera, la navegación pasa a menú y los bloques principales se compactan. A 650 px cada momento se reorganiza en una sola columna sin perder su escala de escena.

La bienvenida combina mensaje y una tarjeta de obra inclinada; la golondrina PNG acompaña el desplazamiento por toda la página, eligiendo espacios despejados alrededor del contenido mientras bate sus alas. Una textura fina de papel y la acuarela enlazan las secciones. La ruta de obras dedica el centro al carrusel, con paspartús orgánicos, pequeñas inclinaciones y piezas vecinas visibles, sin nombres ni fichas. El cierre combina el retrato compartido por la artista, una lectura más amplia y una tarjeta de contacto sobre una mancha acuarelada irregular.

**The Three Moments Rule.** Toda ampliación debe preservar una bienvenida, una ruta de colección y un cierre humano claramente distinguibles; el carrusel sigue siendo la única superficie de exploración de la colección.

## Elevation & Depth

La profundidad imita papel y tarjeta: sombras café amplias, superficies cálidas, una rotación mínima en la obra de bienvenida y transparencias de papel sobre la acuarela. El elemento activo del carrusel gana escala, opacidad y sombra; los laterales retroceden sin desaparecer. El lightbox usa un fondo oscurecido y desenfocado para aislar la obra.

**The Paper, Not Glass Rule.** Las transparencias conservan un tono de papel cálido; no usar vidrio brillante, degradados tecnológicos ni reflejos fríos.

## Shapes

El sistema adopta esquinas generosas y siluetas redondas. Tarjetas y diálogo usan curvas amplias; marcos interiores usan un radio menor; acciones, filtros y menú móvil son píldoras; controles direccionales y marcador de ruta son círculos.

**The Friendly Geometry Rule.** Los radios suavizan controles y superficies, pero nunca recortan la pintura: las obras permanecen completas dentro de su paspartú.

## Components

### Logo y cabecera

- La cabecera fija utiliza el logo oficial entregado por la artista y una acción “Empezar el viaje”.
- Al desplazarse, aparece un fondo crema casi opaco, desenfoque suave y sombra baja.
- La navegación revela una línea naranja en hover y foco.
- En móvil, el logo permanece visible y el menú se abre como una tarjeta de papel redondeada.

### Bienvenida

- Usa una golondrina recortada del recurso oficial como detalle de vuelo, un titular extranegrita, una frase breve y una acción en píldora.
- La obra destacada funciona como tarjeta tangible: marco de papel, inclinación ligera, punto naranja y hover de elevación.
- La tarjeta abre directamente la vista ampliada de esa obra.
- La acuarela oficial cubre la parte baja sin aportar contenido semántico, por lo que su texto alternativo queda vacío.

### Carrusel de colección

- Contiene las 94 obras en una sola pista y comienza en la primera.
- La obra activa queda centrada, a escala completa y con máxima opacidad; las piezas vecinas permanecen como contexto.
- Las imágenes usan contención y derivados responsivos; la activa y sus vecinas se anticipan para mantener fluido el recorrido.
- Admite arrastre o swipe, teclado con flechas, Home y End, además de puntos de salto discretos.
- Los botones manuales respetan los extremos; la reproducción automática vuelve suavemente al inicio y puede pausarse.

### Indicador del carrusel

- Una fila de puntos tenues indica la posición aproximada y salta a nueve posiciones distribuidas por la colección.
- La pausa del autoplay se integra como un punto discreto con nombre accesible y estado anunciado.
- Swipe y teclado permiten recorrer las 94 obras, incluidas las posiciones entre puntos.

### Filtros

- Permanecen ocultos mientras no existan categorías reales en los metadatos.
- Si aparecen, son píldoras desplazables horizontalmente; el estado activo usa salvia y papel.
- Filtrar reconstruye el mismo carrusel, no crea otra vista de catálogo.

### Vista ampliada

- Usa `dialog` nativo con la obra completa y navegación anterior/siguiente, sin mostrar títulos ni fichas.
- Puede abrirse desde la tarjeta de bienvenida o tocando la obra activa.
- Acepta flechas de teclado, cierra al pulsar el fondo y devuelve el foco al disparador.
- No muestra textos de técnica, disponibilidad, historias o nombres de archivo.

### Historia y cierre

- La acuarela reaparece como base del último momento y conecta visualmente el cierre con la bienvenida.
- La historia incluye `euni.png` sobre una mancha cálida con forma orgánica.
- La tarjeta final usa el logo oficial, el lema y el enlace a `euniverseart.com`; no añade canales no documentados.

## Do's and Don'ts

### Do:

- **Do** usar los logos oficiales y la acuarela disponibles en `assets/brand/` respetando su proporción.
- **Do** mantener Nunito como única familia de interfaz y conservar su tono redondo.
- **Do** presentar las 94 obras en el mismo carrusel y mostrarlas completas con `object-fit: contain`.
- **Do** mantener la navegación por teclado y swipe, con puntos visualmente tenues como acceso directo.
- **Do** mantener los tres momentos cercanos a un viewport y adaptar su composición en móvil.
- **Do** declarar con honestidad los metadatos que todavía no existen.

### Don't:

- **Don't** sustituir el logo oficial por texto tipográfico, lettering recreado o una marca improvisada.
- **Don't** volver a una pareja serif/sans ni introducir una segunda familia tipográfica.
- **Don't** crear superficies de exploración paralelas que compitan con el carrusel único.
- **Don't** recortar obras para llenar el marco ni alterar el color de los originales.
- **Don't** inventar categorías, títulos, historias, técnica, disponibilidad, redes o datos de contacto.
- **Don't** convertir la página en desplazamiento horizontal forzado.

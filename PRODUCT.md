# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Sitio estático modular de una sola página, construido con HTML, CSS y JavaScript nativo y empaquetado con Vite. Nunito se sirve mediante `@fontsource`. Un script de Node genera el catálogo desde `obras/` y codifica derivados WebP con `cwebp`, conservando el perfil ICC de cada original.

## Users

Personas que reciben o descubren la tarjeta de presentación de Euniverse y quieren conocer su identidad, recorrer todas sus pinturas con calma, ampliar una pieza y acercarse a la historia de la artista.

## Product Purpose

Convertir la tarjeta de presentación real de Euniverse en una experiencia digital breve y reconocible. El sitio presenta la marca oficial, permite recorrer las 94 obras en una sola ruta y cierra con la voz de la artista y su dominio.

## Positioning

Euniverse presenta arte en miniatura hecho a mano. La experiencia conserva el carácter cálido, redondo y pintado de su tarjeta; cada obra se muestra completa y la navegación se siente como un viaje continuo, no como un catálogo comercial convencional.

## Operating Context

La página se recorre verticalmente en tres momentos de casi un viewport: bienvenida, ruta de obras e historia/cierre. La cabecera ofrece accesos a Inicio, Obras, Mi historia y Contacto. La colección completa vive en un único carrusel; los puntos tenues ofrecen saltos directos y el swipe, teclado y autoplay permiten avanzar obra por obra. La golondrina acompaña el scroll.

## Capabilities and Constraints

- Bienvenida con logo oficial, acuarela de marca, mensaje, llamada a la acción y una obra destacada que abre el lightbox.
- Carrusel único con las 94 obras como superficie completa de exploración.
- Navegación del carrusel mediante swipe o arrastre, flechas de teclado, Home, End y puntos discretos para saltar por la colección.
- Indicador de posición reducido a puntos tenues; un punto ofrece pausa/reanudación accesible del avance automático.
- Lightbox basado en `dialog` nativo, con imagen completa, navegación anterior/siguiente, flechas de teclado y restauración de foco al cerrar; omite nombres y datos de cada obra.
- Filtros preparados para categorías reales, pero ocultos mientras los metadatos no incluyan ninguna.
- Imágenes responsivas con variantes de hasta 480 px, 1000 px y ancho completo, sin escalar por encima del original.
- La primera obra del carrusel recibe prioridad; el resto usa carga diferida y la obra activa con sus vecinas se anticipan durante la navegación.
- El carrusel avanza automáticamente cada 5.2 segundos, ofrece una pausa explícita y se detiene mientras el usuario navega con teclado, abre el lightbox o activa movimiento reducido.
- Diseño responsive, enlace de salto, foco visible, estados accesibles y respeto de `prefers-reduced-motion`.
- Los datos de obra no se exponen en la interfaz; no se inventan títulos, técnica, dimensiones físicas, historias, disponibilidad ni categorías.

## Image Pipeline

- Fuente única: 94 originales en `obras/`, que permanecen intactos.
- Conservación del perfil ICC original durante la codificación para mantener la fidelidad de color y evitar conversiones destructivas.
- Tres variantes WebP por obra: pequeña, mediana y completa; 282 archivos generados en total.
- Calidad WebP 89 para derivados menores y 92 para anchos de 1400 px o más.
- Codificación con método 6, `sharp_yuv` y conservación del perfil ICC.
- Limpieza automática de derivados obsoletos y validación de inclusión, rutas únicas, existencia y ausencia de escalado al alza.

## Brand Commitments

- Nombre: Euniverse.
- Descriptor usado por el logo y el producto: “arte en miniatura”.
- Lema de cierre: “Un universo hecho a mano para ti”.
- La identidad digital parte de la tarjeta de presentación y de los logos oficiales disponibles en `assets/brand/`.
- Voz sensible, cercana, optimista y honesta.
- Dirección visual: crema cálido, acuarela azul y floral, café oscuro, acentos botánicos y formas redondas.
- Nunito es la única familia tipográfica de interfaz, con pesos 400, 600, 700 y 800.
- Las fotografías de las obras siempre se muestran completas y mantienen prioridad sobre la decoración.
- Los puntos son un indicador visual ligero; el recorrido completo se hace con swipe o teclado y el autoplay vuelve al inicio.

## Evidence on Hand

- Tarjeta de presentación en `assets/brand/card-front.webp` y acuarela derivada en `assets/brand/card-watercolor.webp`.
- Logo oficial entregado en `obras/logo_euniverse.png` y copiado sin alteraciones a `assets/brand/euniverse-logo-official.png` para su uso de interfaz.
- 94 archivos fuente reales en `obras/`.
- Reporte vigente en `assets/obras/catalog-report.json`: 94 obras incluidas, 282 variantes WebP, cero archivos inválidos, cero duplicados de contenido y todas las comprobaciones aprobadas.
- Catálogo y tratamiento de color definidos en `scripts/generate-artwork-catalog.mjs`.
- `assets/obras/metadata.json` no contiene todavía metadatos de obras ni etiquetas de categorías.
- `obras/euni.png` se integra en la sección de historia; `obras/ave.png` acompaña el scroll y ambos recursos se excluyen del catálogo artístico.
- El único canal mostrado es `euniverseart.com`; no se documentan redes sociales, formulario ni otros datos de contacto.

## Product Principles

1. La experiencia digital debe sentirse nacida de la tarjeta real.
2. Una sola ruta contiene la colección completa.
3. Ver la pieza completa importa más que llenar el marco.
4. El viaje debe funcionar con mouse, touch y teclado, tanto paso a paso como mediante salto directo.
5. El procesamiento mejora la consistencia de color web sin modificar los originales.
6. Cada ausencia de contenido se declara con honestidad y nunca se disfraza con información falsa.

## Accessibility & Inclusion

La experiencia ofrece enlace para saltar al contenido, jerarquía semántica, controles con nombre accesible, foco naranja visible, navegación completa del carrusel por teclado, puntos accesibles, anuncios de la obra activa, diálogo modal y restauración de foco. El contenido esencial permanece disponible con movimiento reducido y no depende de hover.

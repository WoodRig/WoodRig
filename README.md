# WoodRig · V1

Web comercial de una gama de cockpits y soportes de simracing en desarrollo.

[Investigación y decisiones del piloto Rally](docs/README.md).

## Desarrollo local

Requisitos: Node.js 22 y npm.

```sh
npm ci
npm run dev
npm run typecheck
npm run lint
npm run build
```

Vite imprime la URL local. `npm run preview` sirve el contenido compilado de `dist/`. Vercel usa `cleanUrls` para servir los HTML de ruta sin extensión. En otros alojamientos, configura las URL limpias para resolver a su archivo `.html` y sirve `404.html` con código 404 para rutas desconocidas.

## Verificación de la V1

- GitHub Actions ejecuta la instalación limpia, el lint, la comprobación de tipos y el build en cada push a `main` y en cada pull request.
- Revisa la portada en móvil, tablet y escritorio. Comprueba que no haya desplazamiento horizontal, que la secuencia responda al scroll en escritorio y que las dos escenas se lean en orden en móvil.
- Abre y cierra el menú móvil con teclado. Al cambiar de página, el foco debe quedar en el contenido principal. Los enlaces a secciones deben desplazarse hasta su destino bajo la cabecera.
- Comparte una configuración y abre su enlace. Comprueba que se seleccionen el modelo y los componentes. Los extras desconocidos, duplicados o iguales al modelo se descartan.
- Añade una selección al carrito y recarga la pestaña. Confirma el pedido de prueba y vuelve a recargar desde el historial. Comprueba que se conserva la referencia y que el carrito queda vacío.
- Abre directamente una ficha y una página legal en la vista previa. Comprueba que carguen al recargar. Revisa el título, la descripción y la imagen social de la ficha, y comprueba que el checkout emite `noindex` tras cargar la aplicación.

## Estructura

- `src/views` contiene la home, el catálogo y las fichas, la experiencia de configuración, el flujo de pedido de prueba y las páginas de marca, ayuda y legales.
- `src/components` reúne la navegación, el pie, el hero, la secuencia de espacio y las tarjetas de familia.
- `src/data/catalog.ts` es la fuente de datos provisional. Las vistas pueden conservar el contrato de `src/types/catalog.ts` al conectar el catálogo a una API.
- `src/stores/commerce.ts` gestiona el configurador, el carrito y los pedidos de demostración. El carrito y el historial se recuperan tras recargar la pestaña mediante `sessionStorage`. El flujo de prueba funciona sin datos personales ni órdenes reales.
- `src/styles` centraliza la paleta, tipografía, escalas y reglas comunes. Las composiciones cambian en 900 px y las rejillas compactas en 600 px.
- `src/config/site.ts` centraliza el contacto, las redes y la navegación legal. Los cinco documentos de ejemplo se editan en `src/data/legal.ts`. Sustituye el titular, el contacto y las condiciones ficticias por los datos y procesos de la tienda antes de publicar.

## Imágenes y experiencias de producto

Los WebP de `public/images` son renders conceptuales creados con la herramienta integrada de imágenes tomando como referencia las dos láminas facilitadas por Jordi. El hero carga una variante más ligera en móvil y las tarjetas muestran una imagen específica de cada familia.

La dirección visual usa luz suave, perfiles delgados de roble laminado, huecos mecanizados y uniones discretas de acero negro. Los prompts solicitan un cockpit Rally vertical, un Formula reclinado, un soporte de volante, un soporte de pedalera, un asiento y un pack de dos soportes. Las escenas editoriales muestran una articulación, un estudio de plegado y muestras de materiales. Las medidas y las afirmaciones técnicas de las láminas quedan fuera del contenido público.

El contrato `ProductMedia` admite rutas a modelos y recursos de montaje y plegado con una imagen de portada. La V1 muestra dos conceptos independientes en una secuencia ligada al scroll en escritorio y en bloques estáticos en móvil y con movimiento reducido. Para mostrar el recorrido físico de recogida se necesitan un prototipo validado y material grabado o aprobado.

## SEO y evolución de la tienda

El build genera HTML con metadatos por ruta, directivas de robots para páginas de prueba y un `404.html`. El cuerpo de la web se renderiza en Vue. Define `VITE_SITE_URL` como origen HTTPS público en el build de producción para generar canónicas, imágenes sociales absolutas, sitemap y robots.txt.

Las familias, las descripciones y sus estados son provisionales. Validar fotografías de cada familia, modelos, plegado, compatibilidad y contenidos legales antes de activar la tienda. Los textos en español se pueden extraer a mensajes por vista cuando se incorpore i18n.

# WoodRig · V1

Web comercial de una gama de cockpits y soportes de simracing en desarrollo.

## Desarrollo local

Requisitos: Node.js 22 y npm.

```sh
npm ci
npm run dev
npm run typecheck
npm run lint
npm run build
```

Vite imprime la URL local. `npm run preview` sirve el contenido compilado de `dist/`. El alojamiento estático debe resolver las rutas de la aplicación con `index.html` y servir los archivos existentes directamente.

## Verificación de la V1

- Revisa la portada en móvil, tablet y escritorio. Comprueba que no haya desplazamiento horizontal y que el selector del hero muestre la imagen y el pie correspondientes.
- Abre y cierra el menú móvil con teclado. Al cambiar de página, el foco debe quedar en el contenido principal. Los enlaces a secciones deben desplazarse hasta su destino bajo la cabecera.
- Desde el configurador, añade una selección al carrito, revisa el pedido y confirma la simulación. Comprueba que aparezca la misma referencia en el área de cliente durante la sesión.
- Abre directamente una ficha y una página legal en la vista previa. Comprueba que carguen al recargar y que la consola no muestre errores.

## Estructura

- `src/views` contiene la home, el catálogo y las fichas, la experiencia de configuración, el flujo de pedido de prueba y las páginas de marca, ayuda y legales.
- `src/components` reúne la navegación, el pie, el hero, la sección de ingeniería y las tarjetas de familia.
- `src/data/catalog.ts` es la fuente de datos provisional. Las vistas pueden conservar el contrato de `src/types/catalog.ts` al conectar el catálogo a una API.
- `src/stores/commerce.ts` gestiona el configurador, el carrito y los pedidos de demostración en memoria. El flujo se reinicia al recargar y no pide datos personales ni envía órdenes.
- `src/styles` centraliza la paleta, tipografía, escalas y reglas comunes. Las composiciones cambian en 900 px y las rejillas compactas en 600 px.
- `src/config/site.ts` centraliza el contacto, las redes y la navegación legal. Los cinco documentos de ejemplo se editan en `src/data/legal.ts`. Sustituye el titular, el contacto y las condiciones ficticias por los datos y procesos de la tienda antes de publicar.

## Imágenes y experiencias de producto

Los WebP de `public/images` son renders conceptuales creados con la herramienta integrada de imágenes tomando como referencia las dos láminas facilitadas por Jordi. El hero carga una variante más ligera en móvil y las tarjetas muestran una imagen específica de cada familia.

La dirección visual usa luz suave, perfiles delgados de roble laminado, huecos mecanizados y uniones discretas de acero negro. Los prompts solicitan un cockpit Rally vertical, un Formula reclinado, un soporte de volante, un soporte de pedalera, un asiento y un pack de dos soportes. Las escenas editoriales muestran una articulación, un estudio de plegado y muestras de materiales. Las medidas y las afirmaciones técnicas de las láminas quedan fuera del contenido público.

El contrato `ProductMedia` admite rutas a modelos y recursos de montaje y plegado con una imagen de portada. Al recibir assets validados, la vista puede resolver qué presentación usar y cargar un componente 3D o de reproducción de forma diferida. Para recorridos lineales, valorar una secuencia prerenderizada o un vídeo con búsqueda temporal. Las secuencias necesitan fotogramas aprobados y una alternativa estática para movimiento reducido. La V1 usa un acercamiento fotográfico ligado al scroll en escritorio.

## SEO y evolución de la tienda

La V1 incluye etiquetas base y Open Graph. Para publicar el catálogo, generar HTML por cada ruta indexable a partir de los slugs de la fuente de datos. Un prerender en CI encaja con fichas que cambian al publicar. Si disponibilidad o contenido requieren datos al vuelo, usar SSR sobre Vite y Vue. Cada ficha debe emitir título y descripción únicos, canonical y Open Graph con URL absoluta. Generar sitemap a partir de la misma fuente y devolver un 404 HTTP para fichas inexistentes.

Las familias, las descripciones y sus estados son provisionales. Validar fotografías de cada familia, modelos, plegado, compatibilidad y contenidos legales antes de activar la tienda. Los textos en español se pueden extraer a mensajes por vista cuando se incorpore i18n.

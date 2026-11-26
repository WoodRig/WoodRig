# Roadmap del piloto WoodRig

La [propuesta de gama actualizada](propuesta-gama.md) sitúa Pedals como primera muestra funcional y Rally como primer cockpit fijo desmontable. Los hitos de abajo recogen el plan anterior del piloto.

## Entrega de investigación y web

| Fase | Resultado | Referencia |
| --- | --- | --- |
| Mercado | Alternativas, segmento inicial y umbrales de entrevista | `bd6ad76` |
| Viabilidad | Costes iniciales y por pedido, escenarios y equilibrio | `df085d2` |
| UX/UI | Portada reconstruida, jerarquía de la ficha y guía de espacio | `b9f79aa` |
| Interacción | Comparador que abre el configurador y secuencia de scroll basada en dos estudios de producto | `5882355` |
| SEO y captación | HTML por ruta, directivas de indexación y experimentos | `dfed458` |
| Cierre | Revisión del build, orden de lectura de las escenas en móvil e índice de documentación | Commit de cierre |

## Verificación del build

- Escritorio 1440 px, tablet 768 px y móvil 360 px. En escritorio se comprobó el cambio de la máscara de scroll. En tablet y móvil aparecen ambas escenas en orden y sin desbordamiento horizontal.
- Apertura y cierre del menú con teclado, selección de Formula y llegada al configurador con el modelo correcto. El carrito y el pedido de demostración se conservaron al recargar. Sin errores de consola durante ese recorrido en el build de producción.
- Las rutas directas de cockpit, ficha y checkout devolvieron su título en el HTML. Se comprobó `noindex` en el checkout y en el documento 404. En un build con un origen de prueba se comprobó la canónica, la generación del sitemap y la exclusión de rutas de prueba.

## Próximas decisiones

1. **Prototipo y recogida.** Medir huella en uso y recogido, registrar qué queda montado y verificar estabilidad y montaje antes de publicar compatibilidades. Fotografiar y grabar el mismo prototipo en ambos estados.
2. **Demanda y coste.** Hacer las [entrevistas](mercado-y-competencia.md) y las [cotizaciones](costes-y-viabilidad.md). Continuar con un microlote cuando se cumplan ambos criterios de avance.
3. **Publicación.** Confirmar el dominio público y fijar `VITE_SITE_URL` en el build. Validar códigos HTTP, robots, cobertura y canónicas sobre el hosting. Ejecutar los experimentos de captación y las sesiones UX cuando haya participantes.
4. **Venta.** Activar cobros y envíos al validar prototipo, capacidad de fabricación, precios, condiciones y datos legales.

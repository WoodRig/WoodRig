# SEO y captación

La auditoría encontró metadatos generados solo después de inicializar Vue y una respuesta general para cualquier ruta. El build genera ahora un HTML por ficha y ruta conocida, con título, descripción, imagen social y directiva de robots, más una página 404. Las fichas enlazan con la comparación. Los borradores legales, el carrito, el checkout y el historial emiten `noindex` desde el HTML inicial.

| Intención a contrastar | Página de entrada | Siguiente acción |
| --- | --- | --- |
| Cockpit simracing para casa o espacio reducido | `/` | Comparar Rally y Formula |
| Cockpit Formula frente a postura vertical | `/cockpits` | Ver modelo o probar configuración |
| Soporte de volante o pedalera | `/soportes` | Explorar soportes independientes |
| Qué medir para instalar un cockpit | `/compatibilidad` | Revisar la guía |
| WoodRig Rally o WoodRig Formula | Fichas de producto | Comprobar medidas y probar configuración |

Las búsquedas son hipótesis de intención, sin volumen estimado. En producción, configura `VITE_SITE_URL` con el origen HTTPS aprobado para canónicas, imágenes sociales absolutas y sitemap. Después verifica URL, códigos y cobertura en el dominio público. El contenido sigue siendo una SPA. Evalúa prerender de contenido si las páginas elegibles muestran problemas de rastreo. Los conceptos aún carecen de oferta comercial o reseñas verificadas. El marcado de oferta se plantea tras cerrar catálogo y precios.

## Experimentos sin gasto publicitario

| Experimento | Mensaje y destino | Esfuerzo y señal |
| --- | --- | --- |
| Entrevistas en comunidades de simracing | «¿Dónde guardas el volante y la pedalera?» → `/compatibilidad?utm_source=comunidad&utm_medium=organic&utm_campaign=piloto_rally` | 3 h. Conseguir 8 conversaciones y registrar qué equipo desmonta cada persona. Participar con permiso de la comunidad. |
| Comparación de posturas | «¿Prefieres la postura vertical o reclinada?» → `/cockpits?utm_source=video&utm_medium=organic&utm_campaign=piloto_rally` | 3–4 h. Con 10 pruebas, al menos 8 personas identifican las dos posturas y 4 abren una configuración. Registrar las acciones durante sesiones moderadas. |
| Demostración de recogida | Vídeo corto del prototipo medido → `/producto/rally?utm_source=demo&utm_medium=organic&utm_campaign=piloto_rally` | Tras grabar el prototipo, 4 h. Buscar 3 interesados al precio entregado del escenario base. Medir respuestas manualmente. |

Los destinos funcionan con parámetros de campaña. La medición inicial se hace con sesiones observadas y recuentos manuales. Antes de activar analítica, decidir herramienta, consentimiento y eventos. Las pruebas y campañas quedan pendientes de ejecución con personas reales.

Referencias técnicas. [SEO de aplicaciones JavaScript](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics) · [Configuración de Vercel](https://vercel.com/docs/project-configuration/vercel-json)

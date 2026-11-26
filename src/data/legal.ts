const exampleCompany = 'WoodRig Equipamiento, S. L.'
const exampleAddress = 'Calle del Taller, 24, 46024 València, España'
const exampleEmail = 'legal@woodrig.example'

interface LegalPage {
  title: string
  intro: string
  sections: { title: string; text: string }[]
  reference: { label: string; url: string }
}

export const legalPages: Record<string, LegalPage> = {
  aviso: {
    title: 'Aviso legal',
    intro: 'Información sobre el titular de WoodRig y las condiciones de uso del sitio.',
    sections: [
      { title: 'Titular del sitio', text: `${exampleCompany} (sociedad ficticia), con domicilio de ejemplo en ${exampleAddress}. NIF y datos registrales pendientes de incorporar. Correo de ejemplo: ${exampleEmail}.` },
      { title: 'Uso del sitio', text: 'El sitio presenta la gama y los conceptos de diseño de WoodRig. Puedes consultar y compartir enlaces al contenido. Las imágenes conceptuales son ilustrativas y las características definitivas se identificarán en cada ficha comercial.' },
      { title: 'Contenidos y propiedad intelectual', text: 'Los textos, imágenes y signos distintivos están sujetos a los derechos de sus respectivos titulares. Su reproducción o uso comercial requiere autorización, salvo en los supuestos permitidos por ley.' },
    ],
    reference: { label: 'Ley 34/2002 · BOE', url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758' },
  },
  privacidad: {
    title: 'Política de privacidad',
    intro: 'Ejemplo de cómo WoodRig informaría sobre el tratamiento de datos en la tienda.',
    sections: [
      { title: 'Responsable', text: `${exampleCompany}, con domicilio de ejemplo en ${exampleAddress}. Dirección de ejemplo para privacidad: ${exampleEmail}.` },
      { title: 'La web actual', text: 'Esta versión presenta el catálogo y permite simular pedidos sin solicitar datos personales. El historial de demostración se guarda en el almacenamiento de sesión del navegador. En producción, el proveedor de alojamiento podría registrar datos técnicos de acceso y seguridad.' },
      { title: 'Finalidades y bases jurídicas previstas', text: 'Al habilitar la tienda, se usarían los datos de contacto, entrega y pedido para gestionar la compra, la expedición y la posventa sobre la base del contrato. La facturación y las obligaciones tributarias se atenderían por obligación legal. Las promociones por correo se enviarían con consentimiento y una opción de baja.' },
      { title: 'Conservación y destinatarios', text: 'En el ejemplo, los datos de los pedidos se conservarían mientras se gestione la compra y durante los plazos exigidos por ley. Los proveedores de alojamiento, transporte y pagos recibirían los datos necesarios para su servicio. El plazo de los registros técnicos, los proveedores definitivos y sus posibles transferencias internacionales se documentarán antes del lanzamiento.' },
      { title: 'Tus derechos', text: `Puedes solicitar acceso, rectificación, supresión, oposición, limitación y portabilidad cuando procedan, retirar tu consentimiento y presentar una reclamación ante la AEPD. El canal de contacto del ejemplo es ${exampleEmail}.` },
    ],
    reference: { label: 'Reglamento general de protección de datos · EUR-Lex', url: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj/spa' },
  },
  cookies: {
    title: 'Política de cookies',
    intro: 'Qué tecnologías de almacenamiento utiliza esta versión de WoodRig.',
    sections: [
      { title: 'Uso actual', text: 'La aplicación usa almacenamiento de sesión para recuperar el carrito y los pedidos de demostración al recargar la pestaña. La selección del configurador se conserva en memoria o se puede compartir mediante su enlace.' },
      { title: 'Si se incorporan cookies en producción', text: 'La versión publicada detallará el proveedor, la finalidad y la duración de cada tecnología. Las opciones para aceptar y rechazar las cookies opcionales aparecerán en el mismo nivel y sus preferencias podrán cambiarse posteriormente.' },
      { title: 'Configuración del navegador', text: 'Puedes consultar, bloquear o borrar las cookies desde los ajustes de privacidad de tu navegador.' },
    ],
    reference: { label: 'Guía sobre el uso de las cookies · AEPD', url: 'https://www.aepd.es/guias/guia-cookies.pdf' },
  },
  compra: {
    title: 'Condiciones de compra',
    intro: 'Ejemplo de condiciones para la futura tienda WoodRig. La web permite probar el flujo de pedido sin realizar pagos ni envíos.',
    sections: [
      { title: 'Vendedor y confirmación', text: `El vendedor del ejemplo es ${exampleCompany}. En una tienda activa, tras revisar el pedido y autorizar el pago, el cliente recibiría un correo con el número de pedido, el resumen y las condiciones aplicables.` },
      { title: 'Precios y pago', text: 'El precio final se mostraría en euros antes de pagar, con los impuestos aplicables y el coste de envío desglosado. Los medios de pago disponibles se mostrarían en el último paso del pedido.' },
      { title: 'Garantía legal', text: 'En el caso de bienes nuevos vendidos a consumidores en España, el plazo legal para la manifestación de faltas de conformidad es, con carácter general, de tres años desde la entrega. Si hay una incidencia, el vendedor puede solicitar la referencia del pedido y una descripción del problema para tramitarla.' },
      { title: 'Atención y reclamaciones', text: `Como ejemplo, las consultas sobre pedidos y las reclamaciones se dirigirían a ${exampleEmail}. El cliente conserva los derechos y vías de reclamación previstos en la normativa de consumo aplicable.` },
    ],
    reference: { label: 'Ley General para la Defensa de los Consumidores y Usuarios · BOE', url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2007-20555' },
  },
  envios: {
    title: 'Envíos y devoluciones',
    intro: 'Ejemplo de cómo funcionaría la entrega y la devolución de un pedido WoodRig.',
    sections: [
      { title: 'Entrega', text: 'Como ejemplo, un artículo en stock podría entregarse en España peninsular en 3 a 5 días laborables. La cobertura, el coste y la fecha estimada se confirmarían antes del pago. Al expedir el pedido, el cliente recibiría un enlace de seguimiento.' },
      { title: 'Desistimiento', text: `En compras a distancia de bienes, los consumidores disponen, con carácter general, de 14 días naturales desde la recepción para comunicar el desistimiento, con las excepciones legales aplicables. En el ejemplo bastaría enviar una declaración clara a ${exampleEmail}, indicando la referencia del pedido y el artículo. También puede utilizarse el modelo legal de formulario.` },
      { title: 'Devolución y reembolso', text: 'Tras comunicar el desistimiento, los bienes deben devolverse en un máximo de 14 días naturales. El coste directo de devolución podrá recaer en el cliente si se informó previamente. El vendedor reembolsará el importe y el coste de la entrega estándar en los términos legales y puede esperar a recibir el artículo o la prueba de su devolución, si procede.' },
      { title: 'Daños y errores de envío', text: 'Si llega un artículo dañado o distinto del pedido, el equipo de soporte gestionaría la incidencia conforme a los derechos legales de conformidad.' },
    ],
    reference: { label: 'Normativa de consumo y modelo de desistimiento · BOE', url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2007-20555' },
  },
}

# Jey Cee — identidad, atención y solicitud de compra

Sitio estático, sin instalación de dependencias ni compilación. Desde la raíz: `python3 -m http.server 8000`.

## Páginas

- `index.html`: portada cinematográfica y accesos al universo de la marca.
- `drop-i.html`: presentación oficial de Drop I, previsto para octubre de 2026.
- `catalogo.html`: 12 opciones, seis oversized y seis boxy de mujer; filtros y selección de cantidades.
- `maison.html`: quiénes somos, misión, visión y los ocho principios autorizados.
- `soporte.html`: preguntas frecuentes, canales oficiales y preparación de consultas por correo.
- `checkout.html`: selección consultada, contacto, entrega, facturación, preferencia de pago y revisión previa.
- `informacion.html`: funcionamiento de las solicitudes, pagos, tratamiento de datos y atención posterior.

La escritura visible de la marca es siempre “Jey Cee”. No se ha publicado el documento interno del asistente. Se han utilizado únicamente sus contenidos públicos autorizados para identidad, contactos y preguntas frecuentes.

## Compras y pagos

Catálogo autorizado por el usuario: suéteres oversized y suéteres boxy de mujer, en negro, blanco, navy, maroon, tan y verde. Ambas líneas cuestan $35.00 + ITBMS 7% ($37.45 por unidad). Los dibujos son ilustraciones de referencia; no se han recibido fotografías del producto. No se inventan tallas ni existencias. El checkout calcula subtotal, ITBMS y total de prendas con aritmética en centavos. El envío y el importe final se confirman con el equipo. No cobra, reserva inventario ni confirma pedidos automáticamente.

- Atención y solicitudes: WhatsApp +507 6091-3544.
- Yappy: 6827-4965. Se indica esperar la confirmación antes de transferir.
- Efectivo: condiciones por coordinar; no se promete pago contra entrega.
- Facturación: nombre/razón social, documento, DV, dirección y correo. RUC y DV obligatorios para la opción empresa. No se emiten facturas fiscales desde la web.

El visitante revisa y puede corregir sus datos antes de abrir WhatsApp. El envío se completa en WhatsApp. Existe alternativa de correo. No hay base de datos ni almacenamiento del navegador para datos personales. Solo se conserva en sessionStorage una lista validada de identificadores y cantidades de prendas para navegar entre catálogo y checkout. Los enlaces externos de mensajería incluyen los datos introducidos y se explica antes de continuar.

## Recursos

Las fotografías editoriales son referencias visuales, no imágenes de productos oficiales. Se sirven localmente para evitar depender de conexiones a terceros durante la visita:

- Portada: identificador de origen Unsplash photo-1539109136881-3be0616acf4b.
- Referencia editorial: identificador de origen Unsplash photo-1529139574466-a303027c1d8b.
- Logo: versión PNG transparente adaptada a partir del logotipo facilitado en la conversación, utilizada en cabecera, pie e icono del sitio.
- Tipografías: DM Sans e Italiana de Google Fonts; licencias OFL incluidas en `assets/fonts`.

No hay analítica, pasarela de cobro ni gestión automática de pedidos. Para activar venta automática se necesitará una integración comercial en una tarea posterior. Instagram actualizado a @jeyceeshop; correo de atención confirmado: hello@jeycee.shop.

## Validación

Chromium: siete páginas y enlaces internos; catálogo, doce colores/modelos, filtros, suma de cantidades, persistencia de sesión, edición y eliminación, importes exactos (seis prendas: $210.00 + $14.70 = $224.70), validación de datos de sesión; ausencia de desbordamiento a 375, 768 y 1440 px; menú móvil y Escape; validación de campos; solicitud Yappy; revisión y corrección; factura de empresa con RUC/DV; efectivo; retorno a persona natural; texto de usuario sin interpretar HTML; ausencia de datos personales en localStorage/sessionStorage; soporte por correo; FAQ; movimiento reducido; carga de imágenes; ausencia de errores JavaScript.

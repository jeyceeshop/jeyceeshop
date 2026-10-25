# Jey Cee — identidad, atención y solicitud de compra

Sitio estático, sin instalación de dependencias ni compilación. Desde la raíz: `python3 -m http.server 8000`.

## Páginas

- `index.html`: portada cinematográfica y accesos al universo de la marca.
- `drop-i.html`: presentación oficial de Drop I, previsto para octubre de 2026.
- `maison.html`: quiénes somos, misión, visión y los ocho principios autorizados.
- `soporte.html`: preguntas frecuentes, canales oficiales y preparación de consultas por correo.
- `checkout.html`: selección consultada, contacto, entrega, facturación, preferencia de pago y revisión previa.
- `informacion.html`: funcionamiento de las solicitudes, pagos, tratamiento de datos y atención posterior.

La escritura visible de la marca es siempre “Jey Cee”. No se ha publicado el documento interno del asistente. Se han utilizado únicamente sus contenidos públicos autorizados para identidad, contactos y preguntas frecuentes.

## Compras y pagos

No hay catálogo ni precios aprobados. Se retiraron los productos y precios ficticios de la versión anterior. El checkout prepara una solicitud; no cobra, reserva inventario ni confirma pedidos. El equipo debe confirmar disponibilidad, precio, impuestos, envío e importe final.

- Atención y solicitudes: WhatsApp +507 6091-3544.
- Yappy: 6827-4965. Se indica esperar la confirmación antes de transferir.
- Efectivo: condiciones por coordinar; no se promete pago contra entrega.
- Facturación: nombre/razón social, documento, DV, dirección y correo. RUC y DV obligatorios para la opción empresa. No se emiten facturas fiscales desde la web.

El visitante revisa y puede corregir sus datos antes de abrir WhatsApp. El envío se completa en WhatsApp. Existe alternativa de correo. No hay base de datos ni almacenamiento local para datos personales. Los enlaces externos de mensajería incluyen los datos introducidos y se explica antes de continuar.

## Recursos

Las fotografías editoriales son referencias visuales, no imágenes de productos oficiales. Se sirven localmente para evitar depender de conexiones a terceros durante la visita:

- Portada: identificador de origen Unsplash photo-1539109136881-3be0616acf4b.
- Referencia editorial: identificador de origen Unsplash photo-1529139574466-a303027c1d8b.
- Tipografías: DM Sans e Italiana de Google Fonts; licencias OFL incluidas en `assets/fonts`.

No hay analítica, pasarela de cobro ni gestión automática de pedidos. Para activar venta automática se necesitarán catálogo aprobado y una integración comercial en una tarea posterior.

## Validación

Chromium: seis páginas y enlaces internos; ausencia de desbordamiento a 375, 768 y 1440 px; menú móvil y Escape; validación de campos; solicitud Yappy; revisión y corrección; factura de empresa con RUC/DV; efectivo; retorno a persona natural; texto de usuario sin interpretar HTML; ausencia de datos en localStorage/sessionStorage; soporte por correo; FAQ; movimiento reducido; carga de imágenes; ausencia de errores JavaScript.

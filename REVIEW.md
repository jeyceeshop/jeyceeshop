# JEY CEE — Drop I

Propuesta para revisión, sin despliegue ni cambios en `main`.

- Portada editorial con tipografía de gran formato, paleta marfil y oro, movimiento lento de la imagen y entradas escalonadas.
- Sección Drop I con fotografía, ficha editorial y acceso a la selección. No se anuncian existencias, fechas ni cantidades sin confirmar.
- Apariciones al desplazarse, alternativas para movimiento reducido y contenido visible sin JavaScript.
- Accesos a Drop I desde portada, cabecera, menú móvil y pie de página.

## Revisar

Desde la raíz del repositorio, ejecutar `python3 -m http.server 8000` y abrir la web con un navegador. No necesita instalación ni compilación.

Comprobar la portada y Drop I, el menú en móvil, la selección de productos y la búsqueda. Probar también la preferencia del sistema de movimiento reducido. Los estilos y animaciones están en `assets/editorial.css` y `assets/editorial.js`.

Validación automática en Chromium: navegación a Drop I; añadir, quitar y totalizar la bolsa; búsqueda de Signature; aviso del formulario de demostración; menú móvil; ausencia de desbordamiento a 375, 768 y 1440 px; movimiento reducido; ausencia de errores JavaScript. Todas estas comprobaciones pasaron.

La revisión visual con fotografías queda pendiente: la política de red del entorno devuelve 403 para Unsplash. Se guardaron los dominios de imágenes y fuentes en el borrador de configuración del entorno; guardar esa configuración y repetir la revisión visual antes de publicar la web. Las imágenes y fuentes externas ya eran dependencias de la página original.

El catálogo, los precios, la bolsa y el formulario siguen siendo demostraciones. La fotografía es editorial de referencia y no acredita productos reales de la marca. Confirmar contenido, imágenes de producto y disponibilidad antes del lanzamiento.

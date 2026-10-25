(() => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#navigation');
  const setMenu = open => {
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    nav.classList.toggle('open', open);
  };
  menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { setMenu(false); menu.focus(); }
  });
  document.addEventListener('click', e => { if (!e.target.closest('.header')) setMenu(false); });
  window.matchMedia('(min-width: 761px)').addEventListener('change', e => { if (e.matches) setMenu(false); });
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!motion.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    document.documentElement.classList.add('motion');
    motion.addEventListener('change', e => { if (e.matches) { document.documentElement.classList.remove('motion'); observer.disconnect(); } });
  }
  const support = document.querySelector('#support-form');
  if (support) support.addEventListener('submit', e => {
    e.preventDefault();
    if (!support.reportValidity()) return;
    const data = new FormData(support);
    const body = `Consulta a Jey Cee\n\nNombre: ${data.get('name')}\nCorreo: ${data.get('email')}\nTema: ${data.get('topic')}\nReferencia: ${data.get('reference') || 'No indicada'}\n\n${data.get('message')}`;
    const link = document.querySelector('#support-send');
    link.href = `mailto:hello@jeycee.shop?subject=${encodeURIComponent('Consulta: ' + data.get('topic'))}&body=${encodeURIComponent(body)}`;
    link.hidden = false;
    document.querySelector('#support-status').textContent = 'Tu consulta está preparada. Pulsa el enlace para abrir tu aplicación de correo, revisarla y enviarla. Aún no se ha enviado ningún mensaje.';
    link.focus();
  });
  if (support) support.querySelector('[type=submit]').disabled = false;
  const form = document.querySelector('#checkout-form');
  if (!form) return;
  const invoiceType = form.elements.invoiceType;
  const updateInvoice = () => {
    const business = invoiceType.value === 'business';
    form.elements.taxId.required = business;
    form.elements.dv.required = business;
    document.querySelector('#tax-label').textContent = business ? 'RUC *' : 'Cédula / RUC (opcional)';
    document.querySelector('#dv-label').textContent = business ? 'Dígito verificador *' : 'Dígito verificador (si aplica)';
  };
  invoiceType.addEventListener('change', updateInvoice);
  updateInvoice();
  const updatePayment = () => {
    const yappy = form.elements.payment.value === 'Yappy';
    document.querySelector('#yappy-info').hidden = !yappy;
    document.querySelector('#cash-info').hidden = yappy;
    document.querySelector('#payment-summary').textContent = yappy ? 'Yappy' : 'Efectivo';
  };
  form.querySelectorAll('[name="payment"]').forEach(radio => radio.addEventListener('change', updatePayment));
  updatePayment();
  const panel = document.querySelector('#review-panel');
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const get = key => String(data.get(key) || '').trim();
    const delivery = [get('country'), get('region'), get('city'), get('town'), get('address'), get('deliveryNotes')].filter(Boolean).join(' · ');
    const quote = window.JeyCeeCatalog?.quote();
    const money = window.JeyCeeCatalog?.money;
    const hasItems = quote && quote.items.length > 0;
    const rows = [
      ['Solicitud', hasItems ? quote.description : get('selection')],
      ...(hasItems && get('selection') ? [['Comentarios', get('selection')]] : []),
      ['Cantidad solicitada', (hasItems ? quote.items.reduce((sum, item) => sum + item.quantity, 0) : get('quantity')) + ' · Sujeta a disponibilidad'],
      ['Talla de interés', get('size') || 'Por confirmar'],
      ['Contacto', `${get('name')}\n${get('email')}\n${get('phone')}`],
      ['Entrega', delivery],
      ['Facturación', `${get('invoiceType') === 'business' ? 'Empresa' : 'Persona natural'}\n${get('billingName')}\nDocumento: ${get('taxId') || 'No indicado'}\nDV: ${get('dv') || 'No aplica / no indicado'}\n${get('billingAddress') || 'Misma dirección de entrega'}\n${get('billingEmail')}`],
      ['Preferencia de pago', get('payment') + (get('payment') === 'Yappy' ? ' · 6827-4965' : ' · Condiciones por coordinar')],
      ...(hasItems ? [['Subtotal', money(quote.subtotalCents)], ['ITBMS (7%)', money(quote.taxCents)], ['Total de prendas', money(quote.totalCents)]] : []),
      ['Envío e importe final', 'El envío y el importe final se confirman con el equipo antes del pago']
    ];
    const details = document.querySelector('#review-details');
    details.replaceChildren();
    rows.forEach(([label, value]) => {
      const row = document.createElement('div');
      const dt = document.createElement('dt'); dt.textContent = label;
      const dd = document.createElement('dd'); dd.textContent = value;
      row.append(dt, dd); details.append(row);
    });
    const text = 'Hola, Jey Cee. Deseo consultar la siguiente solicitud:\n\n' + rows.map(([label, value]) => `${label}: ${value}`).join('\n\n') + '\n\nComprendo que esta solicitud no confirma un pedido, una reserva ni un pago. Espero la confirmación de disponibilidad, importe final y condiciones.';
    document.querySelector('#whatsapp-send').href = 'https://wa.me/50760913544?text=' + encodeURIComponent(text);
    document.querySelector('#email-request').href = 'mailto:hello@jeycee.shop?subject=' + encodeURIComponent('Solicitud de compra · Jey Cee') + '&body=' + encodeURIComponent(text);
    panel.hidden = false;
    form.classList.add('is-reviewing');
    panel.focus();
    panel.scrollIntoView({ behavior: motion.matches ? 'instant' : 'smooth', block: 'start' });
  });
  form.querySelector('[type=submit]').disabled = false;
  document.querySelector('#edit-request').addEventListener('click', () => {
    panel.hidden = true;
    form.classList.remove('is-reviewing');
    document.querySelector('#request-status').textContent = '';
    form.elements.selection.focus();
  });
  document.querySelector('#whatsapp-send').addEventListener('click', () => {
    document.querySelector('#request-status').textContent = 'Se ha solicitado abrir WhatsApp. Revisa el mensaje y pulsa enviar allí. El envío y la respuesta del equipo no se confirman desde esta web.';
  });
})();

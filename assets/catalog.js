(() => {
  const products = window.JEY_CEE_PRODUCTS || [];
  const storageKey = 'jey-cee-selection-v1';
  const money = cents => '$' + (cents / 100).toFixed(2);
  let cart = [];
  try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey) || '[]');
    if (Array.isArray(saved)) {
      const seen = new Set();
      cart = saved.filter(item => item && products.some(p => p.id === item.id) && Number.isInteger(item.quantity) && item.quantity >= 1 && item.quantity <= 99 && !seen.has(item.id) && seen.add(item.id)).map(({id, quantity}) => ({id, quantity}));
    }
  } catch { /* A restricted browser can still use an in-memory selection. */ }
  const quote = () => {
    const items = cart.map(item => ({...products.find(p => p.id === item.id), quantity: item.quantity}));
    const subtotalCents = items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);
    const taxCents = Math.round(subtotalCents * 7 / 100);
    return { items, subtotalCents, taxCents, totalCents: subtotalCents + taxCents,
      description: items.map(item => `${item.name} · ${item.color} × ${item.quantity} · ${money(item.priceCents * item.quantity)} antes de ITBMS`).join('\n') };
  };
  const persist = () => {
    try { sessionStorage.setItem(storageKey, JSON.stringify(cart)); } catch { /* No personal data or payment details are stored. */ }
    document.querySelectorAll('[data-cart-count]').forEach(el => { el.textContent = cart.reduce((sum, item) => sum + item.quantity, 0); });
  };
  const renderTotals = () => {
    const target = document.querySelector('#cart-totals');
    if (!target) return;
    const q = quote();
    target.replaceChildren();
    const rows = q.items.length ? [['Subtotal',money(q.subtotalCents)],['ITBMS (7%)',money(q.taxCents)],['Total de prendas',money(q.totalCents)]] : [['Subtotal e ITBMS','Selecciona tus prendas']];
    rows.forEach(([label, value]) => { const row = document.createElement('div'); row.className = 'summary-row'; const a = document.createElement('span'); a.textContent = label; const b = document.createElement('span'); b.textContent = value; row.append(a,b); target.append(row); });
  };
  const renderCart = () => {
    const target = document.querySelector('#checkout-cart');
    if (!target) return;
    const q = quote();
    target.replaceChildren();
    if (!q.items.length) { const p = document.createElement('p'); p.className='small'; p.textContent='Tu selección está vacía. Añade prendas desde el catálogo o escribe tu consulta a continuación.'; target.append(p); }
    q.items.forEach(item => {
      const row = document.createElement('div'); row.className='checkout-item';
      const info = document.createElement('div');
      const title = document.createElement('b'); title.textContent=item.name;
      const subtitle = document.createElement('small'); subtitle.textContent=item.color+' · '+money(item.priceCents)+' + ITBMS por unidad';
      const remove = document.createElement('button'); remove.type='button'; remove.className='remove-item'; remove.textContent='Quitar'; remove.setAttribute('aria-label','Quitar '+item.name+' '+item.color);
      remove.addEventListener('click',()=>{cart=cart.filter(p=>p.id!==item.id);persist();renderCart();renderTotals();const focus=target.querySelector('input') || document.querySelector('#checkout-form [name=selection]');focus.focus();});
      info.append(title,subtitle,remove);
      const label=document.createElement('label');label.className='field';label.textContent='Cantidad';
      const input=document.createElement('input');input.type='number';input.min='1';input.max='99';input.step='1';input.required=true;input.value=item.quantity;input.setAttribute('aria-label','Cantidad de '+item.name+' '+item.color);
      input.addEventListener('input',()=>{if(!input.checkValidity())return;const number=input.valueAsNumber;if(!Number.isInteger(number))return;cart.find(p=>p.id===item.id).quantity=number;persist();renderTotals();});
      label.append(input);row.append(info,label);target.append(row);
    });
    const form=document.querySelector('#checkout-form');
    form.elements.selection.required=!q.items.length;
    document.querySelector('#selection-label').textContent=q.items.length?'Comentarios para el equipo (opcional)':'¿Qué te gustaría consultar? *';
    document.querySelector('#consultation-quantity').hidden=!!q.items.length;
    form.elements.quantity.required=!q.items.length;
  };
  persist();renderCart();renderTotals();
  let toastTimer;
  document.querySelectorAll('.add-product').forEach(button=>{
    button.disabled=false;
    button.addEventListener('click',()=>{
      const product=products.find(p=>p.id===button.dataset.product);if(!product)return;
      let item=cart.find(p=>p.id===product.id);
      if(item && item.quantity>=99)return;
      if(item)item.quantity++;else cart.push({id:product.id,quantity:1});
      persist();
      const toast=document.querySelector('#catalog-toast');
      if(toast){toast.replaceChildren();const msg=document.createElement('span');msg.textContent=product.name+' · '+product.color+' añadido. ';const link=document.createElement('a');link.href='checkout.html';link.textContent='Revisar selección ↗';toast.append(msg,link);toast.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>{toast.hidden=true;},7000);}
    });
  });
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
    document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    let count=0;document.querySelectorAll('.catalog-card').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;if(!card.hidden)count++;});
    document.querySelector('#catalog-count').textContent=count+' opciones';
  }));
  window.JeyCeeCatalog={quote,money};
})();

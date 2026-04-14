export function initContactForm() {
  const form = document.getElementById('contact-form') as HTMLFormElement;
  const submitBtn = document.getElementById('contact-submit') as HTMLButtonElement;
  const successMsg = document.getElementById('contact-success');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const nombre = formData.get('nombre') as string;
    const telefono = formData.get('telefono') as string;

    if (!nombre?.trim() || !telefono?.trim()) {
      alert('Please fill in at least your name and phone number.');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    const mensaje = [
      'Hello, I want to sell my gold.',
      'Name: ' + nombre,
      'Phone: ' + telefono,
      formData.get('piezas') ? 'Items: ' + formData.get('piezas') : '',
      formData.get('zona') ? 'Area: ' + formData.get('zona') : '',
    ].filter(Boolean).join('\n');

    const whatsappUrl = 'https://wa.me/16231234567?text=' + encodeURIComponent(mensaje);
    window.open(whatsappUrl, '_blank');

    form.style.display = 'none';
    if (successMsg) successMsg.style.display = 'block';
  });
}

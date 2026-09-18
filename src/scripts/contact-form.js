export function initContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;
  const status = form.querySelector('.form-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Sending…';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error(String(res.status));
      status.textContent = "Thanks — I'll get back to you soon.";
      form.reset();
    } catch {
      status.textContent = `Something went wrong — please email me directly at ${form.dataset.email}.`;
    }
  });
}

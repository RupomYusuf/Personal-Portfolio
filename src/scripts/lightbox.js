/** Lightbox over native <dialog>. Triggers: [data-lightbox-trigger]
 * with data-full (image URL) and data-alt (alt text). */
export function initLightbox() {
  const triggers = [...document.querySelectorAll('[data-lightbox-trigger]')];
  if (!triggers.length) return;

  const dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.innerHTML = `
    <button type="button" class="lightbox__close" aria-label="Close">✕</button>
    <img class="lightbox__img" alt="" />
    <p class="lightbox__caption"></p>
    <button type="button" class="lightbox__nav lightbox__prev" aria-label="Previous image">‹</button>
    <button type="button" class="lightbox__nav lightbox__next" aria-label="Next image">›</button>
  `;
  document.body.append(dialog);
  const img = dialog.querySelector('.lightbox__img');
  const caption = dialog.querySelector('.lightbox__caption');
  let index = 0;
  let opener = null;

  const show = (i) => {
    index = (i + triggers.length) % triggers.length;
    const t = triggers[index];
    img.src = t.dataset.full;
    img.alt = t.dataset.alt || '';
    caption.textContent = `${index + 1} / ${triggers.length}`;
  };

  triggers.forEach((t, i) => {
    t.addEventListener('click', () => {
      opener = t;
      show(i);
      dialog.showModal();
    });
  });

  dialog
    .querySelector('.lightbox__close')
    .addEventListener('click', () => dialog.close());
  dialog
    .querySelector('.lightbox__prev')
    .addEventListener('click', () => show(index - 1));
  dialog
    .querySelector('.lightbox__next')
    .addEventListener('click', () => show(index + 1));

  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });

  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });

  dialog.addEventListener('close', () => {
    img.src = '';
    opener?.focus();
  });
}

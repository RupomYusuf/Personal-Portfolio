/** Category filter for the Work grid. Tabs carry data-category; cards carry
 * data-category. 'All' shows everything. */
export function initFilter() {
  const tabs = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-category]');
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.filter;
      tabs.forEach((t) =>
        t.setAttribute('aria-pressed', String(t === tab)),
      );
      cards.forEach((card) => {
        const show = target === 'All' || card.dataset.category === target;
        card.hidden = !show;
      });
    });
  });
}

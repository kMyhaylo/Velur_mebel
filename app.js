/* =========================================================
   VELUR MEBEL NIKO — script.js
   Mobile nav · smooth scroll · scroll-reveal · FAQ accordion
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. CURRENT YEAR IN FOOTER ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- 2. STICKY HEADER SHADOW ON SCROLL ---------- */
  const header = document.querySelector('.site-header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- 3. MOBILE NAV TOGGLE ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-nav');

  const closeNav = () => {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Відкрити меню');
  };

  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Закрити меню' : 'Відкрити меню');
  });

  /* ---------- 4. SMOOTH SCROLL (with sticky-header offset) ---------- */
 /* ---------- 4. SMOOTH SCROLL (with sticky-header offset) ---------- */
  const headerHeight = () => header.offsetHeight;

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id === '#' || id.length < 2) return;

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      closeNav(); // закриваємо мобільне меню, якщо воно відкрите

      // Додана перевірка: якщо клікаємо на лого (#top), скролимо в самий нуль
      if (id === '#top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Для всіх інших секцій скролимо з урахуванням висоти шапки
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight() + 1;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---------- 5. SCROLL-REVEAL (fade / rise in) ---------- */
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target); // reveal once, then stop watching
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    reveals.forEach(el => io.observe(el));
  } else {
    // Fallback: just show everything
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- 6. FAQ ACCORDION ---------- */
  const faqButtons = document.querySelectorAll('.faq__q');

  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const panel = btn.nextElementSibling; // .faq__a

      // Close every item first (single-open accordion)
      faqButtons.forEach(other => {
        other.setAttribute('aria-expanded', 'false');
        other.nextElementSibling.style.maxHeight = null;
      });

      // Open the clicked one if it was closed
      if (!expanded) {
        btn.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  // Keep an open FAQ panel sized correctly after viewport resize
  window.addEventListener('resize', () => {
    document.querySelectorAll('.faq__q[aria-expanded="true"]').forEach(btn => {
      const panel = btn.nextElementSibling;
      panel.style.maxHeight = panel.scrollHeight + 'px';
    });
  });

});
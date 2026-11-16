// PF Prime Premium — animações de entrada e contadores
// Carrega depois de main.js. Sem JS, o conteúdo fica visível (ver classe .js no CSS).
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('js');

  // Marca os elementos que devem aparecer ao rolar e aplica atraso em cascata
  var reveals = document.querySelectorAll(
    '.section-head, .service-card, .process-step, .trust-item, .trust-figure, ' +
    '.faq-item, .area-list li, .contact-info, .form, .detail-item, .legal .container > *'
  );
  var groups = new Map();
  reveals.forEach(function (el) {
    el.classList.add('reveal');
    var parent = el.parentElement;
    var n = groups.get(parent) || 0;
    el.style.setProperty('--d', (Math.min(n, 6) * 0.08).toFixed(2) + 's');
    groups.set(parent, n + 1);
  });

  // Animação de entrada da hero: sobe em sequência
  document.querySelectorAll('.hero-copy > *, .hero .container > div:first-child > *').forEach(function (el, i) {
    el.classList.add('anim');
    el.style.setProperty('--d', (0.1 + i * 0.12).toFixed(2) + 's');
  });
  document.querySelectorAll('.hero-panel .panel-list li').forEach(function (li, i) {
    li.style.setProperty('--i', i);
  });

  // Marquee das marcas: duplica a lista para o loop ser contínuo
  var brandStrip = document.querySelector('.brand-strip');
  if (brandStrip) {
    var wrap = document.createElement('div');
    wrap.className = 'marquee';
    var track = document.createElement('div');
    track.className = 'marquee-track';
    var names = Array.prototype.map.call(brandStrip.querySelectorAll('.brand-chip'), function (c) {
      return c.textContent;
    });
    var buildHalf = function () {
      names.forEach(function (name) {
        var item = document.createElement('span');
        item.className = 'marquee-item';
        item.textContent = name;
        track.appendChild(item);
      });
    };
    buildHalf();
    buildHalf();
    wrap.appendChild(track);
    brandStrip.parentNode.replaceChild(wrap, brandStrip);
  }

  // Contadores numéricos (ex.: <div class="big" data-count="90" data-suffix=" dias">)
  var countUp = function (el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    if (isNaN(target)) return;
    if (reduce) { el.textContent = target + suffix; return; }
    var dur = 1400, start = null;
    var step = function (ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  var counters = document.querySelectorAll('[data-count]');

  if (!('IntersectionObserver' in window) || reduce) {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-visible'); });
    counters.forEach(countUp);
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      entry.target.querySelectorAll && entry.target.querySelectorAll('[data-count]').forEach(countUp);
      if (entry.target.hasAttribute('data-count')) countUp(entry.target);
      io.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  counters.forEach(function (el) {
    if (!el.closest('.reveal')) io.observe(el);
  });
})();

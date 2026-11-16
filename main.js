// PF Prime Premium — comportamento do site
// Número de WhatsApp: troque WHATSAPP_NUMBER (somente dígitos, com DDI 55) e,
// nos HTMLs, o mesmo número em "wa.me/" e "tel:".
var WHATSAPP_NUMBER = '5531991248002';
var WHATSAPP_MSG = 'Olá! Vim pelo site da PF Prime Premium e gostaria de agendar um diagnóstico.';

window.dataLayer = window.dataLayer || [];

// Eventos de conversão para o Google Tag Manager
document.addEventListener('click', function (e) {
  var a = e.target.closest ? e.target.closest('a[href]') : null;
  if (!a) return;
  var href = a.getAttribute('href') || '';
  if (href.indexOf('wa.me') > -1) {
    window.dataLayer.push({ event: 'click_whatsapp', link_url: href, pagina: location.pathname });
  } else if (href.indexOf('tel:') === 0) {
    window.dataLayer.push({ event: 'click_telefone', link_url: href, pagina: location.pathname });
  }
});

document.addEventListener('DOMContentLoaded', function () {

  // Menu mobile
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('nav-open', open);
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Mobile: cabeçalho some ao rolar para baixo e volta ao rolar para cima
  var header = document.querySelector('.site-header');
  if (header) {
    var lastY = window.pageYOffset;
    window.addEventListener('scroll', function () {
      var y = window.pageYOffset;
      var menuOpen = nav && nav.classList.contains('open');
      if (window.innerWidth <= 900 && !menuOpen && y > 80 && y > lastY + 4) {
        header.classList.add('is-hidden');
      } else if (y < lastY - 4 || y <= 80) {
        header.classList.remove('is-hidden');
      }
      lastY = y;
    }, { passive: true });
  }

  // Ano corrente no rodapé
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Banner de cookies (LGPD / consentimento para anúncios do Google)
  var COOKIE_KEY = 'pfp_cookie_consent';
  var bar = document.querySelector('.cookie-bar');
  if (bar) {
    try {
      if (!localStorage.getItem(COOKIE_KEY)) bar.classList.add('show');
    } catch (err) { bar.classList.add('show'); }
    var accept = bar.querySelector('[data-cookie-accept]');
    if (accept) {
      accept.addEventListener('click', function () {
        try { localStorage.setItem(COOKIE_KEY, 'accepted'); } catch (err) {}
        bar.classList.remove('show');
      });
    }
  }

  // Formulário de contato -> monta mensagem e abre WhatsApp
  var form = document.querySelector('#form-diagnostico');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nome = form.nome.value.trim();
      var aparelho = form.aparelho.value;
      var marca = form.marca.value;
      var bairro = form.bairro.value.trim();
      var mensagem = form.mensagem.value.trim();

      if (!nome || !aparelho) {
        form.reportValidity();
        return;
      }

      var texto = 'Olá! Meu nome é ' + nome +
        '. Preciso de diagnóstico para: ' + aparelho +
        (marca ? ' (marca: ' + marca + ')' : '') +
        (bairro ? ' — bairro: ' + bairro : '') +
        (mensagem ? '. Detalhes: ' + mensagem : '') + '.';

      window.dataLayer.push({ event: 'envio_formulario', aparelho: aparelho, pagina: location.pathname });
      var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(texto);
      window.open(url, '_blank', 'noopener');
    });
  }
});

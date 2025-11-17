// FAQ Toggle (click to expand/collapse)
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', () => item.classList.toggle('active'));
});

// MODALS – Open any modal (products, battery/fan, Book Now popup)
document.querySelectorAll('[data-modal]').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const modal = document.getElementById(btn.dataset.modal);
    if (modal) {
      document.querySelectorAll('.modal.active').forEach(m => m.classList.remove('active'));
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

// MODALS – Close with ×, background click, or Escape
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal') || e.target.classList.contains('modal-close')) {
    e.target.closest('.modal')?.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.active').forEach(m => {
      m.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }
});

// Back to Top
document.querySelector('.back-to-top')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// CAROUSELS – Product & FAQ (now beautiful on mobile!)
$(document).ready(function () {

  // PRODUCT CAROUSEL – 5 full clickable cards on desktop
  $('.product-carousel').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    dots: true,
    centerMode: false,
    variableWidth: false,
    infinite: true,
    speed: 500,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768,  settings: { slidesToShow: 2 } },
      { breakpoint: 480,  settings: { slidesToShow: 1, centerMode: true, centerPadding: '15%', dots: false } }
    ]
  });

  // FAQ CAROUSEL – Perfect on mobile, tablet & desktop
  $('.faq-container').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: true,
    dots: true,
    mobileFirst: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          centerMode: true,
          centerPadding: '10px'
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          centerMode: true,
          variableWidth: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          centerMode: true,
          variableWidth: true
        }
      }
    ]
  });

});

// Calendly Embed
(function (C, A, L) {
  let p = function (a, ar) { a.q.push(ar); };
  let d = C.document;
  C.Cal = C.Cal || function () {
    let cal = C.Cal;
    let ar = arguments;
    if (!cal.loaded) {
      cal.ns = {}; cal.q = cal.q || [];
      d.head.appendChild(d.createElement("script")).src = A;
      cal.loaded = true;
    }
    if (ar[0] === L) {
      const api = function () { p(api, arguments); };
      const namespace = ar[1];
      api.q = api.q || [];
      typeof namespace === "string" ? (cal.ns[namespace] = cal.ns[namespace] || api, p(cal.ns[namespace], ar), p(cal, ["initNamespace", namespace])) : p(cal, ar);
      return;
    }
    p(cal, ar);
  };
})(window, "https://cal.gascompany.co.za/embed/embed.js", "init");
Cal("init", "installation-site-visits", { origin: "https://cal.gascompany.co.za" });

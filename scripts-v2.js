// FAQ toggle (unchanged – works perfectly)
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('active');
  });
});

// ==================== FIXED MODAL SYSTEM ====================
// Works for: Battery/Fan modals, ALL product modals (including TGC 12L & 16L), and Book Now popup
document.querySelectorAll('[data-modal]').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    const modalId = this.getAttribute('data-modal');
    const targetModal = document.getElementById(modalId);

    if (!targetModal) {
      console.error('Modal not found:', modalId);
      return;
    }

    // Close any currently open modal first (prevents overlap)
    document.querySelectorAll('.modal.active').forEach(m => m.classList.remove('active'));

    // Open the requested modal
    targetModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop background scroll
  });
});

// Close buttons (×) – works on ALL modals including cta-popup
document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', function() {
    this.closest('.modal').classList.remove('active');
    document.body.style.overflow = 'auto';
  });
});

// Close when clicking the dark background (but NOT content)
window.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal') && e.target.classList.contains('active')) {
    e.target.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Close with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.active').forEach(modal => {
      modal.classList.remove('active');
    });
    document.body.style.overflow = 'auto';
  }
});

// Back to top
document.querySelector('.back-to-top')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==================== CAROUSELS (unchanged & working) ====================
$(document).ready(function() {
  $('.product-carousel').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    dots: true,
    centerMode: true,
    variableWidth: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768,  settings: { slidesToShow: 2 } },
      { breakpoint: 480,  settings: { slidesToShow: 1, dots: false } }
    ]
  });

  // FAQ Carousel only on desktop
  function initFaqCarousel() {
    const $faq = $('.faq-container');
    if (window.innerWidth >= 769) {
      if (!$faq.hasClass('slick-initialized')) {
        $faq.slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
          arrows: true,
          dots: true,
          centerMode: true,
          variableWidth: true,
          responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768,  settings: { slidesToShow: 2 } }
          ]
        });
      }
    } else {
      if ($faq.hasClass('slick-initialized')) $faq.slick('unslick');
    }
  }

  initFaqCarousel();
  $(window).resize(() => initFaqCarousel());
});

// Calendly (unchanged)
(function (C, A, L) {
  let p = function (a, ar) { a.q.push(ar); };
  let d = C.document;
  C.Cal = C.Cal || function () {
    let cal = C.Cal;
    let ar = arguments;
    if (!cal.loaded) {
      cal.ns = {};
      cal.q = cal.q || [];
      d.head.appendChild(d.createElement("script")).src = A;
      cal.loaded = true;
    }
    if (ar[0] === L) {
      const api = function () { p(api, arguments); };
      const namespace = ar[1];
      api.q = api.q || [];
      if (typeof namespace === "string") {
        cal.ns[namespace] = cal.ns[namespace] || api;
        p(cal.ns[namespace], ar);
        p(cal, ["initNamespace", namespace]);
      } else p(cal, ar);
      return;
    }
    p(cal, ar);
  };
})(window, "https://cal.gascompany.co.za/embed/embed.js", "init");
Cal("init", "installation-site-visits", { origin: "https://cal.gascompany.co.za" });

// FAQ toggle
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('active');
  });
});

// Modal functionality for product and geyser type modals
const modalBtns = document.querySelectorAll('.read-more-btn, .product-item-btn');
const modals = document.querySelectorAll('.modal');
const closeBtns = document.querySelectorAll('.modal-close');

modalBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const modalId = btn.dataset.modal;
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
    } else {
      console.error(`Modal with ID ${modalId} not found`);
    }
  });
});

closeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('.modal');
    if (modal) {
      modal.classList.remove('active');
    }
  });
});

window.addEventListener('click', e => {
  modals.forEach(modal => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
});

// Back to top
document.querySelector('.back-to-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Carousel initialization for larger screens
function initializeFaqCarousel() {
  const $faqContainer = $('.faq-container');
  if (window.innerWidth >= 769) {
    if (!$faqContainer.hasClass('slick-initialized')) {
      $faqContainer.slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        dots: true,
        centerMode: true,
        variableWidth: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: { slidesToShow: 3 }
          },
          {
            breakpoint: 768,
            settings: { slidesToShow: 2 }
          }
        ]
      });
    }
  } else {
    if ($faqContainer.hasClass('slick-initialized')) {
      $faqContainer.slick('unslick');
    }
  }
}

$(document).ready(function(){
  initializeFaqCarousel();
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
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 480,
        settings: { 
          slidesToShow: 1,
          dots: false
        }
      }
    ]
  });
});

// Reinitialize FAQ carousel on window resize
$(window).resize(function() {
  initializeFaqCarousel();
});

// Calendly embed code
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
Cal("init", "installation-site-visits", {origin: "https://cal.gascompany.co.za"});
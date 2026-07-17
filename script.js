// Mobile navigation
const navToggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

// Hero entrance animations — mark visible immediately so content is never hidden
function initHeroAnimations() {
  document.querySelectorAll('.hero-animate').forEach(el => {
    el.classList.add('is-visible');
  });
}

// Animated stat counters
function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 2200;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

// AI network canvas background
function initHeroNetwork() {
  const canvas = document.getElementById('hero-network');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let nodes = [];
  let animationId;
  let width = 0;
  let height = 0;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    buildNodes();
  }

  function buildNodes() {
    const count = Math.floor((width * height) / 22000);
    nodes = Array.from({ length: Math.min(count, 48) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 2 + 1.5,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    nodes.forEach(node => {
      node.x += node.vx;
      node.y += node.vy;
      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;
    });

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const alpha = (1 - dist / 140) * 0.18;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    nodes.forEach(node => {
      ctx.beginPath();
      ctx.fillStyle = 'rgba(6, 182, 212, 0.45)';
      ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
      ctx.fill();
    });

    animationId = requestAnimationFrame(draw);
  }

  resize();
  draw();

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animationId);
    resize();
    draw();
  }, { passive: true });
}

// Scroll fade-in for below-fold sections — ensure all content stays visible
document.querySelectorAll(
  '.service-card, .project-card, .about-card, .about__header, .about__text, .tool-chip, .section__header, .contact__info, .contact__form'
).forEach((el, i) => {
  el.classList.add('fade-in', 'visible');
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
});

// Contact form
const form = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

form?.addEventListener('submit', e => {
  e.preventDefault();
  form.reset();
  formSuccess.hidden = false;
  setTimeout(() => { formSuccess.hidden = true; }, 4000);
});

// Header shadow on scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Init
initHeroAnimations();
initHeroNetwork();

function inicializarHeader() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  const actualizar = () => {
    header.classList.toggle('is-scrolled', window.scrollY > window.innerHeight * 0.82);
  };

  actualizar();
  window.addEventListener('scroll', actualizar, { passive: true });
}

function inicializarMenuMovil() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('siteNav');
  const overlay = document.getElementById('navOverlay');
  if (!toggle || !nav) return;

  const cerrar = () => {
    nav.classList.remove('is-open');
    toggle.classList.remove('is-active');
    toggle.setAttribute('aria-expanded', 'false');
    overlay?.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
  };

  toggle.addEventListener('click', () => {
    const abierto = nav.classList.toggle('is-open');
    toggle.classList.toggle('is-active', abierto);
    toggle.setAttribute('aria-expanded', String(abierto));
    overlay?.classList.toggle('is-open', abierto);
    document.body.classList.toggle('no-scroll', abierto);
  });

  overlay?.addEventListener('click', cerrar);
  nav.querySelectorAll('a').forEach(enlace => enlace.addEventListener('click', cerrar));
}

function inicializarAnimaciones() {
  const elementos = document.querySelectorAll('.anim-left, .anim-right, .anim-up, .anim-fade, .anim-zoom');
  if (!elementos.length) return;

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('is-visible');
        observador.unobserve(entrada.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
  });

  elementos.forEach(elemento => observador.observe(elemento));
}

function inicializarStickyHero() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const actualizar = () => {
    hero.classList.toggle('is-scrolling', window.scrollY > 40);
  };

  actualizar();
  window.addEventListener('scroll', actualizar, { passive: true });
}

function inicializarFormularioContacto() {
  const formulario = document.getElementById('contactoForm');
  const aviso = document.getElementById('formAviso');
  if (!formulario || !aviso) return;

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    aviso.classList.add('is-visible');
    formulario.reset();

    clearTimeout(inicializarFormularioContacto.temporizador);
    inicializarFormularioContacto.temporizador = setTimeout(() => {
      aviso.classList.remove('is-visible');
    }, 4500);
  });
}

function inicializarCarruselTestimonios() {
  const track = document.getElementById('testimoniosTrack');
  const prev = document.getElementById('testimoniosPrev');
  const next = document.getElementById('testimoniosNext');
  if (!track || !prev || !next) return;

  const desplazar = (direccion) => {
    const tarjeta = track.querySelector('.testimonio-card');
    if (!tarjeta) return;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const distancia = tarjeta.getBoundingClientRect().width + gap;
    track.scrollBy({ left: distancia * direccion, behavior: 'smooth' });
  };

  prev.addEventListener('click', () => desplazar(-1));
  next.addEventListener('click', () => desplazar(1));
}

function inicializarFooter() {
  const año = document.getElementById('footerYear');
  if (!año) return;
  año.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
  inicializarHeader();
  inicializarMenuMovil();
  inicializarAnimaciones();
  inicializarStickyHero();
  inicializarFormularioContacto();
  inicializarCarruselTestimonios();
  inicializarFooter();
});

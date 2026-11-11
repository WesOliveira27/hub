// Troque aqui pelo número real (formato internacional, só dígitos: 55 + DDD + número).
const WHATSAPP_NUMBER = '5519999999999';

document.documentElement.classList.add('js');

const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('menu');

function setMenu(open) {
  menu.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
}

toggle.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    const target = targetId && targetId !== '#' ? document.querySelector(targetId) : null;
    if (!target) return;

    event.preventDefault();
    setMenu(false);
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Cards de pilar pré-selecionam o interesse no formulário.
    const pilar = link.dataset.pilar;
    if (pilar) document.querySelector('#contact-form select[name="pilar"]').value = pilar;
  });
});

document.querySelectorAll('[data-whatsapp]').forEach((a) => {
  a.href = `https://wa.me/${WHATSAPP_NUMBER}`;
  a.target = '_blank';
  a.rel = 'noopener';
});

document.getElementById('contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const nome = String(data.get('nome') || '').trim();

  const nameField = form.elements.nome;
  nameField.setAttribute('aria-invalid', String(!nome));
  if (!nome) {
    nameField.focus();
    return;
  }

  const empresa = String(data.get('empresa') || '').trim();
  const pilar = String(data.get('pilar') || '').trim();
  const mensagem = String(data.get('mensagem') || '').trim();

  const lines = [
    `Olá! Sou ${nome}${empresa ? `, da ${empresa}` : ''}.`,
    pilar ? `Tenho interesse em: ${pilar}.` : 'Gostaria de conhecer as frentes da Hub Nexus.',
    mensagem,
  ].filter(Boolean);

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealItems.forEach((el) => observer.observe(el));
} else {
  revealItems.forEach((el) => el.classList.add('in'));
}

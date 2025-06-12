// Configurações
const slideInterval = 3500;
const startDate = new Date(2024, 0, 5, 15, 34, 0);
const heartIntervalDelay = 500;     
const heartDuration = 10000;         
let heartInterval;

// Slider
const slider = document.getElementById('slider');
let slides = [], current = 0;
function initSlider() {
  slides = Array.from(slider.children);
  slides.forEach((slide, idx) => {
    slide.style.transform = `translateX(${idx * 100}%)`;
    const ghibli = slide.querySelector('.slide-image.ghibli');
    slide.addEventListener('touchstart', () => ghibli.style.opacity = '1');
    slide.addEventListener('touchend',   () => ghibli.style.opacity = '0');
  });
  setInterval(() => {
    current = (current + 1) % slides.length;
    slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - current)}%)`);
  }, slideInterval);
}

// Contador
function updateCounter() {
  const now = new Date();
  let diff = now - startDate;
  const ms = { sec: 1000, min: 60000, hr: 3600000, day: 86400000, mo: 2592000000, yr: 31536000000 };
  const years = Math.floor(diff/ms.yr); diff -= years*ms.yr;
  const months = Math.floor(diff/ms.mo); diff -= months*ms.mo;
  const days = Math.floor(diff/ms.day); diff -= days*ms.day;
  const hours = Math.floor(diff/ms.hr); diff -= hours*ms.hr;
  const minutes = Math.floor(diff/ms.min); diff -= minutes*ms.min;
  const seconds = Math.floor(diff/ms.sec);
  document.getElementById('counter').textContent =
    `${years} ano(s) ${months} mês(es) ${days} dia(s) ${hours}h ${minutes}m ${seconds}s`;
}

// Corações flutuantes
function initHearts() {
  const container = document.querySelector('.heart-container');
  heartInterval = setInterval(() => createHeart(container), heartIntervalDelay);
  setTimeout(() => clearInterval(heartInterval), heartDuration);
}
function createHeart(container) {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.textContent = '❤️';
  heart.style.left = Math.random() * 100 + '%';
  container.appendChild(heart);
  heart.addEventListener('animationend', () => heart.remove());
}

// Inicialização
window.addEventListener('DOMContentLoaded', () => {
  initHearts();
  initSlider();
  updateCounter();
  setInterval(updateCounter, 1000);
});
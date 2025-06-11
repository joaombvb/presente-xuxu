// Configurações
const slideInterval = 5000; // tempo entre slides em ms
const startDate = new Date(2024, 0, 5, 15, 34, 0); // 2024-01-05 15:34:00

// Slider
const slider = document.getElementById('slider');
let slides = [];
let current = 0;
let autoPlay;

function initSlider() {
  slides = Array.from(slider.children);
  slides.forEach((slide, idx) => {
    slide.style.transform = `translateX(${idx * 100}%)`;

    // touch events para ghibli
    const orig = slide.querySelector('.slide-image');
    const ghibli = slide.querySelector('.slide-image.ghibli');

    slide.addEventListener('touchstart', () => {
      ghibli.style.opacity = '1';
    });
    slide.addEventListener('touchend', () => {
      ghibli.style.opacity = '0';
    });
  });
  autoPlay = setInterval(nextSlide, slideInterval);
}

function nextSlide() {
  current = (current + 1) % slides.length;
  slides.forEach((slide, idx) => {
    slide.style.transform = `translateX(${100 * (idx - current)}%)`;
  });
}

// Contador Dinâmico
function updateCounter() {
  const now = new Date();
  let diff = now - startDate; // ms

  const msInSec = 1000;
  const msInMin = msInSec * 60;
  const msInHour = msInMin * 60;
  const msInDay = msInHour * 24;
  const msInMonth = msInDay * 30;
  const msInYear = msInDay * 365;

  const years = Math.floor(diff / msInYear);
  diff -= years * msInYear;
  const months = Math.floor(diff / msInMonth);
  diff -= months * msInMonth;
  const days = Math.floor(diff / msInDay);
  diff -= days * msInDay;
  const hours = Math.floor(diff / msInHour);
  diff -= hours * msInHour;
  const minutes = Math.floor(diff / msInMin);
  diff -= minutes * msInMin;
  const seconds = Math.floor(diff / msInSec);

  document.getElementById('counter').textContent =
    `${years} ano(s) ${months} mês(es) ${days} dia(s) ` +
    `${hours}h ${minutes}m ${seconds}s`;
}

// Inicialização
window.addEventListener('DOMContentLoaded', () => {
  initSlider();
  updateCounter();
  setInterval(updateCounter, 1000);
});

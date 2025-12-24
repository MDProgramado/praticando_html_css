export default function initAnimation(){

  const sections = document.querySelectorAll(".fade-in-on-scroll");
  const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up");
      observer.unobserve(entry.target); // Anima apenas uma vez
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => {
  observer.observe(section);
});

// Lógica para animações de scroll (Intersection Observer)
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".fade-in-on-scroll");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up");
          observer.unobserve(entry.target); // Anima apenas uma vez
        }
      });
    },
    { threshold: 0.1 }
  ); // 10% da seção visível para disparar

  sections.forEach((section) => {
    observer.observe(section);
  });

  // Efeito de digitação simples
  const typedTextSpan = document.querySelector(".typed-text");
  const textArray = ["Criativo", "Apaixonado", "Inovador", "Desenvolvedor"];
  const typingDelay = 200;
  const erasingDelay = 100;
  const newTextDelay = 2000; // Delay entre palavras
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = textArray[textArrayIndex].substring(
        0,
        charIndex - 1
      );
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 1100);
    }
  }
  if (typedTextSpan) setTimeout(type, newTextDelay + 250); // Inicia o efeito
});

// Back to top button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.remove('opacity-0', 'invisible');
    backToTopButton.classList.add('opacity-100');
  } else {
    backToTopButton.classList.add('opacity-0', 'invisible');
    backToTopButton.classList.remove('opacity-100');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  preloader.style.opacity = '0';
  setTimeout(() => {
    preloader.style.display = 'none';
  }, 500);
});
}


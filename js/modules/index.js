export default function initMain(){
  // Configuração do Tailwind (pode ser customizada aqui)

tailwind.config = {
  theme: {
    extend: {
      colors: {
        "primary-dark": "#1A202C", // Azul Escuro/Carvão
        "secondary-light": "#F7FAFC", // Cinza Claro
        "accent-teal": "#4FD1C5", // Verde Água/Teal
        "accent-coral": "#F6AD55", // Coral/Laranja Claro
        "text-main": "#2D3748", // Cinza Escuro para texto
        "text-light": "#F7FAFC", // Texto claro para fundos escuros
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
};

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

}
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

//logica para o formulario de contato

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contatoFormWhatsapp");
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const seuNumeroWhatsapp = "5571989211292";

    if (
      !seuNumeroWhatsapp ||
      seuNumeroWhatsapp === "SEU_NUMERO_DE_WHATSAPP_AQUI"
    ) {
      alert(
        "Por favor, configure o número de WhatsApp do destinatário no script."
      );
      return;
    }

    const nome = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mensagemUsuario = document.getElementById("message").value;

    // Monta a mensagem que será pré-preenchida no WhatsApp
    let mensagemFormatada = `Olá! Meu nome é ${nome}.\n`;
    mensagemFormatada += `Email: ${email}\n\n`;
    mensagemFormatada += `Mensagem:\n${mensagemUsuario}`;

    // Codifica a mensagem para ser usada na URL
    const mensagemCodificada = encodeURIComponent(mensagemFormatada);

    // Cria o link do WhatsApp
    const urlWhatsapp = `https://wa.me/${seuNumeroWhatsapp}?text=${mensagemCodificada}`;

    // Abre o WhatsApp em uma nova aba
    window.open(urlWhatsapp, "_blank");
    form.reset();

    alert("Você será redirecionado para o WhatsApp para enviar sua mensagem!");
  });
});

export default function initForms(){
  form.addEventListener("submit", function(event) {
  event.preventDefault();
  
  // Verificar campos obrigatórios
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  
  if (!name || !email) {
    alert("Por favor, preencha todos os campos.");
    return;
  }
  
  // Submissão bem-sucedida
  alert("Mensagem enviada com sucesso!");
});

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

}


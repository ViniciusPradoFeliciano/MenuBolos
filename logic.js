"use strict";

const dialog = document.getElementById("dialogRadio");
const openBtn = document.getElementById("openDialog");
const salvarBtn = document.getElementById("salvar");
const fecharBtn = document.getElementById("fechar");

const dialogAdicionais = document.getElementById("dialogAdicionais");
const openAdicionais = document.getElementById("openAdicionais");
const salvarAdicionais = document.getElementById("salvarAdicionais");
const fecharAdicionais = document.getElementById("fecharAdicionais");

const whatsappBtn = document.getElementById("whatsappBtn");
const decorSelect = document.getElementById("decorSelect");

let recheiosSelecionados = [];
let adicionaisSelecionados = [];

/* segurança */
if (!dialog || !openBtn || !salvarBtn || !fecharBtn || !whatsappBtn || !decorSelect) {
    throw new Error("Erro: elementos não encontrados no HTML.");
}

/* abrir/fechar recheio */
openBtn.onclick = () => dialog.showModal();
fecharBtn.onclick = () => dialog.close();

/* abrir/fechar adicionais */
openAdicionais.onclick = () => dialogAdicionais.showModal();
fecharAdicionais.onclick = () => dialogAdicionais.close();

/* limitar recheios */
document.querySelectorAll('[name="recheioCheck"]').forEach(check => {
    check.onchange = () => {
        const marcados = document.querySelectorAll('[name="recheioCheck"]:checked');

        if (marcados.length > 2) {
            check.checked = false;
            alert("Você pode escolher no máximo 2 recheios!");
        }
    };
});

/* salvar recheios */
salvarBtn.onclick = () => {
    const selecionados = document.querySelectorAll('[name="recheioCheck"]:checked');

    if (!selecionados.length) {
        alert("Selecione pelo menos um recheio!");
        return;
    }

    recheiosSelecionados = [...selecionados].map(e => e.value);

    openBtn.innerText = `Recheio: ${recheiosSelecionados.join(" + ")}`;

    dialog.close();
};

/* salvar adicionais */
salvarAdicionais.onclick = () => {
    const selecionados = document.querySelectorAll('[name="adicionalCheck"]:checked');

    adicionaisSelecionados = [...selecionados].map(e => e.value);

    openAdicionais.innerText = adicionaisSelecionados.length
        ? `Adicionais: ${adicionaisSelecionados.join(" + ")}`
        : "Selecionar Adicionais";

    dialogAdicionais.close();
};

/* enviar whatsapp */
whatsappBtn.onclick = () => {
    const tamanho = document.querySelector('[name="tamanho"]').value;
    const massa = document.querySelector('[name="massa"]').value;
    const cobertura = document.querySelector('[name="recheio"]').value;

    /* pega texto bonito */
    const decor = decorSelect.options[decorSelect.selectedIndex].text;

    if (!tamanho || !massa || !cobertura || !decor || !recheiosSelecionados.length) {
        alert("Preencha todas as opções!");
        return;
    }

    const mensagem = `🍰  NOVO PEDIDO DE BOLO

📌 Detalhes do pedido:

Tamanho: ${tamanho}
Massa: ${massa}
Recheios: ${recheiosSelecionados.join(" + ")}
Adicionais: ${adicionaisSelecionados.length ? adicionaisSelecionados.join(" + ") : "Nenhum"}
Cobertura: ${cobertura}
Decoração: ${decor}

━━━━━━━━━━━━━━━
💬 Gostaria de confirmar este pedido e verificar valores e disponibilidade.

🙏 Obrigado!.`;

    const telefone = "19981409015";

    window.open(`https://api.whatsapp.com/send?phone=${telefone}&text=${encodeURIComponent(mensagem)}`, "_blank");
};
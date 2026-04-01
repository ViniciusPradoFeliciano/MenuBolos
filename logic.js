"use strict";

const dialog = document.getElementById("dialogRadio");
const openBtn = document.getElementById("openDialog");
const salvarBtn = document.getElementById("salvar");
const fecharBtn = document.getElementById("fechar");

const dialogAdicionais = document.getElementById("dialogAdicionais");
const openAdicionais = document.getElementById("openAdicionais");
const salvarAdicionais = document.getElementById("salvarAdicionais");
const fecharAdicionais = document.getElementById("fecharAdicionais");

const dialogDecor = document.getElementById("dialogDecor");
const openDecor = document.getElementById("openDecor");
const salvarDecor = document.getElementById("salvarDecor");
const fecharDecor = document.getElementById("fecharDecor");

const dialogMassa = document.getElementById("dialogMassa");
const openMassa = document.getElementById("openMassa");
const salvarMassa = document.getElementById("salvarMassa");
const fecharMassa = document.getElementById("fecharMassa");

const dialogCobertura = document.getElementById("dialogCobertura");
const openCobertura = document.getElementById("openCobertura");
const salvarCobertura = document.getElementById("salvarCobertura");
const fecharCobertura = document.getElementById("fecharCobertura");

const dialogTamanho = document.getElementById("dialogTamanho");
const openTamanho = document.getElementById("openTamanho");
const salvarTamanho = document.getElementById("salvarTamanho");
const fecharTamanho = document.getElementById("fecharTamanho");

const whatsappBtn = document.getElementById("whatsappBtn");
const decorSelect = document.getElementById("decorSelect");

let recheiosSelecionados = [];
let adicionaisSelecionados = [];
let decorSelecionados = [];
let massaSelecionados = [];
let coberturaSelecionados = [];
let tamanhoSelecionados = [];

/* segurança */
if (!dialog || !openBtn || !salvarBtn || !fecharBtn || !whatsappBtn) {
    throw new Error("Erro: elementos não encontrados no HTML.");
}

/* 🔥 BLOQUEAR DATA PASSADA */
const inputData = document.getElementById("dataEntrega");
if (inputData) {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");
    const hojeFormatado = `${ano}-${mes}-${dia}`;
    inputData.min = hojeFormatado;
}

/* abrir/fechar */
openBtn.onclick = () => dialog.showModal();
fecharBtn.onclick = () => dialog.close();

openAdicionais.onclick = () => dialogAdicionais.showModal();
fecharAdicionais.onclick = () => dialogAdicionais.close();

openDecor.onclick = () => dialogDecor.showModal();
fecharDecor.onclick = () => dialogDecor.close();

openMassa.onclick = () => dialogMassa.showModal();
fecharMassa.onclick = () => dialogMassa.close();

openCobertura.onclick = () => dialogCobertura.showModal();
fecharCobertura.onclick = () => dialogCobertura.close();

openTamanho.onclick = () => dialogTamanho.showModal();
fecharTamanho.onclick = () => dialogTamanho.close();

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

/*dialog decoração*/
salvarDecor.onclick = () => {
    const selecionados = document.querySelectorAll('[name="decorCheck"]:checked');

    decorSelecionados = [...selecionados].map(e => e.value);

    openDecor.innerText = decorSelecionados.length
        ? `Decoração: ${decorSelecionados.join(" + ")}`
        : "Selecionar Decoração";

    dialogDecor.close();
};

document.querySelectorAll('[name="decorCheck"]').forEach(check => {
    check.onchange = () => {
        const marcados = document.querySelectorAll('[name="decorCheck"]:checked');

        if (marcados.length > 1) {
            check.checked = false;
            alert("Tente escolher no maximo uma Decoração");
        }
    };
});

/*dialog massa*/
salvarMassa.onclick = () => {
    const selecionados = document.querySelectorAll('[name="massaCheck"]:checked');

    massaSelecionados = [...selecionados].map(e => e.value);

    openMassa.innerText = massaSelecionados.length
        ? `Massa: ${massaSelecionados.join(" + ")}`
        : "Selecionar Massa";

    dialogMassa.close();
};

document.querySelectorAll('[name="massaCheck"]').forEach(check => {
    check.onchange = () => {
        const marcados = document.querySelectorAll('[name="massaCheck"]:checked');

        if (marcados.length > 1) {
            check.checked = false;
            alert("Tente escolher no maximo uma Massa");
        }
    };
});

/* dialog cobertur*/
salvarCobertura.onclick = () => {
    const selecionados = document.querySelectorAll('[name="coberturaCheck"]:checked');

    coberturaSelecionados = [...selecionados].map(e => e.value);

    openCobertura.innerText = coberturaSelecionados.length
        ? `Cobertura: ${coberturaSelecionados.join(" + ")}`
        : "Selecionar Cobertura";

    dialogCobertura.close();
};

document.querySelectorAll('[name="coberturaCheck"]').forEach(check => {
    check.onchange = () => {
        const marcados = document.querySelectorAll('[name="coberturaCheck"]:checked');

        if (marcados.length > 1) {
            check.checked = false;
            alert("Tente escolher no maximo uma Massa");
        }
    };
});


/* dialog tamanho*/
salvarTamanho.onclick = () => {
    const selecionados = document.querySelectorAll('[name="tamanhoCheck"]:checked');

    tamanhoSelecionados = [...selecionados].map(e => e.value);

    openTamanho.innerText = tamanhoSelecionados.length
        ? `Tamanho: ${tamanhoSelecionados.join(" + ")}`
        : "Selecionar Tamanho";

    dialogTamanho.close();
};

document.querySelectorAll('[name="tamanhoCheck"]').forEach(check => {
    check.onchange = () => {
        const marcados = document.querySelectorAll('[name="tamanhoCheck"]:checked');

        if (marcados.length > 1 || marcados.length == 0) {
            check.checked = false;
            alert("Escolha um tamanho");
        }
    };
});



/* enviar whatsapp */
whatsappBtn.onclick = () => {
    const dataEntregaRaw = document.getElementById("dataEntrega").value;
    const tamanho = tamanhoSelecionados.length ? tamanhoSelecionados.join(", ") : "";
    const massa = massaSelecionados.length ? massaSelecionados.join(", ") : "";
    const cobertura = coberturaSelecionados.length ? coberturaSelecionados.join(", ") : "";

    const decor = decorSelecionados.length ? decorSelecionados.join(", ") : "";


    if (!decor || !recheiosSelecionados.length || !dataEntregaRaw) {
        alert("Preencha todas as opções!");
        return;
    }
    if (!dataEntregaRaw) {
        alert("Selecione a data de entrega!");
        return;
    }

    /* ✅ CORREÇÃO DO BUG DE UM DIA */
    const [ano, mes, dia] = dataEntregaRaw.split("-");
    const dataEntrega = `${dia}/${mes}/${ano}`;

    const mensagem = `🍰 *NOVO PEDIDO DE BOLO*

📌 *Detalhes do pedido:*

• Tamanho: ${tamanho}
• Massa: ${massa}
• Recheios: ${recheiosSelecionados.join(" + ")}
• Adicionais: ${adicionaisSelecionados.length ? adicionaisSelecionados.join(" + ") : "Nenhum"}
• Cobertura: ${cobertura}
• Decoração: ${decor}
• Data de entrega: ${dataEntrega}

━━━━━━━━━━━━━━━
💬 Gostaria de confirmar este pedido e verificar valores e disponibilidade.

🙏 Obrigado!`;

    const telefone = "19981409015";

    window.open(`https://api.whatsapp.com/send?phone=${telefone}&text=${encodeURIComponent(mensagem)}`, "_blank");
};
"use strict";
const dialog = document.getElementById("dialogRadio");
const openBtn = document.getElementById("openDialog");
const salvarBtn = document.getElementById("salvar");
const fecharBtn = document.getElementById("fechar");
const whatsappBtn = document.getElementById("whatsappBtn");
const decorSelect = document.getElementById("decorSelect");
let recheiosSelecionados = [];
/* segurança contra null */
if (!dialog || !openBtn || !salvarBtn || !fecharBtn || !whatsappBtn || !decorSelect) {
    throw new Error("Algum elemento do HTML não foi encontrado. Verifique os IDs.");
}
/* abrir dialog */
openBtn.addEventListener("click", () => {
    dialog.showModal();
});
/* fechar dialog */
fecharBtn.addEventListener("click", () => {
    dialog.close();
});
/* limitar a 2 recheios */
const checkboxes = document.querySelectorAll('input[name="recheioCheck"]');
checkboxes.forEach(check => {
    check.addEventListener("change", () => {
        const marcados = document.querySelectorAll('input[name="recheioCheck"]:checked');
        if (marcados.length > 2) {
            check.checked = false;
            alert("Você pode escolher no máximo 2 recheios!");
        }
    });
});
/* salvar recheios */
salvarBtn.addEventListener("click", () => {
    const selecionados = document.querySelectorAll('input[name="recheioCheck"]:checked');
    if (selecionados.length === 0) {
        alert("Selecione pelo menos um recheio!");
        return;
    }
    recheiosSelecionados = Array.from(selecionados).map(el => el.value);
    openBtn.innerText = `Recheio: ${recheiosSelecionados.join(" + ")}`;
    dialog.close();
});
/* enviar whatsapp */
whatsappBtn.addEventListener("click", () => {
    const tamanho = document.querySelector('select[name="tamanho"]').value;
    const massa = document.querySelector('select[name="massa"]').value;
    const cobertura = document.querySelector('select[name="recheio"]').value;
    const decor = decorSelect.value;
    if (!tamanho || !massa || !cobertura || !decor || recheiosSelecionados.length === 0) {
        alert("Preencha todas as opções!");
        return;
    }
    const mensagem = `Pedido de Bolo
Tamanho: ${tamanho}
Massa: ${massa}
Recheios: ${recheiosSelecionados.join(" + ")}
Cobertura: ${cobertura}
Decoração: ${decor}`;
    const telefone = "19997196440";
    window.open(`https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`, "_blank");
});

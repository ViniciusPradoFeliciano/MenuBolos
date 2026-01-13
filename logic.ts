const dialog = document.getElementById("dialogRadio") as HTMLDialogElement;
const openBtn = document.getElementById("openDialog") as HTMLButtonElement;
const salvarBtn = document.getElementById("salvar") as HTMLButtonElement;
const fecharBtn = document.getElementById("fechar") as HTMLButtonElement;
const whatsappBtn = document.getElementById("whatsappBtn") as HTMLButtonElement;

const decorSelect = document.getElementById("decorSelect") as HTMLSelectElement;
const inspiracaoBox = document.getElementById("inspiracaoBox") as HTMLDivElement;
const inspiracaoImg = document.getElementById("inspiracaoImg") as HTMLInputElement;
const nomeArquivo = document.getElementById("nomeArquivo") as HTMLSpanElement;

let recheiosSelecionados: string[] = [];

/* abrir dialog */
openBtn.addEventListener("click", () => {
  dialog.showModal();
});

/* fechar dialog */
fecharBtn.addEventListener("click", () => {
  dialog.close();
});

/* limitar 2 recheios */
const checkboxes = document.querySelectorAll<HTMLInputElement>('input[name="recheioCheck"]');

checkboxes.forEach(check => {
  check.addEventListener("change", () => {
    const marcados = document.querySelectorAll<HTMLInputElement>('input[name="recheioCheck"]:checked');

    if (marcados.length > 2) {
      check.checked = false;
      alert("Você pode escolher no máximo 2 recheios!");
    }
  });
});

/* salvar recheios */
salvarBtn.addEventListener("click", () => {
  const selecionados = document.querySelectorAll<HTMLInputElement>('input[name="recheioCheck"]:checked');

  if (selecionados.length === 0) {
    alert("Selecione pelo menos um recheio!");
    return;
  }

  recheiosSelecionados = Array.from(selecionados).map(el => el.value);
  openBtn.innerText = `Recheio: ${recheiosSelecionados.join(" + ")}`;
  dialog.close();
});

/* mostrar inspiração */
decorSelect.addEventListener("change", () => {
  if (decorSelect.value === "Inspiração") {
    inspiracaoBox.style.display = "flex";
  } else {
    inspiracaoBox.style.display = "none";
    inspiracaoImg.value = "";
    nomeArquivo.textContent = "";
  }
});

/* mostrar nome do arquivo */
inspiracaoImg.addEventListener("change", () => {
  if (inspiracaoImg.files && inspiracaoImg.files.length > 0) {
    nomeArquivo.textContent = `Arquivo: ${inspiracaoImg.files[0].name}`;
  }
});

/* enviar whatsapp */
whatsappBtn.addEventListener("click", () => {
  const tamanho = (document.querySelector('select[name="tamanho"]') as HTMLSelectElement).value;
  const massa = (document.querySelector('select[name="massa"]') as HTMLSelectElement).value;
  const cobertura = (document.querySelector('select[name="recheio"]') as HTMLSelectElement).value;
  const decor = decorSelect.value;

  if (!tamanho || !massa || !cobertura || !decor || recheiosSelecionados.length === 0) {
    alert("Preencha todas as opções!");
    return;
  }

  if (decor === "Inspiração" && (!inspiracaoImg.files || inspiracaoImg.files.length === 0)) {
    alert("Envie uma imagem de inspiração!");
    return;
  }

  const mensagem =
`🍰 Pedido de Bolo
Tamanho: ${tamanho}
Massa: ${massa}
Recheios: ${recheiosSelecionados.join(" + ")}
Cobertura: ${cobertura}
Decoração: ${decor}`;

  const telefone = "19997196440";
  window.open(`https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`, "_blank");
});

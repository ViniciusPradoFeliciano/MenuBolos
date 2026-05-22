const dialogRedondo = document.getElementById("dialogRedondo");
const dialogRetangular = document.getElementById("dialogRetangular");
const dialogPersonalizacao = document.getElementById("dialogPersonalizacao");
const dialogCarrinho = document.getElementById("dialogCarrinho");
const dialogData = document.getElementById("dialogData");

const abrirRedondo = document.getElementById("abrirRedondo");
const abrirRetangular = document.getElementById("abrirRetangular");

const abrirCarrinho = document.getElementById("abrirCarrinho");
const finalizarCarrinho = document.getElementById("finalizarCarrinho");

const tamanhoSelecionado = document.getElementById("tamanhoSelecionado");

let tamanhoAtual = "";
const carrinho = [];

let itemProntoTemp = null;


// ------------------------
// FORMATAR DATA BR
// ------------------------
function formatarDataBR(dataISO) {
  if (!dataISO) return "";
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}


// ------------------------
// ABRIR MODAIS
// ------------------------
abrirRedondo.addEventListener("click", () => dialogRedondo.showModal());
abrirRetangular.addEventListener("click", () => dialogRetangular.showModal());
abrirCarrinho.addEventListener("click", () => dialogCarrinho.showModal());


// ------------------------
// FECHAR MODAIS
// ------------------------
document.querySelectorAll(".close-dialog").forEach(btn => {
  btn.addEventListener("click", () => {
    const dialogId = btn.dataset.close;
    document.getElementById(dialogId).close();
  });
});


// ------------------------
// ESCOLHER TAMANHO
// ------------------------
document.querySelectorAll(".tamanho-card").forEach(card => {
  card.addEventListener("click", () => {
    tamanhoAtual = card.dataset.size;
    tamanhoSelecionado.innerText = tamanhoAtual;

    dialogRedondo.close();
    dialogRetangular.close();

    dialogPersonalizacao.showModal();
  });
});


// ------------------------
// MAIS PEDIDOS → ABRE DATA
// ------------------------
document.querySelectorAll(".produto-card").forEach(card => {
  card.addEventListener("click", () => {

    const nome = card.querySelector("h3")?.innerText || "";
    const desc = card.querySelector("span")?.innerText || "";

    itemProntoTemp = { nome, desc };

    dialogData.showModal();
  });
});


// ------------------------
// DATA RÁPIDA
// ------------------------
const dataRapida = document.getElementById("dataEntregaRapida");

if (dataRapida) {
  const hoje = new Date().toISOString().split("T")[0];
  dataRapida.min = hoje;
}


// ------------------------
// CONFIRMAR ITEM PRONTO
// ------------------------
document.getElementById("confirmarPronto")?.addEventListener("click", () => {

  const data = document.getElementById("dataEntregaRapida").value;

  if (!data) {
    alert("Escolha a data.");
    return;
  }

  carrinho.push({
    tipo: "pronto",
    nome: itemProntoTemp.nome,
    descricao: itemProntoTemp.desc,
    data
  });

  atualizarCarrinho();

  dialogData.close();

  // 🔥 LIMPEZA IMPORTANTE (corrige seu problema)
  document.getElementById("dataEntregaRapida").value = "";
  itemProntoTemp = null;
});


// ------------------------
// LIMITAR RECHEIOS
// ------------------------
document.querySelectorAll('[name="recheio"]').forEach(check => {
  check.addEventListener("change", () => {

    const selecionados = document.querySelectorAll('[name="recheio"]:checked');

    if (selecionados.length > 2) {
      check.checked = false;
      alert("Escolha no máximo 2 recheios.");
    }

  });
});


// ------------------------
// BLOQUEAR DATA PASSADA
// ------------------------
const dataEntrega = document.getElementById("dataEntrega");

if (dataEntrega) {
  const hoje = new Date().toISOString().split("T")[0];
  dataEntrega.min = hoje;
}


// ------------------------
// ADICIONAR PERSONALIZADO
// ------------------------
document.getElementById("whatsappBtn").addEventListener("click", () => {

  const massa = document.getElementById("massaSelect").value;
  const cobertura = document.getElementById("coberturaSelect").value;
  const decoracao = document.getElementById("decoracaoSelect").value;
  const data = document.getElementById("dataEntrega").value;

  const recheiosSelecionados = [
    ...document.querySelectorAll('[name="recheio"]:checked')
  ].map(i => i.value);

  const adicionaisSelecionados = [
    ...document.querySelectorAll('[name="adicional"]:checked')
  ].map(i => i.value);

  if (!massa || !cobertura || !decoracao || !data || !recheiosSelecionados.length) {
    alert("Preencha todas as opções.");
    return;
  }

  carrinho.push({
    tipo: "personalizado",
    tamanho: tamanhoAtual,
    massa,
    recheios: recheiosSelecionados,
    cobertura,
    adicionais: adicionaisSelecionados,
    decoracao,
    data
  });

  atualizarCarrinho();

  dialogPersonalizacao.close();
  limparFormulario();
});


// ------------------------
// ATUALIZAR CARRINHO
// ------------------------
function atualizarCarrinho() {

  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");

  cartCount.innerText = carrinho.length;

  if (carrinho.length === 0) {
    cartItems.innerHTML = `<p class="cart-empty">Nenhum item adicionado.</p>`;
    return;
  }

  cartItems.innerHTML = "";

  carrinho.forEach((item, index) => {

    let html = "";

    if (item.tipo === "pronto") {

      html = `
        <div class="cart-item">
          <strong>🍰 ${item.nome}</strong>
          <span>${item.descricao}</span>
          <span>📅 ${formatarDataBR(item.data)}</span>
        </div>
      `;

    } else {

      html = `
        <div class="cart-item">
          <strong>🍰 Bolo ${index + 1}</strong>
          <span>${item.tamanho}</span>
          <span>📅 ${formatarDataBR(item.data)}</span>
        </div>
      `;
    }

    cartItems.innerHTML += `
      ${html}
      <button class="remove-btn" data-index="${index}">
        Remover
      </button>
    `;
  });

  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      carrinho.splice(index, 1);
      atualizarCarrinho();
    });
  });
}


// ------------------------
// FINALIZAR WHATSAPP
// ------------------------
finalizarCarrinho.addEventListener("click", () => {

  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

  let mensagem = encodeURIComponent("🍰 NOVO PEDIDO\n\n");

  carrinho.forEach((item) => {

    if (item.tipo === "pronto") {

      mensagem += `• Produto: ${item.nome}%0A`;
      mensagem += `• Descrição: ${item.descricao}%0A`;
      mensagem += `• Data: ${formatarDataBR(item.data)}%0A%0A`;

    } else {

      mensagem += `• Tamanho: ${item.tamanho}%0A`;
      mensagem += `• Massa: ${item.massa}%0A`;
      mensagem += `• Recheios: ${item.recheios.join(" + ")}%0A`;
      mensagem += `• Cobertura: ${item.cobertura}%0A`;
      mensagem += `• Adicionais: ${
        item.adicionais.length ? item.adicionais.join(" + ") : "Nenhum"
      }%0A`;
      mensagem += `• Decoração: ${item.decoracao}%0A`;
      mensagem += `• Data: ${formatarDataBR(item.data)}%0A%0A`;
    }
  });

  const telefone = "5519981409015";

  window.open(
    `https://wa.me/${telefone}?text=${mensagem}`,
    "_blank"
  );
});


// ------------------------
// LIMPAR FORMULÁRIO PERSONALIZADO
// ------------------------
function limparFormulario() {

  document.getElementById("massaSelect").value = "";
  document.getElementById("coberturaSelect").value = "";
  document.getElementById("decoracaoSelect").value = "";
  document.getElementById("dataEntrega").value = "";

  document.querySelectorAll('[name="recheio"]').forEach(i => i.checked = false);
  document.querySelectorAll('[name="adicional"]').forEach(i => i.checked = false);

  // 🔥 importante: evita “estado preso”
  tamanhoAtual = "";
  tamanhoSelecionado.innerText = "";
}
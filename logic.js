const dialogRedondo = document.getElementById("dialogRedondo");
const dialogRetangular = document.getElementById("dialogRetangular");
const dialogPersonalizacao = document.getElementById("dialogPersonalizacao");

const abrirRedondo = document.getElementById("abrirRedondo");
const abrirRetangular = document.getElementById("abrirRetangular");

const tamanhoSelecionado = document.getElementById("tamanhoSelecionado");

const abrirCarrinho = document.getElementById("abrirCarrinho");
const dialogCarrinho = document.getElementById("dialogCarrinho");

const finalizarCarrinho = document.getElementById("finalizarCarrinho");

let tamanhoAtual = "";
const carrinho = [];


// ------------------------
// FORMATAR DATA BR
// ------------------------
function formatarDataBR(dataISO) {
  if (!dataISO) return "";
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}


// ------------------------
// ABRIR DIALOGS
// ------------------------
abrirRedondo.addEventListener("click", () => {
  dialogRedondo.showModal();
});

abrirRetangular.addEventListener("click", () => {
  dialogRetangular.showModal();
});

abrirCarrinho.addEventListener("click", () => {
  dialogCarrinho.showModal();
});


// ------------------------
// FECHAR DIALOGS
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
// MAIS PEDIDOS (PRONTOS)
// ------------------------
document.querySelectorAll(".produto-card").forEach(card => {
  card.addEventListener("click", () => {

    const nome = card.querySelector("h3")?.innerText || "";
    const desc = card.querySelector("span")?.innerText || "";

    carrinho.push({
      tipo: "pronto",
      nome,
      descricao: desc
    });

    atualizarCarrinho();
  });
});


// ------------------------
// LIMITAR RECHEIOS (máx 2)
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

const hoje = new Date();
const ano = hoje.getFullYear();
const mes = String(hoje.getMonth() + 1).padStart(2, "0");
const dia = String(hoje.getDate()).padStart(2, "0");

dataEntrega.min = `${ano}-${mes}-${dia}`;


// ------------------------
// ADICIONAR BOLO PERSONALIZADO
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
// ATUALIZAR CARRINHO (COM REMOVER)
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
        </div>
      `;

    } else {

      html = `
        <div class="cart-item">
          <strong>🍰 Bolo ${index + 1}</strong>
          <span>${item.tamanho}</span>
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

  carrinho.forEach((item, index) => {

    if (item.tipo === "pronto") {
      mensagem += `• Produto: ${item.nome}%0A`;
      mensagem += `• Descrição: ${item.descricao}%0A%0A`;

    } else {

      mensagem += `*BOLO ${index + 1}*%0A`;
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
// LIMPAR FORMULÁRIO
// ------------------------
function limparFormulario() {

  document.getElementById("massaSelect").value = "";
  document.getElementById("coberturaSelect").value = "";
  document.getElementById("decoracaoSelect").value = "";
  document.getElementById("dataEntrega").value = "";

  document.querySelectorAll('[name="recheio"]').forEach(i => i.checked = false);
  document.querySelectorAll('[name="adicional"]').forEach(i => i.checked = false);
}
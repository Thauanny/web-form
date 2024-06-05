let contatos = [];

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();
  cadastrar();
});

function cadastrar() {
  const nome = document.getElementById("nome").value;
  let cpf = document.getElementById("cpf").value;
  const dataNascimento = document.getElementById("dataNascimento").value;
  const endereco = document.getElementById("endereco").value;

  cpf = cpf.replace(/\D/g, "");

  if (contatos.some((contato) => contato.cpf === cpf)) {
    alert("CPF já cadastrado!");
    return;
  }

  const contato = {
    nome,
    cpf,
    dataNascimento,
    endereco,
  };

  contatos.push(contato);
  alert("Contato salvo com sucesso!");
  limpar();
}

function limpar() {
  document.getElementById("form").reset();
}

function formatarCPF(cpf) {
  if (cpf.length > 14) {
    cpf = cpf.slice(0, 14);
  }

  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return cpf;
}

function mascaraCPF(element) {
  console.log(cpf.value);
  if (cpf.length > 14) {
    cpf = cpf.slice(0, 14);
  }
  element.value = formatarCPF(cpf.value);
}

function exibir() {
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "";

  if (contatos.length === 0) {
    resultado.innerHTML = "Nenhum contato cadastrado.";
    return;
  }

  contatos.forEach((contato) => {
    resultado.innerHTML += `<p><b>Nome:</b> ${
      contato.nome
    }<br><b>CPF:</b> ${formatarCPF(
      contato.cpf
    )}<br><b>Data de Nascimento:</b> ${converterDataParaPtBr(
      contato.dataNascimento
    )}<br><b>Endereço: </b>${contato.endereco}</p><hr>`;
  });
}

function buscar() {
  const cpf = prompt("Digite o CPF do contato:");

  if (cpf !== null && cpf !== "") {
    const contato = contatos.find(
      (contato) => contato.cpf === cpf.replace(/\D/g, "") || contato.cpf === cpf
    );

    if (contato) {
      alert(
        `Nome: ${contato.nome}\nCPF: ${formatarCPF(
          contato.cpf
        )}\nData de Nascimento: ${converterDataParaPtBr(
          contato.dataNascimento
        )}\nEndereço: ${contato.endereco}`
      );
    } else {
      alert("Contato não encontrado!");
    }
  } else {
    alert("Contato não encontrado!");
  }
}

function onInvalidCPF(event) {
  const input = event.target;
  if (input.value === "") {
    input.setCustomValidity("O campo CPF não pode estar vazio.");
  } else if (input.value.length !== 14) {
    input.setCustomValidity(
      "CPF inválido! Por favor, digite no formato correto (xxx.xxx.xxx-xx)."
    );
  } else {
    input.setCustomValidity("");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const cpfInput = document.getElementById("cpf");
  cpfInput.addEventListener("input", event.target);
  cpfInput.addEventListener("input", onInvalidCPF);
});

function excluir() {
  const cpf = prompt("Digite o CPF do contato a ser excluído:");
  if (cpf !== null && cpf !== "") {
    const index = contatos.findIndex(
      (contato) =>
        contato.cpf === cpf.replace(/\D/g, "") ||
        contato.cpf === cpf
    );
    if (index !== -1) {
      contatos.splice(index, 1);
      alert("Contato excluído com sucesso!");
      exibir();
    } else {
      alert("Contato não encontrado!");
    }
  } else {
    alert("Contato não encontrado!");
  }
}

function converterDataParaPtBr(dataString) {
  const partesData = dataString.split("-");
  const data = new Date(partesData[0], partesData[1] - 1, partesData[2]);
  const dataFormatada = data.toLocaleDateString("pt-BR");
  return dataFormatada;
}

document.addEventListener("DOMContentLoaded", exibir);

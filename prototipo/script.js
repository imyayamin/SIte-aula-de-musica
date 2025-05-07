// Função para abrir ou fechar o menu de login/cadastro
function toggleMenu() {
  const menu = document.getElementById("userMenu");
  menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

const tecladoNotas = {
  'a': 'Dó',
  's': 'Ré',
  'd': 'Mi',
  'f': 'Fá',
  'g': 'Sol',
  'h': 'Lá',
  'j': 'Si',
  'z': 'Dó#',
  'x': 'Ré#',
  'v': 'Fá#',
  'b': 'Sol#',
  'm': 'Lá#',
};

const botoes = [
  '1', '2', '3', '4', '5',
  '201', '202', '203', '204', '205',
  '401', '402', '403', '404', '405',
  '601', '602', '603', '604', '605'
];

const atividades = {
  1: {
    titulo: "Teclado - Escalas",
    notas: ["Dó", "Ré", "Mi", "Fá", "Sol", "Lá", "Si", "Dó", "Ré", "Mi", "Fá", "Sol", "Lá", "Si", "Dó", "Ré", "Mi", "Fá", "Sol", "Lá", "Si"],
    instrumento: "teclado",
  },
  2: {
    titulo: "Teclado - Acordes",
    notas: ["Dó", "Mi", "Sol"],
    instrumento: "teclado",
  },
  3: {
    titulo: "Teclado - Do-Re-Mi",
    notas: ["Dó", "Dó", "Ré", "Mi", "Mi", "Fá", "Fá#", "Sol",
      "Sol", "Sol", "Lá", "Si", "Si", "Dó",
      "Dó", "Dó", "Ré", "Mi", "Fá", "Fá#",
      "Sol", "Fá#", "Mi", "Ré", "Dó"],
    instrumento: "teclado",
  },
  4: {
    titulo: "Teclado - Cucaracha",
    notas: ["Sol", "Sol", "Lá", "Sol", "Dó", "Si",
      "Sol", "Sol", "Lá", "Sol", "Dó", "Si",
      "Sol", "Sol", "Lá", "Sol", "Dó", "Si",
      "Sol", "Fá#", "Mi"],
    instrumento: "teclado",
  },
  5: {
    titulo: "Teclado - Parabéns pra você",
    notas: ["Dó", "Dó", "Ré"],
    instrumento: "teclado",
  },
  201: {
    titulo: "Piano - Escalas",
    notas: ["Dó", "Ré", "Mi", "Fá", "Sol", "Lá", "Si"],
    instrumento: "piano",
  },
  202: {
    titulo: "Piano - Acordes",
    notas: ["Dó", "Fá", "Sol"],
    instrumento: "piano",
  },
  203: {
    titulo: "Piano - Mão Direita",
    notas: ["Mi", "Fá", "Sol"],
    instrumento: "piano",
  },
  204: {
    titulo: "Piano - Mão Esquerda",
    notas: ["Dó", "Mi", "Sol"],
    instrumento: "piano",
  },
  205: {
    titulo: "Piano - Melodia Simples",
    notas: ["Dó", "Dó", "Sol", "Sol", "Lá", "Lá", "Sol"],
    instrumento: "piano",
  },
  401: {
    titulo: "Acordeão - Escalas",
    notas: ["Dó", "Ré", "Mi", "Fá", "Sol", "Lá", "Si"],
    instrumento: "acordeão",
  },
  402: {
    titulo: "Acordeão - Acordes",
    notas: ["Dó", "Fá", "Sol"],
    instrumento: "acordeão",
  },
  403: {
    titulo: "Acordeão - Mão Direita",
    notas: ["Mi", "Fá", "Sol"],
    instrumento: "acordeão",
  },
  404: {
    titulo: "Acordeão - Mão Esquerda",
    notas: ["Dó", "Sol"],
    instrumento: "acordeão",
  },
  405: {
    titulo: "Acordeão - Pequena música",
    notas: ["Dó", "Mi", "Sol", "Fá", "Mi", "Dó"],
    instrumento: "acordeão",
  },
  601: {
    titulo: "Violoncelo - Corda Sol",
    notas: ["Sol", "Lá", "Si", "Dó"],
    instrumento: "violoncelo",
  },
  602: {
    titulo: "Violoncelo - Corda Ré",
    notas: ["Ré", "Mi", "Fá#", "Sol"],
    instrumento: "violoncelo",
  },
  603: {
    titulo: "Violoncelo - Corda Lá",
    notas: ["Lá", "Si", "Dó#", "Ré"],
    instrumento: "violoncelo",
  },
  604: {
    titulo: "Violoncelo - Corda Dó",
    notas: ["Dó", "Ré", "Mi", "Fá"],
    instrumento: "violoncelo",
  },
  605: {
    titulo: "Violoncelo - Escalas Completas",
    notas: ["Sol", "Lá", "Si", "Dó", "Ré", "Mi", "Fá", "Sol"],
    instrumento: "violoncelo",
  }
};

let indiceNotaAtual = 0;

let progresso = JSON.parse(localStorage.getItem('progresso')) || {
  teclado: [],
  piano: [],
  acordeão: [],
  violoncelo: []
};

botoes.forEach(id => {
  const botao = document.getElementById(id);
  if (botao) {
    botao.addEventListener('click', () => mostrarAtividade(id));
  }
});

function mostrarAtividade(id) {
  const atividade = atividades[id];
  if (!atividade) return;

  indiceNotaAtual = 0;
  document.getElementById('atividade-titulo').textContent = atividade.titulo;
  document.getElementById('atividade-conteudo').textContent = atividade.conteudo;

  const notasDiv = document.getElementById('notas');
  notasDiv.innerHTML = '';

  document.getElementById('notas-pressionadas').innerHTML = '';

  atividade.notas.forEach(nota => {
    const notaDiv = document.createElement('div');
    notaDiv.classList.add('nota');
    notaDiv.textContent = nota;
    notaDiv.setAttribute('data-nota', nota);
    notasDiv.appendChild(notaDiv);
  });

  const monitor = document.getElementById('monitor');
  monitor.style.display = 'none';

  document.getElementById('atividade-container').style.display = 'block';
  atualizarBarraProgresso(atividade.instrumento);
}

function atualizarMonitor(nota) {
  const logDiv = document.getElementById('notas-pressionadas');
  const novoLog = document.createElement('div');
  novoLog.textContent = `Nota pressionada: ${nota}`;
  logDiv.appendChild(novoLog);

  if (logDiv.childElementCount > 100) {
    logDiv.removeChild(logDiv.firstChild);
  }

  rolarParaFinal();
}

function mostrarMonitor() {
  const monitor = document.getElementById('monitor');
  monitor.style.display = 'block';
  rolarParaFinal();
}

function rolarParaFinal() {
  const logDiv = document.getElementById('notas-pressionadas');
  logDiv.scrollTop = logDiv.scrollHeight;
}

function handleKeyPress(event) {
  const tecla = event.key.toLowerCase();
  const nota = tecladoNotas[tecla];

  if (nota) {
    mostrarNota(nota);
    verificarSequencia(nota);
    mostrarMonitor();
  }
}

function mostrarNota(nota) {
  const container = document.getElementById('notas-pressionadas');
  const divNota = document.createElement('div');
  divNota.classList.add('nota-pressionada');
  divNota.textContent = `Você pressionou: ${nota}`;
  container.appendChild(divNota);
}

function verificarSequencia(notaPressionada) {
  const titulo = document.getElementById('atividade-titulo').textContent;
  const atividadeId = Object.keys(atividades).find(id => atividades[id].titulo === titulo);

  if (!atividadeId) return;

  const atividade = atividades[atividadeId];
  const notaEsperada = atividade.notas[indiceNotaAtual];

  const notaDivs = document.querySelectorAll('#notas .nota');

  notaDivs.forEach(div => div.classList.remove('nota-errada'));

  if (notaPressionada === notaEsperada) {
    const div = notaDivs[indiceNotaAtual];
    if (div) div.classList.add('nota-correta');

    indiceNotaAtual++;

    if (indiceNotaAtual >= atividade.notas.length) {
      setTimeout(() => {
        // Adiciona a lógica para marcar a atividade como concluída
        if (!progresso[atividade.instrumento].includes(atividadeId)) {
          progresso[atividade.instrumento].push(atividadeId);
          // Salva o progresso no localStorage
          localStorage.setItem('progresso', JSON.stringify(progresso));
        }
        atualizarBarraProgresso(atividade.instrumento);

        alert("Parabéns! Você completou a atividade! 🎉");
        carregarProximaAtividade();
      }, 400);
      return;
    }
  } else {
    const divEsperada = notaDivs[indiceNotaAtual];
    if (divEsperada) {
      divEsperada.classList.add('nota-errada');
      setTimeout(() => {
        divEsperada.classList.remove('nota-errada');
      }, 400);
    }
  }
}

function carregarProximaAtividade() {
  const atividadeIdAtual = Object.keys(atividades).find(id => atividades[id].titulo === document.getElementById('atividade-titulo').textContent);

  if (!atividadeIdAtual) {
    alert('Erro: Atividade não encontrada!');
    return;
  }

  const proximaAtividadeId = obterProximaAtividadeId(atividadeIdAtual);

  if (proximaAtividadeId) {
    const proximaAtividade = atividades[proximaAtividadeId];
    const instrumentoAtual = atividades[atividadeIdAtual].instrumento;
    const instrumentoProximaAtividade = proximaAtividade.instrumento;

    if (instrumentoAtual === instrumentoProximaAtividade) {
      document.getElementById('atividade-titulo').textContent = proximaAtividade.titulo;
      document.getElementById('atividade-titulo').setAttribute('data-instrumento', instrumentoProximaAtividade);

      indiceNotaAtual = 0;

      document.getElementById('notas').innerHTML = '';
      document.getElementById('notas-pressionadas').innerHTML = '';

      atualizarNotas(proximaAtividade.notas);

      document.getElementById('atividade-container').style.display = 'block';

    } else {
      alert("Você completou todas as atividades do " + instrumentoAtual + "! 🎉");
    }
  }
}

function obterProximaAtividadeId(atividadeIdAtual) {
  const atividadeIds = Object.keys(atividades);
  const indiceAtual = atividadeIds.indexOf(atividadeIdAtual);

  const proximaAtividadeId = (indiceAtual + 1 < atividadeIds.length) ? atividadeIds[indiceAtual + 1] : null;

  return proximaAtividadeId;
}

function atualizarNotas(novasNotas) {
  const containerNotas = document.getElementById('notas');
  containerNotas.innerHTML = '';
  indiceNotaAtual = 0;

  novasNotas.forEach((nota, index) => {
    const notaElement = document.createElement('div');
    notaElement.classList.add('nota');
    notaElement.textContent = nota;
    notaElement.setAttribute('data-nota', nota);
    notaElement.setAttribute('data-indice', index);
    containerNotas.appendChild(notaElement);
  });
}

// Adiciona o ouvinte de eventos para capturar teclas pressionadas
document.addEventListener('keydown', handleKeyPress);

// Carrega as atividades do localStorage ao carregar a página
window.addEventListener('load', function () {
  for (let instrumento in progresso) {
    atualizarBarraProgresso(instrumento);
  }
});

function atualizarBarraProgresso(instrumento) {
  const total = Object.values(atividades).filter(a => a.instrumento === instrumento).length;
  const feitas = progresso[instrumento].length;

  document.getElementById('progresso-texto').textContent =
    `Progresso: ${feitas} de ${total} atividades concluídas`;

  const barra = document.getElementById('barra-progresso');
  const percentual = (feitas / total) * 100;
  barra.style.width = percentual + '%';
}

function zerarProgresso() {
  localStorage.removeItem('progresso');
  location.reload();
}

// Função para abrir o menu de login/cadastro
function toggleMenu() {
  const menu = document.getElementById("userMenu");
  menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

// Objeto com todas as atividades organizadas por instrumento
const atividades = {
  // Atividades de Piano
  piano1: { titulo: "Piano - Escalas", conteudo: "Toque a escala de Dó maior.", notas: ["Dó", "Ré", "Mi", "Fá", "Sol", "Lá", "Si"] },
  piano2: { titulo: "Piano - Acordes", conteudo: "Toque acordes de C, F e G.", notas: ["Dó", "Fá", "Sol"] },
  piano3: { titulo: "Piano - Mão Direita", conteudo: "Exercício para mão direita.", notas: ["Mi", "Fá", "Sol"] },
  piano4: { titulo: "Piano - Mão Esquerda", conteudo: "Exercício para mão esquerda.", notas: ["Dó", "Mi", "Sol"] },
  piano5: { titulo: "Piano - Melodia Simples", conteudo: "Toque 'Brilha Brilha Estrelinha'.", notas: ["Dó", "Dó", "Sol", "Sol", "Lá", "Lá", "Sol"] },

  // Atividades de Teclado
  teclado1: { titulo: "Teclado - Escalas", conteudo: "Pratique escalas.", notas: ["Dó", "Ré", "Mi", "Fá", "Sol", "Lá", "Si", "Dó", "Ré", "Mi", "Fá", "Sol", "Lá", "Si", "Dó", "Ré", "Mi", "Fá", "Sol", "Lá", "Si"] },
  teclado2: { titulo: "Teclado - Acordes", conteudo: "Aprenda acordes simples.", notas: ["Dó", "Mi", "Sol"] },
  teclado3: { titulo: "Teclado - Ritmo", conteudo: "Toque com ritmo.", notas: ["Mi", "Fá", "Sol", "Fá", "Mi"] },
  teclado4: { titulo: "Teclado - Duas Mãos", conteudo: "Coordene duas mãos.", notas: ["Dó", "Fá", "Lá", "Dó"] },
  teclado5: { titulo: "Teclado - Melodia", conteudo: "Pequena melodia.", notas: ["Sol", "Lá", "Si", "Dó", "Si", "Lá"] },

  // Atividades de Acordeão
  acordeao1: { titulo: "Acordeão - Escalas", conteudo: "Escala de Dó no acordeão.", notas: ["Dó", "Ré", "Mi", "Fá", "Sol", "Lá", "Si"] },
  acordeao2: { titulo: "Acordeão - Acordes", conteudo: "Acordes básicos.", notas: ["Dó", "Fá", "Sol"] },
  acordeao3: { titulo: "Acordeão - Mão Direita", conteudo: "Ritmos simples.", notas: ["Mi", "Fá", "Sol"] },
  acordeao4: { titulo: "Acordeão - Mão Esquerda", conteudo: "Baixos simples.", notas: ["Dó", "Sol"] },
  acordeao5: { titulo: "Acordeão - Pequena música", conteudo: "Pequena canção.", notas: ["Dó", "Mi", "Sol", "Fá", "Mi", "Dó"] },

  // Atividades de Violoncelo
  violoncelo1: { titulo: "Violoncelo - Corda Sol", conteudo: "Notas na corda Sol.", notas: ["Sol", "Lá", "Si", "Dó"] },
  violoncelo2: { titulo: "Violoncelo - Corda Ré", conteudo: "Notas na corda Ré.", notas: ["Ré", "Mi", "Fá#", "Sol"] },
  violoncelo3: { titulo: "Violoncelo - Corda Lá", conteudo: "Notas na corda Lá.", notas: ["Lá", "Si", "Dó#", "Ré"] },
  violoncelo4: { titulo: "Violoncelo - Corda Dó", conteudo: "Notas na corda Dó.", notas: ["Dó", "Ré", "Mi", "Fá"] },
  violoncelo5: { titulo: "Violoncelo - Escalas Completas", conteudo: "Toque todas as cordas.", notas: ["Sol", "Lá", "Si", "Dó", "Ré", "Mi", "Fá", "Sol"] }
};

let indiceNotaAtual = 0; // Guarda o índice da próxima nota que o usuário deve tocar

// Função que exibe uma atividade na tela
function mostrarAtividade(id) {
  const atividade = atividades[id]; // Recupera a atividade pelo ID
  if (!atividade) return; // Se não encontrar, não faz nada

  indiceNotaAtual = 0; // Reinicia o progresso da atividade

  // Atualiza o título e conteúdo da atividade no HTML
  document.getElementById('atividade-titulo').textContent = atividade.titulo;
  document.getElementById('atividade-conteudo').textContent = atividade.conteudo;

  const notasDiv = document.getElementById('notas');
  notasDiv.innerHTML = ''; // Limpa as notas exibidas anteriormente

  document.getElementById('notas-pressionadas').innerHTML = ''; // Limpa as notas pressionadas ao trocar de atividade

  // Cria e adiciona uma div para cada nota da atividade
  atividade.notas.forEach(nota => {
    const notaDiv = document.createElement('div');
    notaDiv.classList.add('nota'); // Adiciona a classe CSS
    notaDiv.textContent = nota; // Exibe a nota
    notaDiv.setAttribute('data-nota', nota); // Armazena a nota como atributo para identificação
    notasDiv.appendChild(notaDiv); // Adiciona no HTML
  });

  // Mostra o container da atividade
  document.getElementById('atividade-container').style.display = 'block';
}

// Mapeamento de teclas do teclado do computador para notas musicais
const tecladoNotas = {
  'a': 'Dó',
  's': 'Ré',
  'd': 'Mi',
  'f': 'Fá',
  'g': 'Sol',
  'h': 'Lá',
  'j': 'Si'
};

// Função chamada quando uma tecla é pressionada
function handleKeyPress(event) {
  const tecla = event.key.toLowerCase();
  const nota = tecladoNotas[tecla];
  if (nota) {
    mostrarNota(nota);
    verificarSequencia(nota);
    
    // Adiciona a tecla pressionada ao monitor
    atualizarMonitor(tecla);
  }
}
// Função para atualizar o monitor com a tecla pressionada
function atualizarMonitor(tecla) {
  const logDiv = document.getElementById('notas-pressionadas');
  
  // Cria um novo elemento com a tecla pressionada
  const novoLog = document.createElement('div');
  
  // Adiciona o novo log ao monitor
  logDiv.appendChild(novoLog);
  
  // Limita o número de logs (opcional)
  if (logDiv.childElementCount > 100) {
    logDiv.removeChild(logDiv.firstChild); // Remove o primeiro log quando a lista estiver cheia
  }
}

// Exibe na tela qual nota foi pressionada
function mostrarNota(nota) {
  const container = document.getElementById('notas-pressionadas'); // Seleciona o novo container
  const divNota = document.createElement('div');
  divNota.classList.add('nota-pressionada');
  divNota.textContent = `Você pressionou: ${nota}`;
  container.appendChild(divNota); // Agora adiciona dentro da div específica
}



// Verifica se a nota pressionada está correta dentro da sequência da atividade
function verificarSequencia(notaPressionada) {
  const titulo = document.getElementById('atividade-titulo').textContent;
  const atividadeId = Object.keys(atividades).find(id => atividades[id].titulo === titulo);
  if (!atividadeId) return;

  const atividade = atividades[atividadeId];
  const notaEsperada = atividade.notas[indiceNotaAtual];
  const notaDivs = document.querySelectorAll('#notas .nota');

  // Remove marcação de erro da tentativa anterior
  notaDivs.forEach(div => div.classList.remove('nota-errada'));

  if (notaPressionada === notaEsperada) {
    // ✅ Nota correta: marca como correta e avança
    const div = notaDivs[indiceNotaAtual];
    if (div) div.classList.add('nota-correta');
    indiceNotaAtual++;
  } else {
    // ❌ Nota errada: marca a nota que *deveria* ter sido pressionada (a esperada)
    const divEsperada = notaDivs[indiceNotaAtual];
    if (divEsperada) {
      divEsperada.classList.add('nota-errada');
    
      // Remove a marcação vermelha após 4 milisegundos
      setTimeout(() => {
        divEsperada.classList.remove('nota-errada');
      }, 400); // 1 segundo = 1000
    }
    
  }
}


// Adiciona o ouvinte de eventos para capturar teclas pressionadas
document.addEventListener('keydown', handleKeyPress);

// Lista com os IDs de todos os botões de atividades
const botoes = [
  'piano1', 'piano2', 'piano3', 'piano4', 'piano5',
  'teclado1', 'teclado2', 'teclado3', 'teclado4', 'teclado5',
  'acordeao1', 'acordeao2', 'acordeao3', 'acordeao4', 'acordeao5',
  'violoncelo1', 'violoncelo2', 'violoncelo3', 'violoncelo4', 'violoncelo5'
];

// Para cada ID, associa um evento de clique que chama mostrarAtividade
botoes.forEach(id => {
  const botao = document.getElementById(id); // Busca o botão no HTML
  if (botao) { // Se o botão existir
    botao.addEventListener('click', () => mostrarAtividade(id)); // Associa o clique
  }
});
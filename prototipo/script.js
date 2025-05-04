// Função para abrir ou fechar o menu de login/cadastro
function toggleMenu() {
  const menu = document.getElementById("userMenu"); // Seleciona o elemento HTML com id "userMenu"
  // Verifica se o menu está visível (display: block). Se estiver, esconde (display: none). Se estiver escondido, mostra.
  menu.style.display = (menu.style.display === "block") ? "none" : "block";
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

// Lista com os IDs de todos os botões de atividades
const botoes = [
  'piano1', 'piano2', 'piano3', 'piano4', 'piano5',
  '1', '2', '3', '4', '5', // todas as atividades terão de ser identificadas por numeros se não não fucniona o "pular de atividade"
  'acordeao1', 'acordeao2', 'acordeao3', 'acordeao4', 'acordeao5',
  'violoncelo1', 'violoncelo2', 'violoncelo3', 'violoncelo4', 'violoncelo5'
];

// Objeto que guarda todas as atividades divididas por instrumento
const atividades = {
    piano1: {
      titulo: "Piano - Escalas",
      notas: ["Dó", "Ré", "Mi", "Fá", "Sol", "Lá", "Si"],
      instrumento: "piano",  // Atividade para piano
    },
    piano2: {
      titulo: "Piano - Acordes",
      notas: ["Dó", "Fá", "Sol"],
      instrumento: "piano",  // Atividade para piano
    },
    piano3: {
      titulo: "Piano - Mão Direita",
      notas: ["Mi", "Fá", "Sol"],
      instrumento: "piano",  // Atividade para piano
    },
    piano4: {
      titulo: "Piano - Mão Esquerda",
      notas: ["Dó", "Mi", "Sol"],
      instrumento: "piano",  // Atividade para piano
    },
    piano5: {
      titulo: "Piano - Melodia Simples",
      notas: ["Dó", "Dó", "Sol", "Sol", "Lá", "Lá", "Sol"],
      instrumento: "piano",  // Atividade para piano
    },
  
    1: {
      titulo: "Teclado - Escalas",
      notas: ["Dó", "Ré", "Mi", "Fá", "Sol", "Lá", "Si", "Dó", "Ré", "Mi", "Fá", "Sol", "Lá", "Si", "Dó", "Ré", "Mi", "Fá", "Sol", "Lá", "Si"],
      instrumento: "teclado",  // Atividade para teclado
    },
    2: {
      titulo: "Teclado - Acordes",
      notas: ["Dó", "Mi", "Sol"],
      instrumento: "teclado",  // Atividade para teclado
    },
    3: {
      titulo: "Teclado - Ritmo",
      notas: ["Mi", "Fá", "Sol", "Fá", "Mi"],
      instrumento: "teclado",  // Atividade para teclado
    },
    4: {
      titulo: "Teclado - Duas Mãos",
      notas: ["Dó", "Fá", "Lá", "Dó"],
      instrumento: "teclado",  // Atividade para teclado
    },
    5: {
      titulo: "Teclado - Melodia",
      notas: ["Sol", "Lá", "Si", "Dó", "Si", "Lá"],
      instrumento: "teclado",  // Atividade para teclado
    },
  
    acordeao1: {
      titulo: "Acordeão - Escalas",
      notas: ["Dó", "Ré", "Mi", "Fá", "Sol", "Lá", "Si"],
      instrumento: "acordeão",  // Atividade para acordeão
    },
    acordeao2: {
      titulo: "Acordeão - Acordes",
      notas: ["Dó", "Fá", "Sol"],
      instrumento: "acordeão",  // Atividade para acordeão
    },
    acordeao3: {
      titulo: "Acordeão - Mão Direita",
      notas: ["Mi", "Fá", "Sol"],
      instrumento: "acordeão",  // Atividade para acordeão
    },
    acordeao4: {
      titulo: "Acordeão - Mão Esquerda",
      notas: ["Dó", "Sol"],
      instrumento: "acordeão",  // Atividade para acordeão
    },
    acordeao5: {
      titulo: "Acordeão - Pequena música",
      notas: ["Dó", "Mi", "Sol", "Fá", "Mi", "Dó"],
      instrumento: "acordeão",  // Atividade para acordeão
    },
  
    violoncelo1: {
      titulo: "Violoncelo - Corda Sol",
      notas: ["Sol", "Lá", "Si", "Dó"],
      instrumento: "violoncelo",  // Atividade para violoncelo
    },
    violoncelo2: {
      titulo: "Violoncelo - Corda Ré",
      notas: ["Ré", "Mi", "Fá#", "Sol"],
      instrumento: "violoncelo",  // Atividade para violoncelo
    },
    violoncelo3: {
      titulo: "Violoncelo - Corda Lá",
      notas: ["Lá", "Si", "Dó#", "Ré"],
      instrumento: "violoncelo",  // Atividade para violoncelo
    },
    violoncelo4: {
      titulo: "Violoncelo - Corda Dó",
      notas: ["Dó", "Ré", "Mi", "Fá"],
      instrumento: "violoncelo",  // Atividade para violoncelo
    },
    violoncelo5: {
      titulo: "Violoncelo - Escalas Completas",
      notas: ["Sol", "Lá", "Si", "Dó", "Ré", "Mi", "Fá", "Sol"],
      instrumento: "violoncelo",  // Atividade para violoncelo
    }
  };

let indiceNotaAtual = 0; // Variável que guarda qual a próxima nota que o usuário precisa tocar (posição na lista)

// Para cada ID, busca o botão correspondente no HTML e adiciona um clique que mostra a atividade
botoes.forEach(id => {
  const botao = document.getElementById(id); // Busca o botão no HTML
  if (botao) { // Se o botão existir
    botao.addEventListener('click', () => mostrarAtividade(id)); // Quando clicado, chama a função mostrarAtividade
  }
});

// Função que exibe uma atividade na tela
function mostrarAtividade(id) {
  const atividade = atividades[id]; // Recupera a atividade pelo ID
  if (!atividade) return; // Se não encontrar, não faz nada (evita erro)

  indiceNotaAtual = 0; // Reinicia a contagem de notas para começar a atividade do zero

  // Atualiza o título e conteúdo da atividade no HTML
  document.getElementById('atividade-titulo').textContent = atividade.titulo;
  document.getElementById('atividade-conteudo').textContent = atividade.conteudo;

  const notasDiv = document.getElementById('notas'); // Seleciona a área onde as notas serão exibidas
  notasDiv.innerHTML = ''; // Limpa essa área, apagando notas anteriores

  document.getElementById('notas-pressionadas').innerHTML = ''; // Também limpa o monitor com notas já pressionadas ao trocar de atividade

  // Para cada nota da atividade, cria um elemento visual na tela
  atividade.notas.forEach(nota => {
    const notaDiv = document.createElement('div'); // Cria uma nova <div>
    notaDiv.classList.add('nota'); // Adiciona uma classe CSS chamada "nota"
    notaDiv.textContent = nota; // Coloca o texto da nota dentro da <div>
    notaDiv.setAttribute('data-nota', nota); // Define um atributo chamado "data-nota" com o nome da nota (útil para comparar depois)
    notasDiv.appendChild(notaDiv); // Adiciona essa nova <div> no HTML
  });

  // Esconde o monitor ao carregar a nova atividade
  const monitor = document.getElementById('monitor');
  monitor.style.display = 'none'; // Esconde o monitor

  // Mostra o container da nova atividade (onde aparece o título, instrução e as notas)
  document.getElementById('atividade-container').style.display = 'block';
}

// Função para atualizar o monitor com a nota pressionada
function atualizarMonitor(nota) {
  // Seleciona o elemento HTML onde as notas pressionadas são registradas
  const logDiv = document.getElementById('notas-pressionadas'); 

  // Cria um novo elemento <div> para exibir a nota pressionada
  const novoLog = document.createElement('div'); 

  // Define o texto da nova <div> com a nota que foi pressionada
  novoLog.textContent = `Nota pressionada: ${nota}`; 

  // Adiciona a nova <div> ao container (onde as notas pressionadas são exibidas)
  logDiv.appendChild(novoLog); 

  // Limita o número de logs para não sobrecarregar o painel (mantém no máximo 100)
  if (logDiv.childElementCount > 100) {
    // Remove o log mais antigo se o número de logs for maior que 100
    logDiv.removeChild(logDiv.firstChild); 
  }

  // Chama a função para rolar o painel para o final automaticamente
  rolarParaFinal(); 
}

// Função para mostrar o monitor (caso ele esteja escondido)
function mostrarMonitor() {
  // Seleciona o elemento do monitor no HTML
  const monitor = document.getElementById('monitor');
  
  // Torna o monitor visível, mudando o estilo de display para 'block'
  monitor.style.display = 'block'; 

  // Chama a função que rola o conteúdo para o final quando o monitor for exibido
  rolarParaFinal();  
}

// Função que rola automaticamente o painel de notas para o final
function rolarParaFinal() {
  // Seleciona o elemento que contém as notas pressionadas
  const logDiv = document.getElementById('notas-pressionadas');
  
  // Ajusta a rolagem para o final do painel, assim a última nota fica visível
  logDiv.scrollTop = logDiv.scrollHeight; 
}

// Função que é chamada toda vez que o usuário aperta uma tecla
function handleKeyPress(event) {
  // Converte a tecla pressionada para minúscula
  const tecla = event.key.toLowerCase(); 

  // Usa a tecla pressionada para buscar a nota correspondente no objeto 'tecladoNotas'
  const nota = tecladoNotas[tecla]; 

  // Se a tecla pressionada corresponde a uma nota válida
  if (nota) { 
    // Mostra a nota pressionada no painel
    mostrarNota(nota); 

    // Verifica se a nota pressionada está correta na sequência da atividade
    verificarSequencia(nota); 

    // Torna o monitor visível, caso ainda não tenha sido exibido
    mostrarMonitor(); 
  }
}

// Função que exibe a nota pressionada no painel de notas pressionadas
function mostrarNota(nota) {
  // Seleciona o painel onde as notas pressionadas serão exibidas
  const container = document.getElementById('notas-pressionadas'); 

  // Cria uma nova <div> para exibir a nota pressionada
  const divNota = document.createElement('div'); 

  // Adiciona a classe CSS 'nota-pressionada' para estilizar a nota
  divNota.classList.add('nota-pressionada'); 

  // Define o conteúdo da nova <div> com a nota pressionada
  divNota.textContent = `Você pressionou: ${nota}`; 

  // Adiciona a nova <div> ao painel de notas pressionadas
  container.appendChild(divNota); 
}

// Verifica se a nota pressionada está correta dentro da ordem esperada
function verificarSequencia(notaPressionada) {
  const titulo = document.getElementById('atividade-titulo').textContent; // Pega o título da atividade atual exibida na tela.
  
  // Encontra o ID da atividade com base no título. Com isso, sabemos qual atividade está em andamento.
  const atividadeId = Object.keys(atividades).find(id => atividades[id].titulo === titulo); 
  
  if (!atividadeId) return; // Se não encontrar a atividade, a função sai sem fazer nada (evita erros).
  
  const atividade = atividades[atividadeId]; // Recupera os detalhes da atividade atual (título, conteúdo e notas).
  
  const notaEsperada = atividade.notas[indiceNotaAtual]; // Pega a próxima nota esperada da sequência de notas da atividade.
  
  const notaDivs = document.querySelectorAll('#notas .nota'); // Seleciona todas as divs representando as notas no HTML.
  
  // Remove qualquer indicação visual de erro de todas as divs de notas, para evitar erros repetidos.
  notaDivs.forEach(div => div.classList.remove('nota-errada'));

  if (notaPressionada === notaEsperada) { // Verifica se a nota pressionada é igual à nota esperada para a sequência.
    // Se a nota estiver correta:
    const div = notaDivs[indiceNotaAtual]; // Seleciona a div correspondente à nota esperada.
    if (div) div.classList.add('nota-correta'); // Adiciona a classe 'nota-correta' para indicar que a nota foi pressionada corretamente.
    
    // Avança para a próxima nota na sequência, apenas após a nota ser correta.
    indiceNotaAtual++;

    // Verifica se todas as notas da atividade foram tocadas corretamente.
    if (indiceNotaAtual >= atividade.notas.length) {
      alert("Parabéns! Você completou a atividade! 🎉"); // Alerta o usuário quando todas as notas foram tocadas corretamente.
      carregarProximaAtividade(); // Chama a função para carregar a próxima atividade.
      return; // Impede que a função continue verificando após a atividade ser concluída.
    }
  } else {
    // Se a nota pressionada for errada:
    const divEsperada = notaDivs[indiceNotaAtual]; // Seleciona a div correspondente à nota que deveria ter sido tocada.
    if (divEsperada) {
      divEsperada.classList.add('nota-errada'); // Adiciona a classe 'nota-errada' para indicar que a nota estava errada.
      
      // Remove o erro visual após 400 milissegundos, para não deixar o destaque por muito tempo.
      setTimeout(() => {
        divEsperada.classList.remove('nota-errada');
      }, 400);
    }
  }
}


// Função para carregar a próxima atividade
function carregarProximaAtividade() {
  // Obter o id da atividade atual diretamente
  const atividadeIdAtual = Object.keys(atividades).find(id => atividades[id].titulo === document.getElementById('atividade-titulo').textContent);

  // Verificar se o id da atividade atual foi encontrado
  if (!atividadeIdAtual) {
    alert('Erro: Atividade não encontrada!');
    return;
  }

  const proximaAtividadeId = obterProximaAtividadeId(atividadeIdAtual); // Passa o ID atual como parâmetro

  if (proximaAtividadeId) {
    const proximaAtividade = atividades[proximaAtividadeId]; // Obtém os detalhes da próxima atividade
    const instrumentoAtual = atividades[atividadeIdAtual].instrumento; // Pega o instrumento da atividade atual
    const instrumentoProximaAtividade = proximaAtividade.instrumento; // Pega o instrumento da próxima atividade

    // Verifica se o instrumento é o mesmo, caso contrário, não carrega a próxima atividade
    if (instrumentoAtual === instrumentoProximaAtividade) {
      // Atualiza o título e outras informações para a nova atividade
      document.getElementById('atividade-titulo').textContent = proximaAtividade.titulo;
      document.getElementById('atividade-titulo').setAttribute('data-instrumento', instrumentoProximaAtividade);

      // Reinicia o índice das notas
      indiceNotaAtual = 0;

      // Limpa a tela de notas anteriores
      document.getElementById('notas').innerHTML = '';
      document.getElementById('notas-pressionadas').innerHTML = '';

      // Atualiza as notas da nova atividade
      atualizarNotas(proximaAtividade.notas); // Certifique-se de passar as notas corretas da próxima atividade

      // Exibe o painel da nova atividade
      document.getElementById('atividade-container').style.display = 'block';

      // Marca a atividade como concluída
      atividadesConcluidas++; 

      // Atualiza a barra de progresso ou outro indicador de progresso
      atualizarProgresso();
    }
  } else {
    alert("Você completou todas as atividades! 🎉");
  }
}

// Função para obter o ID da próxima atividade
function obterProximaAtividadeId(atividadeIdAtual) {
  const atividadeIds = Object.keys(atividades);
  const indiceAtual = atividadeIds.indexOf(atividadeIdAtual);

  // Verifica se há uma próxima atividade
  const proximaAtividadeId = (indiceAtual + 1 < atividadeIds.length) ? atividadeIds[indiceAtual + 1] : null;

  return proximaAtividadeId; // Retorna o ID da próxima atividade ou null
}

function atualizarNotas(novasNotas) {
  const containerNotas = document.getElementById('notas');
  containerNotas.innerHTML = ''; // Limpa as notas anteriores
  indiceNotaAtual = 0; // Reinicia o índice

  novasNotas.forEach((nota, index) => {
    const notaElement = document.createElement('div');
    notaElement.classList.add('nota'); // Classe usada para o estilo de quadrado
    notaElement.textContent = nota;
    notaElement.setAttribute('data-nota', nota);
    notaElement.setAttribute('data-indice', index);
    containerNotas.appendChild(notaElement);
  });
}



// Adiciona o ouvinte de eventos para capturar teclas pressionadas
document.addEventListener('keydown', handleKeyPress);


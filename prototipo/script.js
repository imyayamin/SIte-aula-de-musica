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
  'teclado1', 'teclado2', 'teclado3', 'teclado4', 'teclado5',
  'acordeao1', 'acordeao2', 'acordeao3', 'acordeao4', 'acordeao5',
  'violoncelo1', 'violoncelo2', 'violoncelo3', 'violoncelo4', 'violoncelo5'
];

// Objeto que guarda todas as atividades divididas por instrumento
const atividades = {
  // Cada atividade tem um título, conteúdo e uma lista de notas que o usuário deve tocar.
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
  const titulo = document.getElementById('atividade-titulo').textContent; // Pega o título da atividade atual
  const atividadeId = Object.keys(atividades).find(id => atividades[id].titulo === titulo); // Encontra o ID da atividade com base no título
  if (!atividadeId) return; // Se não encontrar, sai da função

  const atividade = atividades[atividadeId]; // Recupera a atividade
  const notaEsperada = atividade.notas[indiceNotaAtual]; // Pega a próxima nota esperada

  const notaDivs = document.querySelectorAll('#notas .nota'); // Seleciona todas as divs das notas da atividade

  notaDivs.forEach(div => div.classList.remove('nota-errada')); // Remove qualquer erro visual anterior

  if (notaPressionada === notaEsperada) { // Verifica se a nota pressionada é a mesma requerida
    const div = notaDivs[indiceNotaAtual]; // Seleciona a div da nota correta
    if (div) div.classList.add('nota-correta'); // Marca como correta com CSS
    indiceNotaAtual++; // Avança para a próxima nota da sequência
  } else { // Se não tiver na sequencia
    const divEsperada = notaDivs[indiceNotaAtual]; // Pega a div da nota que deveria ter sido tocada
    if (divEsperada) {
      divEsperada.classList.add('nota-errada'); // Marca como errada

      // Remove o destaque de erro após 400 milissegundos (0,4 segundos)
      setTimeout(() => {
        divEsperada.classList.remove('nota-errada');
      }, 400);
    }
  }
}

// Adiciona o ouvinte de eventos para capturar teclas pressionadas
document.addEventListener('keydown', handleKeyPress);


document.addEventListener("DOMContentLoaded", function() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        });

    const cadastroForm = document.getElementById('cadastroForm');
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            fetch('/api/cadastro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, email, senha })
            })
            .then(res => res.json())
            .then(data => {
                if (data.sucesso) {
                    alert('Cadastro realizado com sucesso!');
                    window.location.href = 'login.html';
                } else {
                    alert(data.erro || 'Erro ao cadastrar');
                }
            });
        });
    }
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            })
            .then(res => res.json())
            .then(data => {
                if (data.sucesso) {
                    alert('Login realizado com sucesso!');
                    window.location.href = 'index.html';
                } else {
                    alert(data.erro || 'E-mail ou senha inválidos!');
                }
            });
        });
    }
});

// Função para abrir ou fechar o menu de login/cadastro
function toggleMenu() {
  const menu = document.getElementById("userMenu");
  menu.style.display = (menu.style.display === "block") ? "none" : "block";
}


// Integração MIDI - teste
if (navigator.requestMIDIAccess) {
  navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
} else {
  console.warn("Web MIDI API não suportada neste navegador.");
}

function onMIDISuccess(midiAccess) {
  for (let input of midiAccess.inputs.values()) {
    input.onmidimessage = handleMIDIMessage;
  }
}

function onMIDIFailure() {
  console.warn("Não foi possível acessar dispositivos MIDI.");
  //alert("Não foi possível acessar dispositivos MIDI.");
}

function handleMIDIMessage(event) {
  const [status, note, velocity] = event.data;
  // status 144 = note on, 128 = note off
  if (status === 144 && velocity > 0) { // Note ON
    const tecla = midiNoteToNome(note);
    const nota = tecladoNotas[tecla];
    if (nota) {
      tocarNota(tecla);
      mostrarNota(nota);
      verificarSequencia(nota);
      mostrarMonitor();
    }
  } else if (status === 128 || (status === 144 && velocity === 0)) { // Note OFF
    const tecla = midiNoteToNome(note);
    if (tecla) {
      pararNota(tecla);
    }
  }
}

// Mapeamento das notas MIDI para teclas do seu sistema
function midiNoteToNome(midiNote) {
  const mapa = {
    60: 'a', // Dó
    61: 'z', // Dó#
    62: 's', // Ré
    63: 'x', // Ré#
    64: 'd', // Mi
    65: 'f', // Fá
    66: 'v', // Fá#
    67: 'g', // Sol
    68: 'b', // Sol#
    69: 'h', // Lá
    70: 'm', // Lá#
    71: 'j', // Si
    72: 'k'  // Dó (oitava acima)
  };
  return mapa[midiNote];
}
// fim do teste do MIDI

const tecladoNotas = {
  'a': 'Dó',
  'z': 'Dó#',
  's': 'Ré',
  'x': 'Ré#',
  'd': 'Mi',
  'f': 'Fá',
  'v': 'Fá#',
  'g': 'Sol',
  'b': 'Sol#',
  'h': 'Lá',
  'm': 'Lá#',
  'j': 'Si',
  'k': 'Dó'// na oitava
};

const frequenciasNotas = {
  a: 261.63,  // Dó (C4)
  z: 277.18,  // Dó sustenido (C#4)
  s: 293.66,  // Ré (D4)
  x: 311.13,  // Ré sustenido (D#4)
  d: 329.63,  // Mi (E4)
  f: 349.23,  // Fá (F4)
  v: 369.99,  // Fá sustenido (F#4)
  g: 392.00,  // Sol (G4)
  b: 415.30,  // Sol sustenido (G#4)
  h: 440.00,  // Lá (A4)
  m: 466.16,  // Lá sustenido (A#4)
  j: 493.88,  // Si (B4)
  k: 523.25   // Dó na oitava (C5)
};

const botoes = [
  '1', '2', '3', '4', '5',
  '201', '202', '203', '204', '205',
  '401', '402', '403', '404', '405',
  '601', '602', '603', '604', '605'
];

const atividades = {
  1: {
    titulo: "Teclado - Escalas", notas: ["Dó", "Ré", "Mi", "Fá", "Sol", "Lá", "Si", "Dó", "Ré", "Mi", "Fá", "Sol", "Lá", "Si", "Dó", "Ré", "Mi", "Fá", "Sol", "Lá", "Si"], instrumento: "teclado",
  },
  2: {
    titulo: "Teclado - Acordes", notas: ["Dó", "Mi", "Sol"], instrumento: "teclado",
  },
  3: {
    titulo: "Teclado - Do-Re-Mi", notas: ["Dó", "Dó", "Ré", "Mi", "Mi", "Fá", "Fá#", "Sol", "Sol", "Sol", "Lá", "Si", "Si", "Dó", "Dó", "Dó", "Ré", "Mi", "Fá", "Fá#", "Sol", "Fá#", "Mi", "Ré", "Dó"], instrumento: "teclado",
  },
  4: {
    titulo: "Teclado - Cucaracha",
    notas: ["Sol", "Sol", "Lá", "Sol", "Dó", "Si", "Sol", "Sol", "Lá", "Sol", "Dó", "Si", "Sol", "Sol", "Lá", "Sol", "Dó", "Si", "Sol", "Fá#", "Mi"], instrumento: "teclado",
  },
  5: {
    titulo: "Teclado - Parabéns pra você", notas: ["Dó", "Dó", "Ré"], instrumento: "teclado",
  },
  201: {
    titulo: "Piano - Escalas", notas: ["Dó", "Ré", "Mi", "Fá", "Sol", "Lá", "Si"], instrumento: "piano",
  },
  202: {
    titulo: "Piano - Acordes", notas: ["Dó", "Fá", "Sol"], instrumento: "piano",
  },
  203: {
    titulo: "Piano - Mão Direita", notas: ["Mi", "Fá", "Sol"], instrumento: "piano",
  },
  204: {
    titulo: "Piano - Mão Esquerda", notas: ["Dó", "Mi", "Sol"], instrumento: "piano",
  },
  205: {
    titulo: "Piano - Melodia Simples", notas: ["Dó", "Dó", "Sol", "Sol", "Lá", "Lá", "Sol"], instrumento: "piano",
  },
  401: {
    titulo: "Acordeão - Escalas", notas: ["Dó", "Ré", "Mi", "Fá", "Sol", "Lá", "Si"], instrumento: "acordeão",
  },
  402: {
    titulo: "Acordeão - Acordes", notas: ["Dó", "Fá", "Sol"], instrumento: "acordeão",
  },
  403: {
    titulo: "Acordeão - Mão Direita", notas: ["Mi", "Fá", "Sol"], instrumento: "acordeão",
  },
  404: {
    titulo: "Acordeão - Mão Esquerda", notas: ["Dó", "Sol"], instrumento: "acordeão",
  },
  405: {
    titulo: "Acordeão - Pequena música", notas: ["Dó", "Mi", "Sol", "Fá", "Mi", "Dó"], instrumento: "acordeão",
  },
  601: {
    titulo: "Violoncelo - Corda Sol", notas: ["Sol", "Lá", "Si", "Dó"], instrumento: "violoncelo",
  },
  602: {
    titulo: "Violoncelo - Corda Ré", notas: ["Ré", "Mi", "Fá#", "Sol"], instrumento: "violoncelo",
  },
  603: {
    titulo: "Violoncelo - Corda Lá", notas: ["Lá", "Si", "Dó#", "Ré"], instrumento: "violoncelo",
  },
  604: {
    titulo: "Violoncelo - Corda Dó", notas: ["Dó", "Ré", "Mi", "Fá"], instrumento: "violoncelo",
  },
  605: {
    titulo: "Violoncelo - Escalas Completas", notas: ["Sol", "Lá", "Si", "Dó", "Ré", "Mi", "Fá", "Sol"], instrumento: "violoncelo",
  }
};

// Cria um novo contexto de áudio, que é a base para a criação de sons no navegador
const contextoAudio = new (window.AudioContext || window.webkitAudioContext)();
const sonsTocados = {}; // Um objeto para armazenar os osciladores e controlar os sons ativos

let primeiraTeclaPressionada = false;

function tocarNota(tecla) {
  const frequencia = frequenciasNotas[tecla];// Obtém a frequência da nota correspondente à tecla pressionada, a partir de um objeto 'frequenciasNotas'

  if (frequencia && !sonsTocados[tecla]) {  // Verifica se a frequência existe e se a tecla ainda não está sendo tocada
    
    const oscilador = contextoAudio.createOscillator();// Cria um oscilador, que é responsável por gerar a onda sonora
    
    const ganho = contextoAudio.createGain(); // Cria um objeto de ganho para controlar o volume do som
    
    oscilador.frequency.value = frequencia; // Define a frequência do oscilador para a frequência da nota
    
    oscilador.type = "sine"; // Define o tipo de onda gerada (sine, square, sawtooth ou triangle)
    
    oscilador.connect(ganho);// Conecta o oscilador ao objeto de ganho
    
    ganho.connect(contextoAudio.destination);// Conecta o objeto de ganho ao destino do áudio (o alto-falante do dispositivo)
    
    ganho.gain.setValueAtTime(0.2, contextoAudio.currentTime); // Define o volume do som para 0.2 (em uma escala de 0 a 1)

    oscilador.start(); // Inicia o oscilador (faz o som começar)
   
    sonsTocados[tecla] = { oscilador, ganho }; // Armazena o oscilador e o ganho no objeto 'sonsTocados' para controle posterior
  }
}


function pararNota(tecla) {
  
  const tocando = sonsTocados[tecla];// Verifica se a tecla está tocando (se já foi armazenada no objeto 'sonsTocados')
  
  if (tocando) {
    
    tocando.ganho.gain.exponentialRampToValueAtTime(0.001, contextoAudio.currentTime + 0.1); // Aplica um efeito de fade-out no volume da nota (diminui o volume suavemente até quase 0)
    
    tocando.oscilador.stop(contextoAudio.currentTime + 0.1); // Para o oscilador após o fade-out (parando o som)
   
    delete sonsTocados[tecla]; // Remove o oscilador e o ganho do objeto 'sonsTocados', sinalizando que a tecla parou de tocar
  }
}

// Variável que armazena o índice da nota que está sendo tocada na atividade
let indiceNotaAtual = 0; 

// A variável 'progresso' armazena os dados do progresso do usuário, carregando informações do 'localStorage' se existir, caso contrário, define um valor padrão.
let progresso = JSON.parse(localStorage.getItem('progresso')) || {
  teclado: [],
  piano: [],
  acordeão: [],
  violoncelo: []
};

// Aqui estamos criando dois conjuntos (Sets) que serão usados para verificar as atividades do usuário.
const primeirosIds = new Set(); // Para armazenar os primeiros IDs de cada instrumento
const instrumentosVistos = new Set(); // Para armazenar os instrumentos que já foram vistos

// Este loop percorre todos os 'botoes' que representam as atividades na página
for (const id of botoes) {
  const atividade = atividades[id]; // Pega a atividade relacionada ao botão, usando o ID
  if (!atividade) continue; // Se a atividade não existir, pula para o próximo botão

  // Aqui estamos verificando se o instrumento dessa atividade já foi visto
  if (!instrumentosVistos.has(atividade.instrumento)) {
    primeirosIds.add(id); // Se não foi visto, adiciona o ID dessa atividade nos 'primeirosIds'
    instrumentosVistos.add(atividade.instrumento); // Marca esse instrumento como já visto
  }
}

// Este trecho de código aplica lógica de desbloqueio dos botões de atividades na página
document.querySelectorAll('.atividade-botao').forEach(botao => {
  const id = botao.getAttribute('data-id'); // Pega o ID da atividade do botão
  const atividade = atividades[id]; // Pega os dados da atividade associada a esse ID

  if (!atividade) return; // Se a atividade não existir, pula para o próximo botão

  const anteriorIndex = botoes.indexOf(id) - 1; // Calcula o índice da atividade anterior
  const anteriorId = botoes[anteriorIndex]; // Pega o ID da atividade anterior

  // Verifica se a atividade pode ser desbloqueada com base nas condições de progresso
  const podeDesbloquear = primeirosIds.has(id) || progresso[atividade.instrumento].includes(anteriorId);

  // Se não puder desbloquear, desabilita o botão e marca ele como bloqueado
  if (!podeDesbloquear) {
    botao.disabled = true;
    botao.classList.add('bloqueado');
    botao.title = "Conclua a atividade anterior para desbloquear"; // Define o título do botão
  } else { // Se puder desbloquear, habilita o botão e adiciona um título
    botao.disabled = false;
    botao.classList.remove('bloqueado');
    botao.title = atividade.titulo;

    // Adiciona um evento de clique no botão, que chama a função 'mostrarAtividade' quando clicado
    botao.addEventListener('click', () => {
      mostrarAtividade(id); // Função para mostrar a atividade ao usuário
    });
  }
});

// Função que reativa os botões de atividades para um instrumento específico
function reativarBotoes(instrumento) {
  document.querySelectorAll('.atividade-botao').forEach(botao => {
    const id = botao.getAttribute('data-id'); // Pega o ID da atividade do botão
    const atividade = atividades[id]; // Pega os dados da atividade

    // Se a atividade não existir ou for de outro instrumento, ignora esse botão
    if (!atividade || atividade.instrumento !== instrumento) return;

    const anteriorId = (parseInt(id) - 1).toString(); // Pega o ID da atividade anterior

    // Se a atividade anterior foi concluída, libera o botão dessa atividade
    if (id !== '1' && progresso[instrumento].includes(anteriorId)) {
      botao.disabled = false;
      botao.classList.remove('bloqueado');
      botao.title = "";
    }
  });
}

// Função que exibe a atividade selecionada na tela
function mostrarAtividade(id) {
  const atividade = atividades[id]; // Pega os dados da atividade
  if (!atividade) return; // Se não existir a atividade, sai da função

  document.getElementById('monitor').style.display = 'none';
  primeiraTeclaPressionada = false;

  indiceNotaAtual = 0; // Reseta o índice da nota atual

  // Atualiza o título e o conteúdo da atividade na página
  document.getElementById('atividade-titulo').textContent = atividade.titulo;
  document.getElementById('atividade-conteudo').textContent = atividade.conteudo;

  // Limpa o conteúdo anterior de notas
  const notasDiv = document.getElementById('notas');
  notasDiv.innerHTML = '';

  // Limpa a lista de notas pressionadas
  document.getElementById('notas-pressionadas').innerHTML = '';

  // Adiciona as notas da atividade na página
  atividade.notas.forEach(nota => {
    const notaDiv = document.createElement('div'); // Cria um novo div para cada nota
    notaDiv.classList.add('nota'); // Adiciona uma classe CSS para estilizar
    notaDiv.textContent = nota; // Adiciona o texto da nota
    notaDiv.setAttribute('data-nota', nota); // Define um atributo 'data-nota' com o nome da nota
    notasDiv.appendChild(notaDiv); // Adiciona o div de nota na página
  });

  // Esconde o monitor enquanto a atividade é mostrada
  const monitor = document.getElementById('monitor');
  monitor.style.display = 'none';

  // Exibe o container da atividade
  document.getElementById('atividade-container').style.display = 'block';

  primeiraTeclaPressionada = false; 

  // Atualiza a barra de progresso da atividade
  atualizarBarraProgresso(atividade.instrumento);
}

// Função que registra as notas pressionadas pelo usuário
function atualizarMonitor(nota) {
  const logDiv = document.getElementById('notas-pressionadas'); // Pega a div que contém as notas pressionadas
  const novoLog = document.createElement('div'); // Cria um novo div para a nova nota pressionada
  novoLog.textContent = `Nota pressionada: ${nota}`; // Define o texto do div
  logDiv.appendChild(novoLog); // Adiciona a nota pressionada ao log

  // Limita a quantidade de notas no log para 100
  if (logDiv.childElementCount > 100) {
    logDiv.removeChild(logDiv.firstChild); // Remove a primeira nota do log
  }

  rolarParaFinal(); // Chama a função que faz o scroll do log para a parte inferior
}

// Função que exibe o monitor de notas pressionadas
function mostrarMonitor() {
  const monitor = document.getElementById('monitor');
  monitor.style.display = 'block'; // Torna o monitor visível
  rolarParaFinal(); // Rola a lista para o final
}

// Função que rola a lista de notas pressionadas até o final
function rolarParaFinal() {
  const logDiv = document.getElementById('notas-pressionadas');
  logDiv.scrollTop = logDiv.scrollHeight; // Rola o log para o final
}


// Função que exibe a nota pressionada na tela
function mostrarNota(nota) {
  const container = document.getElementById('notas-pressionadas'); // Pega o container onde as notas serão exibidas
  const divNota = document.createElement('div'); // Cria um novo div para a nota
  divNota.classList.add('nota-pressionada'); // Adiciona uma classe CSS para estilizar
  divNota.textContent = `Você pressionou: ${nota}`; // Define o texto do div
  container.appendChild(divNota); // Adiciona a nota pressionada ao container
}

// Função que verifica se a sequência de notas está correta
function verificarSequencia(notaPressionada) {
  const titulo = document.getElementById('atividade-titulo').textContent; // Pega o título da atividade atual
  const atividadeId = Object.keys(atividades).find(id => atividades[id].titulo === titulo); // Encontra o ID da atividade com base no título

  if (!atividadeId) return; // Se não encontrar a atividade, sai da função

  const atividade = atividades[atividadeId]; // Pega os dados da atividade
  const notaEsperada = atividade.notas[indiceNotaAtual]; // Pega a próxima nota esperada

  const notaDivs = document.querySelectorAll('#notas .nota'); // Pega todas as notas exibidas na página

  // Remove a classe 'nota-errada' de todas as notas
  notaDivs.forEach(div => div.classList.remove('nota-errada'));

  // Se a nota pressionada for a esperada, marca a nota como correta e avança para a próxima
  if (notaPressionada === notaEsperada) {
    const div = notaDivs[indiceNotaAtual];
    if (div) div.classList.add('nota-correta'); // Marca a nota como correta
    indiceNotaAtual++; // Avança para a próxima nota

    // Se todas as notas foram tocadas corretamente, marca a atividade como concluída
    if (indiceNotaAtual >= atividade.notas.length) {
      setTimeout(() => {
        if (!progresso[atividade.instrumento].includes(atividadeId)) {
          progresso[atividade.instrumento].push(atividadeId);
          localStorage.setItem('progresso', JSON.stringify(progresso));
          reativarBotoes(atividade.instrumento);
        }
      
        atualizarBarraProgresso(atividade.instrumento);
      
        alert("Parabéns! Você completou a atividade!🎉");
      
        // Aguarda um pequeno tempo depois do alerta para carregar a próxima
        setTimeout(() => {
          carregarProximaAtividade();
        }, 200); // pode ajustar o tempo se quiser
      }, 400);
      
      return;
    }
  } else {
    // Se a nota estiver errada, marca ela como errada e mostra por um tempo
    const divEsperada = notaDivs[indiceNotaAtual];
    if (divEsperada) {
      divEsperada.classList.add('nota-errada');
      setTimeout(() => {
        divEsperada.classList.remove('nota-errada');
      }, 400);
    }
  }
}

// Função que carrega a próxima atividade, caso exista
function carregarProximaAtividade() {
  const tituloAtual = document.getElementById('atividade-titulo').textContent;
  const atividadeIdAtual = Object.keys(atividades).find(id => atividades[id].titulo === tituloAtual);

  if (!atividadeIdAtual) {
    alert('Erro: Atividade não encontrada!');
    return;
  }

  const indiceAtual = botoes.findIndex(id => id.toString() === atividadeIdAtual.toString());
  if (indiceAtual === -1) {
    alert('Erro: Atividade atual não encontrada na lista!');
    return;
  }

  const instrumentoAtual = atividades[atividadeIdAtual].instrumento;

  // Procura a próxima atividade do mesmo instrumento
  let proximoId = null;
  for (let i = indiceAtual + 1; i < botoes.length; i++) {
    const id = botoes[i].toString();
    if (atividades[id] && atividades[id].instrumento === instrumentoAtual) {
      proximoId = id;
      break;
    }
  }

  if (proximoId) {
    mostrarAtividade(proximoId);
  } else {
    alert('Você concluiu todas as atividades deste instrumento!');
    document.getElementById('atividade-container').style.display = 'none';
  }
}



// Função que obtém o ID da próxima atividade
function obterProximaAtividadeId(atividadeIdAtual) {
  const atividadeIds = Object.keys(atividades); // Pega todos os IDs das atividades
  const indiceAtual = atividadeIds.indexOf(atividadeIdAtual); // Encontra o índice da atividade atual

  // Se a próxima atividade existir, retorna o seu ID, caso contrário, retorna null
  const proximaAtividadeId = (indiceAtual + 1 < atividadeIds.length) ? atividadeIds[indiceAtual + 1] : null;

  return proximaAtividadeId;
}

// Função que atualiza as notas na página, exibindo as novas
function atualizarNotas(novasNotas) {
  const containerNotas = document.getElementById('notas'); // Pega o container de notas na página
  containerNotas.innerHTML = ''; // Limpa as notas existentes
  indiceNotaAtual = 0; // Reseta o índice da nota atual

  novasNotas.forEach((nota, index) => { // Para cada nova nota, cria um elemento para exibi-la
    const notaElement = document.createElement('div');
    notaElement.classList.add('nota');
    notaElement.textContent = nota;
    notaElement.setAttribute('data-nota', nota);
    notaElement.setAttribute('data-indice', index);
    containerNotas.appendChild(notaElement); // Adiciona a nova nota na página
  });
}

// Adicionando uma flag para garantir que a tecla só será processada uma vez enquanto pressionada
const teclasAtivas = {};

// Função de pressionamento de tecla
function handleKeyDown(event) {
  const tecla = event.key.toLowerCase(); // Pega a tecla pressionada e a converte para minúscula
  const nota = tecladoNotas[tecla]; // Verifica se a tecla pressionada corresponde a uma nota

  if (nota && !teclasAtivas[tecla]) {  // Verifica se a tecla ainda não foi pressionada
    teclasAtivas[tecla] = true; // Marca que a tecla está pressionada
    tocarNota(tecla);  // Toca a nota
    mostrarNota(nota); // Exibe a nota pressionada
    verificarSequencia(nota);  // Verifica a sequência de notas
    mostrarMonitor();  // Exibe o monitor de notas
  }
   // Iniciar o cronômetro na primeira tecla válida
    if (!primeiraTeclaPressionada) {
      mostrarMonitor();
      primeiraTeclaPressionada = true;
    }
}


// Função de soltura de tecla
function handleKeyUp(event) {
  const tecla = event.key.toLowerCase(); // Pega a tecla solta
  if (teclasAtivas[tecla]) {  // Se a tecla estava pressionada
    pararNota(tecla);  // Para a nota
    teclasAtivas[tecla] = false;  // Marca que a tecla não está mais pressionada
  }
}


// Adicionando os eventos de tecla
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

// Ao carregar a página, atualiza as barras de progresso de todos os instrumentos
window.addEventListener('load', function () {
  for (let instrumento in progresso) {
    atualizarBarraProgresso(instrumento);
  }
});

// Função que atualiza a barra de progresso do instrumento na página
function atualizarBarraProgresso(instrumento) {
  const total = Object.values(atividades).filter(a => a.instrumento === instrumento).length; // Conta o total de atividades para o instrumento
  const feitas = progresso[instrumento].length; // Conta o número de atividades concluídas para o instrumento

  document.getElementById('progresso-texto').textContent =
    `Progresso: ${feitas} de ${total} atividades concluídas`;

  const barra = document.getElementById('barra-progresso'); // Pega a barra de progresso na página
  const percentual = (feitas / total) * 100; // Calcula a porcentagem do progresso
  barra.style.width = percentual + '%'; // Atualiza a largura da barra de acordo com o progresso
}

// Função que reseta o progresso do usuário
function zerarProgresso() {
  localStorage.removeItem('progresso'); // Remove os dados do progresso armazenados
  location.reload(); // Recarrega a página para reiniciar as atividades
}

function limparMonitor() {
  const logDiv = document.getElementById('notas-pressionadas');
  if (logDiv) { //verifica a existencia
    logDiv.innerHTML = ''; // Apaga todo o conteúdo da div de uma vez
  }
}

function reiniciarAtividade(){ 
  location.reload();
}




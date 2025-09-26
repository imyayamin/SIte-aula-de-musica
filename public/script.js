document.addEventListener("DOMContentLoaded", function() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
            window.addEventListener('DOMContentLoaded', function() {
              const usuario = JSON.parse(localStorage.getItem('usuario'));
              if (usuario && usuario.nome) {
                document.getElementById('usuario-logado').textContent = `Olá, ${usuario.nome}`;
              }
            });

            document.getElementById('logout').addEventListener('click', function() {
              localStorage.removeItem('usuario');
              localStorage.removeItem('progresso');
              window.location.href = 'login.html';
            });
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
            const senha = document.querySelector('[name="senha"]').value;
            fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            })
            .then(res => res.json())
            .then(data => {
                if (data.sucesso) {
                    localStorage.setItem('usuario', JSON.stringify({ nome: data.nome, email }));
                    localStorage.setItem('progresso', JSON.stringify(data.progresso));
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

// Função para voltar ao inicio
function voltarInicio() {
 window.location.href = 'index.html';
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
  // Função auxiliar para buscar a nota na matrizBotoesMIDI
  function buscarNotaPorMidi(midiNumber) {
    for (let linha of matrizBotoesMIDI) {
      for (let botao of linha) {
        if (botao.midi === midiNumber) {
          return botao.nota;
        }
      }
    }
    return null;
  }

  if (status === 144 && velocity > 0) { // Note ON
    const nota = buscarNotaPorMidi(note);
    if (nota) {
      mostrarNota(nota);
      verificarSequencia(nota);
      mostrarMonitor();
    }
    // Se quiser tocar o som, pode mapear para uma tecla se desejar
    // Exemplo: tocarNota(tecla) se houver mapeamento
  } else if (status === 128 || (status === 144 && velocity === 0)) { // Note OFF
    // Não faz nada, mas pode implementar lógica se desejar
  }
}

// Mapeamento das notas MIDI para teclas do seu sistema

// Matriz 4x5 para botões MIDI (cada valor representa uma nota MIDI)
const matrizBotoesMIDI = [
  [
    { midi: 60, nota: 'Dó' },
    { midi: 61, nota: 'Dó#' },
    { midi: 62, nota: 'Ré' },
    { midi: 63, nota: 'Ré#' },
    { midi: 64, nota: 'Mi' },
  ], // Linha 1
  [
    { midi: 65, nota: 'Fá' },
    { midi: 66, nota: 'Fá#' },
    { midi: 67, nota: 'Sol' },
    { midi: 68, nota: 'Sol#' },
    { midi: 69, nota: 'Lá' },
  ], // Linha 2
  [
    { midi: 70, nota: 'Lá#' },
    { midi: 71, nota: 'Si' },
    { midi: 72, nota: 'Dó (oitava acima)' },
    { midi: 73, nota: 'Dó# (oitava acima)' },
    { midi: 74, nota: 'Ré (oitava acima)' },
  ], // Linha 3
  [
    { midi: 75, nota: 'Ré# (oitava acima)' },
    { midi: 76, nota: 'Mi (oitava acima)' },
    { midi: 77, nota: 'Fá (oitava acima)' },
    { midi: 78, nota: 'Fá# (oitava acima)' },
    { midi: 79, nota: 'Sol (oitava acima)' },
  ] // Linha 4
];
// fim do teste do MIDI

const botoes = [
  '1', '2', '3', '4', '5',
  '201', '202', '203', '204', '205',
  '401', '402', '403', '404', '405',
  '601', '602', '603', '604', '605'
];

const atividades = {
  // Notas musicais (com acidentes)
  1: {
    titulo: "Notas naturais e sustenidos",
    notas: ["Dó", "Dó#", "Ré", "Ré#", "Mi", "Fá", "Fá#", "Sol", "Sol#", "Lá", "Lá#", "Si"],
    conteudo: "As 12 notas musicais são a base de toda a música ocidental. Incluem as notas naturais e seus acidentes (sustenidos e bemóis). Toque todas as notas da escala cromática em ordem ascendente.",
    tipo: "notas"
  },
  2: {
    titulo: "Notas descendentes",
    notas: ["Si", "Lá#", "Lá", "Sol#", "Sol", "Fá#", "Fá", "Mi", "Ré#", "Ré", "Dó#", "Dó"],
    conteudo: "As notas podem ser tocadas em ordem descendente. Toque todas as notas da escala cromática em ordem descendente.",
    tipo: "notas"
  },
  3: {
    titulo: "Notas alternadas",
    notas: ["Dó", "Mi", "Ré#", "Fá#", "Sol", "Lá#", "Si", "Ré", "Fá", "Lá"],
    conteudo: "Alternar notas ajuda a desenvolver agilidade e reconhecimento auditivo. Toque as notas alternadas da sequência proposta.",
    tipo: "notas"
  },
  4: {
    titulo: "Notas com saltos",
    notas: ["Dó", "Sol", "Ré", "Lá", "Mi", "Si", "Fá", "Dó (oitava acima)"],
    conteudo: "Saltos entre notas treinam a percepção de distância entre sons. Toque as notas saltando intervalos conforme a sequência.",
    tipo: "notas"
  },
  5: {
    titulo: "Sevenfour - Deltarune OST",
    notas: ["Mi", "Mi", "Mi", "Ré", "Dó", "Sol", "Sol", "Mi", "Ré", "Dó", "Dó", "Mi", "Mi", "Ré", "Dó", "Sol"],
    conteudo: "Exercícios musicais simples ajudam a fixar as notas. Toque a sequência para tocar a musiquinha.",
    tipo: "notas"
  },

  // Intervalos
  201: {
    titulo: "Intervalo de 2ª maior",
    notas: ["Dó", "Ré", "Mi", "Fá#", "Sol#", "Lá#"],
    conteudo: "Intervalos são a distância entre duas notas. A 2ª maior corresponde a dois semitons. Toque pares de notas com intervalo de 2ª maior.",
    tipo: "intervalos"
  },
  202: {
    titulo: "Intervalo de 3ª menor",
    notas: ["Dó", "Ré#", "Fá", "Sol#", "Lá", "Dó (oitava acima)"],
    conteudo: "A 3ª menor corresponde a três semitons. Toque pares de notas com intervalo de 3ª menor.",
    tipo: "intervalos"
  },
  203: {
    titulo: "Intervalo de 4ª justa",
    notas: ["Dó", "Fá", "Ré", "Sol", "Mi", "Lá"],
    conteudo: "A 4ª justa é um intervalo comum em melodias. Toque pares de notas com intervalo de 4ª justa.",
    tipo: "intervalos"
  },
  204: {
    titulo: "Intervalo de 5ª justa",
    notas: ["Dó", "Sol", "Fá", "Dó (oitava acima)", "Lá", "Mi"],
    conteudo: "A 5ª justa é fundamental para a formação de acordes. Toque pares de notas com intervalo de 5ª justa.",
    tipo: "intervalos"
  },
  205: {
    titulo: "Musiquinha: Intervalos saltitantes",
    notas: ["Dó", "Fá", "Ré", "Sol", "Mi", "Lá", "Dó (oitava acima)"],
    conteudo: "Exercícios musicais com intervalos variados. Toque a sequência para tocar a musiquinha.",
    tipo: "intervalos"
  },

  // Escalas
  401: {
    titulo: "Escala maior de Dó",
    notas: ["Dó", "Ré", "Mi", "Fá", "Sol", "Lá", "Si", "Dó (oitava acima)"],
    conteudo: "Escalas são sequências de notas em ordem crescente ou decrescente. Toque a escala maior de Dó.",
    tipo: "escalas"
  },
  402: {
    titulo: "Escala menor de Lá",
    notas: ["Lá", "Si", "Dó", "Ré", "Mi", "Fá", "Sol", "Lá"],
    conteudo: "A escala menor tem um som mais melancólico. Toque a escala menor de Lá.",
    tipo: "escalas"
  },
  403: {
    titulo: "Escala maior de Sol",
    notas: ["Sol", "Lá", "Si", "Dó", "Ré", "Mi", "Fá#", "Sol"],
    conteudo: "Escalas com sustenidos treinam a leitura de acidentes. Toque a escala maior de Sol.",
    tipo: "escalas"
  },
  404: {
    titulo: "Escala menor de Mi",
    notas: ["Mi", "Fá#", "Sol", "Lá", "Si", "Dó", "Ré", "Mi"],
    conteudo: "Praticar escalas em diferentes tons amplia o domínio do instrumento. Toque a escala menor de Mi.",
    tipo: "escalas"
  },
  405: {
    titulo: "Musiquinha: Escalando",
    notas: ["Dó", "Mi", "Fá", "Sol", "Lá", "Sol", "Fá", "Mi", "Dó"],
    conteudo: "Exercícios musicais com escalas. Toque a sequência para tocar a musiquinha.",
    tipo: "escalas"
  },

  // Acordes
  601: {
    titulo: "Acorde de Dó maior",
    notas: ["Dó", "Mi", "Sol"],
    conteudo: "Acordes são formados por três ou mais notas tocadas simultaneamente. Pressione Dó, Mi e Sol ao mesmo tempo para formar o acorde de Dó maior.",
    tipo: "acordes"
  },
  602: {
    titulo: "Acorde de Fá maior",
    notas: ["Fá", "Lá", "Dó (oitava acima)"],
    conteudo: "O acorde de Fá maior é formado por Fá, Lá e Dó. Pressione Fá, Lá e Dó ao mesmo tempo.",
    tipo: "acordes"
  },
  603: {
    titulo: "Acorde de Sol maior",
    notas: ["Sol", "Si", "Ré"],
    conteudo: "O acorde de Sol maior é formado por Sol, Si e Ré. Pressione Sol, Si e Ré ao mesmo tempo.",
    tipo: "acordes"
  },
  604: {
    titulo: "Acorde de Lá menor",
    notas: ["Lá", "Dó", "Mi"],
    conteudo: "O acorde de Lá menor é formado por Lá, Dó e Mi. Pressione Lá, Dó e Mi ao mesmo tempo.",
    tipo: "acordes"
  },
  605: {
    titulo: "Musiquinha: Acordes em sequência",
    notas: [
      ["Dó", "Mi", "Sol"], // C
      ["Fá", "Lá", "Dó"], // F
      ["Sol", "Si", "Ré"], // G
      ["Lá", "Dó", "Mi"], // Am
      ["Dó", "Mi", "Sol"]  // C
    ],
    conteudo: "Progressões de acordes são a base de muitas músicas. Toque os acordes em sequência, pressionando as notas de cada acorde ao mesmo tempo.",
    tipo: "acordes"
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
// Progresso individual por usuário
let usuarioAtual = JSON.parse(localStorage.getItem('usuario'));
let progresso = { notas: [], intervalos: [], escalas: [], acordes: [] };
if (usuarioAtual && usuarioAtual.email) {
  progresso = JSON.parse(localStorage.getItem('progresso_' + usuarioAtual.email)) || progresso;
}

// Aqui estamos criando dois conjuntos (Sets) que serão usados para verificar as atividades do usuário.
const primeirosIds = new Set(); // Para armazenar os primeiros IDs de cada tipo
const tiposVistos = new Set(); // Para armazenar os tipos que já foram vistos

// Este loop percorre todos os 'botoes' que representam as atividades na página
for (const id of botoes) {
  const atividade = atividades[id];
  if (!atividade) continue;

  // Aqui estamos verificando se o tipo dessa atividade já foi visto
  if (!tiposVistos.has(atividade.tipo)) {
    primeirosIds.add(id);
    tiposVistos.add(atividade.tipo);
  }
}

// Este trecho de código aplica lógica de desbloqueio dos botões de atividades na página
document.querySelectorAll('.atividade-botao').forEach(botao => {
  const id = botao.getAttribute('data-id');
  const atividade = atividades[id];
  if (!atividade) return;

  const anteriorIndex = botoes.indexOf(id) - 1;
  const anteriorId = botoes[anteriorIndex];

  // Verifica se a atividade pode ser desbloqueada com base nas condições de progresso
  const podeDesbloquear = primeirosIds.has(id) || progresso[atividade.tipo].includes(anteriorId);

  if (!podeDesbloquear) {
    botao.disabled = true;
    botao.classList.add('bloqueado');
    botao.title = "Conclua a atividade anterior para desbloquear";
  } else {
    botao.disabled = false;
    botao.classList.remove('bloqueado');
    botao.title = atividade.titulo;
    botao.addEventListener('click', () => {
      mostrarAtividade(id);
    });
  }
});

// Função que reativa os botões de atividades para um tipo específico
function reativarBotoes(tipo) {
  document.querySelectorAll('.atividade-botao').forEach(botao => {
    const id = botao.getAttribute('data-id');
    const atividade = atividades[id];
    if (!atividade || atividade.tipo !== tipo) return;

    const anteriorId = (parseInt(id) - 1).toString();
    if (id !== '1' && progresso[tipo].includes(anteriorId)) {
      botao.disabled = false;
      botao.classList.remove('bloqueado');
      botao.title = "";
    }
  });
}

// Função que exibe a atividade selecionada na tela
function mostrarAtividade(id) {
  const atividade = atividades[id];
  if (!atividade) return;

  document.getElementById('monitor').style.display = 'none';
  primeiraTeclaPressionada = false;

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

  primeiraTeclaPressionada = false;

  // Atualiza a barra de progresso da atividade
  atualizarBarraProgresso(atividade.tipo);
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
        if (!progresso[atividade.tipo].includes(atividadeId)) {
          progresso[atividade.tipo].push(atividadeId);
          // Salva progresso individual por usuário
          if (usuarioAtual && usuarioAtual.email) {
            localStorage.setItem('progresso_' + usuarioAtual.email, JSON.stringify(progresso));
            // Envia o progresso atualizado para o backend
            fetch('/api/progresso', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: usuarioAtual.email,
                progresso
              })
            });
          }

          reativarBotoes(atividade.tipo);
        }
      
        atualizarBarraProgresso(atividade.tipo);
      
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

  const tipoAtual = atividades[atividadeIdAtual].tipo;

  // Procura a próxima atividade do mesmo tipo
  let proximoId = null;
  for (let i = indiceAtual + 1; i < botoes.length; i++) {
    const id = botoes[i].toString();
    if (atividades[id] && atividades[id].tipo === tipoAtual) {
      proximoId = id;
      break;
    }
  }

  if (proximoId) {
    mostrarAtividade(proximoId);
  } else {
    alert('Você concluiu todas as atividades deste conceito!');
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
   // Iniciar o cronôm
   
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
function atualizarBarraProgresso(tipo) {
  const total = Object.values(atividades).filter(a => a.tipo === tipo).length;
  const feitas = progresso[tipo].length;

  document.getElementById('progresso-texto').textContent =
    `Progresso: ${feitas} de ${total} atividades concluídas`;

  const barra = document.getElementById('barra-progresso');
  const percentual = (feitas / total) * 100;
  barra.style.width = percentual + '%';
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




// Função para abrir o menu de login/cadastro
function toggleMenu() {
  const menu = document.getElementById("userMenu");
  menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

// Atividades de todos os instrumentos
const atividades = {
  // Piano
  piano1: { titulo: "Piano - Escalas", conteudo: "Toque a escala de Dó maior.", notas: ["Dó", "Ré", "Mi", "Fá", "Sol", "Lá", "Si"] },
  piano2: { titulo: "Piano - Acordes", conteudo: "Toque acordes de C, F e G.", notas: ["Dó", "Fá", "Sol"] },
  piano3: { titulo: "Piano - Mão Direita", conteudo: "Exercício para mão direita.", notas: ["Mi", "Fá", "Sol"] },
  piano4: { titulo: "Piano - Mão Esquerda", conteudo: "Exercício para mão esquerda.", notas: ["Dó", "Mi", "Sol"] },
  piano5: { titulo: "Piano - Melodia Simples", conteudo: "Toque 'Brilha Brilha Estrelinha'.", notas: ["Dó", "Dó", "Sol", "Sol", "Lá", "Lá", "Sol"] },

  // Teclado
  teclado1: { titulo: "Teclado - Escalas", conteudo: "Pratique escalas.", notas: ["Dó", "Ré", "Mi", "Fá", "Sol", "Lá", "Si"] },
  teclado2: { titulo: "Teclado - Acordes", conteudo: "Aprenda acordes simples.", notas: ["Dó", "Mi", "Sol"] },
  teclado3: { titulo: "Teclado - Ritmo", conteudo: "Toque com ritmo.", notas: ["Mi", "Fá", "Sol", "Fá", "Mi"] },
  teclado4: { titulo: "Teclado - Duas Mãos", conteudo: "Coordene duas mãos.", notas: ["Dó", "Fá", "Lá", "Dó"] },
  teclado5: { titulo: "Teclado - Melodia", conteudo: "Pequena melodia.", notas: ["Sol", "Lá", "Si", "Dó", "Si", "Lá"] },

  // Acordeão
  acordeao1: { titulo: "Acordeão - Escalas", conteudo: "Escala de Dó no acordeão.", notas: ["Dó", "Ré", "Mi", "Fá", "Sol", "Lá", "Si"] },
  acordeao2: { titulo: "Acordeão - Acordes", conteudo: "Acordes básicos.", notas: ["Dó", "Fá", "Sol"] },
  acordeao3: { titulo: "Acordeão - Mão Direita", conteudo: "Ritmos simples.", notas: ["Mi", "Fá", "Sol"] },
  acordeao4: { titulo: "Acordeão - Mão Esquerda", conteudo: "Baixos simples.", notas: ["Dó", "Sol"] },
  acordeao5: { titulo: "Acordeão - Pequena música", conteudo: "Pequena canção.", notas: ["Dó", "Mi", "Sol", "Fá", "Mi", "Dó"] },

  // Violoncelo
  violoncelo1: { titulo: "Violoncelo - Corda Sol", conteudo: "Notas na corda Sol.", notas: ["Sol", "Lá", "Si", "Dó"] },
  violoncelo2: { titulo: "Violoncelo - Corda Ré", conteudo: "Notas na corda Ré.", notas: ["Ré", "Mi", "Fá#", "Sol"] },
  violoncelo3: { titulo: "Violoncelo - Corda Lá", conteudo: "Notas na corda Lá.", notas: ["Lá", "Si", "Dó#", "Ré"] },
  violoncelo4: { titulo: "Violoncelo - Corda Dó", conteudo: "Notas na corda Dó.", notas: ["Dó", "Ré", "Mi", "Fá"] },
  violoncelo5: { titulo: "Violoncelo - Escalas Completas", conteudo: "Toque todas as cordas.", notas: ["Sol", "Lá", "Si", "Dó", "Ré", "Mi", "Fá", "Sol"] }
};


/// Função para exibir as informações da atividade escolhida
function mostrarAtividade(id) {
  const atividade = atividades[id]; // Pega a atividade correspondente ao botão clicado

  if (atividade) { // Se a atividade existir
      document.getElementById('atividade-titulo').textContent = atividade.titulo; // Atualiza o título da atividade
      document.getElementById('atividade-conteudo').textContent = atividade.conteudo; // Atualiza o conteúdo (descrição) da atividade

      const notasDiv = document.getElementById('notas'); // Pega a div onde as notas devem aparecer

      if (notasDiv) { // Só faz isso se a div 'notas' existir na página
          notasDiv.innerHTML = ''; // Limpa qualquer nota anterior para não acumular

          if (atividade.notas && Array.isArray(atividade.notas)) { // Se a atividade tiver notas e elas forem uma lista (array)
              atividade.notas.forEach(nota => { // Para cada nota da lista
                  const notaDiv = document.createElement('div'); // Cria uma nova div para a nota
                  notaDiv.classList.add('nota'); // Adiciona a classe 'nota' para estilizar depois
                  notaDiv.textContent = nota; // Define o texto da div como o nome da nota (ex: "Dó", "Ré", etc.)
                  notasDiv.appendChild(notaDiv); // Adiciona a nova div dentro da div 'notas'
              });
          }
      }

      document.getElementById('atividade-container').style.display = 'block'; // Torna o container da atividade visível
  }
}

// Lista de IDs dos botões de todas as atividades de todos os instrumentos
const botoes = [
  'piano1', 'piano2', 'piano3', 'piano4', 'piano5',
  'teclado1', 'teclado2', 'teclado3', 'teclado4', 'teclado5',
  'acordeao1', 'acordeao2', 'acordeao3', 'acordeao4', 'acordeao5',
  'violoncelo1', 'violoncelo2', 'violoncelo3', 'violoncelo4', 'violoncelo5'
];

// Adiciona o evento de clique para cada botão da lista
botoes.forEach(id => {
  const botao = document.getElementById(id); // Tenta encontrar o botão no HTML

  if (botao) { // Se o botão existir
      botao.addEventListener('click', () => mostrarAtividade(id)); // Quando clicar no botão, chama a função mostrarAtividade
  }
});

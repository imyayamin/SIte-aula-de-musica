
    const atividades = {
      // Piano
  piano1: { titulo: "Piano - Escalas", conteudo: "Toque a escala de Dó maior.", notas: ["Dó", "Ré", "Mi", "Fá", "Sol", "Lá", "Si"] },
  piano2: { titulo: "Piano - Acordes", conteudo: "Toque acordes de C, F e G.", notas: ["Dó", "Fá", "Sol"] },
  piano3: { titulo: "Piano - Mão Direita", conteudo: "Exercício para mão direita.", notas: ["Mi", "Fá", "Sol"] },
  piano4: { titulo: "Piano - Mão Esquerda", conteudo: "Exercício para mão esquerda.", notas: ["Dó", "Mi", "Sol"] },
  piano5: { titulo: "Piano - Melodia Simples", conteudo: "Toque 'Brilha Brilha Estrelinha'.", notas: ["Dó", "Dó", "Sol", "Sol", "Lá", "Lá", "Sol"] },

  // Teclado
  teclado1: { titulo: "Teclado - Escalas", conteudo: "Pratique escalas.", notas: ["Dó", "Ré", "Mi", "Fá", "Sol", "Lá", "Si", "Dó", "Ré", "Mi", "Fá", "Sol", "Lá", "Si", "Dó", "Ré", "Mi", "Fá", "Sol", "Lá", "Si"] },
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

    let indiceNotaAtual = 0; // rastreia qual é a próxima nota esperada

    function mostrarAtividade(id) {
      const atividade = atividades[id];
      if (!atividade) return;

      indiceNotaAtual = 0; // reinicia a sequência
      document.getElementById('atividade-titulo').textContent = atividade.titulo;
      document.getElementById('atividade-conteudo').textContent = atividade.conteudo;

      const notasDiv = document.getElementById('notas');
      notasDiv.innerHTML = '';

      atividade.notas.forEach(nota => {
        const notaDiv = document.createElement('div');
        notaDiv.classList.add('nota');
        notaDiv.textContent = nota;
        notaDiv.setAttribute('data-nota', nota);
        notasDiv.appendChild(notaDiv);
      });

      document.getElementById('atividade-container').style.display = 'block';
    }

    const tecladoNotas = {
      'a': 'Dó',
      's': 'Ré',
      'd': 'Mi',
      'f': 'Fá',
      'g': 'Sol',
      'h': 'Lá',
      'j': 'Si'
    };

    function handleKeyPress(event) {
      const tecla = event.key.toLowerCase();
      const nota = tecladoNotas[tecla];
      if (nota) {
        mostrarNota(nota);
        verificarSequencia(nota);
      }
    }

    function mostrarNota(nota) {
      const divNota = document.createElement('div');
      divNota.classList.add('nota-pressionada');
      divNota.textContent = `Você pressionou: ${nota}`;
      document.body.appendChild(divNota);
    }

    function verificarSequencia(notaPressionada) {
      const titulo = document.getElementById('atividade-titulo').textContent;
      const atividadeId = Object.keys(atividades).find(id => atividades[id].titulo === titulo);
      if (!atividadeId) return;
    
      const atividade = atividades[atividadeId];
      const notaEsperada = atividade.notas[indiceNotaAtual];
      const notaDivs = document.querySelectorAll('#notas .nota');
    
      // Limpa marcação de erro apenas da nota pressionada
      const divErrada = document.querySelector(`.nota[data-nota="${notaPressionada}"]`);
      if (divErrada) divErrada.classList.remove('nota-errada');
    
      if (notaPressionada === notaEsperada) {
        // Nota correta na ordem certa
        const div = document.querySelectorAll('#notas .nota')[indiceNotaAtual];
        if (div) div.classList.add('nota-correta');
        indiceNotaAtual++; // avança para a próxima nota
      } else {
        // Nota errada
        const div = document.querySelector(`.nota[data-nota="${notaPressionada}"]`);
        if (div) div.classList.add('nota-errada');
      }
    }
    
    document.addEventListener('keydown', handleKeyPress);
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

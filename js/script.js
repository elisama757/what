// Define direto a imagem do logo
const profilePhotoElement = document.getElementById('whatsappPhoto');
profilePhotoElement.src = 'https://dev-mscpremiov2.pantheonsite.io/av/images/logo.png';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const avaliacoes = [
  {
    logo: 'images/carrefuor.png',
    perguntas: [
      ['1 😠', '2 😕', '3 🙂', '4 😊', '5 😍'],
      ['Mais ofertas', 'Melhor atendimento'],
      ['Sim 👍', 'Não 👎']
    ]
  },
  {
    logo: 'images/mcd.png',
    perguntas: [
      ['1 😠', '2 😕', '3 🙂', '4 😊', '5 😍'],
      ['Toda Semana', 'Raramente'],
      ['Sim 👍', 'Não 👎']
    ]
  },
  {
    logo: 'images/bradesco.png',
    perguntas: [
      ['1 😠', '2 😕', '3 🙂', '4 😊', '5 😍'],
      ['Limite Maior', 'Menores Taxas'],
      ['Sim 👍', 'Não 👎']
    ]
  },
  {
    logo: 'images/casab.png',
    perguntas: [
      ['1 😠', '2 😕', '3 🙂', '4 😊', '5 😍'],
      ['Mais Ofertas', 'Melhor Atendimento'],
      ['Sim 👍', 'Não 👎']
    ]
  },
  {
    logo: 'images/renner.png',
    perguntas: [
      ['1 😠', '2 😕', '3 🙂', '4 😊', '5 😍'],
      ['Roupas Bonitas', 'Melhor Atendimento'],
      ['Sim 👍', 'Não 👎']
    ]
  },
];

let avaliacaoAtual = 0;

function criarCard(avaliacao, index) {
  const card = document.createElement('div');
  card.classList.add('card-quiz');
  card.dataset.index = index;

  const img = document.createElement('img');
  img.src = avaliacao.logo;
  img.style = 'width: 100%; max-width: 300px; border-radius: 12px; margin-bottom: 5px;';
  card.appendChild(img);

  let respostasSelecionadas = new Set();

  avaliacao.perguntas.forEach((grupo, grupoIndex) => {
    const grupoDiv = document.createElement('div');
    grupoDiv.style = 'display: flex; flex-wrap: wrap; justify-content: center; gap: 7px; margin-bottom: 10px;';
    grupo.forEach(texto => {
      const btn = document.createElement('button');
      btn.className = `opcao-quiz grupo-${index}-${grupoIndex}`;
      btn.textContent = texto;

      btn.addEventListener('click', () => {
        grupoDiv.querySelectorAll('button').forEach(b => {
          b.classList.remove('selected');
          b.style.background = '';
          b.style.color = '';
        });

        btn.classList.add('selected');
        btn.style.background = '#1daa61';
        btn.style.color = '#fff';

        const totalGrupos = avaliacao.perguntas.length;
        let todosSelecionados = true;

        for (let i = 0; i < totalGrupos; i++) {
          const grupoBtns = card.querySelectorAll(`.grupo-${index}-${i}`);
          const algumSelecionado = Array.from(grupoBtns).some(b => b.classList.contains('selected'));
          if (!algumSelecionado) {
            todosSelecionados = false;
            break;
          }
        }

        if (todosSelecionados) {
          const btnEnviarElement = document.getElementById(`btnEnviar-${index}`);
          btnEnviarElement.classList.remove('hidden');
          setTimeout(() => {
            btnEnviarElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 300);
        } else {
          const proximoGrupo = card.querySelector(`.grupo-${index}-${grupoIndex + 1}`);
          if (proximoGrupo) {
            setTimeout(() => {
              proximoGrupo.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
          }
        }
      });

      grupoDiv.appendChild(btn);
    });

    card.appendChild(grupoDiv);
  });

  const btnEnviar = document.createElement('button');
  btnEnviar.id = `btnEnviar-${index}`;
  btnEnviar.className = 'hidden';
  btnEnviar.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar resposta';
  btnEnviar.style = 'margin-top: 30px; background-color: #1daa61; color: white; border:none; padding: 10px 0; border-radius: 6px; cursor: pointer;';
  btnEnviar.addEventListener('click', async () => {
    const popupPremio = document.getElementById('popupPremio');

    adicionarAoSaldo(35);
    startConfettiFall();
    card.remove();

    const progresso = ((index + 1) / avaliacoes.length) * 100;
    document.getElementById('quizProgress').style.width = `${progresso}%`;

    if (avaliacoes[index + 1]) {
      criarCard(avaliacoes[index + 1], index + 1);
    } else {
      criarCard(avaliacoes[index], index);
      popupPremio.classList.remove('hidden');
      await sleep(2000);
      window.location.href = '../saque/index.html';
    }
  });

  card.appendChild(btnEnviar);
  document.getElementById('conteudo').appendChild(card);
}

criarCard(avaliacoes[0], 0);

function adicionarAoSaldo(valor) {
  const walletElement = document.getElementById('wallet-value');
  const valorAtual = parseFloat(walletElement.textContent.replace(',', '.')) || 0;
  const valorFinal = valorAtual + valor;

  const duracao = 3000;
  const frameRate = 60;
  const totalFrames = Math.round((duracao / 1000) * frameRate);
  let frame = 0;

  const incremento = (valorFinal - valorAtual) / totalFrames;

  const sound = new Audio("./src/img/cash_sound.mp3");
  sound.play();

  const animacao = setInterval(() => {
    frame++;
    const novoValor = valorAtual + incremento * frame;
    walletElement.textContent = novoValor.toFixed(2).replace('.', ',');

    if (frame >= totalFrames) {
      clearInterval(animacao);
      walletElement.textContent = valorFinal.toFixed(2).replace('.', ',');
    }
  }, 1000 / frameRate);
}

adicionarAoSaldo(150);

const link = '../back/index.html';

function setBackRedirect(url) {
  let urlBackRedirect = url.trim() + (url.indexOf('?') > 0 ? '&' : '?') + document.location.search.replace('?', '').toString();

  history.pushState({}, '', location.href);
  history.pushState({}, '', location.href);
  history.pushState({}, '', location.href);

  window.addEventListener('popstate', () => {
    console.log('onpopstate', urlBackRedirect);
    setTimeout(() => {
      location.href = urlBackRedirect;
    }, 1);
  });
}

setBackRedirect(link);
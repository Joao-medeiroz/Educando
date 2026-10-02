// ──────────────────────────────────────────────────────────────
// TOGGLE DOS BOTÕES DE INTEGRANTES
// ──────────────────────────────────────────────────────────────

const botoes = document.querySelectorAll('.btn-toggle');

botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        const card = botao.closest('.card-setor');
        const integrantesDiv = card?.querySelector('.integrantes');

        if (!integrantesDiv) return;

        const estaAberto = integrantesDiv.classList.contains('aberto');

        // Alterna o estado
        integrantesDiv.classList.toggle('aberto');

        // Sincroniza texto e acessibilidade
        botao.textContent = estaAberto ? 'Ver Integrantes' : 'Ocultar Integrantes';
        botao.setAttribute('aria-expanded', String(!estaAberto));
    });
});

// ──────────────────────────────────────────────────────────────
// UTILITÁRIO — DEBOUNCE
// Evita processar a busca a cada tecla digitada
// ──────────────────────────────────────────────────────────────

function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

// ──────────────────────────────────────────────────────────────
// BUSCA EM TEMPO REAL
// ──────────────────────────────────────────────────────────────

const inputBusca   = document.getElementById('inputBusca');
const cardsSetor   = document.querySelectorAll('.card-setor');
const gridSetores  = document.querySelector('.grid-setores');

// ── Reseta todos os cards para o estado inicial ──
function resetarCards() {
    cardsSetor.forEach(card => {
        const integrantesDiv = card.querySelector('.integrantes');
        const btnToggle      = card.querySelector('.btn-toggle');

        card.style.display = 'flex';

        if (integrantesDiv) integrantesDiv.classList.remove('aberto');
        if (btnToggle) {
            btnToggle.textContent = 'Ver Integrantes';
            btnToggle.setAttribute('aria-expanded', 'false');
        }
    });

    mostrarMensagemVazia(false);
}

// ── Filtra cards com base no termo buscado ──
function filtrarCards(termo) {
    let algumVisivel = false;

    cardsSetor.forEach(card => {
        const textoCard      = card.textContent.toLowerCase();
        const integrantesDiv = card.querySelector('.integrantes');
        const btnToggle      = card.querySelector('.btn-toggle');

        // Null safety
        if (!integrantesDiv || !btnToggle) return;

        const encontrou = textoCard.includes(termo);

        // Mostra ou esconde o card
        card.style.display = encontrou ? 'flex' : 'none';

        if (encontrou) {
            // Garante que os integrantes estejam abertos
            integrantesDiv.classList.add('aberto');
            btnToggle.textContent = 'Ocultar Integrantes';
            btnToggle.setAttribute('aria-expanded', 'true');
            algumVisivel = true;
        } else {
            // Garante que estejam fechados nos cards ocultos
            integrantesDiv.classList.remove('aberto');
            btnToggle.textContent = 'Ver Integrantes';
            btnToggle.setAttribute('aria-expanded', 'false');
        }
    });

    mostrarMensagemVazia(!algumVisivel, termo);
}

// ── Exibe ou oculta mensagem de "nenhum resultado" ──
function mostrarMensagemVazia(mostrar, termo = '') {
    let msg = document.getElementById('msg-vazia');

    // Cria o elemento se ainda não existir 
    if (!msg) {
        msg = document.createElement('p');
        msg.id        = 'msg-vazia';
        msg.className = 'msg-sem-resultado';
        msg.setAttribute('role', 'status'); // leitores de tela anunciam a msg
        msg.setAttribute('aria-live', 'polite');
        gridSetores.after(msg);
    }

    msg.style.display = mostrar ? 'block' : 'none';

    if (mostrar) {
        msg.textContent = `Nenhum resultado encontrado para "${termo}".`;
    }
}

// ── Evento principal da busca com debounce de 300ms ──
inputBusca.addEventListener(
    'input',
    debounce(() => {
        const termo = inputBusca.value.toLowerCase().trim();
        termo === '' ? resetarCards() : filtrarCards(termo);
    }, 300)
);

// ── Limpa a busca ao pressionar ESC ──
inputBusca.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        inputBusca.value = '';
        resetarCards();
        inputBusca.blur(); // remove o foco do campo
    }
});
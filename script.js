// Toggle dos botões de integrantes
const botoes = document.querySelectorAll('.btn-toggle');

botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        const integrantesDiv = botao.nextElementSibling;
        integrantesDiv.classList.toggle('escondido');
        
        if (integrantesDiv.classList.contains('escondido')) {
            botao.textContent = 'Ver Integrantes';
        } else {
            botao.textContent = 'Ocultar Integrantes';
        }
    });
});

// Pesquisa de Integrantes/Setores em Tempo Real
const inputBusca = document.getElementById('inputBusca');
const cardsSetor = document.querySelectorAll('.card-setor');

inputBusca.addEventListener('input', () => {
    const termo = inputBusca.value.toLowerCase().trim();

    cardsSetor.forEach(card => {
        const textoCard = card.textContent.toLowerCase();
        const integrantesDiv = card.querySelector('.integrantes');
        const btnToggle = card.querySelector('.btn-toggle');

        if (textoCard.includes(termo)) {
            card.style.display = 'flex';
            if (termo.length > 0) {
                integrantesDiv.classList.remove('escondido');
                btnToggle.textContent = 'Ocultar Integrantes';
            }
        } else {
            card.style.display = 'none';
        }
    });
});
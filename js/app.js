const areaJogo = document.querySelector('#area-jogo');
const pontosDisplay = document.querySelector('#pontos');
const listaHistorico = document.querySelector('#lista-historico');
const recordeDisplay = document.querySelector('#recorde')
const resetBtn = document.querySelector('#reset-btn')

let pontos = 0;
let recorde = localStorage.getItem('recorde') ? parseInt(localStorage.getItem('recorde')) : 0;

const emojis = ['😺', '🐶', '🚀', '🍕', '🦁', '🌮'];
const mensagensZoeiras = [
    'to mt felizinho, sou o principinho',
    'to apaixonaidinho, sou o principinho',
    'topzera, sou o principera',
    'toma beijinho, sou o principinho',
    'to super felizinho, sou o principinho',
    'sou muito descolado, sou o principinho molestado'
];
// Função para adicionar histórico
function adicionarHistorico(texto) {
    const li = document.createElement('li');
    const horario = new Date().toLocaleTimeString('pt-BR');
    li.textContent = `${horario} - ${texto}`;
    li.classList.add('zoeiro');
    listaHistorico.appendChild(li);

    if (listaHistorico.children.length > 10) {
        listaHistorico.removeChild(listaHistorico.firstChild);
    }
}

// Função para criar um emoji
function criarEmoji() {
    const emoji = document.createElement('div');
    emoji.classList.add('emoji');

    const indiceAleatorio = Math.floor(Math.random() * emojis.length);
    emoji.textContent = emojis[indiceAleatorio];

    const maxX = areaJogo.offsetWidth - 50;
    const maxY = areaJogo.offsetHeight - 50;

    emoji.style.left = `${Math.random() * maxX}px`;
    emoji.style.top = `${Math.random() * maxY}px`;

    function atualizarRecorde(){
        if(pontos > recorde){
            recorde = pontos;
            localStorage.setItem('recorde', recorde);
            recordeDisplay.textContent = recorde;
            adicionarHistorico(`Novo recorde: ${recorde}! 🏆`);
        }
    }

    resetBtn.addEventListener('click', () => {
        pontos = 0;
        pontosDisplay.textContent = pontos;
        listaHistorico.innerHTML = '';
        adicionarHistorico('Jogo resetado!');
    })


    // Clique no emoji (ganha pontos)
    emoji.addEventListener('click', () => {
        emoji.classList.add('clicado');
        pontos += 5;
        pontosDisplay.textContent = pontos;

        atualizarRecorde();

        const mensagem = mensagensZoeiras[Math.floor(Math.random() * mensagensZoeiras.length)];
        adicionarHistorico(`${mensagem} (${emoji.textContent})`);

        if (emoji.isConnected) emoji.remove();
    });

    areaJogo.appendChild(emoji);

    // Se não clicar em 2s, perde ponto
    setTimeout(() => {
        if (emoji.isConnected) {
            emoji.remove();
            pontos = Math.max(0, pontos - 1);
            pontosDisplay.textContent = pontos;
            atualizarRecorde();
            adicionarHistorico(`Perdeu o emoji ${emoji.textContent}! 😜`);
        }
    }, 2000);
}

// Criar emojis periodicamente
setInterval(criarEmoji, 2000);

// Criar o primeiro emoji
criarEmoji();
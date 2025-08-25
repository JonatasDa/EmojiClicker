const gameArea = document.querySelector('#game-area');
const pontosDisplay = document.querySelector('#pontos');
const ListaHistorico = document.querySelector('#historico');

let pontos = 0;
const emojis = ['😂', '😍', '👌', '😘', '😁', '😎'];
const mensagensZoeiras = [
    'to mt felizinho, sou o principinho',
    'to apaixonaidinho, sou o principinho',
    'topzera, sou o principera',
    'toma beijinho, sou o principinho',
    'to super felizinho, sou o principinho',
    'sou muito descolado, sou o principinho molestado'
];

function adicionarHistorico(texto){
    const li = document.querySelector('li');
    const horario = new Date().toLocaleTimeString('pt-BR');
    li.textContent = `${horario} - ${texto}`
    li.classList.add('zoeiro');
    ListaHistorico.appendChild(li);

    if(ListaHistorico.children.length > 10){
        ListaHistorico.removeChild(ListaHistorico.firstChild);
    }
}

function criarEmoji(){
    const emoji = document.createElement('div');
    emoji.classList.add('emoji');

    const indiceAleatorio = Math.floor(Math.random() * emoji.length);
    emoji.textContent = emojis[indiceAleatorio];

    const maxX = gameArea.offsetWidth - 50;
    const maxY = gameArea.offsetHeight - 50;

    emoji.style.left = `${Math.random() * maxX}px`;
    emoji.style.top = `${Math.random() * maxY}px`;
}
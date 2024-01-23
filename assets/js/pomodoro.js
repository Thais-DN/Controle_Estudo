const html = document.querySelector("html");
const botoes = document.querySelectorAll(".app__card-button");
const programar = document.querySelector(".app__card-button--programar");
const eBook = document.querySelector(".app__card-button--eBook");
const descanso = document.querySelector(".app__card-button--descanso");
const english = document.querySelector(".app__card-button--english");
const titulo = document.querySelector(".app__title");
const banner = document.querySelector(".app__image");
const startPauseBT = document.querySelector("#start-pause");
const iniciarOuPausaBt = document.querySelector("#start-pause span");
const startPauseBtIcon = document.querySelectorAll(
    ".app__card-primary-butto-icon"
);
const cronometro = document.querySelector("#timer");

const musicaFocoInput = document.querySelector("#alternar-musica");
const musica = new Audio("/sons/luna-rise-part-one.mp3"); //readFile()
const audioPlay = new Audio("/sons/play.wav");
const audioPausa = new Audio("/sons/pause.mp3");
const audioTempoFinalizado = new Audio("./sons/beep.mp3");

let tempoDecorridoEmSegundos = 7200;
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener("change", () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});

programar.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 7200;
    alterarContexto("programar");
    programar.classList.add("active");
});

eBook.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 7200;
    alterarContexto("eBook");
    eBook.classList.add("active");
});

english.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 7200;
    alterarContexto("english");
    english.classList.add("active");
});

descanso.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 3600;
    alterarContexto("descanso");
    descanso.classList.add("active");
});

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach((botao) => {
        botao.classList.remove("active");
    });
    html.setAttribute("data-contexto", contexto);

    switch (contexto) {
        case "programar":
            titulo.innerHTML = `<strong class="app__title-strong">Foca em programar, que no futuro você vai brilhar.</strong>`;
            break;
        case "eBook":
            titulo.innerHTML = `<strong class="app__title-strong">Só parar quando puder mimar.</strong>`;
            break;
        case "english":
            titulo.innerHTML = `<strong class="app__title-strong">Try again.</strong>`;
            break;
        case "descanso":
            titulo.innerHTML = `<strong class="app__title-strong">Pausa para almoçar.</strong>`;
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        audioTempoFinalizado.play();
        alert("Tempo finalizado!");
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
};

startPauseBT.addEventListener("click", iniciarOuPausa);

function iniciarOuPausa() {
    if (intervaloId) {
        audioPausa.play();
        zerar();
        return;
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausaBt.textContent = "Pausar";
    startPauseBtIcon.forEach((startPauseBtIcon) => {
        startPauseBtIcon.src = "/imagens/pause.png";
    });
}

function zerar() {
    clearInterval(intervaloId);
    iniciarOuPausaBt.textContent = "Começar";
    startPauseBtIcon.forEach((startPauseBtIcon) => {
        startPauseBtIcon.src = "/imagens/play_arrow.png";
    });
    intervaloId = null;
}

function mostrarTempo() {
    const horas = Math.floor(tempoDecorridoEmSegundos / 3600);
    const minutos = Math.floor((tempoDecorridoEmSegundos % 3600) / 60);
    const segundos = tempoDecorridoEmSegundos % 60;

    // Formatando o tempo com o formato desejado
    const tempoFormatado = `${horas.toString().padStart(2, "0")}:${minutos
        .toString()
        .padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;

    cronometro.innerHTML = tempoFormatado;
}

mostrarTempo();

// aqui busca os elementos do DOM e salva em variaveis constantes
const html    = document.querySelector('html')
const focoBt  = document.querySelector('.app__card-button--foco') 
const curtoBt = document.querySelector('.app__card-button--curto') 
const longoBt = document.querySelector('.app__card-button--longo')
const banner  = document.querySelector('.app__image')
const botoes  = document.querySelectorAll('.app__card-button')
const title   = document.querySelector('.app__title')

const divContexto = document.querySelector('.app__image')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('sons/luna-rise-part-one.mp3')
const somPausa = new Audio('sons/pause.mp3')
const somPlay = new Audio('sons/play.wav')
const somFim  = new Audio('sons/beep.mp3')
const tempoNaTela = document.getElementById('timer')

const iconebt = document.querySelector('.app__card-primary-butto-icon')

const startPauseBt = document.querySelector('#start-pause')
const startPauseSpan = document.querySelector('#start-pause span')

let tempoDecorridoEmSegundos = 0
let intervaloId = null

const temporizador = () => {
    if(tempoDecorridoEmSegundos <= 0){
        zerar()
        somFim.play()
        alert('Fim do tempo')
        const focoAtivo = html.getAttribute('data-contexto')
        if (focoAtivo){
            const evento = new CustomEvent('focoFinalizado')
            document.dispatchEvent(evento)

        }

        somFim.pause()
        return
    }
    tempoDecorridoEmSegundos -=1
    mostratempo()
   
}
//
musica.loop = true

startPauseBt.addEventListener('click',iniciarPausar)

// aqui adiciona listerners nos elementos nesse caso fica ouvindo o click do mouse
//quando clica chama a função alteraContexto, e após isso adiciona a classe active
// Na funcao é retirado a class active, dessa forma só o botao clicado fica ativo

musicaFocoInput.addEventListener('change',()=>{
    if (musica.paused){
        musica.play()
       
    }else{
        musica.pause()
        startPauseSpan.textContent = 'Começar'
    }
})

focoBt.addEventListener('click', ()=>{
    alteraContexto('foco')
    focoBt.classList.add('active')
   
})

curtoBt.addEventListener('click', ()=>{
    alteraContexto('descanso-curto')
    curtoBt.classList.add('active')
   
})

longoBt.addEventListener('click', ()=>{
    alteraContexto('descanso-longo')
    longoBt.classList.add('active')
    
   
})
divContexto.classList.add('animate__animated')
// funcao chamada no evento click do listerner
function alteraContexto(contexto){
    // percorre a lista de botoes capturado na constante botoes com o query Select All
    
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto',contexto)
    banner.setAttribute('src',`imagens/${contexto}.png`)
    


    divContexto.classList.remove('animate__backInUp','animate__flip','animate__flipInY','animate__flipInX')
    
    switch(contexto){

        case "foco":
        title.innerHTML = `Otimize sua produtividade,<br>
        <strong class="app__title-strong">mergulhe no que importa.</strong>`
         tempoDecorridoEmSegundos = 10
         divContexto.classList.add('animate__backInUp')
         
         mostratempo()
        
        break
        case "descanso-curto":
            divContexto.classList.add('animate__flipInX')
            tempoDecorridoEmSegundos = 5
            mostratempo()
            title.innerHTML = `Que tal dar uma respirada?<br>
        <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break
        case "descanso-longo":
            divContexto.classList.add('animate__flipInY')
            tempoDecorridoEmSegundos = 900
            mostratempo()
            title.innerHTML = `Hora de voltar a superficie<br>
        <strong class="app__title-strong">Faça uma pausa longa!</strong>`
            break
        default:
            break
    }
}

function iniciarPausar(){
    if (intervaloId){
        zerar()
        somPausa.play()
        startPauseSpan.textContent = 'Começar'
        iconebt.setAttribute('src','imagens/play_arrow.png')
        return
    }
    intervaloId = setInterval(temporizador, 1000);
    somPlay.play()
    startPauseSpan.textContent = 'Pausar'
    iconebt.setAttribute('src','imagens/pause.png')
}

function zerar(){
    
    clearInterval(intervaloId)

    if(tempoDecorridoEmSegundos === 0){
        
        somFim.play()
    }
    intervaloId = null
}

function mostratempo(){
    // window.alert(tempoDecorridoEmSegundos)
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormato = tempo.toLocaleTimeString('pt-br',{minute: '2-digit',second:'2-digit'})
    tempoNaTela.innerHTML = `${tempoFormato}`
}
mostratempo()

/*
Trabalhando com Datas

const currentDate = new Date();

const ano = currentDate.getFullYear();  // Acessa o ano
const mês = currentDate.getMonth(); // Acessa o mês - Janeiro é 0, Fevereiro é 1, ..., Dezembro é 11
const dia = currentDate.getDate(); // Acessa o dia
const horas = currentDate.getHours(); // Acessa as horas 
const minutos = currentDate.getMinutes(); // Acessa os minutos
const segundos = currentDate.getSeconds(); // Acessa os segundos
const milissegundos = currentDate.getMilliseconds();  // Acessa os milissegundos 

const data = new Date();

data.setFullYear(2024);  // Define o ano
data.setMonth(10); // Define o mês
data.setDate(25); // Define o dia
data.setHours(10);  // Define as horas
data.setMinutes(30); // Define os minutos
data.setSeconds(0); // Define os segundos

const dateString = "2023-08-03";
const formatoDeData = new Date(dateString);

const dataEspecifica = new Date(2023, 7, 3, 12, 30, 0, 0);



*/